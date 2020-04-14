---
title: vim实用技巧
date: 2020-02-20 16:42:25
tags:
- vim
categories:
- vim教程
comments: false
permalink:
---

# vim 实用技巧

```vim
:h vimtutor
```

会了点 vim 基本操作后, 别急着看这本书, 先去试试安装各种 `vim-plug` 试试自己玩快捷键. 最后再看看这个书
至少得玩过这几方面的快捷键和 chajian

window, buffer, tags
可视模式
剪贴板 寄存器
宏 q

## 书中

缩进 `>>` 当然`>G >gg`
d
x
. 重复上一次, 其实就是个宏 q{.}, {count}@{.}. 但不能记录 hjkl 移动的这种(因为这种操作你可以定位后再执行), @: 都可以重复上次的命令 & 
cc C==c\$ s==cl S==^c(替换了保存) 这个主要用ciw这种吧
c后面是接位置的动作
`o==A<CR>` O==ko
以退为进 f ;是重复上次的f或t `,` 是跳回去



## 参考
