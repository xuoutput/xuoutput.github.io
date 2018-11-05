---
title: linux基本命令使用
date: 2018-04-19 20:09:53
tags:
- ubuntu
- linux
categories:
- linux
comments: false
permalink:
---

# linux基本命令使用

## 打开终端

1. `guake` 按F12

各种配置见preferences

2. `terminal`  按ctrl+alt+t

* 常用系统工作命令
    1.  echo
    2.  date
    3.  reboot,poweroff,shutdown
    4.  wget
    5.  ps
    6.  top(htop)
    7.  pidof
    8.  kill
    9.  killall
* 系统状态检测命令
    1. ifconfig
    2. uname
    3. uptime(top)
    4. free(top)
    5. who
    6. last
    7. history
    8. sosreport
* 工作目录切换命令
    1. pwd
    2. cd 
    3. ls
* 文本文件编辑命令
    1. cat
    2. more
    3. head
    4. tail
    5. tr
    6. wc word count
    7. stat
    8. cut
    9. diff
* 文件目录管理命令
    1. touch -a -m -d
    2. mkdir
    3. cp -p
    4. mv
    5. dd if= of= count= bs=
    6. file
* 打包压缩与搜索命令
    1. tar -cx/zj/vf
    2. grep -n -v
    3. find



**man命令中常用按键以及用途**

| 按键      | 用处                                     |
| --------- | :--------------------------------------- |
| 空格键    | 向下翻一页                               |
| PaGe down | 向下翻一页                               |
| PaGe up   | 向上翻一页                               |
| home      | 直接前往首页                             |
| end       | 直接前往尾页                             |
| /         | 从**上至下**搜索某个关键词，如“/linux” |
| ?         | 从**下至上**搜索某个关键词，如“?linux” |
| n         | 定位到**下一个**搜索到的关键词           |
| N         | 定位到**上一个**搜索到的关键词           |
| q         | 退出帮助文档                             |

一般来讲，使用man命令查看到的帮助内容信息都会很长,然而并没有什么用.

| 结构名称    | 代表意义                 |
| ----------- | ------------------------ |
| NAME        | 命令的名称               |
| SYNOPSIS    | 参数的大致使用方法       |
| DESCRIPTION | 介绍说明                 |
| EXAMPLES    | 演示（附带简单说明）     |
| OVERVIEW    | 概述                     |
| DEFAULTS    | 默认的功能               |
| OPTIONS     | 具体的可用选项（带介绍） |
| ENVIRONMENT | 环境变量                 |
| FILES       | 用到的文件               |
| SEE ALSO    | 相关的资料               |
| HISTORY     | 维护历史与联系方式       |

## 常用系统工作命令

1. echo命令
echo命令用于在终端输出字符串或变量提取后的值，格式为“echo [字符串 | $变量]”。

```c
echo hello 
eche $SHELL
```

2. date命令
date命令用于显示及设置系统的时间或日期，格式为“date [选项] [+指定的格式]”。
只需在强大的date命令中输入以**“+”号开头的参数**，即可按照指定格式来输出系统的时间或日期，这样在日常工作时便可以把备份数据的命令与指定格式输出的时间信息结合到一起。例如，把打包后的文件自动按照“年-月-日”的格式打包成“backup-2017-9-1.tar.gz”，用户只需要看一眼文件名称就能大概了解到每个文件的备份时间了

| 参数    | 作用                        |
| ------- | --------------------------- |
| %t      | 跳格[Tab键]                 |
| %Y      | 年   %y是2位                |
| %m      | 月   %M是分钟了             |
| %d      | 日                          |
| %D      | 04/19/18  %d/%m/%y          |
| %H / %I | 小时（00～23）/小时（00～12） |
| %M      | 分钟（00～59）               |
| %S      | 秒（00～59）                 |
| %j      | 今年中的第几天              |

```c
date +%Y-%m-%d
date "+%Y-%m-%d %H:%M:%S" //有空格的一定要加引号
```

3. reboot poweroff halt 

一般我用shutdown诶

4. wget 
wget命令用于在终端中下载网络文件，格式为“wget [参数] 下载地址”。

5. ps命令
ps命令用于查看系统中的进程状态，格式为“ps [参数]”。

执行这个命令时通常会将ps命令与第3章的管道符技术搭配使用，用来抓取与某个指定服务进程相对应的PID号码。ps命令的常见参数以及作用如表。

| 参数 | 作用                               |
| ---- | ---------------------------------- |
| -a   | 显示所有进程（包括其他用户的进程） |
| -u   | 用户以及其他详细信息               |
| -x   | 显示没有控制终端的进程             |

