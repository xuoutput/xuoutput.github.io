---
title: javascript-箭头函数适用与不适用场景
date: 2019-05-12 17:09:51
tags:
- function
- 箭头函数
categories:
- javascript教程
comments: false
permalink:
---

# javascript-箭头函数适用与不适用场景

现代 `JavaScript` 中最引人注目的功能之一是引入了**箭头函数**，用 `=>` 来标识。

这种函数有**两大优点** – **非常简洁的语法，和更直观的作用域**和 `this` 的绑定。

这些优点有时导致箭头函数比其他形式的函数声明更受欢迎。

例如，受欢迎的 [airbnb eslint](https://github.com/airbnb/javascript#arrow-functions) 配置 会在您创建匿名函数时强制使用 JavaScript 箭头函数。

然而，就像工程中的任何东西一样，箭头函数优点很明显，同时也带来了**一些负面的东西**。 使用他们的时候需要权衡一下。

**学习如何权衡是更好地使用箭头函数的关键**。

在本文中，我们将**首先**回顾箭头函数的工作原理，**然后**深入研究箭头函数改进代码的示例，**最后**深入研究箭不建议使用头函数的示例。

## JavaScript 箭头函数究竟是什么？

JavaScript 箭头函数大致相当于 [python 中的 lambda 函数](https://www.programiz.com/python-programming/anonymous-function) 或 [Ruby 中的 blocks](http://ruby-for-beginners.rubymonstas.org/blocks.html)。

**这些是匿名函数**，它们有自己的特殊语法，接受一定数量的参数，并在其封闭的作用域的上下文（即定义它们的函数或其他代码）中操作。

让我们依次分解这些部分。

## 箭头函数语法

箭头函数具有**单一的总体结构**，然后在特殊情况下可以通过多种方式简化它们。 核心结构如下所示：

JavaScript 代码:

```javascript
(argument1, argument2, ...argumentN) => {
  // function body
};
```

括号内的是参数列表，后跟“胖箭头”（`=>`），最后是函数体。

这与传统函数非常相似，我们只是**省略 `function` 关键字**并在参数后**添加一个胖箭头**（`=>`）。

然而，有许多方法可以简化箭头函数。

首先，**如果函数体是单个表达式**，则可以不使用花括号并将其置于**内联(就是一行 `inline`)**中（省略大括号直接将表达式写在一行中）。 表达式的**结果将由函数返回**。 例如：

JavaScript 代码:

```javascript
const add = (a, b) => a + b;
```

其次，如果只有一个参数，你甚至可以**省略参数的括号**。例如：

JavaScript 代码:

```javascript
const getFirst = (array) => array[0];
```

正如您所看到的，这是一些非常简洁的语法，我们将重点介绍后面的好处。

## 高级语法

有一些高级语法可以了解一下。

首先，如果您尝试使用**内联单行表达式**语法，但您返回的值是**对象字面量**。您可能会认为这看起来应该是这样的：

JavaScript 代码:

```javascript
(name, description) => {name: name, description: description};
```

问题是这种语法**比较含糊不清**，容易引起歧义 ： 看起来好像你正试图创建一个传统的函数体。 如果你碰巧想要一个对象的单个表达式，请用括号包裹该对象：

JavaScript 代码:

```javascript
(name, description) => ({ name: name, description: description });
```

或者就是直接用 `return`

```javascript
(name, description) => {
  return { name: name, description: description };
};
```

## 封闭的上下文作用域

与其他形式的函数不同，箭头函数**没有自己的** [执行期上下文](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)。

实际上，这意味着 `this` 和 `arguments` 都是从**它们的父函数继承**而来的。

例如，使用和不使用箭头函数比较以下代码：

JavaScript 代码:

```javascript
const test = {
  name: 'test object',
  createAnonFunction: function() {
    return function() {
      console.log(this.name);
      console.log(arguments);
    };
  },

  createArrowFunction: function() {
    return () => {
      console.log(this.name);
      console.log(arguments);
    };
  }
};
```

我们有一个简单的 test 对象，有两个方法 – 每个方法都返回一个匿名函数。

不同之处在于**第一个方法使用传统函数表达式**，而**后者中使用箭头函数**。

如果我们使用相同参数，在控制台中运行它们，我们会得到完全不一样的结果。

JavaScript 代码:

```javascript
> const anon = test.createAnonFunction('hello', 'world');
> const arrow = test.createArrowFunction('hello', 'world');

> anon();
undefined
{}

> arrow();
test object
{ '0': 'hello', '1': 'world' }
```

第一个**匿名函数有自己的函数上下文**，因此当您调用它时，`test` 对象的 `this.name` 没有可用的引用，也没有创建它时调用的参数。 相当于是 `window` 在调用, 但`window` 没有 `name`

另一个，**箭头函数具有与创建它的函数完全相同的函数上下文**，使其可以访问 `argumetns` 和 `test` 对象。

## 使用箭头函数改进您的代码

传统 `lambda` 函数的主要用例之一，就是用于**遍历列表中的项**，现在用 `JavaScript` 箭头函数实现。

比如你有**一个有值的数组**，你想去 `map` 遍历每一项，这时使用箭头函数非常理想：

JavaScript 代码:

```javascript
const words = ['hello', 'WORLD', 'Whatever'];
const downcasedWords = words.map((word) => word.toLowerCase());
```

一个非常常见的例子是提取对象中的某个特定值：

JavaScript 代码:

```javascript
const names = objects.map((object) => object.name);
```

类似地，当用现代迭代样式取代传统的 `for` 循环，一般我们使用 `forEach` 循环，箭头函数能够保持 `this` 来自于父级，让他们非常直观

类似的，当用 `forEach` 来替换传统 `for` 循环的时候，实际上箭头函数会直观的保持 `this` 来自于父一级

JavaScript 代码:

```javascript
this.examples.forEach((example) => {
  this.runExample(example);
});
```

## Promises 和 Promise 链

箭头函数的另一个可以使代码更清晰，更直观的地方是**管理异步代码**。

[Promises](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises) 使得管理异步代码变得容易很多（即使你很欢快地使用 `async / await`，你仍然应该理解 `async / await` 是[建立在 Promises 之上的](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8) ！）

> Promise 还涉及包装 `Ajax` 和 `fetch`

[JavaScript 回调函数怎么理解](https://segmentfault.com/q/1010000000140970)
回调函数有高阶函数的味道, 不过是返回这个传入的函数执行结果

常见的一种模式吧

```javascript
var func1 = function(callback) {
  //do something.
  callback && typeof callback === 'function' && callback();
};

var fn = function(callback) {
  callback('callback');
};
```

但是，虽然使用 `promises` 仍然需要定义在异步代码或调用完成后运行的函数。

这是箭头函数的理想位置，特别是如果您生成的**函数是有状态的**，**同时想引用对象中的某些内容**。 例如：

JavaScript 代码:

```javascript
this.doSomethingAsync().then((result) => {
  this.storeResult(result);
});
```

## 对象转换

箭头函数的另一个常见且极其强大的用途是**封装对象转换**。

例如，在 `Vue.js` 中，有一种通用模式，用于使用 `mapState` 将 `Vuex` 存储的各个部分直接包含到 `Vue` 组件中。

这涉及定义一组 `“mappers”` ，这些 `“mappers”` 将从原始的完整的 `state` 对象转换为提取所涉及组件所需的内容。

这些简单的转换使用箭头函数再合适不过了。比如：

JavaScript 代码:

```javascript
export default {
  computed: {
    ...mapState({
      results: state => state.results,
      users: state => state.users,
    });
  }
}
```

## 你不应该使用箭头函数的情景

在许多情况下，使用箭头函数不是一个好主意。 他们不仅不会帮助你，而且会给你带来一些不必要的麻烦。

第一个是**对象的方法**。 这是一个函数上下文的例子，这对于我们理解很有帮助。

> `React` 中常用了

有一段时间使用 `Class`（类）属性语法和箭头函数的组合，作为创建“**自动绑定方法**”的方式，例如， 事件处理程序可以使用，但仍然绑定到类的方法。

这看起来像是这样的：

JavaScript 代码:

```javascript
class Counter {
  counter = 0;

  handleClick = () => {
    this.counter++;
  };
}
```

这样，即使 `handleClick` 由事件处理程序调用，而不是在 `Counter` 实例的上下文中调用，**它仍然可以访问实例的数据**。

这种方法的**缺点很多**，在本文中很好地记录。

虽然使用这种方法确实为您提供了具有绑定函数的快捷方式，但**该函数以多种不直观的方式运行**，如果您尝试将此对象作为原型进行**子类化/使用**，则会不利于测试，同时也会产生很多问题。

相反，使用常规函数，如果需要，将其绑定到构造函数中的实例：

JavaScript 代码:

```javascript
class Counter {
  counter = 0;

  handleClick() {
    this.counter++;
  }

  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
}
```

## 深层的调用链

箭头函数可能让你遇到麻烦的另一个地方是，它们被用于许多不同的组合，特别是在**函数深层调用链**中。

核心原因与匿名函数相同 – 它们给出了**非常糟糕的堆栈跟踪**。

如果你的函数只是向下一级，比如在迭代器里面，那也不是太糟糕，但是如果你把所有的函数定义为箭头函数，并在它们之间来回调用，你就会陷入困境 遇到一个错误的时候，只是收到错误消息，如：

JavaScript 代码:

```javascript
{anonymous}()
{anonymous}()
{anonymous}()
{anonymous}()
{anonymous}()
```

## 有动态上下文的函数

箭头函数可能让您遇到麻烦的最后一种情况就是吗， `this` 是**动态绑定**的时候。

如果您在这些位置使用箭头函数，那么动态绑定将不起作用，并且你（或稍后使用你的代码的其他人）可能会对事情未按预期执行的原因感到困惑。

一些典型的例子：

- 事件处理程序是通过将 `this` 设置为事件的 `currentTarget` 属性来调用。
- 如果您仍在使用 `jQuery` ，则大多数 `jQuery` 方法将 `this` 设置为已选择的 `dom` 元素。
- 如果您正在使用 `Vue.js` ，则方法和计算函数通常将 `this` 设置为 `Vue` 组件。

当然你可以故意使用箭头函数来覆盖这种行为，但特别是在 `jQuery` 和 `Vue` 的情况下，这通常会干扰正常运行，让你感到困惑的是为什么看起来与附近其他代码相同的代码不起作用。

## 总结

箭头函数是 `JavaScript` 语言的一个非常有必要的补充，并且在许多情况下使代码更符合人们的阅读习惯。

然而，像所有其他特性一样，它们有优点和缺点。 我们应该将它们作为我们工具箱中的另一个工具，而不是作为所有函数的全面替代品。

英文原文：https://zendev.com/2018/10/01/javascript-arrow-functions-how-why-when.html

## 参考

[JavaScript 箭头函数：适用与不适用场景](https://www.html.cn/archives/10033)
