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

# neovim 配置

## 安装

[安装 neovim 后](https://github.com/neovim/neovim/wiki/Installing-Neovim#homebrew-macos--linuxbrew-linux)

使用 brew 安装

```zsh
brew install neovim
```

或从 github 上下载[NVIM 0.4.3 稳定版](https://github.com/neovim/neovim/releases)

然后都放到 `/usr/local/bin/` 中,在创建个软连接.

```bash
ln -s /usr/local/bin/nvim-osx64/bin/nvim /usr/local/bin/nvim
```

## 配置

[配置环境变量](https://neovim.io/doc/user/starting.html#$XDG_CONFIG_HOME)

在你的`.zshrc`中增加两条

```zsh
# neovim 环境变量配置
export XDG_CONFIG_HOME="~/.config"
export XDG_DATA_HOME="~/.local/share"
```

配置文件的目录是在 `~/.config/nvim/init.vim`配置后环境变量之后, 同`$XDG_CONFIG_HOME/nvim/init.vim`

```bash
Nvim: stdpath("config") 就是 ~/.config/nvim
Nvim: stdpath("data")   ~/.local/share/nvim
```

[安装 vim-plug](https://github.com/junegunn/vim-plug#unix-1)

执行命令, 如果不行就直接下载`plug.vim` 放在`~/.local/share/nvim/site/autoload/`下(**推荐**)

```bash
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

而下载的组件都在`~/.local/share/nvim/plugged`下, 对于`vim` 是在`~/.vim/plugged` 中

```neovim
call plug#begin('~/.local/share/nvim/plugged')
```

## 从 vim 迁移到 neovim

安装`neovim`后, 在终端模拟器中输入`nvim`进入

```neovim
:call mkdir(stdpath('config'), 'p')
:exe 'edit '.stdpath('config').'/init.vim'
```

## 插件

Shougo/defx.nvim 比 nerdTree 好的文件管理树

### 1. 使用 vim-plug 管理插件, 在`init.vim`中添加如下代码

```vim-plug
if has('nvim')
  Plug 'Shougo/defx.nvim', { 'do': ':UpdateRemotePlugins' }
else
  Plug 'Shougo/defx.nvim'
  Plug 'roxma/nvim-yarp'
  Plug 'roxma/vim-hug-neovim-rpc'
endif
```

### 2. 检查 py 依赖

- 进入`nvim`后执行`:echo has("python3")`查看安装了 py 没(返回值 1 表示安装了, 0 表示没有), 没有就在退出`nvim`, 在终端下执行 `pip3 install --user pynvim` 安装 py
- 安装完依赖后用`:checkhealth` 查看 python3 安装完了没, 如果提示 `g:python3_host_prog`没有设置就在你的 `init.vim` 中设置 `let g:python3_host_prog = expand('/usr/local/bin/python3')`
  - 如果提示`~.local/share/nvim/shada/main.shada`文件不是 readable 的, 你就用`sudo nvim` 启动后在`checkhealth`
- 执行`:UpdateRemotePlugins`这个不会生成[rplugin.vim](https://github.com/neovim/neovim/blob/master/runtime/plugin/rplugin.vim) 你要手动下载, 放到`.local/share/nvim/rplugin.vim`
- 执行`PlugInstall` 安装`defx.vim` 插件
- 然后才能`:Defx`运行插件

[neovim 下 defx 的安装与使用](https://learnku.com/articles/34885)

但使用`sudo nvim`有个 bug, 启动 defx 会在当前路径下产生一个`~`文件夹, 这个是`coc.nvim`插件的问题

后来发现是npm的问题, 关了npm的更新  `npm config set update-notifier false --global`

[npm 的 update-notifier](https://www.markjour.com/article/20190417-npm-update-notifier.html)

### 关于文件目录树

从 vim 在摸个目录项打开文件开始, 这个目录就确定了, 不能再往父目录去了. 类比 IDE 的 vsc 打开文件夹.
不过我们一般使用 vim 来打开修改某个文件, 所以导致有这个问题.
如果用 vim 像 vsc 一样就没有这个问题了, 是时候用方式的问题.

## 参考
