"use strict"
;__filename="background/tools.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./ui_css","./i18n","./run_commands","./open_urls","./tab_commands"],function(n,t,e,r,o,i,u,a,c,l,f,s,v,_){
var d;Object.defineProperty(t,"__esModule",{value:true}),t.mr=t.hr=t.wr=t.yr=t.Sr=void 0,r=__importStar(r),
a=__importStar(a),t.Sr={Cr:function(n,t){return"vimiumContent|"+n+(t?"|"+t:"")},Mr:function(n,t){
var i=o.me.contentSettings;try{i&&i.images.get({primaryUrl:"https://127.0.0.1/"},o.ae)}catch(n){i=null}
return i?i[n]&&!/^[A-Z]/.test(n)&&i[n].get?!(!t.startsWith("read:")&&r.Nt.test(t)&&!t.startsWith(e.u.et))&&(c.complainLimits(f._r("changeItsCS")),
true):(c.showHUD(f._r("unknownCS",[n])),true):(c.showHUD("Has not permitted to set contentSettings"),true)},
Ir:function(n,t){var o,u,a,l,s,v,_,d,m,p
;if(n.startsWith("file:"))return(o=e.Fn>=56?1:t>1?2:0)?(c.complainLimits(1===o?f._r("setFileCS",[56]):f._r("setFolderCS")),
[]):[n.split(/[?#]/,1)[0]];if(n.startsWith("ftp"))return c.complainLimits(f._r("setFTPCS")),[]
;if(u=n.match(/^([^:]+:\/\/)([^\/]+)/),a=i.ye.exec(u[2]),l=[(n=u[1])+(s=a[3]+(a[4]||""))+"/*"],
t<2||r.Rt(a[3],0))return l;for(a=null,_=(v=r.Ut(s))[0],d=v[1],m=Math.min(_.length-d,t-1),
p=0;p<m;p++)s=s.slice(_[p].length+1),l.push(n+s+"/*");return l.push(n+"*."+s+"/*"),
m===_.length-d&&"http://"===n&&l.push("https://*."+s+"/*"),l},Tr:function(n){var t,e,r;for(e of n.ao){
if(r=new URL(e.s.Ce).host,t&&t!==r)return true;t=r}return false},Nr:function(n,e){var r=o.me.contentSettings[n]
;null==e?(r.clear({scope:"regular"}),r.clear({scope:"incognito_session_only"},o.ae),
localStorage.removeItem(t.Sr.Cr(n))):r.clear({scope:e?"incognito_session_only":"regular"})},Or:function(n,r){
var o=n.type?""+n.type:"images";return!t.Sr.Mr(o,"http://a.cc/")&&(t.Sr.Nr(o,r?r.s.sr:2===e.Mn),
Promise.resolve("images"===o&&f._r(o)).then(function(n){c.showHUD(f._r("csCleared",[n||o[0].toUpperCase()+o.slice(1)]))
}),true)},Ar:function(n,e,r,o){var i=n.type?""+n.type:"images",u=r[0]
;n.incognito?t.Sr.Lr(e,i,u,o):t.Sr.Pr(i,e,u,"reopen"===n.action,o)},Pr:function(n,r,u,a,c){var l=i.Ee(u.url)
;t.Sr.Mr(n,l)?c(0):o.me.contentSettings[n].get({primaryUrl:l,incognito:u.incognito},function(i){t.Sr.Ur(n,l,r,{
scope:u.incognito?"incognito_session_only":"regular",setting:i&&"allow"===i.setting?"block":"allow"},function(r){
var i,l,f;r?c(0):(u.incognito||(i=t.Sr.Cr(n),"1"!==localStorage.getItem(i)&&localStorage.setItem(i,"1")),
f=!o.se()||e.Fn>=70&&(l=e.Vn.get(u.id))&&l.ao.length>1&&t.Sr.Tr(l),
u.incognito||a?_.Rr(u):u.index>0?_.Rr(u,f?0:2):o.getCurWnd(true,function(n){
return n&&"normal"===n.type?_.Rr(u,f?0:n.tabs.length>1?2:1):o.ve.reload(s.getRunNextCmdBy(0)),o.ae()}))})})},
Lr:function(n,r,u,a){if(e.u.lt)return c.complainLimits("setIncogCS"),void a(0);var l=i.Ee(u.url)
;t.Sr.Mr(r,l)?a(0):o.me.contentSettings[r].get({primaryUrl:l,incognito:true},function(e){
return o.ae()?(o.me.contentSettings[r].get({primaryUrl:l},function(e){e&&"allow"===e.setting?a(1):o.de.create({
type:"normal",incognito:true,focused:false,url:"about:blank"},function(e){var i=e.tabs[0].id
;return t.Sr.Wr(n,r,u,l,e.id,true,function(){o.ve.remove(i)})})
}),o.ae()):e&&"allow"===e.setting&&u.incognito?t.Sr.qr(u):void o.de.getAll(function(o){var i,a,c
;if((o=o.filter(function(n){return n.incognito&&"normal"===n.type})).length)return i=v.preferLastWnd(o),
e&&"allow"===e.setting?t.Sr.qr(u,i.id):(a=u.windowId,c=u.incognito&&o.some(function(n){return n.id===a}),
t.Sr.Wr(n,r,u,l,c?void 0:i.id))
;console.log("%cContentSettings.ensure","color:red","get incognito content settings",e," but can not find an incognito window.")
})})},Wr:function(n,e,r,i,u,a,c){var l=t.Sr.Fr.bind(null,r,u,c);return t.Sr.Ur(e,i,n,{scope:"incognito_session_only",
setting:"allow"},a&&u!==r.windowId?function(n){if(n)return l(n);o.de.get(r.windowId,l)}:l)},Ur:function(n,e,i,u,a){
var c,l=false,f=o.me.contentSettings[n],s=function(){var n=o.ae();return n&&console.log("[%o]",Date.now(),n),l||(--_,
((l=!!n)||0===_)&&setTimeout(a,0,l)),n},v=t.Sr.Ir(e,0|i),_=v.length;if(_<=0)return a(true);for(c of(r.Lt(u),
v))f.set(Object.assign({primaryPattern:c},u),s)},Fr:function(n,e,r,i){true!==i&&t.Sr.qr(n,e),r&&r(),
true!==i?e&&o.de.update(e,{focused:true,state:i?i.state:void 0}):s.runNextCmd(0)},qr:function(n,t){n.active=true,
"number"==typeof t&&n.windowId!==t&&(n.index=void 0,n.windowId=t),_.Rr(n)}},t.yr={Jr:localStorage,Xe:function(n,r,o){
var i,u,a,c=n.l,l=n.n,f=n.u,s=n.s
;c&&0===s[0]&&0===s[1]&&(2===s.length?(i=f.indexOf("#"))>0&&i<f.length-1&&s.push(f.slice(i)):(s[2]||"").length<2&&s.pop()),
u=t.yr.Dr(l,c?f:""),a=JSON.stringify(c?s:{tabId:o,url:f,scroll:s}),r?(e.bn||(d.Gr(),
e.nn(new Map))).set(u,a):t.yr.Jr.setItem(u,a)},Kr:function(n,r){var o,i=r.s.ur
;n.s?t.yr.Xe(n,r.s.sr,i):(r=(null===(o=e.Vn.get(i))||void 0===o?void 0:o.ar)||r)&&r.postMessage({N:11,n:n.n})},
xr:function(n,i){
var u,a,l,_,d,m,p,g,h=n.n,b=t.yr.Dr(h,n.u),w=i.s.sr&&(null==e.bn?void 0:e.bn.get(b))||t.yr.Jr.getItem(b),y=n.c
;if(n.l&&((u=w?JSON.parse(w):null)||(l=void 0,_=void 0,(a=n.o)&&(l=+a.x)>=0&&(_=+a.y)>=0&&(u=[l,_,a.h])),
u))i.postMessage({N:15,l:2,n:h,s:u,f:y});else{if(!w)return d=n.l?"Local":"Global",
void Promise.resolve(f._r(d)).then(function(n){c.showHUD(f._r("noMark",[n||d,h]))});p=+(m=JSON.parse(w)).tabId,(g={
u:m.url,s:m.scroll,t:m.tabId,n:h,p:true,q:v.parseOpenPageUrlOptions(y),f:s.parseFallbackOptions(y)
}).p=false!==y.prefix&&0===g.s[1]&&0===g.s[0]&&!!r.v(g.u),p>=0&&e.Vn.has(p)?o.tabsGet(p,t.yr.zr.bind(0,g)):e.an[20](g)}
},zr:function(n,r){var i=o.getTabUrl(r).split("#",1)[0];if(i===n.u||n.p&&n.u.startsWith(i))return e.an[5]({s:r.id}),
t.yr.Hr(n,r);e.an[20](n)},Dr:function(n,t){
return t?"vimiumMark|"+u.ke(t.split("#",1)[0])+(t.length>1?"|"+n:""):"vimiumGlobalMark|"+n},Hr:function(n,r){
var o,i=r.id,u=null===(o=e.Vn.get(i))||void 0===o?void 0:o.ar;if(u&&u.postMessage({N:15,l:0,n:n.n,s:n.s,f:n.f}),
n.t!==i&&n.n)return t.yr.Xe(n,2===e.Mn,i)},Qr:function(n){var r,o,i,u,a,l=t.yr.Dr("",n),s=[],v=t.yr.Jr;for(r=0,
o=v.length;r<o;r++)(i=v.key(r)).startsWith(l)&&s.push(i);for(i of s)v.removeItem(i);u=s.length,
(a=e.bn)&&a.forEach(function(n,t){t.startsWith(l)&&(u++,a.delete(t))
}),Promise.all(["#"===n?f._r("allLocal"):f.jr(n?"41":"39"),f._r(1!==u?"have":"has")]).then(function(n){
c.showHUD(f._r("markRemoved",[u,n[0],n[1]]))})}},t.wr={Zr:"findModeRawQueryList",Br:null,Er:0,Vr:function(){
var n=a.Ze(t.wr.Zr);t.wr.Br=n?n.split("\n"):[],t.wr.Vr=null},Xr:function(n,o,i){var u,c,l=t.wr;if(l.Vr&&l.Vr(),
u=n?e.wn||(d.Gr(),e.tn(l.Br.slice(0))):l.Br,!o)return u[u.length-(i||1)]||"";o=o.replace(/\n/g," "),
n?l.Yr(o,u,true):(o=r.$t(o,0,99),(c=l.Yr(o,u))&&a.Xe(l.Zr,c),e.wn&&l.Yr(o,e.wn,true))},Yr:function(n,t,e){
var r=t.lastIndexOf(n);if(r>=0){if(r===t.length-1)return;t.splice(r,1)}else t.length>=50&&t.shift();if(t.push(n),
!e)return t.join("\n")},no:function(n){n?e.wn&&e.tn([]):(t.wr.Vr=null,t.wr.Br=[],a.Xe(t.wr.Zr,""))}},d={to:false,Er:0,
Gr:function(){d.to||(o.de.onRemoved.addListener(d.ro),d.to=true)},ro:function(){d.to&&(d.Er=d.Er||setTimeout(d.io,34))},
io:function(){var n;if(d.Er=0,e.Fn>51)for(n of e.Vn.values())if(n.cr.s.sr)return;o.de.getAll(function(n){
n.some(function(n){return n.incognito})||d.uo()})},uo:function(){e.tn(null),e.nn(null),
o.de.onRemoved.removeListener(d.ro),d.to=false}},t.hr={co:[1,1],lo:0,Ze:function(n){var e=t.hr.co[n]
;return"object"==typeof e?e.matches:null},fo:function(n,e){
var r,o=t.hr,i=o.co,u=i[n],a=n?"prefers-color-scheme":"prefers-reduced-motion"
;1===u&&e&&(i[n]=u=matchMedia("(".concat(a,")")).matches?2:0),
e&&2===u?((r=matchMedia("(".concat(a,": ").concat(n?"dark":"reduce",")"))).onchange=o.so,i[n]=r,
o.lo=o.lo||setInterval(t.hr.vo,6e4),o._o(n,0)):e||"object"!=typeof u||(u.onchange=null,i[n]=2,
o.lo>0&&i.every(function(n){return"object"!=typeof n})&&(clearInterval(o.lo),o.lo=0),o._o(n,0))},_o:function(n,r){
var o,i,u,c,f=t.hr.co[n];o=n?"dark":"less-motion",c=a.Ye(u=n?"d":"m",i=!!("object"==typeof f)&&f.matches),
e.En[u]!==c&&(e.En[u]=c,r||a.We({N:6,d:[u]})),l.ii({t:o,
e:i||" ".concat(e.Jn.vomnibarOptions.styles," ").includes(" ".concat(o," ")),b:!r})},vo:function(){var n,e
;for(e=(n=t.hr.co).length;0<=--e;)"object"==typeof n[e]&&t.hr._o(e)},so:function(){t.hr.lo>0&&clearInterval(t.hr.lo),
t.hr.lo=-1;var n=t.hr.co.indexOf(this);n>=0&&t.hr._o(n)}},t.mr={do:null,mo:e.B},setTimeout(function(){function n(n){
var t,i,u;n.windowId===e.Cn?((t=performance.now())-f>666&&(i=c.get(e.jn),u=1===e.En.o?Date.now():t,i?(i.i=++l,
i.t=u):c.set(e.jn,{i:++l,t:u}),l>2037&&o.ve.query({},s)),e.cn(n.tabId),f=t):o.de.get(n.windowId,r)}function r(n){
if(n.focused){var t=n.id;t!==e.Cn&&(e.in(e.Cn),e.en(t)),o.ve.query({windowId:t,active:true},function(n){
n&&n.length>0&&t===e.Cn&&i(n)})}}function i(r){if(!r||0===r.length)return o.ae();var i=r[0],u=i.windowId,a=e.Cn
;u!==a&&(e.en(u),e.in(a)),e.un(i.incognito?2:1),t.mr.mo(),n({tabId:i.id,windowId:u})}
var u,a=e.Cn,c=e.Sn,l=1,f=0,s=function(n){var t=n?n.map(function(n){return[n.id,c.get(n.id)]}).filter(function(n){
return n[1]}).sort(function(n,t){return n[1].i-t[1].i}):[];t.length>1023&&t.splice(0,t.length-1023),
t.forEach(function(n,t){return n[1].i=t+2
}),(l=t.length>0?t[t.length-1][1].i:1)>1?e.on(c=new Map(t)):(c.forEach(function(n,t){n.i<1026?c.delete(t):n.i-=1024}),
l=1024)};for(u of(o.ve.onActivated.addListener(n),o.de.onFocusChanged.addListener(function(n){n!==a&&o.ve.query({
windowId:n,active:true},i)}),o.getCurTab(function(n){f=performance.now();var t=n&&n[0];if(!t)return o.ae();e.cn(t.id),
e.en(t.windowId),e.un(t.incognito?2:1)}),t.mr.do=function(n,t){return c.get(t.id).i-c.get(n.id).i},
["images","plugins","javascript","cookies"]))null!=localStorage.getItem(t.Sr.Cr(u))&&o.me.contentSettings&&setTimeout(t.Sr.Nr,100,u)
},120),a.Ke.autoDarkMode=a.Ke.autoReduceMotion=function(n,e){t.hr.fo(e.length>12?0:1,n)},
a.Ke.vomnibarOptions=function(n){
var r,o,i,u,c,l,f=a.Je.vomnibarOptions,s=e.An,v=true,_=f.actions,d=f.maxMatches,m=f.queryInterval,p=f.styles,g=f.sizes
;n!==f&&n&&"object"==typeof n&&(r=Math.max(3,Math.min(0|n.maxMatches||d,25)),o=((n.actions||"")+"").trim(),
i=+n.queryInterval,u=((n.sizes||"")+"").trim(),c=((n.styles||"")+"").trim(),l=Math.max(0,Math.min(i>=0?i:m,1200)),
(v=d===r&&m===l&&u===g&&_===o&&p===c)||(d=r,m=l,g=u,p=c),n.actions=o,n.maxMatches=r,n.queryInterval=l,n.sizes=u,
n.styles=c),e.Jn.vomnibarOptions=v?f:n,s.n=d,s.t=m,s.l=g,s.s=p,t.hr._o(0,1),t.hr._o(1,1),a.Qe({N:47,d:{n:d,t:m,l:g,s:s.s
}})}});