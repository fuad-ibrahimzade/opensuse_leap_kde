"use strict"
;__filename="background/request_handlers.js",define(["require","exports","./store","./utils","./browser","./parse_urls","./settings","./ports","./exclusions","./ui_css","./i18n","./key_mappings","./run_commands","./run_keys","./open_urls","./frame_commands","./tools"],function(n,t,u,r,e,o,i,f,l,c,a,s,d,v,m,p,b){
var _,g,w,y,j,k;Object.defineProperty(t,"__esModule",{value:true}),r=__importStar(r),i=__importStar(i),_=-1,
u.y([function(n,t){var r,e,o=n.k,l=i.Ge;if(!(o>=0&&o<l.length))return u.set_cPort(t),
f.complainLimits(a._r("notModify",[o]));r=l[o],e=u.N&&u.N(),i.Ze(r)!==n.v&&(e?e.then(function(){i.Xe(r,n.v)
}):i.Xe(r,n.v))},function(n,t){var u="object"==typeof n;return b.wr.Xr(t.s.sr,u?n.q:"",u?1:n)},function(n,t){
var u=o.He(n);if(null==n.i)return u;t.postMessage({N:44,i:n.i,s:u})},function(n,t){var i=n.u,l=n.e,c=o.qe(n);r.At(),
n.e=c,
null==c.p?(u.set_cPort(t),f.showHUD(c.u)):l||i!==c.u?!t||"file://"===c.u.slice(0,7).toLowerCase()&&"file://"!==i.slice(0,7).toLowerCase()?e.tabsUpdate({
url:c.u}):d.sendFgCmd(0,false,{r:1,u:c.u}):(u.set_cPort(t),f.showHUD("Here is just root"),n.e={p:null,u:"(just root)"})
},function(n,t){var r,e,i=o.He(n);if(!i||!i.k)return u.set_cPort(t),f.showHUD(a._r("noEngineFound")),
void(n.n&&d.runNextCmdBy(0,n.n));e=n.o||{},r=n.t.trim()&&u.P(n.t.trim(),524288,e.s).trim()||(n.c?u.V(e.s):""),
Promise.resolve(r).then(function(r){
var o=null===r?"It's not allowed to read clipboard":(r=r.trim())?"":a._r("noSelOrCopied");if(o)return u.set_cPort(t),
f.showHUD(o),void(n.n&&d.runNextCmdBy(0,n.n));e.k=null==e.k?i.k:e.k,u.an[6]({u:r,o:e,r:0,
n:d.parseFallbackOptions(n.n)||{}},t)})},function(n,t){var r,o=n.s,i=false!==n.a;u.set_cPort(f.findCPort(t)),
"number"!=typeof o?e.se()?(e.se().restore(o[1],function(){var n=e.ae();return n&&f.showHUD(a._r("noSessionItem")),n}),
i||((r=t.s.ur)>=0||(r=u.jn),r>=0&&e.selectTab(r))):f.complainNoSession():e.selectTab(o,function(n){
return e.ae()?f.showHUD(a._r("noTabItem")):e.selectWnd(n),e.ae()})},m.openUrlReq,function(n,t){var r,e,o,i
;(e=u.Vn.get(r=t.s.ur))?t!==(i=e.cr)&&(e.cr=t,u.Dn&&(o=t.s.Yn)!==i.s.Yn&&u.R(r,o)):u.Dn&&u.R(r,t.s.Yn)},function(n,t){
var r,e,o,i,c,a=t;if((a||(a=f.indexFrame(n.tabId,n.frameId)))&&(e=(r=a.s).Ce,!(o=u.Vn.get(r.ur))||!o.tr)){
if(i=l.lr?l.ir(r.Ce=t?n.u:n.url,r):null,
r.Yn!==(c=null===i?0:i?1:2))r.Yn=c,u.Dn&&o.cr===a&&u.R(r.ur,c);else if(!i||i===l.ir(e,r))return;a.postMessage({N:1,p:i,
f:0})}},function(n,t){var r,e=n.t||0;u.set_cPort(t),u.set_cRepeat(e||u.cRepeat>0?1:-1),u.set_cKey(n.k),
d.replaceCmdOptions(n.f||{}),
2!==e?1===e?p.parentFrame():p.nextFrame():(r=u.Vn.get(t.s.ur))?p.focusFrame(r.cr,r.ao.length<=2,1,u.get_cOptions()):f.safePost(t,{
N:45,l:u.cKey})},function(n,t){var r,e,o,i=u.Vn.get(t.s.ur);if(i&&(t.s.fr|=4,i.fr|=4,!(i.ao.length<2)))for(e of(r={N:8},
i.ao))o=e.s.fr,e.s.fr|=4,4&o||e.postMessage(r)},function(n,t,r){var o,i,l=t.s.ur,c=u.Vn.get(l),a=n.u
;if(!c||c.ao.length<2)return false;for(i of c.ao)if(i.s.Ce===a){if(o){o=null;break}o=i}return o?(u.set_cKey(n.k),
y(n,t,o,1),true):!!e.ce()&&(e.ce().getAllFrames({tabId:t.s.ur},function(e){var o,i,c=0,a=t.s.or
;for(o of e)if(o.parentFrameId===a){if(c){c=0;break}c=o.frameId}(i=c&&f.indexFrame(l,c))&&(u.set_cKey(n.k),y(n,t,i,1)),
f.sendResponse(t,r,!!i)}),t)},function(n,t){p.initHelp(n,t)},function(n,t){u.Vn.get(t.s.ur).fr|=4,t.s.fr|=12,
t.postMessage({N:12,H:u.Hn})},function(n,t){var e,i,f,l,c=n.i;if(u.set_cKey(0),null!=n.u)i=n.t,l=n.u,
l=(f=(e=n.m)>=40&&e<=64)?o.Me(l,true):l,l=u.P(l,f?1048576:524288),d.replaceCmdOptions({url:l,newtab:null!=i?!!i:!f,
keyword:n.o.k}),j(n.f),u.set_cRepeat(1);else{if(true!==n.r)return
;if(null==u.get_cOptions()||"omni"!==u.get_cOptions().k){if(c)return;u.set_cOptions(r.Pt()),u.set_cRepeat(1)
}else if(c&&u.get_cOptions().v===u.u.wt)return}u.set_cPort(t),p.showVomnibar(c)},function(n,t){
f.isNotVomnibarPage(t,false)||u.x._u(n.q,n,w.bind(t,0|n.i))},function(n,t){
var e,i=n.u||n.s,l=null!=n.s&&n.m||0,c=n.e,a=l>=40&&l<=64&&(!c||false!==c.r)
;if(n.d)if("string"!=typeof i)for(e=i.length;0<=--e;)a&&(i[e]=o.Me(i[e]+"")),i[e]=r.jt(i[e]+"");else a&&(i=o.Me(i)),
i=r.jt(i);else"string"==typeof i&&i.length<4&&i.trim()&&" "===i[0]&&(i="");i=i&&u.I(i,n.j,c),u.set_cPort(t),
i=n.s&&"object"==typeof n.s?"[".concat(n.s.length,"] ")+n.s.slice(-1)[0]:i,
f.showHUD(n.d?i.replace(/%[0-7][\dA-Fa-f]/g,decodeURIComponent):i,n.u?14:15)},function(n,t){
var e,o,i,f,l,c,a=null!=t?t.s:null;null===a||4&a.fr||(a.fr|=4,(e=u.Vn.get(a.ur))&&(e.fr|=4)),i=1,
null!=(f=/^\d+|^-\d*/.exec(o=n.k))&&(o=o.slice((l=f[0]).length),i="-"!==l?parseInt(l,10)||1:-1),
(c=u._n.get(o))||(f=o.match(s.ra),i=1,c=u._n.get(o=f[f.length-1])),r.At(),c&&(36===c.ua&&c.da&&v.pr(c),n.e&&u.set_cEnv({
element:r.d(n.e)}),d.executeCommand(c,i,n.l,t,0,null))},d.waitAndRunKeyReq,function(n,t){switch(u.set_cPort(t),n.a){
case 1:return b.yr.Kr(n,t);case 0:return b.yr.xr(n,t);case 2:return b.yr.Qr(n.u);default:return}
},m.du,d.onConfirmResponse,function(n,t){
var r,o,i=n.t,l=n.s,c=n.u,s="history"===i&&null!=l?"session":i,d="tab"===s?s:s+" item",v=function(n){
Promise.resolve(a._r("sugs")).then(function(t){f.showHUD(a._r(n?"delSug":"notDelSug",[a.$r(t,s[0])||d]))})}
;u.set_cPort(f.findCPort(t)),
"tab"===s&&u.jn===l?f.showHUD(a._r("notRemoveCur")):"session"!==s?u.x.wu("tab"===s?l:c,s,v):(null===(r=e.se())||void 0===r?void 0:r.forgetClosedTab)&&(o=l,
e.se().forgetClosedTab(o[0],o[1]).then(function(){return 1},u.B).then(v))},p.openImgReq,function(n,t){u.set_cPort(null),
m.openJSUrl(n.u,{},function(){u.set_cPort(t),f.showHUD(a._r("jsFail"))})},function(n,t){var r
;2!==n.c&&4!==n.c?y(n,t,(null===(r=u.Vn.get(t.s.ur))||void 0===r?void 0:r.ar)||null,n.f):f.getParentFrame(t.s.ur,t.s.or,1).then(function(r){
var e;y(n,t,r||(null===(e=u.Vn.get(t.s.ur))||void 0===e?void 0:e.ar)||null,n.f)})},c.ii,function(n,t){
d.replaceCmdOptions({active:true,returnToViewport:true}),u.set_cPort(t),u.set_cRepeat(1),p.performFind()
},p.framesGoBack,function(){return a.br&&a.br(),a.kr},function(n,t){t.s.fr|=8},function(n,t){d.replaceCmdOptions({
mode:n.c?"caret":"",start:true}),j(n.f),u.set_cPort(t),u.set_cRepeat(1),p.enterVisualMode()},function(n){
if(performance.now()-n.r.n<500){var t=n.r.c;t.element=r.d(n.e),v.runKeyWithCond(t)}},function(n,t){
n.u=u.P(o.Me(n.u,true),1048576),e.downloadFile(n.u,n.f,n.r,n.m<42?function(r){r||u.an[23]({m:36,f:n.f,u:n.u},t)}:null)
},function(n,t,u){return setTimeout(function(){f.sendResponse(t,u,0)},n),t},function(n){var t=n.v,u=t!==!!t
;f.showHUD(a._r(u?"useVal":t?"turnOn":"turnOff",[n.k,u?JSON.stringify(t):""]))},function(n,t){
var r=t.s.ur,e=u.Vn.get(r>=0?r:u.jn);u.an[17](n,e?e.cr:null)},function(n,t,u){
return!(false!==t.s&&!t.s.Ce.startsWith(location.origin+"/"))&&(k(n.q,n.i,t).then(function(n){t.postMessage(u?{N:4,m:u,
r:n}:n)}),t)}]),w=function(n,t,e,o,i,l,c,a){var s,d,v,m,p,b=this.s.Ce,g=2===n?2:0
;if(1===n&&u.Fn>=58)if(b=b.slice(0,b.indexOf("/",b.indexOf("://")+3)+1),
null!=(m=-1!==_?null===(s=u.Vn.get(_))||void 0===s?void 0:s.ar:null)&&(m.s.Ce.startsWith(b)?g=1:_=-1),
g);else for(p of u.Vn.values())if((v=(d=p.ar)&&d.s)&&v.Ce.startsWith(b)){g=1,_=v.ur;break}f.safePost(this,{N:43,a:e,c:a,
i:g,l:t,m:o,r:c,s:i,t:l}),r.At()},y=function(n,t,r,e){r&&2!==r.s.Yn?r.postMessage({N:7,
H:e||4!==n.c?f.ensureInnerCSS(t.s):null,m:e?4:0,k:e?u.cKey:0,f:{},c:n.c,n:n.n||0,a:n.a}):(n.a.$forced=1,
d.portSendFgCmd(t,n.c,false,n.a,n.n||0))},j=function(n){n&&("string"==typeof n&&(n=v.parseEmbeddedOptions(n)),
n&&"object"==typeof n&&Object.assign(u.get_cOptions(),r.Lt(n)))},k=function(t,u,r){
return(g||(g=new Promise(function(t,u){n(["/background/page_handlers.js"],t,u)}).then(__importStar))).then(function(n){
return Promise.all(t.map(function(t){return n.onReq(t,r)}))}).then(function(n){return{i:u,a:n.map(function(n){
return void 0!==n?n:null})}})},"undefined"!=typeof window&&window&&(window.onPagesReq=function(n){return k(n.q,n.i,null)
})});