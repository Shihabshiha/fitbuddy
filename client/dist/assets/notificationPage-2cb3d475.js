import{W as R,a as c,X as b,j as e,U as _,r as A,k as C,a9 as E,A as N,n as g,aa as I}from"./index-61c849f7.js";import{p as P,f as T}from"./index-b56912a5.js";import"./index-e8d5e7d2.js";var y=globalThis&&globalThis.__assign||function(){return y=Object.assign||function(s){for(var l,n=1,a=arguments.length;n<a;n++){l=arguments[n];for(var r in l)Object.prototype.hasOwnProperty.call(l,r)&&(s[r]=l[r])}return s},y.apply(this,arguments)},k=globalThis&&globalThis.__rest||function(s,l){var n={};for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&l.indexOf(a)<0&&(n[a]=s[a]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,a=Object.getOwnPropertySymbols(s);r<a.length;r++)l.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(s,a[r])&&(n[a[r]]=s[a[r]]);return n},z=R("PulseLoader","0% {transform: scale(1); opacity: 1} 45% {transform: scale(0.1); opacity: 0.7} 80% {transform: scale(1); opacity: 1}","pulse");function D(s){var l=s.loading,n=l===void 0?!0:l,a=s.color,r=a===void 0?"#000000":a,u=s.speedMultiplier,p=u===void 0?1:u,f=s.cssOverride,h=f===void 0?{}:f,m=s.size,x=m===void 0?15:m,v=s.margin,j=v===void 0?2:v,t=k(s,["loading","color","speedMultiplier","cssOverride","size","margin"]),d=y({display:"inherit"},h),o=function(i){return{backgroundColor:r,width:b(x),height:b(x),margin:b(j),borderRadius:"100%",display:"inline-block",animation:"".concat(z," ").concat(.75/p,"s ").concat(i*.12/p,"s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),animationFillMode:"both"}};return n?c.createElement("span",y({style:d},t),c.createElement("span",{style:o(1)}),c.createElement("span",{style:o(2)}),c.createElement("span",{style:o(3)})):null}const F=({itemCount:s})=>{const l=Array.from({length:s},(n,a)=>a);return e.jsx("div",{children:l.map(n=>e.jsxs("div",{className:"flex mt-3  hover:cursor-pointer gap-1",children:[e.jsx("div",{className:"animate-pulse",children:e.jsx("div",{className:"w-10 h-10 bg-gray-300 rounded-full"})}),e.jsx("div",{className:"ml-2 text-sm w-full h-full",children:e.jsxs("div",{className:"animate-pulse h-full w-full",children:[e.jsx("p",{className:"text-sm font-semibold bg-gray-300  w-32 h-4"}),e.jsx("p",{className:"bg-gray-300 w-40 h-4 "}),e.jsx("p",{className:"bg-gray-300 w-24 h-4 "})]})})]},n))})},V=()=>{const[s,l]=c.useState([]),[n,a]=c.useState(!1),[r,u]=c.useState(null),[p,f]=c.useState(""),[h,m]=c.useState(!1),x=async()=>{var t,d,o;a(!0);try{const i=await E();l((t=i.data)==null?void 0:t.notifications),a(!1)}catch(i){a(!1),i instanceof N&&((o=(d=i.response)==null?void 0:d.data)!=null&&o.error)?g(i.response.data.error,"error"):g("something went wrong loading notifications.","error")}};c.useEffect(()=>{x()},[]);const v=t=>{u(t)},j=async()=>{var t,d;if(m(!0),r&&p){const o=r.relatedCommentId;try{await I(o,p),g("Replied successfully","success"),m(!1),f(""),u(null)}catch(i){m(!1),i instanceof N&&((d=(t=i.response)==null?void 0:t.data)!=null&&d.error)?g(i.response.data.error,"error"):g("something went wrong loading notifications.","error")}}else m(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("h1",{className:"text-lg md:text-3xl font-bold mb-5 px-10",children:"Notifications"}),n?e.jsx(F,{itemCount:6}):e.jsx("div",{className:"px-10 grid",children:e.jsx("div",{className:"border p-2 h-[70vh] overflow-auto",children:s?s.map((t,d)=>{const o=t.createdAt.toString(),i=P(o),w=T(i,{addSuffix:!0}),O=r&&r._id===t._id;return e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex hover:bg-blue-gray-50 hover:cursor-pointer  gap-1",onClick:()=>v(t),children:[e.jsx("div",{children:e.jsx("img",{src:t.userDetails[0].profileImage||_,alt:"image",className:"w-10 h-10 object-cover rounded-full"})}),e.jsxs("div",{className:"ml-2 text-sm w-full",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("p",{className:"text-sm",children:[e.jsxs("span",{className:"font-semibold",children:[t.userDetails[0].firstName,t.userDetails[0].lastName]}),' commented : "',t.commentContent,'"']}),e.jsx("p",{className:"text-end",children:w})]}),e.jsxs("p",{children:["on your video '",t.videoDetails[0].caption,"'"]})]})]}),O&&e.jsxs("div",{className:"flex",children:[e.jsx(A.Input,{variant:"standard",placeholder:"add a replay",className:"placeholder:italic",value:p,onChange:S=>f(S.target.value)}),e.jsx("div",{className:"mt-4 gap-1",children:e.jsx("button",{className:"rounded-full px-2 bg-green-600 hover:bg-green-700 text-white",onClick:j,disabled:h,children:h?e.jsx(D,{size:24,color:"#FFF",loading:!0,className:"absolute"}):"Reply"})})]})]},d)}):e.jsx("div",{children:e.jsx("h1",{children:"No Notifications"})})})}),e.jsx(C,{})]})};export{V as default};