```c
ps -aux
ps aux
```

> 如前面所提到的，在Linux系统中的命令参数有**长短格式**之分，长格式和长格式之间不能合并，长格式和短格式之间也不能合并，**只有短格式和短格式之间是可以合并的**，合并后仅保留一个-（减号）即可。另外ps命令可允许参数不加减号（-），因此可直接写成ps aux的样子。

Linux系统中时刻运行着许多进程，如果能够合理地管理它们，则可以优化系统的性能。在Linux系统中，有**5种**常见的进程状态，分别为**运行、中断、不可中断、僵死与停止**，其各自含义如下所示。

> R（运行running）：进程正在运行或在运行队列中等待。
> 
> S（中断interruptible sleep）：进程处于休眠中，当某个条件形成后或者接收到信号时，则脱离该   状态。
> 
> D（不可中断uninterruptible sleep）：进程不响应系统异步信号，即便用kill命令也不能将其中断。
> 
> T（停止stopped by job control signal）：进程收到停止信号后停止运行。
> 
> Z（僵死zombie）：进程已经终止，但进程描述符依然存在, 直到父进程调用wait4()系统函数后将进程释放。

还有一些加在后面的

> <    高优先级 (not nice to other users)
> N    低优先级 (nice to other users)
> L    内存中有pages locked(for real-time and custom IO)
> s    是一个session leader
> l    是多线程的multi-threaded (using CLONE_THREAD, like NPTL pthreads do)
> \+   在前台进程组中

6. top命令(还有htop)

> top命令用于动态地监视进程活动与系统负载等信息，其格式为top。
> 
> top命令相当强大，能够动态地查看系统运维状态，完全将它看作Linux中的“强化版的Windows任务管理器”
> 
> 第1行top：系统时间、up运行时间、user登录终端数、load average系统负载（三个数值分别为1分钟、5分钟、15分钟内的平均值，数值越小意味着负载越低）。
> 
> 第2行Tasks：total进程总数、running运行中的进程数、sleeping睡眠中的进程数、stopped停止的进程数、zombie僵死的进程数。
> 
> 第3行Cpu：%user用户占用资源百分比、%system系统内核占用资源百分比、%ni改变过优先级的进程资源百分比、%idle空闲的资源百分比等。其中数据均为CPU数据并以百分> 比格式显示，例如“97.1 id”意味着有97.1%的CPU处理器资源处于空闲。
> 
```c
us: is meaning of "user CPU time"
sy: is meaning of "system CPU time"
ni: is meaning of" nice CPU time"
id: is meaning of "idle"
wa: is meaning of "iowait" 
hi：is meaning of "hardware irq" 硬中断
si : is meaning of "software irq" 软中断
st : is meaning of "steal time"
```
> 第4行Mem：物理内存总量、内存使用量、内存空闲量、作为内核缓存的内存量。
> 
> 第5行Swap：虚拟内存总量、虚拟内存使用量、虚拟内存空闲量、已被提前加载的内存量。

8. pidof命令
pidof命令用于查询某个指定服务进程的PID值，格式为“pidof [参数] [服务名称]”。

每个进程的进程号码值（PID）是唯一的，因此可以通过PID来区分不同的进程。例如，可以使用如下命令来查询本机上sshd服务程序的PID

```c
pidof zsh
90436 90108 89864 89585 80262 79890 75011 2211
```

9. kill命令

kill命令用于终止某个指定PID的服务进程，格式为“kill [参数] [进程PID]”。

接下来，我们使用kill命令把上面用pidof命令查询到的PID所代表的进程终止掉.

```c
kill 90436
```

10. killall命令

killall命令用于终止某个指定名称的服务所对应的全部进程，格式为：“killall [参数] [进程名称]”。

通常来讲，复杂软件的服务程序会有多个进程协同为用户提供服务，如果逐个去结束这些进程会比较麻烦，此时可以使用killall命令来批量结束某个服务程序带有的全部进程。下面以httpd服务程序为例，来结束其全部进程。由于RHEL7系统默认没有安装httpd服务程序，因此大家此时只需看操作过程和输出结果即可，等学习了相关内容之后再来实践。

```c
$ pidof httpd
13581 13580 13579 13578 13577 13576
$ killall httpd
$ pidof httpd
$
```

如果我们在系统终端中执行一个命令后想立即停止它，可以同时按下`Ctrl + C`组合键（生产环境中比较常用的一个快捷键），这样将立即终止该命令的进程。或者，如果有些命令在执行时不断地在屏幕上输出信息，影响到后续命令的输入，则可以在执行命令时在**末尾添加**上一个`&`符号，这样命令将**进入系统后台**来执行。

