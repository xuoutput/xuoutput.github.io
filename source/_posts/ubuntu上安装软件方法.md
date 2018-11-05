---
title: ubuntu上安装软件方法
date: 2018-04-19 09:43:55
tags:
- ubuntu
- linux
categories:
- linux
comments: false
permalink:
---

# ubuntu上安装软件方法

## 总结下来就是有3种

1. 使用`sudo apt-get`

```c
apt-cache search package 搜索包
apt-cache show package 获取包的相关信息，如说明、大小、版本等

sudo apt-get install package 安装包
sudo apt-get remove package 删除包
```

2. 使用`dpkg`

```c
    1. dpkg -i <package.deb>
    安装一个 Debian 软件包，如你手动下载的文件，（其中-i等价于--install）

    2. dpkg -c <package.deb>
    列出<package.deb> 的内容中包含的文件结构（其中-c等价于--contents）

    3. dpkg - I<package.deb>
    从<package.deb> 中提取包裹信息的详细信息，包括软件名称. 版本以及大小等（其中-I等价于--info）

    4. dpkg -r <package>
    移除一个已安装的包裹（软件名称可通过dpkg -I命令查看，其中-r等价于--remove）

    5. dpkg -P <package>
    完全清除一个已安装的包裹。和 remove 不同的是，remove 只是删掉数据和可执行文件，purge 另外还删除所有的配制文件。
```

3. 解压缩`.tar.gz`的直接运行

```c
解压：$ tar -xzvf <FileName.tar.gz>
压缩：$ tar -czvf <FileName.tar.gz DirName>
-c: 建立压缩档案
-x：解压

-z：有gzip属性的
-v：显示所有过程
-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。
```

## apt-get

常用的APT命令参数
　　apt-cache search package 搜索包
　　apt-cache show package 获取包的相关信息，如说明、大小、版本等

　　sudo apt-get install package 安装包
　　sudo apt-get install package -- reinstall 重新安装包
　　sudo apt-get -f install 修复安装"-f = --fix-missing"
　　sudo apt-get remove package 删除包
　　sudo apt-get remove package -- purge 删除包，包括删除配置文件等
　　sudo apt-get update 更新源
　　sudo apt-get upgrade 更新已安装的包
　　sudo apt-get dist-upgrade 升级系统
　　sudo apt-get dselect-upgrade 使用 dselect 升级

　　apt-cache depends package 了解使用依赖
　　apt-cache rdepends package 是查看该包被哪些包依赖

　　sudo apt-get build-dep package 安装相关的编译环境
　　apt-get source package 下载该包的源代码
　　sudo apt-get clean && sudo apt-get autoclean 清理无用的包
　　sudo apt-get check 检查是否有损坏的依赖
　　其中：
　　1 有sudo的表示需要管理员特权！
　　2 在UBUNTU中命令后面参数为短参数是用“-”引出，长参数用“--”引出
　　3 命令帮助信息可用man 命令的方式查看或者
　　命令 -H（--help）方式查看
　　4 在man命令中需要退出命令帮助请按“q”键！！
　　选项 含义 作用
　　sudo -h Help 列出使用方法，退出。
　　sudo -V Version 显示版本信息，并退出。
　　sudo -l List 列出当前用户可以执行的命令。只有在sudoers里的用户才能使用该选项。
　　sudo -u username|#uid User 以指定用户的身份执行命令。后面的用户是除root以外的，可以是用户名，也可以是#uid。
　　sudo -k Kill 清除“入场卷”上的时间，下次再使用sudo时要再输入密码。
　　sudo -K Sure kill 与-k类似，但是它还要撕毁“入场卷”，也就是删除时间戳文件。
　　sudo -b command Background 在后台执行指定的命令。
　　sudo -p prompt command Prompt 可以更改询问密码的提示语，其中%u会代换为使用者帐号名称，%h会显示主机名称。非常人性化的设计 
　　sudo -e file Edit 不是执行命令，而是修改文件，相当于命令sudoedit。

