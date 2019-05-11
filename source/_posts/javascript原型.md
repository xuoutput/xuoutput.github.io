---
title: javascript原型
date: 2018-12-06 08:54:01
tags:
- javascript
- prototype
categories:
- javascript教程
comments: false
permalink:
---

# javascript 原型, [一文让你理解什么是 JS 原型](https://segmentfault.com/a/1190000017207055)

## 先看

{% post_link javascript-原型继承 javascript-原型继承 %}
[JavaScript Prototype(原型) 新手指南](https://www.html.cn/archives/10022)

**对象创建有 2 种方式, 这里只看通过 new+构造函数的方式**.

如果是通过字面量`{}`创建的,那么原型就是`Object.prototype`

> 对象字面量不过是`new`的语法糖, 可以看他们的 `prototype`

## 原型链图

先把这张图过一遍
![prototype.png](prototype.png)

> `typeof Object` 是`"function"`. 也称这样的对象为构造器（`constructor`)
> 因而，**所有的构造器都是对象，但不是所有的对象都是构造器**。
> `let n = new Function()` 出来的是一个匿名函数诶.

```javascript
// 这里看图可以得出
console.log(typeof(Function))         'function'
console.log(typeof(new Function()))   'function'  // 匿名函数, 不是对象
console.log(typeof(Object))           'function'
console.log(typeof(Array))            'function'  // 这个可以补上图
// 这里就是返回对象了
console.log(typeof(new Array()))      'object'
console.log(typeof(new Date()))       'object'
console.log(typeof(new Object()))     'object'
```

