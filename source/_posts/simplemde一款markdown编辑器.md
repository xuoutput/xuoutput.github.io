---
title: simplemde一款markdown编辑器
date: 2018-03-06 21:27:23
tags:
- vue
- node
- simplemde
- markdown
categories:
- newbie项目
comments: false
permalink:
---

# [SimpleMDE](https://github.com/sparksuite/simplemde-markdown-editor) is a simple, embeddable, and beautiful JS markdown editor

**simplemde marked highlight.js 区别**
第一个是编辑器,第二个是解析器,第三个是语法高亮

## 安装

通过 npm

```javascript
npm install simplemde --sava
```

通过 jsDelivr.但这个更新会有延迟

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"
/>
<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
```

## 快速开始

```javascript
//这个会自动加载到页面上第一个textarea上,不建议这么做
<script>
var simplemde = new SimpleMDE();
</script>

// 应该用一个特殊的加了id的
<textarea id="MyID"> </textarea>

<script>
var simplemde = new SimpleMDE({
    element: document.getElementById("MyID")
});
</script>

```

## 获取/设置内容

```javascript
//get
simplemde.value();
//set
simplemde.value('This text will appear in the editor');
//这里当然是用来解析markdown后显示html,有个markdown函数,我们不用,用marked
```

## 配置参数

- autoDownloadFontAwesome: 默认是 undefined,可选 true/false 是否自动下载字体,图标.建议 false,因为速度会变慢.我们 npm 下载就好了
- autofocus: 默认 false, true/false, 自动聚焦到编辑器.
- autosave: 自动保存
  - enabled: 默认 false
  - delay: 默认延迟 10000 (10s). 延迟 10s 自动保存
  - uniqueId: 设置自动保存就一定要设置一个 id
- blockStyles: 自定义 bold code italic 怎么标记
  - bold \*\* or \_\_. Defaults to \*\*.
  - code \`\`\` or \~\~\~. Defaults to \`\`\`.
  - italic \* or \_. Defaults to \*.
- element: DOM 元素挂载点 默认就是页面中第一个 textarea 标签.建议修改掉,用 id=""指定
- forceSync: 前置同步. 默认 false.
- hideIcons: 要隐藏图标的一个数组
- indentWithTabs: 缩进用 tab 默认 true. 否则就是 space
- initialValue: 自定义一个初始值,不是 placeholder
- insertTexts: 自定义插入文本的行为,是一个有 2 个元素的数组. 第 1 个元素时鼠标或高亮前插入,第 2 个之后插入, For example, this is the default link value: ["[", "](http://)"].
  - horizontalRule
  - image
  - link
  - table
- lineWrapping: 自动换行. 默认 true.
- parsingConfig: 在编辑的时候对解析 markdown 的设置进行调整(不是预先写入)
  - allowAtxHeaderWithoutSpace: 如果是 true 就在对标题渲染的时候在#后面不会带一个空格. 默认 false.
  - strikethrough: false 的话不处理 GFM strikethrough 语法. 默认 true.
  - underscoresBreakWords: true 的话下划线当做分隔符,默认 false
- placeholder: 自定义 placeholder 显示
- previewRender: 自定义解析 markdown 到 html 的函数. 当用户预览的时候会加载
- promptURLs: true 的话, 会有 2 个 js 弹窗出现要求 link 或 img 的 url.默认 false.
- renderingConfig: 在预览的时候解析 markdown 的设置进行调整.(不是在编辑时)
  - singleLineBreaks: false 的话, 不会解析 GFM single line breaks. 默认 true.
  - codeSyntaxHighlighting: true 的话 将会对使用 highlight.js 的进行高亮. 默认 false. 使用这个功能的话你必须在你的页面上加载 highlight.js . For example, include the script and the CSS files like:
  ```javascript
  <script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css">
  ```
- shortcuts: 快捷键 默认有一张表.
- showIcons: 一组显示图标名字
- spellChecker: 拼写检查. 默认 true.
- status: 默认 true 显示状态栏
  - 当然这个也可以你定义
- styleSelectedText: false 的话, 从选择的行中移除 CodeMirror-selectedtext class . 默认 true.
- tabSize: 自定义 tab 大小. 默认 2.
- toolbar: false 的话, 隐藏工具栏. 默认是展示
- toolbarTips: false 的话, 关闭工具栏按钮提示. 默认 true.

```javascript
// Most options demonstrate the non-default behavior
var simplemde = new SimpleMDE({
  autofocus: true,
  autosave: {
    enabled: true,
    uniqueId: 'MyUniqueID',
    delay: 1000
  },
  blockStyles: {
    bold: '__',
    italic: '_'
  },
  element: document.getElementById('MyID'),
  forceSync: true,
  hideIcons: ['guide', 'heading'],
  indentWithTabs: false,
  initialValue: 'Hello world!',
  insertTexts: {
    horizontalRule: ['', '\n\n-----\n\n'],
    image: ['![](http://', ')'],
    link: ['[', '](http://)'],
    table: [
      '',
      '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n'
    ]
  },
  lineWrapping: false,
  parsingConfig: {
    allowAtxHeaderWithoutSpace: true,
    strikethrough: false,
    underscoresBreakWords: true
  },
  placeholder: 'Type here...',
  previewRender: function(plainText) {
    return customMarkdownParser(plainText); // Returns HTML from a custom parser
  },
  previewRender: function(plainText, preview) {
    // Async method
    setTimeout(function() {
      preview.innerHTML = customMarkdownParser(plainText);
    }, 250);

    return 'Loading...';
  },
  promptURLs: true,
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true
  },
  shortcuts: {
    drawTable: 'Cmd-Alt-T'
  },
  showIcons: ['code', 'table'],
  spellChecker: false,
  status: false,
  status: ['autosave', 'lines', 'words', 'cursor'], // Optional usage
  status: [
    'autosave',
    'lines',
    'words',
    'cursor',
    {
      className: 'keystrokes',
      defaultValue: function(el) {
        this.keystrokes = 0;
        el.innerHTML = '0 Keystrokes';
      },
      onUpdate: function(el) {
        el.innerHTML = ++this.keystrokes + ' Keystrokes';
      }
    }
  ], // Another optional usage, with a custom status bar item that counts keystrokes
  styleSelectedText: false,
  tabSize: 4,
  toolbar: false,
  toolbarTips: false
});
```

## 高度(2 种都可以,在 html 中或 css 中)

To change the minimum height (before it starts auto-growing):

```css
.CodeMirror,
.CodeMirror-scroll {
  min-height: 200px;
}
Or, you can keep the height static:

.CodeMirror {
  height: 300px;
}
```

## 事件绑定

[You can catch the following list of events:](https://codemirror.net/doc/manual.html#events)

```javascript
var simplemde = new SimpleMDE();
simplemde.codemirror.on('change', function() {
  console.log(simplemde.value());
});
```

## 从 textarea 中移除 simplemde

通过调用 toTextArea 方法. 注意这个也会清除自动保存,就是 textarea 内容重置了.

```javascript
var simplemde = new SimpleMDE();
...
simplemde.toTextArea();
simplemde = null;
```

## 一些常用方法

```javascript
var simplemde = new SimpleMDE();
simplemde.isPreviewActive(); // returns boolean
simplemde.isSideBySideActive(); // returns boolean
simplemde.isFullscreenActive(); // returns boolean
simplemde.clearAutosavedValue(); // no returned value
```

## How it works

SimpleMDE began as an improvement of lepture's Editor project, but has now taken on an identity of its own. It is bundled with CodeMirror and depends on Font Awesome.

**CodeMirror** is the _backbone_ of the project and parses much of the Markdown syntax as it's being written. This allows us to add styles to the Markdown that's being written. Additionally, a toolbar and status bar have been added to the top and bottom, respectively. Previews are rendered by Marked using GFM.
