---
title: JavaScript 的 async/await
date: 2018-11-25 16:43:08
tags:
- es6
- async
- await
categories:
- javascript教程
comments: false
permalink:
---

# JavaScript 的 async/await

第一阶段, 知道await当异步为同步,
第二阶段, 知道了event loop后知道await是promsie的语法糖.
第三阶段, 竟然再执行await下面的语句之前, 会执行async外的同步语句
第四阶段, 竟然导致微队列先执行了

## 结论放开头

1. `async function`只是用来**返回**一个`Promise`对象或者要执行`await`时包上为了达到`async function`不阻塞的效果.(并是不说`async`里面一定要有`await`),**绝不会阻塞后面的语句,整个一个`async function`** 不会阻塞哦, 且返回的是`Promise`.(不要和里面的`await`遇到`Promise`阻塞搞混),而且`await`不会包装值为`Promise`
    1. --- 区别`async`会返回一个`Promise`, 不阻塞, `await`就算接收了`Promise`也只返回里面的值, 阻塞.
2. `await`是用来在`async functnion`中等待执行一个表达式(`expression`),而且只能在`async function`中使用, 可以等的是普通的函数(那就当啥事没有,正常往下同步执行呗), 当然重点是说等着`Promsie`, 保证来的如果是`Promise`对象, 那么一定会保证先等这个`promise`搞定了(阻塞),再往下执行代码.(`await` 必须用在 `async` 函数中的原因就是为了`async function`不阻塞),**注意:`await`不会包装值为`Promise`**
3. `async/await` 的优势在于**优化**处理 `then` 链以及对比`Promise`更清晰的**传递参数**
4. 优化点, 处理`await`的时候最好用`try...catch`住,或者用`.catch` 防止`Promise`变为`reject`
5. 处理多个的时候用`Promise.all()`,并且传入`数组[]` , 切记不要用`forEach`,虽然`forEach`**可能让他们并发执行**
6. **至于`await`用不用, 看这一步的`await`会不会对后面的产生影响. 并不是说子的函数就搞定了. 他还是`promise,pending`的**

> 建议再看下多进程浏览器, 多线程渲染进程这个 event loop {% post_link 从输入URL到页面加载发生了什么 从输入URL到页面加载发生了什么 %}

看了event loop后知道宏任务和微任务, 再然后是await和promise的关系

> 实际上，async/await 在底层转换成了 promise 和 then 回调函数。也就是说，这是 promise 的**语法糖**。每次我们使用 await, 解释器都创建一个 promise 对象，**然后把剩下的 async 函数中的操作放到 then 回调函数中(这不就是先`new promise`中的'同步' 这个同步指伪的,, 然后`then`中的微队列么)**。 **这个我觉得就是重点, 理解语法糖结构**

