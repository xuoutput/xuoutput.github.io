---
title: Font Awesome一套绝佳的图标字体库和CSS框架
date: 2018-03-06 15:47:07
tags:
- vue
- font-awesome
categories:
- newbie项目
comments: false
permalink:
---
# Font Awesome一套绝佳的图标字体库和CSS框架

Font Awesome为您提供可缩放的矢量图标，您可以使用CSS所提供的所有特性对它们进行更改，包括：大小、颜色、阴影或者其它任何支持的效果。

* 一个字库，675个图标
    仅一个Font Awesome字库，就包含了与网页相关的所有形象图标。
* 无需依赖JavaScript
    Font Awesome完全不依赖JavaScript，因此无需担心兼容性。
* 无限缩放
    无论在任何尺寸下，可缩放的矢量图形都会为您呈现出完美的图标。
* 如言语一般自由
    Font Awesome完全免费，哪怕是商业用途。请查看许可。
* CSS控制
    只要CSS支持，无论颜色、大小、阴影或者其它任何效果，都可以轻易展现。
* 高分屏完美呈现
    Font Awesome的矢量图标，将使您的网站在视网膜级的高分屏上大放异彩。
* 完美兼容其它框架
    尽管是为Bootstrap设计，但Font Awesome同样能与其它框架完美协同运作。
* 可用于桌面系统
    用于桌面系统，或需要一套完整的矢量图，请查看备忘。
* 可适配于屏幕阅读器
    与其它字体不同，Font Awesome不会影响屏幕阅读器正常工作。

## 使用

## 最简单的方式：[BootstrapCDN](http://www.bootstrapcdn.com/#fontawesome_tab) （由[MaxCDN](https://www.maxcdn.com/)提供）

一句话将**Font Awesome**加入您的网页中。您完全不用下载或者安装任何东西！

1. 将以下代码粘贴到网页HTML代码的 `<head>` 部分.

```html
<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
```

> 当新版本发布时，BootstrapCDN需要一点时间来同步到最新版本。稍安勿躁 :)

