"use strict"
;__filename="background/ui_css.js",define(["require","exports","./store","./utils","./settings","./ports"],function(n,i,r,e,t,o){
var u,s,f,c,a,d;Object.defineProperty(i,"__esModule",{value:true}),i.ni=i.ii=i.mergeCSS=i.ri=void 0,
u=r.u.st+","+r.Fn+";",f=function(n,o){return-1===n?i.mergeCSS(o,-1):(2===n&&r.$(null),
(f=0===n&&t.eo.getItem("findCSS"))?(s=null,
r.K(a(f)),r.F(o.slice(u.length)),void(r.An.c=t.eo.getItem("omniCSS")||"")):void e.o("vimium-c.css").then(function(e){
var o,s,f,a,d;u.slice(u.indexOf(",")+1),r.Fn<54&&(e=e.replace(/user-select\b/g,"-webkit-$&")),
r.Fn<62&&(e=e.replace(/#[\da-f]{4}([\da-f]{4})?\b/gi,function(n){
n=5===n.length?"#"+n[1]+n[1]+n[2]+n[2]+n[3]+n[3]+n[4]+n[4]:n
;var i=parseInt(n.slice(1),16),r=i>>16&255,e=i>>8&255,t=(255&i)/255+""
;return"rgba(".concat(i>>>24,",").concat(r,",").concat(e,",").concat(t.slice(0,4),")")})),
s=(e=(o=c(e)).ui).indexOf("all:"),f=e.lastIndexOf("{",s),a=r.Fn>=53?e.indexOf(";",s):e.length,
e=e.slice(0,f+1)+e.slice(s,a+1)+e.slice(e.indexOf("\n",a)+1||e.length),r.Fn>64&&true?(s=e.indexOf("display:"),
f=e.lastIndexOf("{",s),e=e.slice(0,f+1)+e.slice(s)):e=e.replace("contents","block"),
r.Fn<73&&(e=e.replace("3px 5px","3px 7px")),r.Fn<69&&(e=e.replace(".LH{",".LH{box-sizing:border-box;")),
r.Kn&&r.Fn<89&&(e=e.replace("forced-colors","-ms-high-contrast")),e=e.replace(/\n/g,""),
r.Fn<85&&(e=e.replace(/0\.01|\/\*!DPI\*\/ ?[\d.]+/g,"/*!DPI*/"+(r.Fn<48?1:.5))),t.eo.setItem("innerCSS",u+e),
t.eo.setItem("findCSS",(d=o.find).length+"\n"+d),i.mergeCSS(t.Ze("userDefinedCss"),n)}));var f},i.ri=f,c=function(n){
var i,r,e=n?n.split(/^\/\*\s?#!?([A-Za-z:]+)\s?\*\//m):[""],t={ui:e[0].trim()}
;for(i=1;i<e.length;i+=2)t[r=e[i].toLowerCase()]=(t[r]||"")+e[i+1].trim();return t},a=function(n){
var i=(n=n.slice(n.indexOf("\n")+1)).indexOf("\n")+1,r=n.indexOf("\n",i);return{c:n.slice(0,i-1).replace("  ","\n"),
s:n.slice(i,r).replace("  ","\n"),i:n.slice(r+1)}},d=function(n,e){
var s,f,d,l,S,v,b,g,m,C,p,x=t.eo.getItem("innerCSS"),_=x.indexOf("\n");if(x=_>0?x.slice(0,_):x,
f=(s=c(n)).ui?x+"\n"+s.ui:x,d=s["find:host"],l=s["find:selection"],S=s.find,v=s.omni,b="omniCSS",
_=(x=t.eo.getItem("findCSS")).indexOf("\n"),g=(x=x.slice(0,_+1+ +x.slice(0,_))).indexOf("\n",_+1),
m=x.slice(0,g).indexOf("  "),
l=l?"  "+l.replace(/\n/g," "):"",(m>0?x.slice(m,g)!==l:l)&&(x=x.slice(_+1,m=m>0?m:g)+l+x.slice(g),g=m-(_+1)+l.length,
_=-1),C=x.indexOf("\n",g+1),p=x.slice(0,C).indexOf("  ",g),d=d?"  "+d.replace(/\n/g," "):"",
(p>0?x.slice(p,C)!==d:d)&&(x=x.slice(_+1,p>0?p:C)+d+x.slice(C),_=-1),_<0&&(x=x.length+"\n"+x),S=S?x+"\n"+S:x,
x=(t.eo.getItem(b)||"").split("\n",1)[0],v=v?x+"\n"+v:x,-1===e)return{ui:f.slice(u.length),find:a(S),omni:v}
;t.eo.setItem("innerCSS",f),t.eo.setItem("findCSS",S),v?t.eo.setItem(b,v):t.eo.removeItem(b),i.ri(0,f),
0!==e&&1!==e&&(o.oo(function(n){var e;for(e of n.ao)8&e.s.fr&&e.postMessage({N:12,H:r.Hn,f:32&e.s.fr?i.ni(e.s):void 0})
}),t.Qe({N:47,d:{c:r.An.c}}))},i.mergeCSS=d,i.ii=function(n,i){var t,o,u,s,f,c,a=r.An.s
;!n.o&&r.yn||(o=" ".concat(n.t," "),
s=(u=a&&" ".concat(a," ")).includes(o),t=(t=(f=null!=n.e?n.e:s)?s?a:a+o:u.replace(o," ")).trim().replace(e.Tt," "),
false!==n.b?(n.o&&r.Q(f!==" ".concat(r.Jn.vomnibarOptions.styles," ").includes(o)),t!==a&&(r.An.s=t,c={N:47,d:{s:t}},
e.a(r.Pn.slice(0),function(n){return n!==i&&r.Pn.includes(n)&&n.postMessage(c),1}))):r.An.s=t)},i.ni=function(n){
var i=r.qn;return r.Fn<86&&n.Ce.startsWith("file://")?s||(s={
c:i.c+"\n.icon.file { -webkit-user-select: auto !important; user-select: auto !important; }",s:i.s,i:i.i}):i},
t.Ke.userDefinedCss=i.mergeCSS,
r.F(t.eo.getItem("innerCSS")||""),r.Hn&&!r.Hn.startsWith(u)?(t.eo.removeItem("vomnibarPage_f"),
i.ri(1,r.Hn)):i.ri(0,r.Hn)});