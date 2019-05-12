---
title: javascript-箭头函数
date: 2019-05-12 17:01:34
tags:
- function
- 箭头函数
categories:
- javascript教程
comments: false
permalink:
---

# javascript-箭头函数

箭头函数（Arrow Function）是 ES6 / ES2015 中最具影响力的变化之一，现在它们被广泛使用。 它们与常规函数略有不同。 我们来看看下面的一些情况。

我前面已经介绍了箭头函数，但它们非常重要，它们需要再重点介绍一下。

在 ES6/ECMAScript2015 中引入了箭头函数，自从它们引入后，它们彻底改变了 JavaScript 代码写法（和工作方式）。

在我看来，这种变化非常受欢迎，你现在很少在现代代码库中看到 `function` 关键字。

**在视觉上，这是一个简单而受欢迎的变化，您使用更短的语法编写函数**，从：

JavaScript 代码:

```javascript
const myFunction = function foo() {
  //...
};
```

变成：

JavaScript 代码:

```javascript
const myFunction = () => {
  //...
};
```

如果函数体只包含一条语句，则可以**省略花括号**，并在一行上写全部：

JavaScript 代码:

```javascript
const myFunction = () => doSomething();
```

参数在括号中传递：

JavaScript 代码:

```javascript
const myFunction = (param1, param2) => doSomething(param1, param2);
```

如果你只有一个参数，你甚至可以**省略括号**：

JavaScript 代码:

```javascript
const myFunction = (param) => doSomething(param);
```

由于这种简短的语法，`箭头函数` **鼓励使用短函数** 。

## 隐式返回

箭头函数允许您具有**隐式返回**，即返回值不必使用 `return` 关键字。

它在函数体内只有一个语句时有效：

JavaScript 代码:

```javascript
const myFunction = () => 'test';

myFunction(); //'test'
```

## 箭头函数中 this 如何工作

`this` 概念可能很难理解，因为它**根据上下文的不同而变化**，同事也受到 `JavaScript` 的**模式**（严格模式 `strict mode` 或非严格模式）的影响。

理清这个概念很重要，因为与常规函数相比，`this` 在箭头函数的表现有很大的不同。

当定义为对象的方法时，在**常规函数**中，`this` 指的是对象，因此您可以：

JavaScript 代码:

```javascript
const car = {
  model: 'Fiesta',
  manufacturer: 'Ford',
  fullName: function() {
    return `${this.manufacturer} ${this.model}`;
  }
};
```

调用 `car.fullName()` 将返回 `“Ford Fiesta”` 。

箭头函数的 `this` **作用域继承自执行期上下文**。 箭头函数根本**不绑定** `this` ，因此它的**值将在调用栈中查找**，因此在此代码中 `car.fullName()` 将不起作用，并将返回字符串 `"undefined undefined"`：

JavaScript 代码:

```javascript
const car = {
  model: 'Fiesta',
  manufacturer: 'Ford',
  fullName: () => {
    return `${this.manufacturer} ${this.model}`;
  }
};
```

因此，**箭头函数不适合作为对象方法使用**。

在实例化对象时，**箭头函数也不能用作构造函数**。 它会引发 `TypeError` 。

**当不需要动态上下文时，我们应该使用常规函数**。

**处理事件**时也有类似的问题。 `DOM` 事件侦听器将 `this` 设置为目标元素，如果您在事件处理程序中依赖于 `this` ，则需要常规函数：

JavaScript 代码:

```javascript
const link = document.querySelector('#link');
link.addEventListener('click', () => {
  // this === window
});

const link = document.querySelector('#link');
link.addEventListener('click', function() {
  // this === link
});
```

了解更多关于箭头函数的知识请查看 [JavaScript 箭头函数：适用与不适用场景](https://www.html.cn/archives/10033)

## 参考

[JavaScript 箭头函数（Arrow Function） – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10176)
