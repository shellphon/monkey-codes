// ==UserScript==
// @name         TechnicalReadingTime
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to estimate how long to cost to read the technical post from juejin\wechatGroupEssay\zhihuZhuanlan\segmentfaultEssay
// @author       Dont
// @match        https://juejin.cn/post/*
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://segmentfault.com/a/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        none
// ==/UserScript==
function removeNode(node){
    const parent = node.parentNode;
    parent.removeChild(node);
}
const IMAGE_READ_TIME = 12;
function imageReadTime(size){
  return size>10? (2*IMAGE_READ_TIME-10+1)*10/2 + (size-10)*3
      : (2*IMAGE_READ_TIME-size+1)*size/2
}
function readAction($article){
    // 预估简单算法来自：https://zhuanlan.zhihu.com/p/36375802
    // 目前直接获取文本，未考虑代码段部分分开，代码比较多字符内容，以及英文字母按字符数算也不合理。
    // const wordSize = $article.innerText.length;
    const imgSize = $article.querySelectorAll('img').length;
    const $dup = $article.cloneNode(true);
    const $codes = $dup.querySelectorAll('pre');
    const codeSize = $codes.length;
    [].forEach.call($codes, ($) => {
        removeNode($)
    });
    const words = $dup.innerText;
    // 英文单词单独计数
    const wordsOfEnglish = words.match(/[a-z]+[\-\']?[a-z]*/ig);
    // 除英文单词外
    const wordStrOther = words.replace(/[a-z]+[\-\']?[a-z]*/ig,'').replace(/[,\."'\?\:\[\]\{\}\\\(\)!\s“‘·`。，]/g, '');
    const time = Math.ceil(wordStrOther.length/275 + wordsOfEnglish.length/200 + codeSize + imageReadTime(imgSize)/60);
    const wordSize = wordsOfEnglish.length + wordStrOther.length;
    const $p = document.createElement('p');
    $p.style = "color: red";
    $p.innerText = `预估阅读时间：${time}分钟 【字数：${wordSize} , 英文：${wordsOfEnglish.length}, 其他: ${wordStrOther.length}, 代码段: ${codeSize}, 图片：${imgSize}】`;
    $article.prepend($p);
}
(function() {
    'use strict';
    setTimeout(() => {
     if(location.host==='juejin.cn'){
         readAction(document.querySelector('.main-area.article-area'));
     }
     if(location.host==='mp.weixin.qq.com'){
         readAction(document.querySelector('.rich_media_content'));
     }
     if(location.host==='zhuanlan.zhihu.com'){
         readAction(document.querySelector('.Post-RichTextContainer'))
     }
     if(location.host==='segmentfault.com'){
         readAction(document.querySelector('.article.article-content'))
     }
    }, 3000)
})();