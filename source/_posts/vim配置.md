---
title: vim配置
date: 2019-03-30 16:23:59
tags:
- vim
- ecmas
categories:
- vim教程
comments: false
permalink:
---

# vim 配置

主要讲下`~/.vimrc`的配置, 然后还有一些插件的使用

大致划分的话，我们通过 vimrc 告诉 vim 如下几类信息：

- 插件
- 界面设置
- 操作定义

## 开始

三本基础的书, 按阶段看

- vimtutor.
- Pratical Vim
- Learn Vimscript the Hard Way

## 基本操作

[VIM 键盘映射 (Map)](http://www.pythonclub.org/linux/vim/map)

{% post_link vim窗口 vim窗口 %}
{% post_link vim标签页 vim标签页 %}
{% post_link vim缓冲区 vim缓冲区 %}

> {% post_link vim中的buffer-tab和window' vim中的buffer-tab和window' %}

{% post_link vim光标移动 vim光标移动 %}
{% post_link vim寄存器 vim寄存器 %}
{% post_link vim代码缩进 vim代码缩进 %}

> 这个可以在 chrome, vscode 中一起用
> 使用窗口还是配合 tmux 来分隔 panel 使用, 我觉得用 tmux 来分隔窗口就好
> **快捷键一般都是在 normal 模式下设置, 在 insert 模式下可以按照 emacs 的方式来设置**

类似 IDE 中的代码 snippet, fold, 交换上下行

## 操作定义

[Vim 初级：配置和使用](https://harttle.land/2013/11/08/vim-config.html)
[感受 Vim 的强大：进阶技巧](https://harttle.land/2015/07/17/vim-advanced.html)
[vim 入坑指南（二）— vim 的模式](https://vimzijun.net/2016/07/16/vim-mode/#fn:2)

公式一：[数字] + operator + motion
公式二：operator + [数字] + operator (前后均为同一个 operator）

### bug

不要使用 `set relativenumber`

删除键没用, 删不掉上一行, 用`set backspace=2`
[vim 中 delete（backspace）键不能向左删除](https://www.smslit.top/2016/11/27/vim-backspace-invalid/)

对于在插入模式下按方向键结果出来 OAOBOCOD 这种, 设置了`set nocp`即`set nocompatible`情况下还是这种效果的, 因为我用了`inoremap <esc> <nop>`
[Arrow keys type OA, OB, OC, and OD](https://github.com/garybernhardt/selecta/issues/76#issuecomment-72739612)
当然还有更厉害的`ESC O D`

## 界面设置

vim 自带有一些基本的色彩主题，一般在`/usr/share/vim/vim74/colors/`中

然后你可以下载使用, 一般放在在`~/.vim/colors`,然后在`~/.vimrc`中设置`colorscheme xxx`

> 建议还是通过后面安装插件来管理

[参考：Vim Colors - Online Preview](http://vimcolors.com/?utf8=%E2%9C%93&bg=dark&order=**newest**)
[参考：vim 官方收集的各种主题包：Vim.org 色彩主题集](https://www.vim.org/scripts/script_search_results.php?keywords=&script_type=color+scheme&order_by=creation_date&direction=descending&search=search)

## 插件

流行的有 4 种吧, Vundle, NeoBundle, VimPlug, Pathogen

我暂时用`vim-plug`

> 这个挺好的

基本上看建议是[vim 有哪些插件管理程序？都有些什么特点？ - LiTuX 的回答 - 知乎](https://www.zhihu.com/question/24294358/answer/27362814)

基本使用方式[Vim-plug：极简 Vim 插件管理器](https://linux.cn/article-9751-1.html)或者[VIM 插件管理工具 vim-plug 简明教程](https://hiberabyss.github.io/2018/03/21/vim-plug-introduction/)

在这个网站上找到一个插件后使用[fugitive.vim](https://vimawesome.com/plugin/fugitive-vim)

基本上就是这么方便

### 再讲下使用吧

安装后在`~/.vimrc`中配置

记住，当你在配置文件中声明插件时，列表应该以 `call plug#begin(PLUGIN_DIRECTORY)` 开始，并以 `plug#end()` 结束。 所有的在[VimAwesome](https://vimawesome.com/)上找到的插件使用的时候都要放在这个里面

下面是一个普遍的例子

```vim
call plug#begin('~/.vim/plugged')
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
call plug#end()
```

增加后用`:source ~/.vimrc`来, 或者不退出, 用`:source %`

```vim
" 看插件状态
:PlugStatus

" 按配置安装插件, 安装时也会有插件状态提示信息
:PlugInstall

" 更新插件
:PlugUpdate

" 查看不同, 这货没啥用
:PlugDiff

" 删除插件是记得不仅要在vimrc中删了, 也要运行命令, 防止在~/.vim/plugged/中还有
:PlugClean

" 升级VimPlug
:PlugUpgrade
```

### 常用插件

{% post_link vim插件 vim插件 %}

## 快捷键管理

用不同的前置组合键来区分不同的功能

`<c-w>` 开头的是窗口相关
tag
buffer
`leader` 开头的这种

管理

## 参考

操作定义
[从零学习 vim 一个多月, 感觉最有用的三个教程](https://www.v2ex.com/amp/t/432528/1)
[Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)
[Learn Vimscript the Hard Way 中文版](http://learnvimscriptthehardway.onefloweroneworld.com/)

[上古神器 Vim：从恶言相向到爱不释手 - 终极 Vim 教程 01 - 带你配置属于你自己的最强 IDE](https://www.bilibili.com/video/av55498503)
[vim 入坑指南（二）— vim 的模式](https://vimzijun.net/2016/07/16/vim-mode/#fn:2)
[mac-vim 按上下左右出现 ABCD](http://billsedison.github.io/2015/09/25/mac-vim-ABCD/)
插件
[vim 入坑指南（五）插件 Vim-Plug](https://vimzijun.net/2016/09/21/vim-plug/)
[Minimalist Vim Plugin Manager](https://github.com/junegunn/vim-plug)
界面

集合
[如何用 Vim 搭建 IDE？](https://harttle.land/2015/11/04/vim-ide.html)
[Vim - 配置 IDE 一般的 python 环境](https://zhuanlan.zhihu.com/p/30022074)
[spf13](http://vim.spf13.com/)
[超级强大的 vim 配置（vimplus）](https://cloud.tencent.com/developer/article/1058322)
[Vim 成长之路](https://github.com/solomonxie/solomonxie.github.io/issues/25)
[把 VIM 配置成 IDE 开发环境](https://blog.csdn.net/ajian005/article/details/39700981)
[所需即所获：像 IDE 一样使用 vim](https://github.com/yangyangwithgnu/use_vim_as_ide)
[The Ultimate vimrc](https://github.com/amix/vimrc)
[简明 VIM 练级攻略](https://coolshell.cn/articles/5426.html)
[将你的 Vim 打造成轻巧强大的 IDE](http://yuez.me/jiang-ni-de-vim-da-zao-cheng-qing-qiao-qiang-da-de-ide/)

{% post_link emacs相关目录 emacs相关目录 %}

[The ultimate Vim configuration: vimrc 666666](https://github.com/amix/vimrc)
