---
title: javascript-Promises
date: 2019-05-13 14:39:39
tags:
- Promises
categories:
- javascript教程
comments: false
permalink:
---

# javascript-Promises

{% post_link 使用Promise 使用Promise %}

`Promises` 是一种 `JavaScript` 中**处理异步代码**的方法，无需在代码中编写太多回调。

`Promises` 通常定义为**最终可用的值的代理**（a proxy for a value that will eventually become available）。

`Promises` 是处理异步代码的一种方法，无需在代码中编写太多回调。

其实 `Promises` 已经存在多年，但是直到 ES2015 才被标准化和引入，现在它们已经在 ES2017 中被 `async`(异步) 函数所取代。

`Async functions`(异步函数) 使用 `promises API` 作为构建块，因此理解 `Promises` 是必须的，即使在较新的代码中，你可能会使用 `async`(异步) 函数而不是 `promises` 。

## 简而言之，`Promsie` 是如何工作的

一旦调用了一个 `promise` ，它就会以 **pending(挂起)** 状态开始。 这意味着调用者函数继续执行，同时等待 `promise` 执行自己的处理，并为调用者函数提供一些反馈。

此时，调用者函数等待它以 **resolved** 状态或者 **rejected** 状态 返回 `promise`，但是如果你知道 JavaScript 是**异步**的，那么 函数会在 `promise` 完成其工作时继续执行 。

## 哪些 JS API 使用 promises ？

除了你自己的代码和库代码之外，Promises 还被用于标准的现代 Web API，例如：

