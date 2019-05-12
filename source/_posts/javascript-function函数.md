---
title: javascript-function函数
date: 2019-05-12 15:11:06
tags:
- function
- 函数
categories:
- javascript教程
comments: false
permalink:
---

# javascript-function 函数

现在我们将学习 `JavaScript` 中所有关于**函数**的知识，从概述到小细节帮助你更好的使用 `JavaScript` 函数。注：本文没有一句废话，对于新手，可以作为该知识点的入门指南，对于有经验的开发人员可以作为一次很好的回顾。

`JavaScript` 中的**所有内容都在函数中执行**。

函数是一个自包含的代码块，可以**定义一次，并运行任意次数**。

函数可以选择接受参数，并返回一个值。

`JavaScript` 中的函数是 **对象**，一种**特殊的对象**：`function objects`(函数对象)。

另外，函数在 `JavaScript` 中是**一等公民**，因为**它们可以被赋值给一个值，它们可以作为参数传递并用作返回值**。

> 高阶函数, 能**当参数又能作为返回值返回**

让我们从“旧的”，ES6 / ES2015 之前的语法开始。 这是一个**函数声明**：

JavaScript 代码:

```javascript
function dosomething(foo) {
  // do something
}
```

在 ES6 / ES2015 流行的当下，简称为**常规函数**。

可以将函数分配给变量（这称为**函数表达式**）：

JavaScript 代码:

```javascript
const dosomething = function(foo) {
  // 匿名函数
  // do something
};
```

**命名函数表达式**类似，但在**堆栈调用跟踪中更好用**，这在发生错误时很有用 – 它保存函数的名称：

JavaScript 代码:

```javascript
const dosomething = function dosomething(foo) {
  // do something
};
```

ES6 / ES2015 引入了**箭头函数**，在使用内联函数时，它们**特别适合用作参数或回调函数**：

JavaScript 代码:

```javascript
const dosomething = (foo) => {
  //do something
};
```

箭头函数与上面的其他函数定义有很大的不同，我们会在后面的章节中详细介绍。

## 参数

**一个函数可以有一个或多个参数**。

JavaScript 代码:

```javascript
const dosomething = () => {
  //do something
};
const dosomethingElse = (foo) => {
  //do something
};
const dosomethingElseAgain = (foo, bar) => {
  //do something
};
```

从 ES6 / ES2015 开始，函数可以具有**参数的默认值**：

JavaScript 代码:

```javascript
const dosomething = (foo = 1, bar = 'hey') => {
  //do something
};
```

这允许您在**不填充所有参数**的情况下调用函数：

JavaScript 代码:

```javascript
dosomething(3);
dosomething();
```

