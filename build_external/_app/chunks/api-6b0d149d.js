var g=Object.defineProperty,m=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var c=(e,t,n)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,l=(e,t)=>{for(var n in t||(t={}))w.call(t,n)&&c(e,n,t[n]);if(s)for(var n of s(t))k.call(t,n)&&c(e,n,t[n]);return e},u=(e,t)=>m(e,y(t));import{D as d,Y as b}from"./vendor-e5d6427b.js";function p(e,t){const n=typeof localStorage!="undefined"?localStorage.getItem(e):null,a=d(t);if(n!==null)try{a.set(JSON.parse(n))}catch(r){console.log("Invalid APIConfiguration data: ",r),localStorage.setItem(e,JSON.stringify(t))}return a.subscribe(r=>{typeof localStorage!="undefined"&&localStorage.setItem(e,JSON.stringify(r))}),a}p("theme","dark");const h=d({open:!1,pin:""}),W={id:"-1",coverImage:"",name:"Untitled",output:"","prep-cmd":[],detached:[],cmd:"",cwd:""};let o=null;const S=p("apiConfig",{host:"localhost",port:"47990",endpoint:"v1",token:""});async function E(e,t={}){if(!o)throw new Error("Default WebSocket is not connected. Did you run StartWebSocketServer()?");return new Promise(n=>{o.send(JSON.stringify({type:e,data:t}));const a=setTimeout(()=>n(null),15e3);o.onmessage=r=>{clearTimeout(a),n(JSON.parse(r.data))}})}async function O(){return new Promise(e=>{const t=async()=>{await O(),e()};if(!o){setTimeout(t,200);return}if(o.readyState!=o.OPEN){setTimeout(t,200);return}e()})}function f(){o&&o.readyState==o.OPEN&&o.close(),o=null,S.update(e=>u(l({},e),{token:""}))}async function P(e,t){if(!("WebSocket"in window))return!1;if(o)return o.readyState===o.OPEN;const n=t||b(S);return new Promise(a=>{try{console.log("Connecting",n),o=new window.WebSocket(`wss://${n.host}:${n.port}/${n.endpoint}?token=${n.token}`),o.onerror=()=>{f(),a(!1)},o.addEventListener("message",r=>{const i=JSON.parse(r.data);Object.prototype.hasOwnProperty.call(i,"type")&&i.type==="request_pin"&&h.set({open:!0,pin:""})}),o.onopen=function(r){console.log("Socket connected",r),a(!0)},o.onclose=function(){f(),a(!1),e&&setTimeout(()=>P(e),1500)}}catch(r){console.log("Error while creating WebSocket",r),a(!1)}})}export{E as A,W as E,P as S,O as W,S as a,f as i,h as p};
