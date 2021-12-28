"use strict";__filename="background/browser.js",define(["require","exports","./store","./utils"],function(n,e,r,u){
var t,o,i,l,f,a,c,s,d,v,m,p,b;Object.defineProperty(e,"__esModule",{value:true}),
e.ne=e.ee=e.re=e.removeTempTab=e.downloadFile=e.makeTempWindow_r=e.makeWindow=e.openMultiTabs=e.tabsCreate=e.selectWndIfNeed=e.selectWnd=e.selectTab=e.ue=e.te=e.oe=e.selectFrom=e.getCurWnd=e.ie=e.le=e.fe=e.getCurTabs=e.getCurTab=e.isTabMuted=e.getTabUrl=e.getGroupId=e.tabsUpdate=e.tabsGet=e.ae=e.ce=e.se=e.de=e.ve=e.me=void 0,
e.me=chrome,e.ve=e.me.tabs,e.de=e.me.windows,e.se=function(){return e.me.sessions},e.ce=function(){
return e.me.webNavigation},e.ae=function(){return e.me.runtime.lastError},e.tabsGet=e.ve.get,e.tabsUpdate=e.ve.update,
e.getGroupId=function(n){var e=n.groupId;return-1!==e&&null!=e?e:null},e.getTabUrl=function(n){return n.url},
e.isTabMuted=function(n){return n.mutedInfo.muted},e.getCurTab=e.ve.query.bind(null,{active:true,currentWindow:true}),
e.getCurTabs=e.ve.query.bind(null,{currentWindow:true}),e.fe=e.getCurTabs,e.le=function(){return true},e.ie=null,
e.getCurWnd=function(n,u){var t={populate:n};return r.Cn>=0?e.de.get(r.Cn,t,u):e.de.getCurrent(t,u)},
e.selectFrom=function(n){for(var e=n.length;0<--e;)if(n[e].active)return n[e];return n[0]},e.oe=function(n){
return/^(edge-)?extension:/.test(n)?r.u.et+"-"+n.slice(n.indexOf("ext")):n},e.te=function(n){
var r=[].slice.call(arguments,1),t=u.s(),o=t.Zt,i=t.Bt;return r.push(function(n){var r=e.ae()
;return i(r?void 0:null!=n?n:null),r}),n.apply(void 0,r),o},t=function(n){return n!==r.B?function(){var r=e.ae()
;return n(!r),r}:e.ae},e.ue=t,o=function(n,e){var u=r.On.get(n);return 1===u||2===u&&!(!r.Kn&&!e)},i=function(n,r){
e.tabsUpdate(n,{active:true},r)},e.selectTab=i,l=function(n){return n&&e.de.update(n.windowId,{focused:true}),e.ae()},
e.selectWnd=l,f=function(n){n.windowId!==r.Cn&&e.selectWnd(n)},e.selectWndIfNeed=f,a=function(n,u,t){var i=n.url
;return i?o(i,2===r.Mn)&&delete n.url:(i=r.Jn.newTabUrl_f,
2===r.Mn&&(-1===t?i.includes("pages/blank.html")&&i.startsWith(location.origin+"/"):!t&&i.startsWith(location.protocol))||o(i,2===r.Mn)||(n.url=i),
n.url||delete n.url),e.ve.create(n,u)},e.tabsCreate=a,c=function(n,r,u,t,o,i,l){var f;o=false!==o,
f=null!=i?e.getGroupId(i):null,o||null==f||delete n.index,f=o&&null!=f&&e.ve.group?f:void 0,e.tabsCreate(n,function(u){
var o,i,a,c,s;if(e.ae())return l&&l(),e.ae();for(n.index=u.index,n.windowId=u.windowId,null!=f&&e.ve.group({tabIds:u.id,
groupId:f}),l&&l(u),n.active=false,o=null!=n.index,i=t?t.length:1,a=null!=f?function(n){return n&&e.ve.group({
tabIds:n.id,groupId:f}),e.ae()
}:e.ae,t.length>1&&(t[0]=n.url),c=0;c<r;c++)for(s=c>0?0:1;s<i;s++)t.length>1&&(n.url=t[s]),o&&++n.index,e.ve.create(n,a)
},u)},e.openMultiTabs=c,s=function(n,u,t){var i,l=false!==n.focused
;(u=u?"minimized"===u===l||"popup"===n.type||"normal"===u||"docked"===u?"":u:"")&&!u.includes("fullscreen")&&(n.state=u,
u=""),
n.focused=true,(i=n.url)||null!=n.tabId||(i=n.url=r.Jn.newTabUrl_f),"string"==typeof i&&o(i,n.incognito)&&delete n.url,
e.de.create(n,u||!l||t?function(n){if(t&&t(n),!(u||!l)||!n)return e.ae();var r=l?{}:{focused:false};u&&(r.state=u),
e.de.update(n.id,r)}:e.ae)},e.makeWindow=s,d=function(n,r,u){var t="number"==typeof n;e.de.create({type:"normal",
focused:false,incognito:r,state:"minimized",tabId:t?n:void 0,url:t?void 0:n},u)},e.makeTempWindow_r=d,
v=function(n,r,t,o){e.te(e.me.permissions.contains,{permissions:["downloads"]}).then(function(t){var i,l,f,a;t?(i={url:n
},
r&&(l=/\.[a-z\d]{1,4}(?=$|[?&])/i,r=(r="#"===(r=u.xt(r))[0]?r.slice(1):r).replace(/[\r\n]+/g," ").replace(/[/\\?%*:|"<>_]+/g,"_"),
l.test(r)||(f=l.exec(n),r+=f?f[0]:n.includes(".")?"":".bin"),i.filename=r),a=e.te(e.me.downloads.download,i),
o&&a.then(function(n){return o(void 0!==n)})):o&&o(false)})},e.downloadFile=v,m=function(n){e.ve.remove(n,e.ae)},
e.removeTempTab=m,e.re=function(n){
return n=n.slice(0,99).toLowerCase(),1!==r.On.get(n)&&(n.startsWith("about:")?"about:blank"!==n:n.startsWith("chrome:")?!n.startsWith("chrome://downloads"):n.startsWith(r.u.et)&&!("string"!=typeof r.u.ft?r.u.ft.test(n):n.startsWith(r.u.ft))||r.Kn&&/^(edge|extension):/.test(n)&&!n.startsWith("edge://downloads"))
},p=function(n,r){var u,t,o=e.me.permissions;u=Promise.all(n.map(function(n){return n&&e.te(e.me.permissions.contains,n)
})),t=n.map(function(n){return n&&(n.permissions||n.origins)[0]}),u.then(function(n){
var e=false,u=false,i=function(i,a){var c,s,d,v,m=!a;if(a){for(s of(c=a.permissions)||[])(d=t.indexOf(s))>=0&&(n[d]=i,
m=true);for(v of(!c||c.length<=0)&&a.origins||[])if("chrome://*/*"!==v)(d=t.indexOf(v))>=0&&(n[d]=i,
m=true);else for(d=0;d<t.length;d++)(t[d]||"").startsWith("chrome://")&&(n[d]=i,m=true)}
m&&(false===r(n,true)&&(e=u=false),e!==n.includes(false)&&o.onAdded[(e=!e)?"addListener":"removeListener"](l),
u!==n.includes(true)&&o.onRemoved[(u=!u)?"addListener":"removeListener"](f))},l=i.bind(null,true),f=i.bind(null,false)
;n.includes(false)||n.includes(true)?i(true):r(n,false)})},e.ee=p,b=function(n){var u,t=location.origin.length
;for(u of r.u.at.slice(0,-1))e.ve.executeScript(n,{file:u.slice(t),allFrames:true},e.ae)},e.ne=b,
r.In<3&&r.G(new Promise(function(n){var r=e.me.runtime.onInstalled,u=function(e){var t=u;t&&(u=null,e&&n(e),
r.removeListener(t))};r.addListener(u),setTimeout(u,1e4,null)}))});