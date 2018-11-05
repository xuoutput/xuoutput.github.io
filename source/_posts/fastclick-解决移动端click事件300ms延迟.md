---
title: fastclick 解决移动端click事件300ms延迟
date: 2018-03-06 15:09:59
tags:
- vue
- fastclick
-categories:
- newbie项目
comments: false
permalink: 
---
# fastclick 解决移动端click事件300ms延迟

## 移动端click 事件延迟300ms

一般情况下，如果没有经过特殊处理，移动端浏览器在派发点击事件的时候，通常会出现300ms左右的延迟。也就是说，当我们点击页面的时候移动端浏览器并不是立即作出反应，而是会等上一小会儿才会出现点击的效果。在移动WEB兴起的初期，用户对300ms的延迟感觉不明显。但是，随着用户对交互体验的要求越来越高，现今，移动端300ms的点击延迟逐渐变得明显而无法忍受。

那么，移动端300ms的点击延迟是怎么来的呢？

## 产生原因

移动浏览器上支持的**双击缩放**操作，以及IOS Safari 上的**双击滚动**操作，是导致300ms的点击延迟主要原因。

## 预备知识：移动端点击一个元素触发事件的顺序

**以下是四种touch和click事件**
touchstart: //手指放到屏幕上时触发
touchmove: //手指在屏幕上滑动式触发
touchend: //手指离开屏幕时触发
touchcancel: //系统取消touch事件的时候触发，这个好像比较少用
click：//在这个dom（或冒泡到这个dom）上手指触摸开始，且手指未曾在屏幕上移动（某些浏览器允许移动一个非常小的位移值），且在这个在这个dom上手指离开屏幕，且触摸和离开屏幕之间的间隔时间较短（某些浏览器不检测间隔时间，也会触发click）才能触发
**上述事件发生顺序**：在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend -->click。

**双击缩放**：顾名思义，即用手指在屏幕上快速点击两次，移动端浏览器会将网页缩放至原始比例。 那么这和 300 毫秒延迟有什么联系呢？ 
**假定这么一个场景**。用户在浏览器里边点击了一个**链接**。由于用户可以进行双击缩放或者双击滚动的操作，当用户一次点击屏幕之后，浏览器并不能立刻判断用户是确实要打开这个链接，还是想要进行双击操作。**因此，浏览器就等待 300 毫秒，以判断用户是否再次点击了屏幕。**
也就是说，移动端浏览器会有一些默认的行为，比如双击缩放、双击滚动。这些行为，尤其是双击缩放，主要是为桌面网站在移动端的浏览体验设计的。而在用户对页面进行操作的时候，移动端浏览器会优先判断用户是否要触发默认的行为。

## 解决方案

### 禁用缩放(全部缩放)

对于不需要缩放的页面，通过设置`meta`标签禁用缩放，表明这个页面是不需要缩放的，双击缩放就没有意义了。此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。
该方法缺点在于必须通过完全禁用缩放来达到去掉点击延迟的目的，但我们初衷是想禁止默认双击缩放行为，这样就不用等待300ms来判断当前操作是否是双击。**但是通常情况下我们还是希望能通过双指缩放来进行缩放操作**，比如放大图片，很小的一段文字。

```html
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
```

### 更改默认视口宽度

移动端浏览器默认视口宽度一般比设备浏览器视窗宽度大，通常是980px,我们可以通过如下标签设置视口宽度为设备宽度。

```html
<meta name="viewport" content="width=device-width">
```

因为双击缩放主要是用来改善桌面站点在移动端浏览体验的，而随着响应式设计的普及，很多站点都已经对移动端做过适配和优化了，这个时候就不需要双击缩放了，**如果能够识别出一个网站是响应式的网站，那么移动端浏览器就可以自动禁掉默认的双击缩放行为并且去掉300ms的点击延迟**。chrome 32+中，如果设置了上述meta标签，那浏览器就可以认为该网站已经对移动端做过了适配和优化，就无需双击缩放操作了。
这个方案相比方案一的好处在于，它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。**不足在于其他浏览器的支持有限。**

### css touch-action

