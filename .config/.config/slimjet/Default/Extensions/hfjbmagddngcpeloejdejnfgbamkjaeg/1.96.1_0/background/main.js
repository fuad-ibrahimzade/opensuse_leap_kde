"use strict"
;__filename="background/main.js",define(["require","exports","./store","./utils","./browser","./settings","./ports","./key_mappings","./run_commands","./normalize_urls","./parse_urls","./exclusions","./ui_css","./eval_urls","./open_urls","./all_commands","./request_handlers","./tools"],function(n,o,t,e,r,i,u,s,a){
var c;Object.defineProperty(o,"__esModule",{value:true}),e=__importStar(e),i=__importStar(i),c=function(n){
var o,e=t.Vn.get(t.jn)
;"quickNext"===n&&(n="nextTab"),(o=s.oa)&&o.get(n)?null==e||4&e.fr||t.jn<0?a.executeShortcut(n,e):r.tabsGet(t.jn,function(o){
return a.executeShortcut(n,o&&"complete"===o.status?t.Vn.get(o.id):null),r.ae()}):o&&null!==o.get(n)&&(o.set(n,null),
console.log("Shortcut %o has not been configured.",n))},t.J(function(){3===t.In&&(t.pn||(i.Ve("keyMappings"),
0===t.En.o&&(s.Vt["m-s-c"]=36)),t.J(null),i.Ze("hideHud",true),i.Ze("nextPatterns",true),i.Ze("previousPatterns",true),
i.Ve("exclusionListenHash"),
i.Ve("autoDarkMode"),i.Ve("autoReduceMotion"),r.me.runtime.onConnect.addListener(function(n){
return u.OnConnect(n,0|n.name)}),r.me.runtime.onConnectExternal.addListener(function(n){var o,e=n.sender,r=n.name
;if(e&&u.isExtIdAllowed(e)&&r.startsWith("vimium-c.")&&(o=r.split("@")).length>1){
if(o[1]!==t.u.GitVer)return n.postMessage({N:2,t:1}),void n.disconnect();u.OnConnect(n,32|o[0].slice(9))
}else n.disconnect()}))
}),r.me.commands.onCommand.addListener(c),r.me.runtime.onMessageExternal.addListener(function(n,o,e){
if(u.isExtIdAllowed(o))if("string"!=typeof n){if("object"==typeof n&&n)switch(n.handler){case"shortcut":var r=n.shortcut
;r&&c(r+"");break;case"id":e({name:"Vimium C",host:location.host,shortcuts:true,injector:t.u.mt,version:t.u.st});break
;case 99:e({s:n.scripts?t.u.at:null,version:t.u.st,host:"",h:"@"+t.u.GitVer});break;case"command":
a.executeExternalCmd(n,o)}}else a.executeExternalCmd({command:n},o);else e(false)}),i.Ve("extAllowList"),
r.ve.onReplaced.addListener(function(n,o){var e,r=t.Vn.get(o);if(r)for(e of(t.Vn.delete(o),t.Vn.set(n,r),r.ao))e.s.ur=n
}),i.Ve("vomnibarOptions"),i.Ve("vomnibarPage",null),i.Ve("searchUrl",null),t.x._u=function(n,o,e){
setTimeout(function(){t.x._u(n,o,e)},210)},t.L(2|t.In),t.kn(),setTimeout(function(){setTimeout(function(){
new Promise(function(o,t){n(["/background/browsing_data_manager.js"],o,t)}).then(__importStar),
new Promise(function(o,t){n(["/background/completion_utils.js"],o,t)}).then(__importStar),new Promise(function(o,t){
n(["/background/completion.js"],o,t)}).then(__importStar)},400),new Promise(function(o,t){
n(["/background/others.js"],o,t)}).then(__importStar),r.me.extension.isAllowedIncognitoAccess(function(n){
t.u.lt=false===n})},200),globalThis.onunload=function(n){if(!n||n.isTrusted){for(var o of t.Pn)o.disconnect()
;t.Vn.forEach(function(n){for(var o of n.ao.slice(0))o.disconnect()})}
},globalThis.window||(globalThis.onclose=onunload),t.Fn<59||!e.m("\\p{L}","u",0)?e.o("words.txt").then(function(n){
t.T(n.replace(/[\n\r]/g,"").replace(/\\u(\w{4})/g,function(n,o){return String.fromCharCode(+("0x"+o))}))}):t.T("")});