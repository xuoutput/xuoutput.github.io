---
title: vim标签页
date: 2020-01-28 17:42:37
tags:
- vim
categories:
- vim教程
comments: false
permalink:
---

# vim 标签页

标签就是顶部显示的

> 中括号中的部分可以省略，在 Vim 中`:h tabedit`可以查看命令帮助。

## 操作

### 一次打开多个文件, 按 tab 分

```vim
vim -p a.c b.c c.c
```

### 打开和关闭

```vim
:tabe[dit] {file}   " edit specified file in a new tab
:tabf[ind] {file}   " open a new tab with filename given, searching the 'path' to find it
:tabc[lose]         " close current tab
:tabc[lose] {i}     " close i-th tab
:tabo[nly]          " close all other tabs (show only the current tab)
```

### tab 切换

使用命令

```vim
:tabn       " go to next tab
:tabp       " go to previous tab
:tabfirst   " go to first tab
:tablast    " go to last tab
```

normal 模式下(**推荐**)

```vim
gt          " go to next tab
gT          " go to previous tab
{i}gt       " go to tab in position i
```

### 移动 tab

```vim
:tabs       " list all tabs including their displayed window
:tabm 0     " move current tab to first
:tabm       " move current tab to last
:tabm {i}   " move current tab to position i+1
```

### 设置快捷键

```vim
" nnoremap gn{file} :tabe[dit] {file}<CR> 用这个新建不好用还是用:tabe
nnoremap <C-w><C-l> <Esc>:tabnext<CR>
nnoremap <C-w><C-h> <Esc>:tabprevious<CR>
nnoremap gx :tabclose<CR>
nnoremap {i}gx :tabclose {i}<CR>
nnoremap gxo :tabonly<CR>
```

> 类似 `tmux` 这种切换 `<C-a> <C-h/l>`
> 不过建议用 `gt/gT/[i]gt` 就好了

## 参考

[Vim 多文件编辑：标签页](https://harttle.land/2015/11/12/vim-tabpage.html)
