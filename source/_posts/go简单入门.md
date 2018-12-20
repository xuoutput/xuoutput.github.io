---
title: go简单入门
date: 2018-12-20 14:12:59
tags:
- go
categories:
- go教程
comments: false
permalink:
---

# go简单入门

## go简介

go4个好处:

1. 不依赖别的库, 拿来就可以跑.
2. 静态语言, 又有动态语言的特性.
3. 并发
4. GC

用在: 服务器, 分布式, 云平台, 网络平台, 内存数据库cache

## 语法

变量声明/常量声明

```go
// 变量
var a int = 5
var (
    a int = 5
    b float64 = 9.9
)
// 多一个:=
a := 5
a, b : = 4, 6

// 常量
const b int = 6
const {
    a int = 5
    b float64 = 8.98
}
```

匿名变量`_`: 用来丢弃不处理, 常用在处理函数返回值

常量自动生成`iota`: 4点

1. 遇到`const`自动重新开始0
2. 可以只写一行`iota`, 下面的行默认加上去
3. 以行为单位递增