## 系统状态检测命令

网卡网络、系统内核、系统负载、内存使用情况、当前启用终端数量、历史登录记录、命令执行记录以及救援诊断等相关命令的使用方法.

1. ifconfig命令

ifconfig命令用于获取网卡配置与网络状态等信息，格式为“ifconfig [网络设备] [参数]”。

使用ifconfig命令来查看本机当前的网卡配置与网络状态等信息时，其实主要查看的就是网卡名称、inet参数后面的IP地址、ether参数后面的网卡物理地址（又称为MAC地址），以及RX、TX的接收数据包与发送数据包的个数及累计流量（即下面加粗的信息内容）：

```c
# abc123 @ ubuntu in ~ [8:48:15] 
$ ifconfig
ens33     Link encap:Ethernet  HWaddr 00:0c:29:99:ee:76  
          inet addr:192.168.138.142  Bcast:192.168.138.255  Mask:255.255.255.0
          inet6 addr: fe80::9016:a587:cb6c:8e22/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:358492 errors:0 dropped:0 overruns:0 frame:0
          TX packets:194286 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:411586597 (411.5 MB)  TX bytes:19353703 (19.3 MB)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:16667 errors:0 dropped:0 overruns:0 frame:0
          TX packets:16667 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:1591176 (1.5 MB)  TX bytes:1591176 (1.5 MB)

```

2. uname命令

uname命令用于**查看系统内核与系统版本等信息**，格式为“uname [-a]”。

在使用uname命令时，一般会固定搭配上`-a`参数来完整地查看当前系统的内核名称、主机名、内核发行版本、节点名、系统时间、硬件名称、硬件平台、处理器类型以及操作系统名称等信息。

```c
# abc123 @ ubuntu in ~ [8:48:18] 
$ uname -a
Linux ubuntu 4.13.0-38-generic #43~16.04.1-Ubuntu SMP Wed Mar 14 17:48:43 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux

```

顺带一提，如果要查看当前系统版本的详细信息，则需要查看redhat-release文件，其命令以及相应的结果如下

```c
$ cat /etc/lsb-release 
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.3 LTS"

```

3. uptime命令(这不就是top命令的第一行么)

uptime用于查看系统的负载信息，格式为uptime。

uptime命令真的很棒，它可以显示当前系统时间、系统已运行时间、启用终端数量以及平均负载值等信息。平均负载值指的是系统在最近1分钟、5分钟、15分钟内的压力情况（下面加粗的信息部分）；负载值越低越好，尽量不要长期超过1，在生产环境中不要超过5。

```c
$ uptime 
 08:53:54 up  9:13, 10 users,  load average: 1.64, 0.96, 0.70
```

4. free命令(top中)

free用于显示当前系统中内存的使用量信息，格式为“free [-h]”。

为了保证Linux系统不会因资源耗尽而突然宕机，运维人员需要时刻关注内存的使用量。在使用free命令时，可以结合使用-h参数以更人性化的方式输出当前内存的实时使用量信息

```c
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           1.9G        1.5G         74M         66M        366M        139M
Swap:          1.0G        1.0G          0B
```

5. who命令

who用于查看当前登入主机的用户终端信息，格式为“who [参数]”。

这三个简单的字母可以快速显示出所有正在登录本机的用户的名称以及他们正在开启的终端信息

```c
$ who
abc123   tty7         2018-04-18 17:59 (:0)
abc123   pts/18       2018-04-18 17:59 (ubuntu)
abc123   pts/23       2018-04-19 20:22 (ubuntu)
abc123   pts/24       2018-04-19 20:22 (ubuntu)
abc123   pts/25       2018-04-19 20:22 (ubuntu)
abc123   pts/26       2018-04-19 20:22 (ubuntu)
abc123   pts/27       2018-04-19 20:22 (ubuntu)
abc123   pts/28       2018-04-19 20:22 (ubuntu)
abc123   pts/25       2018-04-19 20:25 (:0)
abc123   pts/19       2018-04-19 21:30 (ubuntu)
```

6. last命令

last命令用于查看所有系统的登录记录，格式为“last [参数]”。

使用last命令可以查看本机的登录记录。但是，由于这些信息都是以日志文件的形式保存在系统中，**因此黑客可以很容易地对内容进行篡改。千万不要单纯以该命令的输出信息而判断系统有无被恶意入侵！**

