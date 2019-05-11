---
title: javascript-引号
date: 2019-05-11 19:55:24
tags:
---

# javascript-引号

现在我们来看看 JavaScript 中允许使用的引号及其独特的特性。

JavaScript 允许您使用 3 种类型的引号：

- 单引号（`'`）
- 双引号（`"`）
- 反引号 (`)

前 2 个基本相同：

JavaScript 代码:

```javascript
const test = 'test';
const bike = 'bike';
```

使用这 2 种方法几乎没有差别。唯一的**区别在于必须转义用于分隔字符串的引号字符**：

JavaScript 代码:

```javascript
const test = 'test';
const test = "te'st";
const test = 'te"st';
const test = 'te"st';
const test = "te'st";
```

有各种风格指南，**建议始终使用一种风格**与另一种风格。

我个人更喜欢**单引号**，并且只在 `HTML` **中使用双引号**。

反引号 (`) 是 JavaScript 的最新成员，因为它们在 2015 年 ES6 才推出。

它们具有独特的功能：**它们允许多行字符串**。

使用**转义字符**，常规字符串也可以转换为多行字符串：如`\n`

JavaScript 代码:

```javascript
const multilineString = 'A string\non multiple lines';
```

使用反引号，则可以**避免使用转义字符**： 直接换行就好

JavaScript 代码:

```javascript
const multilineString = `A string
on multiple lines`;
```

不仅如此。您可以使用 `${}` 语法插入变量或表达式：

JavaScript 代码:

```javascript
const multilineString = `A string
on ${1 + 1} lines`;
```

我们将在一篇单独的文章中介绍了`反引号驱动的字符串`，称为[字面量模板（Template Literals）](https://www.html.cn/archives/10095)，它更深入地介绍了更多细节。

## 参考

[JavaScript 中的引号 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10088)