## dpkg

    1. dpkg -i <package.deb>
    安装一个 Debian 软件包，如你手动下载的文件，（其中-i等价于--install）

    2. dpkg -c <package.deb>
    列出<package.deb> 的内容中包含的文件结构（其中-c等价于--contents）

    3. dpkg - I<package.deb>
    从<package.deb> 中提取包裹信息的详细信息，包括软件名称. 版本以及大小等（其中-I等价于--info）

    4. dpkg -r <package>
    移除一个已安装的包裹（软件名称可通过dpkg -I命令查看，其中-r等价于--remove）

    5. dpkg -P <package>
    完全清除一个已安装的包裹。和 remove 不同的是，remove 只是删掉数据和可执行文件，purge 另外还删除所有的配制文件。

    6. dpkg -L <package>
    列出 <package> 安装的软件包安装的所有文件（软件名称可通过dpkg -I命令查看，其中-L等价于--listfiles）

    7. dpkg -l <package>
    查看<package>软件包的信息（软件名称可通过dpkg -I命令查看，其中-l等价于--list）

    8. dpkg -s <package>
    显示已安装包裹的详细信息。同时请看 apt-cache 显示 Debian 存档中的包裹信息，以及 dpkg -I 来显示从一个 .deb 文件中提取的包裹信息。（软件名称可通过dpkg -I命令查看，其中-s等价于--status）

    9. dpkg-reconfigure <package>
    重新配制一个已经安装的包裹，如果它使用的是 debconf (debconf 为包裹安装提供了一个统一的配制界面)。

## .tar.gz

3. .tar.gz的先tar -x

tar
-c: 建立压缩档案
-x：解压
-t：查看内容
-r：向压缩归档文件末尾追加文件
-u：更新原压缩包中的文件
这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。

-z：有gzip属性的
-j：有bz2属性的
-Z：有compress属性的
-v：显示所有过程
-O：将文件解开到标准输出

下面的参数-f是必须的

-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。

$ tar -cf all.tar *.jpg 
这条命令是将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名。 

$ tar -rf all.tar *.gif 
这条命令是将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件的意思。 

$ tar -uf all.tar logo.gif 
这条命令是更新原来tar包all.tar中logo.gif文件，-u是表示更新文件的意思。 

$ tar -tf all.tar 
这条命令是列出all.tar包中所有文件，-t是列出文件的意思 

$ tar -xf all.tar 
这条命令是解出all.tar包中所有文件，-x是解开的意思 

压缩
tar –cvf jpg.tar *.jpg //将目录里所有jpg文件打包成tar.jpg
tar –czf jpg.tar.gz *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
tar –cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
tar –cZf jpg.tar.Z *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for Linux
zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux

解压
tar –xvf file.tar //解压 tar包
tar -xzvf file.tar.gz //解压tar.gz
tar -xjvf file.tar.bz2   //解压 tar.bz2
tar –xZvf file.tar.Z   //解压tar.Z
unrar e file.rar //解压rar
unzip file.zip //解压zip

总结

1. \*.tar 用 tar –xvf 解压
2. \*.gz 用 gzip -d或者gunzip 解压
3. **\*.tar.gz和\*.tgz 用 tar –xzvf 解压**
4. \*.bz2 用 bzip2 -d或者用bunzip2 解压
5. \*.tar.bz2用tar –xjf 解压
6. \*.Z 用 uncompress 解压
7. \*.tar.Z 用tar –xZf 解压
8. \*.rar 用 unrar e解压
9. \*.zip 用 unzip 解压

一般使用tar -xzvf  tar -czvf


01-.tar格式
解包：[＊＊＊＊＊＊＊]$ tar xvf FileName.tar
打包：[＊＊＊＊＊＊＊]$ tar cvf FileName.tar DirName（注：tar是打包，不是压缩！）
02-.gz格式
解压1：[＊＊＊＊＊＊＊]$ gunzip FileName.gz
解压2：[＊＊＊＊＊＊＊]$ gzip -d FileName.gz
压 缩：[＊＊＊＊＊＊＊]$ gzip FileName

