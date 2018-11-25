---
title: async function await
date: 2018-11-25 20:24:15
tags:
- es6
- async
- await
categories:
- javascript教程
comments: false
permalink:
---

# async function/ await

## 语法

```javascript
async function name([param[, param[, ... param]]]) { statements }
```

### **返回值**

一个返回的`Promise`对象会以`async function`的返回值进行解析(`resolved`)，或者以该函数抛出的异常进行回绝(`rejected`)。

## 描述

当调用一个 `async` 函数时，会返回一个 `Promise` 对象。

1. 当这个 `async` 函数**返回一个值**时，`Promise` 的 `resolve` 方法会负责传递这个值；
2. 当 `async` 函数**抛出异常**时，`Promise` 的 `reject` 方法也会传递这个异常值。

`async` 函数中**可能会有** `await` 表达式，这会使 `async` 函数**暂停执行**，等待 `Promise`  的结果出来，然后恢复`async`函数的执行并返回解析值（`resolved`或`reject`）。

**注意**， `await` 关键字仅仅在 `async function`中有效。如果在 `async function`函数体外使用 `await` (没有在`async`中使用)，你只会得到一个语法错误（`SyntaxError`）。

> `async/await`的用途是简化使用 `promises` 异步调用的操作，并对一组 `Promises`执行某些操作。
> 正如`Promises`类似于结构化回调，`async/await`类似于组合生成器和 `promises`。

**不要将`await`和`Promise.then`混淆**

## 示例

### 通过async方法重写 promise 链

返回 `Promise的` API 将会被用于 `promise` 链，它会将函数分成若干部分。例如下面代码：

```javascript
function getProcessedData(url) {
  return downloadData(url) // 返回一个 promise 对象
    .catch(e => {
      return downloadFallbackData(url)  // 返回一个 promise 对象
    })
    .then(v => {
      return processDataInWorker(v); // 返回一个 promise 对象
    });
}
```

可以通过如下所示的一个`async`函数重写：

```javascript
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);    //这里隐式
}
```

注意，在上述示例中，`return` 语句中没有 `await` 操作符，因为 `async function`的返回值将被隐式地传递给`Promise.resolve`。

# await

`await`  操作符用于等待一个`Promise` 对象。它只能在异步函数 `async function` 中使用。

## 语法

```javascript
[return_value] = await expression;
```

**表达式**
一个 `Promise` 对象或者任何要等待的值。
**返回值**
返回 `Promise` 对象的处理结果。如果等待的不是 `Promise` 对象，则返回该值本身。

## 描述

`await` 表达式会暂停当前 `async function` 的执行，等待 `Promise` 处理完成。

1. 若 `Promise` 正常处理(`fulfilled`)，其回调的`resolve`函数参数作为 `await` 表达式的值，继续执行 `async function`。
2. 若 `Promise` 处理异常(`rejected`)，`await` 表达式会把 `Promise` 的异常原因抛出。

另外，如果 `await` 操作符后的表达式的值**不是**一个 `Promise`，**则返回该值本身**。 (`await`不会包装值为`Promise`)