指针事件（Point Event）最初由微软提出，现已进入 [W3C 规范的候选推荐标准阶段](https://w3c.github.io/pointerevents/) (Candidate Recommendation)。指针事件是一个新的 web 事件系列，相应的规范旨在使用一个单独的事件模型，对所有输入类型，包括鼠标 (mouse)、触摸 (touch)、触控 (stylus) 等，进行统一的处理。
例如，你可以只去监听一个元素的 pointerdown事件，无需分别监听其 touchstart和mousedown事件。其中有一个和点击延迟直接相关的实现 —— 一个名为 touch-action的新 CSS 属性。根据[规范](https://w3c.github.io/pointerevents/#the-touch-action-css-property)，touch-action
**属性决定 “是否触摸操作会触发用户代理的默认行为。这包括但不限于双指缩放等行为”。**
从实际应用的角度来看，touch-action决定了用户在点击了目标元素之后，是否能够进行双指缩放或者双击缩放。因此，这也相当完美地解决了 300 毫秒点击延迟的问题。touch-action的默为 auto，将其置为 none 即可移除目标元素的 300 毫秒延迟。
目前而言，**Internet Explorer 实现了指针事件**，同时，现在已经有一些指针事件的 polyfills 可以在项目中使用了

### 指针事件的 polyfill

指针事件的 polyfill 比较多，以下列出比较流行的几个。

* Google 的 [Polymer](https://github.com/jquery/PEP)
* 微软的 [HandJS](https://archive.codeplex.com/?p=handjs)
* @Rich-Harris 的 [Points](https://github.com/Rich-Harris/Points)

为避免 300 毫秒点击延迟，我们主要关心这些 polyfill 是如何在**非 IE 浏览器中模拟 CSS touch-action属性的**，这其实是一个不小的挑战。由于浏览器会忽略不被支持的 CSS 属性，唯一能够检测开发者是否声明了 touch-action: none的方法是使用 JavaScript 去请求并解析所有的样式表。HandJS 也正是这么做的，但不管是从性能上来看还是其他一些复杂的方面，这都会遇到问题。
Polymer 则是通过判断标签上的 touch-action属性 (attribute)，而非 CSS 代码。
这对于我们开发者来说意味着什么？如果你比较感兴趣，想深入指针事件，那上述 polyfill 就非常适合应用到手头的项目中。然而，你若只想寻求一个解决 300 毫秒点击延迟的方法，上述方案可能就有点过了，因为它们要么是资源密集型的方案，要么是touch-action属性的非标准化模拟。所以，接下去我们要来看一些专门针对 300 毫秒延迟而生的解决方案

### zepto等库的 tap事件

zepto 的touch模块中自定义了tap事件，用于代替click事件，表示一个轻击操作。touch模块实现tap的原理是绑定事件touchstart,touchmove和touchend到document上，然后通过计算touch事件触发的时间差，位置差来实现了自定义的tap,swipe等。
zepto自定义的tap操作虽然可以解决300ms点击延迟问题，但存在著名的“点透”问题。不知其最新版本有没有解决该问题。

### fastclick 解决300ms延迟。

[FastClick](https://github.com/ftlabs/fastclick) 是 [FT Labs](https://labs.ft.com/) 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。

* 基本原理：FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。
* fastClick的核心代码

```javascript
FastClick.prototype.onTouchEnd = function(event){ // 一些状态监测代码 
    // 从这里开始，
    if (!this.needsClick(targetElement)) { // 如果这不是一个需要使用原生click的元素，则屏蔽原生事件，避免触发两次click 
    event.preventDefault(); // 触发一次模拟的click 
    this.sendClick(targetElement, event); 
    }
}
```

这里可以看到，FastClick在`touchEnd`的时候，在符合条件的情况下，主动触发了click事件，这样避免了浏览器默认的300毫秒等待判断。为了防止原生的click被触发，这里还通过`event.preventDefault()`屏蔽了原生的click事件。

通过`sendClick`模拟click事件:

```javascript
FastClick.prototype.sendClick = function(targetElement, event) { // 这里是一些状态检查逻辑
// 创建一个鼠标事件 
clickEvent = document.createEvent('MouseEvents'); // 初始化鼠标事件为click事件 
clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null); // fastclick的内部变量，用来识别click事件是原生还是模拟 
clickEvent.forwardedTouchEvent = true; // 在目标元素上触发该鼠标事件， 
targetElement.dispatchEvent(clickEvent);
}
```

就目前而言，FastClick 非常实际地解决 300 毫秒点击延迟的问题。唯一的缺点可能也就是该脚本的文件尺寸 (尽管它只有 10kb)。

## 对比总结

**禁用缩放**：简单，但同时也使的网页无法缩放，不适用于未对移动端浏览做适配优化的网页。
**更改默认视口宽度**：简单，但需要浏览器支持。
**指针事件和css touch-action:新属性**，可能存在浏览器兼容问题，如仅为解决点击延迟问题儿引入一整套指针事件有点过了。
**tap事件**：能较好解决点击延迟，并且对其他移动端触摸事件也有较好支持，但存在点透问题，不知最新版是否解决。
**fastclick**:当前较好的专门解决点击延迟的库，脚本尺寸相对较大。

[参考链接](https://www.jianshu.com/p/16d3e4f9b2a9)

使用[fastclick](https://www.npmjs.com/package/fastclick)

```javascript
npm install fastclick -S

// 解决移动端300ms延迟问题
var attachFastClick = require('fastclick');
attachFastClick(document.body);

// 解决移动端300ms延迟问题
if (typeof window !== "undefined") {
  const Fastclick = require('fastclick')
  Fastclick.attach(document.body)
}
```

