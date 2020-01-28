---
title: vim缓冲区
date: 2020-01-28 21:50:20
tags:
- vim
categories:
- vim教程
comments: false
permalink:
---

# vim 缓冲区

基于缓冲区的多文件编辑是 Vim 最为推荐的做法，Vim 维护着你在当前打开的这些 Buffer 里的所有跳转

## 操作

### 打开和关闭

**不带任何参数**打开多个文件便可以把它们都放入缓冲区（Buffer）：

```vim
vim a.txt b.txt
```

进入 Vim 后，通过 `:e[dit]` 命令即可打开某个文件到**缓冲区**。还记得吗？使用 `:new` 可以打开一个**新窗口**。 关闭一个文件可以用 `:q` ，移出缓冲区用 `:bd[elete]` （占用缓冲区的文件对你毫无影响，多数情况下不需要这样做）。

> 进入就是 `:new`, `:e` 退出是 `:q` `:bd`.

### buffer 切换

`C-6` 切换当前缓冲区和上一个缓冲区

```vim
:ls, :buffers             " 列出所有缓冲区
:bn[ext]                  " 下一个缓冲区
:bp[revious]              " 上一个缓冲区
:b {number, expression}   " 跳转到指定缓冲区
```

> 设置上下一个缓存区快捷键为 `c-tab` 不可取, 因为有些terminal会占用了

### buffer 为 window 分屏

其实分屏时还可以指定一个Buffer在新的Window中打开。

```vim
:sb 3               " 分屏并打开编号为3的Buffer
:vertical sb 3      " 同上，垂直分屏
:vertical rightbelow sfind file.txt
```

### 利用通配符进行缓冲区跳转

启动 `wildmenu` 并设置匹配后文件选择模式为 `full` 。 `wildchar` 为选择下一个备选文件的**快捷键**， 而 `wildcharm` 用于宏定义中（语义同wildchar），比如后面的noremap。

```vim
set wildmenu wildmode=full
set wildchar=<Tab> wildcharm=<C-Z>
```

然后按下 `:b <Tab>` 便可看到Vim提供的备选文件列表了， 按下 `<Tab>` 选择下一个，按下回车打开当前文件。

```vim
:b <Tab>       " 显示所有Buffer中的文件
:b car<Tab>    " 显示 car.c car.h
" 下面都是例子
:b *car<Tab>   " 显示 car.c jetcar.c car.h jetcar.h
:b .h<Tab>     " 显示 vehicle.h car.h jet.h jetcar.h
:b .c<Tab>     " 显示 vehicle.c car.c jet.c jetcar.c
:b ar.c<Tab>   " 显示 car.c jetcar.c
:b j*c<Tab>    " 显示 jet.c jetcar.c jetcar.h
```

我们可以为 `:b <Tab>` 设置一个快捷键 `<C-b>`，这时便用到上文中设置的wildcharm了：
> 快捷键 `nnoremap <C-b> :b <C-z>`
> 快捷键 `<C-n>` 为显示 **NERDTree**

## 参考

[Vim 多文件编辑：缓冲区 666](https://harttle.land/2015/11/17/vim-buffer.html)
