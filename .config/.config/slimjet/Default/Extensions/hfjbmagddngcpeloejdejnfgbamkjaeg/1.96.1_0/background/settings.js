"use strict"
;__filename="background/settings.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports"],function(e,o,a,t,n,s,i,r){
var c,l,h,w;Object.defineProperty(o,"__esModule",{value:true
}),o.Le=o.Ge=o.Fe=o.Ne=o.Je=o.Ke=o.Ye=o.Qe=o.We=o.Ve=o.Xe=o.Ze=o.eo=void 0,o.eo=localStorage,c=null,l=function(e,t){
var n,s,i
;return e in a.Jn?a.Jn[e]:(n=o.Je[e],i=null==(s=o.eo.getItem(e))?n:"string"==typeof n?s:false===n||true===n?"true"===s:JSON.parse(s),
t&&(a.Jn[e]=i),i)},o.Ze=l,h=function(e,t){var n,s;if(a.Jn[e]=t,e in o.Fe||(t===(n=o.Je[e])?(o.eo.removeItem(e),
a.O(e,null)):(o.eo.setItem(e,"string"==typeof n?t:JSON.stringify(t)),a.O(e,t)),e in o.Le&&o.Ye(o.Le[e],t,a.En)),
s=o.Ke[e])return s(t,e)},o.Xe=h,o.Ve=function(e,a){return o.Ke[e](void 0!==a?a:o.Ze(e),e)},o.We=function(e){
if(6!==e.N)w(e);else if(null==e.d.length)w(e);else{var o=e.d;c?o=o.concat(c):t.c(w.bind(null,e)),c=o,e.d=null}},
w=function(e){var o,t,n;if(6===e.N&&!e.d){for(n of(o=c,t=e.d={},o))t[n]=a.En[n];c=null}r.oo(function(o){
for(var a of o.ao)a.postMessage(e)})},o.Qe=function(e){t.a(a.Pn.slice(0),function(o){
return a.Pn.includes(o)&&o.postMessage(e),1})},o.Ye=function(e,o,t){switch(e){case"c":case"n":
o=o.toLowerCase().toUpperCase();break;case"i":o=o===!!o?o:o>1||o>0&&!a.En.o;break;case"l":o=o===!!o?o?2:0:o;break
;case"d":o=o?" D":""}return t?t[e]=o:o},o.Ke={__proto__:null,extAllowList:function(e){var o,t,n,s=a.Nn
;if(s.forEach(function(e,o){false!==e&&s.delete(o)}),e)for(t=(o=e.split("\n")).length,
n=/^[\da-z_]/i;0<=--t;)(e=o[t].trim())&&n.test(e)&&s.set(e,true)},grabBackFocus:function(e){a.En.g=e},
newTabUrl:function(e){e=/^\/?pages\/[a-z]+.html\b/i.test(e)?n.me.runtime.getURL(e):n.oe(s.$e(e)),o.Xe("newTabUrl_f",e)},
searchEngines:function(){var e,t=a.Jn.searchEngineMap;t.clear(),"searchKeywords"in a.Jn&&o.Xe("searchKeywords",null),
e=i.je("~:"+o.Ze("searchUrl")+"\n"+o.Ze("searchEngines"),t),o.Xe("searchEngineRules",e)},searchUrl:function(e){
var t=a.Jn,n=t.searchEngineMap;if(e)i.je("~:"+e,n);else if(n.clear(),n.set("~",{De:"~",B:"",
Ce:o.Ze("searchUrl").split(" ",1)[0]}),t.searchEngineRules=[],o.Ze("newTabUrl_f",true))return;o.Ve("newTabUrl")},
mapModifier:function(e){o.Qe({N:47,d:{a:e}})},vomnibarPage:function(e){var t=o.eo.getItem("vomnibarPage_f")
;!t||e?((e=e?n.oe(e):o.Ze("vomnibarPage"))===o.Je.vomnibarPage?e=a.u.wt:e.startsWith("front/")?e=n.me.runtime.getURL(e):(e=s.$e(e),
e=s.we(e),e=a.Fn<50&&!e.startsWith(a.u.et)?a.u.wt:e.replace(":version","".concat(parseFloat(a.u.st)))),
o.Xe("vomnibarPage_f",e)):a.Jn.vomnibarPage_f=t}},o.Je={__proto__:null,allBrowserUrls:false,autoDarkMode:true,
autoReduceMotion:false,
clipSub:"p=^git@([^/:]+):=https://$1/=\np@^https://item\\.m\\.jd\\.com/product/(\\d+)\\.html\\b@https://item.jd.com/$1.html@",
exclusionListenHash:true,exclusionOnlyFirstMatch:false,exclusionRules:[{pattern:":https://mail.google.com/",passKeys:""
}],
extAllowList:"# modified versions of X New Tab and PDF Viewer,\n# NewTab Adapter, and Shortcuts Forwarding Tool\nhdnehngglnbnehkfcidabjckinphnief\nnacjakoppgmdcpemlfnfegmlhipddanj\ncglpcedifkgalfdklahhcchnjepcckfn\nclnalilglegcjmlgenoppklmfppddien\n# EdgeTranslate\nbocbaocobfecmglnmeaeppambideimao\nbfdogplmndidlpjfhoijckpakkdjkkil",
filterLinkHints:false,findModeRawQueryList:"",grabBackFocus:false,hideHud:false,ignoreCapsLock:0,ignoreKeyboardLayout:0,
innerCSS:"",keyboard:[560,33],keyMappings:"",linkHintCharacters:"sadjklewcmpgh",linkHintNumbers:"0123456789",
localeEncoding:"gbk",mapModifier:0,mouseReachable:true,newTabUrl:"",newTabUrl_f:"",
nextPatterns:"\u4e0b\u4e00\u5c01,\u4e0b\u9875,\u4e0b\u4e00\u9875,\u4e0b\u4e00\u7ae0,\u540e\u4e00\u9875,next,more,newer,>,\u203a,\u2192,\xbb,\u226b,>>",
omniBlockList:"",passEsc:"[aria-controls],[role=combobox],#kw.s_ipt",
previousPatterns:"\u4e0a\u4e00\u5c01,\u4e0a\u9875,\u4e0a\u4e00\u9875,\u4e0a\u4e00\u7ae0,\u524d\u4e00\u9875,prev,previous,back,older,<,\u2039,\u2190,\xab,\u226a,<<",
regexFindMode:false,scrollStepSize:100,
searchUrl:navigator.language.startsWith("zh")?"https://www.baidu.com/s?ie=utf-8&wd=%s \u767e\u5ea6":"https://www.google.com/search?q=%s Google",
searchEngines:navigator.language.startsWith("zh")?"b|ba|baidu|Baidu|\u767e\u5ea6: https://www.baidu.com/s?ie=utf-8&wd=%s \\\n  blank=https://www.baidu.com/ \u767e\u5ea6\nbi: https://cn.bing.com/search?q=$s\nbi|bing|Bing|\u5fc5\u5e94: https://www.bing.com/search?q=%s \\\n  blank=https://cn.bing.com/ \u5fc5\u5e94\ng|go|gg|google|Google|\u8c37\u6b4c: https://www.google.com/search?q=%s\\\n  www.google.com re=/^(?:\\.[a-z]{2,4})?\\/search\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://www.google.com/ Google\nbr|brave: https://search.brave.com/search?q=%s Brave\nd|dd|ddg|duckduckgo: https://duckduckgo.com/?q=%s DuckDuckGo\nec|ecosia: https://www.ecosia.org/search?q=%s Ecosia\nqw|qwant: https://www.qwant.com/?q=%s Qwant\nya|yd|yandex: https://yandex.com/search/?text=%s Yandex\nyh|yahoo: https://search.yahoo.com/search?p=%s Yahoo\n\nb.m|bm|map|b.map|bmap|\u5730\u56fe|\u767e\u5ea6\u5730\u56fe: \\\n  https://api.map.baidu.com/geocoder?output=html&address=%s&src=vimium-c\\\n  blank=https://map.baidu.com/\ngd|gaode|\u9ad8\u5fb7\u5730\u56fe: https://www.gaode.com/search?query=%s \\\n  blank=https://www.gaode.com\ng.m|gm|g.map|gmap: https://www.google.com/maps?q=%s \\\n  blank=https://www.google.com/maps \u8c37\u6b4c\u5730\u56fe\nbili|bilibili|bz|Bili: https://search.bilibili.com/all?keyword=%s \\\n  blank=https://www.bilibili.com/ \u54d4\u54e9\u54d4\u54e9\ny|yt: https://www.youtube.com/results?search_query=%s \\\n  blank=https://www.youtube.com/ YouTube\n\nw|wiki: https://www.wikipedia.org/w/index.php?search=%s Wikipedia\nb.x|b.xs|bx|bxs|bxueshu: https://xueshu.baidu.com/s?ie=utf-8&wd=%s \\\n  blank=https://xueshu.baidu.com/ \u767e\u5ea6\u5b66\u672f\ngs|g.s|gscholar|g.x|gx|gxs: https://scholar.google.com/scholar?q=$s \\\n  scholar.google.com re=/^(?:\\.[a-z]{2,4})?\\/scholar\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://scholar.google.com/ \u8c37\u6b4c\u5b66\u672f\n\nt|tb|taobao|ali|\u6dd8\u5b9d: https://s.taobao.com/search?ie=utf8&q=%s \\\n  blank=https://www.taobao.com/ \u6dd8\u5b9d\nj|jd|jingdong|\u4eac\u4e1c: https://search.jd.com/Search?enc=utf-8&keyword=%s\\\n  blank=https://jd.com/ \u4eac\u4e1c\naz|amazon: https://www.amazon.com/s/?field-keywords=%s \\\n  blank=https://www.amazon.com/ \u4e9a\u9a6c\u900a\n\nv.m|v\\:math: vimium://math\\ $S re= \u8ba1\u7b97\u5668\ngh|github: https://github.com/search?q=$s \\\n  blank=https://github.com/ GitHub \u4ed3\u5e93\nge|gitee: https://search.gitee.com/?type=repository&q=$s \\\n  blank=https://gitee.com/ Gitee \u4ed3\u5e93\njs\\:|Js: javascript:\\ $S; JavaScript":"bi: https://cn.bing.com/search?q=$s\nbi|bing: https://www.bing.com/search?q=%s \\\n  blank=https://www.bing.com/ Bing\nb|ba|baidu|\u767e\u5ea6: https://www.baidu.com/s?ie=utf-8&wd=%s \\\n  blank=https://www.baidu.com/ \u767e\u5ea6\ng|go|gg|google|Google: https://www.google.com/search?q=%s \\\n  www.google.com re=/^(?:\\.[a-z]{2,4})?\\/search\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://www.google.com/ Google\nbr|brave: https://search.brave.com/search?q=%s Brave\nd|dd|ddg|duckduckgo: https://duckduckgo.com/?q=%s DuckDuckGo\nec|ecosia: https://www.ecosia.org/search?q=%s Ecosia\nqw|qwant: https://www.qwant.com/?q=%s Qwant\nya|yd|yandex: https://yandex.com/search/?text=%s Yandex\nyh|yahoo: https://search.yahoo.com/search?p=%s Yahoo\n\ng.m|gm|g.map|gmap: https://www.google.com/maps?q=%s \\\n  blank=https://www.google.com/maps Google Maps\nb.m|bm|map|b.map|bmap|\u767e\u5ea6\u5730\u56fe: \\\n  https://api.map.baidu.com/geocoder?output=html&address=%s&src=vimium-c\ny|yt: https://www.youtube.com/results?search_query=%s \\\n  blank=https://www.youtube.com/ YouTube\nw|wiki: https://www.wikipedia.org/w/index.php?search=%s Wikipedia\ng.s|gs|gscholar: https://scholar.google.com/scholar?q=$s \\\n  scholar.google.com re=/^(?:\\.[a-z]{2,4})?\\/scholar\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://scholar.google.com/ Google Scholar\n\na|ae|ali|alie|aliexp: https://www.aliexpress.com/wholesale?SearchText=%s \\\n  blank=https://www.aliexpress.com/ AliExpress\nj|jd|jb|joy|joybuy: https://www.joybuy.com/search?keywords=%s \\\n  blank=https://www.joybuy.com/ Joybuy\naz|amazon: https://www.amazon.com/s/?field-keywords=%s \\\n  blank=https://www.amazon.com/ Amazon\n\nv.m|v\\:math: vimium://math\\ $S re= Calculate\ngh|github: https://github.com/search?q=$s \\\n  blank=https://github.com/ GitHub Repo\nge|gitee: https://search.gitee.com/?type=repository&q=$s \\\n  blank=https://gitee.com/ Gitee \u4ed3\u5e93\njs\\:|Js: javascript:\\ $S; JavaScript",
showActionIcon:true,showAdvancedCommands:true,showAdvancedOptions:true,showInIncognito:false,notifyUpdate:true,
smoothScroll:true,vomnibarOptions:{maxMatches:10,queryInterval:333,sizes:"77,3,44,0.8",styles:"mono-url",actions:""},
userDefinedCss:"",vimSync:null,vomnibarPage:"front/vomnibar.html",vomnibarPage_f:"",waitForEnter:true},o.Ne={
__proto__:null,extWhiteList:"extAllowList",phraseBlacklist:"omniBlockList"},o.Fe={__proto__:null,searchEngineMap:1,
searchEngineRules:1,searchKeywords:1},o.Ge=["showAdvancedCommands"],o.Le={__proto__:null,filterLinkHints:"f",
ignoreCapsLock:"i",ignoreKeyboardLayout:"l",mapModifier:"a",mouseReachable:"e",keyboard:"k",linkHintCharacters:"c",
linkHintNumbers:"n",passEsc:"p",regexFindMode:"r",smoothScroll:"s",scrollStepSize:"t",waitForEnter:"w"},
n.me.runtime.getPlatformInfo(function(e){
var t=e.os.toLowerCase(),s=n.me.runtime.PlatformOs,i=t===s.WIN?2:t===s.MAC?0:1,r=o.Ze("ignoreCapsLock");a.u.ht=t,
a.An.o=a.En.o=i,o.Ye("i",r,a.En),a.In>2||(a.L(1|a.In),a.kn&&a.kn())}),(function(){
var e,t,s,i=n.me.runtime.getManifest(),r=location.origin,c=r+"/",l=i.content_scripts[0].js,h=a.u,w=a.On,p=function(e){
return(47===e.charCodeAt(0)?r:e.startsWith(c)?"":c)+e};if(o.Je.newTabUrl=a.Kn?"edge://newtab":"chrome://newtab",
w.set("about:newtab",1),w.set("about:newtab/",1),w.set("chrome://newtab",1),w.set("chrome://newtab/",1),
a.Kn&&(w.set("edge://newtab",1),w.set("edge://newtab/",1)),w.set("chrome://new-tab-page",2),
w.set("chrome://new-tab-page/",2),a.Jn.searchEngineMap=new Map,h.gt=Object.keys(i.commands||{}).map(function(e){
return"quickNext"===e?"nextTab":e}),h.st=i.version,h._t=i.version_name||i.version,h.pt=p(i.options_page||h.pt),
h.ct=null!=i.permissions&&i.permissions.indexOf("clipboardRead")>=0,h.bt=p(h.bt),h.wt=p(o.Je.vomnibarPage),h.vt=p(h.Mt),
h.dt=i.homepage_url||h.dt,h.mt=p(h.mt),l.push("content/injected_end.js"),h.at=l.map(p),!(a.In>2)){
for(e in a.En.g=o.Ze("grabBackFocus"),o.Le)o.Ye(o.Le[e],o.Ze(e),a.En)
;for(t in o.Ne)null!=(s=o.eo.getItem(t))&&(o.Xe(o.Ne[t],s),o.eo.removeItem(t))}})(),a.In<3&&a.Tn&&a.Un.then(function(e){
if(e&&"install"===e.reason){var a=((navigator.userAgentData||navigator).platform||"").toLowerCase()
;(a.startsWith("mac")||a.startsWith("ip"))&&o.Xe("ignoreKeyboardLayout",1)}})});