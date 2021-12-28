"use strict"
;__filename="background/page_handlers.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./exclusions","./ui_css","./key_mappings","./run_commands","./tools","./open_urls","./frame_commands"],function(n,u,r,t,e,l,o,i,c,s,f,a,v,d,m,p){
var _,g,b,x;Object.defineProperty(u,"__esModule",{value:true}),u.onReq=void 0,i=__importStar(i),s=__importStar(s),
_=[function(){return[i.Je,r.En.o,r.u.ht]},function(n){var u,t,e,l=r.N&&r.N();if(l)return l.then(_[1].bind(null,n,null))
;for(t in u={},i.Je)(e=i.Ze(t))!==i.Je[t]&&(u[t]=e);return u},function(n){var u,t,e=n.key,l=n.val
;return l=null!==(u=null!=l?l:i.Je[e])&&void 0!==u?u:null,i.Xe(e,l),(t=r.Jn[e])!==l?t:null},function(n){
var u=i.Ye(n.key,n.val);return u!==n.val?u:null},function(n){i.We({N:6,d:n})},function(n){return i.Ze(n.key,true)
},function(n){r.Vn.has(n)||e.ne(n)},function(){var n,u=a.aa;return!(!r.En.l||u||(n=Object.keys(r.pn).join(""),
n+=r.mn?Object.keys(r.mn).join(""):"",!/[^ -\xff]/.test(n)))||(u?(function(n){
var u,r,t=n.length>1?n.length+" Errors:\n":"Error: ";for(r of n)u=0,t+=r[0].replace(/%([a-z])/g,function(n,t){return++u,
"c"===t?"":"s"===t||"d"===t?r[u]:JSON.stringify(r[u])}),u+1<r.length&&(t+=" ".concat(r.slice(u+1).map(function(n){
return"object"==typeof n&&n?JSON.stringify(n):n}).join(" "),".\n"));return t})(u):"")},function(n){
var u=c.indexFrame(n[1],0);return u&&u.s&&(u.s.fr|=44),f.mergeCSS(n[0],-1)},function(){f.ri(2)},function(n){
return[l.$e(n[0],null,n[1]),l._e]},function(){d.hr.vo()},function(){var n=r._n.get("?"),u="?"
;return n&&7===n.ua&&n.da||r._n.forEach(function(n,r){7===n.ua&&n.da&&(u=u&&u.length<r.length?u:r)}),u},function(n){
var u;return[n=l.$e(n,null,0),null!==(u=r.On.get(n))&&void 0!==u?u:null]},function(n){var u,r,t,e=new Map
;return o.je("k:"+n,e),
null==(u=e.get("k"))?null:(r=l.$e(u.Ce,null,-2),[!(t=l._e>2),t?u.Ce:r.replace(/\s+/g,"%20")+(u.De&&"k"!==u.De?" "+u.De:"")])
},function(n){m.du(n)},function(n){var u=null;return n.startsWith("vimium://")&&(u=r.S(n.slice(9),1,true)),
"string"==typeof(u=null!==u?u:l.$e(n,null,-1))&&(u=o.Pe(u,"whole"),u=l.we(u)),u},function(){return r.C&&r.C()
},function(n){return r.P(n[0],n[1])},function(n){return m.vu(n)},function(){var n=r.N&&r.N()
;return Promise.all([e.te(e.getCurTab),n]).then(function(n){
var u,l=n[0],o=l&&l[0]||null,c=o?o.id:r.jn,f=null!==(u=r.Vn.get(c))&&void 0!==u?u:null,a=o?e.getTabUrl(o):f&&(f.ar||f.cr).s.Ce||"",v=!f||f.cr.s.or&&!t.Nt.test(f.cr.s.Ce)?null:f.cr.s,d=!(f||o&&a&&"loading"===o.status&&/^(ht|s?f)tp/.test(a)),m=x(f),p=!d&&!m,_=p?null:m||!a?m:a.startsWith(location.protocol)&&!a.startsWith(location.origin+"/")?new URL(a).host:null,g=_?r.Nn.get(_):null
;return p||null==g||true===g?_=null:f&&(f.dr=-1),{ver:r.u._t,runnable:p,url:a,tabId:c,
frameId:f&&(v||f.ar)?(v||f.ar.s).or:0,topUrl:v&&v.or&&f.ar?f.ar.s.Ce:null,frameUrl:v&&v.Ce,lock:f&&f.tr?f.tr.Yn:null,
status:v?v.Yn:0,unknownExt:_,exclusions:p?{rules:i.Ze("exclusionRules",true),
onlyFirst:i.Ze("exclusionOnlyFirstMatch",true),matchers:s.Ht(null),defaults:i.Je.exclusionRules}:null,os:r.En.o,
reduceMotion:r.En.m}})},function(n){var u,l,o=n[0],c=n[1],s=i.Ze("extAllowList"),f=s.split("\n")
;return f.indexOf(c)<0&&(u=f.indexOf("# "+c)+1||f.indexOf("#"+c)+1,f.splice(u?u-1:f.length,u?1:0,c),s=f.join("\n"),
i.Xe("extAllowList",s)),(l=r.Vn.get(o))&&(l.dr=null),e.te(e.me.tabs.get,o).then(function(n){var u=t.s(),r=function(){
return v.runNextOnTabLoaded({},n,u.Bt),e.me.runtime.lastError};return n?e.me.tabs.reload(n.id,r):e.me.tabs.reload(r),
u.Zt})},function(n){var u,t,e=n[1],l=n[2]
;return r.S("status/"+n[0],3),t=(u=c.indexFrame(e,l)||c.indexFrame(e,0))?r.Vn.get(e).tr:null,u&&!t&&r.an[8]({u:u.s.Ce
},u),[u?u.s.Yn:0,t?t.Yn:null]},function(n){return s.Ht(n)[0]},function(n,u){return p.initHelp({f:true},u)},function(n){
var u,r,t,l=n.module,o=n.name,i=g[l];return g.hasOwnProperty(l)&&i.includes(o)?(r=n.args,t=(u=e.me[l])[o],
new Promise(function(n){r.push(function(u){var r=e.ae();return n(r?[void 0,r]:[b(u),void 0]),r}),t.apply(u,r)
})):[void 0,{message:"refused"}]},function(n,u){return u.s.ur}],g={permissions:["contains","request","remove"],
tabs:["update"]},b=function(n){return{message:n&&n.message?n.message+"":JSON.stringify(n)}},u.onReq=function(n,u){
return _[n.n](n.q,u)},x=function(n){return n&&"string"==typeof n.dr&&true!==r.Nn.get(n.dr)?n.dr:null}});