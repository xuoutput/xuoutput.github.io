---
title: javascript-数组
date: 2019-05-12 23:40:35
tags:
- 数组
- Array
categories:
- javascript教程
comments: false
permalink:
---

# javascript-数组

随着时间的推移，JavaScript 数组有了越来越多的功能，有时候想知道何时应该使用何种方法是个很棘手的问题。本节旨在解释您应该在什么场景下使用什么方法，截至 2018 年。

## 初始化数组

JavaScript 代码:

```javascript
const a = [];
const a = [1, 2, 3];
const a = Array.of(1, 2, 3);
const a = Array(6).fill(1); // 初始化一个包含6项元素的数组，每项使用 1 填充，即：[1, 1, 1, 1, 1, 1]
```

[Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

`Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

`Array.of()` 和 Array 构造函数之间的区别在于处理整数参数：`Array.of(7)` 创建一个具有**单个元素** `7` 的数组，而 `Array(7)` 创建一个**长度为 7**的空数组（注意：这是指一个有 7 个空位(`empty`)的数组，而不是由 7 个 `undefined` 组成的数组）。

```javascript
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]   空位而不是 undefined
Array(1, 2, 3); // [1, 2, 3]
```

> [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 方法从一个**类似数组或可迭代对象**中创建一个新的数组实例。

```javascript
Array.from('foo'); // ["f", "o", "o"]
Array.of('foo'); // ['foo']
```

不要使用旧语法（只是将它用于类型化数组）

JavaScript 代码:

```javascript
const a = new Array(); //never use
const a = new Array(1, 2, 3); //never use
```

## 获取数组长度

JavaScript 代码:

```javascript
const l = a.length;
```

## 使用 every 迭代数组

`every()` 方法测试数组的**所有元素**是否都通过了指定函数的测试。

JavaScript 代码:

```javascript
a.every(f);
```

迭代 `a` 直到 `f()` 返回 `false`。

## 使用 some 迭代数组

some() 方法测试数组中的**某些元素**是否通过由指定函数的真值测试。

JavaScript 代码:

```javascript
a.some(f);
```

迭代 `a` 直到 `f()` 返回 `true`。

## 遍历数组并返回函数结果组成的新数组 map

JavaScript 代码:

```javascript
const b = a.map(f);
```

遍历 `a`，返回每一个 `a` 元素执行 `f()` 产生的结果数组。

## 过滤数组 filter

JavaScript 代码:

```javascript
const b = a.filter(f);
```

遍历 `a`，返回每一个 `a` 元素执行 `f()` 都为 `true` 的新数组。

## Reduce

JavaScript 代码:

```javascript
a.reduce((accumulator, currentValue, currentIndex, array) => {
  //...
}, initialValue);
```

`reduce()` 对数组中每一项都调用回调函数，并逐步计算计算结果。如果 `initaiValue` 存在，`accumulator` 在第一次迭代时等于这个值。

示例：

JavaScript 代码:

```javascript
[1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator * currentValue;
}, 1);

// iteration 1: 1 * 1 => return 1
// iteration 2: 1 * 2 => return 2
// iteration 3: 2 * 3 => return 6
// iteration 4: 6 * 4 => return 24

// return value is 24
```

## forEach

ES6 新增。

JavaScript 代码:

```javascript
a.forEach(f);
```

遍历 `a` 执行 `f`，**中途不能停止**。 `return` `break` `continue` 都不行

示例：

JavaScript 代码:

```javascript
a.forEach((v) => {
  console.log(v);
});
```

## for..of

ES6 新增。

JavaScript 代码:

```javascript
for (let v of a) {
  console.log(v);
}
```

## for

JavaScript 代码:

```javascript
for (let i = 0; i < a.length; i += 1) {
  //a[i]
}
```

遍历 `a`，可以通过 `return` 或者 `break` 中止循环，通过 `continue` 跳出循环。

## @@iterator

ES6 新增。

获取数组迭代器的值：

JavaScript 代码:

```javascript
const a = [1, 2, 3];
let it = a[Symbol.iterator]();

console.log(it.next().value); //1
console.log(it.next().value); //2
console.log(it.next().value); //3
```

`.entries()` 返回一个**键值对**的迭代器：

JavaScript 代码:

```javascript
let it = a.entries();

