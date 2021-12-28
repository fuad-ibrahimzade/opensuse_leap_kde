"use strict"
;__filename="background/key_mappings.js",define(["require","exports","./store","./utils","./settings","./exclusions"],function(e,t,n,a,o,i){
var r,c,s,l,u,d,m,p,b,v,k,g,T,f,w,h,y,L,H,_,M;Object.defineProperty(t,"__esModule",{value:true}),
t.Vt=t.Wt=t.Qt=t.Xt=t.Yt=t.ea=t.ta=t.na=t.aa=t.oa=t.ia=t.ra=void 0,a=__importStar(a),o=__importStar(o),
i=__importStar(i),t.ra=/<(?!<)(?:.-){0,4}.\w*?(?::i)?>|./g,t.oa=c,t.ia=s,l=true,t.aa=u=null,t.na=function(e){
return e.length>1?"<escape>"===e?"esc":e.slice(1,-1):e},d=function(e,n){
return e.length<=n?null:e.includes(" $",n)||e.includes(" =",n)?t.ta(e.slice(n+1),e.includes(" $if={",n)?0:1):e.slice(n+1)
},t.ta=function(e,t){var n,o,i,r=a.Pt(),c=0;for(n of e.split(" ")){if(o=n.indexOf("="),"$#/=_".includes(n[0])){
if(0===o||"__proto__"===n||"$"===n[0]&&!"$if=$key=$desc=$count=$then=$else=$retry=".includes(n.slice(0,o+1))){
(0===t||1===t)&&L("%s option key:",0===o?"Missing":"Unsupported",n);continue}if("#"===n[0]||n.startsWith("//"))break}
o<0?(r[n]=true,c=1):(i=n.slice(o+1),r[n=n.slice(0,o)]="number"==typeof t?2===t?i&&p(i):1:i&&m(i),c=1)}
return 1===c?1===t?e:r:null},m=function(e){try{return JSON.parse(e)}catch(e){}return e},p=function(e){var t
;return"false"!==e&&("null"===e?null:"true"===e||((e>="0"?e<":":"-"===e[0])?(t=parseFloat(e))+""===e?t:/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]\d+)?$/.test(e)?isNaN(t)?m(e):t:e:'{["'.includes(e[0])?m(e):e))
},b=function(e,n){var i,r,c,s,l,u,d,m=e.ca;if(void 0===n&&(n=t.Qt[e.sa]),i=n.length<4?null:a.Lt(n[3]),
"string"==typeof m&&(m=t.ta(m)),m){
if(("$count"in m||"count"in m)&&(1===n[2]?delete m.$count:m.$count=null!=m.$count?parseFloat(m.$count)||1:(parseFloat(m.count||1)||1)*(i&&i.$count||1),
delete m.count),m.$if){if(false===T(m))return false;delete m.$if}i&&a.Dt(m,i),2!==n[0]||n[1]||(c=(r=m).mode,s=r.m,
u=r.action,(d=(l=r.characters)&&o.Ye("c",l))?r.c=d:"c"in r&&delete r.c,null!=l&&delete r.characters,
"action"in r&&delete r.action,
"mode"in r&&delete r.mode,(c=null!=(c=u?_[u]:c&&"number"!=typeof c?_[c]:null)?c:Math.max(0,0|s))>33&&(c=65===c?r.url?64:c:38===c?r.url?null!=r.join?57:40:null!=r.join?55:c:c>79?c-16:c),
c!==s&&(r.m=c),c>63&&(e.la=1))}else m=i;return e.ca=m,true},t.ea=b,v=function(e,n,o){void 0===o&&(o=t.Qt[e]);var i={
ua:o[0],da:o[1],sa:e,ca:n||(o.length<4?null:a.Lt(o[3])),ma:null,la:o[2]};return n&&"object"==typeof n&&!t.ea(i,o)?null:i
},t.Yt=v,k=function(e){var n=e.ca;return"string"==typeof n&&(t.ea(e),n=e.ca),n},t.Xt=k,g=function(e,t){var n
;return e.length>t&&(n=e.indexOf(" $if={",t))>0&&!/ (#|\/\/)/.test(e.slice(t,n+2))},T=function(e){
var t=e&&"object"==typeof e&&e.$if
;return t&&"object"==typeof t?!(!(t.sys&&t.sys!==n.u.ht||!!t.before&&t.before.replace("v","")<=n.u.st)&&(!t.browser||1&t.browser)):null
},f=function(e){var o,i,m,p,b,v,k,f,h,y,_,M,x,U,I,V,$,N=0,C=0,F=new Map,S=new Map,O=null,B=false,P=a.Pt(),R="color:red"
;for(r=null,o=e.replace(/\\\\?\n/g,function(e){return 3===e.length?"\\\n":""
}).replace(/[\t ]+/g," ").split("\n");C<o.length&&(!o[C]||"#"===(i=o[C])[0]);C++)i&&"!"===i[1]&&"no-check"===(i=i.slice(2).trim())&&(B=true)
;if(l=!B,C>=o.length||"unmapAll"!==o[C]&&"unmapall"!==o[C])for(r=new Set,m=(f=H.split(" ")).length;0<m;)r.add(f[m-=2]),
F.set(f[m],t.Yt(f[m+1],null));else C++
;for(m=o.length;C<m;C++)if(!((h=o[C].trim())<"$"))switch(U=(_=(y=h.split(" ",3))[0]).length+(M=y.length>1?y[1]:"").length+(x=y.length>2?y[2]:"").length+2,
I=B,_){case"map":case"run":
V="run"===_&&!(x in t.Qt),p=void 0,B||(!M||M.length>8&&("__proto__"===M||M.includes("<__proto__>"))?L('Unsupported key sequence %c"%s"',R,M||'""','for "'.concat(x||"",'"')):!F.has(M)||r&&r.has(M)||g(h,U)?x?V||(p=t.Qt[x])?(b=M.charCodeAt(0))>47&&b<58||45===b?L('Invalid key: %c"%s"',R,M,"(the first char can not be '-' or number)"):I=true:L('Command %c"%s"',R,x,"doesn't exist!"):L((V?"Lacking target when running":"Lacking command when mapping")+' %c"%s"',R,M):L('Key %c"%s"',R,M,"has been mapped to",F.get(M).sa)),
I&&(v=V?t.Yt("runKey",d(' keys="'.concat(x.replace(/"/g,'\\"'),'"')+h.slice(U),0),void 0):t.Yt(x,d(h,U),p))&&(F.set(M,v),
r&&r.delete(M));break;case"unmapAll":case"unmapall":F=new Map,S=new Map,O=null,r=null,P=a.Pt(),N=0,
u&&L("All key mappings is unmapped, but there %s been %c%d error%s%c before this instruction",u.length>1?"have":"has",R,u.length,u.length>1?"s":"","color:auto")
;break;case"mapKey":case"mapkey":
B?i=t.na(M):!x||h.length>U&&!/^(#|\/\/|\$if=\{)/.test(h.slice(U).trimLeft())?L("mapKey: need %s source and target keys:",x?"only":"both",h):M.length>1&&!/^<(?!<[^:]|__proto__>)([acms]-){0,4}.\w*(:[a-z])?>$/.test(M)?L("mapKey: a source key should be a single key with an optional mode id:",h):x.length>1&&!/^<(?!<|__proto__>)([a-z]-){0,4}.\w*>$/.test(x)?L("mapKey: a target key should be a single key:",h):(i=t.na(M))in P&&P[i]!==t.na(x)&&!g(h,U)?L('The key %c"%s"',R,M,"has been mapped to another key:",P[i].length>1?"<".concat(P[i],">"):P[i]):I=true,
I&&false!==T(d(h,U))&&(P[i]=t.na(x),N++);break;case"shortcut":case"command":
B||(x?!(M.startsWith("userCustomized")&&M.length>14)&&n.u.gt.indexOf(M)<0?L('Shortcut %c"%s"',R,M,"is not a valid name"):S.has(M)&&!g(h,U-1-x.length)?L('Shortcut %c"%s"',R,M,"has been configured"):I=true:L("Lacking command name and options in shortcut:",h)),
I&&(k=d(h,U-1-x.length),false!==T(k)&&(i=w(S,M,k))&&L('Shortcut %c"%s"',R,M,i));break;case"env":
B||(x?"__proto__"===M?L('Unsupported env name %c"%s"',R,M):O&&O.has(M)&&!g(h,U-1-x.length)?L('The environment name %c"%s"',R,M,"has been used"):I=true:L("Lacking conditions in env declaration:",h)),
I&&(k=d(h,U-1-x.length),false!==T(k)&&(O||(O=new Map)).set(M,k));break;case"unmap":case"unmap!":
!M||x&&"#"!==x[0]?L("unmap: ".concat(x?"only ":"","needs one mapped key:"),h):F.has(M)?(r&&r.delete(M),
F.delete(M)):"unmap!"!==_&&L('Unmapping: %c"%s"',R,M,"has not been mapped");break;default:
L('Unknown mapping command: %c"%s"',R,_,"in",h)}
for($ of n.u.gt)$.startsWith("user")||S.has($)||(v=t.Yt($,null))&&S.set($,v);n.X(F),t.oa=c=S,t.ia=s=O,
n.Y(n.An.k=N>0?P:null)},w=function(e,n,a){var o,i=1,r=(a=a&&"string"==typeof a?t.ta(a):a)&&a.command||(i=0,
n.startsWith("user")?"":n),c=r?1:0;return c&&r in t.Qt&&(i&&delete a.command,(o=t.Yt(r,a))&&e.set(n,o),c=2),
c<1?'requires a "command" option':c>1?"":"gets an unknown command"},h=function(e){var t,n,a,o=0
;for(t in e)o|=(n=t.length)<2?(a=e[t]).length>1?20:t.toUpperCase()!==t&&a.toUpperCase()!==a?8:4:n>2&&":"===t[n-2]?"i"===t[n-1]?1:"n"===t[n-1]?32:2:e[t].length>1?20:4
;return o},y=function(e){
var o,c,s,d,m,p,b,v,k,g,T,w,y,H,_,x,U,I,V,$=a.Pt(),N=null!==e,C=t.na,F='Inactive key: %o with "%s"',S=null!==u
;for(N&&(n.Z(t.aa=u=null),f(e)),o=a.Ot(n._n),c=n.mn,s=N&&l,m=(d=r?o.filter(function(e){return!r.has(e)}):o).length,
p=r?d.concat(a.Ot(r)):o,N&&(b=o.join().includes(":i>")?64:0,n.W(c?h(c)|b:b)),v=10;0<=--v;)$[v]=1;for($["-"]=1,
k=0;k<p.length;k++)if(0!=(w=(T=(g=p[k]).match(/<(?!<)(?:.-){0,4}.\w*?(?::i)?>|./g)).length-1)){for(H=$,_=void 0,
x=0;(_=H[C(T[x])])&&x<w;)x++,H=_;if(null!=_&&(k>=m||0===_))k>=m?n._n.delete(g):s&&L(F,g,T.slice(0,x+1).join(""));else{
for(null!=_&&s&&L(F,_,g);x<w;)H=H[C(T[x++])]=a.Pt();H[C(T[w])]=0}}else{if((y=C(g))in $){if(k>=m){n._n.delete(g);continue
}s&&L(F,$[y],g)}$[y]=0}for(g in N&&(u?u.length>1?(console.group(u.length+" Errors in custom Key mappings:"),
u.map(function(e){return console.log.apply(console,e)
}),console.groupEnd()):console.log.apply(console,u[0]):S&&console.log("The new key mappings have no errors")),n.Z($),
r=null,U=i.St(),I=function(e){var t,n
;for(t in e)0!==(n=e[t])?I(n):(true===U||0!==$[t]||U&&t in U)&&!t.startsWith("v-")||delete e[t]},
$)0===(V=$[g])?g.startsWith("v-")&&delete $[g]:1!==V&&I(V);e&&M(e)},L=function(){
(u||(t.aa=u=[])).push([].slice.call(arguments,0))
},H="? showHelp <a-c> previousTab <a-s-c> nextTab d scrollPageDown <c-e> scrollDown f LinkHints.activate <f1> simBackspace <s-f1> switchFocus <f2> switchFocus <f8> enterVisualMode G scrollToBottom gf nextFrame gg scrollToTop gi focusInput gn toggleVomnibarStyle gs toggleViewSource gt nextTab gu goUp gF mainFrame gT previousTab gU goToRoot g0 firstTab g$ lastTab h scrollLeft H goBack i enterInsertMode j scrollDown J previousTab K nextTab k scrollUp l scrollRight L goForward <a-m> toggleMuteTab N performBackwardsFind n performFind <a-n> performAnotherFind o Vomnibar.activate <a-p> togglePinTab r reload R reloadGivenTab <a-r> reloadTab <a-s-r> reopenTab t createTab <a-t> createTab u scrollPageUp V enterVisualLineMode v enterVisualMode <a-v> nextTab W moveTabToNextWindow x removeTab X restoreTab yt duplicateTab yy copyCurrentUrl <c-y> scrollUp zH scrollToLeft zL scrollToRight / enterFindMode ` Marks.activate ^ visitPreviousTab [[ goPrevious ]] goNext << moveTabLeft >> moveTabRight b Vomnibar.activateBookmarks ge Vomnibar.activateUrl gE Vomnibar.activateUrlInNewTab m Marks.activateCreate p openCopiedUrlInCurrentTab yf LinkHints.activateCopyLinkUrl B Vomnibar.activateBookmarksInNewTab F LinkHints.activateOpenInNewTab O Vomnibar.activateInNewTab P openCopiedUrlInNewTab T Vomnibar.activateTabs <a-f> LinkHints.activateWithQueue",
t.Qt={__proto__:null,"LinkHints.activate":[2,0,0,{m:0}],"LinkHints.activateCopyLinkText":[2,0,0,{m:38}],
"LinkHints.activateCopyLinkUrl":[2,0,0,{m:40}],"LinkHints.activateDownloadImage":[2,0,0,{m:35}],
"LinkHints.activateDownloadLink":[2,0,0,{m:42}],"LinkHints.activateEdit":[2,0,1,{m:66}],
"LinkHints.activateFocus":[2,0,0,{m:34}],"LinkHints.activateHover":[2,0,0,{m:32}],"LinkHints.activateLeave":[2,0,0,{m:33
}],"LinkHints.activateMode":[2,0,0,{m:0}],"LinkHints.activateModeToCopyLinkText":[2,0,0,{m:38}],
"LinkHints.activateModeToCopyLinkUrl":[2,0,0,{m:40}],"LinkHints.activateModeToDownloadImage":[2,0,0,{m:35}],
"LinkHints.activateModeToDownloadLink":[2,0,0,{m:42}],"LinkHints.activateModeToEdit":[2,0,1,{m:66}],
"LinkHints.activateModeToFocus":[2,0,1,{m:34}],"LinkHints.activateModeToHover":[2,0,0,{m:32}],
"LinkHints.activateModeToLeave":[2,0,0,{m:33}],"LinkHints.activateModeToOpenImage":[2,0,0,{m:36}],
"LinkHints.activateModeToOpenIncognito":[2,0,0,{m:43}],"LinkHints.activateModeToOpenInNewForegroundTab":[2,0,0,{m:3}],
"LinkHints.activateModeToOpenInNewTab":[2,0,0,{m:2}],"LinkHints.activateModeToOpenVomnibar":[2,0,1,{m:65}],
"LinkHints.activateModeToSearchLinkText":[2,0,0,{m:37}],"LinkHints.activateModeToSelect":[2,0,0,{m:67}],
"LinkHints.activateModeToUnhover":[2,0,0,{m:33}],"LinkHints.activateModeWithQueue":[2,0,0,{m:18}],
"LinkHints.activateOpenImage":[2,0,0,{m:36}],"LinkHints.activateOpenIncognito":[2,0,0,{m:43}],
"LinkHints.activateOpenInNewForegroundTab":[2,0,0,{m:3}],"LinkHints.activateOpenInNewTab":[2,0,0,{m:2}],
"LinkHints.activateOpenVomnibar":[2,0,1,{m:65}],"LinkHints.activateSearchLinkText":[2,0,0,{m:37}],
"LinkHints.activateSelect":[2,0,0,{m:67}],"LinkHints.activateUnhover":[2,0,0,{m:33}],
"LinkHints.activateWithQueue":[2,0,0,{m:18}],"LinkHints.click":[2,0,0,{direct:true,m:0}],
"LinkHints.unhoverLast":[7,0,1,{u:true}],"Marks.activate":[3,0,0],"Marks.activateCreate":[3,0,0,{mode:"create"}],
"Marks.activateCreateMode":[3,0,0,{mode:"create"}],"Marks.activateGoto":[3,0,0],"Marks.activateGotoMode":[3,0,0],
"Marks.clearGlobal":[16,1,1],"Marks.clearLocal":[16,1,1,{local:true}],"Vomnibar.activate":[9,1,0],
"Vomnibar.activateBookmarks":[9,1,1,{mode:"bookm"}],"Vomnibar.activateBookmarksInNewTab":[9,1,1,{mode:"bookm",newtab:1
}],"Vomnibar.activateEditUrl":[9,1,0,{url:true}],"Vomnibar.activateEditUrlInNewTab":[9,1,0,{url:true,newtab:1}],
"Vomnibar.activateHistory":[9,1,1,{mode:"history"}],"Vomnibar.activateHistoryInNewTab":[9,1,1,{mode:"history",newtab:1
}],"Vomnibar.activateInNewTab":[9,1,0,{newtab:1}],"Vomnibar.activateTabs":[9,1,1,{mode:"tab",newtab:1}],
"Vomnibar.activateTabSelection":[9,1,1,{mode:"tab",newtab:1}],"Vomnibar.activateUrl":[9,1,0,{url:true}],
"Vomnibar.activateUrlInNewTab":[9,1,0,{url:true,newtab:1}],addBookmark:[11,1,0],autoCopy:[11,0,1,{copy:true}],
autoOpen:[11,0,1,{o:1}],blank:[0,1,0],clearCS:[14,1,1],clearContentSetting:[14,1,1],clearContentSettings:[14,1,1],
clearFindHistory:[15,1,1],closeDownloadBar:[47,1,1,{all:1}],closeOtherTabs:[33,1,1,{other:true}],
closeSomeOtherTabs:[33,1,0],closeTabsOnLeft:[33,1,0,{$count:-1e6}],closeTabsOnRight:[33,1,0,{$count:1e6}],
captureTab:[13,1,1],copyCurrentTitle:[17,1,1,{type:"title"}],copyCurrentUrl:[17,1,1],copyWindowInfo:[17,1,0,{
type:"window"}],createTab:[18,1,20],debugBackground:[29,1,1,{reuse:1,url:"chrome://extensions/?id=$id",id_mask:"$id",
url_mask:""}],discardTab:[19,1,0],dispatchEvent:[8,1,0],duplicateTab:[20,1,20],editText:[13,0,0],enableCSTemp:[40,1,0,{
incognito:true}],enableContentSettingTemp:[40,1,0,{incognito:true}],enterFindMode:[5,1,1,{active:true,selected:true}],
enterInsertMode:[2,1,1,{insert:true}],enterVisualLineMode:[10,1,1,{mode:"line"}],enterVisualMode:[10,1,1],
firstTab:[22,1,0,{absolute:true}],focusInput:[12,0,0],focusOrLaunch:[29,1,1,{reuse:1}],goBack:[0,0,0,{$count:-1}],
goForward:[0,0,0],goNext:[1,1,0,{sed:true}],goPrevious:[1,1,0,{sed:true,rel:"prev"}],goToRoot:[23,1,0,{}],goUp:[23,1,0,{
$count:-1,type:"frame"}],joinTabs:[24,1,0],lastTab:[22,1,0,{$count:-1,absolute:true}],mainFrame:[25,1,1],
moveTabLeft:[26,1,0,{$count:-1}],moveTabRight:[26,1,0],moveTabToIncognito:[27,1,1,{incognito:true}],
moveTabToNewWindow:[27,1,0],moveTabToNextWindow:[28,1,0],newTab:[18,1,20],nextFrame:[3,1,0],nextTab:[22,1,0],
openBookmark:[49,1,0],openCopiedUrlInCurrentTab:[29,1,1,{reuse:0,copied:true}],openCopiedUrlInNewTab:[29,1,20,{
copied:true}],openUrl:[29,1,20],parentFrame:[4,1,0],passNextKey:[9,0,0],performAnotherFind:[5,1,0,{index:"other"}],
performBackwardsFind:[5,1,0,{$count:-1}],performFind:[5,1,0],previousTab:[22,1,0,{$count:-1}],quickNext:[22,1,0],
reload:[0,0,1,{r:1}],reloadGivenTab:[30,1,0,{single:true}],reloadTab:[30,1,0],removeRightTab:[31,1,0],
removeTab:[32,1,0],reopenTab:[34,1,1],reset:[48,1,1],restoreGivenTab:[35,1,0,{one:true}],restoreTab:[35,1,25],
runKey:[36,1,0],scrollDown:[4,0,0],scrollFullPageDown:[4,0,0,{view:2}],scrollFullPageUp:[4,0,0,{dir:-1,view:2}],
scrollLeft:[4,0,0,{dir:-1,axis:"x"}],scrollPageDown:[4,0,0,{dir:.5,view:2}],scrollPageUp:[4,0,0,{dir:-.5,view:2}],
scrollPxDown:[4,0,0,{view:1}],scrollPxLeft:[4,0,0,{dir:-1,axis:"x",view:1}],scrollPxRight:[4,0,0,{axis:"x",view:1}],
scrollPxUp:[4,0,0,{dir:-1,view:1}],scrollRight:[4,0,0,{axis:"x"}],scrollSelect:[14,0,0],scrollTo:[4,0,0,{dest:"min"}],
scrollToBottom:[4,0,0,{dest:"max"}],scrollToLeft:[4,0,0,{axis:"x",dest:"min"}],scrollToRight:[4,0,0,{axis:"x",dest:"max"
}],scrollToTop:[4,0,0,{dest:"min"}],scrollUp:[4,0,0,{dir:-1}],searchAs:[11,0,1,{s:1,copied:true,selected:true}],
searchInAnother:[37,1,1],sendToExtension:[38,1,0],showHelp:[7,1,1],showHUD:[39,1,1],showTip:[39,1,1],
simBackspace:[12,0,1,{act:"backspace"}],simulateBackspace:[12,0,1,{act:"backspace"}],sortTabs:[24,1,0,{sort:"recency",
windows:"current"}],switchFocus:[12,0,1,{act:"switch"}],toggleCS:[40,1,0],toggleContentSetting:[40,1,0],
toggleLinkHintCharacters:[6,1,1,{key:"linkHintCharacters"}],toggleMuteTab:[41,1,1],togglePinTab:[42,1,0],
toggleStyle:[15,0,1],toggleSwitchTemp:[6,1,1],toggleViewSource:[43,1,1,{opener:true}],toggleReaderMode:[43,1,1,{
reader:true,reuse:0,opener:true}],toggleVomnibarStyle:[44,1,1,{style:"dark"}],visitPreviousTab:[46,1,0],wait:[0,1,0,{
wait:"count"}],zoom:[45,1,0],zoomIn:[45,1,0],zoomOut:[45,1,0,{$count:-1}],zoomReset:[45,1,0,{$count:9e4}]},_={
__proto__:null,newtab:2,queue:18,"cur-queue":16,"new-active":3,"newtab-active":3,hover:32,unhover:33,leave:33,focus:34,
"download-media":35,"download-image":35,image:36,"open-image":36,media:36,search:37,"search-text":37,copy:38,
"copy-text":38,"copy-list":55,"copy-url":40,"copy-url-list":57,download:42,incognito:43,"edit-url":64,edit:65,
"edit-text":65,input:66,"focus-input":66,editable:66,"focus-editable":66,visual:67},
t.Wt=["character","word","","lineboundary","line","sentence","paragraphboundary","paragraph","documentboundary"],t.Vt={
l:1,h:0,j:9,k:8,$:7,0:6,"}":15,"{":14,")":11,"(":10,w:5,W:5,e:3,b:2,B:2,G:17,g:{g:16},o:20,a:{w:21,s:25,p:26,"}":26},
y:31,Y:32,C:33,"c-s-c":36,p:34,P:35,n:47,N:46,f1:48,"a-f1":48,v:51,V:52,c:53,"/":55,"c-e":62,"c-y":61,"c-down":62,
"c-up":61},M=function(e){var t,n,a="",i="".concat("#").concat("!");if(!u&&l&&(a="".concat(i).concat("no-check","\n")),
a){n=(t=o.Ke).keyMappings,t.keyMappings=void 0;try{o.Xe("keyMappings",a+e)}catch(e){}t.keyMappings=n}},
1&n.In&&(y(o.Ze("keyMappings")),0===n.En.o&&(t.Vt["m-s-c"]=36)),o.Ke.keyMappings=function(e){var t,a,i,r,c=n.mn,s=n.pn
;y(e),t=JSON.stringify,a=n.mn,i=!!s&&t(n.pn)!==t(s),((r=c?!a||t(c)!==t(a):!!s&&!!a)||i)&&o.We({N:9,m:n.mn,t:n.sn,
k:i?n.pn:null}),r&&o.Qe({N:47,d:{k:n.mn}})}});