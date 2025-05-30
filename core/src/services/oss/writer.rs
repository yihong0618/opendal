// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

use std::sync::Arc;

use http::HeaderMap;
use http::HeaderValue;
use http::StatusCode;

use super::core::*;
use super::error::parse_error;
use crate::raw::*;
use crate::*;

pub type OssWriters = TwoWays<oio::MultipartWriter<OssWriter>, oio::AppendWriter<OssWriter>>;

pub struct OssWriter {
    core: Arc<OssCore>,

    op: OpWrite,
    path: String,
}

impl OssWriter {
    pub fn new(core: Arc<OssCore>, path: &str, op: OpWrite) -> Self {
        OssWriter {
            core,
            path: path.to_string(),
            op,
        }
    }

    fn parse_metadata(headers: &HeaderMap<HeaderValue>) -> Result<Metadata> {
        let mut meta = Metadata::default();
        if let Some(etag) = parse_etag(headers)? {
            meta.set_etag(etag);
        }
        if let Some(md5) = parse_content_md5(headers)? {
            meta.set_content_md5(md5);
        }
        if let Some(version) = parse_header_to_str(headers, constants::X_OSS_VERSION_ID)? {
            meta.set_version(version);
        }

        Ok(meta)
    }
}

impl oio::MultipartWrite for OssWriter {
    async fn write_once(&self, size: u64, body: Buffer) -> Result<Metadata> {
        let mut req =
            self.core
                .oss_put_object_request(&self.path, Some(size), &self.op, body, false)?;

        self.core.sign(&mut req).await?;

        let resp = self.core.send(req).await?;

        let meta = Self::parse_metadata(resp.headers())?;
        let status = resp.status();

        match status {
            StatusCode::CREATED | StatusCode::OK => Ok(meta),
            _ => Err(parse_error(resp)),
        }
    }

    async fn initiate_part(&self) -> Result<String> {
        let resp = self
            .core
            .oss_initiate_upload(
                &self.path,
                self.op.content_type(),
                self.op.content_disposition(),
                self.op.cache_control(),
                false,
            )
            .await?;

        let status = resp.status();

        match status {
            StatusCode::OK => {
                let bs = resp.into_body();

                let result: InitiateMultipartUploadResult =
                    quick_xml::de::from_reader(bytes::Buf::reader(bs))
                        .map_err(new_xml_deserialize_error)?;

                Ok(result.upload_id)
            }
            _ => Err(parse_error(resp)),
        }
    }

    async fn write_part(
        &self,
        upload_id: &str,
        part_number: usize,
        size: u64,
        body: Buffer,
    ) -> Result<oio::MultipartPart> {
        // OSS requires part number must between [1..=10000]
        let part_number = part_number + 1;

        let resp = self
            .core
            .oss_upload_part_request(&self.path, upload_id, part_number, false, size, body)
            .await?;

        let status = resp.status();

        match status {
            StatusCode::OK => {
                let etag = parse_etag(resp.headers())?
                    .ok_or_else(|| {
                        Error::new(
                            ErrorKind::Unexpected,
                            "ETag not present in returning response",
                        )
                    })?
                    .to_string();

                Ok(oio::MultipartPart {
                    part_number,
                    etag,
                    checksum: None,
                })
            }
            _ => Err(parse_error(resp)),
        }
    }

    async fn complete_part(
        &self,
        upload_id: &str,
        parts: &[oio::MultipartPart],
    ) -> Result<Metadata> {
        let parts = parts
            .iter()
            .map(|p| MultipartUploadPart {
                part_number: p.part_number,
                etag: p.etag.clone(),
            })
            .collect();

        let resp = self
            .core
            .oss_complete_multipart_upload_request(&self.path, upload_id, false, parts)
            .await?;

        let meta = Self::parse_metadata(resp.headers())?;
        let status = resp.status();

        match status {
            StatusCode::OK => Ok(meta),
            _ => Err(parse_error(resp)),
        }
    }

    async fn abort_part(&self, upload_id: &str) -> Result<()> {
        let resp = self
            .core
            .oss_abort_multipart_upload(&self.path, upload_id)
            .await?;
        match resp.status() {
            // OSS returns code 204 if abort succeeds.
            StatusCode::NO_CONTENT => Ok(()),
            _ => Err(parse_error(resp)),
        }
    }
}

impl oio::AppendWrite for OssWriter {
    async fn offset(&self) -> Result<u64> {
        let resp = self
            .core
            .oss_head_object(&self.path, &OpStat::new())
            .await?;

        let status = resp.status();
        match status {
            StatusCode::OK => {
                let content_length = parse_content_length(resp.headers())?.ok_or_else(|| {
                    Error::new(
                        ErrorKind::Unexpected,
                        "Content-Length not present in returning response",
                    )
                })?;
                Ok(content_length)
            }
            StatusCode::NOT_FOUND => Ok(0),
            _ => Err(parse_error(resp)),
        }
    }

    async fn append(&self, offset: u64, size: u64, body: Buffer) -> Result<Metadata> {
        let mut req = self
            .core
            .oss_append_object_request(&self.path, offset, size, &self.op, body)?;

        self.core.sign(&mut req).await?;

        let resp = self.core.send(req).await?;

        let meta = Self::parse_metadata(resp.headers())?;
        let status = resp.status();

        match status {
            StatusCode::OK => Ok(meta),
            _ => Err(parse_error(resp)),
        }
    }
}
