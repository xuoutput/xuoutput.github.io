---
title: javascript-变量
date: 2019-05-09 16:20:21
tags:
- 变量
categories:
- JavaScript完全手册(2018版)
comments: false
permalink:
---

# javascript-变量

[变量 – JavaScript 完全手册（2018 版）6666](https://www.html.cn/archives/10014)

变量是分配给标识符的字面量，因此您可以稍后在程序中引用和使用它。 我们将学习如何使用 JavaScript 声明一个变量。

## JavaScript 变量简介

**变量是分配给标识符的字面量**，因此您可以稍后在程序中引用和使用它。

JavaScript 中的变量**没有附加任何类型**。 将**特定字面量类型**分配给变量后，您可以稍后重新分配该变量，以持有任何其他类型，而不会出现类型错误或任何问题。

> 这就是 JavaScript 有时被称为 **“无类型”** 的原因。
> 但不正确. 和{% post_link javascript-数据类型 javascript-数据类型 %}中说的 有类型 捋一捋

建议先声明变量再使用它。 有 3 种方法可以做到：使用 `var`，`let` 或 `const`。 这三种方式在以后如何与变量进行交互方面有所不同。

> `let` 或 `const`必须先声明变量才能使用它, 而`var`有变量提升
> [JavaScript 中的 Hoisting (变量提升和函数声明提升) 666](https://www.css88.com/archives/7924) > [由变量提升谈谈 JavaScript Execution Context](https://juejin.im/post/5a5ee28f6fb9a01cbe655860) > [JavaScript 中作用域和作用域链的简单理解（变量提升）](https://www.cnblogs.com/buchongming/p/5858026.html)

## 使用 var

在 `ES2015` **之前**，`var` 是**唯一**可用于定义变量的构造。

JavaScript 代码:

```javascript
var a = 0;
```

如果您忘记添加 `var` ，您将为未声明的变量分配值，**结果可能会有所不同**。

在现代环境中，**启用严格模式后，您将收到错误**。 在较旧的环境中（或禁用严格模式），这将**简单地初始化变量并将其分配给全局(`global`)对象**，在浏览器中，全局对象是 `window`，在 Node.js 中，全局对象是 `global` 。

> 注意分配给全局对象和声明变量一个全局变量是不一样的

如果在声明变量时没有初始化变量，则在为其赋值之前，它将具有 `undefined` (未定义) 的值。

JavaScript 代码:

```javascript
var a; //typeof a === 'undefined'
```

您可以**多次重新声明变量**，以覆盖它：

JavaScript 代码:

```javascript
var a = 1;
var a = 2;
```

您还可以在**同一语句中一次性声明多个变量**：

JavaScript 代码:

```javascript
var a = 1,
  b = 2;
```

**作用域**是代码中变量的**可见性**。

使用**任何函数外部**的 `var` 初始化的变量将**分配给全局对象**，具有全局作用域并且是任何地方可见。
在**函数内部**用 `var` 初始化的变量，被赋值变量的**作用域是该函数**，它被称为 **local(本地)作用域 或 函数作用域**，只在函数内可见，就**像函数参数**一样。

函数中定义与全局变量名称的任何变量，**可见性优先于全局变量，并将全局变量隐藏**。

> 作用域链的知识点

重要的是要理解一个 `block`(块)（由一对花括号`{}`标识）**没有定义新的作用域**。

> **只有在创建函数时才会创建新作用域**，因为 `var` **没有块作用域，而是函数作用域**。

在函数内部，其中定义的任何变量在所有函数代码中都是可见的(**前后顺序无关**)，即使变量是在函数末尾声明的，它仍然可以在开头引用，因为 JavaScript 在执行代码之前实际上将所有变量都移到了顶层（被称为 `hoisting`(提升) ）。**为避免混淆，请始终在函数开头声明变量**。

作用域对于新手来说很容易混淆，你可以查看 [深入理解 JavaScript 中的作用域和上下文](https://www.html.cn/archives/7255) 和 [实例分析 JavaScript 作用域](https://www.html.cn/archives/7300) 来深入理解作用域。

> 另外 `Hoisting`(提升) 这个词是用来解释 **变量 和 函数声明** 是如何被提升到 **函数或全局** 作用域**顶部**的。

你在任何的 `JavaScript` 文档中找不到这个术语，我们说的 `Hoisting`(提升) 只是使用了其字面含义来做个比喻。如果你已经对 JavaScript 作用域工作原理有基本的了解，那么更深入的了解 [JavaScript 中的 Hoisting (变量提升和函数声明提升)](https://www.html.cn/archives/7924) 有助于你建立更强大的基础知识。

> 也可以看总结的 {% post_link 再谈js作用域 再谈js作用域 %}

## 使用 let

`let` 是 `ES2015` 中引入的新功能，**它本质上是 `var` 的块作用域版本**。 它的作用域仅限于定义它的 `block`(块)（由一对花括号标识），语句或表达式，以及所有包含的内部块。

现代 `JavaScript` 开发人员**可能会选择仅使用** `let` **并完全放弃使用 var**。

`let` 也可以在任何函数之外定义 – 与 `var` 相反 – `let` 不会创建全局变量。

## 使用 const

用 `var` 或 `let` 声明的变量可以稍后在程序中**更改，然后重新分配**。 初始化 `const` 后，**其值永远不会再次更改，并且不能重新分配给不同的值**。

JavaScript 代码:

```javascript
const a = 'test';
```

我们不能为 a 常量指定不同的字面量。**然而，如果 a 是一个提供方法的`对象`，那么我们可以更改 a `内容`**。

> 可以改 a 的内容, 不是改 a 的引用的值

`const` 不提供不可变性（`immutability`），**只是确保不能更改引用**。

`const` 具有**块范围**，与 `let` 相同。

现代 `JavaScript` 开发人员可能会选择始终将 `const` 用于不需要在程序中稍后重新分配的变量。

为什么？ 因为我们应该始终使用最简单的结构，以避免在未来发生错误。

## 参考

[变量 – JavaScript 完全手册（2018 版）6666](https://www.html.cn/archives/10014)

[深入理解 JavaScript 中的作用域和上下文](https://www.html.cn/archives/7255)
[JavaScript 核心概念之作用域和闭包](https://www.html.cn/archives/7262)
[实例分析 JavaScript 作用域](https://www.html.cn/archives/7300)
[JavaScript 中的 Hoisting (变量提升和函数声明提升)](https://www.html.cn/archives/7924)

{% post_link 再谈js作用域 再谈js作用域 %}
