import{S as G,i as K,s as J,e as y,k as D,t as R,c as E,a as I,m as P,h as q,d as g,F as we,b as v,g as x,G as b,H as j,w as F,x as W,y as O,n as Z,o as V,B as H,p as ee,q as A,I as $e,J as z,K as de,L as ye,M as Ee,N as Ie,O as Ne,P as re,Q as me,l as ae,R as Y,T as oe,v as Se,U as ge,V as be,W as ve,X as ke}from"../chunks/vendor-e5d6427b.js";import{i as De,p as Q,W as Pe,A as Ae,a as ie,S as ue}from"../chunks/api-6b0d149d.js";import{r as xe}from"../chunks/singletons-a6a7384f.js";function Ve(n){let t,s,e,l,o,r,h;return{c(){t=y("navbar"),s=y("div"),e=y("img"),o=D(),r=y("div"),h=R("Sunshine"),this.h()},l(i){t=E(i,"NAVBAR",{class:!0});var a=I(t);s=E(a,"DIV",{class:!0});var p=I(s);e=E(p,"IMG",{src:!0,alt:!0,class:!0}),o=P(p),r=E(p,"DIV",{class:!0});var u=I(r);h=q(u,"Sunshine"),u.forEach(g),p.forEach(g),a.forEach(g),this.h()},h(){we(e.src,l="/sunshine.png")||v(e,"src",l),v(e,"alt","Sunshine logo"),v(e,"class","h-12 w-12"),v(r,"class","col-span-6 col-start-9 row-start-3 text-center font-medium text-4xl"),v(s,"class","flex items-center space-x-4"),v(t,"class","block container flex items-center space-x-4 mx-auto mt-8 mb-8")},m(i,a){x(i,t,a),b(t,s),b(s,e),b(s,o),b(s,r),b(r,h)},p:j,i:j,o:j,d(i){i&&g(t)}}}class Be extends G{constructor(t){super();K(this,t,null,Ve,J,{})}}function ce(n,t,s){const e=n.slice();return e[4]=t[s],e}function fe(n){let t,s,e,l,o,r,h,i,a=n[4].title+"",p,u,m,c;var k=n[4].icon;function _(f){return{}}return k&&(r=new k(_())),{c(){t=y("a"),s=y("div"),l=D(),o=y("div"),r&&F(r.$$.fragment),h=D(),i=y("span"),p=R(a),this.h()},l(f){t=E(f,"A",{href:!0,class:!0});var d=I(t);s=E(d,"DIV",{class:!0}),I(s).forEach(g),l=P(d),o=E(d,"DIV",{class:!0});var S=I(o);r&&W(r.$$.fragment,S),S.forEach(g),h=P(d),i=E(d,"SPAN",{class:!0});var C=I(i);p=q(C,a),C.forEach(g),d.forEach(g),this.h()},h(){v(s,"class",e="w-1 h-14 "+(n[0]===n[4].href?"bg-blue-500":"")+" mr-4"),v(o,"class","w-6 h-6 mr-4"),v(i,"class","pr-16"),v(t,"href",u=n[4].href),v(t,"class",m="h-14 text-xl "+(n[0]===n[4].href?"text-blue-500":"text-gray-800")+" flex items-center")},m(f,d){x(f,t,d),b(t,s),b(t,l),b(t,o),r&&O(r,o,null),b(t,h),b(t,i),b(i,p),c=!0},p(f,d){if((!c||d&1&&e!==(e="w-1 h-14 "+(f[0]===f[4].href?"bg-blue-500":"")+" mr-4"))&&v(s,"class",e),k!==(k=f[4].icon)){if(r){Z();const S=r;V(S.$$.fragment,1,0,()=>{H(S,1)}),ee()}k?(r=new k(_()),F(r.$$.fragment),A(r.$$.fragment,1),O(r,o,null)):r=null}(!c||d&1&&m!==(m="h-14 text-xl "+(f[0]===f[4].href?"text-blue-500":"text-gray-800")+" flex items-center"))&&v(t,"class",m)},i(f){c||(r&&A(r.$$.fragment,f),c=!0)},o(f){r&&V(r.$$.fragment,f),c=!1},d(f){f&&g(t),r&&H(r)}}}function Ce(n){let t,s,e,l,o,r,h,i,a,p,u,m=n[1],c=[];for(let _=0;_<m.length;_+=1)c[_]=fe(ce(n,m,_));const k=_=>V(c[_],1,1,()=>{c[_]=null});return o=new $e({}),{c(){t=y("sidebar");for(let _=0;_<c.length;_+=1)c[_].c();s=D(),e=y("button"),l=y("span"),F(o.$$.fragment),r=D(),h=y("span"),i=R("Disconnect"),this.h()},l(_){t=E(_,"SIDEBAR",{class:!0});var f=I(t);for(let B=0;B<c.length;B+=1)c[B].l(f);s=P(f),e=E(f,"BUTTON",{class:!0});var d=I(e);l=E(d,"SPAN",{class:!0});var S=I(l);W(o.$$.fragment,S),S.forEach(g),r=P(d),h=E(d,"SPAN",{});var C=I(h);i=q(C,"Disconnect"),C.forEach(g),d.forEach(g),f.forEach(g),this.h()},h(){v(l,"class","w-6 h-6"),v(e,"class","mt-4 w-48 h-14 text-xl text-blue-900 bg-blue-100 rounded-lg flex justify-center hover:ring-blue-500 hover:ring-4 hover:ring-offset-2 transition-all space-x-2 items-center"),v(t,"class","flex flex-col")},m(_,f){x(_,t,f);for(let d=0;d<c.length;d+=1)c[d].m(t,null);b(t,s),b(t,e),b(e,l),O(o,l,null),b(e,r),b(e,h),b(h,i),a=!0,p||(u=z(e,"click",n[3]),p=!0)},p(_,[f]){if(f&3){m=_[1];let d;for(d=0;d<m.length;d+=1){const S=ce(_,m,d);c[d]?(c[d].p(S,f),A(c[d],1)):(c[d]=fe(S),c[d].c(),A(c[d],1),c[d].m(t,s))}for(Z(),d=m.length;d<c.length;d+=1)k(d);ee()}},i(_){if(!a){for(let f=0;f<m.length;f+=1)A(c[f]);A(o.$$.fragment,_),a=!0}},o(_){c=c.filter(Boolean);for(let f=0;f<c.length;f+=1)V(c[f]);V(o.$$.fragment,_),a=!1},d(_){_&&g(t),de(c,_),H(o),p=!1,u()}}}function Te(n,t,s){let e=[{title:"Home",icon:ye,href:"/"},{title:"Applications",icon:Ee,href:"/applications"},{title:"Settings",icon:Ie,href:"/settings"}];const l=()=>{De()};let{route:o}=t;const r=()=>l();return n.$$set=h=>{"route"in h&&s(0,o=h.route)},[o,e,l,r]}class Re extends G{constructor(t){super();K(this,t,Te,Ce,J,{route:0})}}const X=qe;async function qe(n,t){return xe.goto(n,t,[])}const Fe=()=>{const n=Ne("__svelte__");return{page:{subscribe:n.page.subscribe},navigating:{subscribe:n.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:n.navigating.subscribe}},session:n.session,updated:n.updated}},Oe={subscribe(n){return Fe().page.subscribe(n)}};function he(n,t,s){const e=n.slice();return e[11]=t[s],e[12]=t,e[13]=s,e}function _e(n){let t,s,e,l,o,r,h,i,a,p,u,m,c,k,_,f,d,S,C,B=n[0],N=[];for(let $=0;$<B.length;$+=1)N[$]=pe(he(n,B,$));return{c(){t=y("div"),s=D(),e=y("div"),l=y("h2"),o=R("Pairing Request"),r=D(),h=y("h2"),i=R("Enter the PIN displayed on the device."),a=D(),p=y("div");for(let $=0;$<N.length;$+=1)N[$].c();u=D(),m=y("div"),c=y("button"),k=R("Enter"),_=D(),f=y("button"),d=R("Cancel"),this.h()},l($){t=E($,"DIV",{class:!0});var T=I(t);T.forEach(g),s=P($),e=E($,"DIV",{class:!0});var w=I(e);l=E(w,"H2",{class:!0});var U=I(l);o=q(U,"Pairing Request"),U.forEach(g),r=P(w),h=E(w,"H2",{class:!0});var te=I(h);i=q(te,"Enter the PIN displayed on the device."),te.forEach(g),a=P(w),p=E(w,"DIV",{class:!0});var ne=I(p);for(let L=0;L<N.length;L+=1)N[L].l(ne);ne.forEach(g),u=P(w),m=E(w,"DIV",{class:!0});var M=I(m);c=E(M,"BUTTON",{class:!0});var se=I(c);k=q(se,"Enter"),se.forEach(g),_=P(M),f=E(M,"BUTTON",{class:!0});var le=I(f);d=q(le,"Cancel"),le.forEach(g),M.forEach(g),w.forEach(g),this.h()},h(){v(t,"class","fixed left-0 top-0 z-1 w-screen h-screen bg-black bg-opacity-90 backdrop-blur-md backdrop-filter"),v(l,"class","text-2xl font-bold"),v(h,"class","text-xl text-center my-6"),v(p,"class","flex m-auto w-full items-center justify-center gap-2"),v(c,"class","w-40 h-12 bg-blue-200 text-blue-900 font-bold text-lg text-center rounded-lg mt-4 hover:ring-2 hover:ring-blue-500 ring-offset-2 transition-all"),v(f,"class","w-40 h-12 bg-gray-200 text-gray-900 font-bold text-lg text-center rounded-lg mt-4 hover:ring-2 hover:ring-gray-500 ring-offset-2 transition-all"),v(m,"class","w-full flex justify-center gap-2"),v(e,"class","block fixed z-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white w-200 p-10 h-80")},m($,T){x($,t,T),x($,s,T),x($,e,T),b(e,l),b(l,o),b(e,r),b(e,h),b(h,i),b(e,a),b(e,p);for(let w=0;w<N.length;w+=1)N[w].m(p,null);b(e,u),b(e,m),b(m,c),b(c,k),n[10](c),b(m,_),b(m,f),b(f,d),S||(C=[z(c,"click",n[5]),z(f,"click",n[6])],S=!0)},p($,T){if(T&21){B=$[0];let w;for(w=0;w<B.length;w+=1){const U=he($,B,w);N[w]?N[w].p(U,T):(N[w]=pe(U),N[w].c(),N[w].m(p,null))}for(;w<N.length;w+=1)N[w].d(1);N.length=B.length}},d($){$&&g(t),$&&g(s),$&&g(e),de(N,$),n[10](null),S=!1,me(C)}}}function pe(n){let t,s=n[13],e,l;const o=()=>n[7](t,s),r=()=>n[7](null,s);function h(...a){return n[8](n[13],...a)}function i(){n[9].call(t,n[13])}return{c(){t=y("input"),this.h()},l(a){t=E(a,"INPUT",{type:!0,placeholder:!0,min:!0,max:!0,class:!0}),this.h()},h(){v(t,"type","text"),v(t,"placeholder","0"),v(t,"min","0"),v(t,"max","9"),v(t,"class","w-16 h-16 text-4xl font-bold text-center focus:border-blue-500 outline-none border-2 border-gray-300 rounded")},m(a,p){x(a,t,p),o(),re(t,n[0][n[13]]),e||(l=[z(t,"keydown",h),z(t,"input",i)],e=!0)},p(a,p){n=a,s!==n[13]&&(r(),s=n[13],o()),p&1&&t.value!==n[0][n[13]]&&re(t,n[0][n[13]])},d(a){a&&g(t),r(),e=!1,me(l)}}}function He(n){let t,s=n[3].open&&_e(n);return{c(){s&&s.c(),t=ae()},l(e){s&&s.l(e),t=ae()},m(e,l){s&&s.m(e,l),x(e,t,l)},p(e,[l]){e[3].open?s?s.p(e,l):(s=_e(e),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null)},i:j,o:j,d(e){s&&s.d(e),e&&g(t)}}}function Ue(n,t,s){let e;Y(n,Q,k=>s(3,e=k));let l=["","","",""],o=null,r=[];const h=(k,_)=>{if(k.key==="Backspace")return s(0,l[_]="",l),_-1>=0&&r[_-1].focus(),!0;k.preventDefault();let f=Number(k.key);if(isNaN(f)||k.key===null)return!1;s(0,l[_]=k.key,l),_+1>=r.length?o.focus():r[_+1].focus()},i=()=>{Pe().then(async()=>{await Ae("save_pin",{pin:Number(l.join(""))}),Q.set({open:!1,pin:""})})},a=()=>Q.set({open:!1,pin:""});function p(k,_){oe[k?"unshift":"push"](()=>{r[_]=k,s(2,r)})}const u=(k,_)=>h(_,k);function m(k){l[k]=this.value,s(0,l)}function c(k){oe[k?"unshift":"push"](()=>{o=k,s(1,o)})}return[l,o,r,e,h,i,a,p,u,m,c]}class je extends G{constructor(t){super();K(this,t,Ue,He,J,{})}}function We(n){let t,s,e,l,o,r;t=new Be({}),l=new Re({props:{route:n[0]}});const h=n[3].default,i=ge(h,n,n[2],null);return{c(){F(t.$$.fragment),s=D(),e=y("container"),F(l.$$.fragment),o=D(),i&&i.c(),this.h()},l(a){W(t.$$.fragment,a),s=P(a),e=E(a,"CONTAINER",{class:!0});var p=I(e);W(l.$$.fragment,p),o=P(p),i&&i.l(p),p.forEach(g),this.h()},h(){v(e,"class","block container mx-auto flex")},m(a,p){O(t,a,p),x(a,s,p),x(a,e,p),O(l,e,null),b(e,o),i&&i.m(e,null),r=!0},p(a,p){const u={};p&1&&(u.route=a[0]),l.$set(u),i&&i.p&&(!r||p&4)&&be(i,h,a,a[2],r?ke(h,a[2],p,null):ve(a[2]),null)},i(a){r||(A(t.$$.fragment,a),A(l.$$.fragment,a),A(i,a),r=!0)},o(a){V(t.$$.fragment,a),V(l.$$.fragment,a),V(i,a),r=!1},d(a){H(t,a),a&&g(s),a&&g(e),H(l),i&&i.d(a)}}}function ze(n){let t;const s=n[3].default,e=ge(s,n,n[2],null);return{c(){e&&e.c()},l(l){e&&e.l(l)},m(l,o){e&&e.m(l,o),t=!0},p(l,o){e&&e.p&&(!t||o&4)&&be(e,s,l,l[2],t?ke(s,l[2],o,null):ve(l[2]),null)},i(l){t||(A(e,l),t=!0)},o(l){V(e,l),t=!1},d(l){e&&e.d(l)}}}function Me(n){let t,s,e,l,o,r,h;const i=[ze,We],a=[];function p(u,m){return u[0]==="/welcome"?0:1}return e=p(n),l=a[e]=i[e](n),r=new je({}),{c(){t=y("div"),s=D(),l.c(),o=D(),F(r.$$.fragment),this.h()},l(u){t=E(u,"DIV",{class:!0});var m=I(t);m.forEach(g),s=P(u),l.l(u),o=P(u),W(r.$$.fragment,u),this.h()},h(){v(t,"class","fixed left-0 top-0 -z-10 w-screen h-screen bg-gray-100")},m(u,m){x(u,t,m),x(u,s,m),a[e].m(u,m),x(u,o,m),O(r,u,m),h=!0},p(u,[m]){let c=e;e=p(u),e===c?a[e].p(u,m):(Z(),V(a[c],1,1,()=>{a[c]=null}),ee(),l=a[e],l?l.p(u,m):(l=a[e]=i[e](u),l.c()),A(l,1),l.m(o.parentNode,o))},i(u){h||(A(l),A(r.$$.fragment,u),h=!0)},o(u){V(l),V(r.$$.fragment,u),h=!1},d(u){u&&g(t),u&&g(s),a[e].d(u),u&&g(o),H(r,u)}}}const Qe=async({url:n})=>({props:{route:n.pathname}});function Ge(n,t,s){let e,l;Y(n,Oe,i=>s(1,e=i)),Y(n,ie,i=>s(4,l=i));let{$$slots:o={},$$scope:r}=t,{route:h}=t;return Se(()=>{ie.subscribe(async i=>{if(i.token!==""&&await ue(!1)){e.url.pathname==="/welcome"&&X("/");return}e.url.pathname!=="/welcome"&&X("/welcome")}),l.token===""?h!=="/welcome"&&X("/welcome"):ue(!1)}),n.$$set=i=>{"route"in i&&s(0,h=i.route),"$$scope"in i&&s(2,r=i.$$scope)},n.$$.update=()=>{n.$$.dirty&3&&(s(0,h=e.url.pathname),console.log(h))},[h,e,r,o]}class Xe extends G{constructor(t){super();K(this,t,Ge,Me,J,{route:0})}}export{Xe as default,Qe as load};
