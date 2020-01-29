---
title: vim窗口
date: 2020-01-27 19:03:38
tags:
- vim
categories:
- vim教程
comments: false
permalink:
---

# vim 窗口

vim 有自己的窗口, tmux 也有窗口和 panel 管理, 这个需要调整下怎么处理

> 一般对比的时候用window, 而多文件用tab的
> 不建议用 tmux 的 panel 代替 vim 的窗口

## 操作

### 一次打开多个文件,分屏

```vim
# 竖向分屏 -o是横向水平分屏
vim -O file1 file2
```

### 进入 vim 后用命令打开文件

未指定文件名就是当前文件

```vim
:sp[lit] {file}     #  水平分屏 *
:new {file}         #  水平分屏
:sv[iew] {file}     #  水平分屏，以只读方式打开
:vs[plit] {file}    #  垂直分屏 *
:clo[se]            #  关闭当前窗口 *
```

### 使用快捷键 `C-w` 操作窗口

```vim
Ctrl+w s    #  水平分割当前窗口
Ctrl+w v    #  垂直分割当前窗口
Ctrl+w q    #  关闭当前窗口
Ctrl+w n    #  打开一个新窗口（空文件）
Ctrl+w o    #  关闭出当前窗口之外的所有窗口
Ctrl+w T    #  当前窗口移动到新标签页
```

### 切换窗口

hjkl

```vim
Ctrl+w h    #  切换到左边窗口
Ctrl+w j    #  切换到下边窗口
Ctrl+w k    #  切换到上边窗口
Ctrl+w l    #  切换到右边窗口
Ctrl+w w    #  遍历切换窗口
Ctrl+w t    #  切换到最上方的窗口
Ctrl+w b    #  切换到最下方的窗口
```

### 移动窗口

HJKL

```vim
Ctrl+w H    #  将当前窗口移动到最左
Ctrl+w J    #  将当前窗口移动到最下
Ctrl+w K    #  将当前窗口移动到最上
Ctrl+w L    #  将当前窗口移动到最右
```

### 调整大小

```vim
Ctrl+w +        #  增加窗口高度
Ctrl+w -        #  减小窗口高度
Ctrl+w Ctrl+-/_   #  减小窗口全部高度
Ctrl+w =        #  统一窗口高度
```

## 设置快捷键

### 窗口管理

#### 分屏

暂时用 s 开头的, 按键 hjkl(左上下右)改为 jkil, 符合方向键按法,分屏后立即激活到新窗口.

> 不习惯就还是 hjkl
> 记得要关闭 s 的功能, 防止

```vim
" 分屏一个, 激活当前 左上下右, 一般是kl 下右.
map sj :set nosplitright<CR>:vsplit<CR>   # 新建一个垂直分割的窗口，放置在当前窗口左侧
map si :set nosplitbelow<CR>:split<CR>    # 新建一个水平分割的窗口，放置当前窗口上方
map sk :set splitbelow<CR>:split<CR>      # 新建一个水平分割的窗口，放置当前窗口下方
map sl :set splitright<CR>:vsplit<CR>     # 新建一个垂直分割的窗口，放置在当前窗口右侧
map sx :close                             # 关闭当前窗口panel
map so :only                              # 关闭其他窗口, 只保留当前窗口panel
map sx <C-w>q                             # 关闭当前窗口panel
" 或使用 C-hjkl,用 C-HJKL 来,这样快一点
```

> `<C-w>` 和 `<C-W>` 一样
> 主要是`<C-S>` 这种映射</C-S>[VIM map 映射](https://blog.csdn.net/turkeyzhou/article/details/8765347)
> 设置激活的窗口高亮色,这个不会

#### 在分屏之间切换, 高亮

```vim
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l
```

> 切换的前缀建同 `<C-w>` 当成 tmux 的 `<C-b>` > {% post_link vim配置 vim配置 %}

## 参考

[Vim 多文件编辑：窗口](https://harttle.land/2015/11/14/vim-window.html)
{% post_link tmux简单使用 tmux简单使用 %}
[分割窗口](http://vimcdoc.sourceforge.net/doc/usr_08.html#usr_08.txt)
