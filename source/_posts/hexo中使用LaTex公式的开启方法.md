---
title: hexo中使用LaTex公式的开启方法
date: 2018-11-25 12:39:51
tags:
- markdown
- hexo
- kramed
- latex
- vscode
categories:
- 前端教程
comments: false
permalink:
---

# hexo中使用LaTex公式的开启方法

如果你的`hexo` 主题就是`next`的那么就不需要下面的3, 4步(因为`hexo`有`mathjax`的配置), 只需要**1, 2, 5, 6, 7, 8**
**第2步和第8步是注意点**

## 第一步: 安装Kramed

更换`hexo`的markdown渲染引擎为`hexo-renderer-kramed`, 用来支持`mathjax`公式输出

```json
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

在`hexo`的`package.json`中显示如下

![1](1.png)

## 第二步: 更改kramed文件配置(**重点, 不然实现不了行间**)

打开文件`/node_modules/hexo-renderer-kramed/lib/renderer.js`, 作如下更改:

```javascript
// Change inline math rule
function formatText(text) {
  // Fit kramed's rule: $$ + \1 + $$
  // return text.replace(/`\$(.*?)\$`/g, '$$$$$1$$$$');
  // 第67行直接返回text
  return text;
}
```

![2.png](2.png)

## 第三步: 停止使用`hexo-math` 并安装`mathjax`包

虽然在`package.json`中看不到`hexo-math` , 但还是要卸载

```node
npm uninstall hexo-math --save
npm install hexo-renderer-mathjax --save
```

![3.png](3.png)

## 第四步: 更新 `Mathjax` 的 配置文件

打开`/node_modules/hexo-renderer-mathjax/mathjax.html`
如图所示更改`<script>`为：只是改域名, 后面的config别变

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/config/TeX-AMS-MML_HTMLorMML.js"></script>
```

[最新的mathjax的cdn地址去这里搜索](https://cdnjs.com/libraries/mathjax)

![4.png](4.png)

## 第五步: 更改默认转义规则

因为`LaTeX`与`markdown`语法有语义冲突，所以 `hexo` 默认的转义规则会将一些字符进行转义，所以我们需要对默认的规则进行修改.
打开`/node_modules\kramed\lib\rules\inline.js`

改两个rule

```javascript
escape: /^\\([`*\[\]()#$+\-.!_>])/,
em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

![5.png](5.png)

## 第六步: 开启mathjax

打开`/themes/next`主题目录下的`_config.yml`文件
不同的主题不同的配置文件不同, 找你安装的主题是啥

我们需要在`_config.yml`文件 中开启 `Mathjax`,(不同的主题配置方法略微有区别)

![6.png](6.png)

## 第七步: 在`new` 一个文章的时候加上`mathjax: true`

![7.png](7.png)

## 第八步: 重新生成 `hexo clean`+ `hexo g`