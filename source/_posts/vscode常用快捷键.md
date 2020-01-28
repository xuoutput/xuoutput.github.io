---
title: vscode常用快捷键
date: 2018-01-27 13:29:05
tags:
- vscode
- 快捷键
categories:
- 前端
comments: false
permalink:
---

### vscode常用快捷键

按按键个数分
`ctrl+o` 单一
`ctrl+shift+o` 组合
`ctrl+k, ctrl+o` 依赖一个键
`ctrl+k, o`先依赖一个,再单个
`alt 鼠标` 键盘+鼠标点击
`ctrl 鼠标拖动` 键盘+ 鼠标拖动

按 ctrl+k ctrl+s 可以查看键盘快捷方式

jj {


    
}

## 其他操作

终端中使用命令 `code` 启动vscode,常用的就 `code .` 和 `code -n`

```bash
# open code with current directory **
code .

# open the current directory in the most recently used code window
code -r .

# create a new window **
code -n

# change the language
code --locale=es

# open diff editor
code --diff <file1> <file2>

# open file at specific line and column <file:line[:character]>
code --goto package.json:10:5

# see help options
code --help

# disable all extensions
code --disable-extensions .
```

## 参考

[Launching from the command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
