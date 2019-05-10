---
title: javascript-数据类型判断
date: 2019-05-09 20:55:02
tags:
- 数据类型判断
categories:
- JavaScript完全手册(2018版)
comments: false
permalink:
---

# javascript-数据类型判断

[JavaScript 数据类型判断 666](https://www.html.cn/archives/10016)

`javascript` 由于各种各样的原因，在判断一个**变量的数据类型**方面一直存在着一些问题，其中最典型的问题恐怕就是 `typeof null` 会返回 `object` 了吧。因此在这里简单的总结一下判断数据类型时常见的陷阱，以及正确的处理姿势。

## javascript 数据类型

[MDN 数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

> 更详细, 除了 5+1 还有 Symbol, 以及对象的特性, 新数据解构 Map, Set

### 数据类型

这里先谈一下 `JavaScript` 这门语言的数据类型。`JavaScript` 中有七种数据类型，其中有六种简单数据类型(原始烈性)，一种复杂数据类型。

> **首字母大写**的`Undefined`表示的是一种**数据类型**,**首字母小写**的`undefined`表示的是属于这种**数据类型的唯一的一个值**。

#### 六种简单数据类型

- `String`
- `Number`
- `Boolean`
- `Null`
- `Undefined`
- `Symbol` (ECMAScript 6 新定义)

#### 复杂数据类型

- `Object` 是唯一的复杂数据类型。 `Object` , `Array` , `Function` 这些**引用类型**值最终都可以归结为 `Object` **复杂数据类型**。

## 各种陷阱

### typeof 的陷阱

[MDN typeof](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Ftypeof)

`typeof` 是用来检测变量**数据类型**的操作符，对一个值使用 `typeof` **操作符**可能会返回下列某个**字符串**

- “undefined” — 如果这个变量只定义没初始化, 用 `typeof` 如果这个变量未定义或全局的`undefined`属性
- “string” — 如果这个变量初始化为`String`字符串类型
- “boolean” — 如果这个变量初始化为`Boolean`布尔类型值
- “number” — 如果这个变量初始化为`Number`数值类型
- “symbol” — 如果这个变量初始化为`Symbol`数值类型
- “object” — 如果这个变量初始化为`Object`对象或 `Array`数组 或者 `Null`类型的 null
- “function” — 如果这个变量初始化为`Function`函数

> 数组确实是对象, 但我们想更具体区分 是不是一个数组.

[示例, MDN 666666 展示很多易错点](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#%E7%A4%BA%E4%BE%8B)

> 例如注意`NAN` 还是`number`, 还有**不要使用包装类型**

```javascript
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === 'number'; // 但不要使用这种形式!

// Strings
typeof '' === 'string';
typeof 'bla' === 'string';
typeof typeof 1 === 'string'; // typeof总是返回一个字符串
typeof String('abc') === 'string'; // 但不要使用这种形式!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 但不要使用这种形式!

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined';

// Objects
typeof { a: 1 } === 'object';

// 使用Array.isArray 或者 Object.prototype.toString.call
// 区分数组,普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';

// 函数
typeof function() {} === 'function';
typeof class C {} === 'function';
typeof Math.sin === 'function';
typeof new Function() === 'function';
```

#### 1. Object 对象检测的陷阱

JavaScript 代码:

```javascript
function isObj(obj) {
  if (typeof obj === 'object') {
    return 'It is object';
  }
  return 'It is not object';
}
```

这个函数的本意是想检测传入的参数是否是 `Object` 对象。但是这个函数其实是非常不安全的。

比如

JavaScript 代码:

```javascript
var a = [1, 2, 3];
isObj(a); // 'It is object'

var b = null;
isObj(b); // 'It is object'
```

这样明显是不对的，因为 `typeof []` 和 `typeof null` 都是是会返回 '`object`' 的。

### 2. Array 对象检测的陷阱

JavaScript 代码:

```javascript
typeof []; //  'object'
```

上面说到了**对一个数组**使用 `typeof` 操作符也是会返回 `'object'`，因此 `typeof` 并不能判断**数组对象**的类型

> typeof 在判断复杂数据类型不够细致

### instanceof 的陷阱 与 基本包装类型

#### 1. instanceof

[MDN instanceof](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof)

`instanceof` 运算符用来测试一个**对象在其原型链中是否存在一个构造函数的 `prototype` 属性**。

`instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置

> 从实例往上走和从构造函数往上走能不能到同一个原型.
> 看原型链那张图

#### 2. 基本包装类

《Javascript》高级程序设计 第五章第六节 基本包装类型

javascript 为了**方便操作基本类型值**，ECMAscript 提供了 3 个特殊的引用类型：`Boolean`、`Number` 和 `String`。 每当读取一个**基本类型值**的时候，后台就会创建一个**对应的基本包装类型的对象**，从而让我们能够调用一些方法来操作这些数据。

> 注意不是永久有方法的, 只是暂时的

JavaScript 代码:

```javascript
var s1 = 'some text';
var s2 = s1.substring(2);
```

上面的代码中，先创建了一个**字符串**保存在了变量 `s1`，字符串当然是**基本类型值**。但是在下一行中我们又调用了 `s1` 的**方法**。我们知道基本类型值不是对象，**理论上它不应该拥有方法**（但它们确实有方法）。其实，为了让我们实现这种直观的操作，**后台已经帮助我们完成了一系列的操作**。当我们在第二行代码中访问 `s1` 变量时，访问过程处于读取模式，而在读取模式中访问字符串时，后台都会自动完成下列处理。

1. 创建 `String` 类型的一个实例；
2. 在实例上调用指定的方法；
3. 销毁这个实例。

可以将以上三个步骤想像成是执行了下列代码

JavaScript 代码:

```javascript
var s1 = new String('some text');
var s2 = s1.substring(2);
s1 = null;
```

#### 3. instanceof 判断基本类型值的陷阱

上面提到 3 种**基本包装类**，就是为了说明 `instanceof` 这个陷阱

JavaScript 代码:

```javascript
var str = 'text';
str instanceof String; // false
```

本来我也是想当然的认为 `str instanceof String` 会使 str 变量处于读取模式，**自动建立基本包装类**。但是根据上述代码所体现表象来看，`instanceof` 运算符是**直接访问的变量的原始值**。

因此 `instanceof` 并不能用来判断五种基本类型值

#### 4. instanceof 判断 Object 类型的陷阱

这里先说一下，用 `instanceof` 判断 `Array` 类型基本上是**非常 ok**的

JavaScript 代码:

```javascript
var arr = [1, 2, 3];
arr instanceof Array; // true
```

但是 `instanceof` 却**不能安全的判断** `Object` 类型，**因为 `Array` 构造函数是继承自 `Object` 对象的**，因此在 arr 变量上是可以访问到 `Object` 的 `prototype` 属性的。如下例所示：

JavaScript 代码:

```javascript
var arr = [1, 2, 3];
arr instanceof Object; // true
// 会返回 true ，是因为 Object 构造函数的 prototype 属性存在与 arr 这个数组实例的原型链上。
```

> 所以 `instanceof` 只用来判断 `Function`么

## 一个高效但危险的变量类型判断方法

### 用对象的 constructor 来判断对象类型

[stack overflow](https://link.juejin.im/?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F767486%2Fhow-do-you-check-if-a-variable-is-an-array-in-javascript)上有人做了实验，说是目前运算最快的判断变量类型的方式。

JavaScript 代码:

```javascript
function cstor(variable) {
  var cst = variable.constructor;

  switch (cst) {
    case Number:
      return 'Number';
    case String:
      return 'String';
    case Boolean:
      return 'Boolean';
    case Array:
      return 'Array';
    case Object:
      return 'Object';
    case Function:
      return 'Function';
  }
}
```

上面是一个**判断变量类型**的方法，工作的非常高效完美。但是用 `constructor` 判断变量类型有一个**致命的缺陷**，就是**当检测 `null` 或者 `undefined` 类型的 `constructor` 属性时，js 会报错！**

也就是说下面代码会报错！

JavaScript 代码:

```javascript
cstor(null); // 若传入 null 或者 undefined 作为参数时
// cstor 函数第一行就会报错，因为 null 和 undefined 根本就没有 constructor 属性
```

因此我们在利用变量的 `constructor` 属性来判断变量类型时，**必须要先保证变量有 不会是 `null` 或者 `undefined`**。

改造以上函数如下：

JavaScript 代码:

```javascript
function cstor(variable) {
  if (variable === null || variable === undefined) {
    return 'Null or Undefined';
  }

  var cst = variable.constructor;

  switch (cst) {
    case Number:
      return 'Number';
    case String:
      return 'String';
    case Boolean:
      return 'Boolean';
    case Array:
      return 'Array';
    case Object:
      return 'Object';
    case Function:
      return 'Function';
  }
}
```

所以说使用 `constructor` 来判断对象类型时要**无时无刻不伴随着排除** `null` 和 `undefined` 的干扰，否则就会产生致命的问题，**因此本人并不推荐**。

## 正确判断变量类型的姿势

### 一个万金油方法 Object.prototype.toString.call()

[MDN reference](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FtoString)

`Object.prototype.toString.call(variable)` 用这个方法来判断变量类型**目前是最可靠的了**，它总能返回正确的值。

该方法返回 "`[object type]`", 其中`type`是**对象类型**。

JavaScript 代码:

```javascript
Object.prototype.toString.call(123); //  "[object Number]"

Object.prototype.toString.call('123'); //  "[object String]"

Object.prototype.toString.call(false); //  "[object Boolean]"

Object.prototype.toString.call(undefined); //  "[object Undefined]"

Object.prototype.toString.call(null); //  "[object Null]"

Object.prototype.toString.call([]); //  "[object Array]"

Object.prototype.toString.call(function a() {}); //  "[object Function]"

Object.prototype.toString.call({}); //  "[object Object]"
```

### String Boolean Number Undefined 四种基本类型的判断

除了 `Null` 之外的这四种基本类型值，都可以用 `typeof` 操作符很好的进行判断处理。

当然也可以用 `Object.prototype.toString.call(null)`

`Symbol` 类型 和 引用类型 `Function` 也可以

JavaScript 代码:

```javascript
typeof 'abc'; // "string"

typeof false; // "boolean"

typeof 123; // "number"

typeof undefined; // "undefined"
```

### Null 类型的判断

除了 `Object.prototype.toString.call(null)` 之外，目前最好的方法就是用 `variable === null` 全等来判断了。

JavaScript 代码:

```javascript
var a = null;

if (a === null) {
  console.log('a is null');
}

//  a is null
```

### 检测变量是否是一个 Array 数组

`typeof []` 会返回 `object` 因此明显是不能够用 `typeof` 操作符进行数组类型判断的。目前常用的方法有以下几种

#### 1. Object.prototype.toString.call()

万金油方法是一种。

#### 2. ECMAscript5 新增 Array.isArray()

JavaScript 代码:

```javascript
Array.isArray([]); // true
```

#### 3. instanceof 运算符 陷阱

[MDN reference](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof)

`instanceof` 运算符**用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性**。但前面说了 这个不准确.

> {% post_link javascript原型 javascript原型 %}

因此可以检测一个对象的原型链中是否存在 `Array` 构造函数的 `prototype` 属性来判断是不是数组。

JavaScript 代码:

```javascript
[] instanceof Array; // true
```

### 检测变量是否是一个 Object 对象

`typeof` 和 `instanceof` 都不能安全的判断变量是否是 `Object` 对象。

目前判断变量是否是对象的**最安全的方法**就只有 `Object.prototype.toString.call()` 了。

### Function 这块可以继续总结补充, 补充 Symbol 类型

用 `typeof` 可以, 用 `instanceof` 可以, 用`Object.prototype.toString.call()`也可以

instanceof 主要用来判断引用类型的,  不能判断 Symbol 类型

## 参考

[JavaScript 数据类型判断 666](https://www.html.cn/archives/10016)