```c
$ last
abc123   pts/19       ubuntu           Thu Apr 19 21:30    gone - no logout
abc123   pts/26       :0               Thu Apr 19 20:26 - 20:26  (00:00)
abc123   pts/25       :0               Thu Apr 19 20:25    gone - no logout
abc123   pts/24       ubuntu           Thu Apr 19 20:22    gone - no logout
abc123   pts/23       ubuntu           Thu Apr 19 20:22    gone - no logout
abc123   pts/28       ubuntu           Thu Apr 19 20:22    gone - no logout
abc123   pts/27       ubuntu           Thu Apr 19 20:22    gone - no logout
abc123   pts/26       ubuntu           Thu Apr 19 20:22 - 20:26  (00:03)
abc123   pts/25       ubuntu           Thu Apr 19 20:22 - 20:25  (00:03)
abc123   pts/24       ubuntu           Thu Apr 19 20:22 - 20:22  (00:00)
abc123   pts/23       ubuntu           Thu Apr 19 20:22 - 20:22  (00:00)
abc123   pts/18       ubuntu           Wed Apr 18 17:59    gone - no logout
abc123   tty7         :0               Wed Apr 18 17:59    gone - no logout
reboot   system boot  4.13.0-38-generi Wed Apr 18 17:57   still running
abc123   pts/18       ubuntu           Wed Apr 18 16:03 - crash  (01:54)
abc123   tty7         :0               Wed Apr 18 16:03 - crash  (01:54)
reboot   system boot  4.13.0-38-generi Wed Apr 18 16:03   still running
abc123   pts/18       ubuntu           Sat Apr 14 21:21 - crash (3+18:41)
abc123   tty7         :0               Sat Apr 14 21:21 - crash (3+18:41)
reboot   system boot  4.13.0-38-generi Sat Apr 14 21:21   still running
abc123   pts/1        :0               Fri Apr 13 17:51 - 17:51  (00:00)
abc123   pts/18       ubuntu           Fri Apr 13 17:20 - down   (02:24)
abc123   tty7         :0               Fri Apr 13 17:20 - down   (02:24)
reboot   system boot  4.13.0-38-generi Fri Apr 13 17:20 - 19:44  (02:24)
abc123   pts/18       ubuntu           Fri Apr 13 10:17 - crash  (07:02)
abc123   tty7         :0               Fri Apr 13 10:17 - crash  (07:02)
reboot   system boot  4.13.0-38-generi Fri Apr 13 10:17 - 19:44  (09:27)

wtmp begins Thu Apr 12 21:08:41 2018

```

7. history命令

history命令用于显示历史执行过的命令，格式为“history [-c]”。

history命令应该是作者最喜欢的命令。执行history命令能显示出当前用户在本地计算机中执行过的最近1000条命令记录。如果觉得1000不够用，还可以自定义/etc/profile文件中的HISTSIZE变量值。在使用history命令时，如果使用-c参数则会清空所有的命令历史记录。还可以使用“!编码数字”的方式来重复执行某一次的命令。

```c
  586  ifconfig
  587  top
  588  ifconfig
  589  uname -a
  590  cat /etc/lsb-release
  591  cat /etc/debian_version
  592  uptime
  593  free -h
  594  free
  595  top
  596  top -h
  597  top -hv
  598  free -h
  599  who
  600  last

```

历史命令会被保存到用户家目录中的.bash_history文件中。Linux系统中以点（.）开头的文件均代表隐藏文件，这些文件大多数为系统服务文件，可以用cat命令查看其文件内容

```c
cat ~/.bash_history
```

要清空当前用户在本机上执行的Linux命令历史记录信息，可执行如下命令：

```c
history -c
```

8. sosreport命令(ubuntu上要先安装)

sosreport命令用于收集系统配置及架构信息并输出诊断文档，格式为sosreport。

当Linux系统出现故障需要联系技术支持人员时，大多数时候都要先使用这个命令来简单收集系统的运行状态和服务配置信息，以便让技术支持人员能够远程解决一些小问题，亦或让他们能提前了解某些复杂问题。在下面的输出信息中，**加粗的部分是收集好的资料压缩文件以及校验码**，将其发送给技术支持人员即可：

## 工作目录切换命令

1. pwd命令

pwd命令用于显示用户当前所处的工作目录，格式为“pwd [选项]”。

```c
$ pwd
/home/abc123/Downloads
```

2. cd命令

cd命令用于切换工作路径，格式为“cd [目录名称]”。

