---
title: 命令行模糊查找器fzf
date: 2020-02-04 16:54:19
tags:
- fzf
categories:
- vim教程
comments: false
permalink:
---

# 命令行模糊查找器 fzf

它是一个用于命令行的交互式 Unix 过滤器，可用于任何列表；文件、命令历史记录、进程、主机名、书签、git 提交等。

> 可能只会想到用来过滤文件 file, 其实他还可以用来过滤 **命令历史记录、进程、主机名**, 书签和 git 的 commit 惊了啊
> 只要输入到 `fzf` 都可以过滤

## 安装

### 主要是通过 Homebrew or Linuxbrew

```brew
brew install fzf

# To install useful key bindings and fuzzy completion:
$(brew --prefix)/opt/fzf/install
```

> 带上`$`一起执行

按键绑定和自动补齐功能下载到 `~/.fzf.bash` 和 `~/.fzf.zsh` 中

在你的 `.bashrcfile` 中按你的 shell 增加, 例如是 `zsh` 就只需要`zsh`那个就行不用`bash`那条

```zsh
# [ -f ~/.fzf.bash ] && source ~/.fzf.bash
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
```

`source ~/.zshrc` 下, 不过我感觉怎么还是不能补全啊, 试了下 `fzf --preview` 这个 preview 就不行

### 使用 git

下载后执行 `install` 脚本

```git
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

然后一路 yyy enter

### 其他安装方式

[其他安装方式查看链接](https://github.com/junegunn/fzf#using-linux-package-managers)

### 作为 ranger 和 vim 中的插件安装

由于管理 vim 插件使用 `vim-plug` 所以直接在 `.vimrc` 中添加

```vim
" If installed using Homebrew
Plug '/usr/local/opt/fzf'

" If installed using git
Plug '~/.fzf'
```

如果你没装过 `fzf`, 直接使用 `vim-plug` 也可以的, 就按 `vim-plug` 的正常安装方式来

```vim
" PlugInstall and PlugUpdate will clone fzf in ~/.fzf and run the install script
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
  " Both options are optional. You don't have to install fzf in ~/.fzf
  " and you don't have to run the install script if you use fzf only in Vim.
```

## 更新

[update](https://github.com/junegunn/fzf#upgrading-fzf)

## 使用

fzf 将启动交互式 finder，从 STDIN 读取列表，并将所选项目写入 STDOUT。

下面就是默认使用 `find` 命令再输入到 `fzf` 中进行选择

```bash
find * -type f | fzf > selected
```

所以看到 `vim $(fzf)` 这种也是可以的

> 一般我们使用的时候都会省略标准 STDIN
> `FZF_DEFAULT_COMMAND` 可以设置默认命令

### 显示结果后的操作

- `CTRL-J` / `CTRL-K` (or `CTRL-N` / `CTRL-P`) 选中项上下移动
- `Ente` 选中项目, `CTRL-C` / `CTRL-G` / `ESC` 推出
  多选模式增加参数 ( `-m` ), `TAB` and `Shift-TAB` 用来标记项目
- Emacs style key bindings
- Mouse: scroll, click, double-click; shift-click and shift-scroll on - multi-select mode

### 显示列表布局

默认是全屏, 你可以通过参数选项 `--height` 来调整高度

```vim
vim $(fzf --height 40%)
```

使用 `--reverse` 和 `--layout` 可以调整对齐方式, 默认是 `"bottom-up"`

> 通过 `FZF_DEFAULT_OPTS` 参数可以修改配置

一个例子:

```bash
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'
```

### 搜索语法 (重要)

`^music .mp3$ sbtrkt !fire`

- `xxx` 直接写就是模糊搜索
- `'` 加个引号就是精确匹配
- `^` 是开头
- `$` 是结尾
- `.` 是后缀(这个不能算搜索匹配吧,就是有啥是啥)
- `!` 是取反

多条件你可以通过空格 和 `|` 来增加, 例如下面说的就是 以 core 开头且 go 结尾,或者 rb 结尾或者 py 结尾的

```bash
^core go$ | rb$ | py$
```

### 总结下用到的环境变量(目前就两个)

- `FZF_DEFAULT_COMMAND`
  - Default command to use when input is tty
  - e.g. `export FZF_DEFAULT_COMMAND='fd --type f'`
- `FZF_DEFAULT_OPTS`
  - Default options
  - e.g. `export FZF_DEFAULT_OPTS="--layout=reverse --inline-info"`

## 命令行下怎么快速启动 fzf 来搜索命令历史

除了使用命令 `fzf` 外, 在不同的终端下你可以通过快捷键来启动 **搜索命令历史记录**

