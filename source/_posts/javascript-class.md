---
title: javascript-class
date: 2019-05-11 10:29:31
tags:
- class
categories:
- JavaScript完全手册(2018版)
comments: false
permalink:
---

# javascript-class

2015 年，ECMAScript 6（ES6）标准引入了 Classes(类) 。

在此之前，`JavaScript` **只有一种非常独特的方式来实现继承**。 它的**原型继承**虽然在我看来很棒，但与其他流行的编程语言不同。

**来自 Java 或 Python 或其他语言的人很难理解原型继承的复杂性**，因此 ECMAScript 委员会决定在它们之上引入一个**语法糖**，类似于基于类的继承在其他流行的实现中工作。

这很重要：引擎下的 JavaScript 实现仍然相同，您可以平常的方式继续访问对象原型。

## 定义一个 class(类)

这是一个班级的 class(类) 。

JavaScript 代码:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  hello() {
    return 'Hello, I am ' + this.name + '.';
  }
}
```

**一个类有一个标识符**，我们可以使用它来使用 `new ClassIdentifier()` 创建对象实例。上述例子中你可以使用 `new Person('')` 来创建。

初始化对象时，将调用 `constructor`(构造函数) 方法，并传递一些参数。

一个类也有它需要的方法。 上述例子中，`hello` 是一个方法，可以在从该类派生的所有实例上调用：

JavaScript 代码:

```javascript
const flavio = new Person('Flavio');
flavio.hello();
```

## 类的继承

类可以扩展另一个类，使用该类初始化的实例对象继承这两个类的所有方法。

如果继承的类具有与上层次结构中较高的类之一具有相同名称的方法，则最接近的方法优先：

JavaScript 代码:

```javascript
class Programmer extends Person {
  hello() {
    return super.hello() + ' I am a programmer.';
  }
}
const flavio = new Programmer('Flavio');
flavio.hello();
```

上面的程序打印出 `“Hello, I am Flavio. I am a programmer.”`

类没有显式的类变量声明，但必须初始化构造函数中所有的变量。

在类中，您可以调用 `super()` 来引用父类。

> 看完了 class 的是原型的糖, 那么可以知道 `extends` 也是原型糖, 即`son.prototype = new F()` 子的原型指向父的一个实例
> `super`指代了整个`prototype`或者`__proto__`指向的对象, 用`extends`时别忘`super`

**继承还是组合, 更多喜欢用[组合](https://www.html.cn/archives/7106)的方式**.

## 静态方法

**通常**，方法是在实例上执行的，而不是在类上执行的。

静态方法在**类上执行**：

JavaScript 代码:

```javascript
class Person {
  static genericHello() {
    return 'Hello';
  }
}
Person.genericHello(); //Hello
```

> 也就是在构造函数上加方法

**注意, 如果用 ES5 `Object.create`的方式来创建, 是不能继承静态方法的, 而用`extends`可以继承**

> `Object.create` 可以创建一个**普通对象**，但不能创建一个**函数对象**
> 就是函数`Function`和对象`Object`的区别

[理解 JavaScript 函数（函数和对象的区别和联系）](https://www.cnblogs.com/jikey/archive/2010/04/28/1722971.html)

JavaScript 代码:

```javascript
// ES5
function B() {}
B.f = function() {};

function D() {}
D.prototype = Object.create(B.prototype);

D.f(); // error
```

JavaScript 代码:

```javascript
// ES6
class B {
  static f() {}
}

class D extends B {}

D.f(); // ok
```

[面向对象的 JavaScript – 深入了解 ES6 类](https://www.html.cn/archives/7383)

## 私有方法

JavaScript 目前**没有内置的方法来定义私有或受保护的方法**。目前有很多 hack 方式解决，但我不会在这里描述它们。

值得注意的是 TC39 最近在 GitHub 上通过了一条 `EMCAScript` 语法特性的**草案**，即**类私有属性修饰符** `#`，不过，该特性之前在社区的调研中遭遇了**大量反对**。例如：

JavaScript 代码:

```javascript
class Shape {
  #height;
  #width;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get area() {
    return this.#width * this.#height;
  }
}

const square = new Shape(10, 10);
console.log(square.area);             // 100
console.log(square instanceof Shape); // true
console.log(square.#width);           // 错误：私有属性只能在类中访问
```

确实有点丑陋！本人更喜欢 `TypeScript` 的方式:

JavaScript 代码:

```javascript
class Shape {
  private width;
  private height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}
const square = new Shape(10, 10)
console.log(square.area); // 100
```

> 还有用公约 `_`前缀的 , 用特权方法的(在构造函数中写闭包), 用`Symbol`的, `WeekMap`

[public private 和 protected](https://ts.xcatliu.com/advanced/class#public-private-he-protected)

## getter 和 setter

您可以添加以 `get` 或 `set` **为前缀**的方法来创建 `getter` 和 `setter`，这两个代码是根据您正在执行的操作执行的：访问变量或修改其值。

JavaScript 代码:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  set name(value) {
    this.name = value;
  }
  get name() {
    return this.name;
  }
}
```

如果您只有一个 `getter`，则无法设置该属性，并且将忽略任何尝试这样做：

JavaScript 代码:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this.name;
  }
}
```

如果您只有一个 `setter` ，则可以更改该值，但不能从外部访问它：

JavaScript 代码:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  set name(value) {
    this.name = value;
  }
}
```

关于 Classes（类）的更多详细信息可以查看 [面向对象的 JavaScript – 深入了解 ES6 类](https://www.html.cn/archives/7383)

## 参考

[如何使用 JavaScript 中的 Classes（类）](https://www.html.cn/archives/10053)
[浅谈 ES6 中 super 关键字](https://www.cnblogs.com/liutie1030/p/5997446.html)
[面向对象的 JavaScript – 深入了解 ES6 类](https://www.html.cn/archives/7383)
