---
title: vim代码缩进
date: 2020-02-06 21:37:34
tags:
---

# vim 代码缩进

- `tabstop`, `softtabstop` 和 `shiftwidth`,还有 `expandtab`
  - 文件中的 `tab` 符号和键盘上的 `Tab` 键不同
- 在Vim中还可以进行自动缩进，主要有 `cindent` 、 `smartindent` 和 `autoindent` 三种
- 换行 `wrap` 相关

## 文件中的 tab

你可搜索一下 `\t` 就行

### shiftwidth 和 expandtab

用于设置

- 换行时的自动缩进列数
- 行选择后，使用 `<` 或者 `>` 做缩进时，缩进的列数

疑问来了！

`shiftwidth` 引入的缩进，是 `Tab` 还是 `Space`?

从测试来看

- 如果 `expandtab` 开启是 `Space`
- `noexpandtab` 且 `softtabstop` 与 `tabstop` 一致时，是 `TAB`(`\t`) 符号。

那就是说，如果在 PHP 代码文件中，不对 Tab 做自动转换，那么代码中的缩进就是 `Space` 与 `Tab` **混用**的。

> 所以一定要设置, 我觉得都设置为 `space` 就好了
> 这里是换行按回车引入的自动缩进的格式

### 实践出真知：tabstop 与 softtabstop 的区别

`softtabstop` 很好理解，即在 `insert` 模式下，一个 `tab` 键按下后，展示成几个 `space` 。 而 `tabstop` 就不好理解了，需要动手测试一下,

> 简单讲就是在开启 `noexpandtab` 的情况下, `tabstop`设置连续多少个 `space` 合成一个 `tab`

### 总结

`tabstop`和 `noexpandtab`一起用, 设置一个 `tab` 遇到几个 `space` 转变

`softabstop` 常用在 `expandtab` 的模式下, 按下 Tab 键 显示几个 space, 以及 `<back space>` 一次删除几个

`shiftwidth`是换行时进行缩进. 用到的缩进看 `expandtab`

- tabstop 选项只修改 tab 字符的显示宽度, 一个 tab(`\t`) 由几个 `space` 替换
- softtabstop 选项修改按 Tab 键应该增加几个 `space` 的行为
- expandtab 选项把**新插入**的 tab 字符替换成特定数目的空格,(显示为 `space`, 不影响原有文件自带的\t)。`noexpandtab` 表示会合并, space 和\t 混用

> 避免用 Tab 键插入 tab 字符进行对齐缩进时，在其他软件上查看文件可能会出现排版异常。

```vimrc
" 解决 shiftwidth 和 tabstop 不等时的麻烦
set smarttab
" 输入Tab字符时,自动替换成空格, 也就不用管 tabstop了  
set expandtab
" 自动缩进时,缩进长度为2
set shiftwidth=2
" softtabstop的值为负数,会使用shiftwidth的值,两者保持一致,方便统一缩进.
set softtabstop=-1

" 或者
set noexpandtab
set tabstop=4
set softtabstop=4
set shiftwidth=-1
```

## indent

常用 autoindent 和 smartindent

`autoindent` 在这种缩进形式中，新增加的行和前一行使用相同的缩进形式。

`smartindent` 在这种缩进模式中，每一行都和前一行有相同的缩进量，同时这种缩进形式能正确的识别出花括号，当遇到右花括号`}`，则取消缩进形式。此外还增加了识别C语言关键字的功能。如果一行是以#开头的，那么这种格式将会被特殊对待而不采用缩进格式。

使用快捷键 `>>` 和 `<<`

## 参考

[VIM 中 tabstop 与 softtabstop, shiftwidth 的区别 6](https://www.sunzhongwei.com/difference-between-vim-tabstop-and-softtabstop-shiftwidth)
[vim 技巧：详解 tabstop、softtabstop、expandtab 三个选项的区别 666](https://segmentfault.com/a/1190000021133524?utm_source=tag-newest)
[tab相关 666](https://www.cnblogs.com/panliang188/archive/2010/04/20/1715836.html)