[从event loop到async await来了解事件循环机制 6666669](https://juejin.im/post/5c148ec8e51d4576e83fd836)

重点以前的误解(**注意右边, 下面, 外面的措辞**)

在`async`函数中遇到`await`关键字，`await`**右边的语句会被立即执行**然后`await`下面的代码进入等待状态，等待`await`得到结果。接着执行`async`函数外的同步代码, 然后再回到`await`右边的语句(如果有`then`(是个promise)就执行完当前宏任务后的微队列), 最后才往`await`下面执行.

- `await`后面如果不是 `promise` 对象, `await`会阻塞下面的代码，先执行`await`右边表达式中的同步代码. 再执行当前`async`函数外面的同步代码，同步代码执行完，再回到`async`内部，把这个非`promise`的东西，**作为 `await`表达式的结果**, 然后执行`await`下面的代码, (**后面存在微队列的话, 再去执行微队列的**)。
- `await`后面如果是 `promise` 对象，`await` 也会暂停`async`函数中后面的代码(`await`下面的语句)，**但要先执行当前`async`函数外面的同步代码**，(这里注意哦, 如果`await`后的表达式有同步的代码, 先执行这个, 再执行外面的同步代码. 外面的同步代码可能会有**推入微队列**)
  - **这里重点记忆下**: 然后等着`await`右边的 `Promise` 对象 `fulfilled`，再把 `resolve` 的参数作为 `await` 右边表达式的运算结果。(**如果`async`函数外面的同步代码存在`then`这种微队列中的, 那么微队列会提前执行了.**), 最后再执行`await`下面的代码
  - 先执行`await`右边表达式同步代码, 然后执行`async`外面同步代码, 然后执行`then`微队列, 最后返回data
  - 这样就导致微队列中的代码提前执行了

> 1. 就是注意 **执行`await`后面的表达式后, 不会立即执行`await`下面的, 而是先执行`async`外面的同步代码**
> 2. 一般上面没啥问题, 就是注**意如果执行`await`后面的表达式后面是一个`promise`, 那么这个会把微队列也先执行掉**
> 如果`await`后面是是`Promise`的, 那么**会提前执行微队列**, 注意再提前也是要先执行完`async`外的同步代码哦

还要注意

```JavaScript
setTimeout(function () {
  console.log('6')
}, 0)
console.log('1')
async function async1() {
  console.log('2')
  await async2()
  console.log('5')
}
async function async2() {
  console.log('3')
}
async1()
console.log('4')
```

1. 6是宏任务在下一轮事件循环执行
2. 先同步输出1，然后调用了async1()，输出2。
3. await async2() 会先运行async2()，5进入等待状态。
4. 输出3，这个时候先执行async函数外的同步代码输出4。
5. 最后await拿到等待的结果继续往下执行输出5。
6. 进入第二轮事件循环输出6。

上面没啥问题, 下面的第一个例子也没啥问题, `await`右边不是promise,  重点看第二个例子`await`右边是promise, 然后`async`函数外的同步代码**又会推入微队列**

```JavaScript
async function async1() {
  console.log("2");
  await async2();
  console.log("7");
}

async function async2() {
  console.log("3");
}

console.log("1");
async1();

new Promise(function(resolve) {
  console.log("4");
  resolve();
}).then(function() {
  console.log("6");
});
console.log("5");
// 1 2 3 4 5 7 6


async function async1() {
  console.log("2");
  await async2();
  console.log("8");
}
async function async2() {   // 这个函数不同, 导致比上一个例子中,7比8先出.  本来then的7是微队列, 要放到8后面才输出, DNA因为这里是这个await要等到所有promise的then也执行完才能执行打印8 , 所以这个导致后面的7页输出了
  return new Promise(function(resolve) {
    console.log("3");
    resolve();
  }).then(function() {
    console.log("6");
  });
}

console.log("1");
async1();

new Promise(function(resolve) {
  console.log("4");
  resolve();
}).then(function() {
  console.log("7");
});
console.log("5");
// 1 2 3 4 5 6 7 8
```

## 说下async起的作用

这个问题关键在于, `async`函数如何处理它的返回值. 在普通的`function`前加`async`的效果是啥

我们可以直接通过`return`来返回我们想要的值(没有返回值就是返回`undefined`), **这里就可以知道,`async`里面有没有`await`并没有多大关系**

代码如下

```javascript
async function testAsync() {
    return "hello async";
}

const result = testAsync();
console.log(result);
```

![async.png](async.png)

看到输出结果就知道了, 输出的就是一个`Promise`对象.还是`resolve`状态的.

**所以, `async`函数返回的是一个`Promise`对象**, 在[MDN文档async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)中可以知道. 就像上面如果是一个直接量`'hello async'` 那就把这个通过`Promsie.resolve()`封装成`Promise`对象.

所以在外层如果不用`await`获取其返回器的情况下, 当然我们就用`Promise`的`.then`链式来处理咯.

```javascript
testAsync().then(v => {
    console.log(v);    // 输出 hello async
});
```

当然`async`没有返回值就是返回`Promise.resolve(undefined)`咯.

联想一下 `Promise` 的特点——**无等待**，所以在**没有** `await` 的情况下执行 `async` 函数，它会**立即执行**(和`await`阻塞后面的语句不一样啦)，返回一个 `Promise` 对象，并且，**绝不会阻塞后面的语句****绝不会阻塞后面的语句****绝不会阻塞后面的语句**。这和普通返回 `Promise` 对象的函数并无二致。

那么`async`有啥用呢, `await`又在等个啥

## `await`等啥呢,当然重要的是等`Promise`, 其他的也可以等

按我们以前片面的理解,`await`等待的是一个`async`函数的完成. 从前面到这里我们知道,那么等待的是一个`Promise`对象咯, 但从[MDN await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)中可以知道, `await`等待的是一个`expression`. **所以这个表达式可以是`Promise`对象,当然也可以是其他值咯**

如下的例子,`await`后面可以是直接量,也可以是`Promise`对象

```javascript
function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
```

## 当`await`等到了后`expression`的值, 然后

`await`表达式的运算结果取决于它等的东西, 按前面分有2种情况: 重点当然是等来了`Promise`了

1. 如果等来的不是`Promise`对象, 那`await`表达式的运算结果就是那个等来的值
2. 如果它等得到了`Promise`对象, **那么** `await`就会阻塞后面的代码, 等`Promise`对象状态变好`resolve`或`reject`,得到了这个值,作为运算结果咯. 还是一个`Promise`的

> 这就是`await`必须在`async function`中使用的原因. 前面说`async function`调用不会造成阻塞, 它内部的所有阻塞都封装在一个`Promise`对象中异步执行了. 谁保证执行呢, 就是这个`await`

## `async/await`帮我们干了啥, 优势在哪

上面已经说明了 `async function` 会将里面的的函数（函数表达式或 Lambda）的返回值封装成一个 `Promise` 对象，而 `await` 会等待这个 `Promise` 完成，并将其 `resolve` 的结果返回出来。

现在举例，用 `setTimeout` 模拟耗时的**异步操作**，先来看看不用 `async/await` 会怎么写

```javascript
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

takeLongTime().then(v => {
    console.log("got", v);
});
```

如果改用 `async/await` 呢，会是这样

```javascript
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {     // async
    const v = await takeLongTime();
    console.log(v);
}

test();

```

眼尖的已经发现 `takeLongTime()` 没有申明为 `async`。实际上，`takeLongTime()` 本身就是返回的 `Promise` 对象，加不加 `async` 结果都一样，**如果没明白，请回过头再去看看上面的“async 起什么作用”。**

又一个疑问产生了，这两段代码，两种方式对异步调用的处理（实际就是对 `Promise` 对象的处理）差别并不明显，甚至使用 `async/await` 还需要多写一些代码，**那它的优势到底在哪？**

### `async/await` 的优势在于处理 `then` 链以及对比`Promise`更清晰的**传递参数**

单一的 `Promise` 链并不能发现 `async/await` 的优势，但是，如果需要处理由**多个** `Promise` 组成的 `then` 链的时候，优势就能体现出来了（**很有意思，`Promise` 通过 `then` 链来解决多层回调的问题，现在又用 `async/await` 来进一步优化它）。**

假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 `setTimeout` 来模拟异步操作：

```javascript
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

现在用 `Promise` 方式来实现这三个步骤的处理

```javascript
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms
```

如果用 `async/await` 来实现呢，会是这样

```javascript
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
```

结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样

### Promise 方案的死穴—— 参数传递太麻烦了

现在把业务要求改一下，仍然是三个步骤，但每一个步骤都需要之前每个步骤的结果。

```javascript
function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}
```

这回先用 `async/await` 来写：

```javascript
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 800 = 300 + 500
// step3 with 1800 = 300 + 500 + 1000
// result is 2000
// doIt: 2907.387ms
```

除了觉得执行时间变长了之外，似乎和之前的示例没啥区别啊！别急，认真想想如果把它写成 `Promise` 方式实现会是什么样子？

```javascript
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
```

有没有感觉有点复杂的样子？那一堆参数处理，**就是 Promise 方案的死穴—— 参数传递太麻烦了，看着就晕！**

## 其他情况, 代码优化点

`Promise`如果返回的是`reject`呢, 或者并行处理呢

[阮一峰的](http://www.ruanyifeng.com/blog/2015/05/async.html)

### 也先说结论了

1. 在使用`await`的时候, 最好用`try.catch`或者说,用`.catch`兜底, 2选1
2. 处理多个的时候用`Promise.all()`,并且传入`数组[]` , 切记不要用`forEach`,虽然`forEach`**可能让他们并发执行**

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

## javascript异步操作

从最早的回调函数，到 `Promise` 对象，再到 `Generator` 函数，每次都有所改进，但又让人觉得不彻底。它们都有额外的复杂性，都需要理解抽象的底层运行机制。
异步I/O不就是读取一个文件吗，干嘛要搞得这么复杂？异步编程的最高境界，就是根本不用关心它是不是异步。

有个没见过的`Generator` 函数, 这是个啥, 看一看

有一个 `Generator` 函数，依次读取两个文件。

```javascript
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

