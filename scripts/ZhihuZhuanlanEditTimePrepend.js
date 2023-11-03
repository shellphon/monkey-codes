// ==UserScript==
// @name         zhihu zhuanlan editTime prepend
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prepend the edit time after the title
// @author       Dont
// @match        https://zhuanlan.zhihu.com/p/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 注入脚本逻辑
   const time = document.querySelector('.ContentItem-time').innerText;
   const $time = document.createElement('p');
    $time.style = "color: red";
    $time.innerText = time;
   const $header = document.querySelector('.Post-Header');
    $header.prepend($time);
    const $titleImage = document.querySelector('.TitleImage');
    $titleImage.style.display = "none";
})();