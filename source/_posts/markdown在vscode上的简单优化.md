---
title: markdown在vscode上的简单优化
date: 2018-11-23 17:22:02
tags:
- markdown
- vscode
categories:
- 前端教程
comments: false
permalink:
---

# markdown 在 vscode 上的简单优化

本文章只是简单介绍下在 vscode 上简单配置一些插件就可以体验更好的`markdown`

分 4 部分:

1. 用`Markdown All in One` 来设置快捷键
2. 用`Markdown Preview Enhanced` 来加强`cmd+k, v`的预览
3. 用 `markdownlint` 来 formatting 一致性,
4. {% post_link markdown常用语法 文章markdown常用语法 %}
5. **markdown 主题**
6. [进阶使用论文 latex 咯](https://zh.wikipedia.org/wiki/LaTeX)

## markdown All in One

### Keyboard Shortcuts

| Key                                              | Command                      |
| ------------------------------------------------ | ---------------------------- |
| <kbd>Ctrl</kbd> + <kbd>B</kbd>                   | Toggle bold                  |
| <kbd>Ctrl</kbd> + <kbd>I</kbd>                   | Toggle italic                |
| <kbd>Alt</kbd> + <kbd>S</kbd>                    | Toggle strikethrough         |
| <kbd>Alt</kbd> + <kbd>C</kbd>                    | Check/Uncheck task list item |
| <kbd>Ctl</kbd> + <kbd>Shift</kbd> + <kbd>]</kbd> | Toggle heading (uplevel)     |
| <kbd>Ctl</kbd> + <kbd>Shift</kbd> + <kbd>[</kbd> | Toggle heading (downlevel)   |
| <kbd>Ctl</kbd> + <kbd>M</kbd>                    | Toggle math environment      |

### Available Commands `cmd+shift+p`

- Markdown: Create Table of Contents 只用创建 TOC
- Markdown: Update Table of Contents

Use `<!-- omit in toc -->` to ignore specific heading in TOC

**注意点:**
list 的一定要写全了才能打上 x, 如`- [ ] 写好了` 空格别忘了
数学公式用别的`LATEX` [在线 latex 公式](https://www.codecogs.com/latex/eqneditor.php)

## [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/)

这个不仅可以用来当做预览的, 也可以有强大的快捷键

[Markdown 基本要素](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/markdown-basics)

不过快捷键暂时用不到,只是当做预览 pdf 用.

## markdownlint

用绿色的波浪线指出有格式错误, 按`cmd+.` 看详情.
可以也设置一些`rules`不生效

## latex

如果无法在`hexo`中使用`$`来写公式, 参看这个[使用 LaTex 添加公式到 Hexo 博客里](https://www.jianshu.com/p/68e6f82d88b7)

[YouTube 视频](https://www.youtube.com/watch?v=RcvSMu9uRfA&list=PLsaRQCHmdZTD3rcrmGsV-AqCfDWJuBDNd)

{% post_link latex常用语法 文章latex常用语法 %}