写成 `async/await` 函数，就是下面这样。

```javascript
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

**一比较就会发现，`async` 函数就是将 `Generator` 函数的星号`*`替换成 `async`，将 `yield` 替换成 `await`，仅此而已。**

同 `Generator` 函数一样，`async` 函数返回一个 `Promise` 对象，可以使用 `then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。(**注意这里没说很详细, 但看了前面我们就知道, 他隐含说`async`中返回一个`Promise`, 而且里面可以没有`await`**)

下面是一个例子。

```javascript
async function getStockPriceByName(name) {
  var symbol = await getStockSymbol(name);
  var stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result){
  console.log(result);
});
```

上面代码是一个获取股票报价的函数，函数前面的`async`关键字，表明该函数内部有异步操作(**这里其实说的不对,而是因为里面有`await`所以才用`async`**)。调用该函数时，会立即返回一个`Promise`对象。

### 注意点

`await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在 `try...catch` 代码块中。

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```

## 参考文档

[1. 理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)
[2. 阮一峰的async](http://es6.ruanyifeng.com/#docs/async)只是看怎么用
[2. 阮一峰async 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)
[从event loop到async await来了解事件循环机制 666](https://juejin.im/post/5c148ec8e51d4576e83fd836)
[Event Loop 原来是这么回事 66](https://juejin.im/post/5c36b3b0f265da611f07e409)