---
title: highlight.js高亮你的代码
date: 2018-03-06 16:46:02
tags:
- html
- css
- vue
- highligt.js
categories:
- newbie项目
comments: false
permalink:
---

# highlight代码高亮的使用

[各种highlight风格demo预览](https://highlightjs.org/static/demo/)

[官网usage教程](https://highlightjs.org/usage/)

## Getting Started

当然可以下载，然后引入,再[初始化](http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload)
一共3句话

```html
<!-- 这个是风格显示选择 -->
<link rel="stylesheet" href="/path/to/styles/default.css">
<!-- 这个是highlight本体 -->
<script src="/path/to/highlight.pack.js"></script>
<!-- Attaches highlighting to the page load event 不就是onload的时候执行渲染么，也就是说，在此之后改变document都不会在执行了-->
<script>hljs.initHighlightingOnLoad();</script>
```

不过当然推荐的是用CDN了，还是去bootCND上找了

在使用时，一定要将你要展示的代码包在`<pre><code></code></pre>`标签里！！！ 它会自动匹配语言进行高亮，如果没有高亮，可以进行手动匹配,加上class

```html
<pre><code class="html">...</code></pre>
```

[支持的语言列表](http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases)

如果不想要高亮了,**class选nohighlight**

```html
<pre><code class="nohighlight">...</code></pre>
```

## highlight API文档


## 一些问题注意

1. 如果你的代码里包含标签，记得将标签的"<"换成"&lt"，把">"换成"&gt"

2. 从接口中取出来的代码是不会在高亮的，这个问题不就是onload的时候执行渲染么，也就是说，在此之后改变document都不会在执行了。所以很显然这样并不能高亮从接口取会来的文档的代码。

**最终解决问题的方法**是接口返回使用highlight.js编译好的html，因为后端使用的是node，用marked就解决了这个问题。只需要在marked的配置中添加highlight项即可（要先`npm install highlight.js`）：

```javascript
//这里参数看不明白就看marked那篇
var marked = require('marked');
var highlight = require('highlight.js');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});
```

然后返回的文档已经添加了对应的class。

当然highlight: function(code, lang, callback)有三个参数可以展开介绍