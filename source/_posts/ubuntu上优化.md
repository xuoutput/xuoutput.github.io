---
title: ubuntu上优化
date: 2018-02-14 23:12:55
tags:
- ubuntu
- vsc
- linux
categories:
- linux
comments: false
permalink:
---

# ubuntu16.04 上手要做的事

主要是

1. 音频播放器
2. 视屏播放器
3. 编程IDE vsc
4. 桌面美化

sudo apt-get update         //获取最新系统安装的软件版本列表
sudo apt-get dist-upgrade    //升级系统软件，不过这之前可以改个源，system setting，soteware中改aliyun或163的都可以
sudo apt-get autoremove     //自动移除没有依赖的软件
sudo apt-get autoclean      //删掉软件的升级的安装包

装个命令行vim  如果是物理机先搞显卡驱动

chmod 777 /etc/sudoers  默认是440，改完别退出sudo 然后编辑这个文件vim
不该也没事，这是改的没有密码的登录而已，然后再改回440


# 安装方式

详细情况见 [ubuntu上安装软件方法]()

1. sudo apt-get 
2. 如果是deb的可以使用
3. .tar.gz的先tar -x

# 安装mac主题包

sudo apt-get install gnome-tweak-tool

自己百度ubuntu14.04 mac