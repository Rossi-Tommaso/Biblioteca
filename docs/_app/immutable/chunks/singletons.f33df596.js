import{H as d,s as E}from"./index.0b2888c4.js";const u=[];function p(e,t=d){let n;const o=new Set;function a(s){if(E(e,s)&&(e=s,n)){const i=!u.length;for(const l of o)l[1](),u.push(l,e);if(i){for(let l=0;l<u.length;l+=2)u[l][0](u[l+1]);u.length=0}}}function c(s){a(s(e))}function r(s,i=d){const l=[s,i];return o.add(l),o.size===1&&(n=t(a)||d),s(e),()=>{o.delete(l),o.size===0&&n&&(n(),n=null)}}return{set:a,update:c,subscribe:r}}var g;const A=((g=globalThis.__sveltekit_1d535vf)==null?void 0:g.base)??"/Biblioteca";var k;const R=((k=globalThis.__sveltekit_1d535vf)==null?void 0:k.assets)??A,S="1736438153270",x="sveltekit:snapshot",O="sveltekit:scroll",U="sveltekit:index",_={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},v=location.origin;function L(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function N(){return{x:pageXOffset,y:pageYOffset}}function f(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const b={..._,"":_.hover};function m(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function P(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=m(e)}}function V(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!o||y(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),c=(n==null?void 0:n.origin)===v&&e.hasAttribute("download");return{url:n,external:a,target:o,download:c}}function Y(e){let t=null,n=null,o=null,a=null,c=null,r=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=f(s,"preload-code")),a===null&&(a=f(s,"preload-data")),t===null&&(t=f(s,"keepfocus")),n===null&&(n=f(s,"noscroll")),c===null&&(c=f(s,"reload")),r===null&&(r=f(s,"replacestate")),s=m(s);function i(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:b[o??"off"],preload_data:b[a??"off"],keep_focus:i(t),noscroll:i(n),reload:i(c),replace_state:i(r)}}function h(e){const t=p(e);let n=!0;function o(){n=!0,t.update(r=>r)}function a(r){n=!1,t.set(r)}function c(r){let s;return t.subscribe(i=>{(s===void 0||n&&i!==s)&&r(s=i)})}return{notify:o,set:a,subscribe:c}}function T(){const{set:e,subscribe:t}=p(!1);let n;async function o(){clearTimeout(n);try{const a=await fetch(`${R}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const r=(await a.json()).version!==S;return r&&(e(!0),clearTimeout(n)),r}catch{return!1}}return{subscribe:t,check:o}}function y(e,t){return e.origin!==v||!e.pathname.startsWith(t)}let w;function j(e){w=e.client}function q(e){return(...t)=>w[e](...t)}const K={url:h({}),page:h({}),navigating:p(null),updated:T()};export{U as I,_ as P,O as S,x as a,V as b,Y as c,K as d,A as e,P as f,L as g,j as h,y as i,q as j,v as o,N as s,p as w};
