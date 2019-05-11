---
title: javascript-原型继承
date: 2019-05-10 16:39:30
tags:
- 原型继承
categories:
- JavaScript完全手册(2018版)
comments: false
permalink:
---

# javascript-原型继承

`JavaScript` 在流行的编程语言中非常独特，因为它使用了**原型继承**。 让我们找出这意味着什么。

虽然大多数面向对象的语言使用**基于类的继承**模型，但 `JavaScript` **基于原型继承**模型。

这是什么意思呢？

每个 `JavaScript` 对象都有一个名为 `prototype` 的属性，它指向不同的对象。

这个不同的对象就是 **对象原型** 。

我们的对象**使用该对象原型来继承属性和方法**。

假设您使用**对象字面量语法**创建了一个对象：

JavaScript 代码:

```javascript
const car = {};
```

JavaScript 代码:

```javascript
const car = new Object();
```

在任何情况下，`car` 的 `prototype`(原型) 是 `Object` ：

如果初始化一个数组，数组其实也是一个对象：

JavaScript 代码:

```javascript
const list = [];
//or
const list = new Array();
```

这里 `list` 的 `prototype`(原型) 是 `Array` ：

您可以通过检查 `__proto__` getter 来验证这一点：

JavaScript 代码:

```javascript
car.__proto__ === Object.prototype; //true
car.__proto__ === new Object().__proto__; //true
list.__proto__ === Object.prototype; //false
list.__proto__ === Array.prototype; //true
list.__proto__ === new Array().__proto__; //true
```

我在这里使用 `__proto__` 属性，这是历史遗留的非标准的语法，但在现代浏览器中广泛实现。**获得原型的更可靠方法**是使用 `Object.getPrototypeOf(new Object())`；例如：

JavaScript 代码:

```javascript
const car = {};
const list = [];

console.log(Object.getPrototypeOf(car));
console.log(Object.getPrototypeOf(list));
```

我们可以在控制台中看到，他们的 `constructor` 属性分别是 `Object()` 和 `Array()`;

![getPrototypeOf.png](getPrototypeOf.png)

**原型中的所有属性和方法**对于拥有原型的对象都是可用的：

![list.png](list.png)

`Object.prototype` **是所有对象的基本原型**：

JavaScript 代码:

```javascript
Array.prototype.__proto__ == Object.prototype; //true
```

如果你想知道 `Object.prototype` 的原型是什么，**那就没有原型**。 这是一种特殊的，独一无二的的对象。(❄️)

您看到的上面的示例是**工作中的原型链的示例**。

我可以**创建一个对象来扩展 `Array` 的对象**，和任何我用它实例化的对象，在其原型链中将包含 `Array` 和 `Object`，并从所有祖先继承属性和方法。

除了使用 `new` 运算符创建对象，或使用对象和数组的**字面量语法**之外，还可以使用 `Object.create()` 实例化对象。

> 3 种方式实例化对象

传递的第一个参数是用作原型的对象：

JavaScript 代码:

```javascript
const car = Object.create({});
const list = Object.create(Array);
```

您可以使用 `isPrototypeOf()` 方法**检查对象的原型**：

JavaScript 代码:

```javascript
Array.isPrototypeOf(list); //true
Object.isPrototypeOf(list); //false
```

请注意，因为您可以使用以下方式实例化一个数组

JavaScript 代码:

```javascript
const list = Object.create(Array.prototype);
```

在这种情况下，`Array.isPrototypeOf(list)` 为 `false`，而 `Array.prototype.isPrototypeOf(list)` 为 `true` 。

关于 JavaScript prototype(原型) 的相关知识，可以查看 [JavaScript Prototype(原型) 新手指南](https://www.html.cn/archives/10022) 详细了解。

> 6 步 从一个对象, 到封装成函数, 用`Object.create()`, `prototype`, `new`, `class`

再看 `Object.create()`这个是原型继承, 也可不用, 自己 `=`, 注意`constructor`自己设置

然后是`Object.create()`的原理呗, 不支持的浏览器用代替的, 一起记了. 和 `new` 区别

```javascript
  if (Object.create) {
    return Object.create(obj);
  } else {
    // 创建构造函数 Fun
    function Fun() {}
    Fun.prototype = obj;
    return new Fun();
  }
```

## 看完再看 补充

{% post_link javascript原型 javascript原型 %}

> 看完了class的是原型的糖, 那么可以知道 `extends` 也是原型糖, 即`son.prototype = new F()` 子的原型指向父的一个实例

## 参考

[原型继承 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10030)
