// ==UserScript==
// @name         wechat article for light
// @namespace    http://tampermonkey.net/
// @version      2024-04-11
// @description  try to take over the world!
// @author       You
// @match        https://mp.weixin.qq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=weixin.qq.com
// @grant        none
// ==/UserScript==
function change2Light(){
    document.querySelector('body').setAttribute('data-weui-theme', 'light');
    [].map.call(document.querySelectorAll('[class^="js_darkmode__"]'), $dom=>{
     const cls = $dom.classList.value.replace(/js_darkmode__/g, "r_js_darkmode__")
     $dom.classList = cls;
    })
  }
  function isDarkMode(){
   return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  (function() {
      'use strict';
      if(isDarkMode()){
          change2Light();
      }
  })();