这个命令应该是最常用的一个Linux命令了。可以通过cd命令迅速、灵活地切换到不同的工作目录。除了常见的切换目录方式，还可以使用`“cd -”`命令返回到**上一次**所处的目录，使用`“cd..”`命令进入上级目录，以及使用`“cd ~”`命令切换到当前用户的家目录，亦或使用“cd ~username”切换到其他用户的家目录。例如，可以使用“cd 路径”的方式切换进/etc目录中：

```c
cd /etc
cd -
cd ..
cd ~
```

3. ls命令

ls命令用于显示目录中的文件信息，格式为“ls [选项] [文件] ”。

所处的工作目录不同，当前工作目录下的文件肯定也不同。使用ls命令的“-a”参数看到全部文件（包括隐藏文件），使用“-l”参数可以查看文件的属性、大小等详细信息。将这两个参数整合之后，再执行ls命令即可查看当前目录中的所有文件并输出这些文件的属性信息

如果想要查看目录属性信息，则需要额外添加一个-d参数。例如，可使用如下命令查看/etc目录的权限与属性信息：

```c
$ ls -ld /usr
drwxr-xr-x 11 root root 4096 Aug  1  2017 /usr

```

## 文本文件编辑命令

1. cat命令

cat命令用于**查看纯文本文件**（内容较少的），格式为“cat [选项] [文件]”。

Linux系统中有多个用于查看文本内容的命令，每个命令都有自己的特点，比如这个cat命令就是用于查看内容较少的纯文本文件的。cat这个命令也很好记，因为cat在英语中是“猫”的意思，小猫咪是不是给您一种娇小、可爱的感觉呢？

如果在查看文本内容时**还想顺便显示行号**的话，不妨在cat命令后面追加一个-n参数：

```c
cat -n 1.txt
```

2. more命令

more命令用于查看纯文本文件（内容较多的），格式为“more [选项]文件”。

如果需要阅读长篇小说或者非常长的配置文件，那么“小猫咪”可就真的不适合了。因为一旦使用cat命令阅读长篇的文本内容，信息就会在屏幕上快速翻滚，导致自己还没有来得及看到，内容就已经翻篇了。因此对于长篇的文本内容，推荐使用more命令来查看。more命令会在最下面使用百分比的形式来提示您已经阅读了多少内容。您还可以使用空格键或回车键向下翻页：

```c
more 1.txt
```

3. head命令

head命令用于查看纯文本文档的**前N行**，格式为“head [选项] [文件]”。

在阅读文本内容时，谁也难以保证会按照从头到尾的顺序往下看完整个文件。如果只想查看文本中前20行的内容，该怎么办呢？head命令可以派上用场了：

```c
head -n 20 1.txt
```

4. tail命令

tail命令用于查看纯文本文档的**后N行或持续刷新内容**，格式为“tail [选项] [文件]”。

我们可能还会遇到另外一种情况，比如需要查看文本内容的最后20行，这时就需要用到tail命令了。tail命令的操作方法与head命令非常相似，只需要执行`“tail -n 20 文件名”`命令就可以达到这样的效果。tail命令最强悍的功能是可以**持续刷新一个文件的内容**，当想要实时查看最新日志文件时，这特别有用，此时的命令格式为“**tail -f** 文件名”：

```c
tail -f /var/log/messages
```

5. tr命令

tr命令用于**替换**文本文件中的字符，格式为“tr [原始字符] [目标字符]”。

在很多时候，我们想要快速地替换文本中的一些词汇，又或者把整个文本内容都进行替换，如果进行手工替换，难免工作量太大，尤其是需要处理大批量的内容时，进行手工替换更是不现实。这时，就可以先使用`cat`命令读取待处理的文本，然后通过**管道符**（详见第3章）把这些文本内容**传递给tr**命令进行替换操作即可。例如，把某个文本内容中的英文全部替换为大写：

```c
cat anaconda-ks.cfg | tr [a-z] [A-Z]
```

6. wc命令(word count)

wc命令用于统计指定文本的行数、字数、字节数，格式为“wc [参数] 文本”。

每次我在课堂上讲到这个命令时，总有同学会联想到一种公共设施，其实这两者毫无关联。Linux系统中的wc命令用于统计文本的行数、字数、字节数等。如果为了方便自己记住这个命令的作用，也可以联想到上厕所时好无聊，无聊到数完了手中的如厕读物上有多少行字。wc的参数以及相应的作用如表2-10所示。

```c
$ wc zoobar\ setup.txt 
  88  206 2562 zoobar setup.txt

```

| 参数 | 作用         |
| ---- | ------------ |
| -l   | 只显示行数   |
| -w   | 只显示单词数 |
| -c   | 只显示字节数 |