2. 参考[示例](http://fontawesome.dashgame.com/#basic)，然后开始使用Font Awesome吧!

## 简单方式之一：使用默认CSS

如果您使用了默认的**Bootstrap CSS**样式，那么你可以使用这种方式来引入默认的**Font Awesome CSS**样式。

1. 复制整个 font-awesome 文件夹到您的项目中。
2. 在HTML的 `<head>` 中引用**font-awesome.min.css**。

```html
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">

<!-- 当然也用CND了 -->
<link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

```

## 简单方式之二：LESS Ruby Gem

## 简单方式之三：SASS Ruby Gem

## 使用实例

### 基本图标

您可以将Font Awesome图标使用在几乎任何地方，只需要使用**CSS前缀 fa** ，**再加上图标名称**。 Font Awesome是为使用**内联元素**而设计的。我们通常更喜欢使用 <i> ，因为它更简洁。 但实际上使用 `<span>` 才能更加语义化(span在嵌套组合时可以用)。

```html
<i class="fa fa-camera-retro"></i> 这是一个fa-camera-retro图标
```

如果您修改了图标容器的字体大小，图标大小会随之改变。同样的变化也会发生在颜色、阴影等其它任何CSS支持的效果上。

### 大图标

使用 **fa-lg (33%递增)、fa-2x、 fa-3x、fa-4x，或者 fa-5x** 类 来放大图标。

```html
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
```

如果图标的底部和顶部被截断了，您需要**增加行高**来解决此问题。

### 固定宽度

使用 `fa-fw` 可以将图标设置为一个固定宽度。**主要用于不同宽度图标无法对齐的情况。 尤其在列表或导航时起到重要作用**。

```html
<div class="list-group">
  <a class="list-group-item" href="#"><i class="fa fa-home fa-fw"></i>&nbsp; Home</a>
  <a class="list-group-item" href="#"><i class="fa fa-book fa-fw"></i>&nbsp; Library</a>
  <a class="list-group-item" href="#"><i class="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
  <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
</div>
```

### 用于列表

使用 `fa-ul` 和 `fa-li` 便可以简单的将**无序列表的默认符号替换掉**。

```html
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
</ul>
```

### 边框与对齐

使用 `fa-border` 以及 `pull-right` 或 `pull-left` 可以轻易构造出**引用**的特殊效果。

```html
<i class="fa fa-quote-left fa-3x pull-left fa-border"></i>
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
```

### 动画

使用 `fa-spin` 类来使任意图标**旋转**，现在您还可以使用 `fa-pulse` 来使其进行8方位旋转。尤其适合 **fa-spinner、fa-refresh 和 fa-cog** 。

```html
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
<i class="fa fa-refresh fa-spin"></i>
<i class="fa fa-cog fa-spin"></i>
<i class="fa fa-circle-o-notch fa-spin"></i>
```

 CSS3动画不支持IE8-IE9。

### 旋转与翻转

使用 `fa-rotate-*` 和 `fa-flip-*` 类可以对图标进行任意旋转和翻转。

```html
<i class="fa fa-shield"></i> normal<br>
<i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
<i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
<i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
<i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
<i class="fa fa-shield fa-flip-vertical"></i> icon-flip-vertical
```

### 组合使用

如果想要将**多个图标组合起来**，使用 `fa-stack` 类作为父容器， fa-stack-1x 作为正常比例的图标， fa-stack-2x 作为大一些的图标。还可以使用 `fa-inverse` 类来切换图标颜色。您可以在父容器中 通过添加 **大图标 fa-lg** 类来控制整体大小。

```html
<span class="fa-stack fa-lg">
  <i class="fa fa-square-o fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
fa-twitter on fa-square-o<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
</span>
fa-flag on fa-circle<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-square fa-stack-2x"></i>
  <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
</span>
fa-terminal on fa-square<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-camera fa-stack-1x"></i>
  <i class="fa fa-ban fa-stack-2x text-danger"></i>
</span>
fa-ban on fa-camera
```

### Bootstrap 3 示例

Font Awesome 完全兼容 Bootstrap 的所有组件。

```html
<a class="btn btn-danger" href="#">
  <i class="fa fa-trash-o fa-lg"></i> Delete</a>
<a class="btn btn-default btn-sm" href="#">
  <i class="fa fa-cog"></i> Settings</a>

<a class="btn btn-lg btn-success" href="#">
  <i class="fa fa-flag fa-2x pull-left"></i> Font Awesome<br>Version 4.7.0</a>

<div class="btn-group">
  <a class="btn btn-default" href="#"><i class="fa fa-align-left"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-center"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-right"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-justify"></i></a>
</div>

<div class="input-group margin-bottom-sm">
  <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
  <input class="form-control" type="text" placeholder="Email address">
</div>
<div class="input-group">
  <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
  <input class="form-control" type="password" placeholder="Password">
</div>

<div class="btn-group open">
  <a class="btn btn-primary" href="#"><i class="fa fa-user fa-fw"></i> User</a>
  <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
  <span class="fa fa-caret-down"></span></a>
  <ul class="dropdown-menu">
    <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a></li>
    <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Delete</a></li>
    <li><a href="#"><i class="fa fa-ban fa-fw"></i> Ban</a></li>
    <li class="divider"></li>
    <li><a href="#"><i class="i"></i> Make admin</a></li>
  </ul>
</div>
```

### 补充

```html
<i class="fa fa-pencil-square" aria-hidden="true"></i>
```

**Accessible Rich Internet Applications**
图标的可访问性

现代的辅助技术能够识别并朗读由 CSS 生成的内容和特定的 Unicode 字符。为了避免 屏幕识读设备抓取非故意的和可能产生混淆的输出内容（尤其是当图标纯粹作为装饰用途时），我们为这些图标设置了 `aria-hidden="true"` 属性。

如果你使用图标是为了表达某些含义（不仅仅是为了装饰用），请确保你所要表达的意思能够通过被辅助设备识别，例如，包含额外的内容并通过 .sr-only 类让其在视觉上表现出隐藏的效果。

如果你所创建的组件不包含任何文本内容（例如， `<button>` 内只包含了一个图标），你应当提供其他的内容来表示这个控件的意图，这样就能让使用辅助设备的用户知道其作用了。这种情况下，你可以为控件添加 aria-label 属相。
