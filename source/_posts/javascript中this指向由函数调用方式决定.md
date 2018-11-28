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

JavaScript 函数中的 `this` 指向并不是在函数定义的时候确定的，而**是在调用的时候确定的**。换句话说，**函数的调用方式决定了 `this` 指向**

js中,普通的函数调用方式有三种：**直接调用、方法调用和 new 调用**
还有些特殊的调用方式，比如通过 `bind()` 将函数绑定到对象之后再进行调用、通过 `call()`、`apply()` 进行调用
es6 引入了**箭头函数**
所以主要是分**4类**: **直接调用(bind, call, apply)、方法调用、new 调用和es6的箭头函数**.

## 直接调用, 只要是通过`函数名(...)`, 不关是在什么作用域下

直接调用: 就是通过 `函数名(...)` 这种方式调用。这时候，**函数内部**的 `this` 指向`全局对象`，在浏览器中全局对象是 `window`，在 `NodeJs` 中全局对象是 `global`。

**注意的一点是**，直接调用并不是指在全局作用域下进行调用，**在任何作用域下，直接通过 `函数名(...)` 来对函数进行调用的方式，都称为直接调用**

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

还有一点需要注意的是 `bind()` 的影响。`Function.prototype.bind()` 的作用是将当前函数与指定的对象绑定，并返回一个新函数，这个新函数**无论以什么样的方式调用**，其 `this` **始终指向绑定的对象**。

### `call` 和 `apply` 对 `this` 的影响

`call()` 方法调用一个函数, 其具有一个指定的`this`值和提供的**参数(参数的列表)**。`apply`是一个`数组[]`

> `call()`方法的作用和 `apply()` 方法类似，区别就是`call()`方法接受的是**参数列表**，而`apply()`方法接受的是一个**参数数组**。

使用 `apply` 和 `call` 的时候仍然需要注意，如果目录函数本身是一个绑定`bind`了 `this` 对象的函数，那 `apply` 和 `call` 不会像预期那样执行, 由此可见，`bind()` 对函数的影响是深远的，慎用！

## 方法调用

方法调用是指**通过对象来调用其方法函数**，它是 `对象.方法函数(...)` 这样的调用形式。这种情况下，函数中的 `this` 指向调用该方法的对象。但是，同样需要注意 `bind()` 的影响

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

## 参考

[1. JavaScript 的 this 指向问题深度解析](https://segmentfault.com/a/1190000008400124)
