import{j as e,a as s,L as i,c as l}from"./index-55c54f2d.js";import{L as t}from"./Layout-7d517879.js";import{h as a}from"./constants-b92bdba3.js";import{S as n}from"./Slider-9fa56f61.js";import{P as o}from"./ProductsListing-572166e0.js";import"./useMakeNetworkRequest-bd330b9f.js";import"./useElementOnScreen-8bbe7a21.js";import"./Delete-3f5402e5.js";const d=()=>e(n,{sliderLength:a.length,children:e("ul",{className:"cat-slider-ul flex",children:a.map((r,c)=>e("li",{className:"category-slider-li center",children:s(i,{className:"flex category-slider-link",target:"_blank",to:{pathname:"/products",search:`${l({category:r.link,page:"1"})}`},children:[e("div",{className:"category-img-wrapper center",children:e("img",{className:"category-img",src:r.image.url,alt:r.heading})}),e("div",{className:"center slider-heading-wrapper",children:e("div",{className:"flex",children:e("h2",{className:"category-slider-heading center shadow text-overflow",children:r.heading})})})]})},c))})});const m=({heading:r})=>e("div",{id:"banner",className:"center",children:e(i,{className:"center",to:"/products",children:e("h1",{className:"text-overflow",children:r})})}),L=()=>s(t,{children:[e(d,{}),e(m,{heading:"Popular Products"}),e(o,{})]});export{L as default};
