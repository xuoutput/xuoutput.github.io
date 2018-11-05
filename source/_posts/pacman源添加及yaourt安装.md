---
title: pacman源添加及yaourt安装
date: 2018-06-10 11:54:50
tags:
- linux
- manjaro
categories:
- linux
comments: false
permalink:
---
# pacman的介绍

在linux系统中安装一个新应用，主要有三部分，**软件包文件、库、依赖关系**。
**软件包**是程序本身的数据文件。**库**是各种函数封装存放的地方。**依赖关系**是各个程序之间共用的数据和函数库形成的联系。
所以，要安装一个软件不光要安装软件本身，还要依据依赖关系安装其他用到的库和软件。

## 1.添加源

**源**，是软件源的简称，是互联网上存放软件包和库的**服务器**，这些服务器一般都是由官方维护，不少高校、互联网公司等权威机构有自己的镜像源，也有开发者自己的社区软件源。

**软件包工具**，是使用这些源的工具，多是终端里的一种命令，如apt-get 、yum、dpkg、pacman等，在这些工具中，分为高级和低级，低级工具（dpkg、rpm）执行**安装删除**等任务，高级工具（apt-get、yum、pacman）提供**依赖关系解决**等功能。每种工具都有相对应的软件包格式、相对应的源。

pacman源的设置在`/etc/pacman.conf`和`/etc/pacman.d/mirrorlist`里

1)在`/etc/pacman.conf`类似这样

```javascript
[core]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

[extra]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

[community]
SigLevel = PackageRequired
Include = /etc/pacman.d/mirrorlist

```

2)在`/etc/pacman.d/mirrorlist`类似这样
mirrorlist文件默认的源都在国外, 速度慢,需要添加国内镜像地址作为源，添加内容如下：

```javascript
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch  
Server = https://mirrors.aliyun.com/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch  
Server = https://mirrors.163.com/archlinux/$repo/os/$arch  
```

