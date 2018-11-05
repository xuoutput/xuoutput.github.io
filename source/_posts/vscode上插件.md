---
title: vscode上插件
date: 2018-04-18 18:45:50
tags:
- vscode
- 快捷键
- 插件
categories:
- 前端
comments: false
permalink:
---

# vscode上插件

## setting sync

Settings Sync这个插件可以通过github上面的gist来同步你的vscode的配置包括插件,自定义按键设置。还能够分享给别人使用。主要用在换电脑.

1. 首先当然是下载vscode 然后安装Setting Sync

![1](1.jpg)

2. 按ctrl+shift+p 填入sync可以看到所有命令

![2](2.jpg)

3. 然后选择update的 快捷键是alt+shift+u

4. 会弹出一个github的登录页,登录有进入Developer settings => personal access token.这里设置好gist, 然后会生成一个token

![3](3.jpg)

5. 再按下alt+shift+u就输入好了,最后会上传上去,然后就是得到一个token和gist ID .

6. 使用备份就是下载好vscode之后, 安装Setting Sync, 然后按ctrl+shif+p 搜sync 选download.(快捷键 alt+shift+d 当然同上),然后输入token在gist ID . 插件下载要等一会 

7. 不行的话 reset下 有个Reset Extension Setting

总结下:
1. 先去自己的github中的personal access token中获取token
2. 在使用alt+shift+u上传,这里使用token,得到gist ID
3. 使用这个备份,alt+shift+d,一次输入token和gist ID, 然后就是等待下载咯.

比如
GitHub Token: 234e5dc413b0b00f7073698c945b116d82fa2951
GitHub Gist: 347db9e402bbc26b2ebbeddbabc46be1
GitHub Gist Type: Secret