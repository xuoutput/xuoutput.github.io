---
title: chrome的console功能
date: 2018-02-06 18:35:57
tags:
- chrome
- console
categories:
- 前端
comments: false
permalink:
---

# chrome的console功能

Console的9种用法，
1 显示信息的命令

```javascript
        console.log('hello');
        console.info('信息');
        console.error('错误');
        console.warn('警告');
```

2 占位符(格式输出)
console上述的集中度支持printf的占位符格式，支持的占位符有：字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）

```
console.log("%d年%d月%d日",2018,2,2);
```

3 信息分组(嵌套)


group是嵌套，groupEnd是结束一层嵌套

```javascript
    console.group("第一组信息");    　　　　
    console.log("第一组第一条");
    console.log("第一组第二条");
    console.groupEnd();
    console.group("第二组信息");
    console.log("第二组第一条");
    console.log("第二组第二条");
    console.groupEnd();
```

4 查看对象信息

console.dir(obj)可以显示一个对象所有的属性和方法。

```javascript
var obj = {
    name: 'Bob',
    age: 30,
    message: "hello world"
};
console.dir(obj);
```

5 显示某个节点的内容

console.dirxml(id)用来显示网页的某个节点（node）所包含的html/xml代码。

6 判断变量是否是真
console.assert(expression, object[, object...])

接收至少两个参数，第一个参数的值或返回值为false的时候，将会在控制台上输出后续参数的值。例如：
用来判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常。

```javascript
console.assert(1 == 1, object); // 无输出，返回 undefined
console.assert(1 == 2, object); // 输出 object
```

7 追踪函数的调用轨迹
console.trace()用来追踪函数的调用过程。在大型项目尤其是框架开发中，函数的调用轨迹可以十分复杂，console.trace()方法可以将函数的被调用过程清楚地输出到控制台上。

```javascript
function tracer(a) {
  console.trace();
  return a;
}

function foo(a) {
  return bar(a);
}

function bar(a) {
  return tracer(a);
}

var a = foo('tracer');
```

8 计时功能
计时器，可以将成对的console.time()和console.timeEnd()之间代码的运行时间输出到控制台上，name参数可作为标签名。

```javascript
console.time('计时器');
for (var i = 0; i < 1000; i++) {
  for (var j = 0; j < 1000; j++) {}
}
console.timeEnd('计时器');
```

9 console.profile()的性能分析
性能分析（Profiler）就是分析程序各个部分的运行时间，找出瓶颈所在，使用的方法是console.profile()

这是个挺高大上的东西，可用于性能分析。在 JS 开发中，我们常常要评估段代码或是某个函数的性能。在函数中手动打印时间固然可以，但显得不够灵活而且有误差。借助控制台以及console.profile()方法我们可以很方便地监控运行性能。

例如下面这段代码：

```javascrit
function parent() {
  for (var i = 0; i < 10000; i++) {
    childA()
  }
}

function childA(j) {
  for (var i = 0; i < j; i++) {}
}

console.profile('性能分析');
parent();
console.profileEnd();
```


10 输出执行到该行的次数

console.count([label])

输出执行到该行的次数，可选参数 label 可以输出在次数之前，例如：

```javascript
(function() {
  for (var i = 0; i < 5; i++) {
    console.count('count');
  }
})();
// count: 1
// count: 2
// count: 3
// count: 4
// count: 5
```

11 可将传入的对象或数组以表格形式输出
console.table()

可将传入的对象，或数组以表格形式输出，相比传统树形输出，这种输出方案更适合内部元素排列整齐的对象或数组，不然可能会出现很多的 undefined。

```javascript
var obj = {
  foo: {
    name: 'foo',
    age: '33'
  },
  bar: {
    name: 'bar',
    age: '45'
  }
};

var arr = [
  ['foo', '33'],
  ['bar', '45']
];

console.table(obj);
console.table(arr);
```

[你真的了解 console 吗](https://segmentfault.com/a/1190000000481884)