上面是大概的,下面是要做的
1.根据软件源的速度排列源(在终端输入）也就不用在上面手动添加了

```javascript
sudo pacman-mirrors -g
```

一步到位

```javascript
sudo pacman-mirrors -c China
```

2.Wiki上一个优化机械硬盘的命令，类似于磁盘整理（固态硬盘跳过这步,固态不要用,虚拟机也不要用）

```javascript
sudo pacman-optimize && sync
```

3.更新系统(后面添加完USTC源之后也要一次更新)

```javascript
sudo pacman -Syyu
```

4.完成以上步骤后，可添加archlinuxCN源，方便我们安装等软件(比如google-chrome)

```javascript
sudo vim /etc/pacman.conf
```

在打开的文件最后黏贴上以下几行：（这里用的中科大的源,用了可以搜到chrome的哦）

```javascript
# USTC
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

5.导入 GPG key(这个必须要有哦,会自动签名的)

```javascript
sudo pacman -S archlinuxcn-keyring
```

//这块暂时不用
（2）运行sudopacman -Syyu提示Keys错误，GPG啥的，依次运行以下命令：
sudo rm -r /etc/pacman.d/gnupg（移除旧的keys）
sudo pacman -Sy gnupg archlinux-keyring manjaro-keyring（重新安装最新keys）
sudo pacman-key --init（初始化pacman的keys）
sudo pacman-key --populate archlinux manjaro（加载签名的keys）
sudo pacman-key –refresh-keys（刷新升级已签名keys）
sudo pacman -Sc（清空并下载新数据）
最后运行： 

sudo pacman -Syyu


## pacman的使用

[pacman](https://wiki.archlinux.org/index.php/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))软件包管理器是 Arch Linux 的一大亮点。它将一个简单的二进制包格式和易用的构建系统结合了起来(参见makepkg和ABS)。不管软件包是来自官方的 Arch 库还是用户自己创建，pacman 都能方便地管理。

pacman 通过和主服务器同步软件包列表来进行系统更新。这种服务器/客户端模式可以使用一条命令就下载或安装软件包，同时安装必需的依赖包。

pacman 用 C 语言编写，使用tar打包格式。

我们可以在机子上使用`pacman -h`来看基本参数或者`man pacman`来查看具体使用

```javascript
[abc@manjaro ~]$ pacman -h  
usage:  pacman <operation> [...]
operations:
    pacman {-h --help}      //帮助
    pacman {-V --version}   //查看版本
    pacman {-D --database} <options> <package(s)>   //数据库选项
    pacman {-F --files}    [options] [package(s)]   
    pacman {-Q --query}    [options] [package(s)]   //列出本机中安装的所有的包
    pacman {-R --remove}   [options] <package(s)>   //删除包
    pacman {-S --sync}     [options] [package(s)]   //安装包
    pacman {-T --deptest}  [options] [package(s)]   //
    pacman {-U --upgrade}  [options] <file(s)>      //更新

use 'pacman {-h --help}' with an operation for available options
```

主要看 SRUD 这几个参数的意思


















　　同步与升级
　　安装和升级软件包前，先让本地的包数据库和远程的软件仓库同步是个好习惯。 
　　pacman -Syy
　　也可以使用一句命令同时进行同步软件库并更新系统到最新状态 
　　pacman -Syu
　　安装软件包
　　安装或者升级单个软件包，或者一列软件包（包含依赖包），使用如下命令： 
　　pacman -S package_name1 package_name2
　　有时候在不同的软件仓库中，一个软件包有多个版本（比如extra和testing）。你可以选择一个来安装：
　　pacman -S extra/package_name 
　　pacman -S testing/package_name
　　你也可以在一个命令里同步包数据库并且安装一个软件包：
　　pacman -Sy package_name
　　卸载软件包
　　删除单个软件包，保留其全部已经安装的依赖关系 
　　pacman -R package_name
　　删除指定软件包，及其所有没有被其他已安装软件包使用的依赖关系： 
　　pacman -Rs package_name
　　包数据库查询
　　可以使用 -Q 标志搜索和查询本地包数据库。详情参见 
　　pacman -Q --help
　　可以使用-S 标志搜索和查询远程同步的包数据库。详情参见 
　　pacman -S --help
　　其它
　　下载包而不安装它： 
　　pacman -Sw package_name
　　安装一个本地包（不从源里）： 
　　pacman -U /path/to/package/package_name-version.pkg.tar.gz
　　完全清理包缓存(/var/cache/pacman/pkg)： 
　　pacman -Scc　



pacman：

pacman -S   ：安装

pacman -Syu ：升级系统的包

pacman -Ss ：查询

pacman -R   ：删除

pacman -Rs ：删除包和其依赖

pacman -Qs ：查询已安装包

pacman -Qi ：显示查找的包的信息

pacman -Ql：显示包的文件安装位置

pacman -Sw ：下载包但不安装

pacman -U  path/。。。 ： 安装本地的包

pacman -Scc ： 清除缓存


pacman -Sy abc                    和源同步后安装名为abc的包
pacman -S abc                     从本地数据库中得到abc的信息，下载安装abc包
pacman -Sf abc                    强制安装包abc
pacman -Ss abc                   搜索有关abc信息的包
pacman -Si abc                    从数据库中搜索包abc的信息
pacman -Syu                        同步源，并更新系统
pacman -Sy                          仅同步源
pacman -R abc                     删除abc包
pacman -Rc abc                   删除abc包和依赖abc的包
pacman -Rsn abc                 移除包所有不需要的依赖包并删除其配置文件
pacman -Sc                          清理/var/cache/pacman/pkg目录下的旧包
pacman -Scc                        清除所有下载的包和数据库
pacman -Sd abc                   忽略依赖性问题，安装包abc
pacman -Su --ignore foo       升级时不升级包foo
pacman -Sg abc                   查询abc这个包组包含的软件包
pacman -Q                           列出系统中所有的包
pacman -Q package             在本地包数据库搜索(查询)指定软件包
pacman -Qi package            在本地包数据库搜索(查询)指定软件包并列出相关信息
pacman -Q | wc -l                  统计当前系统中的包数量
pacman -Qdt                         找出孤立包
pacman -Rs $(pacman -Qtdq) 删除孤立软件包（递归的,小心用)


不要开启AUR

yaourt安装暂时不用