---
title: javascript-立即执行函数表达式IIFE
date: 2019-05-13 20:37:51
tags:
- IIFE
categories:
- javascript教程
comments: false
permalink:
---

# javascript-立即执行函数表达式 IIFE

立即执行函数表达式(IIFE) 是**在创建函数后立即执行函数的方法**。

立即执行函数表达式(IIFE) 非常有用，因为它们不会污染全局对象，它们是**隔离变量声明**的简单方法。

这是定义 IIFE 的语法：

JavaScript 代码:

```JavaScript
;(function() {
  /* */
})()
```

立即执行函数也可以使用**箭头函数定义**：

JavaScript 代码:

```JavaScript
;(() => {
  /* */
})()
```

基本上，我们在**括号内定义了一个函数**，然后**在后面加上一个括号 `()`** 来执行该函数：`(/* function */)()` 。

包裹函数的括号实际上是使我们的函数在内部被**视为表达式**。 否则，函数声明将无效，因为我们没有指定任何名称：

![IIFE.png](IIFE.png)

**函数声明需要一个`名称`，而函数表达式不需要它**。

你也可以将调用括号放在表达式括号内，**没有区别**，只是写法不同：

JavaScript 代码:

```javascript
(function() {
  /* */
}())

(() => {
  /* */
}())
```

## 使用一元运算符的替代语法

你可以使用一些**更奇怪的语法**来创建 IIFE ，但它在现实世界中**很少使用**，并且它依赖于使用任何一元运算符：

JavaScript 代码:

```javascript
-(function() {
  /* */
})() +
  (function() {
    /* */
  })();

~(function() {
  /* */
})();

!(function() {
  /* */
})();
```

但是这种方式**不适用于箭头函数**。

## 命名的 IIFE

`IIFE` 也可以是**命名的常规函数**（不是箭头函数）。 这不会导致函数“泄漏”到全局作用域，并且在执行后也不能再次调用它：

JavaScript 代码:

```javascript
(function doSomething() {
  /* */
})();
```

## IIFE 前的分号

你可能已经注意到 `IIFE` **前的分号**了：

JavaScript 代码:

```javascript
(function() {
  /* */
})();
```

这可以**防止在盲目合并两个 `JavaScript` 文件时出现问题**。 由于 `JavaScript` 不需要分号，因此你可能会在最后一行中使用某些语句连接一个文件，从而导致语法错误。

这个问题基本上是通过像 [webpack](http://webpack.html.cn/) 这样的“智能”打包工具来解决的。

## 参考

[JavaScript 中的 立即执行函数表达式（IIFE） – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10277)
