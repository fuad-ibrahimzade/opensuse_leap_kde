"use strict"
;__filename="background/completion_utils.js",define(["require","exports","./store","./browser","./utils","./settings","./normalize_urls","./tools","./browsing_data_manager"],function(n,r,t,e,u,o,i,f,a){
var l,c,s,_,v,m,h,d,b,p,w,g,x,M,T,k,y,E,R,S,I,K,P,j;Object.defineProperty(r,"__esModule",{value:true}),
r.Au=r.uf=r.sortBy0=r.shortenUrl=r.highlight=r.cutTitle=r.Hu=r.get2ndArg=r.ComputeRelevancy=r.ComputeRecency=r.ComputeWordRelevancy=r.Ru=r.Tu=r.Du=r.Yu=r.wi=r.qu=r.af=r.setupQueryTerms=r.set_tabsInNormal=r.Zu=r.tabsInNormal=void 0,
u=__importStar(u),o=__importStar(o),l=[0,0],r.tabsInNormal=c=null,s=null,_=0,v=[],p=0,r.Zu=w=3,g=function(n){
r.tabsInNormal=c=n},r.set_tabsInNormal=g,r.setupQueryTerms=function(n,r,t){m=n,h=r,b=false,d=t},r.af=function(n){p=n},
x=function(n){r.Zu=w=n},r.qu=x,r.wi={xu:null,Mu:null,Er:0,ho:0,_o:function(n){var e,u,o,i,f,a=null,l=0,c=m.join(" ")
;for(e=v,u=c?e.length:0;0<=--u;)if(e[u].wo||!n){
for(o=e[u].Xr,i=0,f=0;i<o.length&&f<m.length;f++)m[f].includes(o[i])&&i++;if(i>=o.length){a=e[u];break}}r.wi.xu=a,
a&&(t.An.t<200||!a.nt||a.nt.length>1e3)&&(l=performance.now())-a.qi<Math.max(300,1.3*t.An.t)?(r.wi.Mu=a,
a.Xr=m.slice(0)):!c||a&&c===a.Xr.join(" ")||!(c.length>4||/\w\S|[^\x00-\x80]/.test(c))?r.wi.Mu=null:(r.wi.Mu={
Xr:m.slice(0),wo:n,qi:l||performance.now(),nt:a&&a.nt,Wn:a&&a.Wn},v.push(r.wi.Mu),
r.wi.Er||(r.wi.Er=setInterval(r.wi.go,6e3)))},go:function(){
for(var n=v,t=-1,e=performance.now()-5983;++t<n.length&&n[t].qi<e;);++t<n.length?n.splice(0,t):(n.length=0,
clearInterval(r.wi.Er),r.wi.Er=0)},Qr:function(n){for(var r of v)n<2?r.nt=null:n<3?r.Wn=null:s=null},Yi:function(n){
s!==n&&(r.wi.ho&&(clearTimeout(r.wi.ho),r.wi.ho=0),s=n,n&&(r.wi.ho=setTimeout(r.wi.Yi,3e3,null)))}},r.Yu={xo:0,lo:0,
Xu:function(){var n=m[0],e=t.Jn.searchKeywords;return null==e?(r.Yu.lo=r.Yu.lo||setTimeout(r.Yu.Mo,67),
true):!(n.length>=r.Yu.xo)&&e.includes("\n"+n)},Mo:function(){
var n,e,i,f=u.Ot(t.Jn.searchEngineMap).sort(),a=0,l="",c=[]
;for(n=f.length;0<=--n;)l.startsWith(e=f[n])||(a=(i=e.length)>a?i:a,l=e,c.push(e))
;o.Xe("searchKeywords","\n"+c.join("\n")),r.Yu.xo=a,r.Yu.lo=0}},r.Du={Bu:null,Eu:null,mf:null,cf:function(){
var n,t=r.Du.Bu=[]
;for(n of(r.Du.Eu=r.Du.mf=null,m))t.push(new RegExp(u.t(n),n!==n.toUpperCase()&&n.toLowerCase()===n?"i":""))},
Iu:function(){var n,t,e,u=r.Du.Eu=[],o=r.Du.mf=[];for(n of r.Du.Bu)t="\\b"+n.source,e=n.flags,u.push(new RegExp(t,e)),
o.push(new RegExp(t+"\\b",e))},vf:function(n){r.Du.Bu&&(r.Du.Bu[0]=new RegExp(u.t(n),r.Du.Bu[0].flags))}},
r.Tu=function(n,t){for(var e of r.Du.Bu)if(!(e.test(n)||e.test(t)))return false;return true},M=function(n,t){
var e,u,o,i=0,f=0,a=0,l=0,c=!!t;for(r.Du.Eu||r.Du.Iu(),e=0,u=m.length;e<u;e++)l+=(o=k(e,n))[0],a+=o[1],
c&&(f+=(o=k(e,t))[0],i+=o[1]);return l=l/w*T(a,n.length),0===i?t?l/2:l:l<(f=f/w*T(i,t.length))?f:(l+f)/2},r.Ru=M,
T=function(n,r){return n<r?n/r:r/n},k=function(n,t){var e,u=0;return(e=t.split(r.Du.Bu[n]).length)<1?l:(u=1,
r.Du.Eu[n].test(t)&&(u+=1,r.Du.mf[n].test(t)&&(u+=1)),[u,(e-1)*m[n].length])},y=function(n){return r.Ru(n.t,n.title)},
r.ComputeWordRelevancy=y,r.ComputeRecency=function(n){var r=(n-p)/18144e5
;return r<0?0:r<1?r*r*.666667:r<1.000165?.666446:0},E=function(n,t,e){var u=r.ComputeRecency(e),o=r.Ru(n,t)
;return u<=o?o:(o+u)/2},r.ComputeRelevancy=E,r.get2ndArg=function(n,r){return r},R=function(n){var t,e,u
;h||n.v||(n.v=r.uf(n.u)),
null==n.textSplit?(n.title=r.cutTitle(n.title),(e=i.pe(t=n.t)).length!==t.length?u=I(t,"\\"===e[0]?5:"/"===t.charAt(7)&&"%3a"===t.substr(9,3).toLowerCase()?10:8):(e=r.shortenUrl(t),
u=K(e)),
n.t=t.length!==n.u.length?e:"",n.textSplit=P(e,u,t.length-e.length,h?d-13-Math.min(n.title.length,40):d)):n.t===n.u&&(n.t="")
},r.Hu=R,S=function(n,t){var e=n.length>d+40;return e&&(n=u.$t(n,0,d+39)),r.highlight(e?n+"\u2026":n,t||K(n))},
r.cutTitle=S,r.highlight=function(n,r){var t,e,o,i,f;if(b)return n;if(0===r.length)return u.Ct(n);for(t="",e=0,
o=0;o<r.length;o+=2)f=r[o+1],(i=r[o])>=n.length||(t+=u.Ct(n.slice(e,i)),t+="<match>",t+=u.Ct(n.slice(i,f)),
t+="</match>",e=f);return t+u.Ct(n.slice(e))},r.shortenUrl=function(n){var r=u.v(n)
;return!r||r>=n.length?n:n.slice(r,n.length-+(n.endsWith("/")&&!n.endsWith("://")))},I=function(n,r){var t,e=K(n)
;for(t=0;t<e.length;)e[t+1]<=r?e.splice(t,2):(e[t]=Math.max(e[t]-r,0),e[t+1]-=r,t+=2);return e},K=function(n){
var t,e,u,o,i,f,a,l,c,s,_,v=[];for(t=0,e=m.length;t<e;t++)for(u=0,o=0,i=void 0,a=(f=n.split(r.Du.Bu[t])).length-1,
l=m[t].length;u<a;u++,o=i)i=(o+=f[u].length)+l,v.push([o,i]);if(0===v.length)return v;if(1===v.length)return v[0]
;for(v.sort(r.sortBy0),c=v[0],t=1,s=1,e=v.length;s<e;s++)c[t]>=(_=v[s])[0]?c[t]<_[1]&&(c[t]=_[1]):(c.push(_[0],_[1]),
t+=2);return c},r.sortBy0=function(n,r){return n[0]-r[0]},P=function(n,r,t,e){var o,i,f,a,l,c="",s=n.length,_=s,v=""
;if(s<=e||(t>1?_=n.indexOf("/")+1||s:(_=n.indexOf(":"))<0?_=s:u.Nt.test(n.slice(0,_+3).toLowerCase())?_=n.indexOf("/",_+4)+1||s:_+=22),
_<s&&r.length)for(o=r.length,i=s+8;(o-=2)>-4&&i>=_;i=o<0?0:r[o])if(f=o<0?_:r[o+1],(a=i-20-Math.max(f,_))>0&&(s-=a)<=e){
_=f+(e-s);break}for(s=0,o=0;s<e&&o<r.length;o+=2)(a=(i=r[o])-20-(l=Math.max(s,_)))>0?(e+=a,v=u.$t(n,s,l+11),
c+=b?v:u.Ct(v),c+="\u2026",v=u.Et(n,i-8,i),c+=b?v:u.Ct(v)):s<i&&(v=n.slice(s,i),c+=b?v:u.Ct(v)),v=n.slice(i,s=r[o+1]),
b?c+=v:(c+="<match>",c+=u.Ct(v),c+="</match>");return v=n.length<=e?n.slice(s):u.$t(n,s,e-1>s?e-1:s+10),
c+(b?v:u.Ct(v))+(n.length<=e?"":"\u2026")},r.uf=function(n){
for(var r=a.li.Ui&&n.startsWith("http")?a.li.Mi(n):-1,e=r<0?~r-1:r,u=e<0?[]:t.dn.nt,o=n.indexOf(":")+3,i=0,f=0,l="",c="",s=0,_=0;i<=e&&(o="/"===n[o]?o+1:n.indexOf("/",o+1)+(f?0:1))>0;f=o){
for(l=n.slice(f,o),_=e;i<=_;)if((c=u[s=i+_>>>1].u.slice(f))>l)_=s-1;else{if(c===l)return f?u[s].u:"";i=s+1}
if(i<=e&&f&&"/"===(l=u[i].u)[o]&&l.length<=++o)return l}return""},j=function(n,u,o,i,f){var a,l,v=t.Mn
;null===c&&(v=1!==v?v:t.Fn>51||t.u.lt||s?t.un(0):1),1!==v||2048&u?(r.tabsInNormal=c=2!==v&&!(2048&u),
_!==(a=(c?2:0)|(n?1:0))&&(s=null,
_=a),(f=f||s)?o(i,f):(l=o.bind(null,i),n?(512&u?e.getCurTabs:e.fe)(l):e.ve.query({},l))):e.getCurWnd(n,function(e){
t.un(e.incognito?2:0),i.o||r.Au(n,u,o,i,n?e.tabs:null)})},r.Au=j,f.mr.mo=function(){
s&&(1&_||!(2&_)!=(2===t.Mn))&&r.wi.Yi(null)},setTimeout(function(){o.Ve("searchEngines",null)},80)});