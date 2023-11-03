// ==UserScript==
// @name         QuickOutLink
// @namespace    dont
// @version      0.1
// @description  take the world easily!
// @author       You
// @match        https://link.juejin.cn/*
// @match        https://link.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        none
// ==/UserScript==

function getQueryObj() {
    const res = {};
    const query = window.location.search.substr(1);
    const params = query.split('&');
    params.forEach(str => {
     const i = str.indexOf('=');
     const key = str.substring(0, i);
     const val = str.substring(i+1);
     res[key] = val;
    });
    return res;
 }
 
 const commonJumpFn = (paramKey) => {
   const query = getQueryObj();
       //console.log(query)
       if(query.target){
           window.location.href = decodeURIComponent(query[paramKey]);
       }
 }
 
 const jumpMap = {
   'https://link.juejin.cn/': () => commonJumpFn('target'),
   'https://link.zhihu.com/': () => commonJumpFn('target'),
 };
 (function() {
     'use strict';
     const locUrl = window.location.href;
     Object.keys(jumpMap).forEach(key => {
      if(locUrl.indexOf(key)===0){
       jumpMap[key]()
      }
     })
 })();