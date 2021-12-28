"use strict";"undefined"==typeof globalThis&&(window.globalThis=window),globalThis.__filename=null,(function(){
var n={},i=function(n){return n.slice(n.lastIndexOf("/")+1).replace(".js","")},o=function(n,i,o,u){
o.bind(null,t,u).apply(null,i.slice(2).map(e))},e=function(o){o=i(o);var e=n[o]
;return e?e instanceof Promise?e.__esModule||(e.__esModule={}):e:n[o]={}},t=function(o,e){
var u=o[0],r=i(u),c=n[r]||(n[r]=new Promise(function(n){var i=document.createElement("script");i.src=u,
i.onload=function(){n(),i.remove()},(document.body||document.documentElement).appendChild(i)}))
;c instanceof Promise?c.then(function(){t([u],e)}):e(c)};globalThis.define=function(e,t){
var u,r=i(__filename||document.currentScript.src),c=n[r];c&&c instanceof Promise?(u=c.then(function(){n[r]=c,o(0,e,t,c)
}),c=u.__esModule=c.__esModule||{},n[r]=u):o(0,e,t,c||(n[r]={}))},globalThis.__importStar=function(n){return n}})(),
![].includes&&Object.defineProperty(Array.prototype,"includes",{enumerable:false,value:function includes(n,i){
return this.indexOf(n,i)>=0}}),globalThis.__awaiter=function(n,i,o,e){return t=e,new Promise(function(n){
var i=n.bind(0,void 0),o=t(),e=function(t){var u=o.next(t);Promise.resolve(u.value).then(u.done?n:e,i)};e()});var t};