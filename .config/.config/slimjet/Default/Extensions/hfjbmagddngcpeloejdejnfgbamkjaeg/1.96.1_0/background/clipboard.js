"use strict"
;__filename="background/clipboard.js",define(["require","exports","./store","./utils","./settings","./exclusions"],function(e,n,r,t,u,o){
var a,f,l,c,i,s,p,d,b,_,x,g;Object.defineProperty(n,"__esModule",{value:true}),n.doesNeedToSed=n.eu=void 0,
t=__importStar(t),u=__importStar(u),o=__importStar(o),a={__proto__:null,atob:8,base64:8,base64decode:8,btoa:9,
base64encode:9,decodeforcopy:1,decode:1,decodeuri:1,decodeurl:1,decodemaybeescaped:2,decodeall:19,decodecomp:2,
encode:10,encodecomp:11,encodeall:12,encodeallcomp:13,unescape:3,upper:4,lower:5,capitalize:16,capitalizeall:17,
camel:14,camelcase:14,dash:15,dashed:15,hyphen:15,normalize:6,reverse:7,reversetext:7,break:99,stop:99,return:99,
latin:18,latinize:18,latinise:18,noaccent:18,nodiacritic:18},f=null,l=function(e,n){
var r,u,o,f,l,i,s,d,b,_,x,g,m,v,w,y=[],z=new Map;for(r of e.split("\n"))if(r=r.trim(),
(u=/^([\w\x80-\ufffd]{1,6})([^\x00- \w\\\x7f-\uffff])/.exec(r))&&((f=z.get(o=u[2]))||(l="\\u"+(o.charCodeAt(0)+65536).toString(16).slice(1),
f=new RegExp("^((?:\\\\".concat(l,"|[^").concat(l,"])+)").concat(l,"(.*)").concat(l,"([a-z]{0,9})((?:,[A-Za-z-]+|,host=[\\w.*-]+)*)$")),
z.set(o,f)),i=f.exec(r.slice(u[0].length)))){for(g of(s=u[1],d=i[3],b=[],_=null,x=0,
i[4].split(",")))(m=g.toLowerCase()).startsWith("host=")?_=g.slice(5):m.startsWith("match")?x=1:(v=a[m.replace(/-/g,"")]||0)&&b.push(v)
;(w=t.m(i[1],x?d.replace("g",""):d))&&y.push({ru:n||p(s),ou:_,au:w,fu:x,lu:b,cu:c(i[2],1)})}return y},c=function(e,n){
return e.replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[^])|\$0/g,function(e,r){
return r?"x"===r[0]||"u"===r[0]?"$"===(r=String.fromCharCode(parseInt(r.slice(1),16)))?r+r:r:"t"===r?"\t":"r"===r?"\r":"n"===r?"\n":n?"0"===r?"$&":r>="1"&&r<="9"?"$"+r:r:r:n?"$&":e
})},i=function(e,n){
var t=14===n,u=15===n,o=16===n,a=17===n,f=r.Fn<64||false?t||u?/(?:[-_\s\/+\u2010-\u2015]|(\d)|^)([a-z\u03b1-\u03c9]|[A-Z\u0391-\u03a9]+[a-z\u03b1-\u03c9]?)|[\t\r\n\/+]/g:o?/(\b|_)[a-z\u03b1-\u03c9]/:a?/(\b|_)[a-z\u03b1-\u03c9]/g:null:new RegExp(t||u?"(?:[-_\\t\\r\\n/+\\u2010-\\u2015\\p{Z}]|(\\p{N})|^)(\\p{Ll}|\\p{Lu}+\\p{Ll}?)|[\\t\\r\\n/+]":o||a?"(\\b|_)\\p{Ll}":"",o?"u":"ug"),l=0,c=0,i=function(e,n){
return n?e.toLocaleLowerCase():e.toLocaleUpperCase()};return e=t||u?e.replace(f,function(n,r,t,o){
var a="\t\r\n/+".includes(n[0]),f=a||!l++&&e.slice(c,o).toUpperCase()===e.slice(c,o).toLowerCase();return a&&(l=0,
c=o+1),
t=t?t.length>2&&t.slice(-1).toLowerCase()===t.slice(-1)&&!/^e?s\b/.test(e.substr(o+n.length-1,3))?u?i(t.slice(0,-2),true)+"-"+i(t.slice(-2),true):i(t[0],f)+i(t.slice(1,-2),true)+i(t.slice(-2,-1),false)+t.slice(-1):u?i(t,true):i(t[0],f)+i(t.slice(1),true):"",
(a?n[0]:(r||"")+(r||u&&!f?"-":""))+t}):o||a?e.replace(f,function(e){return i(e,false)}):e,
u&&(e=e.replace(r.Fn<64||false?/[a-z\u03b1-\u03c9]([A-Z\u0391-\u03a9]+[a-z\u03b1-\u03c9]?)/g:new RegExp("\\p{Ll}(\\p{Lu}+\\p{Ll})","ug"),function(n,r,t){
return r=r.length>2&&r.slice(-1).toLowerCase()===r.slice(-1)&&!/^e?s\b/.test(e.substr(t+n.length-1,3))?i(r.slice(0,-2),true)+"-"+i(r.slice(-2),true):i(r,true),
n[0]+"-"+r})),e},s=function(e){return e.replace(r.Fn<64||false?/[\u0300-\u0362]/g:new RegExp("\\p{Diacritic}","gu"),"")
},n.eu=function(e){if(null!=e.$sed)return e.$sed;var n=e.sed,r=e.sedKeys||e.sedKey
;return null!=n||r?n&&"object"==typeof n?null!=n.r||n.k?n:null:e.$sed={r:n,k:r}:null},p=function(e,n){var r,t,u,o,a,f
;if("object"==typeof e)return e.iu||e.su?e:n?n.k=null:null
;for(r=null,t=0,u=0;u<e.length;u++)(a=-33&(o=e.charCodeAt(u)))>64&&a<91?t|=83===a?32772:1<<a-65:(r||(r=[]),
!n&&r.includes(o)||r.push(o));return f=t||r?{iu:t,su:r}:null,n?n.k=f:f},d=function(e,n){var r,t;if(e.iu&n.iu)return true
;if(r=n.su,!e.su||!r)return false;for(t of e.su)if(r.includes(t))return true;return false},
n.doesNeedToSed=function(e,n){var r,t;if(n&&(false===n.r||n.r&&true!==n.r))return false!==n.r
;for(t of(r=n&&n.k&&p(n.k,n)||(e?{iu:e,su:null}:null),f||r&&(f=l(u.Ze("clipSub"),null)),r?f:[]))if(d(t.ru,r))return true
;return false},b=function(e){
return e.includes("\n")?e:r.Fn>63||false?e.replace(new RegExp("(?<!\\\\) ([\\w\\x80-\\ufffd]{1,6})(?![\\x00- \\w\\\\\\x7f-\\uffff])","g"),"\n$1"):e.replace(/\\ | ([\w\x80-\ufffd]{1,6})(?![\x00- \w\\\x7f-\uffff])/g,function(e,n){
return" "===e[1]?e:"\n"+n})},r.f(function(e,n,r){var a,_,x,g,m=r&&"object"==typeof r?r.r:r;if(false===m)return e
;for(g of(a=f||(f=l(u.Ze("clipSub"),null)),_=r&&"object"==typeof r&&r.k&&p(r.k,r)||(n?{iu:n,su:null}:null),
m&&true!==m&&(_||(a=[]),a=l(b(m+""),_||(_={iu:1073741824,su:null})).concat(a)),x=function(n){var r,u,a,f,l,p
;if(d(n.ru,_)&&(!n.ou||("string"==typeof n.ou&&(n.ou=o.Jt(n.ou)||-1),-1!==n.ou&&o.Gt(n.ou,e)))){if(r=-1,n.fu?(u=0,
e.replace(n.au,function(e){var n=arguments;return r=(u=n[n.length-2])+e.length,a=n.length>3?n[1]:"",""}),
r>=0&&(f=e.replace(n.au,n.cu),e=f.slice(u,f.length-(e.length-r))||a||e.slice(u,r))):n.au.test(e)&&(r=n.au.lastIndex=0,
e=e.replace(n.au,n.cu)),r<0)return"continue";if(!e)return"break";for(p of(l=false,
n.lu))e=1===p?t.jt(e):2===p?t.yt(e):19===p?t.yt(e,true):3===p?c(e):4===p?e.toLocaleUpperCase():5===p?e.toLocaleLowerCase():10===p?t.kt(e):11===p?t.k(e):12===p?encodeURI(e):13===p?encodeURIComponent(e):8===p?t.xt(e,"atob"):9===p?btoa(e):(e=6!==p&&7!==p&&18!==p||false?e:e.normalize(18===p?"NFD":"NFC"),
7===p?Array.from(e).reverse().join(""):18===p?s(e):14===p||15===p||16===p||17===p?i(e,p):e),l=99===p;if(l)return"break"}
},_?a:[]))if("break"===x(g))break;return t.At(),e}),_=function(){var e=document.createElement("textarea")
;return e.style.position="absolute",e.style.left="-99px",e.style.width="0",e},x=function(e,n,t){
"string"!=typeof e&&(e="string"==typeof n&&n.startsWith("json")?JSON.stringify(e,null,n.slice(4)||2):e.join(n!==!!n&&n||"\n")+(e.length>1&&(!n||n===!!n)?"\n":""))
;var u=(e=e.replace(/\xa0/g," ").replace(/[ \t]+(\r\n?|\n)|\r\n?/g,"\n")).charCodeAt(e.length-1)
;return 32!==u&&9!==u||((u=e.lastIndexOf("\n")+1)?e=e.slice(0,u)+e.slice(u).trimRight():32!==(u=e.charCodeAt(0))&&9!==u&&(e=e.trimRight())),
r.P(e,4,t)},g=function(e,n){return e&&(e=e.replace(/\xa0/g," "),e=r.P(e,32768,n)),e},r.h(function(e,n,r){if(e=x(e,n,r)){
var t=document,u=_();u.value=e,t.body.appendChild(u),u.select(),t.execCommand("copy"),u.remove(),u.value=""}return e}),
r.p(r.u.ct?function(e,n){var u,o=_();return o.maxLength=n||102400,document.body.appendChild(o),o.focus(),
document.execCommand("paste"),u=o.value.slice(0,n||102400),o.value="",o.remove(),o.removeAttribute("maxlength"),
!n&&u.length>=81920&&("data:"===u.slice(0,5).toLowerCase()||t.It(u))?r.V(e,20971520):g(u,e)}:function(){return null}),
u.Ke.clipSub=function(){f=null}});