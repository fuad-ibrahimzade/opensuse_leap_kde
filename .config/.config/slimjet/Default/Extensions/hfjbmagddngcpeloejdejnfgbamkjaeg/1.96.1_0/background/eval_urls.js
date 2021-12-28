"use strict"
;__filename="background/eval_urls.js",define(["require","exports","./store","./utils","./normalize_urls","./parse_urls","./ports","./exclusions","./i18n"],function(e,r,n,s,a,u,t,c,l){
var i,f,o,p;Object.defineProperty(r,"__esModule",{value:true}),c=__importStar(c),i=0,n.r(function(r,c,l){
var d,g,b,m,h,y,v,x,_;if(c|=0,"paste"===r?r+=" .":r.includes("%20")&&!r.includes(" ")&&(r=r.replace(/%20/g," ")),
c<0||!(r=r.trim())||(d=r.search(/[/ ]/))<=0||!/^[a-z][\da-z\-]*(?:\.[a-z][\da-z\-]*)*$/i.test(g=r.slice(0,d).toLowerCase())||/\.(?:css|html?|js)$/i.test(g))return null
;if(!(r=r.slice(d+1).trim()))return null;if(1===c)switch(g){case"sum":case"mul":
r=r.replace(/[\s+,\uff0b\uff0c]+/g,"sum"===g?" + ":" * "),g="e";break;case"avg":case"average":
b=r.split(/[\s+,\uff0b\uff0c]+/g),r="("+b.join(" + ")+") / "+b.length,g="e"}if(1===c)switch(g){case"e":case"exec":
case"eval":case"expr":case"calc":case"m":case"math":return new Promise(function(r,n){e(["/lib/math_parser.js"],r,n)
}).then(__importStar).then(f.bind(0,r));case"error":return[r,3]}else if(c>=2)switch(g){case"urls":return p(r);case"run":
return[["run",r],6];case"status":case"state":return c>=3&&o(r),[r,c>=3?4:7];case"url-copy":case"search-copy":
case"search.copy":case"copy-url":if((h=a.$e(r,null,1))instanceof Promise)return h.then(function(e){var r=e[0]||e[2]||""
;return r=r instanceof Array?r.join(" "):r,[r=n.I(r),1]})
;r=(h=5===a._e&&h instanceof Array?h[0]:h)instanceof Array?h.join(" "):h;case"cp":case"copy":case"clip":
return[r=n.I(r),1]}switch(g){case"cd":case"up":if(!(b=(r+"  ").split(" "))[2]){if(c<1)return null
;if("string"!=typeof(h=t.rr()))return h.then(function(e){var s=e&&n.S("cd "+r+" "+(r.includes(" ")?e:". "+e),c,l)
;return s?"string"==typeof s?[s,7]:s:[e?"fail in parsing":"No current tab found",3]});b[2]=h}return y="/"===(g=b[0])[0],
d=parseInt(g,10),d=isNaN(d)?"/"===g?1:y?g.replace(/(\.+)|./g,"$1").length+1:-g.replace(/\.(\.+)|./g,"$1").length||-1:d,
(v=u.He({u:b[2],p:d,t:null,f:1,a:"."!==b[1]?b[1]:""}))&&v.u||[v?v.e:"No upper path",3];case"parse":case"decode":
(g=r.split(" ",1)[0]).search(/\/|%2f/i)<0?r=r.slice(g.length+1).trimLeft():g="~",b=[r=s.yt(r)],r=a.$e(r),
4!==a._e&&(m=u.He({u:r}))?""===m.u?b=[g]:(b=m.u.split(" ")).unshift(g):b=b[0].split(s.Tt);break;case"sed":
case"substitute":case"sed-p":case"sed.p":case"sed2":return x=r.split(" ",1)[0],r=r.slice(x.length+1).trim(),
_="sed2"===g?r.split(" ",1)[0]:"",[r=(r=r.slice(_.length).trim())&&n.P(r,g.endsWith("p")?32768:0,_?{r:x,k:_
}:/^[@#$-]?[\w\x80-\ufffd]+$|^\.$/.test(x)?{r:null,k:x}:{r:x,k:null}),5];case"u":case"url":case"search":
b=s.yt(r,true).split(s.Tt);break;case"paste":if(c>0)return(h=n.V(r))instanceof Promise?h.then(function(e){
return[e?e.trim().replace(s.Tt," "):"",5]}):[h?h.trim().replace(s.Tt," "):"",5];default:return null}
return l?[b,2]:(d=i++)>12?null:12===d?a.he(b,"",0):d>0?a.he(b,"",c):(h=a.he(b,"",c),i=0,h)}),f=function(e,r){var n,s,u
;for(a.Se.test(e)&&(e=e.slice(1,-1)),
e=(e=(e=e.replace(/\uff0c/g," ")).replace(/deg\b/g,"\xb0").replace(/[\xb0']\s*\d+(\s*)(?=\)|$)/g,function(e,r){
return(e=e.trim())+("'"===e[0]?"''":"'")+r
}).replace(/([\u2070-\u2079\xb2\xb3\xb9]+)|[\xb0\uff0b\u2212\xd7\xf7]|''?/g,function(e,r){var n,s,a=""
;if(!r)return"\xb0"===e?"/180*PI+":(n="\uff0b\u2212\xd7\xf7".indexOf(e))>=0?"+-*/"[n]:"/".concat("''"===e?3600:60,"/180*PI+")
;for(s of e)a+=s<"\xba"?s>"\xb3"?1:s<"\xb3"?2:3:s.charCodeAt(0)-8304;return a&&"**"+a
}).replace(/([\d.])rad\b/g,"$1")).replace(/^=+|=+$/g,"").trim(),n=[].reduce.call(e,function(e,r){
return e+("("===r?1:")"===r?-1:0)},0);n<0;n++)e="("+e;for(;n-- >0;)e+=")";if(e){
for(;e&&"("===e[0]&&")"===e.slice(-1);)e=e.slice(1,-1).trim();e=e||"()"}if(s="",
(u=r.MathParser||globalThis.MathParser||{}).evaluate){try{s="function"==typeof(s=u.evaluate("()"!==e?e:"0"))?"":""+s
}catch(e){}u.clean(),u.errormsg&&(u.errormsg="")}return[s,0,e]},o=function(e){
var r,a,u,i,f,o,p,d,g,b,m,h,y,v,x,_,$,k,w=n.jn;if(!parseInt(e,10)||(w=parseInt(e,10),e=e.slice(e.search(/[/ ]/)+1)),
r=n.Vn.get(w||(w=n.jn))){for($ of(n.set_cPort(r.ar||r.cr),u=(a=e.search(/[/ ]/))>0?e.slice(a+1):"",e=e.toLowerCase(),
a>0&&(e=e.slice(0,a)),e.includes("-")&&e.endsWith("able")&&(e+="d"),u=((i=!!u&&/^silent/i.test(u))?u.slice(7):u).trim(),
f=0,o=function(e){console.log(e),f||t.showHUD(e),f=1},u.includes("%")&&/%[a-f0-9]{2}/i.test(u)&&(u=s.xt(u)),
u&&!u.startsWith("^ ")?(o('"vimium://status" only accepts a list of hooked keys'),
u=""):u&&(p=u.match(/<(?!<)(?:a-)?(?:c-)?(?:m-)?(?:s-)?(?:[a-z]\w+|[^\sA-Z])>|\S/g),
u=p?p.join(" ").replace(/<(\S+)>/g,"$1"):""),b=(g=n.cPort.s).Yn,m=c.lr?1===b?b:(d=c.ir(g.Ce,g))?1:null===d?0:2:0,
y=!!u&&"enable"===e,x={N:1,
p:2===(h="enable"===e?0:"disable"===e?2:"toggle-disabled"===e?2!==b?2===m?null:2:2===m?0:null:"toggle-enabled"===e?0!==b?0===m?null:0:0===m?2:null:"toggle-next"===e?1===b?0:0===b?2===m?null:2:2===m?0:null:"toggle"===e||"next"===e?0!==b?0:2:("reset"!==e&&o('Unknown status action: "'.concat(e,'", so reset')),
null))||y?u:null,f:v=null===h?0:2===h?3:1},_=v?h:0,r.tr=v?{Yn:_,er:x.p}:null,r.ao))k=$.s,
!v&&c.lr&&1!=(_=null===(d=x.p=c.ir(k.Ce,k))?0:d?1:2)&&k.Yn===_||(k.Yn=_,$.postMessage(x));_=r.cr.s.Yn,
i||f||Promise.resolve(l._r(0!==_||y?2===_?"fullyDisabled":"halfDisabled":"fullyEnabled")).then(function(e){
t.showHUD(l._r("newStat",[e]))}),n.Dn&&_!==b&&n.R(w,_)}},p=function(e){var r,s,u,t,c=e.indexOf(":")+1||e.indexOf(" ")+1
;if(c<=0)return["No search engines given",3]
;if((r=e.slice(0,c-1).split(e.lastIndexOf(" ",c-1)>=0?" ":"|").filter(function(e){return n.Jn.searchEngineMap.has(e)
})).length<=0)return["No valid search engines found",3];for(t of(s=e.slice(c).split(" "),u=["openUrls"],
r))u.push(a.he(s,t,0));return[u,6]}});