console.log(it.next().value); //[0, 1]
console.log(it.next().value); //[1, 2]
console.log(it.next().value); //[2, 3]
```

`.keys()` 返回**包含所有键名**的迭代器：

JavaScript 代码:

```javascript
let it = a.keys();
console.log(it.next().value); //0
console.log(it.next().value); //1
console.log(it.next().value); //2
```

数组结束时 `.next()` 返回 `undefined`。你可以通过 `it.next()` 返回的 `value`, `done` 值检测迭代是否结束。当迭代到最后一个元素时 `done` 的值始终为 `true` 。

## 在数组末尾追加值

JavaScript 代码:

```javascript
a.push(4);
```

## 在数组开头添加值

JavaScript 代码:

```javascript
a.unshift(0);
a.unshift(-2, -1);
```

## 移除数组中的值

### 删除末尾的值

JavaScript 代码:

```javascript
a.pop();
```

### 删除开头的值

JavaScript 代码:

```javascript
a.shift();
```

### 删除任意位置的值

JavaScript 代码:

```javascript
a.splice(0, 2); // 删除前2项元素
a.splice(3, 2); // 删除从索引 3 开始的 2 个元素
```

不要使用 `remove()` ，因为它会留下未定义的值。

## 移除并插入值

JavaScript 代码:

```javascript
a.splice(2, 3, 2, 'a', 'b');
// 删除从索引 2 开始的 3 个元素,
// 并且从索引 2 开始添加 2 元素（'a', 'b'）
```

## 合并多个数组

JavaScript 代码:

```javascript
const a = [1, 2];
const b = [3, 4];
a.concat(b); // 1, 2, 3, 4
```

## 查找数组中特定元素

ES5 写法：
JavaScript 代码:

```javascript
a.indexOf();
```

返回匹配到的**第一个元素的索引**，元素不存在返回 `-1`。

JavaScript 代码:

```javascript
a.lastIndexOf();
```

返回匹配到的最后一个元素的索引，元素不存在返回 `-1`。

ES6 写法：
JavaScript 代码:

```javascript
a.find((element, index, array) => {
  //return true or false
});
```

返回符合条件的**第一个元素**，如果不存在返回 `undefined`。

通常这么用：

JavaScript 代码:

```javascript
a.find((x) => x.id === my_id);
```

上面的例子会返回数组中 `id === my_id` 的第一个元素。

`findIndex` 返回符合条件的第一个元素的索引，如果不存在返回 `undefined`：

JavaScript 代码:

```javascript
a.findIndex((element, index, array) => {
  //return true or false
});
```

ES7 写法：
JavaScript 代码:

```javascript
a.includes(value);
```

如果 `a` 包含 `value` 返回 `true`。

JavaScript 代码:

```javascript
a.includes(value, i);
```

如果 `a` 从位置 `i` 后包含 `value` 返回 `true`。

## 数组排序

按字母顺序排序（按照 ASCII 值 – `0-9A-Za-z`）：

JavaScript 代码:

```javascript
const a = [1, 2, 3, 10, 11];
a.sort(); //1, 10, 11, 2, 3

const b = [1, 'a', 'Z', 3, 2, 11];
b = a.sort(); //1, 11, 2, 3, Z, a
```

自定义排序

JavaScript 代码:

```javascript
const a = [1, 10, 3, 2, 11];
a.sort((a, b) => a - b); //1, 2, 3, 10, 11
```

逆序

JavaScript 代码:

```javascript
a.reverse();
```

## 数组转字符串

JavaScript 代码:

```javascript
a.toString();
```

返回字符串类型的值

JavaScript 代码:

```javascript
a.join();
```

返回数组元素拼接的字符串。传递参数以自定义分隔符：

JavaScript 代码:

```javascript
a.join(',');
```

## 复制所有值

JavaScript 代码:

```javascript
const b = Array.from(a);
const b = Array.of(...a);
```

## 复制部分值

JavaScript 代码:

```javascript
const b = Array.from(a, (x) => x % 2 == 0);
```

## 将值复制到本身其它位置

[Array​.prototype​.copy​Within()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

JavaScript 代码:

```javascript
const a = [1, 2, 3, 4];
a.copyWithin(0, 2); // [3, 4, 3, 4]
const b = [1, 2, 3, 4, 5];
b.copyWithin(0, 2); // [3, 4, 5, 4, 5]
// 0 是拷贝的值插到哪里
// 2 从哪里开始拷贝
const c = [1, 2, 3, 4, 5];
c.copyWithin(0, 2, 4); // [3, 4, 3, 4, 5]
//4 是结束索引
```

拷贝几个元素，就从插入位置开始替换几个元素。

## 参考

[JavaScript 数组（Arrays），一份权威的备忘清单 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10186)
