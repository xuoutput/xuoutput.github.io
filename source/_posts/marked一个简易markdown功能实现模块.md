---
title: marked一个简易markdown功能实现模块
date: 2018-03-06 19:15:39
tags:
- vue
- marked
- markdown
categories:
- newbie项目
comments: false
permalink:
---
# marked模块-简易markdown功能实现

Markdown不是HTML，目前还不能被浏览器解析，所以我们需要Markdown的**解析器(不是编辑器,编辑器另选simplemde)**，把Markdown翻译成浏览器认识的HTML文档展示出来。Marked就是一个基于Nodejs的Markdown解析引擎！

[markdown.js简易手册](https://www.cnblogs.com/djtao/p/6224399.html)

## 安装

使用

```node
npm isntall marked --sava

或者用cdn
```

## 使用

使用就很简单了，直接用div或者textarea都行，id指明后用innerHTML插入

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
  <script src="/path/to/marked.min.js"></script> 
</head>
<body>
  <div id="content"></div>
  <script>
    document.getElementById('content').innerHTML =
      marked('# Marked in browser\n\nRendered by **marked**.');
  </script> 
</body>
</html>
```

## 详细说明marked()方法

```javascript
marked(markdownString [,options] [,callback])
```

`markdownString`是你渲染的内容，必须是字符串。
`options`是你渲染的设置——它是一个对象。当然，你用`marked.setOptions`也是不错的。
`callback`是回调函数。如果 `options` 参数没有定义，它就是第二个参数。

### 关于Options(详细解说，毕竟配合highlight.js一起用)

```javascript
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });//基本设置
```

当然首先highlight.js要引入

```html
<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

因为highlight.js不能渲染接口返回的代码，所以需要node中的marked配合options

```javascript
var rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD, //当然可以renderer: new marked.Renderer()
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
//要显示的markdown内容
var markdownString = '```js\n console.log("hello"); \n```';
//这是设置highlight.js的,当然也可以拿到前面的setOptions中
marked.setOptions({
    highlight: function (code) {    //这个code后还有2个参数lang,callback
    return hljs.highlightAuto(code).value;
    }
});
//这是在HTML中使用
document.getElementById('content').innerHTML = marked(markdownString);
```

所以以上有两点参数说明

####  highlight中 高亮的参数

完整的highlight方法包含三个参数：**code，lang和callback**

**code**——代码内容——是一个字符串。
**lang**——编程语言的种类——也是字符串。
 > 这个需要在highlight.registerLanguage中设置

**callback**就是回调函数。

#### renderer（渲染）

render存放的是一个对象，不声明时默认为`new Renderer()`。

**自定义渲染方式(这个略过吧)**
渲染选项允许你以自定义的方式渲染内容，并把之前的规则设置覆盖掉。——这是**比较底层**的方法了。

比如，我想渲染`# heading+`，但是默认的规则是：`<h1></h1>`，我想改为更为复杂的结构——

```javascript
var rendererMD = new marked.Renderer();
rendererMD.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return '<h' + level + '><a name="' +
            escapedText +
                '" class="anchor" href="#' +
                escapedText +
                '"><span class="header-link"></span></a>' +
                text + '</h' + level + '>';
}
//显示
console.log(marked('# heading+', { renderer: rendererMD }));
document.getElementById('content').innerHTML = marked('# heading+', { renderer: rendererMD });
```

渲染结果

```html
<h1>
  <a name="heading-" class="anchor" href="#heading-">
    <span class="header-link"></span>
  </a>
  heading+
</h1>
```

以上就用了heading的渲染。

**块级支持以下渲染**

* code(string code, string language)
* blockquote(string quote)
* html(string html)
* heading(string text, number level)
* hr()
* list(string body, boolean ordered)
* listitem(string text)
* paragraph(string text)
* table(string header, string body)
* tablerow(string content)
* tablecell(string content, object flags)

`flags` 拥有以下属性：

```javascript
{
    header: true || false,
    align: 'center' || 'left' || 'right'
}
```

**行级支持以下渲染**：

* strong(string text)
* em(string text)
* codespan(string code)
* br()
* del(string text)
* link(string href, string title, string text)
* image(string href, string title, string text)

#### 其它渲染参数(都是boolean)

**gfm**
它是一个布尔值，默认为true。
允许 GitHub标准的markdown.

**tables**
它是一个布尔值，默认为true。
支持**支持github表格语法**。该选项要求 gfm 为true。

**breaks**
它是一个布尔值，默认为false。
支持**github回车换行**。该选项要求 gfm 为true。

**pedantic**
它是一个布尔值，默认为false。
**尽可能地兼容 markdown.pl**的晦涩部分。不纠正原始模型任何的不良行为和错误。

**sanitize**
它是一个布尔值，默认为false。
对输出进行过滤（清理），将**忽略任何已经输入的html代码**（标签）

**smartLists**
它是一个布尔值，默认为false。
**使用比原生markdown更时髦的列表**。 旧的列表将可能被作为pedantic的处理内容过滤掉.

**smartypants**
它是一个布尔值，默认为false。
使用更为**时髦的标点**，比如在引用语法中加入破折号。

#### 使用lexer和parser

如果你想，还可以使用词法分析器。通过它可以追加规则：

```javascript
var tokens = marked.lexer('text');//把text解析为一个marked.js的内部对象
console.log(marked.parser(tokens));//又把这个对象转化为html字符串。（<p>text</p>）

var lexer = new marked.Lexer({sanitize: true});//放option信息
var tokens = lexer.lex('<h1>hello</h1>');//<p>&lt;h1&gt;hello&lt;/h1&gt;</p>
console.log(marked.parser(tokens));
console.log(lexer.rules);//打出正则信息
```


