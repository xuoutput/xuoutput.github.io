---
title: linux操作系统编程
date: 2020-02-11 23:18:07
tags:
- linux
categories:
- linux教程
comments: false
permalink:
---

肯.汤普森, 丹尼斯.利齐

伯克利计算机研究

标准化 IEEE POSIX, ANSI C

GNU 理查德.斯托曼

林纳斯.托瓦兹

# linux 操作系统编程

看这个视频:[Linux 操作系统编程](http://www.icourse163.org/learn/UESTC-1003040002?tid=1206878228#/learn/announce)能够把学习 os 和 linux 命令一起记忆了, 尤其是记忆 linux 命令.

还能即 rwx 权限问题, 目录的 inode 问题

## 常用 UNIX/Linux 命令

### 文件目录命令

- 浏览目录命令:ls pwd
- 目录操作命令:cd mkdir rmdir
- 浏览文件命令:cat(bat) more less head tail
- 文件操作命令:cp rm mv find(fd) grep tar

### 进程控制类命令

- 查看系统中的进程命令:ps top
- 控制系统中的进程命令:kill killall nice renice
- 进程后台运行命令 &
  - `# cp –r /usr/* test &`
- 进程的挂起和恢复
  - 进程的中止(挂起)和终止
    - 挂起(Ctrl+Z)
    - 终止(Ctrl+C)
  - 进程的恢复
    - 恢复到前台继续运行(fg) `fg [n]`
    - 恢复到后台继续运行(bg) `bg [n]`
  - 查看被挂起的进程(jobs)

### 用户及权限管理类命令

- 用户管理类命令:useradd usermod passwd userdel su id whoami w finger
- 用户组管理类命令:groupadd groupmod groupdel
- 文件权限管理类命令:chmod chown chgrp

## 参考

[Linux 操作系统编程 666](http://www.icourse163.org/learn/UESTC-1003040002?tid=1206878228#/learn/announce)
