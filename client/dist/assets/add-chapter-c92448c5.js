import{a as u,t as f,q as j,F as b,j as e,S as g,Y as N,Z as F,_ as n,$ as d,k as v,a1 as y,n as r,A as w}from"./index-61c849f7.js";import{b as C}from"./TrainerCommonValidation-f0c7dcd1.js";const E=()=>{const[l,i]=u.useState(!1),{courseId:o}=f(),m=j(),p=b().state.course,x=async s=>{var t,c;try{i(!0);const a=new FormData;a.append("caption",s.caption),a.append("order",s.order.toString()),a.append("description",s.description),s.videoFile&&a.append("videoFile",s.videoFile[0]),o?(await y(a,o),i(!1),r("Chapter added successfully","success"),m(`/trainer/course/${o}`,{state:{course:p}})):r("Error in adding chapter","error")}catch(a){i(!1),a instanceof w&&((c=(t=a.response)==null?void 0:t.data)!=null&&c.error)?r(a.response.data.error,"error"):r("An error occurred in adding the chapter.","error")}},h={caption:"",description:"",order:0,videoFile:[]};return e.jsxs("div",{className:"bg-white p-4 rounded-lg shadow-md",children:[l&&e.jsx("div",{className:"fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white",children:e.jsx(g,{color:"#007BFF",loading:!0})}),e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Add Chapters"}),e.jsx(N,{initialValues:h,validationSchema:C,onSubmit:x,children:({setFieldValue:s})=>e.jsxs(F,{className:"flex flex-wrap -mx-4",children:[e.jsxs("div",{className:"mb-4 px-4 w-1/2",children:[e.jsx("label",{htmlFor:"caption",className:"block text-sm font-medium text-gray-700",children:"Caption for Video"}),e.jsx(n,{type:"text",id:"caption",name:"caption",className:"form-input"}),e.jsx(d,{name:"caption",component:"div",className:"text-red-500"})]}),e.jsxs("div",{className:"mb-4 px-4 w-1/2",children:[e.jsx("label",{htmlFor:"description",className:"flex text-sm font-medium text-gray-700",children:"Description"}),e.jsx(n,{type:"text",id:"description",name:"description",className:"form-textarea h-16"}),e.jsx(d,{name:"description",component:"div",className:"text-red-500"})]}),e.jsxs("div",{className:"mb-4 px-4 w-1/2",children:[e.jsx("label",{htmlFor:"order",className:"block text-sm font-medium text-gray-700",children:"Order"}),e.jsx(n,{type:"number",id:"order",name:"order",className:"form-input"}),e.jsx(d,{name:"order",component:"div",className:"text-red-500"})]}),e.jsxs("div",{className:"mb-4 px-4 w-1/2",children:[e.jsx("label",{htmlFor:"videoFile",className:"block text-sm font-medium text-gray-700",children:"Upload Video"}),e.jsx("input",{type:"file",id:"videoFile",name:"videoFile",accept:".mp4, .avi, .mov",className:"form-input",onChange:t=>{t.currentTarget.files&&t.currentTarget.files.length>0&&s("videoFile",t.currentTarget.files)}})]}),e.jsx("div",{className:"block w-full px-4 ",children:e.jsx("button",{type:"submit",className:"bg-blue-500 text-white px-4 py-2 rounded-md",children:"Add Chapter"})})]})}),e.jsx(v,{})]})};export{E as default};
