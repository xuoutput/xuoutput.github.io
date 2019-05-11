---
title: javascript-异常处理
date: 2019-05-11 19:48:37
tags:
- 高阶函数
categories:
- javascript教程
comments: false
permalink:
---

# javascript-异常处理

当代码遇到异常问题时，处理这种情况的惯用 `JavaScript` 方法是通过异常处理。

## 创建异常处理

使用 `throw` 关键字创建一个异常：

JavaScript 代码:

```javascript
throw value;
```

其中 `value` 可以是任何 `JavaScript` 值，**包括字符串，数字或对象**。 只要 `JavaScript` 执行此行，就会**暂停**正常的程序流，并将控件保留回最近的 **异常处理程序**。

## 异常处理

异常处理程序是 `try / catch` 语句。 在 `try` 块中包含的代码行中引发的任何异常都在相应的 `catch` 块中处理：

JavaScript 代码:

```javascript
try {
  //lines of code
} catch (e) {}
```

在此示例中， `e` 是**异常值**。

您可以添加多个处理程序，可以捕获不同类型的错误。

## finally

要完成此语句，`JavaScript` 还有另一个名为 `finally` 的语句，其中包含无论是否处理了异常，是否存在异常或是否存在异常，**程序流程如何都执行的代码**：

JavaScript 代码:

```javascript
try {
  //lines of code
} catch (e) {
} finally {
}
```

您可以在没有 `catch` 块的情况下使用 `finally` ，以便**清除**可能在 `try` 语句块中打开的任何资源，**如文件或网络请求**：

JavaScript 代码:

```javascript
try {
  //lines of code
} finally {
}
```

## 嵌套 try 语句块

`try` 语句块可以嵌套，并且总是在最近的 `catch` 语句块中处理异常：

JavaScript 代码:

```javascript
try {
  //lines of code
  try {
    //other lines of code
  } finally {
    //other lines of code
  }
} catch (e) {}
```

如果在内部 `try` 中引发异常，则在外部 `catch` 块中处理它。

## 参考

[JavaScript 异常处理 – JavaScript 完全手册（2018 版）](https://www.html.cn/archives/10060)
