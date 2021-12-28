"use strict"
;__filename="background/frame_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./settings","./ports","./ui_css","./i18n","./key_mappings","./run_commands","./open_urls","./tools"],function(n,t,e,l,o,i,r,u,a,f,s,c,m,v){
var d,p,g,h,_;Object.defineProperty(t,"__esModule",{value:true
}),t.focusFrame=t.framesGoNext=t.toggleZoom=t.mainFrame=t.framesGoBack=t.openImgReq=t.captureTab=t.enterVisualMode=t.showVomnibar=t.initHelp=t.performFind=t.parentFrame=t.nextFrame=void 0,
l=__importStar(l),r=__importStar(r),d=function(){var n,l=e.cPort,o=-1,i=e.Vn.get(l.s.ur),r=i&&i.ao;if(r&&r.length>1){
for(o=r.indexOf(l),n=Math.abs(e.cRepeat);n>0;n--)(o+=e.cRepeat>0?1:-1)===r.length?o=0:o<0&&(o=r.length-1);l=r[o]}
t.focusFrame(l,0===l.s.or,l!==e.cPort&&i&&l!==i.cr?3:2,e.get_cOptions())},t.nextFrame=d,p=function(){
var n=e.cPort.s,l=n.ur>=0&&e.Vn.get(n.ur)?null:"Vimium C can not access frames in current tab";l&&u.showHUD(l),
u.getParentFrame(n.ur,n.or,e.cRepeat).then(function(n){n?t.focusFrame(n,true,4,e.get_cOptions()):t.mainFrame()})},
t.parentFrame=p,t.performFind=function(){
var n=e.cPort.s,t=e.cRepeat<0?-e.cRepeat:e.cRepeat,l=e.get_cOptions().index,o=l?"other"===l?t+1:"count"===l?t:l>=0?-1-(0|l):0:0,i=!!o||!e.get_cOptions().active,r=null
;32&n.fr||(n.fr|=32,r=a.ni(n)),c.sendFgCmd(1,true,c.wrapFallbackOptions({c:o>0?e.cRepeat/t:e.cRepeat,l:i,f:r,
m:!!e.get_cOptions().highlight,n:!!e.get_cOptions().normalize,r:true===e.get_cOptions().returnToViewport,
s:!o&&t<2&&!!e.get_cOptions().selected,p:!!e.get_cOptions().postOnEsc,e:!!e.get_cOptions().restart,
q:e.get_cOptions().query?e.get_cOptions().query+"":i||e.get_cOptions().last?v.wr.Xr(n.sr,"",o<0?-o:o):""}))},
t.initHelp=function(t,o){var i=e.Rn||[];return Promise.all([new Promise(function(t,l){n([e.u.HelpDialogJS],t,l)
}).then(__importStar),null!=i[0]?null:l.o("help_dialog.html"),null!=i[1]?null:f.getI18nJson("help_dialog"),null!=i[2]?null:f.getI18nJson("params.json")]).then(function(n){
var l,i,u=n[0],a=n[1],f=n[2],m=n[3],v=t.w&&(null===(l=e.Vn.get(o.s.ur))||void 0===l?void 0:l.ar)||o,d=v.s.Ce.startsWith(e.u.pt),p=t.a||{}
;v.s.fr|=64,e.set_cPort(v),i=e.Rn||e.$([null,null,null]),a&&(i[0]=a),f&&(i[1]=f),m&&(i[2]=m),c.sendFgCmd(17,true,{
h:u.nl(d,p.commandNames),o:e.u.pt,f:t.f,e:!!p.exitOnClick,c:d&&!!s.aa||r.Ze("showAdvancedCommands",true)})},null)},
t.showVomnibar=function(n){var t,o,i,r,u,a,f,s,m,v,d=e.cPort,p=e.get_cOptions().url
;if(null!=p&&true!==p&&"string"!=typeof p&&(p=null,delete e.get_cOptions().url),!d){
if(!(d=(null===(t=e.Vn.get(e.jn))||void 0===t?void 0:t.ar)||null))return;e.set_cPort(d)}
"bookmark"===e.get_cOptions().mode&&c.overrideOption("mode","bookm"),
i=d.s.Ce,r=!(o=e.Jn.vomnibarPage_f).startsWith(e.u.et),
u=i.startsWith(e.u.et),a=n||!o.startsWith(location.origin+"/")?e.u.wt:o,
f=(n=n||(r?u||o.startsWith("file:")&&!i.startsWith("file:///")||o.startsWith("http:")&&!/^http:/.test(i)&&!/^http:\/\/localhost[:/]/i.test(o):d.s.sr||u&&!o.startsWith(i.slice(0,i.indexOf("/",i.indexOf("://")+3)+1))))||o===a||d.s.ur<0,
s=e.get_cOptions().trailingSlash,m=e.get_cOptions().trailing_slash,v=c.copyCmdOptions(l.Lt({v:f?a:o,i:f?null:a,
t:f?0:r?2:1,s:null!=s?!!s:null!=m?!!m:null,j:f?"":e.u.vt,e:!!e.get_cOptions().exitOnClick,k:l.n(true)
}),e.get_cOptions()),c.portSendFgCmd(d,6,true,v,e.cRepeat),v.k="omni",e.set_cOptions(v)},t.enterVisualMode=function(){
var n,t,l,o,i,r,u;t="string"==typeof(n=e.get_cOptions().mode)?n.toLowerCase():"",o=null,i="",r=null,u=null,
16&~(l=e.cPort.s).fr&&(i=e.Bn,32&l.fr||(l.fr|=32,o=a.ni(l)),r=s.Vt,u=s.Wt,l.fr|=16),
c.sendFgCmd(5,true,c.wrapFallbackOptions({m:"caret"===t?3:"line"===t?2:1,f:o,g:u,k:r,t:!!e.get_cOptions().richText,
s:!!e.get_cOptions().start,w:i}))},t.captureTab=function(n,t){
var l=e.get_cOptions().show,i=false===e.get_cOptions().download,r=!!e.get_cOptions().png||false?0:Math.min(Math.max(0|e.get_cOptions().jpeg,0),100),u=n&&n[0],a=u?u.id:e.jn,f=u?u.windowId:e.Cn,s=u?u.title:""
;s="title"===e.get_cOptions().name||!s||a<0?s||""+a:a+"-"+s,s+=r>0?".jpg":".png",o.ve.captureVisibleTab(f,r>0?{
format:"jpeg",quality:r}:{format:"png"},function(n){var r,u,a;if(!n)return t(0),o.ae();r=function(n){
var r,f,c=i&&!l?null:"string"!=typeof n?URL.createObjectURL(n):n;if(c&&c.startsWith("blob:")&&(g&&(clearTimeout(g[0]),
URL.revokeObjectURL(g[1])),g=[setTimeout(function(){g&&URL.revokeObjectURL(g[1]),g=null},l?5e3:3e4),c]),l)return u(c),
void t(1);i||(f=e.cPort&&(null===(r=e.Vn.get(e.cPort.s.ur))||void 0===r?void 0:r.ar)||e.cPort,
o.downloadFile(c,s,f?f.s.Ce:null,function(n){n||a(c),t(n)}))},u=function(n){e.an[23]({o:"pixel=1&",u:n,f:s,a:false,m:36,
q:{r:e.get_cOptions().reuse,m:e.get_cOptions().replace,p:e.get_cOptions().position,w:e.get_cOptions().window}},e.cPort)
},a=function(n){var t=document.createElement("a");t.href=n,t.download=s,t.target="_blank",t.click()},
n.startsWith("data:")?fetch(n).then(function(n){return n.blob()}).then(r):r(n)})},t.openImgReq=function(n,t){
var o,r,a,s,v,d,p,g,h,_,w=n.u;if(/^<svg[\s>]/i.test(w)){
if(r=(new DOMParser).parseFromString(w,"image/svg+xml").firstElementChild)for(a of(r.removeAttribute("id"),
r.removeAttribute("class"),[].slice.call(r.querySelectorAll("script,use"))))a.remove()
;if(!r||!r.lastElementChild)return e.set_cPort(t),void u.showHUD(f._r("invalidImg"))
;r.setAttribute("xmlns","http://www.w3.org/2000/svg"),w="data:image/svg+xml,"+encodeURIComponent(r.outerHTML),
n.f=n.f||"SVG Image"}if(!l.zt(w))return e.set_cPort(t),void u.showHUD(f._r("invalidImg"));s=e.u.bt+"#!image ",
n.f&&(s+="download="+l.k(n.f)+"&"),false!==n.a&&(s+="auto=once&"),n.o&&(s+=n.o),d=(v=n.q||l.Pt()).k,
p=null!==(o=v.t)&&void 0!==o?o:!d,h=(g=v.s?e.P(w,32768,v.s):w)!==w,w=g,c.replaceCmdOptions({opener:true,
reuse:null!=v.r?v.r:16&n.m?-2:-1,replace:v.m,position:v.p,window:v.w}),e.set_cRepeat(1),
_=d||h?p?i.$e(w,d,2):i.he(w.trim().split(l.Tt),d,2):w,
m.openUrlWithActions("string"!=typeof _||!p||_.startsWith(location.protocol)&&!_.startsWith(location.origin+"/")?_:s+_,9)
},h=function(n,l,i){var r,a,s,v,d,p,g,h,_,w=!!o.ve.goBack
;if(!w&&(i?o.getTabUrl(i):(l.s.or?e.Vn.get(l.s.ur).ar:l).s.Ce).startsWith(e.u.et)&&true)return e.set_cPort(l),
u.showHUD(f._r("noTabHistory")),void c.runNextCmd(0);if(r=c.hasFallbackOptions(n.o)?(c.replaceCmdOptions(n.o),
c.getRunNextCmdBy(0)):o.ae,a=function(n,t){o.ve.executeScript(n.id,{code:"history.go(".concat(t,")"),
runAt:"document_start"},r)},s=i?i.id:l.s.ur,v=n.s,d=m.parseReuse(n.o.reuse||0))p=n.o.position,
o.ve.duplicate(s,function(e){var l,i,u;if(!e)return r()
;-2===d&&o.selectTab(s),w?((l=c.parseFallbackOptions(n.o)||{}).reuse=0,t.framesGoBack({s:v,o:l},null,e)):a(e,v),
i=e.index--,null!=(u="end"===p?3e4:m.newTabIndex(e,p,false,true))&&u!==i&&o.ve.move(e.id,{index:u},o.ae)
});else if(g=v>0?o.ve.goForward:o.ve.goBack,w||g)for(h=0,_=v>0?v:-v;h<_;h++)g(s,h?o.ae:r);else a(i,v)},t.framesGoBack=h,
_=function(){var n=e.Vn.get(e.cPort?e.cPort.s.ur:e.jn),l=n&&n.ar
;l&&l===n.cr&&e.get_cOptions().$else&&"string"==typeof e.get_cOptions().$else?c.runNextCmd(0):l&&t.focusFrame(l,true,l===n.cr?2:4,e.get_cOptions())
},t.mainFrame=_,t.toggleZoom=function(n){o.te(o.ve.getZoom).then(function(t){var l,i,r,u,a,f,s,c,m,v,d;if(t){
if(l=e.cRepeat<-4?-e.cRepeat:e.cRepeat,(e.get_cOptions().in||e.get_cOptions().out)&&(l=0,
e.set_cRepeat(e.get_cOptions().in?e.cRepeat:-e.cRepeat)),r=e.get_cOptions().level,u=Math,
e.get_cOptions().reset)i=1;else if(null!=r&&!isNaN(+r)||l>4)a=u.max(.1,u.min(0|e.get_cOptions().min||.25,.9)),
f=u.max(1.1,u.min(0|e.get_cOptions().min||5,100)),i=null==r||isNaN(+r)?l>1e3?1:l/(l>49?100:10):1+r*e.cRepeat,
i=u.max(a,u.min(i,f));else{for(s=0,c=9,m=[.25,1/3,.5,2/3,.75,.8,.9,1,1.1,1.25,1.5,1.75,2,2.5,3,4,5],v=0,
d=0;v<m.length&&(d=Math.abs(m[v]-t))<c;v++)s=v,c=d;i=m[s+e.cRepeat<0?0:u.min(s+e.cRepeat,m.length-1)]}
Math.abs(i-t)>.005?o.ve.setZoom(i,o.ue(n)):n(0)}else n(0)})},t.framesGoNext=function(n,t){
var l,o,i,r,u=e.get_cOptions().patterns,a=false;if(u&&u instanceof Array||(u=(u=u&&"string"==typeof u?u:(a=true,
n?e.Jn.nextPatterns:e.Jn.previousPatterns)).split(",")),a||!e.get_cOptions().$fmt){for(o of(l=[],
u))if((o=o&&(o+"").trim())&&l.push(".#[".includes(o[0])?o:o.toLowerCase()),200===l.length)break;u=l,
a||(c.overrideOption("patterns",u),c.overrideOption("$fmt",1))}i=u.map(function(n){
return Math.max(n.length+12,4*n.length)}),r=Math.max.apply(Math,i),c.sendFgCmd(10,true,c.wrapFallbackOptions({
r:e.get_cOptions().noRel?"":t,n:n,exclude:e.get_cOptions().exclude,match:e.get_cOptions().match,
evenIf:e.get_cOptions().evenIf,p:u,l:i,m:r>0&&r<99?r:32}))},t.focusFrame=function(n,t,l,o){n.postMessage({N:7,
H:t?u.ensureInnerCSS(n.s):null,m:l,k:e.cKey,c:0,f:o&&c.parseFallbackOptions(o)||{}})}});