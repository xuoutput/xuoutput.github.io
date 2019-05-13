---
title: 使用Promise
date: 2018-11-21 10:02:01
tags:
- es6
- promise
categories:
- javascript教程
comments: false
permalink:
---

# Promise 是什么,使用 Promise

先看 `async` 和 `await` 吧,然后混入 `promise`

**从`Promise`对象的方法和原型的方法上的返回和传入参数看**

## Promise 是什么, 主要介绍 Promise 构造函数

**Promise** 对象用于表示一个`异步操作`的最终`状态`（完成或失败），以及其`返回的值`。

具体描述看下面

> 下面主要内容是 `Promise` 构造函数, 构造函数主要是用来包装还未支持 `promise` 的函数
> 所以要 `new` 一个

```javascript
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
```

## 创建 Promise

`Promise`对象是由关键字 `new` 及其`构造函数`来创建的。该构造函数会把一个叫做“处理器函数”（`executor function`）的函数作为它的`参数`。这个“处理器函数”接受`两个函数`——`resolve` 和 `reject` ——作为其参数。当异步任务顺利完成且返回结果值时(异步操作在`executor`内)，会调用 `resolve` 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用`reject` 函数。

> 高阶函数, 可以把函数作为参数或者返回函数 {% post_link javascript-高阶函数 javascript-高阶函数 %}

## 语法

```javascript
new Promise( function(resolve, reject) {...} /* executor */  );
```

参数就是一个 `function(resolve, reject) {...}` 这个`executor`

> !**注意, 这个 `executor` 不是用 `return`, 而是返回并执行 `resolve, reject` 回调函数**
> !**注意, 这个 `executor` 不是用 `return`, 而是返回并执行 `resolve, reject` 回调函数**
> !**注意, 这个 `executor` 不是用 `return`, 而是返回并执行 `resolve, reject` 回调函数**

`executor`是带有 `resolve` 和 `reject` 两个参数的**函数** 。**这两个参数也是函数**. (**回调函数哦**)

**Promise**构造函数执行时立即调用 `executor` 函数（ **executor 函数在 Promise 构造函数返回新建对象前被调用**）， `resolve` 和 `reject` 两个**函数**作为参数传递给 `executor`。`executor 内部`通常会执行一些**异步操作**，
一旦完成，可以调用 `resolve` 函数来将 `promise` 状态改成 `fulfilled`，或者在发生错误时调用`reject`函数将它的状态改为 `rejected`。 从这里知道, **Promise 的状态是通过回调函数`resolve`和`reject`改的**

即:`resolve` 和 `reject` 函数被调用时，分别将 `promise` 的状态改为 `fulfilled`（完成）或 `rejected`（失败）。

如果在 `executor` 函数中抛出一个错误，那么该 `promise` 状态为 `rejected` 。 `executor` 函数的返回值被忽略。

> `resolve` 函数的作用是，将 `Promise` 对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
> `reject` 函数的作用是，将 `Promise` 对象的状态从“未完成”变为“失败”（即从 `pending` 变为 `rejected`）， 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

## 描述

`Promise` 对象是一个代理对象（**代理一个值**），被代理的**值**在 `Promise` 对象**创建时可能是未知的**(比如可以是一个异步的操作,也可以直接是一个确定的值, 总之都用 Promise 包起来)。

它**允许你为异步操作的成功和失败分别绑定相应的处理方法**（handlers）。 这让异步方法可以**像同步方法**那样返回值，但**并不是立即返回**最终执行结果，而是一个能**代表未来出现的结果**的 `promise` 对象

一个 `Promise` 有以下 3 种状态: **Promise 的状态是通过回调函数`resolve`和`reject`改的**

- `pending`: 初始状态，既不是成功，也不是失败状态。
- `fulfilled`: 意味着操作成功完成。对应从调用`resolve`函数
- `rejected`: 意味着操作失败。 对应从调用`reject`函数

> 注意： 如果一个 promise 对象处在 fulfilled 或 rejected 状态而不是 pending 状态，那么它也可以被称为`settled`状态。

`pending` 状态的 `Promise` 对象可能触发 `fulfilled` 状态并传递一个值给相应的状态处理方法 `resolve` ，也可能触发失败状态（`rejected`）并传递失败信息给 `reject`方法 。

