---
title: javascript中this指向由函数调用方式决定
date: 2018-11-26 08:31:54
tags:
- this
categories:
- javascript教程
comments: false
permalink:
---

# javascript中this指向由函数调用方式决定

## 结论在先

JavaScript 函数中的 `this` 指向并不是在**函数定义**的时候确定的，而**是在调用的时候确定的**。换句话说，**函数的调用方式决定了 `this` 指向**

js中,普通的函数调用方式有三种：**直接调用、方法调用和 new 调用**
还有些特殊的调用方式，比如通过 `bind()` 将函数绑定到对象之后再进行调用、通过 `call()`、`apply()` 进行调用
es6 引入了**箭头函数**
所以主要是分**4类**: **直接调用(bind, call, apply)、方法调用、new 调用和es6的箭头函数**.

> `this`的指向，是在**函数被调用的时候**确定的, 而**不是谁调用它，`this`就指向谁(这种从定义角度)**
> 除此之外，在**函数执行过程中，`this`一旦被确定，就不可更改了**。
> `new` 可以再看下 [JavaScript Prototype(原型) 新手指南](https://www.html.cn/archives/10022) 为什么要用new


**在一个函数上下文中，`this`由调用者提供，由调用函数的方式来决定**。

1. 如果调用者函数，**被某一个对象所拥有**，那么该函数在调用时，内部的`this`指向该对象。
2. 如果函数独立调用，那么该函数内部的`this`，则指向`undefined`。但是在非严格模式中，当`this`指向`undefined`时，它会被自动指向`全局对象`。

从结论中我们可以看出，想要准确确定this指向，**找到函数的调用者以及区分它是否是独立调用**就变得十分关键。

```JavaScript
// 为了能够准确判断，我们在函数内部使用严格模式，因为非严格模式会自动指向全局
function fn() {
    'use strict';
    console.log(this);
}

fn();  // fn是调用者，独立调用
window.fn();  // fn是调用者，被window所拥有
```

在上面的简单例子中，`fn()`作为独立调用者，按照定义的理解，它内部的`this`指向就为`undefined`。
而`window.fn()`则因为`fn`被`window`所拥有，内部的`this`就指向了`window`对象。

[前端基础进阶（五）：全方位解读this 666666](https://www.jianshu.com/p/d647aa6d1ae6)

🌰哦

```JavaScript
var a = 20;
var obj = {
    a: 10,
    c: console.log(this.a + 20),
    fn: function () {
        console.log(this.a);
    }
}

obj.c;      //40    直接调用
obj.fn();   // 10   方法调用
```

上面你要区别是**直接调用**还是**方法调用**

即: 在`demo`中，`对象obj`中的`c属性`使用`this.a + 20`来计算。这里我们需要明确的一点是，单独的`{}`是**不会形成新的作用域**的，因此这里的`this.a`，由于**并没有作用域的限制**，所以它仍然处于**全局作用域**之中。所以这里的`this`其实是指向的`window对象`。 再说这个`对象obj`中的`c属性`又不是函数.
而`对象obj`中的`fn方法`, 是**局部作用域**哦

> 要有**作用域**的概念才能搞定this

区别下, 对象中的`this`的作用域

```JavaScript
// 这是对象中的一个属性, 本质上还是在全局作用域下
var a = 30
var foo = {
    a: 10,
    b: this.a
}
console.log(foo.b);  // 30

// 这是函数, 依旧在全局作用域下
function test() {
    console.log(this);
}
console.log(test());    // window


// 对象中的函数
const obj = {
    test() {
        console.log(this === obj);
    }
};
console.log(obj.test()) // true

var jj = obj.test
console.log(jj()) // false
```

再说下`use strict`下前面提到过的, `this`指向`undefined`而不是`window`或`global`
因为在实际开发中，现在基本已经全部采用**严格模式**了，而最新的ES6，也是默认支持**严格模式**

```JavaScript
// 'use strict'; 但加了这个后就 Uncaught TypeError: Cannot read property 'a' of undefined
var a = 20;
function foo () {
    var a = 1;
    var obj = {
        a: 10,
        c: this.a + 20,
        fn: function () {
            return this.a;
        }
    }
    return obj.c;       // 这里可以改下哦

}
console.log(foo());    // 40
console.log(window.foo());  // 40
```

## 再次点题

看是通过`函数名(...)`还是 `对象.方法函数(...)` 这样的调用形式

> 注意引用赋值的情况, 还有就是`对象.属性`这2种都还是`global`哦

## 直接调用, 只要是通过`函数名(...)`, 不管是在什么作用域下

直接调用: 就是通过 `函数名(...)` 这种方式调用。这时候，**函数内部**的 `this` 指向`全局对象`，在浏览器中全局对象是 `window`，在 `NodeJs` 中全局对象是 `global`。

**注意的一点是**，直接调用**并不是指在全局作用域下**进行调用，**在`任何作用域`下，直接通过 `函数名(...)` 来对函数进行调用的方式，都称为直接调用**

> 可以看成不属于任何一个对象, 只属于全局对象
> 反正都是看**指向上下文**`EC`中的`this`

```javascript
// 简单兼容浏览器和 NodeJs 的全局对象
const _global = typeof window === "undefined" ? global : window;

function test() {
    console.log(this === _global);    // true
}

test();    // 直接调用

(function(_global) {
    // 通过 IIFE 限定作用域

    function test() {
        console.log(this === _global);  // true
    }

    test();     // 非全局作用域下的直接调用
})(typeof window === "undefined" ? global : window);
```

### `bind()` 对直接调用的影响, `bind()` 对函数的影响是深远的，**慎用！**

> 在JavaScript中，`call`、`apply`和`bind`是`Function`对象自带的

还有一点需要注意的是 `bind()` 的影响。`Function.prototype.bind()` 的作用是将当前函数与指定的对象绑定，并返回一个**新函数**，这个新函数**无论以什么样的方式调用**，其 `this` **始终指向绑定的新对象**。

> 多次 `bind()` 是无效的。更深层次的原因， `bind()` 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 `bind()` 相当于再包住第一次 `bind()` ,故**第二次以后的 `bind` 是无法生效的, 只绑定第一个**。

### `call` 和 `apply` 对 `this` 的影响

`call()` 方法调用一个函数, 其具有一个指定的`this`值和提供的**参数(参数的列表)**。`apply`是一个`数组[]`

> `call()`方法的作用和 `apply()` 方法类似，区别就是`call()`方法接受的是**参数列表**，而`apply()`方法接受的是一个**参数数组**。

使用 `apply` 和 `call` 的时候仍然需要注意，如果目录函数本身是一个绑定`bind`了 `this` 对象的函数，那 `apply` 和 `call` 不会像预期那样执行, 由此可见，`bind()` 对函数的影响是深远的，慎用！

## 方法调用

方法调用是指**通过对象来调用其方法函数**，它是 `对象.方法函数(...)` 这样的调用形式。这种情况下，函数中的 `this` **指向调用该方法的对象**。但是，同样需要注意 `bind()` 的影响

```javascript
const obj = {
    // 第一种方式，定义对象的时候定义其方法
    test() {
        console.log(this === obj);
    }
};

// 第二种方式，对象定义好之后为其附加一个方法(函数表达式)
obj.test2 = function() {
    console.log(this === obj);
};

// 第三种方式和第二种方式原理相同
// 是对象定义好之后为其附加一个方法(函数定义)
function t() {
    console.log(this === obj);
}
obj.test3 = t;

// 这也是为对象附加一个方法函数
// 但是这个函数绑定了一个不是 obj 的其它对象
obj.test4 = (function() {
    console.log(this === obj);
}).bind({});

obj.test();     // true
obj.test2();    // true
obj.test3();    // true

// 受 bind() 影响，test4 中的 this 指向不是 obj
obj.test4();    // false
```

这里需要注意的是，**后三种方式都是预定定义函数**，再将其附加给 `obj` 对象作为其方法。**再次强调，函数内部的 `this` 指向与定义无关，受调用方式的影响。**

### **方法中** this 指向全局对象的情况,**而没有指向调用该方法的对象**

注意这里说的**是方法中**而不是**方法调用中**。方法中的 `this` 指向全局对象(而**没有指向调用该方法的对象**)，如果不是因为 `bind()`，那就一定是因为**不是用的方法调用方式**

```javascript
const obj = {
    test() {
        console.log(this === obj);
    }
};

const t = obj.test;
t();    // false
```

`t` 就是 `obj` 的 `test` 方法，但是 `t()` 调用时，其中的 `this` 指向了**全局**。

之所以要特别提出这种情况，**主要是因为**常常将一个对象方法作为回调传递给某个函数之后，却发现运行结果与预期不符——**因为忽略了调用方式对 `this` 的影响。**

> 提前说下箭头函数, 指向的是定义的时候的对象哦, 尤其是在**使用闭包这种操作**, 当然只有一层的话还是一样, 谁调用是谁
> 闭包如果用两个箭头函数实现呢???

```JavaScript
    var name = "windowsName";

    var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)
        },

        func2: function () {
            setTimeout(  function () {
                this.func1()
            },100);
        }

    };

    a.func2()     // this.func1 is not a function
```

```javascript
    var name = "windowsName";

    var a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)
        },

        func2: function () {
            setTimeout( () => {
                this.func1()
            },100);
        }

    };

    a.func2()     // Cherry
```

都是这里的例子
[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2#heading-4)

JavaScript 的一大特点是，函数存在「**定义时上下文**」和「**运行时上下文**」以及「**上下文是可以改变的**」这样的概念。

比如里面用`_this = this`用的是**定义时上下文**的`this`

a b c, a是数组
`b.apply(a,[1,2]) === b.call(a,1,2) === b.bind(a,1,2)()`

例子

```javascript
    // 这里 $button 假设是一个指向某个按钮的 jQuery 对象
    constructor(data, $button) {
        this.data = data;
        $button.on("click", this.onButtonClick);
    }

    onButtonClick(e) {
        console.log(this.data);
    }
}

const handlers = new Handlers("string data", $("#someButton"));
// 对 #someButton 进行点击操作之后
// 输出 undefined
// 但预期是输出 string data
```

主要看`$button.on`这块

解决办法: 用`bind()` 或 es6箭头函数

```javascript
// 这是在 es5 中的解决办法之一
var _this = this;
$button.on("click", function() {
    _this.onButtonClick();
});

// 也可以通过 bind() 来解决
$button.on("click", this.onButtonClick.bind(this));

// es6 中可以通过箭头函数来处理，在 jQuery 中慎用
$button.on("click", e => this.onButtonClick(e));
```

## new 调用

在 es6 之前，**每一个函数都可以当作是构造函数**，通过 `new` 调用来产生新的对象(函数内无特定返回值的情况下)。**而 es6 改变了这种状态**，虽然 `class` 定义的类用 `typeof` 运算符得到的仍然是 `"function"`，**但它不能像普通函数一样直接调用**；同时，`class` 中定义的方法函数，也不能当作构造函数用 `new` 来调用.

而在 es5 中，用 `new` 调用一个构造函数，**会创建一个新对象**，而其中的 `this` 就指向这个新对象。这没有什么悬念，因为 `new` 本身就是设计来创建新对象的。

一个`new`的过程

```JavaScript
var a = new myFunction("Li","Cherry");

new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype; // 此时便建立了obj对象的原型链：
    // obj->myFunction.prototype->Object.prototype->null
    var result = myFunction.call(obj,"Li","Cherry"); // 相当于obj.myFunction("Li","Cherry")
    return typeof result === 'object' ? result : obj; // 如果无返回值或者返回一个非对象值，则将obj返回作为新对象
}
```

> 结合原型链看 {% post_link javascript原型 javascript原型%}

1. 创建一个空对象 `obj`;
2. 将新创建的空对象的隐式原型指向其构造函数的显示原型。
3. 使用 `call` 改变 `this` 的指向
4. 如果无返回值或者返回一个非对象值，则将 `obj` 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。

**所以我们可以看到，在 `new` 的过程中，我们是使用 `call` 改变了 `this` 的指向**。

[new创建对象的过程发生了什么](https://alexzhong22c.github.io/2017/08/12/js-new-happen/)

## 箭头函数中的 this

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 上对箭头函数的说明 这里已经清楚了说明了，箭头函数**没有**自己的 `this` 绑定。箭头函数中使用的 `this`，**其实是直接包含它的那个函数或函数表达式中的 `this`。(就是外面的父)**

```javascript
const obj = {
    test() {
        const arrow = () => {
            // 这里的 this 是 test() 中的 this，
            // 由 test() 的调用方式决定
            console.log(this === obj);
        };
        arrow();
    },

    getArrow() {
        return () => {
            // 这里的 this 是 getArrow() 中的 this，
            // 由 getArrow() 的调用方式决定
            console.log(this === obj);
        };
    }
};

obj.test();     // true

const arrow = obj.getArrow();
arrow();        // true
```

都是由箭头函数的**直接外层函数(方法)决定**的，而方法函数中的 `this` 是由其调用方式决定的, 上例的调用方式都是**方法调用**，所以 `this` 都指向方法调用的对象，即 `obj`

**箭头函数让大家在使用闭包的时候不需要太纠结 `this`**，不需要通过像 `_this` 这样的局部变量来临时引用 `this` 给闭包函数使用

另外需要**注意的是，箭头函数不能用 `new` 调用，不能 `bind()` 到某个对象**(虽然 `bind()` 方法调用没问题，但是不会产生预期效果)。不管在什么情况下使用箭头函数，它本身是没有绑定 this 的，它用的是直接外层函数(即包含它的最近的一层函数或函数表达式)绑定的 `this`。

## 更详细的用法

[理解JS中的call、apply、bind方法](https://www.cnblogs.com/libin-1/p/6069031.html)

## 结合前文的执行上下文看

[深入理解JavaScript系列（13）：This? Yes,this! 666666](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)

在ECMAScript中，`this`并**不限于**只用来指向新创建的对象。
让我们更详细的了解一下，在`ECMAScript`中`this`到底是什么？

### 定义

`this`是执行上下文中的一个属性：

```JavaScript
activeExecutionContext = {
  VO: {...},
  this: thisValue
};
```

这里`VO`是我们前一章讨论的变量对象。

`this`与上下文中可执行代码的类型有直接关系，`this`值在进入上下文时确定，并且**在上下文运行期间永久不变**。

下面让我们更详细研究这些案例：

### 全局代码中的this

在这里一切都简单。在全局代码中，`this`**始终是全局对象本身**，这样就有可能间接的引用到它了。

```JavaScript
// 显示定义全局对象的属性
this.a = 10; // global.a = 10
console.log(a); // 10

// 通过赋值给一个无标示符隐式
b = 20;
console.log(this.b); // 20

// 也是通过变量声明隐式声明的
// 因为全局上下文的变量对象是全局对象自身
var c = 30;
console.log(this.c); // 30
```

### 函数代码中的this

在函数代码中使用`this`时很有趣，这种情况很难且会导致很多问题。

这种类型的代码中，`this`值的**首要特点**（或许是最主要的）是**它不是静态的绑定到一个函数**。

正如我们上面曾提到的那样，`this`是**进入上下文时确定**，**在一个函数代码中，这个值在每一次完全不同**。

不管怎样，在**代码运行时**的`this`值是不变的，也就是说，**因为它不是一个变量，就不可能为其分配一个新值**（相反，在Python编程语言中，它明确的定义为对象本身，在运行期间可以不断改变）。

```JavaScript
var foo = {x: 10};

var bar = {
  x: 20,
  test: function () {

    console.log(this === bar); // true
    console.log(this.x); // 20

    this = foo; // 错误，任何时候不能改变this的值

    console.log(this.x); // 如果不出错的话，应该是10，而不是20

  }

};

// 在进入上下文的时候
// this被当成bar对象
// determined as "bar" object; why so - will
// be discussed below in detail

bar.test(); // true, 20

foo.test = bar.test;

// 不过，这里this依然不会是foo
// 尽管调用的是相同的function

foo.test(); // false, 10
```

那么，影响了函数代码中`this`值的变化有几个因素：

首先，在通常的函数调用中，`this`是由**激活上下文代码的**`调用者`来提供的，即调用函数的父上下文(`parent context`)。`this`**取决于调用函数的方式**。

为了在任何情况下准确无误的确定`this`值，有必要理解和记住这重要的一点。**正是调用函数的方式影响了调用的上下文中的`this`值**，没有别的什么（我们可以在一些文章，甚至是在关于javascript的书籍中看到，它们声称：“`this`值取决于函数如何定义，如果它是全局函数，`this`设置为全局对象，如果函数是一个对象的方法，`this`将总是指向这个对象。–**这绝对不正确**”）。
继续我们的话题，可以看到，即使是正常的全局函数也会被调用方式的不同形式激活，这些**不同的调用方式导致了不同的`this`值**。

```JavaScript
function foo() {
  console.log(this);
}

foo(); // global

console.log(foo === foo.prototype.constructor); // true

// 但是同一个function的不同的调用表达式，this是不同的

foo.prototype.constructor(); // foo.prototype
```

有可能作为一些对象定义的方法来调用函数，但是`this`将不会设置为这个对象。

```JavaScript
var foo = {
  bar: function () {
    console.log(this);
    console.log(this === foo);
  }
};

foo.bar(); // foo, true

var exampleFunc = foo.bar;

console.log(exampleFunc === foo.bar); // true

// 再一次，同一个function的不同的调用表达式，this是不同的

exampleFunc(); // global, false
```

那么，调**用函数的方式如何影响**`this`值？为了充分理解`this`值的确定，需要详细分析其**内部类型之一**——引用类型（`Reference type`）。

### 引用类型（Reference type）

使用**伪代码**我们可以将**引用类型的值**可以表示为拥有**两个属性的对象**——`base`（即拥有属性的那个对象），和`base`中的`propertyName` 。

```JavaScript
var valueOfReferenceType = {
  base: <base object>,
  propertyName: <property name>
};
```

**引用类型的值**只有两种情况：

1. 当我们处理一个标示符时
2. 或一个属性访问器

标示符的处理过程在下一篇文章里详细讨论，在这里我们**只需要知道，在该算法的返回值中，总是一个引用类型的值**（这对`this`来说很重要）。

标识符是变量名，函数名，函数参数名和全局对象中未识别的属性名。例如，下面标识符的值：

```JavaScript
var foo = 10;
function bar() {}
```

在操作的中间结果中，`引用类型`对应的值如下：

```JavaScript
var fooReference = {
  base: global,
  propertyName: 'foo'
};

var barReference = {
  base: global,
  propertyName: 'bar'
};
```

**为了从引用类型中得到一个对象`真正的值`**，**伪代码**中的`GetValue`方法可以做如下描述：

```JavaScript
function GetValue(value) {

  if (Type(value) != Reference) {
    return value;
  }

  var base = GetBase(value);

  if (base === null) {
    throw new ReferenceError;
  }

  return base.[[Get]](GetPropertyName(value));

}
```

内部的`[[Get]]`方法**返回对象属性真正的值**，包括对原型链中继承的属性分析。

```JavaScript
GetValue(fooReference); // 10
GetValue(barReference); // function object "bar"
```

**属性访问器**都应该熟悉。它有**两种变体**：点（`.`）语法（此时属性名是正确的标示符，且事先知道），或括号语法（`[]`）。

```JavaScript
foo.bar();
foo['bar']();
```

**在中间计算的返回值中，我们有了引用类型的值**。

```JavaScript
var fooBarReference = {
  base: foo,
  propertyName: 'bar'
};

GetValue(fooBarReference); // function object "bar"
```

#### **引用类型的值与函数上下文中的`this`值如何相关？**——从最重要的意义上来说。 这个关联的过程是这篇文章的**核心**。

一个函数上下文中确定`this`值的通用规则如下：

在一个函数上下文中，`this`**由调用者提供，由调用函数的方式来决定**。如果调用括号`()`的**左边**是`引用类型的值`，`this`将设为引用类型值的`base`对象（`base object`），在其他情况下（与引用类型不同的任何其它属性），这个值为`null`。
不过，**实际不存在**`this`的值为`null`的情况，因为当`this`的值为`null`的时候，其值会被**隐式转换**`为全局对象`。

> 注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为`undefined`。

我们看看这个例子中的表现：

```JavaScript
function foo() {
  return this;
}

foo(); // global
```

我们看到在**调用括号的左边**是一个引用类型值（因为`foo`是一个标示符）。

```JavaScript
var fooReference = {
  base: global,
  propertyName: 'foo'
};
```

相应地，`this`也设置为引用类型的`base`对象。即`全局对象`。

同样，使用**属性访问器**：

```JavaScript
var foo = {
  bar: function () {
    return this;
  }
};

foo.bar(); // foo
```

我们再次拥有一个引用类型，其`base`是`foo`对象，在函数`bar`激活时用作`this`。

```JavaScript
var fooBarReference = {
  base: foo,
  propertyName: 'bar'
};
```

**但是，用另外一种形式激活相同的函数，我们得到其它的`this`值。**

> 就是这里揭示了

```JavaScript
var test = foo.bar;
test(); // global
```

因为`test`作为标示符，生成了引用类型的其他值，其`base`（全局对象）用作`this` 值。

```JavaScript
var testReference = {
  base: global,
  propertyName: 'test'
};
```

**现在，我们可以很明确的告诉你，为什么用表达式的不同形式激活同一个函数会不同的`this`值，答案在于引用类型（`type Reference`）`不同的中间值`。**

```JavaScript
function foo() {
  console.log(this);
}

foo(); // global, because

var fooReference = {
  base: global,
  propertyName: 'foo'
};

console.log(foo === foo.prototype.constructor); // true

// 另外一种形式的调用表达式

foo.prototype.constructor(); // foo.prototype, because

var fooPrototypeConstructorReference = {
  base: foo.prototype,
  propertyName: 'constructor'
};
```

另外一个通过调用方式**动态确定**`this`值的经典例子：

```JavaScript
function foo() {
  console.log(this.bar);
}

var x = {bar: 10};
var y = {bar: 20};

x.test = foo;
y.test = foo;

x.test(); // 10
y.test(); // 20
```

### 函数调用和非引用类型

因此，正如我们已经指出，当**调用括号的左边**不是引用类型而是其它类型，这个值自动设置为`null`，**结果为全局对象**。

让我们再思考这种表达式：

```JavaScript
(function () {
  console.log(this); // null => global
})();
```

在这个例子中，我们有一个函数对象但不是引用类型的对象（它不是标示符，也不是属性访问器），相应地，`this`值最终设为全局对象。

更多复杂的例子：

```JavaScript
var foo = {
  bar: function () {
    console.log(this);
  }
};

foo.bar(); // Reference, OK => foo
(foo.bar)(); // Reference, OK => foo

(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?
```

为什么我们有一个**属性访问器**，它的中间值应该为引用类型的值，在某些调用中我们得到的`this`值不是`base`对象，而是`global`对象？

**问题在于后面的三个调用**，在应用一定的运算操作之后，在调用括号的**左边的值不在是引用类型**。

1. 第一个例子很明显———明显的引用类型，结果是，`this`为`base`对象，即`foo`。
2. 在第二个例子中，**组运算符并不适用**，想想上面提到的，从引用类型中获得一个对象真正的值的方法，如`GetValue`。相应的，在组运算的返回中———我们得到**仍是一个引用类型**。这就是`this`值为什么再次设为`base`对象，即`foo`。
3. 第三个例子中，与组运算符不同，**赋值运算符**调用了`GetValue`方法。返回的结果是函数对象（但不是引用类型），这意味着`this`设为`null`，结果是`global`对象。
4. 第四个和第五个也是一样——**逗号运算符**和**逻辑运算符**（OR）调用了`GetValue` 方法，相应地，我们失去了引用而得到了函数。并再次设为`global`。

> 到这里我已经看不懂了, 所以直接看链接中的吧

## 参考

[1. JavaScript 的 this 指向问题深度解析](https://segmentfault.com/a/1190000008400124)
[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2#heading-4)
[new创建对象的过程发生了什么](https://alexzhong22c.github.io/2017/08/12/js-new-happen/)
[深入浅出 妙用Javascript中apply、call、bind](http://www.admin10000.com/document/6711.html)
[理解JS中的call、apply、bind方法](https://www.cnblogs.com/libin-1/p/6069031.html)
[深入理解JavaScript系列（13）：This? Yes,this! 666666](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)
[前端基础进阶（五）：全方位解读this 666666](https://www.jianshu.com/p/d647aa6d1ae6)

[Understanding JavaScript Function Invocation and "this" 666666](https://yehudakatz.com/2011/08/10/understanding-javascript-function-invocation-and-this/)

[Annotated ECMAScript 5.1](http://es5.github.io/#x15.3.4.4)