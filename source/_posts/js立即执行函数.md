---
title: js立即执行函数
date: 2019-02-17 16:52:02
tags:
- IIFE
categories:
- javascript教程
comments: false
permalink:
---

# js立即执行函数表达式

IIFE（ 立即调用函数表达式）是一个**在定义时就会立即执行的**  `JavaScript` 函数。

这是一个被称为 `自执行匿名函数` 的**设计模式**，主要包含两部分。
第一部分是包围在 `圆括号运算符()` 里的**一个匿名函数**，这个匿名函数**拥有独立的词法作用域**。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。

第二部分**再一次使用** `()` 创建了一个**立即执行函数表达式**，JavaScript 引擎到此**将直接执行函数**。

**当函数变成立即执行的函数表达式时**，表达式中的变量不能从外部访问。

```JavaScript
(function () {
    var name = "Barry";
})();
// 外部不能访问变量 name
name // undefined
```

将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。

```JavaScript
var result = (function () {
    var name = "Barry";
    return name;
})();
// IIFE 执行后返回的结果：
result; // "Barry"
```

## 描述

立即执行函数通常有下面两种写法：

```JavaScript
(function(){ 
   ...
})();
(function(){ 
    ...
}());
```

在Javascript中，一对圆括号“`()`”是一种运算符，跟在函数名之后，表示调用该函数。比如，`print()`就表示调用`print函数`。

这个写法和我们想象的写法不一样（知道的人当然已经习以为常）
很多人刚开始理解**立即执行函数**的时候，觉得应该是这样的：

```JavaScript
function (){ ... }();

//或者

function fName(){ ... }();
```

然而事实却是这样：`SyntaxError: Unexpected token (`。这是为什么呢？

## 解释

要理解立即执行函数，需要先理解一些**函数的基本概念**：`函数声明`、`函数表达式`,因为我们定义一个函数通常都是通过这两种方式

**函数声明 (function 语句)**:

```JavaScript
function name([param[, param[, ... param]]]) {
   statements
}
```

`name`：函数名；
`param`：被传入函数的参数的名称,一个函数最多可以有255个参数；
`statements`：这些语句组成了函数的函数体。

**函数表达式 (function expression)**:

函数表达式和函数声明非常类似,它们甚至有相同的语法。

```JavaScript
function [name]([param] [, param] [..., param]) {
   statements
}
```

`name`：函数名,可以省略,**省略函数名的话,该函数就成为了匿名函数**；
`param`：被传入函数的参数的名称,一个函数最多可以有255个参数；
`statements`：这些语句组成了函数的函数体。

下面我们给出一些栗子说明：

```JavaScript
// 声明函数f1
function f1() {
    console.log("f1");
}
// 通过()来调用此函数
f1();


//一个匿名函数的函数表达式，被赋值给变量f2:
var f2 = function() {
    console.log("f2");
}
//通过()来调用此函数
f2();


//一个命名为f3的函数的函数表达式(这里的函数名可以随意命名，可以不必和变量f3重名)，被赋值给变量f3:
var f3 = function f3() {
    console.log("f3");
}
//通过()来调用此函数
f3();
```

上面所起的作用都差不多，但还是有一些**差别**

1、**函数名和函数的变量存在着差别**。函数名不能被改变，但函数的变量却能够被再分配。函数名只能在函数体内使用。倘若在函数体外使用函数名将会导致错误：

```JavaScript
var y = function x() {};
alert(x); // throws an erro
```

2、函数声明定义的函数可以在它被声明之前使用

```JavaScript
foo(); // alerts FOO!
function foo() {
   alert('FOO!');
}
```

**但函数声明非常容易（经常是意外地）转换为函数表达式**。当它不再是一个函数声明：

1. **成为`表达式`的一部分**, 不单单是用()括号, 还有其他操作符和一些语句中.
2. 不在是函数或者script自身的“源元素” （source element）。在script或者函数体内“源元素”并非是内嵌的语句（statement）**有点难懂**

```JavaScript
var x = 0;               // source element
if (x == 0) {            // source element
   x = 10;               // 非source element
   function boo() {}     // 非 source element
}
function foo() {         // source element
   var y = 20;           // source element
   function bar() {}     // source element
   while (y == 10) {     // source element
      function blah() {} // 非 source element
      y++;               //非source element
   }
}
```