> [理解 JavaScript 函数（函数和对象的区别和联系）](https://www.cnblogs.com/jikey/archive/2010/04/28/1722971.html)

**方法也是函数, 可以递归上去**:

```javascript
Function.prototype.method1 = function() {
  console.log('function');
};
function func1(a, b, c) {
  return a + b + c;
}
func1.method1();
func1.method1.method1();
```

[JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)
上图说原型链是`__proto__`这条路

## 1. 原型

### 1.1 传统构造函数的问题

通过自定义构造函数的方式，创建小狗对象：

```javascript
function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.say = function() {
    console.log('汪汪汪');
  };
}
var dog1 = new Dog('哈士奇', 1.5);
var dog2 = new Dog('大黄狗', 0.5);

console.log(dog1);
console.log(dog2);

console.log(dog1.say == dog2.say); //输出结果为false
```

画个图理解下：
![dog1.jpeg](dog1.jpeg)

每次创建一个对象的时候，都会**开辟一个新的空间**，我们从上图可以看出，每只创建的小狗有一个`say`方法，**这个方法都是独立的，但是功能完全相同**。随着创建小狗的数量增多，造成内存的浪费就更多，这就是我们需要解决的问题。

为了**避免内存的浪费**，我们想要的其实是下图的效果：
![dog2.jpeg](dog2.jpeg)

**解决方法**：
这里最好的办法就是将函数体放在构造函数之外，在构造函数中只需要引用该函数即可。

```javascript
function sayFn() {
  console.log('汪汪汪');
}

function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.say = sayFn();
}
var dog1 = new Dog('哈士奇', 1.5);
var dog2 = new Dog('大黄狗', 0.5);

console.log(dog1);
console.log(dog2);

console.log(dog1.say == dog2.say); //输出结果为true
```

**这样写依然存在问题**：

- 全局变量增多，会增加引入框架命名冲突的风险
- 代码结构混乱，会变得难以维护

想要解决上面的问题就需要用到`构造函数的原型`概念。

> 构造函数[JavaScript Prototype(原型) 新手指南](https://www.html.cn/archives/10022) 中说到, `new`相当于注释了

```javascript
function Animal(name, energy) {
  let animal = Object.create(Animal.prototype);
  animal.name = name;
  animal.energy = energy;

  return animal;
}
```

`new` 有一个很酷的地方——当您使用 `new` 关键字调用函数时，**注释掉的这两行代码是隐式(引擎)完成的**，创建的对象称为 `this`。

使用注释来显示在幕后发生的事情并假设使用 `new` 关键字调用 `Animal` 构造函数，可以将其重写为这样：

```javascript
function Animal(name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name;
  this.energy = energy;

  // return this
}

const leo = new Animal('Leo', 7);
const snoop = new Animal('Snoop', 10);
```

同样，这样做以及为我们创建 `this` 对象的原因是，我们使用 `new` 关键字调用构造函数。如果在调用函数时不使用 `new` ，则该对象永远不会创建，也不会隐式返回。我们可以在下面的例子中看到这个问题。

```javascript
function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

const leo = Animal('Leo', 7);
console.log(leo); // undefined
```

此模式的名称是 Pseudoclassical Instantiation(伪类实例化) 。

### 1.2 原型的概念

`prototype`：原型。每个构造函数在创建出来的时候系统会**自动给这个构造函数创建并且关联一个空的对象**。这个`空的对象`，就叫做`原型`。

**关键点**：

- 每一个由构造函数创建出来的`对象`，都会默认的和构造函数的原型关联；
- 当使用一个方法进行属性或者方法访问的时候，会先在当前对象内查找该属性和方法，如果当前对象内未找到，就会去跟它关联的原型对象内进行查找；
- 也就是说，在原型中定义的方法跟属性，会被这个构造函数创建出来的对象所`共享`；
- `访问原型`的方式：`构造函数名.prototype`。

示例图：
![p.png](p.png)

**示例代码**： 给构造函数的原型添加方法

```javascript
function Dog(name, age) {
  this.name = name;
  this.age = age;
}

// 给构造函数的原型 添加say方法
Dog.prototype.say = function() {
  console.log('汪汪汪');
};

var dog1 = new Dog('哈士奇', 1.5);
var dog2 = new Dog('大黄狗', 0.5);

dog1.say(); // 汪汪汪
dog2.say(); // 汪汪汪
```

我们可以看到，本身`Dog`这个构造函数中是**没有**`say`这个方法的，我们通过`Dog.prototype.say`的方式，在构造函数`Dog`的**原型中**创建了一个方法，实例化出来的`dog1`、`dog2`会先在自己的对象先找`say`方法，找不到的时候，会去他们的`原型对象`中查找。

**如图所示**:
![p2.png](p2.png)

> 在构造函数的原型中可以存放**所有对象共享的数据**，这样可以避免多次创建对象浪费内存空间的问题。

### 1.3 原型的使用

1、使用对象的动态特性: 就是直接使用`prototype`为原型添加属性或者方法。

```javascript
function Person() {}

Person.prototype.say = function() {
  console.log('讲了一句话');
};

Person.prototype.age = 18;

var p = new Person();
p.say(); // 讲了一句话
console.log(p.age); // 18
```

2、直接替换原型对象, (空对象)

> 每次构造函数创建出来的时候，都会关联一个**空对象**，我们可以用一个对象替换掉这个**空对象**。

```javascript
function Person() {}

Person.prototype = {
  say: function() {
    console.log('讲了一句话');
  }
};

var p = new Person();
p.say(); // 讲了一句话
```

**注意**: 使用原型的时候，有`4个`注意点需要注意一下，我们通过几个案例来了解一下。

1 使用`对象.属性名`去**获取**对象属性的时候，会**先在自身**中进行查找，如果没有，**再去原型**中查找；(**所以只要查询才能体会到原型链的存在**, 后面的设置属性是和原型链无关的)

```javascript
// 创建一个英雄的构造函数 它有自己的 name 和 age 属性
function Hero() {
  this.name = '德玛西亚之力';
  this.age = 18;
}
// 给这个构造函数的原型对象添加方法和属性
Hero.prototype.age = 30;
Hero.prototype.say = function() {
  console.log('人在塔在！！！');
};

var h1 = new Hero();
h1.say(); // 先去自身中找 say 方法，没有再去原型中查找  打印：'人在塔在！！！'
console.log(p1.name); // "德玛西亚之力"
console.log(p1.age); // 18 先去自身中找 age 属性，有的话就不去原型中找了
```

2 使用`对象.属性名`去**设置**对象属性的时候，**只会在自身**进行查找，如果有，就修改，如果没有，就添加；(**注意:**这里能不能添加修改原型上有的属性, **看这个原型上的属性允不允许赋值** 比如内置构造函数的原型是只读的`Object.prototype = o` 不行的)

```javascript
// 创建一个英雄的构造函数
function Hero() {
  this.name = '德玛西亚之力';
}
// 给这个构造函数的原型对象添加方法和属性
Hero.prototype.age = 18;

var h1 = new Hero();
console.log(h1); // {name:"德玛西亚之力"}
console.log(h1.age); // 18

h1.age = 30; // 设置的时候只会在自身中操作，如果有，就修改，如果没有，就添加 不会去原型中操作
console.log(h1); // {name:"德玛西亚之力",age:30}
console.log(h1.age); // 30
```

3 一般情况下，不会将属性放在原型中，只会将**方法放在原型**中；
4 在替换原型的时候，替换之前创建的对象，和替换之后创建的对象的原型不一致！！！

```javascript
// 创建一个英雄的构造函数 它有自己的 name 属性
function Hero() {
  this.name = '德玛西亚之力';
}
// 给这个构造函数的默认原型对象添加 say 方法
Hero.prototype.say = function() {
  console.log('人在塔在！！！');
};

var h1 = new Hero();
console.log(h1); // {name:"德玛西亚之力"}
h1.say(); // '人在塔在！！！'

// 开辟一个命名空间 obj，里面有个 kill 方法
var obj = {
  kill: function() {
    console.log('大宝剑');
  }
};

// 将创建的 obj 对象替换原本的原型对象
Hero.prototype = obj;

var h2 = new Hero();

h1.say(); // '人在塔在！！！'
h2.say(); // 报错

h1.kill(); // 报错
h2.kill(); // '大宝剑'
```

图:
![p3.png](p3.png)

图中可以看出，实例出来的`h1`对象指向的原型中，只有`say()`方法，并没有`kill()`方法，所以`h1.kill()`会报错。同理，`h2.say()`也会报错。

### 1.4 `__proto__`属性 (前面图中也有显示)

私有属性和非标准属性

> 在 js 中以`_`开头的属性名为 js 的**私有属性**，以`__`开头的属性名为非标准属性。`__proto__`是一个非标准属性，最早由`firefox`提出来。

1、构造函数的 `prototype` 属性

之前我们访问构造函数原型对象的时候，使用的是`prototype`属性：

```javascript
function Person() {}
//通过构造函数的原型属性prototype可以直接访问原型
Person.prototype;
```

在之前我们是无法通过构造函数`new`出来的对象访问原型的：

```javascript
function Person() {}

var p = new Person();
//以前不能直接通过p来访问原型对象
```

2、实例对象的 `__proto__` 属性

> 其次是`__proto__` ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 `Person.prototype` 中，实际上，它是来自于 `Object.prototype` ，与其说是一个属性，不如说是一个 `getter/sette`r，当使用 `obj.__proto__` 时，可以理解成返回了 `Object.getPrototypeOf(obj)`。

`__proto__`属性最早是火狐浏览器引入的，**用以通过实例对象来访问原型**，这个属性在早期是非标准的属性，有了`__proto__`属性，就可以通过构造函数创建出来的**对象直接访问原型**。

```javascript
function Person() {}
var p = new Person();

//实例对象的__proto__属性可以方便的访问到原型对象
p.__proto__;

//既然使用构造函数的`prototype`和实例对象的`__proto__`属性都可以访问原型对象
//就有如下结论
p.__proto__ === Person.prototype;
```

**如图所示**: 也就是最开始的那张图中的从实例到原型那条
![proto.png](proto.png)

3、`__proto__`属性的用途, **调试用**

- 可以用来**访问原型**；
- 在实际开发中除非有特殊的需求，不要轻易的使用实例对象的`__proto__`属性去修改原型的属性或方法；
- 在**调试**过程中，可以轻易的查看原型的成员；
- 由于兼容性问题，不推荐使用。

  1.5 `constuctor`属性, 指向构造函数, 用构造函数的`name` (构造函数的`name`就表示构造函数的类型)

`constructor`：构造函数，原型的`constructor`属性指向的是和原型关联的构造函数。

```javascript
function Dog() {
  this.name = 'husky';
}

var d = new Dog();

// 获取构造函数
console.log(Dog.prototype.constructor); // 打印构造函数 Dog
console.log(d.__proto__.constructor); // 打印构造函数 Dog
```

**如图所示**:
![constructor.png](constructor.png)

**获取复杂类型的数据类型**:

通过`obj.constructor.name`的方式(**简写**)，获取当前对象`obj`的数据类型。

在一个的函数中，有个返回值`name`，它**表示的是当前函数的函数名**；

```javascript
function Teacher(name, age) {
  this.name = name;
  this.age = age;
}

var teacher = new Teacher();

// 假使我们只知道一个对象teacher，如何获取它的类型呢？
console.log(teacher.__proto__.constructor.name); // Teacher
console.log(teacher.constructor.name); // Teacher
```

实例化出来的`teacher`对象，它的数据类型是啥呢？我们可以通过实例对象`teacher.__proto__`，访问到它的**原型对象**，再通过`.constructor`访问它的构造函数，通过`.name`获取当前函数的**函数名**，所以就能得到当前对象的**数据类型**。又因为`.__proto__`是一个非标准的属性，而且实例出的对象继承原型对象的方法，所以直接可以写成：`obj.constructor.name`。

1.6 原型继承

**原型继承**：每一个构造函数都有`prototype`原型属性，通过构造函数创建出来的对象都继承自该原型属性。所以可以**通过更改构造函数的原型属性来实现继承**。

继承的方式有多种，可以一个对象继承另一个对象，也可以通过原型继承的方式进行继承。

**1、简单遍历继承**:

直接遍历一个对象，将所有的属性和方法加到另一对象上。

```javascript
var animal = {
  name: 'Animal',
  sex: 'male',
  age: 5,
  bark: function() {
    console.log('Animal bark');
  }
};

var dog = {};

for (var k in animal) {
  dog[k] = animal[k];
}

console.log(dog); // 打印的对象与animal一模一样
```

缺点：只能一个对象继承自另一个对象，**代码复用太低**了。

**2、混入式原型继承**:

混入式原型继承其实与上面的方法类似，只不过是将遍历的对象**添加到构造函数的原型**上。

```javascript
var obj = {
  name: 'zs',
  age: 19,
  sex: 'male'
};

function Person() {
  this.weight = 50;
}

for (var k in obj) {
  // 将obj里面的所有属性添加到 构造函数 Person 的原型中
  Person.prototype[k] = obj[k];
}

var p1 = new Person();
var p2 = new Person();
var p3 = new Person();

console.log(p1.name); // 'zs'
console.log(p2.age); // 19
console.log(p3.sex); // 'male'
```

**面向对象思想封装一个原型继承**:

我们可以利用面向对象的思想，将面向过程进行封装。

```javascript
function Dog() {
  this.type = 'yellow Dog';
}

// 给构造函数 Dog 添加一个方法 extend
Dog.prototype.extend = function(obj) {
  // 使用混入式原型继承，给 Dog 构造函数的原型继承 obj 的属性和方法
  for (var k in obj) {
    this[k] = obj[k];
  }
};

// 调用 extend 方法
Dog.prototype.extend({
  name: '二哈',
  age: '1.5',
  sex: '公',
  bark: function() {
    console.log('汪汪汪');
  }
});
```

**3、替换式原型继承**:

替换式原型继承，在上面已经举过例子了，其实**就是将一个构造函数的原型对象替换成另一个对象**。

```javascript
function Person() {
  this.weight = 50;
}

var obj = {
  name: 'zs',
  age: 19,
  sex: 'male'
};
// 将一个构造函数的原型对象替换成另一个对象
Person.prototype = obj;

var p1 = new Person();
var p2 = new Person();
var p3 = new Person();

console.log(p1.name); // 'zs'
console.log(p2.age); // 19
console.log(p3.sex); // 'male'
```

之前我们就说过，这样做会产生一个问题，就是替换的对象**会重新开辟**一个新的空间。

**替换式原型继承时的 bug**:

> 替换原型对象的方式会导致原型的`constructor`的丢失，`constructor`属性是默认原型对象指向构造函数的，就算是替换了默认原型对象，这个属性依旧是默认原型对象指向构造函数的，所以新的原型对象是没有这个属性的。

![p4.png](p4.png)

**解决方法**：**手动关联**一个`constructor`属性

```javascript
function Person() {
  this.weight = 50;
}

var obj = {
  name: 'zs',
  age: 19,
  sex: 'male'
};
// 在替换原型对象函数之前 给需要替换的对象添加一个 constructor 属性 指向原本的构造函数
obj.constructor = Person;

// 将一个构造函数的原型对象替换成另一个对象
Person.prototype = obj;

var p1 = new Person();

console.log(p1.__proto__.constructor === Person); // true
```

**4、Object.create()方法实现原型继承**:

当我们想把`对象1`作为`对象2`的原型的时候，就可以实现`对象2`继承`对象1`。前面我们了解了一个属性：`__proto__`，实例出来的对象可以通过这个属性访问到它的原型，但是这个属性**只适合开发调试时**使用，并不能直接去替换原型对象。所以这里介绍一个新的方法：`Object.create()`。

**语法**： `var obj1 = Object.create(原型对象)`;

**示例代码**： 让`空对象obj1`继承`对象obj`的属性和方法

```javascript
var obj = {
  name: '盖伦',
  age: 25,
  skill: function() {
    console.log('大宝剑');
  }
};

// 这个方法会帮我们创建一个原型是 obj 的对象
var obj1 = Object.create(obj);

console.log(obj1.name); // "盖伦"
obj1.skill(); // "大宝剑"
```

**兼容性**(暂时不考虑)：

由于这个属性是`ECMAScript5`的时候提出来的，所以存在兼容性问题。
利用浏览器的能力检测，如果存在`Object.create`则使用，如果不存在的话，就创建构造函数来实现原型继承。

```javascript
// 封装一个能力检测函数
function create(obj) {
  // 判断，如果浏览器有 Object.create 方法的时候
  if (Object.create) {
    return Object.create(obj);
  } else {
    // 创建构造函数 Fun
    function Fun() {}
    Fun.prototype = obj;
    return new Fun();
  }
}

var hero = {
  name: '盖伦',
  age: 25,
  skill: function() {
    console.log('大宝剑');
  }
};

var hero1 = create(hero);
console.log(hero1.name); // "盖伦"
console.log(hero1.__proto__ == hero); // true
```

## 2.原型链

对象有原型，原型本身又是一个对象，所以**原型也有原型**，这样就会形成一个链式结构的原型链

### 2.1 什么是原型链

**示例代码**： 原型继承练习

```javascript
// 创建一个 Animal 构造函数
function Animal() {
  this.weight = 50;
  this.eat = function() {
    console.log('蜂蜜蜂蜜');
  };
}

// 实例化一个 animal 对象
var animal = new Animal();

// 创建一个 Preson 构造函数
function Person() {
  this.name = 'zs';
  this.tool = function() {
    console.log('菜刀');
  };
}

// 让 Person 继承 animal （替换原型对象）
Person.prototype = animal;

// 实例化一个 p 对象
var p = new Person();

// 创建一个 Student 构造函数
function Student() {
  this.score = 100;
  this.clickCode = function() {
    console.log('啪啪啪');
  };
}

// 让 Student 继承 p （替换原型对象）
Student.prototype = p;

//实例化一个 student 对象
var student = new Student();

console.log(student); // 打印 {score:100,clickCode:fn}

// 因为是一级级继承下来的 所以最上层的 Animate 里的属性也是被继承的
console.log(student.weight); // 50
student.eat(); // 蜂蜜蜂蜜
student.tool(); // 菜刀
```

**如图所示**：

我们将上面的案例通过画图的方式展现出来后就一目了然了，实例对象`animal`直接替换了构造函数`Person`的原型，以此类推，这样就会形成一个链式结构的原型链。

![p5.png](p5.png)

**完整的原型链**:

结合上图，我们发现，最初的构造函数`Animal`创建的同时，会创建出一个原型，此时的原型是一个`空的对象`。结合原型链的概念：“原型本身又是一个对象，所以原型也有原型”，那么这个空对象往上还能找出它的原型或者构造函数吗？

我们如何创建一个`空对象`？ 1、字面量：`{}`；2、构造函数：`new Object()`。我们可以简单的理解为，这个空的对象就是，构造函数`Object`的实例对象。所以，这个空对象往上面找是能找到它的原型和构造函数的。

```javascript
// 创建一个 Animal 构造函数
function Animal() {
  this.weight = 50;
  this.eat = function() {
    console.log('蜂蜜蜂蜜');
  };
}

// 实例化一个 animal 对象
var animal = new Animal();

console.log(animal.__proto__); // {}
console.log(animal.__proto__.__proto__); // {}
console.log(animal.__proto__.__proto__.constructor); // function Object(){}
console.log(animal.__proto__.__proto__.__proto__); // null
```

![p6.png](p6.png)

### 2.2 原型链的拓展

**1、描述出数组`[]`的原型链结构**:

```javascript
// 创建一个数组
var arr = new Array();

// 我们可以看到这个数组是构造函数 Array 的实例对象，所以他的原型应该是：
console.log(Array.prototype); // 打印出来还是一个空数组

// 我们可以继续往上找
console.log(Array.prototype.__proto__); // 空对象

// 继续
console.log(Array.prototype.__proto__.__proto__); // null
```

**如图所示**：
![p7](p7.png)

**2、扩展内置对象**:

给 js 原有的内置对象，添加新的功能。
**注意**：这里**不能直接给内置对象的原型添加方法**，因为在开发的时候，大家都会使用到这些内置对象，假如大家都是给内置对象的原型添加方法，就会出现问题。

错误的做法：

```javascript
// 第一个开发人员给 Array 原型添加了一个 say 方法
Array.prototype.say = function() {
  console.log('哈哈哈');
};

// 第二个开发人员也给 Array 原型添加了一个 say 方法
Array.prototype.say = function() {
  console.log('啪啪啪');
};

var arr = new Array();

arr.say(); // 打印 “啪啪啪”  前面写的会被覆盖
```

为了避免出现这样的问题，只需自己定义一个构造函数，并且让这个构造函数继承数组的方法即可，再去添加新的方法。

```javascript
// 创建一个数组对象 这个数组对象继承了所有数组中的方法
var arr = new Array();

// 创建一个属于自己的构造函数
function MyArray() {}

// 只需要将自己创建的构造函数的原型替换成 数组对象，就能继承数组的所有方法
MyArray.prototype = arr;

// 现在可以单独的给自己创建的构造函数的原型添加自己的方法
MyArray.prototype.say = function() {
  console.log('这是我自己添加的say方法');
};

var arr1 = new MyArray();

arr1.push(1); // 创建的 arr1 对象可以使用数组的方法
arr1.say(); // 也可以使用自己添加的方法  打印“这是我自己添加的say方法”
console.log(arr1); // [1]
```

### 2.3 属性的搜索原则(不是设置)

当通过`对象名.属性名`获取属性是 ，会遵循以下属性搜索的原则：

1. 首先去对象自身属性中找，如果找到直接使用，
2. 如果没找到去自己的原型中找，如果找到直接使用，
3. 如果没找到，去原型的原型中继续找，找到直接使用，
4. 如果没有会沿着原型不断向上查找，直到找到 null 为止。

关于查询和设置中, 如果遇到没有的属性, 报`undefined`和报错
比如没有`x.ddd` 是`undefined`, 如果在`x.ddd.length`则报错,而不是`undefined`, 所有 用 `x.dd && x.dd.length`

结论就是`null`和`undefined`无论是读取他们的属性或设置属性都是报错的.

## 参考

[一文让你理解什么是 JS 原型](https://segmentfault.com/a/1190000017207055)
[JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/)
