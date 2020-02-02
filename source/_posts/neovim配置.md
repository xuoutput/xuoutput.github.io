---
title: neovim配置
date: 2020-02-01 14:59:59
tags:
- neovim
categories:
- vim教程
comments: false
permalink:
---

# neovim配置

由于在`vim8.1` 的`~/.vimrc`中配置 `set relavivenumber` 出现bug, 重装也不行, 所有事实 `neovim`

## 安装

从github上下载[NVIM 0.4.3稳定版](https://github.com/neovim/neovim/releases)

然后都放到 `/usr/local/bin/` 中,在创建个软连接.

```bash
ln -s /usr/local/bin/nvim-osx64/bin/nvim /usr/local/bin/nvim
```

或者使用 `brew install neovim` (推荐)

## 配置

配置文件的目录是在 `~/.config/nvim/init.vim`, 



## 参考