🌰栗子:
> 简单点看就判断是不是`function`开头

```JavaScript
// 函数声明
function foo() {}

// 函数表达式, 在括号中
(function bar() {})

// 函数表达式, 赋值语句
x = function hello() {}

// 在逻辑语句中
if (x) {
   // 函数表达式
   function world() {}
}


// 函数声明
function a() {
   // 函数声明
   function b() {}
   if (0) {
      //函数表达式
      function c() {}
   }
}
```

现在我们来解释上面的`SyntaxError: Unexpected token (`：

**产生这个错误的原因**是，Javascript引擎看到`function`关键字之后，认为后面跟的是函数定义语句，不应该以圆括号结尾。
**解决方法**就是让引擎知道，圆括号前面的部分不是函数定义语句，而是一个表达式，可以对此进行运算。所以应该这样写：

```JavaScript
(function(){ /* code */ })();

// 或者
(function(){ /* code */ }());   // 这个是第二种吧
```

这两种写法**都是以圆括号开头**，引擎就会认为后面跟的**是一个表示式，而不是函数定义**，所以就避免了错误。这就叫做“立即调用的函数表达式”（`Immediately-Invoked Function Expression`），简称IIFE。

> 注意，上面的两种写法的结尾，都必须加上分号。

推而广之，任何让解释器以表达式来处理函数定义的方法，都能产生同样的效果，比如下面三种写法。

```JavaScript
var i = function(){ return 10; }();

true && function(){ /* code */ }();

0, function(){ /* code */ }();
```

甚至像这样写：

```JavaScript
!function(){ /* code */ }();

~function(){ /* code */ }();

-function(){ /* code */ }();

+function(){ /* code */ }();
```

new关键字也能达到这个效果：

```JavaScript
new function(){ /* code */ }

new function(){ /* code */ }() // 只有传递参数时，才需要最后那个圆括号。
```

## 使用

那我们通常为什么使用函数立即表达式呢，以及我如何使用呢？

**通常情况下，只对匿名函数使用这种“立即执行的函数表达式”**。
它的目的有两个：

- 一是不必为函数命名，避免了污染全局变量；
- 二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```JavaScript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function (){
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

上面代码中，**写法二比写法一更好，因为完全避免了污染全局变量**。

最后在举一个真实的栗子：在JavaScript的`OOP`中，我们可以通过IIFE来实现一个单例(关于单例的优化不再此处讨论)

```JavaScript
// 创建一个立即调用的匿名函数表达式
// return一个变量，其中这个变量里包含你要暴露的东西
// 返回的这个变量将赋值给counter，而不是外面声明的function自身

var counter = (function () {
    var i = 0;

    return {
        get: function () {
            return i;
        },
        set: function (val) {
            i = val;
        },
        increment: function () {
            return ++i;
        }
    };
} ());

// counter是一个带有多个属性的对象，上面的代码对于属性的体现其实是方法

counter.get(); // 0
counter.set(3);
counter.increment(); // 4
counter.increment(); // 5

counter.i; // undefined 因为i不是返回对象的属性
i; // 引用错误: i 没有定义（因为i只存在于闭包）
```

## 圆括号运算符

[进击的 JavaScript（五） 之 立即执行函数与闭包 666](https://segmentfault.com/a/1190000015644558)

圆括号运算符也叫**分组运算符**，它有两种用法：如果表达式放在圆括号中，作用是**求值**；如果跟在函数后面，作用是**调用函数**

把表达式放在圆括号之中，将返回表达式的值

```JavaScript
console.log((1+2)); // 3
```

**将函数放在圆括号中，会返回函数本身**。如果圆括号紧跟在函数的后面，就表示调用函数，即对函数求值

```JavaScript
console.log((function testa(){return 666;}));
// function testa(){return 666;}