在Linux系统中，passwd是用于保存系统账户信息的文件，要统计当前系统中有多少个用户，可以使用下面的命令来进行查询，是不是很神奇：

```c
$ wc -l /etc/passwd
38 /etc/passwd
```

7. stat命令

stat命令用于查看文件的具体存储信息和时间等信息，格式为“stat 文件名称”。

stat命令可以用于查看文件的存储信息和时间等信息，命令stat anaconda-ks.cfg会显示出文件的**三种时间状态**（已加粗）：Access、Modify、Change。这三种时间的区别将在下面的touch命令中详细详解：

```c
$ stat zoobar\ setup.txt 
  File: 'zoobar setup.txt'
  Size: 2562      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 941078      Links: 1
Access: (0766/-rwxrw-rw-)  Uid: ( 1000/  abc123)   Gid: ( 1000/  abc123)
Access: 2018-04-20 13:56:20.364043512 +0800
Modify: 2017-11-22 21:38:13.280060000 +0800
Change: 2017-11-23 13:56:28.538010046 +0800
 Birth: -

```

8. cut命令

cut命令用于按“列”提取文本字符，格式为“cut [参数] 文本”。

在Linux系统中，如何准确地提取出最想要的数据，这也是我们应该重点学习的内容。一般而言，按基于“行”的方式来提取数据是比较简单的，只需要设置好要搜索的关键词即可。但是如果按列搜索，不仅要使用**-f**参数来设置需要看的**列数**，还需要使用**-d**参数来设置**间隔符号**。passwd在保存用户数据信息时，用户信息的每一项值之间是采用冒号来间隔的，接下来我们使用下述命令尝试提取出passwd文件中的用户名信息，即提取以冒号（：）为间隔符号的第一列内容：

```c
$ head -n 2 /etc/passwd
root:x:0:0:root:/root:/bin/bash
$ cut -d: -f1 /etc/passwd  //f1第一列
```

9. diff命令

diff命令用于比较多个文本文件的差异，格式为“diff [参数] 文件”。

在使用diff命令时，不仅可以使用**--brief**参数来确认两个文件是否不同，还可以使用**-c**参数来详细比较出多个文件的差异之处，这绝对是判断文件是否被篡改的有力神器。例如，先使用cat命令分别查看diff_A.txt和diff_B.txt文件的内容，然后进行比较：

```c
$ cat diff_A.txt

$ cat diff_A.txt

```

接下来使用diff --brief命令显示比较后的结果，判断文件是否相同：
```c
$ diff --brief diff_A.txt diff_B.txt
Files diff_A.txt and diff_B.txt differ
```

最后使用带有-c参数的diff命令来描述文件内容具体的不同：

```c
diff -c diff_A.txt diff_B.txt
```

## 文件目录管理命令

1. touch命令

touch命令用于创建空白文件或设置文件的时间，格式为“touch [选项] [文件]”。

在创建空白的文本文件方面，这个touch命令相当简捷，简捷到没有必要铺开去讲。比如，touch linuxprobe命令可以创建出一个名为linuxprobe的空白文本文件。对touch命令来讲，**有难度的操作**主要是体现在设置文件内容的修改时间（mtime）、文件权限或属性的更改时间（ctime）与文件的读取时间（atime）上面。touch命令的参数及其作用如表.

| 参数 | 作用                        |
| ---- | --------------------------- |
| -a   | 仅修改“读取时间”（atime） |
| -m   | 仅修改“修改时间”（mtime） |
| -d   | 同时修改atime与mtime        |

```c
$ ls -l anaconda-ks.cfg 
-rw-------. 1 root root 1213 May  4 15:44 anaconda-ks.cfg
$ echo "hello nihao" >> anaconda-ks.cfg
$ ls -l anaconda-ks.cfg
-rw-------. 1 root root 1260 Aug  2 01:26 anaconda-ks.cfg
$ touch -d "2017-05-04 15:44" anaconda-ks.cfg 
$ ls -l anaconda-ks.cfg 
-rw-------. 1 root root 1260 May  4 15:44 anaconda-ks.cfg
```

2. mkdir命令

mkdir命令用于创建空白的目录，格式为“mkdir [选项] 目录”。

在Linux系统中，文件夹是最常见的文件类型之一。除了能创建单个空白目录外，mkdir命令还可以结合**-p参数来递归**创建出具有嵌套叠层关系的文件目录。

3. cp命令

cp命令用于复制文件或目录，格式为“cp [选项] 源文件 目标文件”。大家对文件复制操作应该不陌生，在Linux系统中，复制操作具体分为3种情况：
> 如果目标文件是目录，则会把源文件复制到该目录中；

