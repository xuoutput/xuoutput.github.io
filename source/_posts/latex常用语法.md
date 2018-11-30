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

保存的代码
```
\documentclass{article}   {report}
\usepackage[utf8]{inputenc}

\title{Hello Workld}
\author{pppxehng}
\date{Augest 2018}

\begin{ducument}

\maketitle

\section{Introduction}

HELLO Workld

\end{document}


然后学习
chapters section paragraph sub-section

\documentclass{report}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
    \geometry{
        a4paper,
        total = {160mm,245mm},
        left = 30mm,
        top = 30mm
    }

\begin{ducument}

\chapter{Introduction to LATEX}
\section{Introduction}

HELLO Workld
\chapter{Advantages of LATEX}

\section{section1}   这是1.1

\subsection{subsection}  默认有序1.1.1, 然后加了*号\subsection*{subsection}  就没了1.1.1

\subsubsection{{seusebsectiob }}

\paragraph{{this line}}

\end{document}

table figures images

\usepackage{graphicx}

the fig. \ref{fig: logo} is the logp
\begin{figure}[ht]
    \centering
    \includegraphics[width=5in]{jkk.png}
    \caption{oafd logo}
    \label{fig: logo}           1.1
\end{figure}


mutiple images stacks in 
\usepackage{caption}
\usepackage{subcaption}


The Fig.\ref{mul_images} id an example of  two images stacked side by side

\begin{figure}[ht]      //h: here, t: top, b: bottom, p: page
    \centering
    \begin{subfigure}{0.49\textwidth}
        \centering
        \includegraphics[width=0.4\linewidth]{ninjas.png}
        \caption{figure 1}
        \label{fig:first}
    \end{subfigure}
    \begin{subfigure}{0.49\textwidth}
        \centering
        \includegraphics[width=0.4\linewidth]{ninjas.png}
        \caption{figure 2}
        \label{fig:second}
    \end{subfigure}
    \caption{oafd logo}
    \label{mul_images}          
\end{figure}


tables in LATEX
\chapter{Tables}
    \begin{table}[ht]
        \centering
        \scalebox{2}{
            \begin{tabular}{|l|c|r|}
                \hline
                Sr. No. & Column1 & Column 2 \\
                \hline
                \hline
                1 & Row1Col1 & Row1Col2 \\
                \hline
                2 & Row2Col1 & Row2Col2 \\
                \hline
                3 & Row3Col1 & Row3Col2 \\
                \hline
            \end{tabular}
        }
        \caption{First Table}
        \label{tab: firstTable}
    \end{table}

multicolumn & multirow Tables

The Table\ref{multicolumn_table} displays a table with multicolumn header

\begin{table}[ht]
    \centering
    \scalebox{1.5}{
        \begin{tabular}{|c|c|c|c|}
            \hline
            Sr & \multicolumn{3}{c|}{Multicolumn Header}\\
            \cline{2-4}
            No. & DataHeader1 & DataHeader2 & DataHeader3\\
            \hline
            1 & data1 & data2 & data3\\
            \hline
            2 & data1 & data2 & data3\\
            \hline
            3 & data1 & data2 & data3\\
            \hline
            4 & data1 & data2 & data3\\
            \hline
        \end{tabular}
    }
    \caption{Multicolumn Table}
    \label{multicolumn_table}
\end{table}

The Table\ref{multicolumn_table} displays a table with a cell spanning multiple rows
\usepackage{multirow}

\begin{table}[ht]
    \centering
    \scalebox{1.5}{
        \begin{tabular}{|c|c|c|}
            \hline
            Sr No. & Header1 & Header2\\
            \hline
            \multirows{2}{*}{1} & data1 & data2 \\
                                &data3 &data4\\
            \hline
            2 & data1 & data2\\
            \hline
        \end{tabular}
    }
    \caption{Multicolumn Table}
    \label{multicolumn_table}
\end{table}

Equations

\usepackage{amsmath}

\chapter{Equations}

The Eqn. \ref{circleeqn} displays the equation for the circle

\begin{equation}
    x^2=y^2=r2
    \label{circleeqn}
\end{equation}

The equation below shows us the equatin for the circle

\begin{equation*}
    x^2=y^2=r2
    \label{circleeqn}
\end{equation*}

THe equation for the circle is given as $x^2=y^2=r2$ 



Matrices & Derivatives

Ten matrices ate show in wquatin \ref{matrix}

\begin{equation}
    Y = \begin{bmatrix}
        a_{11} & a_{12} & a_{13}\\
        a_{21} & a_{22} & a_{23}\\
        a_{31} & a_{32} & a_{33}\\
    \end{bmatrix}
    \begin{bmatrix}
        x_1\\
        x_2\\
        x_3\\
    \end{bmatrix}
    \label{matrix}
\end{equation}

The derivative is shown in equatin \ref{derivative}

\begin{equation}
    \frac{dy}{dx} = 2t^2
    \label{derivative}
\end{equation}

The partial derivatives are shown in eqn \ref{partialder}

\begin{equation}
    \frac{du}{dt} = 2x\frac{\partial u}{\partial x} +
    2y\frac{\partial u}{\partial y}
    \label{partialder}
\end{equation}


Limits, summation & Integrals


Limits are inserted in Eqn. \ref{limits}

\begin{equation}
    \lim_{x\to2}x^2+2
    \label{limits}
\end{equation}

Summations can be inserted as shown in eqn. \ref{sum}

\begin{equation}
    \sum_{x=1}^{n}x^2=1
    \label{sum}
\end{equation}

Product sequence can be inserted as shown in Eqn. \ref{prod}

\begin{equation}
    \prod_{x=1}^{n}x^2
    \label{prod}
\end{equation}

Eqn. \ref{int} shows integration

\begin{equatin}
    \int_{0}^{n}x^2dx
    \label{int}
\end{equatin}


Citations & Bibliography

直接在google scholar中搜 然后有个cite 点击Bib Tex, 然后复制在一个单独的文件中可以 qian1990new这个是cite

@article{qian1990new,
  title={A new scientific field--open complex giant systems and the methodology},
  author={Qian, Xuesen and Yu, Jingyuan and Dai, Ruwei},
  journal={Chinese Journal of Nature},
  volume={13},
  number={1},
  pages={3--10},
  year={1990}
}

使用的使用

Thereference for this report are \cite{qian1990new} and ...

\bibliographystyle{ieeetr}
\bibliography{citation}
```