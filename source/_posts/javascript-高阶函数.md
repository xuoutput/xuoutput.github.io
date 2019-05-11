---
title: javascript-高阶函数
date: 2019-05-11 17:55:52
tags:
- 高阶函数
categories:
- javascript教程
comments: false
permalink:
---

# javascript-高阶函数

`JavaScript` 的一个特性使其非常适合**函数式编程**，它可以**接受高阶函数**。

**高阶函数是一个函数，它可以将另一个函数作为参数，或者返回一个函数作为结果**。

重点就是以上两点我们常用的.

## First Class Functions

您可能听说过它将 `JavaScript` 视为**一等公民**。 这意味着 `JavaScript` 中的**函数被视为对象**。 它们具有 `Object` 类型，可以将它们指定为变量的值，并且可以像任何其他引用**变量**一样传递和返回它们。

这种原生能力在函数式编程方面赋予 `JavaScript` 特殊的权力。 **因为函数是对象**，所以该语言支持非常自然的函数式编程方法。 事实上，它是如此自然，我敢打赌你一直在使用它，甚至没有考虑它。

## 将函数当做参数

如果您已经完成了许多**基于 Web 的 `JavaScript` 编程或前端开发**，那么您可能会遇到使用**回调的函数**。回调是在完成所有其他操作后，在操作结束时执行的函数。通常，此回调函数作为函数中的最后一个参数传入。**通常，它被定义为内联的匿名函数**。

由于 `JavaScript` 是**单线程**的，意味着一次只发生一个操作，所以将要发生的每个操作都沿着这个**单线程排队**。**在父函数的其余操作完成之后传入要执行的函数的策略是支持高阶函数的语言的基本特征之一**。它允许异步行为，因此脚本可以在等待结果时继续执行。在处理可能在未确定的时间段之后返回结果的资源时，传递回调函数的能力是至关重要的。

> 单线程看 {% post_link chrome的console功能 chrome的console功能 %}

这在 Web 编程环境中非常有用，其中脚本可以将 `Ajax` 请求发送到服务器，然后需要在响应到达时处理响应，而不需要知道服务器上的网络延迟或处理时间。 `Node.js` 经常使用回调来最有效地使用服务器资源。对于在执行功能之前等待用户输入的应用程序，此方法也很有用。

例如，考虑这个简单的 `JavaScript` 片段，它为按钮添加了一个事件监听器。

```javascript
<button id='clicker'>So Clickable</button>;

document.getElementById('clicker').addEventListener('click', function() {
  alert('you triggered ' + this.id);
});
```

此脚本使用**匿名内联函数**来显示警报。 但它可以很容易地使用单独定义的函数，并将该命名函数传递给 `addEventListener` 方法

```javascript
var proveIt = function() {
  alert('you triggered ' + this.id);
};

document.getElementById('clicker').addEventListener('click', proveIt);
```

请注意，我们将 `proveIt` 而不是 `proveIt()` 传递给 `addEventListener` 函数。

> 当您按名称传递函数而**没有括号**时，您将传递**函数对象本身**。 当您使**用括号**传递它时，您将**传递执行该函数的结果**。

我们的 `proveIt()` 函数**在结构上独立于它周围的代码**，总是返回触发的任何元素的 id。 这段代码可以存在于您希望显示具有元素 id 的警报的任何上下文中，并且可以使用任何事件侦听器调用。

**使用单独定义和命名的函数替换内联函数的能力开辟了一个充满可能性的世界**。 当我们尝试开发不改变外部数据的**纯函数**，并且每次都为相同的输入返回相同的结果时，我们现在拥有一个必不可少的工具来帮助我们开发一个可以使用的小型目标函数库 通常用于任何应用程序。

