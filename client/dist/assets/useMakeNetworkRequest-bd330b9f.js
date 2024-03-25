import{A as W,r as l,k as v,m as q,l as y,j as N,w as re,W as ie,D as J,H as se,v as ve,n as fe,X as Xe,x as H,a as Ke,z as Ce,N as F,G as he,g as Me,i as We,h as Ye}from"./index-55c54f2d.js";function ne(e,t){return ne=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},ne(e,t)}function Ge(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ne(e,t)}const me=W.createContext(null);function He(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ae(e,t){var o=function(n){return t&&l.isValidElement(n)?t(n):n},i=Object.create(null);return e&&l.Children.map(e,function(r){return r}).forEach(function(r){i[r.key]=o(r)}),i}function qe(e,t){e=e||{},t=t||{};function o(f){return f in t?t[f]:e[f]}var i=Object.create(null),r=[];for(var n in e)n in t?r.length&&(i[n]=r,r=[]):r.push(n);var s,u={};for(var c in t){if(i[c])for(s=0;s<i[c].length;s++){var p=i[c][s];u[i[c][s]]=o(p)}u[c]=o(c)}for(s=0;s<r.length;s++)u[r[s]]=o(r[s]);return u}function D(e,t,o){return o[t]!=null?o[t]:e.props[t]}function Je(e,t){return ae(e.children,function(o){return l.cloneElement(o,{onExited:t.bind(null,o),in:!0,appear:D(o,"appear",e),enter:D(o,"enter",e),exit:D(o,"exit",e)})})}function Qe(e,t,o){var i=ae(e.children),r=qe(t,i);return Object.keys(r).forEach(function(n){var s=r[n];if(l.isValidElement(s)){var u=n in t,c=n in i,p=t[n],f=l.isValidElement(p)&&!p.props.in;c&&(!u||f)?r[n]=l.cloneElement(s,{onExited:o.bind(null,s),in:!0,exit:D(s,"exit",e),enter:D(s,"enter",e)}):!c&&u&&!f?r[n]=l.cloneElement(s,{in:!1}):c&&u&&l.isValidElement(p)&&(r[n]=l.cloneElement(s,{onExited:o.bind(null,s),in:p.props.in,exit:D(s,"exit",e),enter:D(s,"enter",e)}))}}),r}var Ze=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},et={component:"div",childFactory:function(t){return t}},le=function(e){Ge(t,e);function t(i,r){var n;n=e.call(this,i,r)||this;var s=n.handleExited.bind(He(n));return n.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},n}var o=t.prototype;return o.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},o.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(r,n){var s=n.children,u=n.handleExited,c=n.firstRender;return{children:c?Je(r,u):Qe(r,s,u),firstRender:!1}},o.handleExited=function(r,n){var s=ae(this.props.children);r.key in s||(r.props.onExited&&r.props.onExited(n),this.mounted&&this.setState(function(u){var c=v({},u.children);return delete c[r.key],{children:c}}))},o.render=function(){var r=this.props,n=r.component,s=r.childFactory,u=q(r,["component","childFactory"]),c=this.state.contextValue,p=Ze(this.state.children).map(s);return delete u.appear,delete u.enter,delete u.exit,n===null?W.createElement(me.Provider,{value:c},p):W.createElement(me.Provider,{value:c},W.createElement(n,u,p))},t}(W.Component);le.propTypes={};le.defaultProps=et;const tt=le;function nt(e){const{className:t,classes:o,pulsate:i=!1,rippleX:r,rippleY:n,rippleSize:s,in:u,onExited:c,timeout:p}=e,[f,m]=l.useState(!1),h=y(t,o.ripple,o.rippleVisible,i&&o.ripplePulsate),g={width:s,height:s,top:-(s/2)+n,left:-(s/2)+r},b=y(o.child,f&&o.childLeaving,i&&o.childPulsate);return!u&&!f&&m(!0),l.useEffect(()=>{if(!u&&c!=null){const C=setTimeout(c,p);return()=>{clearTimeout(C)}}},[c,u,p]),N("span",{className:h,style:g,children:N("span",{className:b})})}const ot=re("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),R=ot,rt=["center","classes","className"];let Q=e=>e,ge,be,Re,ye;const oe=550,it=80,st=ie(ge||(ge=Q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),at=ie(be||(be=Q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),lt=ie(Re||(Re=Q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),ct=J("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),ut=J(nt,{name:"MuiTouchRipple",slot:"Ripple"})(ye||(ye=Q`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),R.rippleVisible,st,oe,({theme:e})=>e.transitions.easing.easeInOut,R.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,R.child,R.childLeaving,at,oe,({theme:e})=>e.transitions.easing.easeInOut,R.childPulsate,lt,({theme:e})=>e.transitions.easing.easeInOut),pt=l.forwardRef(function(t,o){const i=se({props:t,name:"MuiTouchRipple"}),{center:r=!1,classes:n={},className:s}=i,u=q(i,rt),[c,p]=l.useState([]),f=l.useRef(0),m=l.useRef(null);l.useEffect(()=>{m.current&&(m.current(),m.current=null)},[c]);const h=l.useRef(!1),g=l.useRef(null),b=l.useRef(null),C=l.useRef(null);l.useEffect(()=>()=>{clearTimeout(g.current)},[]);const U=l.useCallback(d=>{const{pulsate:M,rippleX:E,rippleY:V,rippleSize:_,cb:A}=d;p(T=>[...T,N(ut,{classes:{ripple:y(n.ripple,R.ripple),rippleVisible:y(n.rippleVisible,R.rippleVisible),ripplePulsate:y(n.ripplePulsate,R.ripplePulsate),child:y(n.child,R.child),childLeaving:y(n.childLeaving,R.childLeaving),childPulsate:y(n.childPulsate,R.childPulsate)},timeout:oe,pulsate:M,rippleX:E,rippleY:V,rippleSize:_},f.current)]),f.current+=1,m.current=A},[n]),O=l.useCallback((d={},M={},E=()=>{})=>{const{pulsate:V=!1,center:_=r||M.pulsate,fakeElement:A=!1}=M;if((d==null?void 0:d.type)==="mousedown"&&h.current){h.current=!1;return}(d==null?void 0:d.type)==="touchstart"&&(h.current=!0);const T=A?null:C.current,P=T?T.getBoundingClientRect():{width:0,height:0,left:0,top:0};let B,I,k;if(_||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)B=Math.round(P.width/2),I=Math.round(P.height/2);else{const{clientX:z,clientY:S}=d.touches&&d.touches.length>0?d.touches[0]:d;B=Math.round(z-P.left),I=Math.round(S-P.top)}if(_)k=Math.sqrt((2*P.width**2+P.height**2)/3),k%2===0&&(k+=1);else{const z=Math.max(Math.abs((T?T.clientWidth:0)-B),B)*2+2,S=Math.max(Math.abs((T?T.clientHeight:0)-I),I)*2+2;k=Math.sqrt(z**2+S**2)}d!=null&&d.touches?b.current===null&&(b.current=()=>{U({pulsate:V,rippleX:B,rippleY:I,rippleSize:k,cb:E})},g.current=setTimeout(()=>{b.current&&(b.current(),b.current=null)},it)):U({pulsate:V,rippleX:B,rippleY:I,rippleSize:k,cb:E})},[r,U]),j=l.useCallback(()=>{O({},{pulsate:!0})},[O]),w=l.useCallback((d,M)=>{if(clearTimeout(g.current),(d==null?void 0:d.type)==="touchend"&&b.current){b.current(),b.current=null,g.current=setTimeout(()=>{w(d,M)});return}b.current=null,p(E=>E.length>0?E.slice(1):E),m.current=M},[]);return l.useImperativeHandle(o,()=>({pulsate:j,start:O,stop:w}),[j,O,w]),N(ct,v({className:y(R.root,n.root,s),ref:C},u,{children:N(tt,{component:null,exit:!0,children:c})}))}),dt=pt;function ft(e){return ve("MuiButtonBase",e)}const ht=re("MuiButtonBase",["root","disabled","focusVisible"]),mt=ht,gt=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],bt=e=>{const{disabled:t,focusVisible:o,focusVisibleClassName:i,classes:r}=e,s=Ce({root:["root",t&&"disabled",o&&"focusVisible"]},ft,r);return o&&i&&(s.root+=` ${i}`),s},Rt=J("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${mt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),yt=l.forwardRef(function(t,o){const i=se({props:t,name:"MuiButtonBase"}),{action:r,centerRipple:n=!1,children:s,className:u,component:c="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:m=!1,focusRipple:h=!1,LinkComponent:g="a",onBlur:b,onClick:C,onContextMenu:U,onDragLeave:O,onFocus:j,onFocusVisible:w,onKeyDown:d,onKeyUp:M,onMouseDown:E,onMouseLeave:V,onMouseUp:_,onTouchEnd:A,onTouchMove:T,onTouchStart:P,tabIndex:B=0,TouchRippleProps:I,touchRippleRef:k,type:z}=i,S=q(i,gt),X=l.useRef(null),x=l.useRef(null),Ee=fe(x,k),{isFocusVisibleRef:ce,onFocus:Te,onBlur:xe,ref:Be}=Xe(),[L,Y]=l.useState(!1);p&&L&&Y(!1),l.useImperativeHandle(r,()=>({focusVisible:()=>{Y(!0),X.current.focus()}}),[]);const[Z,Se]=l.useState(!1);l.useEffect(()=>{Se(!0)},[]);const $e=Z&&!f&&!p;l.useEffect(()=>{L&&h&&!f&&Z&&x.current.pulsate()},[f,h,L,Z]);function $(a,pe,Ae=m){return H(de=>(pe&&pe(de),!Ae&&x.current&&x.current[a](de),!0))}const Pe=$("start",E),Ie=$("stop",U),ke=$("stop",O),Ve=$("stop",_),ze=$("stop",a=>{L&&a.preventDefault(),V&&V(a)}),Le=$("start",P),De=$("stop",A),Ne=$("stop",T),Oe=$("stop",a=>{xe(a),ce.current===!1&&Y(!1),b&&b(a)},!1),we=H(a=>{X.current||(X.current=a.currentTarget),Te(a),ce.current===!0&&(Y(!0),w&&w(a)),j&&j(a)}),ee=()=>{const a=X.current;return c&&c!=="button"&&!(a.tagName==="A"&&a.href)},te=l.useRef(!1),_e=H(a=>{h&&!te.current&&L&&x.current&&a.key===" "&&(te.current=!0,x.current.stop(a,()=>{x.current.start(a)})),a.target===a.currentTarget&&ee()&&a.key===" "&&a.preventDefault(),d&&d(a),a.target===a.currentTarget&&ee()&&a.key==="Enter"&&!p&&(a.preventDefault(),C&&C(a))}),Fe=H(a=>{h&&a.key===" "&&x.current&&L&&!a.defaultPrevented&&(te.current=!1,x.current.stop(a,()=>{x.current.pulsate(a)})),M&&M(a),C&&a.target===a.currentTarget&&ee()&&a.key===" "&&!a.defaultPrevented&&C(a)});let G=c;G==="button"&&(S.href||S.to)&&(G=g);const K={};G==="button"?(K.type=z===void 0?"button":z,K.disabled=p):(!S.href&&!S.to&&(K.role="button"),p&&(K["aria-disabled"]=p));const Ue=fe(o,Be,X),ue=v({},i,{centerRipple:n,component:c,disabled:p,disableRipple:f,disableTouchRipple:m,focusRipple:h,tabIndex:B,focusVisible:L}),je=bt(ue);return Ke(Rt,v({as:G,className:y(je.root,u),ownerState:ue,onBlur:Oe,onClick:C,onContextMenu:Ie,onFocus:we,onKeyDown:_e,onKeyUp:Fe,onMouseDown:Pe,onMouseLeave:ze,onMouseUp:Ve,onDragLeave:ke,onTouchEnd:De,onTouchMove:Ne,onTouchStart:Le,ref:Ue,tabIndex:p?-1:B,type:z},K,S,{children:[s,$e?N(dt,v({ref:Ee,center:n},I)):null]}))}),vt=yt;function Ct(e){return ve("MuiIconButton",e)}const Mt=re("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),Et=Mt,Tt=["edge","children","className","color","disabled","disableFocusRipple","size"],xt=e=>{const{classes:t,disabled:o,color:i,edge:r,size:n}=e,s={root:["root",o&&"disabled",i!=="default"&&`color${F(i)}`,r&&`edge${F(r)}`,`size${F(n)}`]};return Ce(s,Ct,t)},Bt=J(vt,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="default"&&t[`color${F(o.color)}`],o.edge&&t[`edge${F(o.edge)}`],t[`size${F(o.size)}`]]}})(({theme:e,ownerState:t})=>v({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:he(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12}),({theme:e,ownerState:t})=>{var o;const i=(o=(e.vars||e).palette)==null?void 0:o[t.color];return v({},t.color==="inherit"&&{color:"inherit"},t.color!=="inherit"&&t.color!=="default"&&v({color:i==null?void 0:i.main},!t.disableRipple&&{"&:hover":v({},i&&{backgroundColor:e.vars?`rgba(${i.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:he(i.main,e.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),t.size==="small"&&{padding:5,fontSize:e.typography.pxToRem(18)},t.size==="large"&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${Et.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}})}),St=l.forwardRef(function(t,o){const i=se({props:t,name:"MuiIconButton"}),{edge:r=!1,children:n,className:s,color:u="default",disabled:c=!1,disableFocusRipple:p=!1,size:f="medium"}=i,m=q(i,Tt),h=v({},i,{edge:r,color:u,disabled:c,disableFocusRipple:p,size:f}),g=xt(h);return N(Bt,v({className:y(g.root,s),centerRipple:!0,focusRipple:!p,disabled:c,ref:o,ownerState:h},m,{children:n}))}),kt=St,$t=()=>{const e=Me(),t=We();return()=>{localStorage.removeItem("firstLogin"),e({type:"IS_LOGGED",payload:!1}),e({type:"IS_ADMIN",payload:!1}),t("/"),e({type:"SUCCESS",payload:"Logged Out"})}},Vt=()=>{const[e,t]=l.useState(!1),[o,i]=l.useState(!1),r=Ye(),n=Me(),s=$t();return{executeServerRequest:async(c,p=[],f=!0,m,h="Something went wrong")=>{if(!r){n({type:"ERROR",payload:"Please check your internet"});return}try{o&&i(!1),t(!0),await c(...p),m&&n({type:"SUCCESS",payload:m})}catch(g){i(!0),g.response?g.response.status===401?(s(),n({type:"ALERT",payload:"Please login"})):typeof g.response.data=="string"?n({type:"ERROR",payload:g.response.data}):f&&n({type:"ERROR",payload:h}):f&&n({type:"ERROR",payload:h})}t(!1)},loading:e,error:o}};export{vt as B,kt as I,me as T,Ge as _,$t as a,Vt as u};
