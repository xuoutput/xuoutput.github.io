---
title: vim插件
date: 2020-02-09 16:46:35
tags:
- vim
categories:
- vim教程
comments: false
permalink:
---

# vim插件


vim-cheat40

nerdcommenter 注释的
  - leader默认是`\`, 你可以改下,或者map成vsc一样的
  - [preservim/nerdcommenter](https://github.com/preservim/nerdcommenter)
vim-surround 括号,引号, htmltag的
  - [tpope/vim-surround](https://github.com/tpope)安装 (**改变cs 大写的S是一行, 删除ds, 插入ys**)
  - `cs"'`(只能单行 v不行) 或全部 `cst"'`(这个是改html的)
  - `ds"` 删除
  - `ysiw]/[` 用`[` 会多一个空格 `[ hello ]` 而不是`[hello]`
    - 使用 `cs]{` 也会增加一个额空格, 左空格, 右无
  - `yssb` or `yss)` 整行增加
    - `ys` 是一个 your surround 一个 test object, `yss` 是当前行
  - visual 模式下, 用S包上整个选中的
  - 重复的 `.` 需要安装 `tpope/vim-repeat`
switch
Tabularize
q是开启录制宏
simplyFlod
Tagbar c-i/o
vim-signture
semshi
coc.nvim 插件可以管理剪贴板, 找同作用域内同名变量, 跳转. coc也可以装插件
Far.vim 也是查找内容, 跳转
Undotree
  - 配置 `<F5>`
FZF 找文件, 在创建一个窗口后按 fzf 搜索, 这个fzf除了单独用, 也可以在ranger中用
NERDTree 仍然是一个窗口
  - 使用hjkl来移动, 主要还是jk,hl没用
  - 打开用enter
  - nerdtree-git-plugin 这个也是, 要在终端中进入当前项目目录才能正确显示git情况, 不好用, 还不如ranger
markdownpreview.nvim
vim-table-mode
  - 也直接使用vim-plug安装
  - 使用 `<leader>tm` 在normal模式下开启tm模式
  - 配置下, 在inset模式下`||` 或 `__` 也能开启 就不用单独开启了
  - `airline-tablemode.vim` 插件来显示当前是什么模式下
  - 使用`|` 在输入列名, 然后在按 `|` .第二行用 `||`就直接显示对齐方式或结束的
  - `<Leader>tr` 格式化下?
  - 选中后CSV的格式用`,` 隔开的用 `<Leader>tt` 转换,为|
  - 移动 `[|` `]|` `{|` `}|` 左右 上下
  - 删除行 `<Leader>tdd` 直接用dd好了 列 `<Leader>tdc`
  - `airline-tablemode` 显示当前进入了table-model
md-snippests
vim-startify 相当于welcome页
  - 和NERDTree的配置有点冲突, 要去掉 **当不带参数打开Vim时自动加载项目树**
airline 地下状态栏
neoclide/coc.nvim
  - 代替YCM的自动补全
  - 安装有点慢, 用 `CocInfo` 看信息, `CocConfig` 看配置
  - `CocList extension` 看安装的
  - `CocInstall coc-html` 安装

unimpaired 一些快捷键按钮
  - 很好用

- 常用命令的快捷
  - 对于buffer, [b B 这个前后一个,最前最末一个
  - 其他的暂时没用到
- 行操作(**都用**)
  - [space 插入空行
  - [e 交换
- toggle的按钮
  - []ow, oh oi, od 常用的wrap,搜索的高亮和大小写不敏感, diff, **常用**
  - on or 数字的显示不常用
  - ol ou ox, ob, ol, os 鼠标所在行列高亮, 背景, 末尾符号显示, 都不常用,拼音检查
- 编码
  - [x, [u, [y 使用xml, URLEncode, c的转义

identLine py用的
python-syntax
taglist

vim-multiple-cursor
emmet
snippets(sirver/ultisnips)



## 参考

[21世纪最强代码编辑器：NeoVim ——就是这些设置让它变成了编辑器之鬼 【附配置与插件教程】](https://www.bilibili.com/video/av67091857)
