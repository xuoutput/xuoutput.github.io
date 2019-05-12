---
title: javascript-字面量模板
date: 2019-05-12 14:50:53
tags:
- 字面量模板
categories:
- javascript教程
comments: false
permalink:
---

# javascript-字面量模板

在 ES2015（又名 ES6）中引入，字面量模板提供了一种**声明字符串的新方法**，但也提供了一些已经广泛流行的新有趣的结构。

## 字面量模板简介

字面量模板是 ES2015 / ES6 的新功能，与 ES5 及更低版本相比，它允许您以新颖的方式处理字符串。

乍一看语法非常简单，只需使用**反引号**而不是单引号或双引号：

JavaScript 代码:

```javascript
const a_string = `something`;
```

它们是独特的，因为它们提供了许多用引号构建的普通字符串**所特有的特性**：

- 它们提供了很好的语法来定义**多行字符串**
- 它们提供了一种在字符串中**插入变量和表达式**的简便方法
- 他们允许使用模板标签创建 `DSL`

让我们详细了解一下每个特性。

## 多行字符串

> 换行后每行前的**空格**都会保留. **无论单引号还是反引号**

在 ES6 之前，要创建一个**跨越两行**的字符串，您必须在一行的**末尾**使用 `\` 字符：

> **跨越**指输入时分两行输入, 还是显示一行, 显示为两行用 `\n` 控制的

JavaScript 代码:

```javascript
const string =
  'first line\n \
second line';
```

或者

JavaScript 代码:

```javascript
const string = 'first line\n' + 'second line';
```

字面量模板使多行字符串更加简单。

使用`反引号`打开字面量模板后，只需按 `Enter` 键即可创建一个没有特殊字符的新行，并按原样渲染：

JavaScript 代码:

```javascript
const string = `Hey
this

string
is awesome!`;
```

请记住，**空格**是有意义的，所以这样做：

JavaScript 代码:

```javascript
const string = `First
                Second`;
```

上面的代码将创建一个这样的字符串：

JavaScript 代码:

```javascript
First;
Second;
```

解决这个问题的一个**简单方法**是使**第一行空掉**，并在关闭反引号后立即跟随 `trim()` 方法去掉首尾空格, 中间的空格不会去，这将**消除第一个字符前的任何空格**：

JavaScript 代码:

```javascript
const string = `First Second`.trim();
```

## 插值

> 这块讲的不怎么清楚, `literals`是个啥, `expressions`是个啥

模板标签是一种乍听起来可能不太有用的特性，但实际上它被许多流行的库所使用，比如 `Styled Components` 或 `Apollo` ，`GraphQL` 客户端/服务器库，因此了解它是如何工作的必不可少。

在 `Styled Components` 模板标签中用于定义 CSS 字符串：

JavaScript 代码:

```javascript
const Button = styled.button`
  font-size: 1.5em;
  background-color: black;
  color: white;
`;
```

在 `Apollo` 中，模板标签用于定义 `GraphQL` 查询模式：

JavaScript 代码:

```javascript
const query = gql`
  query {
    ...
  }
`;
```

这些示例中 `styled.button` 和 `gql` 模板标签只是 `函数` ：

JavaScript 代码:

```javascript
function gql(literals, ...expressions) {}
```

这个函数返回一个字符串，这个字符串可以是任何类型计算的结果。

`literals` 是一个**数组**，包含由表达式插值标记的**字面量模板内容**。

`expressions` 包含所有**插值**。

如果我们举一个上面的例子：

JavaScript 代码:

```javascript
const string = `something ${1 + 2 + 3}`;
```

`literals` 是一个包含两个项的数组。 第一个是 `something` ，直到第一个插值的字符串，第二个是`空字符串`，第一个插值的结尾（我们只有一个）和字符串的结尾之间的空格。

在这种情况下，`expressions` 是一个包含单个项元素的数组，`6` 。

一个更复杂的例子是：

JavaScript 代码:

```javascript
const string = `something
another ${'x'}
new line ${1 + 2 + 3}
test`;
```

在这种情况下，`literals` 是一个数组，其中第一项是：

JavaScript 代码:

```javascript
`something
another `;
```

第二个是：

JavaScript 代码:

```javascript
`
new line `;
```

第三个是：

JavaScript 代码:

```javascript
`
test`;
```

在这种情况下，`expressions` 是一个包含两个项 `x` 和 `6` 的数组。

传递这些值的函数可以用这些值做任何事情，这就是这种特性的强大之处。

最简单的例子是通过简单地连接 `literals` 和 `expressions` 来复制字符串插值的作用：

JavaScript 代码:

```javascript
const interpolated = interpolate`I paid ${10}€`;
```

这就是 `interpolate` 的工作原理：

JavaScript 代码:

```javascript
function interpolate(literals, ...expressions) {
  let string = ``;
  for (const [i, val] of expressions) {
    string += literals[i] + val;
  }
  string += literals[literals.length - 1];
  return string;
}
```

## 参考

[JavaScript 字面量模板（Template Literals）指南 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10095)