ES2017 引入了[参数的尾随逗号](http://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/function#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%9A%84%E5%B0%BE%E9%80%97%E5%8F%B7)，这个功能有助于减少因移动参数时丢失逗号而导致的错误（例如，移动中间的最后一个）：

JavaScript 代码:

```
const dosomething = (foo = 1, bar = 'hey',) => {
  //do something
};
dosomething(2, 'ho!',);
```

您可以将**所有参数包装在一个数组**中，并在**调用函数时使用展开运算符**：

JavaScript 代码:

```javascript
const dosomething = (foo = 1, bar = 'hey') => {
  //do something
};
const args = [2, 'ho!'];
dosomething(...args);
```

使用许多参数，记住顺序可能很困难。这时使用[对象解构](http://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/function#%E4%B8%8E%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC%E9%BB%98%E8%AE%A4%E5%80%BC%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8)**这个对象允许保留参数名称**：

> 与解构赋值默认值结合使用, 即设置函数参数默认值和解构赋值一起用

JavaScript 代码:

```javascript
const dosomething = ({ foo = 1, bar = 'hey' }) => {
  // 等号 是默认值, 传进来一个对象
  //do something
  console.log(foo); // 2
  console.log(bar); // 'ho!'
};
const args = { foo: 2, bar: 'ho!' }; // 对象
dosomething(args);
```

注意这里 **函数参数是个对象** 用的是 `{ foo = 1, bar = 'hey' }`，用的是等号 ,不是 `{ foo : 1, bar : 'hey' }`。

> 这里 **上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。**

[对象解构](http://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/function#%E4%B8%8E%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC%E9%BB%98%E8%AE%A4%E5%80%BC%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8)
参数默认值可以与解构赋值的默认值，结合起来使用。

```javascript
function foo({ x, y = 5 }) {
  console.log(x, y);
}

foo({}); // undefined 5
foo({ x: 1 }); // 1 5
foo({ x: 1, y: 2 }); // 1 2
foo(); // TypeError: Cannot read property 'x' of undefined
```

上面代码**只使用了对象的解构赋值默认值，没有使用函数参数的默认值**。只有当**函数 `foo` 的参数是一个对象**时，变量 `x` 和 `y` 才会通过解构赋值生成。如果**函数 `foo` 调用时没提供参数**，变量 `x` 和 `y` 就**不会生成**，从而报错。**通过提供函数参数的默认值**，就可以避免这种情况。

> 函数参数如果定义时为对象, 就会使用对象的解构赋值默认值，, 函数的参数的默认值用看下面
> 其实也一样理解, 如果传入的参数用了 `=` 号就是设置参数默认值, 如果传入的是 `{}`对象, 那么先是**解构赋值**

```javascript
function foo({ x, y = 5 } = {}) {
  console.log(x, y);
}

foo(); // undefined 5
```

上面代码指定，如果没有提供参数，**函数 `foo` 的参数默认为一个空对象**。

作为练习，请问下面两种写法有什么差别？

```javascript
// 写法一
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}

// 写法二
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
```

上面两种写法都对函数的参数设定了默认值，
区别是写法一**函数参数的默认值是空对象**，但是设置了**对象解构赋值的默认值**；
写法二**函数参数的默认值**是一个有具体属性的对象，但是**没有设置**对象解构赋值的默认值。

```javascript
// 函数没有参数的情况
m1(); // [0, 0]
m2(); // [0, 0]

// x 和 y 都有值的情况
m1({ x: 3, y: 8 }); // [3, 8]
m2({ x: 3, y: 8 }); // [3, 8]

// x 有值，y 无值的情况
m1({ x: 3 }); // [3, 0]
m2({ x: 3 }); // [3, undefined]

// x 和 y 都无值的情况
m1({}); // [0, 0];
m2({}); // [undefined, undefined]

m1({ z: 3 }); // [0, 0]
m2({ z: 3 }); // [undefined, undefined]
```

## 返回值

每个函数都返回一个值，默认情况下是 `undefined` 。

![return.png](return.png)

**任何函数在其代码行结束时或执行流找到 `return` 关键字时终止执行**。

当 `JavaScript` 遇到 `return` 关键字时，它退出函数执行并将控制权交还给其调用者。

如果 `return` 后面跟一个值，则该值将作为函数的结果返回：

JavaScript 代码:

```javascript
const dosomething = () => {
  return 'test';
};
const result = dosomething(); // result === 'test'
```

您**只能返回一个值**。

要模拟返回**多个值**，可以返回**对象字面量或数组，并在调用函数时使用解构赋值**。

使用**数组**：

```javascript
const dosomething = () => {
  return ['hello', 6];
};

const [name, age] = dosomething();
name; // hello
age; //  6
```

使用**对象**：

```javascript
const dosomething = () => {
  return { name: 'hello', age: 6 };
};

const { name, age } = dosomething();
name; // hello
age; //  6
```

## 嵌套函数

可以在函数中定义其他函数：

JavaScript 代码:

```javascript
const dosomething = () => {
  const dosomethingelse = () => {};
  dosomethingelse();
  return 'test';
};
```

被嵌套函数的作用域是嵌套它的函数，不能从外部调用。

## 对象方法

当**用作对象属性**时，**函数称为方法**：

JavaScript 代码:

```javascript
const car = {
  brand: 'Ford',
  model: 'Fiesta',
  start: function() {
    // 对象方法
    console.log(`Started`);
  }
};
car.start();
```

## 箭头函数中的“this”

当箭头函数与常规函数用作对象方法时，有一个重要的行为区别。考虑这个例子：

JavaScript 代码:

```javascript
const car = {
  brand: 'Ford',
  model: 'Fiesta',
  start: function() {
    console.log(`Started ${this.brand} ${this.model}`)
  },
  stop: () => {
    console.log(`Stopped ${this.brand} ${this.model}`)
  }
}

car.start()
Started Ford Fiesta
car.stop()
Stopped undefined undefined
```

`stop()` 方法无法正常工作。

> 没有 `this` 也没有 `prototype`, 但都有 `constructor`是`Function()`

这是因为在两个函数声明风格中处理 `this` 的方式是不同的。`this` 在箭头函数中指的是**封闭的函数上下文**，在这种例子中是 `window` 对象：

```javascript
const car = {
  brand: 'Ford',
  model: 'Fiesta',
  start: function() {
    console.log(this)
    console.log(`Started ${this.brand} ${this.model}`)
  },
  stop: () => {
    console.log(this)
    console.log(`Stopped ${this.brand} ${this.model}`)
  }
}

car.start()
{brand: "Ford", model: "Fiesta", start: ƒ, stop: ƒ}
Started Ford Fiesta
car.stop()
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
Stopped undefined undefined
```

`this`，是指使用 `function()` 的宿主对象

这意味着`箭头函数`**不适合用于对象方法和构造函数**（箭头函数构造函数实际上会在调用时引发 TypeError ）。

## IIFE，立即调用函数表达式

IIFE 是一个在**声明后立即执行**的函数：

JavaScript 代码:

```javascript
(function dosomething() {
  console.log('executed');
})();
```

您可以将结果分配给变量：

JavaScript 代码:

```javascript
const something = (function dosomething() {
  return 'something';
})();
```

它们非常方便，因为您无需在定义后单独调用该函数。

## 函数提升（Hoisting）

执行代码之前的 `JavaScript` 会根据某些规则对其进行重新排序。

特别需要记住的一点是函数会被移动到其作用域的顶部。所以下面的写法是合法的：

JavaScript 代码:

```javascript
dosomething();
function dosomething() {
  console.log('did something');
}
```

[JavaScript 中的 Hoisting (变量提升和函数声明提升) 666](https://www.html.cn/archives/7924)

在内部，`JavaScript` 在**调用之前移动函数**，以及在同一作用域内找到的所有其他函数：

JavaScript 代码:

```javascript
function dosomething() {
  console.log('did something');
}
dosomething();
```

看下面的代码，如果您使用**命名函数表达式**，因为您正在使用 {% post_link javascript-变量 javascript-变量 %} ，所以会发生不同的事情。我们说的变量提升，其实是**变量声明被提升**，但**不是值**被提升，因此下面的代码中不是那个函数被提升。

JavaScript 代码:

```javascript
dosomething();
const dosomething = function dosomething() {
  console.log('did something');
};
```

上面代码不会工作

![function.png](function.png)

上面代码内部发生的事情是这样的.

JavaScript 代码:

```javascript
const dosomething
dosomething()
dosomething = function dosomething() {
  console.log('did something')
}
```

`let` 声明也是如此。 `var` 声明也不起作用，但有不同的错误：

![let.png](let.png)

这是因为 `var` 声明**被提升并初始化**为 `undefined` 作为值，而 `const` 和 `let` **被提升但未初始化**。

> `const` 和 `let` 要先声明后使用的

```javascript
ss

let ss = 3
Uncaught ReferenceError: Cannot access 'ss' before initialization
    at <anonymous>:1:1
```

注：

关于 `const` 和 `let` 是否被 `hoisting`（提升）的问题**争论了好几年了至今没有定论**，主要原因是 `hoisting`（提升）和 `TDZ` (temporal dead zone，暂时性死区)**都是非官方的解释**，只是帮助大家理解 `JavaScript` 机制的说法。

本文最后说到的示例有**两种解释**：

第一种解释： `const` 和 `let` **声明的变量是不会提升**，因为没有提升，所以报 `not defined` 错误，`var` 提升了，初始值为 `undefined` ，但是被当做了函数运算，`undefined` 不是函数，所以说**变量不是函数**。

第二种解释：`JavaScript` 中**所有的声明** (`var, let, const, function, function*, class`) 都会被 `hoisting`（提升）。`var / function / function*`声明和 `let / const / class` 声明之间的**区别是初始化**。`const` 和 `let` 有一个`TDZ`，**初始化被推迟，也就是变量保持未初始化**。 所以访问它时会引发 `ReferenceError` 异常。 只有在碰到 `let / const / class`语句时，才会初始化变量，这叫**临时死区**。**和变量提升是两码事**

> 暂时性死区就是要你先声明后使用

[ES6 中 let 暂时性死区详解](https://segmentfault.com/a/1190000015603779)
[let MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
[暂时性死区(TDZ)并不神秘](https://sinaad.github.io/xfe/2016/02/26/temporal-dead-zone-tdz-demystified/)

```javascript
console.log(x); // throws a ReferenceError
let x = 'hey';
```

老的 var 和新的 `let/const` 声明（除了他们的作用域外）最大的主要不同点之一就是**后者被暂时性死区所约束**，也就是当他们**在初始化之前被访问(读/写)的时候**将抛出 `ReferenceError` , 而不是跟 `var` 声明变量一样返回 `undefined` 。

- [let hoisting?](https://github.com/getify/You-Dont-Know-JS/issues/767)
- [Temporal dead zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone)
- [我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)

反正就是很乱！写文档的说文档不正确，MDN的文档也是一会这个解释，一会那个解释。大家觉得哪个解释适合自己理解，就用哪个解释吧！

## 参考

[你应该知道的 JavaScript function(函数) – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10152)
