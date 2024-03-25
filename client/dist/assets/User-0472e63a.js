import{b as c,j as e,a as n,B as u,d as m,r as h,F as b}from"./index-55c54f2d.js";import{u as p,a as N}from"./useMakeNetworkRequest-bd330b9f.js";import{S as g}from"./SubmitButton-74c3609e.js";import{I as y}from"./InputLabel-5cf72cb3.js";import{I as S}from"./Input-7cfc3984.js";import{L}from"./Layout-7d517879.js";import"./useFormControl-b63d2366.js";const x=c(e("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}),"Home"),A=c(e("path",{d:"M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"}),"LocalShipping"),k=c(e("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"}),"Logout"),z=c(e("path",{d:"M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"}),"Store");const B=[{title:"Address Book",icon:e(x,{})},{title:"My Orders",icon:e(z,{})},{title:"Track My Orders",icon:e(A,{})}],C=({setCurrentWindow:a,currentWindow:s})=>{const{executeServerRequest:o,loading:r}=p(),d=N(),i=()=>{o(async()=>{await m.get("/api/auth/logout"),d()})};return e("nav",{id:"profile-nav",className:"flex",children:n("ul",{id:"profile-ul",className:"flex column",children:[B.map((t,l)=>e("li",{children:e("button",{className:"center",title:t.title,onClick:()=>a(t.title),disabled:t.title===s,children:n("span",{className:"center",children:[e("span",{className:`center ${t.title!==s&&"icon"}`,children:t.icon}),e("span",{className:"hidden",children:t.title})]})})},l)),e("li",{children:e("button",{className:"center",onClick:i,title:"Logout",disabled:r,children:n("span",{className:"center",children:[e("span",{className:"center",children:r?e(u,{}):e(k,{})}),e("span",{className:"hidden center",children:"Logout"})]})})})]})})};let H={firstname:"",lastname:"",mobile:"",country:"",streetAddress:"",apt:"",city:"",postcode:""},w=[{name:"firstname",label:"First Name:"},{name:"lastname",label:"Last Name:"},{name:"mobile",label:"Mobile:"},{name:"country",label:"Country:"},{name:"streetAddress",label:"Street Address:"},{name:"apt",label:"Apt:"},{name:"city",label:"City:"},{name:"postcode",label:" Postcode:"}];const I=()=>{const[a,s]=h.useState(H),{executeServerRequest:o,loading:r}=p();h.useEffect(()=>{o(async()=>{try{const t=await m.get("/api/user/address");s(l=>({...l,...t.data}))}catch{}})},[]);const d=async t=>{t.preventDefault(),o(async()=>{await m.patch("/api/user/address",a)},[],!0,"Saved changes")},i=t=>{let l=t.target,{name:v,value:f}=l;s({...a,[v]:f})};return n("form",{id:"address-form",onSubmit:d,className:"flex column",name:"Address Book",children:[e("h1",{children:"Address Book"}),w.map(t=>n(b,{children:[e(y,{htmlFor:t.name,children:t.label}),e(S,{id:t.name,className:"address-input",type:"text",onChange:i,name:t.name,value:a[t.name]})]})),e(g,{type:"submit",disabled:r,children:r?e(u,{}):"Save"})]})};const R=()=>{const[a,s]=h.useState("Address Book");return e(L,{children:n("section",{id:"profile",className:"flex",children:[e(C,{setCurrentWindow:s,currentWindow:a}),e("section",{id:"profile-window",className:"flex column",children:a===""||a==="Address Book"?e(I,{}):e("h1",{id:"profile-window-empty",className:"center",children:"You don't have any orders yet"})})]})})};export{R as default};
