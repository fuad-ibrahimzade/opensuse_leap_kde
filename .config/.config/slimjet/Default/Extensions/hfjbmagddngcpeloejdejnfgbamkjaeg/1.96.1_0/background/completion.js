"use strict"
;__filename="background/completion.js",define(["require","exports","./store","./browser","./utils","./normalize_urls","./parse_urls","./completion_utils","./browsing_data_manager"],function(n,r,e,t,u,f,i,o,l){
var a,s,c,_,m,v,d,h,p,w,b,g,S,y,x,k,M,T,R,$,z,A,F,j,B,D,E,I;Object.defineProperty(r,"__esModule",{value:true}),
u=__importStar(u),a=0,s=false,c=false,_=0,m=0,v=0,d=0,h=0,p=[""],w="",b="",g="",S="",y=0,x=false,k=false,M="",T="",R=0,
$=true,z=function(n,r,e,t,u,f){this.e=n,this.u=r,this.t=e,this.title=t,this.r=u(this,f),this.visit=0},A={
_u:function(n,r){if(0!==p.length&&1&R)2===e.gn.Yn?A.Su():l.ci.Ti=function(){n.o||A.Su()};else if(E.yu([],1),r)return
;0===e.gn.Yn&&l.ci.xi()},Su:function(){var n,r,t,u,f,i,a,s,c,v,w=p.some(function(n){return 47===n.charCodeAt(0)
}),b=null===(n=o.wi.xu)||void 0===n?void 0:n.Wn,g=o.wi.Mu?[]:null,S=b&&b[0]===w?b[1]:e.gn.Wn,y=S.length,x=[]
;for(t=0;t<y;t++)if(o.Tu((u=S[t]).t,w?u.Li:u.Ri)&&($||u.ji)){if(null!==g&&g.push(u),
T&&u.u.length<T.length+2&&T===(u.u.endsWith("/")?u.u.slice(0,-1):u.u))continue;x.push([-o.Ru(u.t,u.Ri),t])}
for(a of(g&&(o.wi.Mu.Wn=[w,g]),d+=r=x.length,r?(x.sort(o.sortBy0),h>0&&!(6&R)?(x=x.slice(h,h+m),
h=0):r>h+m&&(x.length=h+m)):R^=1,f=[],i=64&_?-.666446:0,x))s=a[0],i&&(s=s<i?s:(s+i)/2),
c=new z("bookm",(u=S[t=a[1]]).u,u.t,w?u.Li:u.Ri,o.get2ndArg,-s),v=32&_&&l.li.Ui?l.li.Mi(u.u):-1,
c.visit=v<0?0:e.dn.nt[v].qi,f.push(c),null!==u.bo&&(c.u=u.bo,c.title=o.cutTitle(w?u.Li:u.Ri),
c.textSplit="javascript: \u2026",c.t=u.Ii);E.yu(f,1)}},F={_u:function(n,r){var t,u,f,i,a
;if(!p.length&&1024&_||!(2&R))return E.yu([],2);if(t=p.length>0,e.dn.nt){if(t)return void E.yu(F.Su(),2)
;(e.dn.ut>10||e.dn.it>0)&&l.li.Fi()}else if(u=t?function(){n.o||E.yu(F.Su(),2)}:null,
t&&(c||l.li.Oi)?(l.li.Oi>0&&clearTimeout(l.li.Oi),l.li.Oi=0,l.li.Bi(u)):(l.li.Oi||(l.li.Oi=setTimeout(function(){
l.li.Oi=0,l.li.Bi(u)},t?200:150)),t&&E.$u((a=(i=(f=E.zu).length)>0)&&"search"===f[0].t?[f[0]]:[],s&&a,0,0,i,b,y)),
t)return;0===r?o.Au(k,_,F.Fu,n):l.ai(h+m,$,F.ju.bind(null,n))},Su:function(){
var n,r,t,u,i,a,s=1===p.length?p[0]:"",c=!!s&&("."===s[0]?/^\.[\da-zA-Z]+$/.test(s):(f.$e(s,null,-2),
f._e<=2)),_=c?"."===s[0]||f._e>0?o.Du.Bu[0]:(o.Du.Eu||o.Du.Iu(),
o.Du.Eu[0]):null,v=o.wi.Mu?[]:null,w=[-1.1,-1.1],b=[],g=o.Tu,S=c&&s.includes("%")&&!/[^\x21-\x7e]|%[^A-F\da-f]/.test(s),y=m+h,x=-1.1,k=0,T=0,A=0
;for(M&&y++,T=y;--T;)w.push(-1.1,-1.1)
;for(y=2*y-2,t=(r=(null===(n=o.wi.xu)||void 0===n?void 0:n.nt)||e.dn.nt).length;k<t;k++)if(u=r[k],
(c?_.test(S?u.u:u.t):g(u.t,u.Ri))&&($||u.ji)&&(null!==v&&v.push(u),
A++,(i=c?o.ComputeRecency(u.qi)||1e-16*Math.max(0,u.qi):o.ComputeRelevancy(u.t,u.Ri,u.qi))>x)){
for(T=y-2;0<=T&&w[T]<i;T-=2)w[T+2]=w[T],w[T+3]=w[T+1];w[T+2]=i,w[T+3]=k,x=w[y]}for(v&&(o.wi.Mu.nt=v),d+=A,A||(R^=2),
5&R?k=0:(k=2*h,
h=0);k<=y&&!((i=w[k])<=0);k+=2)(u=r[w[k+1]]).u!==M&&((a=new z("history",u.u,S?u.u:u.t,u.Ri,o.get2ndArg,i)).visit=u.qi,
b.push(a));return l.oi.Ei(),b},Fu:function(n,r){var e,u,f,i;if(o.wi.Yi(r),!n.o){for(f of(e=new Set,u=0,
r))f.incognito&&o.tabsInNormal||(i=t.getTabUrl(f),e.has(i)||(e.add(i),u++));return F.Ou([],n,e,h,u)}},ju:function(n,r){
var e,t,u;if(!n.o)return e=[],t=new Set,u=-h,r.some(function(n){var r,f=n.u;return!t.has(r=f+"\n"+n.Ri)&&(t.add(r),
t.add(f),++u>0&&e.push(n),e.length>=m)})?F.Qu(e):F.Ou(e,n,t,-u,0)},Ou:function(n,r,e,u,f){t.me.history.search({text:"",
maxResults:h+m*($?1:2)+f},function(t){if(!r.o){t=t.filter(function(n){var r=n.url
;return r.length>2e3&&(n.url=r=l.li.Wi(r,n)),!e.has(r)&&($||0!==l.fi(n.url,n.title||""))}),
u<0?t.length=Math.min(t.length,m-n.length):u>0&&(t=t.slice(u,u+m));var f=t.map(function(n){return{u:n.url,
Ri:n.title||"",Ki:n.lastVisitTime,Ni:null}});u<0&&(f=n.concat(f)),F.Qu(f)}})},Qu:function(n){n.forEach(F.Uu),h=0,
l.oi.Ei(),E.yu(n,2)},Uu:function(n,r,e){
var t=n.u,u=new z("history",t,l.oi.Si(t,t),n.Ri||"",o.get2ndArg,(99-r)/100),f=n.Ni;u.visit=n.Ki,f&&(u.s=f,
u.label='<span class="undo">&#8630;</span>'),e[r]=u}},j={_u:function(n,r){
if(1!==p.length||!(16&R)||p[0].lastIndexOf("/",p[0].length-2)>=0)return E.yu([],16);if(l.li.Ci){
if(!e.dn.nt)return r>0?E.yu([],16):l.li.Bi(function(){n.o||j._u(n,0)});l.li.Ci(e.dn.nt)}return j.Su()},Su:function(){
var n,r,t,f,i,l,a,c,_,v,w,b=e.dn.tt,g=o.Zu,S=16===R&&s?[]:null,y=p[0].replace("/","").toLowerCase(),x=y===p[0],k=[],M="",T=-1.1
;for(r of(o.qu(3),b.keys()))r.includes(y)&&(n=b.get(r),($||n.Gi>0)&&(t=o.ComputeRelevancy(r,"",n.qi),S?S.push({r:t,d:r,
m:n}):t>T&&(T=t,M=r)))
;if(f=M.length===y.length,M&&!f&&(M.startsWith("www.")||M.startsWith(y)||(i=M.slice(M.indexOf(".")+1)).includes(y)&&(l=void 0,
(l=b.get(i="www."+i))?($||l.Gi>0)&&(M=i,n=l):(l=b.get(i="m."+i))&&($||l.Gi>0)&&($||l.Gi>0)&&(M=i,n=l)),
(a=M.startsWith(y)?0:M.startsWith("www."+y)?4:-1)>=0&&(w=(_=(c=u.Ut(M))[0]).length-1,
(v=c[1])>1&&(!(a=M.length-a-y.length-_[w].length-1)||3===v&&a===_[w-1].length+1)&&(f=true))),M)d++,s=!h&&f||s,
k=j.Cu(M,n,0,x);else if(S)for(w of(S.sort(j.Gu),(d=S.length)>h+m&&(S.length=h+m),S))k.push(j.Cu(w.d,w.m,w.r,x)[0])
;o.qu(g),E.yu(k,16)},Cu:function(n,r,t,f){var i,a,s,c,_,v,d,p,w=r.Ae>0,b=""
;return 2===e.gn.Yn&&(i=new RegExp("^https?://".concat(u.t(n),"/?$")),a=e.gn.Wn.filter(function(n){
return i.test(n.u)&&($||n.ji)}),a.length>0&&(s=a.filter(function(n){return"s"===n.u[4]}),
T=(c=(a=(w=s.length>0)?s:a)[0].u).endsWith("/")?c.slice(0,-1):c,b=a[0].Ri)),_=(w?"https://":"http://")+n+"/",!t&&(M=_,
h>0)?(h--,[]):(v=new z("domain",_,f?n:n+"/","",o.get2ndArg,t||2),p=(d=l.li.Ui?l.li.Mi(_):-1)>0?e.dn.nt[d]:null,o.Hu(v),
p&&($||p.ji)&&(v.visit=p.qi,b=b||p.Ri),v.title=o.cutTitle(b,[]),--m,[v])},Gu:function(n,r){return r.r-n.r}},B={
_u:function(n,r){!(4&R)||r&&(!p.length||256&_)?E.yu([],4):o.Au(k,_,B.Su,n)},Su:function(n,r){
var f,i,a,s,w,b,g,S,y,x,M,T,$,A,F,j,D,I,O,Q,U,Z,q,C,G,H,N,P,W,J,K,L,V,X,Y,nn,rn;if(o.wi.Yi(r),!n.o){if(f=e.jn,
i=p.length<=0,a=3&R,w=[],(s=!!(8&_)&&k&&i&&!c)&&!(128&_)&&r.length>h&&r.length>v){for(g of(b=new Map,r))b.set(g.id,g)
;for(M=(x=(y=(S=b.get(f))?S.openerTabId:0)?b.get(y):null)?x.index:S?S.index-1:0,
T=x?0:v/2|0;1<--T&&M>0&&r[M-1].openerTabId===y;M--);r=M>0?r.slice(M).concat(r.slice(0,M)):r}for(g of($=[],A=[],
F=!i&&/^:[a-z]+/gm.test(p.join("\n")),r))!k&&o.tabsInNormal&&g.incognito||(j=t.getTabUrl(g),
D=g.text||(g.text=l.oi.Si(j,g.incognito?"":j)),I=g.title,F&&(1===p.length&&(D=I=""),g.audible&&(I+=" :audible :audio",
I+=t.isTabMuted(g)?" :muted":" :unmuted"),g.discarded&&(I+=" :discarded"),g.incognito&&(I+=" :incognito"),
g.pinned&&(I+=" :pinned")),(i||o.Tu(D,I))&&(O=g.windowId,!k&&A.lastIndexOf(O)<0&&A.push(O),$.push(g)))
;if(a&&1===$.length&&$[0].id===f&&($.length=0),d+=Q=$.length,Q||(R^=4),h>=Q&&!a)return h=0,E.yu(w,4);if(A.sort(B.Nu),
U=i?s?B.Pu:B.Wu:o.ComputeWordRelevancy,
Z=s?u.Pt():null,q=A.length>1?e.Cn:0,s)for(g of $)Z[g.id]=(G=(C=g.openerTabId)&&Z[C])?G<5?G+1:5:1
;for(H=32&_?1===e.En.o?0:e.Fn<62?Date.now()-performance.now():performance.timeOrigin:0,N=0;N<$.length;)P=(g=$[N++]).id,
W=s?Z[P]:1,j=t.getTabUrl(g),J=e.Sn.get(P),K=new z("tab",j,g.text,g.title,U,s?N:P),
L=q&&g.windowId!==q?"".concat(A.indexOf(g.windowId)+1,":"):"",V="",L+=N,f===P?(s||(K.r=i?1<<31:0),
L="(".concat(L,")")):J||(L="**".concat(L,"**")),!o.tabsInNormal&&g.incognito&&(V+="*"),!!g.discarded&&(V+="~"),
g.audible&&(V+=t.isTabMuted(g)?"\u266a":"\u266c"),K.visit=J?J.t+H:0,K.s=P,K.label="#".concat(L).concat(V&&" "+V),
W>1&&(K.level=" level-"+W),w.push(K);if(w.sort(E.Ju),Y=h+m-(X=w.length),a||Y<0||!i)for(h>0&&!a?(w=w.slice(h,h+m),X=m,
h=0):X>h+m&&(w.length=X=h+m),T=a?0:X;T<X;T++)w[T].r*=8/(T/4+1);else if(h>0){for(rn of nn=w.slice(0,Y))rn.label+="[r]"
;for(X=(w=w.slice(h).concat(nn)).length,T=0;T<X;T++)w[T].r=X-T;h=0}l.oi.Ei(),E.yu(w,4)}},Nu:function(n,r){return n-r},
Wu:function(n,r){var t=e.Sn.get(r);return t?t.i:4&_?2047+r:-r},Pu:function(n,r){return 1/r}},D={Ku:0,_u:e.B,
Lu:function(n,r){var t,u,i,l,s,c,_,m,v,d;if(!(8&R))return E.yu([],8);if(i=(u=p).length>0?u[0]:"",0===u.length);else{
if(true!==r&&"\\"===i[0]&&"\\"!==i[1])return i.length>1?u[0]=i.slice(1):u.shift(),i=g.slice(1).trimLeft(),$=true,h?(h--,
E.yu([],8)):(t=D.Vu(i),E.yu([t],8));l=e.Jn.searchEngineMap.get(i)}if(true===r){if(!l)return true}else{
if(!l&&!i.startsWith("vimium://"))return 0===a&&u.length<=1&&(a=u.length?o.Yu.Xu()?-2:0:-1),E.yu([],8);l&&S&&(u.push(S),
h=0,g+=" "+S,S="",y&=-5),u.length>1||(a=-1)}
if(u.length>1&&l?(u.shift(),g.length>200&&(u=g.split(" ")).shift()):l&&(u=[]),$=true,l?(_=s=(m=f.be(u,l.Ce,l.B,[])).Ce,
c=m.Re):(_=s=u.join(" "),c=[]),"~"===i);else if(s.startsWith("vimium://")){if(v=e.S(s.slice(9),1,true),
d=D.nf.bind(D,u,s,_,l,c),v instanceof Promise)return v.then(D.rf.bind(D,n,d));if(v instanceof Array)return D.rf(n,d,v)
;v&&(s=_=v,c=[])}else s=f.$e(s,null,-2);return t=D.nf(u,s,_,l,c),E.yu([t],8)},rf:function(n,r,e){var t,f,o,l,s;if(!n.o){
switch(e[1]){case 5:case 7:if(a=7===e[1]&&p.length>1?a:-1,!(f=e[0]))break;return S="",
(p=((g="\\ "+f).length<201?g:u.$t(g,0,200).trim()).split(" ")).length>1&&(p[1]=i.Ue(p[1],p.length>2)),D.Lu(n);case 2:
if(p=(o=e[0]).length>1||1===o.length&&o[0]?o:p,(l=D.Ku++)>12)break;if(s=D.Lu(n,true),l<=0&&(D.Ku=0),true!==s)return s
;break;case 0:e[0]&&(t=D.ef(r(),e))}E.yu(t||[r()],8)}},nf:function(n,r,e,t,f){
var i=new z("search",r,e,(t?t.De+": ":"")+n.join(" "),o.get2ndArg,9);return n.length>0&&t?(i.t=D.tf(e,f),
i.title=o.cutTitle(i.title,[t.De.length+2,i.title.length]),i.textSplit=o.highlight(i.t,f)):(i.t=u.xt(o.shortenUrl(e)),
i.title=o.cutTitle(i.title,[]),i.textSplit=u.Ct(i.t)),i.v=c?"":t&&t.B||o.uf(r),i.p=c&&t?t.De:"",i},ef:function(n,r){
var e=r[0],t=new z("math","vimium://copy "+e,e,e,o.get2ndArg,9)
;return--t.r,t.title='<match style="text-decoration: none;">'.concat(o.cutTitle(t.title,[]),"<match>"),
t.textSplit=u.Ct(r[2]),[n,t]},tf:function(n,r){var e,t,f,i=r.length;if(t=u.xt(r.length>0?n.slice(0,r[0]):n),
(e=u.v(t))&&(t=t.slice(e),e=0),r.length<=0)return t;for(f=r[0];r[e]=t.length,i>++e;)t+=u.xt(n.slice(f,r[e])),f=r[e]
;return f<n.length&&(t+=u.xt(n.slice(f))),t},Vu:function(n){
var r=f.$e(n,null,-2),e=4===f._e,t=new z("search",r,u.xt(o.shortenUrl(r)),"",o.get2ndArg,9)
;return t.title=e?"~: "+o.cutTitle(n,[0,n.length]):o.cutTitle(n,[]),t.textSplit=u.Ct(t.t),t.v=c?"":o.uf(r),
t.p=c&&e?"~":"",t.n=1,t}},E={ff:0,if:0,zu:null,of:null,$u:null,_u:function(n){var r,e,t,u;if(E.of&&(E.of.o=true),
r=E.of={o:false},E.if=0,e=1,t=-9&(R&=n[0])?n.length:2,E.zu=[],E.ff=t-1,a=h&&-1,n[1]===D){if(u=D.Lu(r),t<3)return
;if(u)return void u.then(E.lf.bind(null,n,r,e));e=2}E.lf(n,r,e)},lf:function(n,r,e){for(o.af(Date.now()-18144e5),
o.qu(3*p.length||.01),
p.indexOf("__proto__")>=0&&(p=p.join(" ").replace(/(^| )__proto__(?=$| )/g," __proto_").trimLeft().split(" ")),
o.wi._o($),p.sort(E.sf),o.Du.cf();e<n.length;e++)n[e]._u(r,e-1)},sf:function(n,r){
return r.length-n.length||(n<r?-1:n===r?0:1)},yu:function(n,r){var e=E.zu,t=n.length;if(t>0&&(E.if|=r,
E.zu=0===e.length?n:e.concat(n),8===r&&(s=!0,m-=t,d+=t)),0==--E.ff)return e=null,E._f()},_f:function(){
var n,r,e,t,u,f,i,l,c,_,m,g,S=E.zu;return E.zu=null,S.sort(E.Ju),h>0?(S=S.slice(h,h+v),h=0):S.length>v&&(S.length=v),
o.Du.mf=o.Du.Eu=null,
p.length>0&&(r=o.shortenUrl(n=p[0]),((e=n.length!==r.length)||n.endsWith("/")&&n.length>1&&!n.endsWith("//"))&&(p[0]=e?r:n.slice(0,-1),
o.Du.vf(p[0]))),
S.forEach(o.Hu),t=S.length>0,u=s&&t,f=d,i=":"===w,c=b,_=y,m=2!=(l=a<0?-2!==a||t||i?0:3:$?p.length<=0||x?0:t?2:i?0:1:0)||i?0:E.if,
g=E.$u,E.df(),g(S,u,l,m,f,c,_)},df:function(){E.of=E.$u=null,o.set_tabsInNormal(null),o.setupQueryTerms(p=[],c=false,0),
w=b=g=S=M=T="",o.Du.Bu=null,o.qu(3),o.af(0),a=E.if=_=m=v=d=0,R=0,y=0,s=false,x=k=false,$=true},hf:function(){var n,r,e=g
;if(h=0,S="",!(0===e.length||(n=(e=e.slice(-5)).lastIndexOf("+"))<0||0!==n&&32!==e.charCodeAt(n-1))){if(e=e.slice(n),
n=g.length-e.length,(r=parseInt(e,10))>=0&&"+"+r===e&&r<=(n>0?100:200))h=r;else if("+"!==e)return;g=g.slice(0,n&&n-1),
S=e,y|=4}},Ju:function(n,r){return r.r-n.r}},I={__proto__:null,bookm:[1,A],domain:[16,j],history:[2,F],
omni:[63,D,j,F,A,B],search:[8,D],tab:[4,B]};e.x._u=function(n,r,t){var f,l,a,h,S,M,T,z,A,F;n=n.trim(),x=false,
n&&2===e.En.o&&(/^[A-Za-z]:[\\/]|^\\\\([\w$%.-]+([\\/]|$))?/.test(n)||"file:"===n.slice(0,5).toLowerCase())&&(":/\\".includes(n[1])&&(n=(":"===n[1]?"":"//")+n.slice(":"===n[1]?0:2).replace(/\\+/g,"/")),
(f=(n=n.replace(/\\/g,"/").toLowerCase()).indexOf("//")+2)>=2&&f<n.length&&"/"!==n[f]&&(l=n.slice(f).split("/",1)[0]).includes("%")&&(a=u.xt(l),
x=a===l,n=n.slice(0,f)+a+n.slice(f+l.length))),w=g=n&&n.replace(u.Tt," "),b="",y=0,E.hf(),
p=(n=g)?(n=n.length<201?n:u.$t(n,0,200).trimRight()).split(" "):[],
(h=0|r.c||128)&&(h-=n.replace(/[\u2e80-\u2eff\u2f00-\u2fdf\u3000-\u303f\u31c0-\u31ef\u3200-\u9fbf\uf900-\ufaff\ufe30-\ufe4f\uff00-\uffef]/g,"aa").length-n.length),
h=Math.max(50,Math.min(h,320)),c=!!(1&(_=r.f)),v=m=Math.min(Math.max(3,0|r.r||10),25),d=0,E.$u=t,S="bomni"===r.o?(_|=64,
I.omni):I[r.o],
T=r.t||63,z=r.e||63,S===I.tab&&(k=!!(2&_)),2===(M=p.length>=1?p[0]:"").length&&":"===M[0]&&(A="b"===(M=M[1])?I.bookm:"h"===M?I.history:"t"===M||"T"===M||"w"===M||"W"===M?(k="t"!==M&&"T"!==M,
_|=0,
_|="T"===M?2048:0,I.tab):"B"===M?(_|=64,I.omni):"H"===M?(_|=256,I.omni):"d"===M?I.domain:"s"===M?I.search:"o"===M?I.omni:null)&&(S=A,
b=p.shift(),
y|=1,g=g.slice(3),z=S[0]),p.length>0&&((M=p[0]).includes("\u3002")||M.includes("\uff1a"))&&!x&&((F=i.Ue(M,x=p.length<2))!==M?(p[0]=F,
g=F+g.slice(M.length),
x=x&&!/^[.\u3002]\w+([.\u3002]\w*)?$/.test(M)):x=x&&M.includes("\uff1a")&&!/\uff1a([^\/\d]|\d[^\0-\xff])/.test(M)),
$=true,R=T&z,s=2===S.length,g&&(y|=2),o.setupQueryTerms(p,c,h),E._u(S)}});