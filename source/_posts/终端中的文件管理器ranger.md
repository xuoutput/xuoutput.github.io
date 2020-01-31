---
title: 终端中的文件管理器ranger
date: 2020-01-24 16:32:01
tags:
- vim
- console
categories:
- vim
comments: false
permalink:
---

# 终端中的文件管理器 ranger

mac 上直接 `brew install ranger`

## 问题

可能遇到安装不上, 那就按提示安装

```vim
$ brew install ranger
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: An exception occurred within a child process:
  CompilerSelectionError: ranger cannot be built with any available compilers.
Install GNU's GCC:
  brew install gcc


$ brew install gcc
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: The following formula
  gcc
cannot be installed as binary package and must be built from source.
Install the Command Line Tools:
  xcode-select --install
```

最后安装 `xcode-select --install` 即可

## 安装 imgcat

下载 imgcat 脚本地址中的内容并重命名为 `imgcat` 然后设置权限,内容中可以自己设置图片格式.

> 有可能不是立即生效, 关了 iterm2 或重启下电脑就可以了
> 在 tmux 中可能不生效 看 PR 解决了,但我没试出来 [imgcat has problems with `tmux`](https://github.com/campoy/tools/issues/11)

```vim
curl "https://iterm2.com/utilities/imgcat" > imgcat
chmod +x imgcat
sudo mv imgcat /usr/local/bin
```

[Inline Images Protocol 介绍](https://iterm2.com/documentation-images.html)
[imgcat 脚本](https://iterm2.com/utilities/imgcat)
[利用 iterm2 在命令行预览图片 服务器也是可以的](https://www.jianshu.com/p/1372e3c910fc)

## 基本操作

[linux 终端文件管理器 ranger 使用详解](http://www.mikewootc.com/wiki/linux/usage/ranger_file_manager.html)

## 自定义命令

有些命令可以不用插件, 直接在这里配置

> `SyntaxError: Non-ASCII character '\xe4' in file` 注意不要使用中文来写注释

[Custom Commands](https://github.com/ranger/ranger/wiki/Custom-Commands)

### 常用

mkcd (mkdir + cd)
fzf integration (`map <C-f> fzf_select`)

> 需要安装 `fzf`
> Search with fd(代替 `find`)
> 需要安装 `fd`

## 图片预览, 视频预览, pdf 预览等

## 版本控制

例如 `git`

> `git`, `mercurial` or `bazaar`

在 `rc.conf` 中开启 `set vcs_aware true` 即可.

设置后有两个字符图案来表示
**第一个标志字符**反映当前签出的本地分支对应的**上游分支的状态**

1. `=` 符号表示他们是同步的
2. `>` 符号表示本地分支超前
3. `<` 符号表示本地分支在后面
4. `Y` 符号表示它们已经分开。
5. `⌂` 符号表示,当本地签出分支未定义“上游分支”时。

**第二个标志字符**反映**本地分支的状态**

1. `X` 显示存在冲突
2. `＋` 未跟踪
3. `－` 已删除
4. `*` 已更改或暂存
5. `.` 已忽略的文件。
6. `√` 所有文件都同步。

## ranger 快捷键

[Keybindings](https://github.com/ranger/ranger/wiki/Keybindings)

### Quick editing rc.conf

去掉打开默认, 只要打开自定义的就好

`map X chain shell vim -p ~/.config/ranger/rc.conf; source ~/.config/ranger/rc.conf`

### Smart "cw"

替换原来的`cw`, 用于在多选文件时,改名不用打命令`:bulkrename`,还是用 `cw` 就好.

`map cw eval fm.execute_console("bulkrename") if fm.thisdir.marked_items else fm.open_console("rename ")`

### Filte r-as-you-type "f"

替换 `f`, 效果类似过滤显示.
`map f console scout -ftsea%space`

### Always fork when using "open_with"

使用下面的命令代替原来的 `f`,
`map r chain draw_possible_programs; console -p10 open_with f`

### 音乐和 tmux 暂时不设置

## ranger 插件推荐

只需要将对应插件库下载(`git clone`)到目录`~/.config/ranger/plugins/`中就好

### 文件图标

这里不需要执行 `make install` 来安装, 执行 `git clone git@github.com:alexanderjeurissen/ranger_devicons.git ~/.config/ranger/plugins/ranger_devicons` 就行, 退出再启动 `ranger` 就可以看到效果.

使用`NERDfont`, 看起来和 `NERDTree` 一样,一般推荐`Source Code Pro patched NERDfont`这个

> `Hack Nerd Font` 我还是用默认的, 因为这个在 vim 的 status 状态栏会显示图标

[File icons for the Ranger file manager](https://github.com/alexanderjeurissen/ranger_devicons)

### 在 ranger 中整合 autojump

执行`git clone git@github.com:fdw/ranger-autojump.git ~/.config/ranger/plugins/ranger-autojump`

将 `autojump.py` 放到 `${XDG_CONFIG_HOME}/ranger/plugins` 目录下.

然后在 `rc.conf` 中增加一行 `map cj console j%space # autojump`

> 我是放在 `# Jumping around` 后面

以后就可以使用 `c-j` 来调整, 使用命令 `:j` 也是可以的

同时你安装后, 还可以在 `zsh` 中使用 `r` 来启动 `ranger`

> 不过没啥用啊, `d` 也不能用, 都不知道去过哪些路径

### 在 ranger 中使用 fzf 搜索(直接用 fzf 好了)

安装执行 `git clone https://github.com/laggardkernel/ranger-fzf-marks.git ~/.config/ranger/plugins/fzf-marks`

然后在 `rc.conf` 中设置快捷键

```vim
map <C-g> fzm
```

[ranger-fzf-marks](https://github.com/laggardkernel/ranger-fzf-marks)

## 参考

[Plugins](https://github.com/ranger/ranger/wiki/Plugins)
[文件管理器 Ranger 安装和使用教程 66](https://www.bilibili.com/video/av26947240/)
[最好的文件管理器：Ranger - 基础介绍以及部分进阶功能 - Linux 学习日记 #2](https://www.bilibili.com/video/av54841601)
[ranger 1.9.3](https://github.com/ranger/ranger)
[Linux 文件管理器 ranger #31](https://github.com/itgoyo/500Days-Of-Github/issues/31)
[linux 终端文件管理器 ranger 使用详解 66](http://www.mikewootc.com/wiki/linux/usage/ranger_file_manager.html)
[[Ranger – 给命令行用户一个基于文本的文件管理器](https://linux.cn/article-1995-1.html#3_3958)
]
