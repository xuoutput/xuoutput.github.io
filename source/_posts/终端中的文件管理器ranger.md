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

或直接下 git clone 启动`ranger.py`就行

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

[Image preview not working inside tmux session in iTerm2 ](https://github.com/ranger/ranger/issues/539)

## 快捷键整理

从 ranger 中 按 shift + s 会进入当前选中的 终端地址

### ueberzug

上面的事 iterm2 的, 由于我是用了 `alacritty` 所以配置上使用 `ueberzug` 来设置图片预览

安装[seebye/ueberzug](https://github.com/seebye/ueberzug) 中可以看到使用 `sudo pip3 install ueberzug`, 但会遇到报错 `X11` 的库依赖你没有安装, 不过在 `brew` 和 `pip3` 中都搜不到 `X11` 相关的库.

通过搜索后最终查到一篇
[About X11 for Mac](https://support.apple.com/en-us/HT201341)
[Run X11 Apps on Mac](http://blog.mclaughlinsoftware.com/2015/06/09/run-x11-apps-on-mac/)

此时通过命令安装 `brew cask install xquartz`. 之后需要重新 **启动下电脑** 才能执行 `xquarzt`

> 重启前通过 `brew cask list` 是看不到 `xquartz` 的

这里只是安装好了, 但还是会报错, 找不到 `#include<X11>`
这是需要增加一个软连接 [Xlib.h not found when building graphviz on Mac OS X 10.8 (Mountain Lion)](https://stackoverflow.com/questions/11465258/xlib-h-not-found-when-building-graphviz-on-mac-os-x-10-8-mountain-lion/12089021#12089021)

[osx - File not found (X11/Xlib.h) in MacOS](http://www.itkeyword.com/doc/6440360707893630x761/osx-file-not-found-x11-xlib-h-in-macos)

```bash
ln -s /opt/X11/include/X11 /usr/local/include/X11
```

[How to install in MacOS?](https://github.com/seebye/ueberzug/issues/61)

创建一个文件 `~/.pydistutils.cfg`

```cfg
[build_ext]
include_dirs=/usr/X11R6/include
library_dirs=/usr/X11R6/lib
```

然后 `sudo pip3 install ueberzug` 即可.
但还是不能预览

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

## 常用快捷键

- `?` 帮助

### 浏览

- h/j/k/l 往父目录/下/上/进入
  - i 是查看内容
- `[`/`]` 父目录下/上
- gg 跳到顶端
- G 跳到底端
- H 后退
- Ctrl-d/u 向上翻页/向下翻页
- L 前进
- gh go home
  - cd 依旧可以用
  - 建议使用书签(m)来配置一些常用路径
- m 新建书签(之后按一个字母)
  - ` 显示所有书签
  - um 按一个字母删除一个书签
- gn/c-n 新建 tab 标签
  - tab/s-tab 切换
  - gc/c-w/`q` 关闭
- f 查找
  - 自定义为过滤了
  - alt-f fd 查找 alt-n/N
  - c-f 使用 fzf 过滤
- / 搜素 n/N
- g 快速进入目录或标签

- zh 显示隐藏
- zp 打开/关闭文件预览功能
- zP 打开目录预览功能

### 编辑

- space 选择
  - v 反选(可以当全选用)
  - V 开始连续选择
  - uv 取消选择
- yy 复制文件
  - yn 复制文件名
  - yp 复制路径
- dd 剪切
  - dD 删除
  - delete 删除
- pp 粘贴
  - po 直接覆盖
- cw 重命名(支持多选后改名)
  - I/a/A 在当前名称基础上重命名 (i 是查看内容)
- :show_files_in_finder 在 mac 上的 Finder 显示文件

### 粘贴, 解压时的任务管理

- w: 打开/关闭(或 q)任务视图. 在 w 打开的任务视图中:
  - dd: 终止一个任务
  - J/K: 降低/提升当前任务的优先级

### 排序

- on/ob 根据文件名进行排序(natural/basename)
- oc/C 根据改变时间进行排序 (Change Time 文件的权限组别和文件自身数据被修改的时间)
  - oa/A 访问时间进行排序 (Access Time 访问文件自身数据的时间)
  - om/N 修改进行排序 (Modify time 文件自身内容被修改的时间)
- os/T 根据文件大小进行排序(Size)
- ot/S 根据后缀名进行排序 (Type)

### 杂项

- z: 切换设置
- u: 撤销操作

## bug

似乎依赖 autojump, 写在 autojump 就报错

```bash
$ ranger
ranger version: ranger 1.9.3
Python version: 2.7.10 (default, Feb 22 2019, 21:55:15) [GCC 4.2.1 Compatible Apple LLVM 10.0.1 (clang-1001.0.37.14)]
Locale: None.None

Traceback (most recent call last):
  File "/usr/local/Cellar/ranger/1.9.3/libexec/ranger/core/main.py", line 201, in main
    fm.loop()
  File "/usr/local/Cellar/ranger/1.9.3/libexec/ranger/core/fm.py", line 359, in loop
    self.enter_dir(self.thistab.path)
  File "/usr/local/Cellar/ranger/1.9.3/libexec/ranger/core/actions.py", line 614, in enter_dir
    result = self.thistab.enter_dir(path, history=history)
  File "/usr/local/Cellar/ranger/1.9.3/libexec/ranger/core/tab.py", line 169, in enter_dir
    self.fm.signal_emit('cd', previous=previous, new=self.thisdir)
  File "/usr/local/Cellar/ranger/1.9.3/libexec/ranger/ext/signals.py", line 268, in signal_emit
    fnc(signal)
  File "/Users/xuheng/.config/ranger/plugins/autojump.py", line 10, in update_autojump
    subprocess.Popen(["autojump", "--add", signal.new.path])
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/subprocess.py", line 710, in __init__
    errread, errwrite)
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/subprocess.py", line 1335, in _execute_child
    raise child_exception
OSError: [Errno 2] No such file or directory

ranger crashed. Please report this traceback at:
https://github.com/ranger/ranger/issues
```

## 参考

[Plugins](https://github.com/ranger/ranger/wiki/Plugins)
[文件管理器 Ranger 安装和使用教程 66](https://www.bilibili.com/video/av26947240/)
[最好的文件管理器：Ranger - 基础介绍以及部分进阶功能 - Linux 学习日记 #2](https://www.bilibili.com/video/av54841601)
[ranger 1.9.3](https://github.com/ranger/ranger)
[Linux 文件管理器 ranger #31](https://github.com/itgoyo/500Days-Of-Github/issues/31)
[linux 终端文件管理器 ranger 使用详解 66](http://www.mikewootc.com/wiki/linux/usage/ranger_file_manager.html)
[Ranger – 给命令行用户一个基于文本的文件管理器](https://linux.cn/article-1995-1.html#3_3958)
