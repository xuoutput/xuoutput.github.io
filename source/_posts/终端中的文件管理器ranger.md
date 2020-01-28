---
title: 终端中的文件管理器ranger
date: 2020-01-24 16:32:01
tags:
- vim
- console
categories:
- vim
comments: false
permalink:
---

# 终端中的文件管理器ranger

mac上直接 `brew install ranger`

## 问题

可能遇到安装不上, 那就按提示安装

```vim
$ brew install ranger
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: An exception occurred within a child process:
  CompilerSelectionError: ranger cannot be built with any available compilers.
Install GNU's GCC:
  brew install gcc


$ brew install gcc
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: The following formula
  gcc
cannot be installed as binary package and must be built from source.
Install the Command Line Tools:
  xcode-select --install
```

最后安装 `xcode-select --install` 即可

## 安装imgcat

下载imgcat脚本地址中的内容并重命名为 `imgcat` 然后设置权限,内容中可以自己设置图片格式.

> 有可能不是立即生效, 关了iterm2或重启下电脑就可以了
> 在tmux中可能不生效 看PR解决了,但我没试出来 [imgcat has problems with `tmux`](https://github.com/campoy/tools/issues/11)

```vim
curl "https://iterm2.com/utilities/imgcat" > imgcat
chmod +x imgcat
sudo mv imgcat /usr/local/bin
```

[Inline Images Protocol 介绍](https://iterm2.com/documentation-images.html)
[imgcat 脚本](https://iterm2.com/utilities/imgcat)
[利用iterm2 在命令行预览图片 服务器也是可以的](https://www.jianshu.com/p/1372e3c910fc)

## 基本操作

[linux终端文件管理器ranger使用详解](http://www.mikewootc.com/wiki/linux/usage/ranger_file_manager.html)

## 参考

[文件管理器Ranger安装和使用教程 66](https://www.bilibili.com/video/av26947240/)
[最好的文件管理器：Ranger - 基础介绍以及部分进阶功能 - Linux学习日记 #2](https://www.bilibili.com/video/av54841601)
[ranger 1.9.3](https://github.com/ranger/ranger)
[Linux文件管理器ranger #31](https://github.com/itgoyo/500Days-Of-Github/issues/31)
[linux终端文件管理器ranger使用详解 66](http://www.mikewootc.com/wiki/linux/usage/ranger_file_manager.html)
[[Ranger – 给命令行用户一个基于文本的文件管理器](https://linux.cn/article-1995-1.html#3_3958)
]