> 如果目标文件也是普通文件，则会询问是否要覆盖它；

> 如果目标文件不存在，则执行正常的复制操作。


| 参数 | 作用                                             |
| ---- | ------------------------------------------------ |
| -p   | 保留原始文件的属性                               |
| -d   | 若对象为“链接文件”，则保留该“链接文件”的属性 |
| -r   | 递归持续复制（用于目录）                         |
| -i   | 若目标文件存在则询问是否覆盖                     |
| -a   | 相当于-pdr（p、d、r为上述参数）                  |

4. mv命令

mv命令用于**剪切文件或将文件重命名**，格式为“mv [选项] 源文件 [目标路径|目标文件名]”。

剪切操作不同于复制操作，因为它会默认把源文件删除掉，只保留剪切后的文件。如果在同一个目录中对一个文件进行剪切操作，其实也就是对其进行重命名：

5. rm命令

rm命令用于删除文件或目录，格式为“rm [选项] 文件”。

在Linux系统中删除文件时，系统会默认向您询问是否要执行删除操作，如果不想总是看到这种反复的确认信息，可在rm命令后跟上**-f参数来强制删除**。另外，想要删除一个**目录**，需要在rm命令后面一个**-r参数**才可以，否则删除不掉。

6. dd命令

dd命令用于按照指定大小和个数的数据块来复制文件或转换文件，格式为“dd [参数]”。

dd命令是一个比较重要而且比较有特色的一个命令，它能够让用户按照指定大小和个数的数据块来复制文件的内容。当然如果愿意的话，还可以在复制过程中转换其中的数据。Linux系统中有一个名为`/dev/zero`的设备文件，每次在课堂上解释它时都充满哲学理论的色彩。因为这个文件不会占用系统存储空间，但却可以提供无穷无尽的数据，因此可以使用它**作为dd命令的输入文件**，来生成一个指定大小的文件


| 参数  | 作用                             |
| ----- | -------------------------------- |
| if    | 输入的文件名称   input file      |
| of    | 输出的文件名称   output file     |
| bs    | 设置每个“块”的大小  block size |
| count | 设置要复制“块”的个数           |

例如我们可以用dd命令从/dev/zero设备文件中取出一个大小为560MB的数据块，然后保存成名为560_file的文件。在理解了这个命令后，以后就能随意创建任意大小的文件了：

```c
$ dd if=/dev/zero of=560_file count=1 bs=560M
```

dd命令的功能也绝不仅限于复制文件这么简单。如果您想把光驱设备中的光盘**制作成iso格式**的镜像文件，在Windows系统中需要借助于第三方软件才能做到，但在Linux系统中可以直接使用dd命令来压制出光盘镜像文件，将它变成一个可立即使用的iso镜像

```c
$ dd if=/dev/cdrom of=RHEL-server-7.0-x86_64-LinuxProbe.Com.iso
```

考虑到有些读者会纠结bs块大小与count块个数的关系,只要能满足需求，可随意组合搭配方式

7. file命令

file命令用于查看文件的类型，格式为“file 文件名”。

在Linux系统中，由于文本、目录、设备等所有这些一切都统称为文件，而我们又不能单凭后缀就知道具体的文件类型，这时就需要使用file命令来查看文件类型了。

```c
$ file anaconda-ks.cfg 
anaconda-ks.cfg: ASCII text
$ file /dev/sda
/dev/sda: block special
```

## 打包压缩与搜索命令

1. tar命令

tar命令用于对文件进行打包压缩或解压，格式为“tar [选项] [文件]”。

在Linux系统中，常见的文件格式比较多，其中主要使用的是`.tar或.tar.gz或.tar.bz2`格式，我们不用担心格式太多而记不住，其实这些格式大部分都是由tar命令来生成的

| 参数 | 作用                   |
| ---- | ---------------------- |
| -c   | 创建压缩文件           |
| -x   | 解开压缩文件           |
| -t   | 查看压缩包内有哪些文件 |
| -z   | 用Gzip压缩或解压       |
| -j   | 用bzip2压缩或解压      |
| -v   | 显示压缩或解压的过程   |
| -f   | 目标文件名             |
| -p   | 保留原始的权限与属性   |
| -P   | 使用绝对路径来压缩     |
| -C   | 指定解压到的目录       |

