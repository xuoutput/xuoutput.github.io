---
title: emacs相关目录
date: 2020-01-29 22:31:46
tags:
- emacs
categories:
- emacs教程
comments: false
permalink:
---

# emacs相关目录


## emacs

两者可以共同使用
[mac 终端光标的快捷键操作](https://www.gowhich.com/blog/617)
[一年成为 Emacs 高手 (像神一样使用编辑器)](https://github.com/redguardtoo/mastering-emacs-in-one-year-guide/blob/master/guide-zh.org#%E8%8F%9C%E9%B8%9F%E6%80%8E%E4%B9%88%E5%BC%80%E5%A7%8B)

### 终端中的快捷键操作(这个是 emacs 操作)

常用的快捷键：
Ctrl + d 删除一个字符，相当于通常的 Delete 键（命令行若无所有字符，则相当于 exit；处理多行标准输入时也表示 eof）
Ctrl + h 退格删除一个字符，相当于通常的 Backspace 键
Ctrl + u 删除光标之前到行首的字符
Ctrl + k 删除光标之前到行尾的字符
Ctrl + c 取消当前行输入的命令，相当于 Ctrl + Break
Ctrl + a 光标移动到行首（Ahead of line），相当于通常的 Home 键
Ctrl + e 光标移动到行尾（End of line）
Ctrl + f 光标向前(Forward)移动一个字符位置
Ctrl + b 光标往回(Backward)移动一个字符位置
Ctrl + l 清屏，相当于执行 clear 命令
Ctrl + p 调出命令历史中的前一条（Previous）命令，相当于通常的上箭头
Ctrl + n 调出命令历史中的下一条（Next）命令，相当于通常的上箭头
Ctrl + r 显示：号提示，根据用户输入查找相关历史命令（reverse-i-search）

次常用快捷键：
Alt + f 光标向前（Forward）移动到下一个单词
Alt + b 光标往回（Backward）移动到前一个单词
Ctrl + w 删除从光标位置前到当前所处单词（Word）的开头
Alt + d 删除从光标位置到当前所处单词的末尾
Ctrl + y 粘贴最后一次被删除的单词

移动就是 f,b, a,e
删除 u, k, w, d, d, h
粘贴 y
历史 r

> 关闭 mac 上按 option 输出字符[MacOS 中如何关闭或禁用 Option（Alt）+ 键盘输出特殊字符(解决 oh my zsh 使 option f b 失效)](https://blog.csdn.net/gubenpeiyuan/article/details/52877603) 就是改下 items2 的 key 为+Esc

### 开启 emacs 入门

先安装再配置[GNU Emacs Download & installation](https://www.gnu.org/software/emacs/download.html#macos)

然而 brew 没有`--with-cocoa`的参数, 当你用`brew install emacs`后, 用`emacs --version`却看到版本不对诶

因为 mac 自带 emacs 在`/usr/bin/emacs`
删不掉这个自带的 emacs
[Delete /usr/bin/emacs - Operation not permitted](https://superuser.com/questions/1018810/delete-usr-bin-emacs-operation-not-permitted)
[Who installed this Emacs?](https://apple.stackexchange.com/a/108753)

在使用 brew 安装完之后 [更改系统自带旧版本](https://www.kancloud.cn/chandler/mac_os/480609)

在`~/.zshrc`中添加`alias emacs="/usr/local/Cellar/emacs/26.1_1/bin/emacs-26.1"`

看教程学下基本的知识[Fast and robust Emacs setup.](https://github.com/redguardtoo/emacs.d#checklist)

## 参考

ecmas
[mac 终端光标的快捷键操作](https://www.gowhich.com/blog/617)
[一年成为 Emacs 高手 (像神一样使用编辑器)](https://github.com/redguardtoo/mastering-emacs-in-one-year-guide/blob/master/guide-zh.org#%E8%8F%9C%E9%B8%9F%E6%80%8E%E4%B9%88%E5%BC%80%E5%A7%8B)