> [pure function](https://medium.freecodecamp.org/what-is-a-pure-function-in-javascript-acb887375dfe)

## 将函数作为结果返回

**除了将函数作为参数之外，`JavaScript` 还允许函数返回其他函数**。 这很有道理，因为**函数只是对象**，它们可以像任何其他值一样返回。

但结果返回函数意味着什么？ 将函数定义为另一个函数的返回值**允许您创建可用作模板的函数来创建新函数**。 这打开了另一个功能 `JavaScript` 魔术世界的大门。

例如，想象一下你已经厌倦了阅读所有这些关于 `Millenials` 的特殊性的文章，并且你决定每次发生时都想用 `Millenials` 代替 `Snake People` 这个词。 您的冲动可能只是编写一个函数，在您传递给它的任何文本上执行该文本替换：

```javascript
var snakify = function(text) {
  return text.replace(/millenials/gi, 'Snake People');
};
console.log(snakify('The Millenials are always up to something.'));
// The Snake People are always up to something.
```

这是有效的，但这对于这种情况非常具体。 你也厌倦了听说 `Baby Boomers` 。 您也想为他们制作自定义功能。 但即使有这么简单的功能，你也不想重复你编写的代码：

```javascript
var hippify = function(text) {
  return text.replace(/baby boomers/gi, 'Aging Hippies');
};
console.log(hippify('The Baby Boomers just look the other way.'));
// The Aging Hippies just look the other way.
```

但是如果你决定要做一些更好的东西**以保留原始字符串**中的情况呢？ 您**必须修改两个新函数**才能执行此操作。 这是一个麻烦，它使你的代码更脆弱，更难阅读。

您真正想要的是能够灵活地将任何术语替换为模板函数中的任何其他术语，**并将该行为定义为基础函数，您可以从中生成整个定制函数**。

由于能够返回函数而不是值，JavaScript 提供了使方案更加方便的方法：

```javascript
var attitude = function(original, replacement, source) {
  return function(source) {
    return source.replace(original, replacement);
  };
};

var snakify = attitude(/millenials/gi, 'Snake People');
var hippify = attitude(/baby boomers/gi, 'Aging Hippies');

console.log(snakify('The Millenials are always up to something.'));
// The Snake People are always up to something.
console.log(hippify('The Baby Boomers just look the other way.'));
// The Aging Hippies just look the other way.
```

我们所做的是**将执行实际工作的代码隔离成一个多功能且可扩展的 `attitude` 函数**，该函数封装了使用原始短语和具有某种 attitude 的替换短语来修改任何输入字符串所需的所有工作。

定义一个新函数作为对 `attitude` 函数的引用，预先填充它所采用的前两个参数，允许新函数接受你传递它的任何参数，并将其用作 `attutide` 函数返回的内部函数中的源文本。

我们在这里利用了这样一个事实：**JavaScript 函数并不关心它们是否传递了与最初定义的参数数量相同的参数**。 如果缺少参数，该函数将仅将缺少的参数视为**未定义**。

另一方面，当被调用的函数以我们刚刚演示的方式定义时，可以在稍后传递该附加参数，作为对具有参数（或更多）的另一个函数返回的函数的引用未定义。

如果需要，可以多次查看，以便您完全了解正在发生的事情。 我们正在创建一个返回另一个函数的模板函数。 然后我们将新返回的函数（减去一个属性）定义为模板函数的自定义实现。 以这种方式创建的所有函数都将从模板函数继承相同的工作代码，但可以使用不同的默认参数进行预定义。

## 这就是你已经在做的事情

高阶函数是 `JavaScript` 工作方式的基础，你已经在使用它们了。**每次传递匿名函数或回调时，实际上都会获取传递函数返回的值，并将其用作另一个函数的参数**。

函数返回其他函数的能力扩展了 `JavaScript` 的便利性，允许我们创建自定义命名函数以使用共享模板代码执行特定任务。这些小函数中的每一个都可以继承在原始代码中所做的任何改进，这有助于我们避免代码重复，并保持我们的源清洁和可读。

作为一个额外的好处，如果你**确保你的功能是纯粹的**，这样它们就不会改变外部值，并且它们总是为任何给定的输入返回相同的值，你就可以自己创建测试套件以验证你的更新模板功能时，代码更改不会破坏您所依赖的任何内容。

开始考虑如何在自己的项目中利用这种方法。 `JavaScript` 的一大优点是，您可以将功能技术与您熟悉的代码混合使用。尝试一些实验。您可能会惊讶于使用高阶函数进行一些小工作可以轻松改进您的代码。

## 参考

[Higher-Order Functions in JavaScript](https://www.sitepoint.com/higher-order-functions-javascript/)
