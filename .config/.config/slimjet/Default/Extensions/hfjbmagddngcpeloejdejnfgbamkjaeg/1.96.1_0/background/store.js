"use strict";__filename="background/store.js",define(["require","exports"],function(n,t){
var o,u,i,e,c,r,f,l,a,s,_,m,p,h,d,g,b,w,M,v,C,j,S,P,V,k,I,N,O,R,x,B,D,G,H,q,y,A,E,J,L,T,U,z,F,K
;Object.defineProperty(t,"__esModule",{value:true
}),t.u=t.i=t.e=t.r=t.f=t.p=t.h=t.b=t.w=t.M=t.C=t.j=t.S=t.P=t.V=t.I=t.N=t.O=t.R=t.getNextFakeTabId=t.x=t.B=t.D=t.G=t.H=t.q=t.y=t.A=t.E=t.J=t.L=t.T=t.U=t.z=t.F=t.K=t.Q=t.set_cEnv=t.get_cEnv=t.set_cRepeat=t.set_cPort=t.set_cOptions=t.get_cOptions=t.set_cKey=t.W=t.X=t.Y=t.Z=t.$=t.set_findBookmark=t.nn=t.tn=t.on=t.un=t.in=t.en=t.cn=t.rn=t.fn=t.ln=t.an=t.cRepeat=t.cPort=t.cKey=t.sn=t._n=t.mn=t.pn=t.findBookmark=t.hn=t.dn=t.gn=t.bn=t.wn=t.Mn=t.vn=t.Cn=t.jn=t.Sn=t.Pn=t.Vn=t.kn=t.In=t.Nn=t.On=t.Rn=t.xn=t.Bn=t.Dn=t.Gn=t.Hn=t.qn=t.yn=t.An=t.En=t.Jn=t.Ln=t.Tn=t.Un=t.zn=t.Fn=t.Kn=t.OnSafari=t.OnEdge=t.OnFirefox=t.OnChrome=t.Qn=void 0,
t.Qn=1,t.OnChrome=!0,t.OnFirefox=!!0,t.OnEdge=!!0,t.OnSafari=!!0,o=navigator.userAgentData,
t.Kn=o?!!o.brands.find(function(n){return n.brand.includes("Edge")||n.brand.includes("Microsoft")
}):matchMedia("(-ms-high-contrast)").matches,t.Fn=o?(u=o.brands.find(function(n){return n.brand.includes("Chromium")
}))?u.version:90:(K=navigator.userAgent.match(/\bChrom(?:e|ium)\/(\d+)/))?75==+K[1]&&matchMedia("(prefers-color-scheme)").matches?81:0|K[1]:998,
t.zn=999,t.Tn=localStorage.length<=0,t.Ln=false,t.Jn=Object.create(null),t.En={v:t.Fn,d:"",g:false,m:false,o:2},t.An={
v:t.Fn,a:0,c:"",l:"",k:null,o:2,n:0,s:"",t:0},t.yn=false,t.Dn=false,t.On=new Map,t.Nn=new Map,t.In=0,t.Vn=new Map,
t.Pn=[],t.Sn=new Map,t.jn=-1,t.Cn=-1,t.vn=-1,t.Mn=1,t.wn=null,t.bn=null;t.gn={Wn:[],Xn:[],Yn:0,Zn:0,$n:false},t.dn={
nt:null,tt:new Map,ot:0,ut:0,it:0},t.hn=new Map,t.pn=null,t.mn=null,t.sn=0,t.cKey=0,i=null,t.cPort=null,t.cRepeat=1,
e=null,c=function(n){t.jn=n},t.cn=c,r=function(n){t.Cn=n},t.en=r,f=function(n){t.vn=n},t.in=f,l=function(n){
return t.Mn=n},t.un=l,a=function(n){t.Sn=n},t.on=a,s=function(n){return t.wn=n},t.tn=s,_=function(n){return t.bn=n},
t.nn=_,m=function(n){t.findBookmark=n},t.set_findBookmark=m,p=function(n){return t.Rn=n},t.$=p,h=function(n){t.pn=n}
;t.Z=h,d=function(n){t.mn=n},t.Y=d,g=function(n){t._n=n},t.X=g,b=function(n){t.sn=n},t.W=b,w=function(n){t.cKey=n},
t.set_cKey=w,t.get_cOptions=function(){return i},t.set_cOptions=function(n){i=n},M=function(n){t.cPort=n},t.set_cPort=M,
v=function(n){t.cRepeat=n},t.set_cRepeat=v,t.get_cEnv=function(){return e},t.set_cEnv=function(n){e=n},C=function(n){
t.yn=n},t.Q=C,j=function(n){t.qn=n},t.K=j,S=function(n){t.Hn=n},t.F=S,P=function(n){t.Gn=n},t.z=P,V=function(n){t.Dn=n},
t.U=V,k=function(n){t.Bn=n},t.T=k,I=function(n){t.In=n},t.L=I,N=function(n){t.kn=n},t.J=N,O=function(n){t.xn=n},t.E=O,
R=function(n){t.Ln=n},t.A=R,x=function(n){t.an=n},t.y=x,B=function(n){t.ln=n},t.q=B,D=function(n){t.fn=n},t.H=D,
G=function(n){t.Un=n},t.G=G,H=function(n){t.rn=n},t.D=H,t.B=function(){},t.x={},q=-4,t.getNextFakeTabId=function(){
return q--},t.R=t.B,t.O=t.B,t.N=null;t.I=function(){return""},t.V=function(){return""},t.P=function(n){return n},
t.S=function(){return null},t.j=null,t.C=null,y=function(n){t.R=n},t.M=y,A=function(n){t.O=n},t.w=A,E=function(n){t.N=n
},t.b=E,J=function(n){t.I=n},t.h=J,L=function(n){t.V=n},t.p=L,T=function(n){t.P=n},t.f=T,U=function(n){t.S=n},t.r=U,
z=function(n){t.C=n},t.e=z,F=function(n){t.j=n},t.i=F,t.u={et:"chrome",ct:true,rt:0,
ft:t.Kn?/^https:\/\/(ntp|www)\.msn\.\w+\/(edge|spartan)\/ntp\b/:"chrome-search://local-ntp/local-ntp.html",lt:false,
at:null,st:"",_t:"",GitVer:"3a5b410",mt:"/lib/injector.js",HelpDialogJS:"/background/help_dialog.js",
pt:"pages/options.html",ht:"browser",dt:"https://github.com/gdh1995/vimium-c",gt:null,bt:"pages/show.html",wt:"",
Mt:"/front/vomnibar.js",vt:""}});