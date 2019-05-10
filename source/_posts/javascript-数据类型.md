---
title: javascript-数据类型
date: 2019-05-09 16:57:49
tags:
- 数据类型
categories:
- JavaScript完全手册(2018版)
comments: false
permalink:
---

# javascript-数据类型

[数据类型 – JavaScript 完全手册（2018 版）6666](https://www.html.cn/archives/10017)

您有时可能会读到 JS 是**无类型**的，但这是不正确的。 确实，您可以将各种不同类型分配给变量，但 JavaScript 具有类型。 特别是，它提供了原始类型和对象类型。

## 原始类型

原始类型包括：5+1(Symbol)

Number（数字）
String（字符串）
Boolean（布尔）
还有两种特殊的原始类型：

Null（空值）
Undefined（未定义）
让我们在这里详细介绍它们。

### Number（数字）

在内部，JavaScript **只有一种数字类型**：每个数字都是一个**浮点数**。

数字字面量是源代码中表示的数字，并且取决于它的编写方式，它可以是整数字面量或浮点数字面量。

整数：

```JavaScript
JavaScript 代码:
10
5354576767321
0xCC //hex
```

浮点数：

```JavaScript
JavaScript 代码:
3.14
.1234
5.2e4 //5.2 * 10^4
```

实际工作中你会碰到很多不可思议的问题，特别是浮点数运算的精度问题，请查看以下几篇文章，了解相关问题及解决方案：

[JavaScript 浮点数运算的精度问题](https://www.html.cn/archives/7340)
[JavaScript 中科学计数法转化为数值字符串形式](https://www.html.cn/archives/9318)
[JavaScript 格式化数字、金额、千分位、保留几位小数、舍入舍去…](https://www.html.cn/archives/7324)

> 理解IEEE 754 的结构对理解最大值, 最小值很有用. 但注意**安全整数**这一回事, 还涉及指数为0是正负0和指数为2047的表示无穷大`2`个和NAN有`2^53-2`, 就是去掉2个无穷
> [ECMAScript中的Number Type与 IEEE 754-2008 安全整数](https://juejin.im/post/5ccae4f25188254190544ded#heading-3)

### String（字符串）

字符串类型是一系列字符。它在源代码中定义为字符串字面量，用`单引号`或`双引号`括起来：

JavaScript 代码:

```javascript
'A string';
'Another string';
```

通过使用反斜杠 `\` ，字符串可以**换行**

> 只是输入的时候可以换行输入, 而**不是输出的时候显示是换行的**
> 要做到输出时候是换行的要用`字符串模板`, 或使用`\n`换行

JavaScript 代码:

```javascript
'A \
string';
```

字符串可在打印字符串时**解析转义序列**，例如 `\n` 以创建一个**新行**。当您需要在**引号**括起的字符串中输入引号时，反斜杠也很有用，以防止将字符解释为结束引号：

JavaScript 代码:

```javascript
'I\'m a developer';
```

可以使用 `+` 运算符连接字符串：

JavaScript 代码:

```javascript
'A ' + 'string';
```

#### 模板字符串

在 `ES2015(ES6)` 中引入，模板字符串是**字符串字面量**，允许更强大的方式来定义字符串。

JavaScript 代码:

```javascript
`a string`;
```

您可以执行字符串替换，嵌入任何 JavaScript 表达式的结果：

JavaScript 代码:

```javascript
`a string with ${something}``a string with ${something +
  somethingElse}``a string with ${obj.something()}`;
```

您可以轻松拥有**多行字符串**：, 不用加转义的`\n`

JavaScript 代码:

```javascript
`a string
with
${something}`;
```

### Boolean（布尔）

JavaScript 为布尔值定义了两个保留字：`true` 和 `false` 。 许多比较操作 `==` `===` `<` `>`（依此类推）返回一个布尔值。

`if` ，`while` 语句和其他控制结构使用布尔值来确定程序的流程。

他们不仅接受`true` 或 `false`，还接受 `真值` 和 `假值`。

**假值**，值被解析为 `false`，有

JavaScript 代码:

```javascript
0 - 0;
NaN;
undefined;
null;
(''); //empty string
```

其余所有的值都被解析为 **真值（truthy）** 。

实际工作中我们还会碰到等值比较，请查看 [JavaScript 等值比较 == ，=== 和 Object.is()](https://www.html.cn/archives/7977) 了解详情。

> [JavaScript-Equality-Table](https://github.com/dorey/JavaScript-Equality-Table)

### Null

`null` 是一个特殊值，表示缺少值，`Null`这种类型就只有一个值 `null`。 这也是其他语言中的常见概念，例如在 `Python` 中可以称为 `nil` 或 `None` 。

### Undefined

`undefined` 表示变量**尚未初始化且值不存在**。

它通常由**没有返回值的函数**返回。 当一个函数接受一个但不是由调用者设置的参数时，它是未定义的。

要检测值是否未定义，请使用构造：

JavaScript 代码:

```javascript
typeof variable === 'undefined';
```

JavaScript 新手很容易混淆 `undefined` 和 `null` ，请阅读 [JavaScript 中 undefined 和 null 的区别 666](https://www.html.cn/archives/6236) 了解。

> **首字母大写**的`Undefined`表示的是一种**数据类型**,**首字母小写**的`undefined`表示的是属于这种**数据类型的唯一的一个值**。

## Object(对象) 类型

任何不是原始类型的东西都是对象类型。

**函数**，**数组**和我们称之为**对象**的是对象类型。 它们本身是特殊的，但是它们继承了对象的许多属性，比如具有**原型**，并且还有对这些属性起作用的**方法**。

> `Object` 是唯一的复杂数据类型。 `Object` , `Array` , `Function` 这些**引用类型**值最终都可以归结为 `Object` 复杂数据类型。

看 {% post_link js的数组 js的数组 %} 里面还有介绍对象的特性, 访问器属性.

然后涉及Map set JSON这些

## 类型判断

实际开发工作中，我们会经常碰到 JavaScript 数据类型判断，阅读 [JavaScript 数据类型判断 666](https://www.html.cn/archives/10016) 了解 JavaScript 数据类型判断的陷阱 与 最佳的处理方式。

## 对象类型

## 参考

[数据类型 – JavaScript 完全手册（2018 版）6666](https://www.html.cn/archives/10017)

[JavaScript 浮点数运算的精度问题](https://www.html.cn/archives/7340)
[JavaScript 中科学计数法转化为数值字符串形式](https://www.html.cn/archives/9318)
[JavaScript 格式化数字、金额、千分位、保留几位小数、舍入舍去…](https://www.html.cn/archives/7324)

[JavaScript 等值比较 == ，=== 和 Object.is() 666](https://www.html.cn/archives/7977)
[JavaScript-Equality-Table](https://github.com/dorey/JavaScript-Equality-Table)
[JavaScript 中 undefined 和 null 的区别 66666](https://www.html.cn/archives/6236)
[JavaScript 数据类型判断 666](https://www.html.cn/archives/10016)
