---
title: 'shell,终端terminal,TTY区别'
date: 2020-01-29 19:25:18
tags:
- shell
- terminal
- tty
categories:
- 终端教程
comments: false
permalink:
---

# shell,终端 terminal,TTY 区别

## 什么是 Shell

`Shell`(Unix Shell)是一种**命令行解释器**，是 Unix 操作系统下最传统的人机接口。 在 Shell 中，用户可以通过输入程序名称来执行某个程序， 最初计算机用户就是通过 Shell 来让计算机执行任务的。 今天在 Linux 和 Mac 中大量使用的 Shell 包括`CSH`，`Bash`，`ZSH`等。

### 什么是 Shell 命令

Shell 命令就是我们常说的**Linux 命令**，这些命令可以分为两类：

- 一类是`Shell Builtin`，这和 Shell 类型有关。例如`Bash`中有`echo`, `pwd`等。
- 一类是`PATH`下的软件，比如`/usr/bin下`的`ls`, `mkdir`等。

### shell 脚本

Shell 编程是**一系列`Shell`**（通常指 Bash）命令写在**一个文件**中，以**批量地去执行**。 这个文件便是**Shell 脚本**，其中包含了要被顺序执行的 Shell 命令。

这些 Shell 脚本一般命名为`*.sh`来表示通过 Shell 来执行。 Shell 脚本第一行通常会包含当前脚本文件的解释器，比如`#!/usr/bin/bash` 是指用户执行该脚本时，用 Bash 来解释执行。

## 什么是 Terminal

Terminal（终端）是指**计算机的一台设备或一个软件**， 它可以接受**键盘输入**传送给计算机， **并通过屏幕或打印机来显示计算机传送来的字符输出**。 早期的终端就是一台打字机（`teletypewritter`，`TTY`）， 因此`TTY`和`Terminal`是**同义词**。 至今 Linux 操作系统都会提供若干个 TTY 终端（按下 Ctrl+Alt+F1 即可进入）。
在终端中键盘输入某些命令后, **终端会发送到 shell 中**

> 终端一词最初是指电缆末端的那台**设备**，是从电子学的角度上进行命名的。 在 Linux 术语中，TTY 其实是一个扩展的**流设备**。

## 终端模拟器 Terminal Emulators

除了系统内核外，`Terminal Emulators`（终端模拟器）也可以提供 Terminal， 这些由**终端模拟器提供的 Terminal**通常称为`Pseudo-TTY`。
使用终端模拟器来提供 Terminal**主要是为了方便使用**，通常一个终端模拟器**可以打开多个终端**。 比如在 GUI 图形界面 X Windows 系统中常用的`Xterm`，`GNU Screen`，`SSH`， GNome 中的 Terminal，KDE 中的`Konsole`，Mac 下常用的`iTerm2`等。这些软件都属于 `Terminal Emulator`。

> 一般使用 GUI 界面的系统,都会提供终端模拟器,是一个用来模拟 Linux 终端的程序,功能也比终端上多.

## 什么是 Console

`Console`（控制台）通常是指**一台设备、一个软件或一个操作系统的 Primary Terminal**。 Console 的叫法是从**物理意义**上来的，直接连在设备上的那个终端就叫 Console，**每个设备通常只有一个 Console**。 比如 Chrome 的控制台，交换机的管理终端。

## PTY, VT

在 `/dev/tty{1-N}` 可以看到 Linux 的 `TTY` 设备**有多个**。可以按下 `Ctrl+Alt+数字` 在不同的 TTY 之间切换。

它们都不是 Console 本身，其实准确地讲不叫 TTY。是为方便多用户使用而提供的虚拟设备， 叫做 `pseudotty（PTY）`， 也叫 `Virtual Terminal（VT）`，`Virtual Console（VC）`。

## 终端推荐

[alacritty: A cross-platform, GPU-accelerated terminal emulator](https://github.com/alacritty/alacritty)

## 参考

[什么是终端、终端模拟器、Shell？Linux 下终端模拟器推荐！ - ·Manjaro + i3wm」 - Linux 学习日记#6](https://www.bilibili.com/video/av55295630)
[Shell 的相关概念和配置方法](https://harttle.land/2016/06/08/shell-config-files.html)
