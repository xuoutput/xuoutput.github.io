---
title: DevCloud手动安装软件
date: 2020-02-29 10:44:55
tags:
- devcloud
categories:
- devcloud教程
comments: false
permalink:
---

# DevCloud 手动安装软件

先看下下面的两个, 主要是利用 iterm2 根据设置的 profile 来新开一个 ssh 链接

[使用 iTerm2 Profiles 快捷登录 ssh](https://blog.csdn.net/Soinice/article/details/97559183)
[linux expect 详解(ssh 自动登录)](https://www.cnblogs.com/lzrabbit/p/4298794.html)
[expect - 自动交互脚本](http://xstarcd.github.io/wiki/shell/expect.html)

> `expect` 简单设置, 但在 iterm 上有个区别, 不能用 `command`,而是还是用 `login shell`, 指定到 `expect.sh` > `chmod 755` 我设置了, 和写普通脚本一样

目标, 配置好一个能用的 Neovim 编辑器, 主要是 `neovim`, `zsh`, `ranger`, `tmux`, `python`, `nvm`, `node`
首先安装好 iFt, 因为内部源`yum`的软件版本太低了, 通过 iFt 来传输到远程

下载 zsh yum install zsh
通过修改 zsh 的中添加环境变量来修改一些.xxrc 的位置, 可以都放到.config 下, 方便 git 管理
zshrc 使用 `ranger` 前配置好 `vim`的 `EDITOR` 环境变量

下载 [vim-8.2.0330](https://github.com/vim/vim/releases), 下载下来也是源码包, [进行安装](https://www.vim.org/git.php)
记得删除 centos 上的自带的 `yum erase vim` 就是 `vim-enhanced`

```vim 7
vim-enhanced              x86_64              2:7.4.160-1.el7              installed              2.2 M
```

```vim
$ ./configure
$ make
$ sudo make install
```

下载 [vim-plug](https://github.com/junegunn/vim-plug#unix)

```unix
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

配置 `~/.vimrc`, 然后安装插件 `:PlugInstall`

下载 [neovim Linux (x64)](https://github.com/neovim/neovim/releases)
`chmod u+x nvim.appimage && ./nvim.appimage`, 放到 `/usr/local/bin`, 也不用软连接重新命名

> 还是有会生成 `~` 的问题

下载 [ranger Installing from a clone](https://github.com/ranger/ranger#installing-from-a-clone)
启动就只需要运行 `ranger.py`, 创建软连接 `ln -s /usr/local/bin/ranger-1.9.3 /usr/local/bin/ranger`
[Configuration files](https://github.com/ranger/ranger/wiki/Official-User-Guide#configuration-files)
配置 ranger, `ranger --copy-config=all`

版本控制
在 `rc.conf` 中开启 `set vcs_aware true` 即可.

插件

图标
执行 `git clone git@github.com:alexanderjeurissen/ranger_devicons.git ~/.config/ranger/plugins/ranger_devicons` 就行, 退出再启动 `ranger` 就可以看到效果.

> 需要安装字体 [nerd-fonts Option 6: Ad Hoc Curl Download](https://github.com/ryanoasis/nerd-fonts#option-6-ad-hoc-curl-download), 在本机的终端模拟器上选择就好, 远程 devcloud 可以不用装
> [CentOS 7 安装字体库 & 中文字体](https://www.giserdqy.com/os/centos/11978/)

```fc
fc-list # 查看有哪些字体
在 /usr/local/share/fonts下建一个目录，把字体拷贝进来

进入目录执行：

mkfontscale
mkfontdir
fc-cache -fv
```

字体不知道怎么回事, 反正用终端模拟器登录的, 用 iterm 就行, 能够正常显示 WETERM 不行, 还得设置下字体

`bat` 代替 `cat`
bat 用 yum 安装不到, 所以只能用[源码安装](https://github.com/sharkdp/bat#from-source)了, 需要 [rust](https://www.rust-lang.org/zh-CN/tools/install)

```rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

安装完后配置下 cargo 到你的 环境变量 PATH

然后安装 bat `cargo install bat`,
不成功就安装依赖 `yum install 'libclang*'`, 但 devcloud 上没有这个, 那就要搞 llvm 了
要不用 [docker 安装 bat](https://github.com/sharkdp/bat#via-docker)
devcloud 自带 docker 18.09.7

```bash
docker pull danlynn/bat
# 然后添加alias
alias bat='docker run -it --rm -e BAT_THEME -e BAT_STYLE -e BAT_TABS -v "$(pwd):/myapp" danlynn/bat'
```

> 但用 docker 安装的 bat 无法在 ranger 中使用, 所以 还得下一个
> 在 [release 页面中](https://github.com/sharkdp/bat/releases) 选中 **bat-v0.13.0-x86_64-unknown-linux-musl.tar.gz** 下载

然后设置下软连接 ln -s

这个效果要在 ranger 中体验, 需要用 fzf 这个
fzf 的安装看
{% post_link 命令行模糊查找器fzf 命令行模糊查找器fzf %}
fzf 安装时用 `fd` 代替 `find`

`npm install -g fd-find`

[w3m](http://w3m.sourceforge.net/) 安装用来预览图片

```
./configure
make
make install
```

如果在 `./configure` 时报错, `error: gc.h not found` 就 `yum install libgc`
是在不行就源码安装, [参考文章 gc.h](https://www.crifan.com/mingw_w3m_configure_error_gc_h_not_found/)
[下载地址 gz.tar.gz](https://www.hboehm.info/gc/gc_source/)

然后

```
./configure
make
make install
```

下载 [linux/unix 源码 Python Source Releases](https://www.python.org/downloads/source/)

```bash
tar xfvz Python-3.8.2.tgz
cd Python-3.8.2
./configure --with-ssl
make
sudo make install
```

`./configure --with-ssl` 是因为 ssl 的问题, 在安装 `ranger` 相关的 `ueberzug` 遇到的
[python3 中 pip3 安装出错，找不到 SSL](https://blog.csdn.net/jeryjeryjery/article/details/77880227)
ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
试着安装 `pip3 install --upgrade setuptools` 后再试试, 不行
ModuleNotFoundError: No module named '\_ctypes' 这个问题呢

[关于在 centos 下安装 python3.7.0 以上版本时报错 ModuleNotFoundError: No module named '\_ctypes'的解决办法](https://blog.csdn.net/qq_36416904/article/details/79316972)
python3 中有个内置模块叫 ctypes，它是 python3 的外部函数库模块，提供了兼容 C 语言的数据类型，并通过它调用 Linux 系统下的共享库(Shared library)，此模块需要使用 centos7 系统中外部函数库(Foreign function library)的开发链接库(头文件和链接库)。
由于在 centos7 系统中没有安装外部函数库(libffi)的开发链接库软件包，所以在安装 pip 的时候就报了"ModuleNotFoundError: No module named '\_ctypes'"的错误。

试试, 只搞定一部分

```
sudo yum -y install gcc gcc-c++
sudo yum -y install zlib-devel
sudo yum -y install libffi-devel
$ ./configure --with-ssl
$ make
$ sudo make install
```

```yum
yum groupinstall 'X Window System' -y  # x11
yum install 'libX*' --setopt=protected_multilib=false # x11 反正都按上
```

根据错误查找这个头文件在哪

```yum
Xshm/Xshm.c:7:33: fatal error: X11/extensions/XShm.h: No such file or directory
 #include <X11/extensions/XShm.h>
yum provides '*/XShm.h' # 这个命令好啊, 可以看这个库在哪些位置上

libXext-devel-1.3.3-3.el7.x86_64 : X.Org X11 libXext development package
Repo        : os
Matched from:
Filename    : /usr/include/X11/extensions/XShm.h
```

发现在 `/usr/include/X11/` 而不是在 `/usr/local/include/X11/`, 所以建一个软链接试试

其实是没装吧
yum install 'libXext-devel\*'

下载安装 node

下载安装 [tldr](https://github.com/tldr-pages/tldr#clients), 有多种方式安装. 可以用 zsh 的插件管理,而不是单独安装
`npm install -g tldr`

[配色 tldr-node-client](https://github.com/tldr-pages/tldr-node-client/#configuration)
可以自定义, 颜色预览在 [chalk](https://github.com/chalk/chalk#styles), 但在[云主机上颜色不生效](https://github.com/tldr-pages/tldr-node-client/issues/276)

使用 `FORCE_COLOR=2 tldr tar | cat -v` 应该可以看到 `^[[` 开头的颜色序列, 学过脚本的应该熟悉
使用 `tldr --theme=ocean tar` 看下效果, 应该可以.

```tldrrc
{
  "pagesRepository": "https://github.com/tldr-pages/tldr",
  "repository": "https://tldr-pages.github.io/assets/tldr.zip",
  "themes": {
    "simple": {
      "commandName": "bold, underline",
      "mainDescription": "bold",
      "exampleDescription": "",
      "exampleCode": "",
      "exampleToken": "underline"
    },
    "base16": {
      "commandName": "bold",
      "mainDescription": "",
      "exampleDescription": "green",
      "exampleCode": "red",
      "exampleToken": "cyan"
    },
    "ocean": {
      "commandName": "bold, cyan",
      "mainDescription": "",
      "exampleDescription": "green",
      "exampleCode": "cyan",
      "exampleToken": "dim"
    },
    "inverse": {
      "commandName": "bold, inverse",
      "mainDescription": "inverse",
      "exampleDescription": "black",
      "exampleCode": "inverse",
      "exampleToken": "green, bgBlack, inverse"
    },
    "matrix": {
      "commandName": "bold",
      "mainDescription": "underline",
      "exampleDescription": "green, bgBlack",
      "exampleCode": "green, bgBlack",
      "exampleToken": "green, bold, bgBlack"
    },
    "authorCoolTheme": {
      "commandName": "bold, red",
      "mainDescription": "underline",
      "exampleDescription": "yellow",
      "exampleCode": "underline, green",
      "exampleToken": ""
    }
    "myOwnCoolTheme": {
      "commandName": "bold, yellow",
      "mainDescription": "underline",
      "exampleDescription": "green",
      "exampleCode": "cyan",
      "exampleToken": "underline, magenta"
    }
  },
  "theme": "myOwnCoolTheme"
}
```

[npm: relocation error: npm: symbol SSL_set_cert_cb, version libssl.so.10 not defined in file libssl](https://blog.csdn.net/test1280/article/details/102937023)
需要升级 openssl 库 `yum update openssl -y`

## 开发 ems

貌似都没有设置就能下载内网和外网的 git 资源, 等会了解下应该有配置的

```git
$ git config --list
http.proxy=http://devnet-proxy.oa.com:8080
https.proxy=http://devnet-proxy.oa.com:8080
url.git@git.code.oa.com:.insteadof=http://git.code.oa.com/
```

然后安装 tea-cli, tnpm, 等
whistle 本地配好了, 应该只需要改下配置就行, 开发还需要配置下 vsc 链接

### 配置安装

[NPM 配置](http://cbm.pages.oa.com/#/environment-and-tools/npm-configuration)
这个链接只需要看清除, 也就是下面代码
清除可能会导致代理失效的配置

#### 清除已有 proxy

```
npm config delete proxy
npm config delete http-proxy
npm config delete https-proxy
```

##### 清除 npm 缓存

```
npm cache clean -f
```

[外网如何搭建 tea 开发环境](http://km.oa.com/articles/show/442012)
再看这个链接

tnpm 啥的再说

#### devcloud 上配置 tea

远程 devcloud 上

```npm
npm i @tencent/tea-cli -g --registry=http://r.tnpm.oa.com
```

[Tea 命令行工具](http://tapd.oa.com/tcp_access/markdown_wikis/#1020399462010989087)

安装完按后需要去申请开通[oa 策略](http://ticket.oa.com/net_access_control/input)

源 ip 自已的 devcloud 机器 ip
目的 ip 10.240.64.172
端口 80

配置 wetern, iterm, vscode 进入远程的 ssh 的 config

```ssh config
# WeTerm 配置代理访问devcloud
Host *.mnet2.com WeTerm
  ProxyCommand /Applications/WeTERM.app/Contents/Resources/app/external/corkscrew 127.0.0.1 12679 %h %p
  ServerAliveInterval 10

# iterm
Host *.mnet2.com
 ProxyCommand corkscrew 127.0.0.1 12639 %h %p
 ServerAliveInterval 10
 ControlMaster auto
 ControlPath ~/.ssh/master-%r@%h:%p

Host 9.*
 ProxyCommand corkscrew 127.0.0.1 12639 %h %p
 ServerAliveInterval 10
 ControlMaster auto
 ControlPath ~/.ssh/master-%r@%h:%p

Host 10.*
 ProxyCommand corkscrew 127.0.0.1 12639 %h %p
 ServerAliveInterval 10
 ControlMaster auto
 ControlPath ~/.ssh/master-%r@%h:%p

Host 172.*
 ProxyCommand corkscrew 127.0.0.1 12639 %h %p
 ServerAliveInterval 10
 ControlMaster auto
 ControlPath ~/.ssh/master-%r@%h:%p

# git.io 代理
Host git.code.oa.com
Port 22
User hengxu
ProxyCommand /usr/local/bin/corkscrew 127.0.0.1 12639 %h %p
IdentityFile ~/.ssh/id_rsa

# devcloud vscode
Host 9.134.145.90
  User root
  HostName 9.134.145.90
  Port 36000
  ProxyCommand /usr/local/bin/corkscrew 127.0.0.1 12639 %h %p
```

[tmux](https://github.com/tmux/tmux#from-release-tarball) 从 github 上下载源码,直接执行安装 可能缺依赖 `libevent` 但你 `yum info libevent`发现是安装了的, 这个时候试试全安装 `yum install 'libevent*'`

```bash
./configure && make
sudo make install
```

或者还是直接去 [release 下载一个 AppImage 格式的直接运行](https://github.com/tmux/tmux/releases)

然后装 [Oh My Tmux!](https://github.com/gpakosz/.tmux)

```bash
cd
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
cp .tmux/.tmux.conf.local .
```

安装完后记得 `tmux kill-server`

插件管理 [tpm](https://github.com/tmux-plugins/tpm#tmux-plugin-manager)
记得 source, 然后安装

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

```

然后就是 clipboard 的问题, 目前默认是选中后复制, 但如果用的是 devcloud 就有问题, 所以需要将[该功能关闭](https://github.com/gpakosz/.tmux/issues/311)

然后手动安装 [xclip](https://github.com/astrand/xclip/blob/master/INSTALL), 要多几步.

安装完但还是出现问题 `Error: Can't open display: (null)`
这时 需要配置下 `DISPLAY=:0`
[solution1](https://github.com/microsoft/WSL/issues/4933)
[solution2](https://stackoverflow.com/questions/18695934/unable-to-copy-ssh-id-rsa-pub)
但还是有问题, 结论是没有装 服务器呗, 试试 `XMing`


git 版本太旧了, 去 github 上下载源码, tar 包, 然后

**记得先删除 `yum remove git`**

```bash
make
make install
```

第一步的时候可能出现 `#include curl/curl.h ^ compilation terminated` 然后就安装下 `yum install 'libcurl*'`

找不到 : `#include <expat.h>` 安装 `yum install 'expat*'`

> 升级了最新的 git 至少 2.22 之后,才能用某些新的快捷命令
> `tig` 装个挺不错的

也是下载源码包后

```bash
make
make install
```

By default, tig is installed in \$HOME/bin. To install tig elsewhere set prefix to the desired path:

```bash
make prefix=/usr/local
sudo make install prefix=/usr/local
```

Documentation files, such as manpages, are distributed in the release tarballs, and can be installed using:

`make install-doc`

## FAQ

注意 mac 上的配置不能直接在 devcloud 上用, 所以有些配置如果不生效, 记得注释下某些插件 例如 zsh 的 plugins 中的

tnpm

`npm install @tencent/tnpm -g --registry=http://r.tnpm.oa.com --verbose`
