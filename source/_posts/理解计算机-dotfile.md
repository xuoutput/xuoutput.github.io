---
title: 理解计算机-dotfile
date: 2020-03-30 19:54:15
tags:
- dotfile
categories:
- os教程
comments: false
permalink:
---

# 理解计算机-dotfile

1.dotfiles 是什么？
就是点开头的文件配置, 例如`.vimrc`, `.zshrc`这种软甲配置文件, 每个人都会有自己的配置, 重装软件或者换电脑后, 使用这个配置就可以快速回到自己常用配置中

2.如何使用 dotfiles?
虽然一般放在`~/yourName` 下, 但也可以用一个例如 `~./config` 的文件夹来管理所有的, 但时候设置一个软连接就好了

3.进阶
既然都统一到了一个文件夹，那么，就可以通过 git，dropbox 来进行备份，分享，也可以 clone 下其他人的 dotfiles。

4.使用 ln 命令来同步
将 dotfile 都放在一个地方, 然后创建 ln 到原来的地方

5.写一个脚本

```bash
#!/bin/bash

BASEDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# vim
ln -s ${BASEDIR}/vimrc ~/.vimrc
ln -s ${BASEDIR}/vim/ ~/.vim

# zsh
ln -s ${BASEDIR}/zshrc ~/.zshrc

# git
ln -s ${BASEDIR}/gitconfig ~/.gitconfig
```

