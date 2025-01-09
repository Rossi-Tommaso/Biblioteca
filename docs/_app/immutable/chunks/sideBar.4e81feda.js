import{S as re,i as ce,s as ie,k as o,a as H,J as P,l as n,m as r,c as S,K as T,h as a,n as s,b as oe,G as e,M as ne,H as M,q as z,r as A}from"./index.0b2888c4.js";import{l as he}from"./authStore.2ceb26cd.js";import{e as le}from"./singletons.f33df596.js";function ue(m){let t,l,h,i,v,f,c,_;return{c(){t=o("label"),l=o("input"),h=H(),i=P("svg"),v=P("path"),f=P("path"),this.h()},l(u){t=n(u,"LABEL",{class:!0});var d=r(t);l=n(d,"INPUT",{type:!0,class:!0}),h=S(d),i=T(d,"svg",{viewBox:!0,class:!0});var y=r(i);v=T(y,"path",{class:!0,d:!0}),r(v).forEach(a),f=T(y,"path",{class:!0,d:!0}),r(f).forEach(a),y.forEach(a),d.forEach(a),this.h()},h(){s(l,"type","checkbox"),s(l,"class","svelte-5wi7iz"),s(v,"class","line line-top-bottom svelte-5wi7iz"),s(v,"d","M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"),s(f,"class","line svelte-5wi7iz"),s(f,"d","M7 16 27 16"),s(i,"viewBox","0 0 32 32"),s(i,"class","svelte-5wi7iz"),s(t,"class","hamburger svelte-5wi7iz")},m(u,d){oe(u,t,d),e(t,l),l.checked=m[0],e(t,h),e(t,i),e(i,v),e(i,f),c||(_=ne(l,"change",m[1]),c=!0)},p(u,[d]){d&1&&(l.checked=u[0])},i:M,o:M,d(u){u&&a(t),c=!1,_()}}}function ve(m,t,l){let{check:h=!1}=t;function i(){h=this.checked,l(0,h)}return m.$$set=v=>{"check"in v&&l(0,h=v.check)},[h,i]}class me extends re{constructor(t){super(),ce(this,t,ve,ue,ie,{check:0})}}function de(m){let t,l,h,i,v,f,c,_,u,d,y,L,g,V,q,k,E,U,G,x,b,J,K,w,I,N,O,j;return{c(){t=o("div"),l=o("div"),h=o("div"),i=o("h2"),v=z("Menu"),f=H(),c=o("ul"),_=o("li"),u=o("a"),d=z("🏠 Home"),y=H(),L=o("li"),g=o("a"),V=z("📚 I miei libri"),q=H(),k=o("li"),E=o("a"),U=z("🔖 Segnalibri"),G=H(),x=o("li"),b=o("a"),J=z("⚙️ Impostazioni"),K=H(),w=o("li"),I=o("a"),N=z("📤 Logout"),this.h()},l(B){t=n(B,"DIV",{class:!0});var C=r(t);l=n(C,"DIV",{class:!0});var D=r(l);h=n(D,"DIV",{class:!0});var F=r(h);i=n(F,"H2",{class:!0});var Q=r(i);v=A(Q,"Menu"),Q.forEach(a),F.forEach(a),f=S(D),c=n(D,"UL",{class:!0});var p=r(c);_=n(p,"LI",{class:!0});var R=r(_);u=n(R,"A",{href:!0,class:!0});var W=r(u);d=A(W,"🏠 Home"),W.forEach(a),R.forEach(a),y=S(p),L=n(p,"LI",{class:!0});var X=r(L);g=n(X,"A",{href:!0,class:!0});var Y=r(g);V=A(Y,"📚 I miei libri"),Y.forEach(a),X.forEach(a),q=S(p),k=n(p,"LI",{class:!0});var Z=r(k);E=n(Z,"A",{href:!0,class:!0});var $=r(E);U=A($,"🔖 Segnalibri"),$.forEach(a),Z.forEach(a),G=S(p),x=n(p,"LI",{class:!0});var ee=r(x);b=n(ee,"A",{href:!0,class:!0});var se=r(b);J=A(se,"⚙️ Impostazioni"),se.forEach(a),ee.forEach(a),K=S(p),w=n(p,"LI",{class:!0});var te=r(w);I=n(te,"A",{class:!0});var ae=r(I);N=A(ae,"📤 Logout"),ae.forEach(a),te.forEach(a),p.forEach(a),D.forEach(a),C.forEach(a),this.h()},h(){s(i,"class","svelte-13a4y1p"),s(h,"class","sidebar-header svelte-13a4y1p"),s(u,"href",le+"/home"),s(u,"class","svelte-13a4y1p"),s(_,"class","svelte-13a4y1p"),s(g,"href",le+"/biblioteca"),s(g,"class","svelte-13a4y1p"),s(L,"class","svelte-13a4y1p"),s(E,"href","#"),s(E,"class","svelte-13a4y1p"),s(k,"class","svelte-13a4y1p"),s(b,"href","#"),s(b,"class","svelte-13a4y1p"),s(x,"class","svelte-13a4y1p"),s(I,"class","svelte-13a4y1p"),s(w,"class","svelte-13a4y1p"),s(c,"class","menu svelte-13a4y1p"),s(l,"class","sidebar visible svelte-13a4y1p"),s(t,"class","layout svelte-13a4y1p")},m(B,C){oe(B,t,C),e(t,l),e(l,h),e(h,i),e(i,v),e(l,f),e(l,c),e(c,_),e(_,u),e(u,d),e(c,y),e(c,L),e(L,g),e(g,V),e(c,q),e(c,k),e(k,E),e(E,U),e(c,G),e(c,x),e(x,b),e(b,J),e(c,K),e(c,w),e(w,I),e(I,N),O||(j=ne(I,"click",he),O=!0)},p:M,i:M,o:M,d(B){B&&a(t),O=!1,j()}}}class ye extends re{constructor(t){super(),ce(this,t,null,de,ie,{})}}export{me as H,ye as S};
