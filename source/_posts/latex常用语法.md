---
title: latex常用语法
date: 2018-11-24 19:13:03
tags:
- markdown
- latex
- vscode
categories:
- 前端教程
comments: false
permalink:
mathjax: true
---

# latex常用语法

latex是用来排版文章和数学公式的.基于Tex. 类似web, html+css => 网页.
这是有.tex+.cls/sty => pdf, 也是内容和样式分离.

[中科大Latex模板](https://github.com/ustctug/ustcthesis) 里面还有一个106分钟的教程
[清华大学Latex模板](https://github.com/xueruini/thuthesis)

[在线latex公式](https://www.codecogs.com/latex/eqneditor.php)

## 基本使用

首先不需要自己安装, 用在线的好了[YouTube视频](https://www.youtube.com/watch?v=RcvSMu9uRfA&list=PLsaRQCHmdZTD3rcrmGsV-AqCfDWJuBDNd)他推荐的[shareLatex](https://www.sharelatex.com/), 现在会跳转到[overleaf](https://www.overleaf.com/)

vscode上装了Latex的这个LW, 但是不能预览, 不晓得怎么回事.

也不需要懂各种文件的格式, 只需要先会用好了. 懂一点语法.能预览看.

## 跟着视频走一遍

基本上懂了

## 基本知识

1. LATEX中的公式概念

当做命令吧: 以`\`开头, 必选参数`{}` 可选参数`[]`

2. 环境的概念

以`\begin{环境名}`开始, `\end{环境名}`结束

3. LATEX中排版文字和公式: 所有有书序模式和文本模式

`$ $` 和 `$$ $$`行内和行间的数学公式

效果如下

这是行内的公式: $f(x)= \sum_{i=0}^{n}\int_{a}^{b}g(t)dt$
这是行间公式:
$$f(x)= \sum_{i=0}^{n}\int_{a}^{b}g(t)dt$$

**注意:** 如果`hexo`出现不能显示公式的问题.

1. 那么可以用[在线的latex中转图片来代替](https://cloud.tencent.com/developer/article/1337897), 虽然这种方式不好,比如遇到`f(x)`
2. 开启`hexo`的`MathJax`功能(推荐): 这样就可以用`$`来写公式.

{% post_link hexo中使用LaTex公式的开启方法 hexo中使用LaTex公式的开启方法(适用于next主题和非next主题) %}
其他参考:
[1. hexo的next主题开启mathjax](https://blog.csdn.net/yexiaohhjk/article/details/82526604)
[2. 使用LaTex添加公式到Hexo博客里](https://www.jianshu.com/p/68e6f82d88b7)

## 数学公式基本语法 不会没关系,用[在线latex公式](https://www.codecogs.com/latex/eqneditor.php)

常见的一些

|命令|效果| | 命令|效果|
|:--:|:--:|:--:|:--:|:--:|
|\sqrt{2}|$\sqrt{2}$||\sqrt[3]{2}|$\sqrt[3]{2}$|
|x_2|$x_2$||x^2|$x^2$|
|\frac{1}{2}|$\frac{1}{2}$||\lim_{x\to2}x^2+2|$\lim_{x\to2}x^2+2$|

$\lim\limits_{\substack{\sigma\rightarrow0 \\
\tau_0\rightarrow0}}\frac{\sigma}{\tau_0} $

|命令|效果| | 命令|效果|
|:--:|:--:|:--:|:--:|:--:|
|\sum|$\sum$||\sum_{i=1}^{n}|$\sum_{i=1}^{n}$|
|\int|$\int$||\int_{a}^{b}|$\int_{a}^{b}$|
|\iint|$\iint$||\iint_{a}^{b}|$\iint_{a}^{b}$|
|\prod|$\prod$||\prod_{i=1}^{n}|$\prod_{i=1}^{n}$|
|\bigcup|$\bigcup$||\bigcup_{i=1}^{n}|$\bigcup_{i=1}^{n}$|
|\bigcap|$\bigcap$||\bigcap_{i=1}^{n}|$\bigcap_{i=1}^{n}$|

一些希腊字母

|命令|效果| | 命令|效果|
|:--:|:--:|:--:|:--:|:--:|
|\alpha|$\alpha$||\beta|$\beta$|
|\gamma|$\gamma$||\delta|$\delta$|
|\epsilon|$\epsilon$||\zeta|$\zeta$|
|\eta|$\eta$||\theta|$\theta$|
|\iota|$\iota$||\omega|$\omega$|
|\lambda|$\lambda$||\mu|$\mu$|
|\xi|$\xi$||\phi|$\phi$|
|\pi|$\pi$||\rho|$\rho$|
|\sigma|$\sigma$||\tau|$\tau$|
|\upsilon|$\upsilon$||\nu|$\nu$|
|\chi|$\chi$||\psi|$\psi$|
|\kappa|$\kappa$||||

如果使用**大写**的希腊字母，把命令的首字母变成大写即可，例如 `\Gamma` 输出的是 $\Gamma$。

如果使用**斜体大写**希腊字母，再在大写希腊字母的LaTeX命令前加上`var`，例如`\varGamma` 生成 $\varGamma$。

[MathJax basic tutorial](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## 宏包 `\package{packageName}`

就是引入模块

## latex常见文件类型

| LaTex模板常见文件类型 | 功能介绍                                                       |
| :-------------------: | :------------------------------------------------------------: |
| .dtx                  | `Documented LaTeX sources`，宏包重要部分                       |
| .ins                  | `installation`，控制 TeX 从 `.dtx` 文件里释放宏包文件          |
| .cfg                  | `config`， 配置文件，可由上面两个文件生成                      |
| .sty                  | `style files`使用`\usepackage{...}`命令进行加载                |
| .cls                  | `classes files`，类文件，使用`\documentclass{...}`命令进行加载 |
| .aux                  | `auxiliary`， 辅助文件，不影响正常使用                         |
| .bst                  | `BibTeX style file`，用来控制参考文献样式                      |

## 参考

[脚丫先生的LaTeX入门](https://blog.csdn.net/shujuelin/article/details/79340373)