或用 [dotbot](https://github.com/anishathalye/dotbot)
stow 管理 dotfile

有些配置在另外的 rep 中, 所以用 [git subtree](https://www.atlassian.com/git/tutorials/git-subtree) 代理 submoudule

[dotdrop](https://github.com/deadc0de6/dotdrop)

## dotdrop

### 安装 作为 submodule

将 dotdrop 用作子模块可确保在您从任何地方克隆 dotfile git tree 的地方都附带有 dotdrop。

```git
As a submodule
The following will create a git repository for your dotfiles and keep dotdrop as a submodule:

## create the repository
$ g
$ git init

## install dotdrop as a submodule
$ git submodule add https://github.com/deadc0de6/dotdrop.git
$ pip3 install -r dotdrop/requirements.txt --user
$ ./dotdrop/bootstrap.sh

## use dotdrop
$ ./dotdrop.sh --help
```

> 若在 mac 上启动, 则需要安装 `brew install coreutils` 包含 `realpath`

配置下, 例如 `alias dotdrop='<absolute-path-to-dotdrop.sh> --cfg=<path-to-your-config.yaml>'`

在我的 mac 下就是 `alias dotdrop='~/dotfiles/dotdrop.sh --cfg=~/dotfiles/config.yaml'`

> 注意写完 alias 后不要执行哦

### 简单开始

使用命令导入就行 `dotdrop import [files or directories]` 管理

```bash
dotdrop import ~/.vimrc
```

> 加 -k --key 可以导入长名字, 默认是短的名字, `f_vimrc`

还能设置不同的 profile `-p --profile`, 如果不设置就是你的 `主机名`
例如我导入 `~/.vimrc` 后 `config.yaml` 变为

```yaml
───────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
       │ File: config.yaml
───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1   │ config:
   2   │   backup: true
   3   │   create: true
   4   │   dotpath: dotfiles
   5   │ dotfiles:
   6 + │   f_vimrc:
   7 + │     src: vimrc
   8 + │     dst: ~/.vimrc
   9   │ profiles:
  10 + │   your-hostNamer-MB0:
  11 + │     dotfiles:
  12 + │     - f_vimrc

```

Dotdrop 干了两件事:

- 复制相关 **dotfiles** 到 `dotpath` 目录下 (在 `config.yaml` 配置文件中, 默认是 `dotfiles` 文件夹下, src 就是)
- 在 `config.yaml` 中创建相关入口信息 (in `dotfiles` and in `profiles`)

接下来可以去另一台机器上, 如果你需要用来管理相关 `dotfiles`, clone 和启动库, 比较当前的本地的 `dotfiles` 与你存在 `dotdrop` 中 `profile` 中配置的 `dotfiles` 有什么不同

例如我们上面配置了一个叫 `your-hostNamer-MB0` 的 profile, 然后里面值加了一个关于 `vimrc` 相关的配置, 接下来我改动`~.vimrc`中一条命令后执行

> 一般我需要3个 `profile`, 一个 `home-MB`,  一个 `office-MB`, 一个 `devcloud-centos`

```bash
dotdrop compare --profile=your-hostNamer-MB0
```

可以看到有区别

```bash
$ ./dotdrop.sh compare --profile=your-hostNamer-MB0
     _       _      _
  __| | ___ | |_ __| |_ __ ___  _ __
 / _` |/ _ \| __/ _` | '__/ _ \| '_ |
 \__,_|\___/ \__\__,_|_|  \___/| .__/  v0.32.0
                               |_|

=> compare f_vimrc: diffing with "/Users/yourName/.vimrc"
--- /Users/yourName/.vimrc        2020-03-30 23:14:22.000000000 +0800
+++ /var/folders/z2/_nngzdj15ws8rv9cz4kh3sg80000gn/T/dotdrop-61c5j1ji/Users/yourName/.vimrc       2020-03-30 23:14:31.000000000 +0800
@@ -22,7 +22,7 @@
 " inoremap <Esc> <nop>  这个不要用, 会导致按方向键还是OAOB

 " Set <LEADER> as ,
-" let mapleader=","    // 这个是在新主机上的
+let mapleader=","      // 这个是原来存在dotdrop中的, 如果应用, 就用这条命令覆盖

 "==========================================================================
 " UI
```

当然配置在导入后 `config.yaml` 后 , 可以手动配置, 设置多个 profile, 方便自定义 `dotfiles`

```yaml

---
profiles:
  home:
    dotfiles:
      - f_vimrc
      - f_xinitrc
      - d_polybar
  office:
    dotfiles:
      - f_xinitrc
      - d_polybar
```

然后是这里高级配置点, 涉及模板了

```
…
{%@@ if profile == "home" @@%}
font0 = sans:size=10;0
{%@@ elif profile == "office" @@%}
font0 = sans:size=14;0
{%@@ endif @@%}
font1 = "Material Design Icons:style=Regular:size=14;0"
font2 = "unifont:size=6;0"
…
```

然后安装, 不确定就用 `compare` 一下, 这个是按 `hostname` 比较的, 可以用 `-p --profile` 指定 profile, 不然会服务 本地主机的 hostname 在你的 config.yaml 中比较

```bash
dotdrop install
```

```bash
$ ./dotdrop.sh install -p your-hostNamer-MB0
     _       _      _
  __| | ___ | |_ __| |_ __ ___  _ __
 / _` |/ _ \| __/ _` | '__/ _ \| '_ |
 \__,_|\___/ \__\__,_|_|  \___/| .__/  v0.32.0
                               |_|

Overwrite "/Users/yourName/.vimrc" [y/N] ? y
backup /Users/yourName/.vimrc to /Users/yourName/.vimrc.dotdropbak
        -> copied /Users/yourName/dotfiles/dotfiles/vimrc to /Users/yourName/.vimrc

1 dotfile(s) installed.


```

有时候你需要更新下 dotfile 了, 可以用, 当然你可以加 `-f --force`强制更新, 这里可以体验下使用`-k --key`, 不指定就是更新所有的 dotfiles, 也可以指定更新一个 profile

```bash
dotdrop update
```

看有哪些 Profiles

```bash
dotdrop profiles

```

列出指定的 profile 配置了哪些 dotfiles, 用 `dotdrop detail`可以看具体不同, 细致到文件夹里面

```bash
dotdrop files --profile=<some-profile>
```

remove 就是删除

更新 dotdrop, 一般不用, 一些环境变量

## mac 和 linux

有些配置可以在mac上用, 有些不能, 需要单独再配一个 profile

## 参考

[dotfile](https://dotfiles.github.io/)
[使用 dotfiles 和 stow 管理你的 dotfiles 使用 dotfiles 和 stow 管理你的 dotfiles](https://blog.oyanglul.us/github/using-dotfiles-and-stow-to-manage-your-dotfiles)
[大家有什么独到的 dotfiles 管理方案吗](https://www.v2ex.com/t/591506)
