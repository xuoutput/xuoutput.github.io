---
title: hexo基本使用
date: 2018-11-23 17:32:54
tags:
- hexo
categories:
- 前端教程
comments: false
permalink:
---

# hexo基本使用

## Hexo博客搭建之引用站内文章

在写文章的过程中，有时候需要引用站内的其他文章。可以通过内置的标签插件的语法post_link来实现引用。

```md
 {% post_link 文章文件名（不要后缀） 文章标题（可选） %}
 ```

举例 引用 Hello.md

```md
{% post_link Hello %}
```

或者

```md
{% post_link Hello 你好 %}
```