**03-.tar.gz格式**
**解压：[＊＊＊＊＊＊＊]$ tar -zxvf FileName.tar.gz**
**压缩：[＊＊＊＊＊＊＊]$ tar -zcvf FileName.tar.gz DirName**

04-.bz2格式
解压1：[＊＊＊＊＊＊＊]$ bzip2 -d FileName.bz2
解压2：[＊＊＊＊＊＊＊]$ bunzip2 FileName.bz2
压 缩： [＊＊＊＊＊＊＊]$ bzip2 -z FileName

05-.tar.bz2格式
解压：[＊＊＊＊＊＊＊]$ tar jxvf FileName.tar.bz2
压缩：[＊＊＊＊＊＊＊]$ tar jcvf FileName.tar.bz2 DirName

06-.bz格式
解压1：[＊＊＊＊＊＊＊]$ bzip2 -d FileName.bz
解压2：[＊＊＊＊＊＊＊]$ bunzip2 FileName.bz

07-.tar.bz格式
解压：[＊＊＊＊＊＊＊]$ tar jxvf FileName.tar.bz

08-.Z格式
解压：[＊＊＊＊＊＊＊]$ uncompress FileName.Z
压缩：[＊＊＊＊＊＊＊]$ compress FileName

09-.tar.Z格式
解压：[＊＊＊＊＊＊＊]$ tar Zxvf FileName.tar.Z
压缩：[＊＊＊＊＊＊＊]$ tar Zcvf FileName.tar.Z DirName

10-.tgz格式
解压：[＊＊＊＊＊＊＊]$ tar zxvf FileName.tgz

11-.tar.tgz格式
解压：[＊＊＊＊＊＊＊]$ tar zxvf FileName.tar.tgz
压缩：[＊＊＊＊＊＊＊]$ tar zcvf FileName.tar.tgz FileName

12-.zip格式
解压：[＊＊＊＊＊＊＊]$ unzip FileName.zip
压缩：[＊＊＊＊＊＊＊]$ zip FileName.zip DirName

13-.lha格式
解压：[＊＊＊＊＊＊＊]$ lha -e FileName.lha
压缩：[＊＊＊＊＊＊＊]$ lha -a FileName.lha FileName

14-.rar格式
解压：[＊＊＊＊＊＊＊]$ rar a FileName.rar
压缩：[＊＊＊＊＊＊＊]$ rar e FileName.rar      
rar请到：下载！
解压后请将rar_static拷贝到/usr/bin目录（其他由$PATH环境变量
指定的目录也行）：[＊＊＊＊＊＊＊]$ cp rar_static /usr/bin/rar

## 这样的要在把东西解压到/usr/local中 然后

```s
tar  -xzvf node-v5.10.1-linux-x64.tar.gz  /usr/local/
cd /usr/local/
sudo mv node-v5.10.1-linux-x64/ nodejs
sudo ln -s /usr/local/nodejs/bin/node /usr/local/bin
sudo ln -s /usr/local/nodejs/bin/npm /usr/local/bin
```
还有一种

```c
下载完安装包，并解压 tgz（以下演示的是 64 位 Linux上的安装） 。

curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz    # 下载
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz                                   # 解压

mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb                         # 将解压包拷贝到指定目录

MongoDB 的可执行文件位于 bin 目录下，所以可以将其添加到 PATH 路径中：就是全局环境变量.window上那种

export PATH=<mongodb-install-directory>/bin:$PATH
export PATH=/usr/local/mongodb/bin:$PATH
<mongodb-install-directory> 为你 MongoDB 的安装路径。如本文的 /usr/local/mongodb 。
```

上面的重启就没了 怎么永久
https://www.cnblogs.com/lihao-blog/p/6945040.html
source /etc/profile后只在一个终端中有效
https://www.cnblogs.com/tomato0906/articles/6048383.html
https://bbs.deepin.org/forum.php?mod=viewthread&tid=143895

http://liuzhijun.iteye.com/blog/1744465