---
title: manjaro上安装软件
date: 2018-06-10 23:14:51
tags:
- linux
- manjaro
categories:
- linux
comments: false
permalink:
---
# manjaro上安装软件

## 设置源

见[pacman源添加及]

## 常用软件

安装中文输入法 (有问题)
安装搜狗拼音
sudo pacman -S fcitx-sogoupinyin
sudo pacman -S fcitx-im # 全部安装
sudo pacman -S fcitx-configtool # 图形化配置工具
之后更改 ~/.xprofile
nano ~/.xprofile 
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
最后在命令行输入fcitx就可以使用了

**chrome**

在配置最后加了的话直接`sudo pacman -S goole-chrome`可以搜到安装

```javascript
# USTC
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```


kde下 下拉的用yakuake 而不是gnome的 guake