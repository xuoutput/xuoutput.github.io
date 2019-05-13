---
title: javascript-this
date: 2019-05-13 20:16:15
tags:
- this
categories:
- javascript教程
comments: false
permalink:
---

# javascript-this

`this` 值根据**使用位置的不同具有不同的值**。不了解 `JavaScript` 这个小细节会导致很多头痛的问题，所以花 5 分钟学习所有技巧是值得的。

## 严格模式(strict mode) 中的 this

严格模式下，**在任何对象之外**的 `this` 始终是 `undefined` （未定义的）。

注意我提到了严格模式。 如果禁用严格模式（如果没有在**文件顶部**明确添加 `'use strict'`，则默认为禁用），即草率模式（sloppy mode），也有人称为非严格模式，在这种模式下 ， 如果在本文下面某有提及的这些情况下，`this` **都指向全局对象**。

浏览器的全局对象为 `window` 。

## 方法中的 this

**方法是附加到对象属性的函数**。

你可以看到各种形式。

这是其中一种形式：

JavaScript 代码:

```JavaScript
const car = {
  maker: 'Ford',
  model: 'Fiesta',

  drive() {
    console.log(`Driving a ${this.maker} ${this.model} car!`)
  }
}

car.drive()
//Driving a Ford Fiesta car!
```

在这种情况下，使用常规函数，`this` **会自动绑定到对象**。

注意：上面的方法声明是 `drive: function（）{ …` 的简写形式，ES6 语法，等价于：

JavaScript 代码:

```JavaScript
const car = {
  maker: 'Ford',
  model: 'Fiesta',

  drive: function() {
    console.log(`Driving a ${this.maker} ${this.model} car!`)
  }
}
```

在这个例子中同样有效：

JavaScript 代码:

```JavaScript
const car = {
  maker: 'Ford',
  model: 'Fiesta'
}

car.drive = function() {
  console.log(`Driving a ${this.maker} ${this.model} car!`)
}

car.drive()
//Driving a Ford Fiesta car!
```

**箭头函数不能**以相同的方式工作，因为它是词法绑定的：

JavaScript 代码:

```javascript
const car = {
  maker: 'Ford',
  model: 'Fiesta',

  drive: () => {
    console.log(`Driving a ${this.maker} ${this.model} car!`);
  }
};

car.drive();
//Driving a undefined undefined car!
```

## 绑定箭头函数

你不能像使用普通函数那样将值绑定到箭头函数。

由于他们的工作方式不同。箭头函数中 `this` 是词法（lexically）绑定，这意味着 `this` 的值来自定义它们的上下文。

了解更多详情请阅读：[JavaScript 箭头函数（Arrow Function）](https://www.html.cn/archives/10176)

## 显式传递要用作 this 的对象

JavaScript 提供了一些方法来将 `this` 映射到你想要的任何对象上。

在 **函数声明** 阶段使用 `bind()` ：

JavaScript 代码:

```JavaScript
const car = {
  maker: 'Ford',
  model: 'Fiesta'
}

const drive = function() {
  console.log(`Driving a ${this.maker} ${this.model} car!`)
}.bind(car)

drive()
//Driving a Ford Fiesta car!
```

你还可以绑定现有的对象方法来重新映射 `this` 值：

JavaScript 代码:

```JavaScript
const car = {
  maker: 'Ford',
  model: 'Fiesta',

  drive() {
    console.log(`Driving a ${this.maker} ${this.model} car!`)
  }
}

const anotherCar = {
  maker: 'Audi',
  model: 'A4'
}

car.drive.bind(anotherCar)()
//Driving a Audi A4 car!
```

在 **函数调用** 阶段使用 `call()` 或 `apply()` ：

JavaScript 代码:

```JavaScript
const car = {
  maker: 'Ford',
  model: 'Fiesta'
}

const drive = function(kmh) {
  console.log(`Driving a ${this.maker} ${this.model} car at ${kmh} km/h!`)
}

drive.call(car, 100)
//Driving a Ford Fiesta car at 100 km/h!

drive.apply(car, [100])
//Driving a Ford Fiesta car at 100 km/h!
```

传入 `call()` 或者 `apply()` 的第一个参数始终绑定 `this` 。`call()` 和 `apply()` 之间的区别在于， `apply()` 需要一个数组作为**参数列表**，而 `call()` 者可以接受多个参数。

> apply array

## 浏览器事件处理程序的特例

在事件处理程序回调中，`this` 指向接收事件的 `DOM` 元素：

JavaScript 代码:

```JavaScript
document.querySelector('#button').addEventListener('click', function(e) {
  console.log(this) //HTMLElement
}
```

你可以这样绑定：

JavaScript 代码:

```JavaScript
document.querySelector('#button').addEventListener(
  'click',
  function(e) {
    console.log(this) //这里的 this 指向全局的 Window 对象, 或者你的上下文
  }.bind(this)
)
```

## 参考

[JavaScript 中的 this – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10260)
