---
title: '基于 PotPlayer 和 madVR 的播放器教程'
date: 2018-02-08 11:17:40
tags:
- VCB-Studio
- 视频
- potplayer
categories:
- 多媒体
---

原文链接，本blog只是做个非商业学习存档
[\[VCB-Studio 科普教程 2.5\] 基于 PotPlayer 和 madVR 的播放器教程](https://vcb-s.com/archives/7228)

# \[VCB-Studio 科普教程 2.5\] 基于 PotPlayer 和 madVR 的播放器教程

Potplayer 是高清影视常用的播放器，界面简洁，功能齐全，比 MPC-HC 和 MPC-BE 更人性化；**但其默认方案十分糟糕，预设过多错误，无法正确播放 10-bit 视频，一直饱受诟病**。VCB-Stuido 以往发布的数篇高清教程大多偏重于 madVR，在 PotPlayer 的设置方面有些错漏。为了广大观众能正确、便捷地用 PotPlayer 享受高清影视，我们为大家带来一篇基于 PotPlayer 的高清影视全套 64-bit 工具链完整配置图文详解教程。

本教程花大力气调整 Potplayer ，**很大程度上是为了纠正 Potplayer 错误的默认设置，让它能跟 MPC-HC 和 MPC-BE 站到同一起跑线上**。如果 VCB-Studio 其他播放器教程中的 Potplayer 设置与本篇有冲突，**以本篇教程为准**。如果看不清图片，请在图片上右键点击-在新选项卡中打开，查看大图。**先看完教程再跟着教程操作**

# 工具安装篇

1、为了避免版本混乱导致的bug，本教程提供所全套 64-bit 工具：

PotPlayer（播放器），LAV Filters（分离/解码器），madVR（视频渲染器），xy-vsFilter（通用字幕插件），xy-SubFilter（madVR专用字幕插件）。下载链接：[百度网盘](https://pan.baidu.com/share/init?surl=jInDyOu)  密码：fvq7

安装路径只允许纯英文，否则一些工具会无法使用，故建议单独建一个纯英文路径的文件夹 Tools，把这些以上提到的程序都放进去，方便更新与维护。

2、安装 PotPlayer 和 LAV Filters。
二者都是普通的 exe 安装包，双击启动即可，将安装路径设置到 Tools 文件夹，其他安装选项全默认。

3、安装 madVR，xy-VSFilter 或 xy-SubFilter。
二者都是插件，安装方法为：将压缩包解压至 Tools 文件夹中，右键点击各自的 install.bat，以管理员权限运行，若移动这些组件则需要重新安装。

我是按potplayer的路径，都放在里面了
![installPath](installPath.png)

# PotPlayer 设置篇

## 1、 显卡卡驱动设置。

### N 卡用户
打开 Nvidia 驱动面板，将红框中的动态范围参数调整至完全，蓝框的输出颜色深度调到10bpc或者8bpc（取决于显示器支持），如下图
![001-N卡驱动设置.png](001-N卡驱动设置.png)
![N卡驱动2.png](N卡驱动2.png)

### Intel 核显用户

将量化范围设为全范围：

![IntelFullRange.png](IntelFullRange.png)

### AMD 显卡

新版设置界面，选择 Full RGB：
![AMD_Full.png](AMD_Full.png)

CCC 旧版界面，同样选择 Full RGB：
![AMDFullRange.png](AMDFullRange.png)

## 2、PotPlayer 选项设置。

我们先用 PotPlayer 随便打开一个视频，按一下 Tab 键，调出 Potplayer 自带的 OSD 菜单，如下图。这是 Potplayer 的默认方案，读作 **“a piece of shit”**。接下来我们要调教它，关掉各种渣渣内置滤镜，以我们准备的各种外置滤镜代替之。
![002-pot默认方案.png](002-pot默认方案.png)

**蓝色框**中的 Pot 内置解码器，我们要用 LavFilters 代替；
**红色框**中的视频渲染器，简称 EVR，是Windows 充话费送的渣渣，几乎所有名字中带有“影音”二字的垃圾播放器用的都是它；
**橙色框**中的部分，是 Pot 内置的视频处理滤镜弄出来的，不知道它怎么 PS 画面的，故需要消灭之。

### （1）在播放界面点击鼠标右键-选项-**播放**，(快捷键F5)打开设置界面，开始**调教 Pot 的进度条**，将**红框**中的部分调整至如下图，其他选项也可参照图中改动。
![002-调进度条.png](002-调进度条.png)

### （2）切至**滤镜**选项卡，**关闭 Pot 内置滤镜（最重要）**，防止 Pot 对视频进行瞎处理，操作如下图。
![003-关闭Pot内部滤镜.png](003-关闭Pot内部滤镜.png)
如果没有关闭 Potplayer 内置图像滤镜，数据在传递给 madVR 前已经从 10-bit 砍成 8-bit 损失精度，madVR 内部再怎么精度高也是白搭。这一点 VCB-Studio 的旧版 PotPlayer 教程中最大的遗漏，它直接导致这片新教程的出现。

### （3）展开**滤镜**选项卡，点击 **源滤镜/分离器** 分支，开始载入外挂 LavFilters。点击红框中的按键，管理滤镜和解码器。
![004-添加外挂滤镜.png](004-添加外挂滤镜.png)
点击下图红框中的搜索后添加，左边蓝框会出现一堆解码器；点击确定，加载 LavFilters 完成。
![005-添加外挂滤镜2.png](005-添加外挂滤镜2.png)
![005-添加外挂滤镜3.png](005-添加外挂滤镜3.png)
点击确定后上图界面关闭，自动回到源滤镜/分离器选项卡。带*的选项都是外挂的滤镜/解码器。将红框中的所有选项都换成 Lav Splitter Source；无法切换为 Lav 的就保持原状，参考下图
![006-LAV分离器.png](006-LAV分离器.png)
接下来，视频解码器和音频解码器也如法炮制，所有能换成 Lav 的项目全部换成 Lav。
![007-LAV视频解码器.png](007-LAV视频解码器.png)
![008-LAV音频解码器.png](008-LAV音频解码器.png)

下一步，个人滤镜优先权，添加字幕插件 xy-vsFilter（即 DirectVobSub，通用） 或 xy-SubFilter（madVR专用）。以前者为例，操作如图。
![010-字幕插件.png](010-字幕插件.png)
![010-字幕插件2.png](010-字幕插件2.png)
![xy-vsfilter字幕插件优先级.png](xy-vsfilter字幕插件优先级.png)
![xy-vsfilter字幕插件优先级2.png](xy-vsfilter字幕插件优先级2.png)
优先级设置上，DirectVobSub (auto-loading version) 设为强制使用，负责外挂字幕；DirectVobSub 设为按优先级使用，负责内挂字幕。

建议使用 madVR 的同学用 xy-SubFilter，设置方法相同，效果会好一点，Bug 也少点，支持内挂图形字幕，不支持外挂图形字幕。

如果要自动载入字幕，一定要让字幕文件跟视频频文件的文件名相同。

以上二者均可渲染内挂和外挂文字字幕（ass 和 srt 等格式），但是不能渲染外挂图形字幕（SUP 和 PGS）。外挂图形字幕请使用 Pot 内置字幕插件。

（个人滤镜优先权这块可以实现一些额外功能，比如一些特殊特效代码必须使用的vsFilterMod；插帧用的SVP或AFM都需要在这里加插件，但是我强烈不建议折腾这些东西。它们会极大地增加bug概率，还会造成降低精度、撕裂、鬼影等无法修复的瑕疵，其副作用足以抵消我们为优化画质所做的所有努力。）

### （4）切换至视频选项卡，设置默认视频渲染器，选择 madVR。
![012-视频渲染器选择.png](012-视频渲染器选择.png)
madVR 的全称是 madshi Video Renderer，是 Windows 平台最强视频渲染器，调教得当的话效果媲美顶级蓝光机，当然消耗也不小。

屏幕 1920×1080 分辨率，则 GTX 960 / 1050 Ti 级别显卡足够体验 madVR 的所有好处；屏幕 2560×1440 或者 3840×2160 分辨率，GTX 970 / 1060 3G 级别显卡勉强可以享受所有好处，GTX 1060 6G 足够，GTX 1070 则绰绰有余。

### （5）切换至 色系/属性 选项卡，设置 YCbCr<->RGB 规则，设为自动选择，如图。
![013-色彩空间转换.png](013-色彩空间转换.png)

### （6）音频渲染器设置

根据一些文档叙述，WSAPI渲染器比 Default Direct SoundDevice 效果好，具有程序独占，抗干扰，延迟低的优点；建议关闭规格化，避免 Pot 擅自改变音量。操作方式如下：
![014-音频渲染器选择.png](014-音频渲染器选择.png)
![015-取消声音规格化.png](015-取消声音规格化.png)

做完这一步，Potplayer 设置就完成了，记得点击应用和确定按钮，不然就白忙活了。

# LAV 和字幕设置篇

本部分主要教如何切换视频、音频、字幕轨道，以及设置软解和硬解的方法。
随便打开一个视频，在播放界面点击右键-属性，打开此界面。点击橙色框就能进入视频/音频解码器设置界面。

![009-如何调整解码器（右键-属性）.png](009-如何调整解码器（右键-属性）.png)

## （1）视频解码器 LAV Video Decoder 设置。LAV 的设置分为两套方案，A 方案应搭配 madVR 使用，B 方案搭配默认的 EVR(CP) 使用。

**A**：如果使用 madVR，橙色框中的 Output Format 勾选除了 AYUV 以外的所有选项；RGB Output Level选 PC；Dither Mode 选 Random。LAV 默认设置就是如此，如图所示。
![LAV-all.png](LAV-all.png)

**B**：如果使用 EVR（自动选择），橙色框中的 Output Format 只勾选 RGB24 选项；其他同上。（仅供需要省电或显卡性能不足者使用）
![LAV-RGB24.png](LAV-RGB24.png)

**为什么 madVR 和 EVR 勾选方式不同？**

因为 madVR 能正确处理 LAV 解码出的所有数据，LAV 解码出的数据原封不动喂给 madVR 就是最好的，这是 madVR 被称作最强视频渲染器的主要原因之一。然而 EVR 只支持处理 8-bit 数据，LAV 解码出的 10-bit YUV 数据会被 EVR 直接砍成 8-bit YUV 进行处理，导致精度大幅降低，色带满天飞，这也是Pot 默认方案读作 a piece of shit 的主要原因之一；如果让 LAV 解码后将 10-bit YUV 转为 RGB24，也就是 8-bit RGB，再喂给 EVR 处理，可避免精度大幅损失。

渲染器 madVR 和 EVR 可以在 pot 的播放界面快速切换，方法是：右键-视频-视频输出设备。切换渲染器的同时，记得要修改对应的 LAV Video Decoder 设置。再次强调，A 方案配 madVR 使用，B 方案配 Potplayer 默认的 EVR 使用。

很多使用 madVR 的观众被这篇供非 MadVR 用户使用的教程 https://vcb-s.com/archives/4384 误导，只勾选了 RGB24，导致 madVR 没有接收到 LAV 解码出的正确的数据。

## （2）硬解相关设置。

N 卡 GTX 950 / GTX 960 / GTX 1000 全系列、A 卡 4 系 5 系全系列以及 Intel 七代（Kaby Lake）处理器集成显卡可硬解 HEVC 10-bit YUV420 视频。

常见显卡都能硬解 AVC 8-bit YUV420 视频，所有显卡都不能硬解 AVC 10-bit 视频。接下来以 HEVC 10-bit YUV420 的视频进行示范。

CPU 软解 + madVR 示范，注意绿框中的 Active Decoder 和红框中的输出：
![016-LAV解码器设置与HEVC-10bit-软解示范.png](016-LAV解码器设置与HEVC-10bit-软解示范.png)

蓝色和绿色框中是解码器选项，如果使用 CPU 软解，则选择 None；如果使用显卡 GPU 进行硬解，则选择 DXVA2 (copy-back) 或 DXVA2 (native)，A/N 都可用，前者兼容性更好，后者更节省 CPU；如果使用英特尔核显，则选用 Intel QuickSync；NVIDIA CUVID 是 N 卡专用硬解方式，基本用不上。

DVXA2 (native)硬解 + madVR 示范：
![017-LAV解码器设置与HEVC-10bit-硬解示范.png](017-LAV解码器设置与HEVC-10bit-硬解示范.png)

红框中显示 dxva，实际上输出依然是 P010，橙框中的 Active Decoder 为 dxva2n，OK 表明显卡支持此硬解方式。DXVA2 (copy-back) 和其他硬解方式都类似。

解码方案优先级推荐：CPU软解 > DXVA2(copy-back) = Intel QuickSnyc > DXVA2(native) > NVIDIA CUVID （建议没事别用硬解，因为偶尔会出现 bug，况且大多数人也不缺这点 CPU 性能）

## （3）音频解码器 LAV Audio Decoder 设置。仅有一项需要调整，勾选 Enable Mixing。

![018-LAV音频解码器-混音设置.png](018-LAV音频解码器-混音设置.png)

由于绝大部分人都使用双声道设备，所以遇到 5.1 声道音轨时，只有左/右两声道会被耳机/音响接收，其他声道都直接丢弃了。所以，一般来说我们应让 LAV 把多声道混流成双声道（Stereo）再输出；玩多声道音响的土豪请随意。

## （4）字幕处理

我们已经在上面设置好了 xy-vsfilter 或 xy-Subfilter 字幕插件，所以要关闭 Pot 内置渣渣字幕插件，否则就会出现两行字幕的奇观，右键-字幕-取消勾选显示字幕，如图。字幕应该跟视频放在同一目录下，且与视频文件同名，会被自动加载，字幕由 DirectVobSub 或 xy-SubFilter 控制，而非 Potplayer。
![020-关闭Pot内置字幕滤镜.png](020-关闭Pot内置字幕滤镜.png)

## （5）切换多字幕轨/多视频/多音轨

使用右下角的任务栏里 LAV 和字幕插件 DirectVobSub 或 xy-SubFilter 的图标。很多观众都不知道 VCB-Studio 以及其他压制组制作的 BD 往往含多条音轨，比如文件名中含 2flac、flac_aac、FLACX2 等字眼的 mkv，以及外挂 mka。这意味着视频带有多音轨，可能是 5.1，也可能是声优或是 staff 评论音轨，可以切换着使用。
![020-如何切换字幕轨和音频轨（右下角任务栏）.png](020-如何切换字幕轨和音频轨（右下角任务栏）.png)

切换音轨也可以直接点击右键-声音-选择声音来实现，进行切换；视频轨同理，不过多音轨很常见，而多视频轨几乎见不到。
![021-在potlapyer内切换音轨-02.png](021-在potlapyer内切换音轨-02.png)

# madVR 调教篇
madVR 的核心优势有两个：

1、高精度的数据处理，避免画面失真，产生色带、锯齿等瑕疵；

2、高质量的缩放算法，在片源分辨率低于屏幕分辨率时，提供更清晰、更锐利的画面，算法甚至优于很多高级蓝光机。

 

madVR 功能强大，其调教也大有学问，本篇教程不再赘述 madVR 调教具体步骤，详情请见我们之前做过的 madVR教程: [\[VCB-Studio 科普教程 2\] madVR 渲染器配置教程](https://vcb-s.com/archives/5610)

如果教程也无法满足你的需求，欢迎有耐心、有基础者钻研：万年冷冻库 最强渲染器——madVR设置研究   

 

以上，以 Potplayer 为基础的高质量播放器工具链设置完成，请尽情享受高清影视的乐趣吧！

 

 

关于一些问题的统一回复：

1、为什么使用 madVR 全屏时候会黑屏？

答：黑短短几秒是正常的，表明 madVR 正在切换至全屏独占模式（fullscreen exlucsive mode，简称 FSE ），这个模式有一些好处，比如防止画面撕裂。

如果你不喜欢 FSE 模式，可以在 madVR 中关闭它，具体操作为：取消勾选 madVR 的控制面板里的 rendering -> general settings -> enable automatic fullscreen exlucsive mode 选项。

 

2、为什么全屏 FSE 模式下点鼠标/切音轨/切换字幕/拉进度条画面会闪？

答：因为全屏模式就是给你看视频用的，任何操作都应该在按 Enter 键 或 点击鼠标中键 退回到 窗口模式 后再进行。

此外，全屏模式下完全可以用键盘轻松控制，比如 ←/→  默认 后退/前进 5s；Ctrl + ←/Ctrl + → 默认后退/前进 30s；Ctrl + PageUp / Ctrl + PageDown 默认后退/前进 至上/下一章节，这些实用的快捷键都可以在 Potplayer 的设置里找到并定制。

 

3、为什么 EVR 和 madVR 切换时会卡死？

答：播放过程中， madVR 渲染器和 EVR 渲染器相互切换可能导致卡死，故建议尽量在暂停时切换。同理，任何切换字幕、音轨等操作，如果出现问题，应先暂停再操作；如果还不行，尝试关闭视频，重新打开。

 

4、为什么我按照教程设置还有这样那样的 Bug ？

答：最安全的方式是使用本教程文首提供的安装包，并按照教程从头重新设置 Potplayer。 Potplayer 本身就是个问题大户，版本号还那么多，导入 reg 文件导致的 Bug 也五花八门，无从下手。但按照本文的步骤从头设置，至少能将出问题的概率压到最低。我在许多台电脑上，按照本文的步骤设置过 LAV + Potplayer + madVR，从没出现过 Bug。

 

5、如何配合此教程的方案使用插帧/倍速播放/截图/录制等功能？

答：自己动手，丰衣足食，以上大多数功能可以由 Potplayer 本身实现，但不保证在使用 madVR 后还能用。本教程的目的是提供基本完美的视频播放功能，是为欣赏视频用的，不是拿来折腾的，不可能为各种细枝末节的需求做定制调整。更何况即使我们有心，播放器本身也未必能实现。

 

6、为何我的画面是上下颠倒的？为何我的 madVR 老是崩溃？

答：这两个问题大多是由 xy-vsFilter 造成的，因为 xy-vsFilter 存在不少 Bug，本教程以 xy-vsFilter 作为字幕插件纯粹是为了照顾无法使用 madVR 的用户。因此，只要你电脑能跑得动 madVR ，我都强烈建议改用 madVR + xy-SubFilter 的组合。各种字幕插件至今都是 beta 版，madVR 也是，如果出了问题，除了更新到最新的版本，也没什么更好的办法。实在不行那就用播放器自带吧，mpv、mpc-hc 和 mpc-be 自带的字幕插件尚且堪用；Potplayer 变黄前自带的字幕功能也勉强凑合，但变黄后就是一坨 shit。
