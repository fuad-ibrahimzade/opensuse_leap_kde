"use strict"
;__filename="background/action_icon.js",define(["require","exports","./store","./utils","./settings","./i18n","./browser","./ports"],function(n,t,i,e,o,a,r,u){
var c,l,s;Object.defineProperty(t,"__esModule",{value:true}),t.ti=t.ei=void 0,e=__importStar(e),o=__importStar(o),
c=["icons/enabled.bin","icons/partial.bin","icons/disabled.bin"],t.ei=r.me.action||r.me.browserAction,s=function(n){
fetch(c[n]).then(function(n){return n.arrayBuffer()}).then(function(t){
var o,a,r,u=new Uint8ClampedArray(t),c=t.byteLength/5,s=0|Math.sqrt(c/4),f=s+s,b=e.Pt()
;for(b[s]=new ImageData(u.subarray(0,c),s,s),b[f]=new ImageData(u.subarray(c),f,f),i.xn[n]=b,o=l.get(n),l.delete(n),a=0,
r=o.length;a<r;a++)i.Vn.has(o[a])&&i.R(o[a],n,true)})},t.ti=function(){var n,t,e=o.Ze("showActionIcon")
;e!==!!i.xn&&(n=function(n){var t=n.cr.s;0!==t.Yn&&i.R(t.ur,e?t.Yn:0)},t=function(){return o.Ze("showActionIcon")===e},
e?(i.E([null,null,null]),l=new Map,u.oo(n,t)):setTimeout(function(){o.Ze("showActionIcon")||null==i.xn||(i.E(null),
l=null)},200))},i.M(function(n,e,o){var a,u,c;n<0||((a=i.xn[e])?(u=t.ei.setIcon,c={tabId:n,imageData:a},
o?u(c,r.ae):u(c)):l.has(e)?l.get(e).push(n):(setTimeout(s,0,e),l.set(e,[n])))})});