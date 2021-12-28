"use strict"
;__filename="background/sync.js",define(["require","exports","./store","./utils","./browser","./settings"],function(n,t,e,r,o,i){
function u(){return new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toJSON().slice(0,-5).replace("T"," ")}
var l,f,c,a,s,d,S,g,y,v,p,b,m,O,N,w,J,_,j,T,h,k,x,D,q,M,P,Q;Object.defineProperty(t,"__esModule",{value:true}),
r=__importStar(r),i=__importStar(i),l=r.Lt({findModeRawQueryList:1,innerCSS:1,keyboard:1,newTabUrl_f:1,vomnibarPage_f:1
}),f=o.me.storage,a=null,s="",d=null,S=null,g=null,v=0,p=function(){return c||(c=f&&f.sync)},b=function(n){m(n,"sync")},
m=function(n,t){var o,i,u,l;if("sync"===t)if(o=function(n){var t,e,o,i;if(d){for(t in r.Lt(n),
d)!(o=(e=t.split(":")[0])===t)&&e in d||N(e,null!=(i=o?d[t]:null)?i.newValue:n[e],n);d=null}},r.Lt(n),i=e.N&&e.N(),
d?Object.assign(d,n):d=n,i)i.then(function(){return m({},t)});else for(u in n=d,d=null,n){if(l=n[u],
8===(u.includes(":")?8:N(u,null!=l?l.newValue:null)))return d=n,void p().get(o);delete n[u]}},O=function(){
console.log.apply(console,["[".concat(u(),"]")].concat([].slice.call(arguments)))},N=function(n,t,e){var r,o,u,l,f,c
;if(n in i.Je&&!(n in i.Fe)&&q(n)){if(r=i.Je[n],o=t&&"object"==typeof t&&t.$_serialize||""){if("split"===o&&!e)return 8
;if(8===(t=k(n,t,e)))return}null!=t?(u=g?r:i.Ze(n),(c="object"!=typeof r)?(f=t,l=u):(f=JSON.stringify(t),
l=JSON.stringify(u)),
f!==l&&(f===(u=c?r:JSON.stringify(r))&&(t=r),g||O("sync.this: update",n,"string"==typeof t?(t.length>32?t.slice(0,30)+"...":t).replace(/\n/g,"\\n"):t),
w(n,t))):null!=localStorage.getItem(n)&&(g||O("sync.this: reset",n),w(n,r))}},w=function(n,t){s=n,i.Xe(n,t),s="",
n in i.Le&&i.We({N:6,d:[i.Le[n]]})},J=function(n,t){_(n,t),q(n)&&n!==s&&(a||(setTimeout(D,800),a=r.Pt()),a[n]=t)},
_=function(n,t){var r,i,u;p()?(i=f.local,u=function(){var t=o.ae()
;if(t)return O("storage.local: Failed to update",n,":",t.message||t),t},null==t?i.remove(n,u):i.set(((r={})[n]=t,
r),u)):e.w(e.B)},j=function(n){return n.replace(/[<`\u2028\u2029]/g,function(n){
return"<"===n?"`l":"`"===n?"`d":"\u2028"===n?"`r":"`n"})},T=function(n){return n.replace(/"|\\[\\"]/g,function(n){
return'"'===n?"`q":'\\"'===n?"`Q":"`S"})},h=function(n){var t={Q:'\\"',S:"\\\\",d:"`",l:"<",n:"\u2029",q:'"',r:"\u2028"}
;return n.replace(/`[QSdlnqr]/g,function(n){return t[n[1]]})},k=function(n,t,e){var r,o,u,l,f="";switch(t.$_serialize){
case"split":for(r=t.k,o=t.s,u=0;u<o;u++){if(!(l=e[n+":"+u])||"string"!=typeof l||!l.startsWith(r))return 8
;f+=l.slice(r.length)}break;case"single":return JSON.parse(h(JSON.stringify(t.d)));default:
return O("Error: can not support the data format in synced settings data:",n,":",t.$_serialize),null}
return"string"==typeof i.Je[n]?f=h(f):(f=h(JSON.stringify(f)),JSON.parse(f.slice(1,-1)))},x=function(n,t,e){
var r,o,u,l,f,c,a,s,d,g,y,v,p,b,m,O;if(t&&!("string"!=typeof t?"object"!=typeof t:t.length<8192/6-40)&&(o="",
!((r=JSON.stringify(t)).length<8192/6-40||(u=function(n){return n.replace(/[^\x00-\xff]/g,function(n){
var t=n.charCodeAt(0);return"\\u"+(t>4095?"":"0")+t.toString(16)})},l=true,f=r.length,
3*((c=(r=j(r)).length)-f)+3*f<8093)))){
if((o=l?e.encode(r):r=u(r)).length<8093)return(l?o.length+4*(c-f):Math.ceil((o.length-c)/5*3+6*(c-f)+(f-(o.length-c)/5-(c-f))))<8093?void 0:r
;for(a=0,s=Date.now().toString(36)+":",d={},r="string"==typeof i.Je[n]?r.slice(1,-1):T(r),l?(S||(S=new TextDecoder),
o=e.encode(r)):o=u(r),g=0,y=o.length;g<y;){if(v=Math.min(g+8134,y),p=void 0,b=0,l){for(;v<y&&128==(192&o[v]);v--);
p=S.decode(o.subarray(g,v))}else p=o.slice(g,v);if(r=p.slice(-6),(b=v<y?r.lastIndexOf("\\"):-1)>0&&b>r.length-2)p+="b",
b=1;else if(b>0&&"u"===r[b+1])for(m=b=r.length-b;m++<6;p+="b");else b=0;if(p=JSON.parse('"'.concat(p,'"')),
b&&((O=p.endsWith("b"))||(v-=b),p=p.slice(0,b>1&&O?b-6:-1)),d[n+":"+a++]=s+p,g=v,a>=13)break}return d[n]={
$_serialize:"split",k:s,s:a},d}},D=function(){var n,t,u,l,f,c,s,d,g=a,y=[],v=[],b=[],m=r.Pt(),N={};if(a=null,
g&&e.O===J){for(t in n=new TextEncoder,g)for(c="string"==typeof(f=i.Je[u=t])||"object"==typeof f&&"vimSync"!==u?0:13,
null!=(l=g[u])?(s=x(u,l,n))&&"object"==typeof s?(m[u]=s,c=s[u].s):(N[u]=s?{$_serialize:"single",d:JSON.parse(s)}:l,
v.push(u)):(b.push(u),y.push(u));c<13;c++)b.push(u+":"+c)
;for(u in S=n=null,y.length>0&&O("sync.cloud: reset",y.join(", ")),b.length>0&&p().remove(b),
v.length>0&&(O("sync.cloud: update",v.join(", ")),p().set(N)),d=function(n){p().set(m[n],function(){var t=o.ae()
;return t?O("Failed to update",n,":",t.message||t):O("sync.cloud: update (serialized) "+n),t})},m)d(u)}},q=function(n){
return!(n in l)},M=function(n){e.i(null),v&&clearTimeout(v),v=setTimeout(function(){v=0,f.local.get(function(n){
var t,e,o,u,l,c,a,s,d;if(localStorage.length){for(O("storage.local: backup all settings from localStorage"),r.Lt(n),t=0,
e=localStorage.length;t<e;t++)(o=localStorage.key(t))in i.Je&&(q(o)||"keyboard"===o)&&(u=i.Je[o],l=n[o],a=c=i.Ze(o),s=l,
"object"==typeof u&&(s=JSON.stringify(l),a=JSON.stringify(c)),a!==s&&_(o,c),delete n[o])
;(d=Object.keys(n)).length>0&&f.local.remove(d)}})},n)},P=function(n,t,u){var l,c,a,d,S,v,b,w,J,j
;if(2&t&&f.local.get(function(n){var l,f,c,a,d=o.ae()
;if(d&&e.b(null),d||!e.Tn&&true===i.Ze("vimSync"))return(t-=2)||u(),d;for(c in r.Lt(n),
f=void 0!==(l=n.vimSync)||Object.keys(n).length>0,
delete n.vimSync,f&&O("storage.local: restore settings to localStorage"),n)c in i.Je&&(s=c,
i.Xe(c,a=null==(a=n[c])?i.Je[c]:a));s="",null!=l&&i.Xe("vimSync",l),setTimeout(function(){i.We({N:6,d:e.En})},100),
(t-=2)||u()}),2!==t){if(r.Lt(n),!(l=n.vimSync||i.Ze("vimSync")))return y=l,e.w(_),void(--t||u())
;for(a in n.vimSync||(O("sync.cloud: enable vimSync"),n.vimSync=l,p().set({vimSync:l})),c=[],n)a in i.Ne&&c.push(a)
;for(a of(d=[],S={},c))for(v=i.Ne[a],b=-1,w=void 0;b<13&&(w=b<0?a:a+":"+b)in n;b++)S[J=b<0?v:v+":"+b]=n[J]=n[w],
delete n[w],d.push(w);for(c.length>0&&(f.onChanged.removeListener(m),e.w(e.B),p().remove(d),p().set(S,o.ae),c.length=0),
b=0,j=localStorage.length;b<j;b++)!((a=localStorage.key(b))in n)&&a in i.Je&&q(a)&&c.push(a);for(a of c)N(a,null)
;for(a in n)a.includes(":")||N(a,n[a],n);i.Ve("vimSync"),setTimeout(function(){--t||u()},4),
g&&3!==t&&O("sync.cloud: download settings to localStorage")}},i.Ke.vimSync=function(n){var t,r,o;if(y=n,p()){
if(r=(t=p().onChanged)||f.onChanged,o=t?b:m,!n)return r.removeListener(o),void(e.O!==_&&(e.w(_),M(600)))
;e.O!==J&&(r.addListener(o),e.w(J),v&&clearTimeout(v),v=0,f.local.getBytesInUse(function(n){
n>0&&f.local.get(function(n){
delete n.vimSync,O("switch to sync.cloud, when old settings data in storage.local is:","\n"+JSON.stringify(n,null,2))})
}))}},e.b(function(){if(g);else{if(localStorage.length)return null;g=new Promise(function(n){y?p().get(function(t){
var r=o.ae();return r?(e.b(null),n()):P(t,1,n),r}):P({},2,n)}).then(function(){g=null})}return g})
;false===(y=i.Ze("vimSync"))||!y&&!e.Tn?(e.i((Q=true===e.j)?null:M),Q&&M(6e3),e.w(_)):p()?p().get(function(n){
var t=o.ae();if(t)return O("Error: failed to get storage:",t,"\n\tSo disable syncing temporarily."),i.Ke.vimSync=void 0,
e.w(e.B),e.b(null),t;g=Promise.resolve(),g=new Promise(function(t){return P(n,3,t)}).then(function(){g=null})
}):(e.w(e.B),e.b(null))});