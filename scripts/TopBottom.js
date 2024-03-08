// ==UserScript==
// @name         TopBottom
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在页面悬浮两个按钮：上和下，点击上时返回到页面顶部，点击下时滚动到页面底部
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==
function addCommonStyle($dom, styles){
    Object.assign($dom.style, styles);
  }
  
  const Astyle = {
   width: '20px',
   height: '20px',
   cursor: 'pointer',
   'text-align': 'center',
   color: '#FF0033',
   position: 'fixed',
   'z-index': 9999,
  };
  
  (function() {
      'use strict';
  
      // 创建两个按钮
      var btnTop = document.createElement("div");
      btnTop.innerHTML = "↑";
      btnTop.title="回到顶部";
      addCommonStyle(btnTop, Astyle);
      btnTop.style.bottom = "80px";
      btnTop.style.right = "50px";
      btnTop.addEventListener("click", function() {
          window.scrollTo(0, 0);
      });
      document.body.appendChild(btnTop);
  
      var btnBottom = document.createElement("div");
      btnBottom.innerHTML = "↓";
      btnBottom.title="去到底部";
      addCommonStyle(btnBottom, Astyle);
      btnBottom.style.bottom = "50px";
      btnBottom.style.right = "50px";
      btnBottom.addEventListener("click", function() {
          window.scrollTo(0, document.body.scrollHeight);
      });
      document.body.appendChild(btnBottom);
  })();
  