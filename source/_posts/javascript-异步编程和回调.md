---
title: javascript-异步编程和回调
date: 2019-05-13 12:02:50
tags:
---

# javascript-异步编程和回调

JavaScript **默认是同步的，并且是单线程的**。这意味着代码无法创建新线程并且并行运行。让我们了解一下什么是异步代码及其样子。

## 编程语言中的异步

计算机在**设计上是异步**的。

异步意味着某些事情可以**独立于主程序流而发生**。

在当前的消费者计算机中，每个程序都运行在一个特定的时间段，然后它停止执行，以让另一个程序继续执行。这种循环运行如此之快以至于我们无法注意到，我们认为我们的计算机同时运行许多程序，但这是一种幻觉（除了多处理器机器）。

程序内部使用 **中断** ，这是一个发送到处理器的信号，以引起系统的注意。

我不会深入讨论它的内部细节，但请记住，**程序是异步的是很正常的**，并在需要注意之前停止它们的执行，并且计算机可以在此期间执行其他操作。当程序正在等待来自网络的响应时，它不能在请求完成之前停止处理器。

通常，编程语言是同步的，有些语言提供了一种在语言或库中管理异步方法。 C，Java，C＃，PHP，Go，Ruby，Swift，Python，默认情况下它们都是同步的。其中一些通过使用线程处理异步，产生一个新进程。

## JavaScript

JavaScript **默认是同步的，并且是单线程的**。这意味着代码无法创建新线程并且并行运行。

代码行是一个接一个地串行执行的，例如：

JavaScript 代码:

```javascript
const a = 1;
const b = 2;
const c = a * b;
console.log(c);
doSomething();
```

但 JavaScript 诞生于浏览器中，一开始其主要工作就是响应用户操作，如 `onClick`，`onMouseOver`，`onChange`，`onSubmit等`。 怎么用同步编程模型呢？

**答案是在它的环境中**。 **浏览器**通过提供一组可以处理这种功能的 `API` 来解决这个问题。

最近，Node.js 引入了一个非阻塞 I/O 环境，将这个概念扩展到文件访问，网络调用等。

## 回调函数（Callbacks）

你无法知道用户何时要单击按钮，因此你 **要为 click 事件定义事件处理程序**。 此事件处理程序接受一个函数，该函数将在事件触发时调用：

JavaScript 代码:

```javascript
document.getElementById('button').addEventListener('click', () => {
  //item clicked
});
```

这就是所谓的 `回调函数`。

回调是一个简单的函数，它**作为值传递给另一个函数，并且只在事件发生时执行**。 我们可以这样做，是因为函数是 JavaScript 的 “一等公民” ，可以分配给变量并传递给其他函数（称为 {% post_link javascript-高阶函数 javascript-高阶函数 %} ）

将所有客户端代码包装在 `window` 对象上的 `load` 事件侦听器中是很常见的，这样仅在**该页面准备就绪时**才运行回调函数：

JavaScript 代码:

```javascript
window.addEventListener('load', () => {
  //window loaded
  //do what you want
});
```

**回调在任何地方都使用，而不仅仅在 `DOM` 事件中使用**。

一个常见的例子是使用定时器：

JavaScript 代码:

```javascript
setTimeout(() => {
  // runs after 2 seconds
}, 2000);
```

`XHR` 请求也接受回调。在本示例中，通过将函数分配给属性，该函数在特定事件发生时将被调用(在本例中，请求状态发生了变化)：

JavaScript 代码:

```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 ? console.log(xhr.responseText) : console.error('error');
  }
};
xhr.open('GET', 'https://yoursite.com');
xhr.send();
```

## 在回调中处理错误

你如何**处理回调错误**？ 一个非常常见的策略是使用 `Node.js` 采用的办法：**任何回调函数中的第一个参数是错误对象**：`error-first callbacks`（错误优先的回调）

如果没有错误，则该对象为 `null`。 如果有错误，则包含错误的描述和其他信息。

JavaScript 代码:

```javascript
fs.readFile('/file.json', (err, data) => {
  if (err !== null) {
    //handle error
    console.log(err);
    return;
  }
  //no errors, process data
  console.log(data);
});
```

## 回调带来的问题

对于简单的情况，回调非常有用！

但是**每个回调都会增加嵌套层级**，当你有很多回调时，代码开始变得非常复杂，也就大家经常会听到的 **“回调地狱”** ：

JavaScript 代码:

```javascript
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach((item) => {
        //your code here
      });
    }, 2000);
  });
});
```

这只是一个简单的 4 层嵌套代码，但我已经看到了更多层级的嵌套，这并不好玩。

我们如何解决这个问题呢？

## 回调的替代方案

从 ES6 开始，`JavaScript` 引入了一些新功能，可以帮助我们不用回调就能处理异步代码：

- Promises (ES6)
- Async/Await (ES8)

这些将在后面的章节中单独介绍。

## 参考

[JavaScript 异步编程和回调 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10222)