首先，`-c`参数用于创建压缩文件，`-x`参数用于解压文件，因此这两个参数不能同时使用。
其次，`-z`参数指定使用Gzip格式来压缩或解压文件，`-j`参数指定使用bzip2格式来压缩或解压文件。用户使用时则是根据文件的后缀来决定应使用何种格式参数进行解压。
在执行某些压缩或解压操作时，可能需要花费数个小时，如果屏幕一直没有输出，您一方面不好判断打包的进度情况，另一方面也会怀疑电脑死机了，因此非常推荐使用`-v`参数向用户不断显示压缩或解压的过程。
`-C`参数用于指定要解压到哪个指定的目录。
`-f`参数特别重要，它必须放到参数的最后一位，代表要压缩或解压的软件包名称。刘遄老师一般使用“`tar -czvf` 压缩包名称`.tar.gz` 要打包的目录”命令把指定的文件进行打包压缩；相应的解压命令为“`tar -xzvf` 压缩包名称`.tar.gz`”。

2. grep命令

grep命令用于在文本中执行关键词搜索，并显示匹配的结果，格式为“grep [选项] [文件]”。

| 参数   | 作用                                           |
| ------ | ---------------------------------------------- |
| -b     | 将可执行文件(binary)当作文本文件（text）来搜索 |
| -c     | 仅显示找到的行数                               |
| -i     | 忽略大小写                                     |
| **-n** | 显示行号                                       |
| **-v** | 反向选择——仅列出没有“关键词”的行。         |

grep命令是用途最广泛的文本搜索匹配工具，虽然有很多参数，但是大多数基本上都用不到。我们在这里只讲两个最最常用的参数：`-n`参数用来显示搜索到信息的行号；`-v`参数用于反选信息（即没有包含关键词的所有信息行）。这两个参数几乎能完成您日后80%的工作需要，至于其他上百个参数，即使以后在工作期间遇到了，再使用man grep命令查询也来得及。

```c
$ grep /sbin/nologin /etc/passwd
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
```

3. find命令

find命令用于按照指定条件来查找文件，格式为“find [查找路径] 寻找条件 操作”。

本书中曾经多次提到“Linux系统中的一切都是文件”，接下来就要见证这句话的分量了。在Linux系统中，搜索工作一般都是通过find命令来完成的，它可以使用不同的文件特性作为寻找条件（如文件名、大小、修改时间、权限等信息），一旦匹配成功则默认将信息显示到屏幕上。

| 参数               | 作用                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| -name              | 匹配名称                                                                               |
| -perm              | 匹配权限（mode为完全匹配，-mode为包含即可）                                            |
| -user              | 匹配所有者                                                                             |
| -group             | 匹配所有组                                                                             |
| -mtime -n +n       | 匹配修改内容的时间（-n指n天以内，+n指n天以前）                                         |
| -atime -n +n       | 匹配访问文件的时间（-n指n天以内，+n指n天以前）                                         |
| -ctime -n +n       | 匹配修改文件权限的时间（-n指n天以内，+n指n天以前）                                     |
| -nouser            | 匹配无所有者的文件                                                                     |
| -nogroup           | 匹配无所有组的文件                                                                     |
| -newer f1 !f2      | 匹配比文件f1新但比f2旧的文件                                                           |
| --type b/d/c/p/l/f | 匹配文件类型（后面的字幕字母依次表示块设备、目录、字符设备、管道、链接文件、文本文件） |
| -size              | 匹配文件的大小（+50KB为查找超过50KB的文件，而-50KB为查找小于50KB的文件）               |
| -prune             | 忽略某个目录                                                                           |
| -exec …… {}\;      | 后面可跟用于进一步处理搜索结果的命令（下文会有演示）                                   |

这里需要重点讲解一下-exec参数重要的作用。这个参数用于把find命令搜索到的结果交由紧随其后的命令作进一步处理，它十分类似于第3章将要讲解的管道符技术，并且由于find命令对参数的特殊要求，因此虽然exec是长格式形式，但依然只需要一个减号（-）。

根据文件系统层次标准（Filesystem Hierarchy Standard）协议，**Linux系统中的配置文件会保存到/etc目录中（详见第6章）。**如果要想获取到该目录中所有以host开头的文件列表，可以执行如下命令：

```c
$ find /etc -name "host*" -print
```
如果要在整个系统中搜索权限中包括SUID权限的所有文件（详见第5章），只需使用-4000即可：

```c
$ find / -perm -4000 -print
```

进阶实验：在整个文件系统中找出所有归属于linuxprobe用户的文件并复制到/root/findresults目录。

该实验的重点是“-exec {}   \;”参数，其中的{}表示find命令搜索出的每一个文件，并且命令的结尾必须是“\;”。完成该实验的具体命令如下：

```c
$ find / -user linuxprobe -exec cp -a {} /root/findresults/ \;
```