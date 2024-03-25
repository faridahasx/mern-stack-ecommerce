import{b as p,j as e,r as l,a as s,B as N,F as S,d as v,L as x,c as y,e as z,g as w,h as b,f as u,C,E as P}from"./index-55c54f2d.js";import{L as A}from"./Layout-7d517879.js";import{S as D}from"./Slider-9fa56f61.js";import{u as g}from"./useMakeNetworkRequest-bd330b9f.js";import{S as L}from"./SubmitButton-74c3609e.js";import"./useElementOnScreen-8bbe7a21.js";const $=p(e("path",{d:"M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"}),"AddShoppingCart"),I=p([e("path",{d:"M15.5 5H11l5 7-5 7h4.5l5-7z"},"0"),e("path",{d:"M8.5 5H4l5 7-5 7h4.5l5-7z"},"1")],"DoubleArrow");const V=({images:a})=>e(D,{sliderLength:a.length,children:e("ul",{className:"image-ul flex",children:a.map((c,i)=>e("li",{className:"image-li flex",children:e("img",{className:"slider-img",alt:"Product",src:c.url})},i))})});const E=({product:a})=>{const[c,i]=l.useState(a.size[0]),{executeServerRequest:n,loading:t}=g(),d=()=>{n(async()=>{await v.post("/api/cart",{productID:a._id,size:c})},[],!0,"Added")};return s("section",{id:"product-primary",className:"flex column",children:[e("div",{id:"s-product-details",className:"flex",children:s("div",{children:[s("span",{className:"flex",children:[e("h1",{className:"product-dtl",children:a.title}),s("h3",{className:"product-dtl",children:["$",a.price]})]}),e("h2",{className:"product-dtl",children:a.description}),s("div",{className:"product-dtl",children:[e("label",{htmlFor:"size",children:"Size:"}),e("select",{name:"size",onChange:r=>i(r.target.value),title:"Select",children:a.size.map((r,o)=>e("option",{value:r,children:r},o))})]})]})}),e("div",{id:"add-to-cart",className:"center product-dtl",children:e(L,{onClick:d,disabled:t,children:t?e(N,{}):s(S,{children:[e($,{})," Add To Cart"]})})})]})};const H=({product:a})=>s("table",{id:"details-table",className:"flex",children:[e("thead",{children:s("tr",{className:"flex column",children:[e("th",{children:"Category:"}),e("th",{children:"Sleeve Type:"}),e("th",{children:"Color:"}),e("th",{children:"Available Size:"})]})}),e("tbody",{children:s("tr",{className:"flex column",children:[e("td",{className:"flex",children:a.category}),e("td",{children:a.sleeve}),e("td",{children:a.color}),e("td",{children:a.size.join(", ")})]})})]});const T=({product:a})=>s("div",{className:"single-product flex",children:[e(V,{images:a.images}),s("div",{id:"product-primary",className:"flex column",children:[e(E,{product:a}),e(H,{product:a}),e("div",{className:"center see-more",children:s(x,{className:"flex",to:{pathname:"/products",search:`${y({category:a.category,page:"1"})}`},children:[e("span",{className:"center",children:a.category}),e("span",{className:"center",children:e(I,{})})]})})]})]}),O=()=>{const a=z();w();const c=b(),[i,n]=l.useState(!1),[t,d]=l.useState(null),{executeServerRequest:r,loading:o,error:f}=g(),h=a.pathname.split("/")[2];return l.useEffect(()=>{(async()=>{if(!i){n(!0);try{await u.patch(`/api/products/${h}`)}catch{n(!1)}}})()},[a]),l.useEffect(()=>{!t&&r(async()=>{const m=await u.get(`/api/products/${h}`);d(m.data)})},[a,c]),l.useEffect(()=>{window.scrollTo(0,0)},[t]),e(A,{children:o&&!t?e(C,{}):t?e(T,{product:t}):f&&e(P,{})})};export{O as default};
