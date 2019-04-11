---
title: vim配置
date: 2019-03-30 16:23:59
tags:
- vim
- ecmas
categories:
- 后端教程
comments: false
permalink:
---

# vim配置

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

缓冲区的
[Vim 多文件编辑：缓冲区](https://harttle.land/2015/11/17/vim-buffer.html)

```vim
<c+i>
<c+o>

:ls
:bn :bp
:b123
```


## 操作定义

[vim 入坑指南（二）— vim 的模式](https://vimzijun.net/2016/07/16/vim-mode/#fn:2)

公式一：[数字] + operator + motion
公式二：operator + [数字] + operator (前后均为同一个 operator）

### bug

删除键没用, 删不掉上一行, 用`set backspace=2`
[vim中delete（backspace）键不能向左删除](https://www.smslit.top/2016/11/27/vim-backspace-invalid/)

对于在插入模式下按方向键结果出来OAOBOCOD这种, 设置了`set nocp`即`set nocompatible`情况下还是这种效果的, 因为我用了`inoremap <esc> <nop>`
[Arrow keys type OA, OB, OC, and OD](https://github.com/garybernhardt/selecta/issues/76#issuecomment-72739612)
当然还有更厉害的`ESC O D`



## 界面设置

vim自带有一些基本的色彩主题，一般在`/usr/share/vim/vim74/colors/`中

然后你可以下载使用, 一般放在在`~/.vim/colors`,然后在`~/.vimrc`中设置`colorscheme xxx`

[参考：Vim Colors - Online Preview](http://vimcolors.com/?utf8=%E2%9C%93&bg=dark&order=**newest**)
[参考：vim官方收集的各种主题包：Vim.org色彩主题集](https://www.vim.org/scripts/script_search_results.php?keywords=&script_type=color+scheme&order_by=creation_date&direction=descending&search=search)




## 插件

流行的有4种吧, Vundle, NeoBundle, VimPlug, Pathogen

我暂时用`vim-plug`

基本上看建议是[vim有哪些插件管理程序？都有些什么特点？ - LiTuX的回答 - 知乎](https://www.zhihu.com/question/24294358/answer/27362814)

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

vim-cheat40





## emacs

两者可以共同使用
[mac 终端光标的快捷键操作](https://www.gowhich.com/blog/617)
[一年成为 Emacs 高手 (像神一样使用编辑器)](https://github.com/redguardtoo/mastering-emacs-in-one-year-guide/blob/master/guide-zh.org#%E8%8F%9C%E9%B8%9F%E6%80%8E%E4%B9%88%E5%BC%80%E5%A7%8B)

### 终端中的快捷键操作

常用的快捷键：
Ctrl + d        删除一个字符，相当于通常的Delete键（命令行若无所有字符，则相当于exit；处理多行标准输入时也表示eof）
Ctrl + h        退格删除一个字符，相当于通常的Backspace键
Ctrl + u        删除光标之前到行首的字符
Ctrl + k        删除光标之前到行尾的字符
Ctrl + c        取消当前行输入的命令，相当于Ctrl + Break
Ctrl + a        光标移动到行首（Ahead of line），相当于通常的Home键
Ctrl + e        光标移动到行尾（End of line）
Ctrl + f        光标向前(Forward)移动一个字符位置
Ctrl + b        光标往回(Backward)移动一个字符位置
Ctrl + l        清屏，相当于执行clear命令
Ctrl + p        调出命令历史中的前一条（Previous）命令，相当于通常的上箭头
Ctrl + n        调出命令历史中的下一条（Next）命令，相当于通常的上箭头
Ctrl + r        显示：号提示，根据用户输入查找相关历史命令（reverse-i-search）

次常用快捷键：
Alt + f         光标向前（Forward）移动到下一个单词
Alt + b         光标往回（Backward）移动到前一个单词
Ctrl + w        删除从光标位置前到当前所处单词（Word）的开头
Alt + d         删除从光标位置到当前所处单词的末尾
Ctrl + y        粘贴最后一次被删除的单词

移动就是f,b, a,e
删除u, k, w, d, d, h
粘贴y
历史r

> 关闭mac上按option输出字符[MacOS中如何关闭或禁用Option（Alt）+ 键盘输出特殊字符(解决oh my zsh 使option f b 失效)](https://blog.csdn.net/gubenpeiyuan/article/details/52877603) 就是改下items2的key为+Esc

### 开启emacs入门

先安装再配置[GNU Emacs Download & installation](https://www.gnu.org/software/emacs/download.html#macos)

然而brew没有`--with-cocoa`的参数, 当你用`brew install emacs`后, 用`emacs --version`却看到版本不对诶

因为mac自带emacs在`/usr/bin/emacs`
删不掉这个自带的emacs
[Delete /usr/bin/emacs - Operation not permitted](https://superuser.com/questions/1018810/delete-usr-bin-emacs-operation-not-permitted)
[Who installed this Emacs?](https://apple.stackexchange.com/a/108753)

在使用brew安装完之后 [更改系统自带旧版本](https://www.kancloud.cn/chandler/mac_os/480609)

在`~/.zshrc`中添加`alias emacs="/usr/local/Cellar/emacs/26.1_1/bin/emacs-26.1"`

看教程学下基本的知识[Fast and robust Emacs setup.](https://github.com/redguardtoo/emacs.d#checklist)


## 参考

操作定义
[从零学习 vim 一个多月, 感觉最有用的三个教程](https://www.v2ex.com/amp/t/432528/1)
[Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)
[Learn Vimscript the Hard Way 中文版](http://learnvimscriptthehardway.onefloweroneworld.com/)

[vim 入坑指南（二）— vim 的模式](https://vimzijun.net/2016/07/16/vim-mode/#fn:2)
[mac-vim 按上下左右出现ABCD](http://billsedison.github.io/2015/09/25/mac-vim-ABCD/)
插件
[vim 入坑指南（五）插件 Vim-Plug](https://vimzijun.net/2016/09/21/vim-plug/)
[Minimalist Vim Plugin Manager](https://github.com/junegunn/vim-plug)
界面

集合
[如何用Vim搭建IDE？](https://harttle.land/2015/11/04/vim-ide.html)
[Vim - 配置IDE一般的python环境](https://zhuanlan.zhihu.com/p/30022074)
[spf13](http://vim.spf13.com/)
[超级强大的vim配置（vimplus）](https://cloud.tencent.com/developer/article/1058322)
[Vim成长之路](https://github.com/solomonxie/solomonxie.github.io/issues/25)
[把VIM配置成IDE开发环境](https://blog.csdn.net/ajian005/article/details/39700981)
[所需即所获：像 IDE 一样使用 vim](https://github.com/yangyangwithgnu/use_vim_as_ide)
[The Ultimate vimrc](https://github.com/amix/vimrc)
[简明 VIM 练级攻略](https://coolshell.cn/articles/5426.html)
[将你的Vim 打造成轻巧强大的IDE](http://yuez.me/jiang-ni-de-vim-da-zao-cheng-qing-qiao-qiang-da-de-ide/)

ecmas
[mac 终端光标的快捷键操作](https://www.gowhich.com/blog/617)
[一年成为 Emacs 高手 (像神一样使用编辑器)](https://github.com/redguardtoo/mastering-emacs-in-one-year-guide/blob/master/guide-zh.org#%E8%8F%9C%E9%B8%9F%E6%80%8E%E4%B9%88%E5%BC%80%E5%A7%8B)