常见的三种 shell `bash`, `zsh`和 `fish.`

我就只说 `zsh` 了

- `CTRL-R` - 在命令行中粘贴选中的命令记录
  - 可以再按 `CTRL-R` 来改变搜索后的顺序, 时间排序的.
  - 设置 `FZF_CTRL_R_OPTS` 来传递额外的参数
  - 没看到类似 `FZF_CTRL_T_COMMAND` 这种的 `FZF_CTRL_R_COMMAND` 来覆盖默认命令

## tmux 中的 window 中 单独使用 fzf

### `fzf-tmux` script

是一个在 `tmux` 的 `pane` 中使用 `fzf` 的 bash 脚本

```bash
# usage: fzf-tmux [-u|-d [HEIGHT[%]]] [-l|-r [WIDTH[%]]] [--] [FZF OPTIONS]
#        (-[udlr]: up/down/left/right)

# select git branches in horizontal split below (15 lines)
git branch | fzf-tmux -d 15

# select multiple words in vertical split on the left (20% of screen width)
cat /usr/share/dict/words | fzf-tmux -l 20% --multi --reverse
```

设置 `FZF_TMUX` 为 1, 还有设置下高度 `FZF_TMUX_HEIGHT`(e.g. 20, 50%).

## 在 bash 和 zsh 中进行补全

命令格式 `COMMAND [DIRECTORY/][FUZZY_PATTERN]**<TAB>`, 就是在命令后面加上 `**` 然后按下 `TAB` 键就行.

```bash
# Files under current directory
# - You can select multiple items with TAB key
vim **<TAB>

# Files under parent directory
vim ../**<TAB>

# Files under parent directory that match `fzf`
vim ../fzf**<TAB>

# Files under your home directory
vim ~/**<TAB>


# Directories under current directory (single-selection)
cd **<TAB>

# Directories under ~/github that match `fzf`
cd ~/github/fzf**<TAB>
```

### 进程 ID(就这个特别,不用加 `**`)

```bash
# Can select multiple processes with <TAB> or <Shift-TAB> keys
kill -9 <TAB>
```

### Host names

对于 `ssh` 和 `telnet` 命令, `/etc/hosts` 和 `~/.ssh/config`.

```bash
ssh **<TAB>
telnet **<TAB>
```

### Environment variables / Aliases

环境变量和别称也可以

```bash
unset **<TAB>
export **<TAB>
unalias **<TAB>
```

## 配置

```zshrc
# Use ~~ as the trigger sequence instead of the default **
export FZF_COMPLETION_TRIGGER='~~'

# Options to fzf command
export FZF_COMPLETION_OPTS='+c -x'

# Use fd (https://github.com/sharkdp/fd) instead of the default find
# command for listing path candidates.
# - The first argument to the function ($1) is the base path to start traversal
# - See the source code (completion.{bash,zsh}) for the details.
_fzf_compgen_path() {
  fd --hidden --follow --exclude ".git" . "$1"
}

# Use fd to generate the list for directory completion
_fzf_compgen_dir() {
  fd --type d --hidden --follow --exclude ".git" . "$1"
}
```

### 命令补全诶

```vimrc
# usage: _fzf_setup_completion path|dir|var|alias|host COMMANDS...
_fzf_setup_completion path ag git kubectl
_fzf_setup_completion dir tree
```

## 高级配置

### 性能上

### 执行额外的程序而不退出 fzf

### 预览窗口

可以使用自带的 `cat` 和 `head` 等命令来搭配 `--preview` 来显示

```bash
# {} is replaced to the single-quoted string of the focused line
fzf --preview 'cat {}'
# Use head instead of cat so that the command doesn't take too long to finish
fzf --preview 'head -100 {}'
```

推荐就是使用  `Bat` 和 `highlight`

`fzf` 是一个通用的文字过滤而不是文件过滤器, 所以不要在 `FZF_DEFAULT_OPTS` 中加上参数 `--preview`

```vim
# *********************
# ** DO NOT DO THIS! **
# *********************
export FZF_DEFAULT_OPTS='--preview "bat --style=numbers --color=always {} | head -500"'

# bat doesn't work with any input other than the list of files
ps -ef | fzf
seq 100 | fzf
history | fzf
```