> 从这里看出, 先是执行第一个`Promise`对象,然后触发回调的方法`resolve` `reject`, 产生一个新的`Promise`对象.
> 然后 👇 下面是`Promise`对象原型上的方法来处理(就会被触发调用),用到`then` `catch`

当其中任一种情况出现时，`Promise` 对象的 `then` 方法(**这个方法是在 Promise 的原型上的, 并返回一个 Promise 对象**)绑定的处理方法（handlers ）就会**被调用**
（ `then` 方法包含**两个参数,也都是函数**：`onfulfilled` 和 `onrejected`，它们都是 `Function` 类型。当 `Promise` 状态为 `fulfilled` 时，调用 `then` 的 `onfulfilled` 方法，当 `Promise` 状态为 `rejected` 时，调用 `then` 的 `onrejected` 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。

> 这里搞懂, 第一个`Promise`通过执行`executor`的回调函数`resolve` `reject`变为相应的`fulfilled`或`rejected`状态, 返回一个`新的Promise`对象.
> 然后`then`方法根据返回的`新的Promise`对象的**状态**, 调用相应的`onfulfilled`或`onrejected`方法.

所以状态是 3 种, Promise 的回调函数 2 种, then 方法的回调也是 2 种

`pending` `fulfilled` `rejected`
`resolve` `reject`
`onfulfilled` `onrejected`

平时见到的 `then`和 `catch` 可以**链式调用**的原因是因为 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回 `promise` 对象

> **注意**: `then`方法是在 `Promise`对象的原型上`prototype`的, `Promise`对象本身就 4 个方法`resolve` `reject` `all` `race`
> 原型上 3 个 `then` `catch` `finally`

![2.png](2.png)

## 属性和方法(上面涉及了 Promise 的方法和 Promise 原型上的方法, 具体介绍下)

看完方法和原型的返回, 在回顾去看下描述就更好

### 属性 不常用 2 个

`Promise.length` length 属性，其值总是为 1 (构造器参数的数目).

`Promise.prototype` 表示 Promise 构造器的原型.

### 方法和原型

`Promise`的方法 4 个, 都返回`Promise`对象

1. `Promise.resolve(value)`: 返回一个状态由给定`value`决定的`Promise对象`。
   如果该`value`是一个`Promise`对象，则直接返回该`Promise`对象；
   如果该值是`thenable`(即，带有`then`方法的对象)，返回的`Promise`对象的最终状态由`then`方法执行决定；(**注意**: 应该是`Promise.resolve`方法会将这个对象转为 `Promise` 对象，然后就立即执行`thenable`对象的`then`方法。)

```javascript
// 这是一个滴啊有then方法的对象, 所以
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable); // 这里先包装thenable
p1.then(function(value) {
  // 这里执行, 最终结果.
  console.log(value); // 42
});
```

否则的话(该`value`为`空`，`基本类型`或者不带`then`方法的对象),返回的`Promise`对象状态为`fulfilled`，并且将该`value`传递给对应的`then`方法。
**通常而言**，如果你不知道一个值是否是`Promise`对象，使用`Promise.resolve(value)` 来返回一个`Promise`对象,这样就能将该`value`以`Promise`对象形式使用。

2. `Promise.reject(reason)`: 返回一个状态为失败的`Promise对象`，并将给定的失败信息`reason`传递给对应的处理方法`catch`住.(实际上只是 `then(null, ...)` 的语法糖)
3. `Promise.all(iterable)`: 这个方法返回一个新的`promise`对象(**成功对应返回 resolve 一个 Promise 包装的所有成功 value 的数组, 失败就返回 reject 第一个失败的那个的 reason 信息**)，该`promise`对象在`iterable`参数对象里(不是说是`数组`,而是说要具有`iterable`接口)`所有的promise`对象都成功的时候才会触发成功，一旦有任何一个`iterable`里面的`promise`对象`失败`则立即触发该`promise`对象的失败。
   > 这个`新的promise`对象在触发成功状态以后，会把一个包含`iterable`里`所有promise`返回值的`数组`作为成功回调的返回值，顺序跟`iterable`的顺序保持一致；如果这个新的`promise`对象触发了`失败状态`，它会把 iterable 里第一个触发失败的`promise`对象的错误信息作为它的失败错误信息。`Promise.all`方法常被用于处理`多个promise`对象的状态集合。
