"use strict";(self.webpackChunkopendal_website=self.webpackChunkopendal_website||[]).push([[9479],{1512:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>x,frontMatter:()=>a,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"bindings/cpp","title":"Cpp \ud83d\udea7","description":"","source":"@site/docs/20-bindings/cpp.mdx","sourceDirName":"20-bindings","slug":"/bindings/cpp","permalink":"/bindings/cpp","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/opendal/tree/main/website/docs/20-bindings/cpp.mdx","tags":[],"version":"current","lastUpdatedBy":"Friends A.","lastUpdatedAt":1741941961000,"frontMatter":{"title":"Cpp \ud83d\udea7"},"sidebar":"docs","previous":{"title":"C \ud83d\udea7","permalink":"/bindings/c"},"next":{"title":"D \ud83d\udea7","permalink":"/bindings/d"}}');var t=s(6070),r=s(5658),c=s(8699);function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"apache-opendal-cpp-binding-wip",children:"Apache OpenDAL\u2122 CPP Binding (WIP)"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://opendal.apache.org/bindings/cpp/",children:(0,t.jsx)(n.img,{src:"/img/external/552ab0d9376d217ab2e8b0ade233afb8.svg",alt:""})})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://github.com/apache/opendal/assets/5351546/87bbf6e5-f19e-449a-b368-3e283016c887",alt:""})}),"\n",(0,t.jsxs)(n.p,{children:["Documents: ",(0,t.jsx)(n.a,{href:"https://opendal.apache.org/docs/cpp/",children:(0,t.jsx)(n.img,{src:"/img/external/2df9af50d923c7e6cd0c9521c3d4e194.svg",alt:"Documents"})})]}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cpp",children:'#include "opendal.hpp"\n#include <vector>\n\nint main() {\n    auto op = opendal::Operator("memory");\n    std::vector<uint8_t> data = {1, 2, 3, 4, 5};\n    op.write("test", data);\n    auto result = op.read("test");  // result == data\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["More examples can be found ",(0,t.jsx)(n.a,{href:"../../examples/cpp",children:"here"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"using",children:"Using"}),"\n",(0,t.jsx)(n.h3,{id:"cmake",children:"CMake"}),"\n",(0,t.jsxs)(n.p,{children:["You can use ",(0,t.jsx)(n.code,{children:"FetchContent"})," to add OpenDAL to your project."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cmake",children:"FetchContent_Declare(\n  opendal-cpp\n  GIT_REPOSITORY https://github.com/apache/opendal.git\n  GIT_TAG        v0.40.0\n  SOURCE_SUBDIR  bindings/cpp\n)\nFetchContent_MakeAvailable(opendal-cpp)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Or you can download the source code and add it to your project."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"mkdir third_party\ncd third_party\ngit clone https://github.com/apache/opendal.git\ngit checkout v0.40.0\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cmake",children:"add_subdirectory(third_party/opendal/bindings/cpp)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now you can use OpenDAL in your project."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cmake",children:"target_link_libraries(your_target opendal_cpp)\n"})}),"\n",(0,t.jsx)(n.h3,{id:"others",children:"Others"}),"\n",(0,t.jsx)(n.p,{children:"Support for more package managers is coming soon!"}),"\n",(0,t.jsx)(n.h2,{id:"compiling",children:"Compiling"}),"\n",(0,t.jsx)(n.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"CMake >= 3.22"}),"\n",(0,t.jsx)(n.li,{children:"C++ compiler with C++17 support"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"build",children:"Build"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir build\ncd build\n# Add -DOPENDAL_DEV=ON to make development environment for OpenDAL\ncmake ..\nmake\n"})}),"\n",(0,t.jsx)(n.h3,{id:"test",children:"Test"}),"\n",(0,t.jsxs)(n.p,{children:["You should build the project with ",(0,t.jsx)(n.code,{children:"OPENDAL_ENABLE_TESTING"})," option. Then run:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"make test\n"})}),"\n",(0,t.jsx)(n.h3,{id:"docs",children:"Docs"}),"\n",(0,t.jsxs)(n.p,{children:["You should build the project with ",(0,t.jsx)(n.code,{children:"OPENDAL_ENABLE_DOCUMENTATION"})," option. Then run:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"make docs\n"})}),"\n",(0,t.jsx)(n.h3,{id:"cmake-options",children:"CMake Options"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"OPENDAL_DEV"}),": Enable development environment for OpenDAL. It will enable most development options. With this option, you don't need to set other options. Default: ",(0,t.jsx)(n.code,{children:"OFF"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"OPENDAL_ENABLE_ADDRESS_SANITIZER"}),": Enable address sanitizer. Default: ",(0,t.jsx)(n.code,{children:"OFF"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"OPENDAL_ENABLE_DOCUMENTATION"}),": Enable documentation. Default: ",(0,t.jsx)(n.code,{children:"OFF"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"OPENDAL_DOCS_ONLY"}),": Only build documentation. Default: ",(0,t.jsx)(n.code,{children:"OFF"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"OPENDAL_ENABLE_TESTING"}),": Enable testing. Default: ",(0,t.jsx)(n.code,{children:"OFF"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"license-and-trademarks",children:"License and Trademarks"}),"\n",(0,t.jsxs)(n.p,{children:["Licensed under the Apache License, Version 2.0: ",(0,t.jsx)(n.a,{href:"http://www.apache.org/licenses/LICENSE-2.0",children:"http://www.apache.org/licenses/LICENSE-2.0"})]}),"\n",(0,t.jsx)(n.p,{children:"Apache OpenDAL, OpenDAL, and Apache are either registered trademarks or trademarks of the Apache Software Foundation."})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}const a={title:"Cpp \ud83d\udea7"},o=void 0,p={},h=[{value:"Example",id:"example",level:2},{value:"Using",id:"using",level:2},{value:"CMake",id:"cmake",level:3},{value:"Others",id:"others",level:3},{value:"Compiling",id:"compiling",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Build",id:"build",level:3},{value:"Test",id:"test",level:3},{value:"Docs",id:"docs",level:3},{value:"CMake Options",id:"cmake-options",level:3},{value:"License and Trademarks",id:"license-and-trademarks",level:2}];function u(e){return(0,t.jsx)(c.A,{basePath:"bindings/cpp/",children:(0,t.jsx)(l,{components:{h1:"h2"}})})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u()}},8699:(e,n,s)=>{s.d(n,{A:()=>r});var i=s(758),t=s(6070);function r(e){let{children:n,owner:s="apache",repo:r="opendal",branch:c="main",basePath:d="",components:l={}}=e;const a=e=>{const n=e.replace(/^\.\//,"");return`https://github.com/${s}/${r}/blob/${c}/${d}${n}`},o={...l,a:e=>{const{href:n,...s}=e;return n&&n.startsWith("./")?(0,t.jsx)("a",{...s,href:a(n)}):(0,t.jsx)("a",{...e})},p:e=>{const{children:n}=e;if("string"==typeof n){const e=/\[(.*?)\]:\s*(\.\/[^\s]+)/g;if(e.test(n)){const s=n.replace(e,((e,n,s)=>`[${n}]: ${a(s)}`));return(0,t.jsx)("p",{children:s})}}return(0,t.jsx)("p",{...e})}};return"string"==typeof n?(e=>{if("string"!=typeof e)return e;let n=e.replace(/\[(.*?)\]\((\.\/[^)]+)\)/g,((e,n,s)=>`[${n}](${a(s)})`));return n=n.replace(/\[(.*?)\]:\s*(\.\/[^\s]+)/g,((e,n,s)=>`[${n}]: ${a(s)}`)),n})(n):i.isValidElement(n)?i.cloneElement(n,{components:{...n.props.components||{},...o}}):n}},5658:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>d});var i=s(758);const t={},r=i.createContext(t);function c(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);