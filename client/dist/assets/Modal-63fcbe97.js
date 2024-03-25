import{v as E,w as U,D as z,k as l,r as y,m as _,P as ee,a as W,j as r,l as w,N as R,z as H,b as O,J as oe,G as te,H as A}from"./index-55c54f2d.js";import{u as G,f as ae}from"./useFormControl-b63d2366.js";import{B as ne}from"./useMakeNetworkRequest-bd330b9f.js";import{T as q}from"./Typography-25c1f1a3.js";function se(e){return E("PrivateSwitchBase",e)}U("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const le=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],ce=e=>{const{classes:o,checked:a,disabled:n,edge:t}=e,s={root:["root",a&&"checked",n&&"disabled",t&&`edge${R(t)}`],input:["input"]};return H(s,se,o)},re=z(ne)(({ownerState:e})=>l({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),ie=z("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),de=y.forwardRef(function(o,a){const{autoFocus:n,checked:t,checkedIcon:s,className:x,defaultChecked:i,disabled:P,disableFocusRipple:d=!1,edge:v=!1,icon:B,id:f,inputProps:I,inputRef:C,name:c,onBlur:m,onChange:g,onFocus:b,readOnly:L,required:F=!1,tabIndex:k,type:u,value:T}=o,J=_(o,le),[j,K]=ee({controlled:t,default:!!i,name:"SwitchBase",state:"checked"}),h=G(),Q=p=>{b&&b(p),h&&h.onFocus&&h.onFocus(p)},X=p=>{m&&m(p),h&&h.onBlur&&h.onBlur(p)},Y=p=>{if(p.nativeEvent.defaultPrevented)return;const V=p.target.checked;K(V),g&&g(p,V)};let $=P;h&&typeof $>"u"&&($=h.disabled);const Z=u==="checkbox"||u==="radio",M=l({},o,{checked:j,disabled:$,disableFocusRipple:d,edge:v}),D=ce(M);return W(re,l({component:"span",className:w(D.root,x),centerRipple:!0,focusRipple:!d,disabled:$,tabIndex:null,role:void 0,onFocus:Q,onBlur:X,ownerState:M,ref:a},J,{children:[r(ie,l({autoFocus:n,checked:t,defaultChecked:i,className:D.input,disabled:$,id:Z?f:void 0,name:c,onChange:Y,readOnly:L,ref:C,required:F,ownerState:M,tabIndex:k,type:u},u==="checkbox"&&T===void 0?{}:{value:T},I)),j?s:B]}))}),ue=de,pe=O(r("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),me=O(r("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),be=O(r("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function he(e){return E("MuiCheckbox",e)}const fe=U("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),N=fe,Ce=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],ge=e=>{const{classes:o,indeterminate:a,color:n}=e,t={root:["root",a&&"indeterminate",`color${R(n)}`]},s=H(t,he,o);return l({},o,s)},ke=z(ue,{shouldForwardProp:e=>oe(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:a}=e;return[o.root,a.indeterminate&&o.indeterminate,a.color!=="default"&&o[`color${R(a.color)}`]]}})(({theme:e,ownerState:o})=>l({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:te(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${N.checked}, &.${N.indeterminate}`]:{color:(e.vars||e).palette[o.color].main},[`&.${N.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),ye=r(me,{}),ve=r(pe,{}),xe=r(be,{}),Pe=y.forwardRef(function(o,a){var n,t;const s=A({props:o,name:"MuiCheckbox"}),{checkedIcon:x=ye,color:i="primary",icon:P=ve,indeterminate:d=!1,indeterminateIcon:v=xe,inputProps:B,size:f="medium",className:I}=s,C=_(s,Ce),c=d?v:P,m=d?v:x,g=l({},s,{color:i,indeterminate:d,size:f}),b=ge(g);return r(ke,l({type:"checkbox",inputProps:l({"data-indeterminate":d},B),icon:y.cloneElement(c,{fontSize:(n=c.props.fontSize)!=null?n:f}),checkedIcon:y.cloneElement(m,{fontSize:(t=m.props.fontSize)!=null?t:f}),ownerState:g,ref:a,className:w(b.root,I)},C,{classes:b}))}),Ne=Pe;function Be(e){return E("MuiFormControlLabel",e)}const Ie=U("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]),S=Ie,Fe=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","slotProps","value"],$e=e=>{const{classes:o,disabled:a,labelPlacement:n,error:t}=e,s={root:["root",a&&"disabled",`labelPlacement${R(n)}`,t&&"error"],label:["label",a&&"disabled"]};return H(s,Be,o)},Re=z("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:a}=e;return[{[`& .${S.label}`]:o.label},o.root,o[`labelPlacement${R(a.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>l({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${S.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${S.label}`]:{[`&.${S.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),Le=y.forwardRef(function(o,a){var n;const t=A({props:o,name:"MuiFormControlLabel"}),{className:s,componentsProps:x={},control:i,disabled:P,disableTypography:d,label:v,labelPlacement:B="end",slotProps:f={}}=t,I=_(t,Fe),C=G();let c=P;typeof c>"u"&&typeof i.props.disabled<"u"&&(c=i.props.disabled),typeof c>"u"&&C&&(c=C.disabled);const m={disabled:c};["checked","name","onChange","value","inputRef"].forEach(u=>{typeof i.props[u]>"u"&&typeof t[u]<"u"&&(m[u]=t[u])});const g=ae({props:t,muiFormControl:C,states:["error"]}),b=l({},t,{disabled:c,labelPlacement:B,error:g.error}),L=$e(b),F=(n=f.typography)!=null?n:x.typography;let k=v;return k!=null&&k.type!==q&&!d&&(k=r(q,l({component:"span"},F,{className:w(L.label,F==null?void 0:F.className),children:k}))),W(Re,l({className:w(L.root,s),ownerState:b,ref:a},I,{children:[y.cloneElement(i,m),k]}))}),Ee=Le;const Ue=({handleClose:e,children:o})=>(y.useEffect(()=>(document.body.classList.add("overflow-hidden"),()=>document.body.classList.remove("overflow-hidden")),[]),r("div",{className:"modal-container",onClick:n=>{n.target.className==="modal-container"&&e()},children:o}));export{Ne as C,Ee as F,Ue as M};
