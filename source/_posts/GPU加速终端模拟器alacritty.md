---
title: GPU加速终端模拟器alacritty
date: 2020-02-02 21:57:20
tags:
- terminal
categories:
- 终端模拟器教程
comments: false
permalink:
---

# GPU 加速终端模拟器 alacritty

对着默认配置来修改你的配置, 主要是字体和主题. 每次修改完字体都需要退出重启终端模拟器
[默认配置 alacritty/alacritty.yml](https://github.com/alacritty/alacritty/blob/dea7a0890a724c50bc5767039f45a2e3d071ee1c/alacritty.yml#L417-L638)

> `ranger` 你修改完字体后按 `q` 会自动退出 `alacritty` 不必担心这个是bug

## 修改字体

建议字体设置为 **Hack Nerd Font** 字体
安装[ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts#font-installation)

> 这样使用 `ranger` 也可以看到图标以及中文正确显示

```yml
# Font configuration (changes require restart)
font:
  # The normal (roman) font face to use.
  normal:
    family: Hack Nerd Font
    # Style can be specified to pick a specific face.
    style: Regular

  # The bold font face
  bold:
    family: Hack Nerd Font
    # Style can be specified to pick a specific face.
    # style: Bold

  # The italic font face
  italic:
    family: Hack Nerd Font
    # Style can be specified to pick a specific face.
    # style: Italic
```

[Changing the default font](https://github.com/alacritty/alacritty/wiki/Changing-the-default-font)

## 主题

虽然在wiki上有 [Color schemes](https://github.com/alacritty/alacritty/wiki/Color-schemes) 但这里并不直观,及时我们配置好主题颜色后是立即显示的, 你可以直接去 [eendroroy/alacritty-theme](https://github.com/eendroroy/alacritty-theme) 预览, 然后再会去选择颜色主题配置信息. 我选了  **Breeze**

## FAQ

如果在 alacritty 中无法显示配置信息, 或者说在 `~/.config/alacritty/alacritty.yml`填入配置信息后, 终端模拟器无法启动, 那么试图在你的 bash配置中 加入一句 `export LC_ALL=en_US.UTF-8`

同理, 如果你 `vim xxx` 编辑文件的时候碰到

```bash
Warning: Failed to set locale category LC_NUMERIC to en_CN.
Warning: Failed to set locale category LC_TIME to en_CN.
Warning: Failed to set locale category LC_COLLATE to en_CN.
Warning: Failed to set locale category LC_MONETARY to en_CN.
Warning: Failed to set locale category LC_MESSAGES to en_CN.
```

也是这个解决办法

```zsh
vim ~/.bash_profile
Inside the file .bash_profile, insert the following line:

export LC_ALL=en_US.UTF-8

source ~/.bash_profile
```

`ranger` 中无法显示中文或者图标问题, 那么可以安装 [ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts#font-installation) 尤其是你使用 vim插件[ryanoasis/vim-devicons](https://github.com/ryanoasis/vim-devicons) 来配置图标

## Keyboard mappings

使用默认配置就好, 如果然后根据自己的系统来解注释, 例如mac系统是 `547` 行 `# (macOS only)`

注意自定义的有个bug,貌似不能用 shell 命令来打开文件

[How to open vim buffer via key bindings](https://github.com/alacritty/alacritty/issues/3222)

## 参考

[alacritty: A cross-platform, GPU-accelerated terminal emulator](https://github.com/alacritty/alacritty)

[默认配置 alacritty/alacritty.yml](https://github.com/alacritty/alacritty/blob/dea7a0890a724c50bc5767039f45a2e3d071ee1c/alacritty.yml#L417-L638)
