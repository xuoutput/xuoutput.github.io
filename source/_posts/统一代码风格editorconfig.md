---
title: 统一代码风格editorconfig
date: 2018-11-23 16:33:15
tags:
- editorconfig
categories:
- 前端教程
comments: false
permalink:
---

# 统一代码风格[editorconfig](https://editorconfig.org/)

当多人共同开发一个项目的时候(尤其是开源的项目)，可能不同的人使用者不同的编辑器. 又或者一个人在开发不同的项目中又要遵循不同项目的规范(代码风格), 当然还有即使是同一个文件,在`html`和`css`中也存在不同的代码风格问题, 麻烦就出现了. 

当然可以用ESlint这个来对代码提交前进行一次检查, 我们常用的`yarn prettier`和`yarn tslint` 也算是一个优化代码风格,一个检查.

这里当然重点说的就是`editorconfig`来配置好, 从根本上解决问题. 其他的都是提交前的保险.

## 使用editorconfig

只需要2步:

1. 在项目根目录中创建一个`.editorconfig`的文件, 里面配置该项目的各种代码规范. 后面简单介绍如何配置.
2. 安装和你使用的编辑器对应的`editorconfig`插件(editorconfig的默认优先级要高于编辑器的, vscode暂时不是原生就存在,要安装插件`EditorConfig for Visual Studio Code`)

## editorconfig配置

`EditorConfig` 支持的常用的编码规范，如下

* charset：文件编码。一般选`utf-8`
* indent_style: 缩进类型。`space`和`tab`选一个
* indent_size: 缩进数量。一般选`4`
* insert_final_newline：是否在文件的最后插入一个空行。一般插入`true`
* end_of_line：换行符格式。说明见[Wiki：换行](https://zh.wikipedia.org/zh-cn/%E6%8F%9B%E8%A1%8C)。可选值, 一般选`lf`
* trim_trailing_whitespace：是否删除行尾的空格。可选值, 一般选`true`
  
[配置完整说明](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)

基本这点配置就行了, 配合`prettier`和`ESlint`一起用

一点简单的配置

```md
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# Python - https://www.python.org/
[*.py]
indent_style = space
indent_size = 4

# Shell script (bash) - https://www.gnu.org/software/bash/manual/bash.html
[*.sh]
indent_style = space
indent_size = 4

# .md 的文件
[*.md]
trim_trailing_whitespace = false

```

官网的一个配置例子

```md
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

[这里是其他一些大的项目中中editorconfig](https://github.com/editorconfig/editorconfig/wiki/Projects-Using-EditorConfig)

[官网](https://editorconfig.org/)