4. `Promise.race(iterable)`: 当`iterable`参数里的任意一个`子promise`被成功或失败后(就是看最快的那个, `all`相当于是看最慢的)，`父promise`马上也会用`子promise`的成功返回值或失败详情作为参数调用`父promise`绑定的相应句柄，并返回该`promise`对象。(**注意**: `Promise.race` 在第一个`promise`对象变为`Fulfilled`之后，并不会取消其他`promise`对象的执行。)

![3.png](3.png)

`Promise`原型, 1 个属性, 3 个方法

属性就是原型都有的`romise.prototype.constructor` 返回被创建的实例函数. 默认为 `Promise 函数`

方法就是常见的 3 个, `then` `catch` `finally`

1. `Promise.prototype.then(onFulfilled, onRejected)`: 添加解决(`fulfillment`)和拒绝(`rejection`)回调到当前 `promise`, 返回一个`新的 promise`, 将以回调的返回值来`resolve`. (`catch`只是`then`的一个特例)

2. `Promise.prototype.catch(onRejected)`: 添加一个拒绝(`rejection`) 回调到当前 `promise`, 返回一个`新的promise`。当这个回调函数被调用，`新 promise` 将以它的返回值来`resolve`，否则如果当前`promise` 进入`fulfilled`状态，则以当前`promise`的完成结果作为新`promise`的完成结果.**注意这个也是返回一个 Promise, 当成`then`只有第 2 个参数时呗**

3. `Promise.prototype.finally(onFinally)`: 添加一个事件处理回调于当前`promise`对象，并且在`原promise`对象解析完毕后，返回一个`新的promise`对象。回调会在当前`promise`运行完毕后被调用，无论`当前promise`的状态是完成(`fulfilled`)还是失败(`rejected`)

![resolved.png](resolved.png)

关于`Symbol(Symbol.toStringTag): "Promise"`的知识, 看[Symbol.toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)

## 总结 : 看[你真的完全掌握了 promise 么？](https://juejin.im/post/5af29a62f265da0b8f628973)

**Promise** 对象用于表示一个`异步操作`的最终`状态`（完成或失败），以及其`返回的值`。

`Promise`编程的核心思想是如果数据就绪(`settled`)，那么(`then`)做点什么。

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

1. `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending` 变为`fulfilled`），在异步操作成功时调用，并将异步操作的结果，作为`参数`传递出去；
2. `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 `pending` 变为`rejected`）， 在异步操作失败时调用，并将异步操作报出的错误，作为`参数`传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的`回调函数`。

```javascript
promise.then(
  function(value) {
    // success
  },
  function(error) {
    // failure
  }
);
```

立即`resolve`的 `Promise` 对象，是在**本轮**“事件循环”（`event loop`）的结束时，而不是在下一轮“事件循环”的开始时。

```javascript
setTimeout(function() {
  console.log('three');
}, 0);

Promise.resolve().then(function() {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

上面代码中，`setTimeout(fn, 0)`在**下一轮**“事件循环”开始时执行，`Promise. resolve()`在**本轮**“事件循环”结束时执行，`console.log('one')`则是**立即执行**，因此最先输出。

**特别说明**：如果需要`resolve()`往后传递**多个**参数，不能直接写`resolve(a1,a2,a3)`，这样只能拿到第一个要传的参数，需要以数组或对象去传递

```javascript
let obj = { a1: a1, a2: a2, a3: a3 };
resolve(obj);
//or
let arr = [a1, a2, a3];
resolve(arr);
```

Promise 的链还停不了诶

```javascript
// 这里是返回一个pending状态的Promise
new Promise(function() {});
```

虽然上面可以停住, 但会导致内存泄漏,毕竟一直停住了, 不释放内存.

## 衍生

[Understand promises before you start using async/await](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8) 这个链接里面有 `callback` 转 `promsie的`

[Implementing](https://www.promisejs.org/implementing/) 这里有从头自己实现一个 `promise`的

## ajax 和 fetch

## 参考

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[使用 Promises](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
[阮一峰 es6 Promise 对象](http://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/promise)

进阶
[你真的完全掌握了 promise 么？](https://juejin.im/post/5af29a62f265da0b8f628973)
[对 Promise 状态的理解和基本用法](https://juejin.im/post/5a58551ef265da3e51330a8e)
[从如何停掉 Promise 链说起](https://github.com/xieranmaya/blog/issues/5)