- Battery API
- [Fetch API](https://www.html.cn/archives/9907)
- Service Workers

在现代 JavaScript 中你不太可能发现自己没有使用 Promises ，所以让我们开始深入了解它们。

## 创建 promise

`Promise API` 公开了一个 `Promise` 构造函数，你可以使用 `new Promise()` 进行初始化：

JavaScript 代码:

```javascript
let done = true;
const isItDoneYet = new Promise((resolve, reject) => {
  // 也可写成 (res, rej) 这种, 反正是个名字, 记得下面也要改 res(workDone) 这种
  if (done) {
    const workDone = 'Here is the thing I built';
    resolve(workDone); // 这里不是 return哦
  } else {
    const why = 'Still working on something else';
    reject(why); // 这里不是 return哦
  }
});
```

> **高阶函数, 函数当参数**
> !**注意, 这个 `executor` 不是用 `return`, 而是返回并执行 `resolve, reject` 回调函数**
> !**注意, 这个 `executor` 不是用 `return`, 而是返回并执行 `resolve, reject` 回调函数**
> !**注意, 这个 `executor` 不是用 `return`, 而是返回并执行 `resolve, reject` 回调函数**

正如你所看到的，`promise` 会检查 `done` 这个全局常量，如果 `done` 为 `true` ，我们将返回 `resolved` 状态的 `promise` ，否则将返回 `rejected` 状态的 `promise` 。

使用 `resolve` 和 `reject` 时，我们可以**回传一个值**，在上面的例子中我们只是回传了一个字符串，但它也可以是一个对象。

## 使用 promise

在上一节中，我们介绍了如何**创建 `promise`**。

现在让我们看看如何**使用 `promise`** 。

JavaScript 代码:

```javascript
const isItDoneYet = new Promise();
//...
const checkIfItsDone = () => {
  isItDoneYet
    .then((ok) => {
      // ok 是resolve的一个promise
      console.log(ok);
    })
    .catch((err) => {
      console.error(err);
    });
};

// 也就是
const checkIfItsDone = () => {
  isItDoneYet.then(
    (ok) => {
      // ok 是resolve的一个promise
      console.log(ok);
    },
    (err) => {
      console.error(err);
    }
  );
};
```

运行 `checkIfItsDone()` 将执行 `isItDoneYet()` promise 并使用 `then` 回调等待该 `promise` 的 `resolve` 状态。如果有错误，它将在 `catch` 回调中处理这个错误。

## 链式调用 promises

`promise` 可以返回另一个 `promise` ，形成一个**链式 `promise`** 。

链式调用 `promises` 的一个很好的例子是 `Fetch API`，**它是 `XMLHttpRequest API` 上层 API**，我们可以使用它来获取资源，并在获取资源时对 **Promise 链**进行排列。

> **`promise` 和 `ajax` 没有关系, 而 `ajax` 是 `fetch` 的基础**

`Fetch API` 基于 `promise` 机制，调用 `fetch()` 等同于我们通过 `new promise()` 定义一个我们自己的 `promise`。

### 链式调用 promises 例子

JavaScript 代码:

```javascript
const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = (response) => response.json();
fetch('/todos.json')
  .then(status)
  .then(json)
  .then((data) => {
    console.log('Request succeeded with JSON response', data);
  })
  .catch((error) => {
    console.log('Request failed', error);
  });
```

在这个例子中，我们调用 `fetch()` 从根域名中的 `todos.json` 文件获取一个 **TODO 清单**，我们创建了一个 **promises 链**。

运行 `fetch()` **返回一个包含很多个属性的 `response`**，我们引用了其中的：

- `status`，数字值表示的 HTTP 状态代码
- `statusText`，状态消息，请求成功时为 OK

`response` 还有一个 `json()` 方法，该方法返回一个 `resolve` 状态的 `promise`，并且将响应内容转化为 JSON 作为该 promise 的回传值。

在这些前提下，会发生这样的情况:**链中的第一个 promise** 是我们定义的函数 `status()` ，它检查响应状态，**如果响应不成功**(在 200 到 299 之间)，则 reject 该 promise 。

此操作将导致 promise 链**跳过队列中的所有的 promise** ，并将直接跳到底部的 `catch()` 语句，打印 Request failed 文本以及错误消息。

**如果成功**，它会调用我们定义的 `json()` 函数。 前一个 promise 返回 response 对象，作为第二个 promise 的输入。

在这种情况下，我们返回处理过的 JSON 数据 ，因此**第三个 promise 直接接收 JSON**：

JavaScript 代码:

```javascript
.then((data) => {
console.log('Request succeeded with JSON response', data)
})
```

在控制台会打印出这些内容。

## 处理错误

在上面的例子中，`promises` 链后面有一个**额外的 `catch` 块**。当 `promises` 链有任何错误发生，将 promise 置为 `reject` ，控制会转到链中最近的 `catch()` 语句。

JavaScript 代码:

```JavaScript
new Promise((resolve, reject) => {
  throw new Error('Error')      // 这里用 throw
})
  .catch((err) => { console.error(err) })

// or

new Promise((resolve, reject) => {
  reject('Error')             // 这里用回调函数 reject好了
})
  .catch((err) => { console.error(err) })
```

## 级联错误

如果在 `catch()` **内部又抛出一个错误**，你可以添加第二个 `catch()` 处理它，以此类推。

JavaScript 代码:

```JavaScript
new Promise((resolve, reject) => {
  throw new Error('Error')
})
  .catch((err) => { throw new Error('Error') })
  .catch((err) => { console.error(err) })
```

## Promise.prototype.finally()

这是 ES2018（ES9）的新特性.

当一个 `promise` 得到**满足（fulfilled）**时，**它会一个接一个地调用 `then()` 方法**。如果在此期间发生**错误 `reject`**，**则跳过 then() 方法并执行 catch() 方法**。

`finally()` 允许您运行一些代码，**无论 promise 的执行成功或失败**：

JavaScript 代码:

```JavaScript
fetch('file.json')
  .then(data => data.json())
  .catch(error => console.error(error))
  .finally(() => console.log('finished'))
```

## 协调 promises

### Promise.all()

如果你需要**同步处理多个 promises**，`Promise.all()` 可以帮助你定义**一组 promises 列表**，等待它们**全部** `resolved` 之后再执行某些操作。比如：

JavaScript 代码:

```JavaScript
const f1 = fetch('/something.json')
const f2 = fetch('/something2.json')

Promise.all([f1, f2]).then((res) => {
    console.log('Array of results', res)
})
.catch((err) => {
  console.error(err)
})
```

ES2015 的**解构语法**也允许你这么做：

JavaScript 代码:

```JavaScript
Promise.all([f1, f2]).then(([res1, res2]) => {    // 这里解构数组
    console.log('Results', res1, res2)
})
```

**这不仅限于 `fetch`，任何 `promise` 都可以处理**。

### Promise.race()

`Promise.race()` 会在你传递给它的**第一个 promise resolves 时运行**，并且它只运行一次附加的回调，并传入首先 resolved 的 promise 返回的结果。

示例：

JavaScript 代码:

```JavaScript
const first = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'first')
})
const second = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'second')
})

Promise.race([first, second]).then((result) => {
  console.log(result) // second
})
```

## 常见错误

### Uncaught TypeError: undefined is not a promise

如果你控制台中看到 `Uncaught TypeError: undefined is not a promise` 错误，**请确保使用的是 `new Promise()` 而不是 `Promise()`**。

如果你还有什么疑问，可以查看 [ES6 Promise 指南 666666](https://www.html.cn/archives/9933)

## 例子

```JavaScript
const myPromise = new Promise((resolve, reject) => {
    if (Math.random() * 100 < 90) {
        console.log('resolving the promise ...');
        resolve('Hello, Promises!');
    }
    reject(new Error('In 10% of the cases, I fail. Miserably.'));
});

// 两个函数
const onResolved = (resolvedValue) => console.log(resolvedValue);
const onRejected = (error) => console.log(error);

myPromise.then(onResolved, onRejected);

// 效果同上，代码更加简明扼要
myPromise.then((resolvedValue) => {
    console.log(resolvedValue);
}, (error) => {
    console.log(error);
});

// 有 90% 的概率输出下面语句

// resolving the promise ...
// Hello, Promises!
// Hello, Promises!   // 这里没有输出resolving the promise ...了, 因为第一次已经成功了
```

在上面的例子中还有一些需要注意的 `重要事项`。

我们创建了一个 promise 实例 myPromise。我们分别在第 13 行和第 16 行附加了两个 .then 的处理程序。尽管它们在功能上是相同的，**但它们还是被被视为不同的处理程序**。但是 ——

- 一个 `promise` 只能成功（resolved）或失败（reject）一次。它不能成功或失败两次，也不能从成功切换到失败，反之亦然。
- 如果一个 `promise` 在你添加成功/失败回调（即 .then）**之前就已经成功或者失败**，则 `promise` **还是会正确地调用回调函数**，即使事件发生地比添加回调函数要早。

**这意味着一旦 `promise` 达到最终状态，即使你多次附加 `.then` 处理程序，状态也不会改变（即不会再重新开始计算）**。

> 这说的就是第二个 `.then` 只会打印 `Hello, Promises!`

为了验证这一点，你可以在**第 3 行**看到一个 `console.log` 语句。当你用 `.then` 处理程序运行上述代码时，需要输出的语句只会被打印一次。 **它表明 `promise` 缓存了结果，并且下次也会得到相同的结果**。

另一个要注意的是，promise 的特点是**及早求值**（evaluated eagerly）。 **只要声明并将其绑定到变量，就立即开始执行**。没有 `.start` 或 `.begin` 方法。就像在上面的例子中那样。

为了确保 promise 不是立即开始而是**惰性求值**（evaluates lazily）， **我们将它们包装在函数中**。稍后会看到一个例子。

> 一个 `.catch`本身总是被解析为 `promise`，并且不会被拒绝（除非你故意抛出错误）。这就是为什么 `.then` 后面的 `.catch`会被执行的原因。

这里建议使用 `.catch` 而**不是带有 `onResolved` 和 `onRejected` 参数的 `.then` 去处理**。下面有一个案例解释了为什么最好这样做

```javascript
const promiseThatResolves = () =>
  new Promise((resolve, reject) => {
    resolve();
  });

// 导致被拒绝的 promise 没有被处理
promiseThatResolves().then(
  () => {
    throw new Error(); // 这里出错了就不能抓住
  },
  (err) => console.log(err)
);

// 适当的错误处理
promiseThatResolves()
  .then(() => {
    throw new Error();
  })
  .catch((err) => console.log(err)); // 这里可以抓住
```

## 参考

[理解 JavaScript 中的 Promises – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10224)
[ES6 Promise 指南 666](https://www.html.cn/archives/9933)
[ES2017 新特性：Async Functions (异步函数) 66 讲了和 generator 关系](https://www.html.cn/archives/7731)
[用 async 和 await 编写现代 JavaScript 异步代码 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10235)
[译】Async-Await≈Generators+Promises](https://juejin.im/post/5b04c7db6fb9a07aa542a772)