[bat 的使用](https://github.com/sharkdp/bat#find-or-fd)

## 小提示

使用 `fd`, `ripgrep` 或 `the silver searcher` 来代替 `find`, 我本机上装了 `fd`

```vimrc
# Feed the output of fd into fzf
fd --type f | fzf

# Setting fd as the default source for fzf
export FZF_DEFAULT_COMMAND='fd --type f'

# Now fzf (w/o pipe) will use fd instead of find
# 这里就是最开始使用中的那部分的分解
fzf

# To apply the command to CTRL-T as well
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
```

忽略 `.gitignore`

```vimrc
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
```

安装了 `bat` 之后

```vimrc
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git -X bat'
```

## 主题配置

基本上配置了这个颜色
![fzf_theme.png](fzf_theme.png)

```zshrc
export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS' --color=fg:#d0d0d0,bg:#1f2223,hl:#5f87af --color=fg+:#f4b26d,bg+:#3d3b3b,hl+:#4cc7e0 --color=info:#afaf87,prompt:#87ff00,pointer:#d7005f --color=marker:#5fd7ff,spinner:#f5f52c,header:#87afaf'
```

[Color schemes](https://github.com/junegunn/fzf/wiki/Color-schemes)

## key bindings

### layout 显示区域

可以在`bashrc` 中写入如下代码来让 `fzf` 显示为全屏, `--height 40%` 可以设置高度

```vimrc
export FZF_DEFAULT_OPTS='--no-height --no-reverse'
```

> 不过我没改

这个是配置在 `tmux` 中, 是否开一个 `pane` 来显示 `fzf`, 我不建议开启

```vimrc
export FZF_TMUX=1
```

### preview

前面在 `bat` 那边配置了一个错误的配置, 那里是不能看到目录文件的信息, 只能看到普通文件信息, 而这个配置可以如果遇到目录, 是可以看到目录下的信息, 用 `tree` 展示

这里配置了 `c-t` 使用, 你可以设置为 `c-r`

```zshrc
# Using highlight (http://www.andre-simon.de/doku/highlight/en/highlight.html)
export FZF_CTRL_T_OPTS="--preview '(highlight -O ansi -l {} 2> /dev/null || cat {} || tree -C {}) 2> /dev/null | head -200'"
```

默认使用 `c-r` 是可以进行排序的, 如果你想增加一个 精确搜索, 那么如下, 增加 `--exact`

```zshrc
export FZF_CTRL_R_OPTS='--sort --exact'
```

## 配置信息

```zshrc
# fzf
# fzf key bindings and fuzzy completion
# [ -f ~/.fzf.bash ] && source ~/.fzf.bash 装了zsh就不用这个了
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
# fzf 装了fd代替find
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'

# Use fd (https://github.com/sharkdp/fd) instead of the default find
# command for listing path candidates.
# - The first argument to the function ($1) is the base path to start traversal
# - See the source code (completion.{bash,zsh}) for the details.
# _fzf_compgen_path() {
  # fd --hidden --follow --exclude ".git" . "$1"
# }

# Use fd to generate the list for directory completion
# _fzf_compgen_dir() {
  # fd --type d --hidden --follow --exclude ".git" . "$1"
# }

# usage: _fzf_setup_completion path|dir|var|alias|host COMMANDS...
# _fzf_setup_completion path ag git kubectl dir tree

# export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'
# *********************
# ** DO NOT DO THIS! **
# *********************
# 不建议这么使用bat
# export FZF_DEFAULT_OPTS='--preview "bat --style=numbers --color=always {} | head -500"'
export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS' --color=fg:#d0d0d0,bg:#1f2223,hl:#5f87af --color=fg+:#f4b26d,bg+:#3d3b3b,hl+:#4cc7e0 --color=info:#afaf87,prompt:#87ff00,pointer:#d7005f --color=marker:#5fd7ff,spinner:#f5f52c,header:#87afaf'

# 配置一个c-r来预览当前文件夹下内容, c-t来看历史记录,Alt-c看目录结构
# Using highlight (http://www.andre-simon.de/doku/highlight/en/highlight.html) 并没有使用到这个highlight, 而是用bat来高亮
export FZF_CTRL_T_OPTS="--preview '(bat --style=numbers --color=always {} || highlight -O ansi -l {} 2> /dev/null || cat {} || tree -C {}) 2> /dev/null | head -200'"

# 用来看历史记录
export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window down:3:hidden:wrap --bind '?:toggle-preview'"

# The following example uses tree command to show the entries of the directory.
export FZF_ALT_C_OPTS="--preview 'tree -C {} | head -200'"


# 配置在 tmux 中使用快捷键时打开一个新的Pane 来当做fzf的显示区域
# export FZF_TMUX=1

```

## vim 上的 fzf

目前是通过:FZF 打开, 其余的配置没设置好

[Examples (vim)](https://github.com/junegunn/fzf/wiki/Examples-(vim))
[junegunn/fzf.vim](https://github.com/junegunn/fzf.vim)

## 参考

[junegunn/fzf](https://github.com/junegunn/fzf)
