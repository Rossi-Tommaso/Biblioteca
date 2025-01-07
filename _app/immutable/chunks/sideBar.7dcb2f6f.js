import{r as P,f as T,j as ue,k as de,u as ve,l as fe}from"./authStore.cf887d70.js";import{S as ce,i as ie,s as oe,k as o,a as D,J as K,l as n,m as r,c as H,K as N,h as l,n as a,b as ne,G as s,M as he,H as B,q as z,r as A}from"./index.0b2888c4.js";let ge=async d=>{try{const e=P(T,d),t=await ue(e);return t.exists()?t.val():null}catch(e){console.error("Errore while fetching data:",e)}};const Ee=async(d,e)=>{try{const t=P(T,d);await ve(t,e)}catch(t){console.error("Error while updating data:",t)}},we=async d=>{try{const e=P(T,d);await de(e)}catch(e){console.error("Error while cancelling data:",e)}};function pe(d){let e,t,h,i,v,p,c,m;return{c(){e=o("label"),t=o("input"),h=D(),i=K("svg"),v=K("path"),p=K("path"),this.h()},l(u){e=n(u,"LABEL",{class:!0});var f=r(e);t=n(f,"INPUT",{type:!0,class:!0}),h=H(f),i=N(f,"svg",{viewBox:!0,class:!0});var y=r(i);v=N(y,"path",{class:!0,d:!0}),r(v).forEach(l),p=N(y,"path",{class:!0,d:!0}),r(p).forEach(l),y.forEach(l),f.forEach(l),this.h()},h(){a(t,"type","checkbox"),a(t,"class","svelte-5wi7iz"),a(v,"class","line line-top-bottom svelte-5wi7iz"),a(v,"d","M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"),a(p,"class","line svelte-5wi7iz"),a(p,"d","M7 16 27 16"),a(i,"viewBox","0 0 32 32"),a(i,"class","svelte-5wi7iz"),a(e,"class","hamburger svelte-5wi7iz")},m(u,f){ne(u,e,f),s(e,t),t.checked=d[0],s(e,h),s(e,i),s(i,v),s(i,p),c||(m=he(t,"change",d[1]),c=!0)},p(u,[f]){f&1&&(t.checked=u[0])},i:B,o:B,d(u){u&&l(e),c=!1,m()}}}function _e(d,e,t){let{check:h=!1}=e;function i(){h=this.checked,t(0,h)}return d.$$set=v=>{"check"in v&&t(0,h=v.check)},[h,i]}class Ie extends ce{constructor(e){super(),ie(this,e,_e,pe,oe,{check:0})}}function me(d){let e,t,h,i,v,p,c,m,u,f,y,I,b,R,V,L,g,q,O,k,E,U,j,x,w,G,J,F;return{c(){e=o("div"),t=o("div"),h=o("div"),i=o("h2"),v=z("Menu"),p=D(),c=o("ul"),m=o("li"),u=o("a"),f=z("🏠 Home"),y=D(),I=o("li"),b=o("a"),R=z("📚 I miei libri"),V=D(),L=o("li"),g=o("a"),q=z("🔖 Segnalibri"),O=D(),k=o("li"),E=o("a"),U=z("⚙️ Impostazioni"),j=D(),x=o("li"),w=o("a"),G=z("📤 Logout"),this.h()},l(S){e=n(S,"DIV",{class:!0});var M=r(e);t=n(M,"DIV",{class:!0});var C=r(t);h=n(C,"DIV",{class:!0});var Q=r(h);i=n(Q,"H2",{class:!0});var W=r(i);v=A(W,"Menu"),W.forEach(l),Q.forEach(l),p=H(C),c=n(C,"UL",{class:!0});var _=r(c);m=n(_,"LI",{class:!0});var X=r(m);u=n(X,"A",{href:!0,class:!0});var Y=r(u);f=A(Y,"🏠 Home"),Y.forEach(l),X.forEach(l),y=H(_),I=n(_,"LI",{class:!0});var Z=r(I);b=n(Z,"A",{href:!0,class:!0});var $=r(b);R=A($,"📚 I miei libri"),$.forEach(l),Z.forEach(l),V=H(_),L=n(_,"LI",{class:!0});var ee=r(L);g=n(ee,"A",{href:!0,class:!0});var se=r(g);q=A(se,"🔖 Segnalibri"),se.forEach(l),ee.forEach(l),O=H(_),k=n(_,"LI",{class:!0});var ae=r(k);E=n(ae,"A",{href:!0,class:!0});var te=r(E);U=A(te,"⚙️ Impostazioni"),te.forEach(l),ae.forEach(l),j=H(_),x=n(_,"LI",{class:!0});var le=r(x);w=n(le,"A",{class:!0});var re=r(w);G=A(re,"📤 Logout"),re.forEach(l),le.forEach(l),_.forEach(l),C.forEach(l),M.forEach(l),this.h()},h(){a(i,"class","svelte-13a4y1p"),a(h,"class","sidebar-header svelte-13a4y1p"),a(u,"href","/home"),a(u,"class","svelte-13a4y1p"),a(m,"class","svelte-13a4y1p"),a(b,"href","/biblioteca"),a(b,"class","svelte-13a4y1p"),a(I,"class","svelte-13a4y1p"),a(g,"href","#"),a(g,"class","svelte-13a4y1p"),a(L,"class","svelte-13a4y1p"),a(E,"href","#"),a(E,"class","svelte-13a4y1p"),a(k,"class","svelte-13a4y1p"),a(w,"class","svelte-13a4y1p"),a(x,"class","svelte-13a4y1p"),a(c,"class","menu svelte-13a4y1p"),a(t,"class","sidebar visible svelte-13a4y1p"),a(e,"class","layout svelte-13a4y1p")},m(S,M){ne(S,e,M),s(e,t),s(t,h),s(h,i),s(i,v),s(t,p),s(t,c),s(c,m),s(m,u),s(u,f),s(c,y),s(c,I),s(I,b),s(b,R),s(c,V),s(c,L),s(L,g),s(g,q),s(c,O),s(c,k),s(k,E),s(E,U),s(c,j),s(c,x),s(x,w),s(w,G),J||(F=he(w,"click",fe),J=!0)},p:B,i:B,o:B,d(S){S&&l(e),J=!1,F()}}}class Le extends ce{constructor(e){super(),ie(this,e,null,me,oe,{})}}export{Ie as H,Le as S,we as d,ge as f,Ee as u};