console.log(function testa(){return 666;}());
// 666
```

注意:圆括号运算符**不能为空**，否则会报错

```JavaScript
();//SyntaxError: Unexpected token )
```

由于圆括号的作用是求值，如果将语句放在圆括号之中，就会报错，因为语句没有返回值

```JavaScript
(var a = function(){return 666});
// SyntaxError: Unexpected token var
```

## IIFE

在 Javascript 中，圆括号`()`是一种**运算符**，跟在函数名之后，表示调用该函数。比如，`print()`就表示调用`print函数`。

有时，我们**需要在定义函数之后，立即调用该函数**。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

```JavaScript
function(){ /* code */ }();
// SyntaxError: Unexpected token (
```

产生这个**错误的原因**是，`function`这个关键字**既可以当作语句，也可以当作表达式**。

```JavaScript
// 语句
function f() {}

// 表达式
var f = function f() {}
```

为了**避免解析上的歧义**，JavaScript 引擎规定，如果`function关键字`出现在**行首**，**一律解释成语句**。因此，JavaScript引擎看到行首是`function关键字`之后，认为这一段都是函数的定义，不应该以圆括号结尾，**所以就报错了**。

**解决方法**就是不要让`function`出现在行首，让引擎将其理解成一个表达式。**最简单的处理**，就是将其放在一个圆括号里面。

```JavaScript
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();
```

上面两种写法都是以`圆括号`开头，引擎就会认为后面跟的**是一个表示式，而不是函数定义语句**，所以就避免了错误。这就叫做“立即调用的函数表达式”（`Immediately-Invoked Function Expression`），简称 `IIFE`。

注意，上面两种写法最后的**分号都是必须**的。如果省略分号，遇到连着两个 IIFE，可能就会报错。

```JavaScript
// 报错
(function(){ /* code */ }())
(function(){ /* code */ }())
```

上面代码的两行之间没有分号，`JavaScript` 会将它们**连在一起解释，将第二行解释为第一行的参数**。

**推而广之**，任何让解释器以**表达式**来处理函数定义的方法，都能产生同样的效果，比如下面三种写法。

```JavaScript
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();
```

## 自执行匿名函数和立即执行的函数表达式区别

[深入理解JavaScript系列（4）：立即调用的函数表达式 6666](https://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html)

在这篇帖子里，我们一直叫**自执行函数**，确切的说是`自执行匿名函数`（`Self-executing anonymous function`），但英文原文作者一直倡议使用立即调用的函数表达式（`Immediately-Invoked Function Expression`）这一名称，作者又举了一堆例子来解释，好吧，我们来看看：

```JavaScript
// 这是一个自执行的函数，函数内部执行自身，递归
function foo() { foo(); }

// 这是一个自执行的匿名函数，因为没有标示名称
// 必须使用arguments.callee属性来执行自己
var foo = function () { arguments.callee(); };

// 这可能也是一个自执行的匿名函数，仅仅是foo标示名称引用它自身
// 如果你将foo改变成其它的，你将得到一个used-to-self-execute匿名函数
var foo = function () { foo(); };

// 有些人叫这个是自执行的匿名函数（即便它不是），因为它没有调用自身，它只是立即执行而已。
(function () { /* code */ } ());

// 为函数表达式添加一个标示名称，可以方便Debug
// 但一定命名了，这个函数就不再是匿名的了
(function foo() { /* code */ } ());

// 立即调用的函数表达式（IIFE）也可以自执行，不过可能不常用罢了
(function () { arguments.callee(); } ());
(function foo() { foo(); } ());

// 另外，下面的代码在黑莓5里执行会出错，因为在一个命名的函数表达式里，他的名称是undefined
// 呵呵，奇怪
(function foo() { foo(); } ());
```

希望这里的一些例子，可以让大家明白，什么叫**自执行**，什么叫**立即调用**。

> 注：`arguments.callee`在`ECMAScript 5 strict mode`里**被废弃了**，所以在这个模式下，其实是不能用的。


## 参考

[IIFE](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)
[JavaScript中的立即执行函数 666](https://segmentfault.com/a/1190000003902899)
[阮一峰 IIFE 666666](http://javascript.ruanyifeng.com/grammar/function.html#toc23)
[[译] JavaScript：立即执行函数表达式（IIFE）666](https://segmentfault.com/a/1190000003985390)
[进击的 JavaScript（五） 之 立即执行函数与闭包 666](https://segmentfault.com/a/1190000015644558)
[深入理解JavaScript系列（4）：立即调用的函数表达式 6666](https://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html)