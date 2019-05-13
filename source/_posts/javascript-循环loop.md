---
title: javascript-循环loop
date: 2019-05-13 10:05:20
tags:
- 循环
- loop
categories:
- javascript教程
comments: false
permalink:
---

# javascript-循环 loop

JavaScript 提供了许多迭代循环的方法。本节通过一个小例子和主要属性解释现代 JavaScript 中的所有各种循环方法。

- while, do...whild
- for
- forEach  不能 跳出
- for...in has​OwnProperty() key名
- for...of value值

## for

JavaScript 代码:

```javascript
const list = ['a', 'b', 'c'];
for (let i = 0; i < list.length; i++) {
  console.log(list[i]); //value
  console.log(i); //index
}
```

您可以使用 `break` 中断 `for` 循环
您可以使用 `continue` 快速进入到 `for` 循环的下一次迭代

## forEach

在 ES5 中引入。给定一个数组，您可以使用 `list.forEach()` 迭代其属性：

JavaScript 代码:

```javascript
const list = ['a', 'b', 'c'];
list.forEach((item, index) => {
  console.log(item); //value
  console.log(index); //index
});
//index is optional
list.forEach((item) => console.log(item));
```

不幸的是，你无法中断 `forEach` 循环。

## do…while

JavaScript 代码:

```javascript
const list = ['a', 'b', 'c'];
let i = 0;
do {
  console.log(list[i]); //value
  console.log(i); //index
  i = i + 1;
} while (i < list.length);
```

可以通过 `break` 中断 `do...while` 循环：

JavaScript 代码:

```javascript
do {
  if (something) break;
} while (true);
```

你可以使用 `continue` 跳转到下一个迭代：

JavaScript 代码:

```javascript
do {
  if (something) continue;
  //do something else
} while (true);
```

## while

JavaScript 代码:

```javascript
const list = ['a', 'b', 'c'];
let i = 0;
while (i < list.length) {
  console.log(list[i]); //value
  console.log(i); //index
  i = i + 1;
}
```

您可以使用 `break` 中断 `while` 循环：

JavaScript 代码:

```javascript
while (true) {
  if (something) break;
}
```

你可以使用 `continue` 跳转到下一个迭代：

JavaScript 代码:

```javascript
while (true) {
  if (something) continue;
  //do something else
}
```

`while` 与 `do...while` 的区别在于 `do...while` **至少执行一次循环**。

## for…in

迭代对象所有可枚举属性。 会遍历原型链的, 结合 [Object​.prototype​.has​OwnProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

JavaScript 代码:

```javascript
for (let property in object) {
  console.log(property); //property name
  console.log(object[property]); //property value
}
```

## for…of

ES2015 中引入了 `for...of` 循环，它结合了 `forEach` 的简洁性，并且`for...of` 循环具有可以中断循环特性：

JavaScript 代码:

```javascript
// 迭代值
for (const value of ['a', 'b', 'c']) {
  console.log(value); //value
}
//使用 `entries()`,获取索引
for (const [index, value] of ['a', 'b', 'c'].entries()) {
  console.log(index); //index
  console.log(value); //value
}
```

注意使用 `const` 。这个循环在每次迭代都创建了一个**新的作用域**，所以我们可以安全的使用它替代 `let` 。

## for…in vs for…of

和 `for...in` 不同的是：

- `for...in` 迭代**属性名** key
- `for...of` 迭代**属性值** value

## 参考

[JavaScript 中的循环（Loops） – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10205)
