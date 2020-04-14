---
title: zsh相关目录
date: 2020-04-06 17:00:11
tags:
- shell
- zsh
categories:
- 终端教程
comments: false
permalink:
---

# zsh 相关目录

## 安装 oh-my-zsh

[通过 curl](https://github.com/ohmyzsh/ohmyzsh#via-curl)

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 自带 cheatsheet

[cheatsheet](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet)

## 修改主题和插件

在 `~/.zshrc` 中找到下面两个字段进行修改, 主题的话用 `ys` 好了, 插件的话如果在 `~/.oh-my-zsh/plugins` 中没有, 就要自己下载, 一般放到 `~/.oh-my-zsh/custom/plugins` 中, 例如 `zsh-autosuggestions` 使用的方法都一样, 在 `plugins` 中添加

```zshrc
plugins=(
  git
  bundler
  dotenv
  osx
  rake
  rbenv
  ruby
)

ZSH_THEME="ys"
```

zsh 自带的插件安装在 `~/.oh-my-zsh/plugins` 中

自定义的插件安装在 `~/.oh-my-zsh/custom/plugins` 中
[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

## 推荐插件

### 自带插件

- git: 使用各种 git 缩写
  - 可以去 `~/.oh-my-zsh/plugins/git/git.plugin.zsh` 文件中修改, 添加
- gitignore: 生成一个 `.gitignore` 文件模板
  - `gi list` 列出所有支持的模板
  - `gi [TEMPLATENAME]` 列出指定语言的模板
  - `gi [TEMPLATENAME] >> .gitignore` 写入
- autojump: 目录间快速跳转
  - 需要 `brew install autojump` 安装后, 再开启
  - 但这个也算是 ranger 的依赖了, 没有 autojump 好像可不能启动 ranger
- z: 也是目录间快速跳转, 但不需要额外安装别, 直接开启就可以使用(个人觉得比 autojump 好用)
  - d 是自带的, 可以配合**数字键**来跳转
- sublime: 打开 sublime 的快捷命令(用的不多)
  - st, st + 文件夹或文件名
  - stt === st . 打开当前文件夹, 类似 vscode 的. code
- vscode: 也有 vscode 的插件, 扩展简化了 `code` 命令
  - [command alias](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/vscode#common-aliases)
- sudo: 快速按两下 `esc` 可以把上次的命令加上 `sudo`, 再按两次就切回来
- tmux: 也是一些快捷键(但感觉没 git 的用处多)
- extract: 一键解压, tar, gz, zip, rar. 但压缩还要看 `tldr` 了
  - 一个 `x` 就好了
- rand-quote: 用 `quote` 随机一条名言吧
- themes: 这个好, 可以不用 `source` 就可以看 zsh 主题(推荐)
  - `lstheme` 列出所有主题
  - `theme` 随机一个主题 `theme [name]` 指定主题
- cp: 复制功能 `cpv`
- zsh_reload: 用 `src` 重载 zsh, 代替 source
- colored-man-pages: 给 `man` 加颜色, 还行吧, 和 `tldr` 一样

### 自定义插件

- zsh-autosuggestions: 会提示以前使用过的命令
  - 用 git 方式下载
- zsh-syntax-highlighting: 命令输入时语法高亮
  - 命令正确就变绿, 不对就红色
- git-open: 在终端里打开当前项目的远程仓库地址(好用啊)
  - git open \[remote\] \[branchName\] 默认打开 origin 库, 当前本地分支名, `git config open.default.remote upstream` 可以设置(但不用)
  - `git open -p` 打印要访问的 url, -h, -c, -i (帮助, commit 号, issue 号) -s 可以在 url 后自定义参数了
  - [查看 example](https://github.com/paulirish/git-open/blob/master/git-open.1.md#examples)

### 常用插件修改快捷键

## 参考
