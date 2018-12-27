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

go的常用变量类型
`bool` `int32` `float64`
`byte` `string` 类比c 一个是单个字符, 一个是字符串, 多一个`\0`  单双引号

%T
%c %s %d %f %t
%v

'a'这种也就是整型 int32

输入输出使用

```go
fmt.Printf()
fmt.Println()
fmt.Scanf()
fmt.Scan()
```

int() 强转, 注意不兼容类型 int 和 bool  go的bool和int不兼容啊

byte int

类型别名, type来定义下

```go
type bigint int64
type (
    long int 64
    char byte
)
```

操作符同c javascript  一样啦 没有 ===

流程控制

```go
// 没括号
if s {  // 不能换行哦

}

if a := 10; a == 10 {    // 支持一个初始化语句, 按分号隔开

}

// 支持一个初始化语句, 同if 用分号隔开
switch num {
    case 1 :
        fmt
    case 2:
        break       // fallthrough 是不跳出switch 接着往下执行
    default:
}

switch后面也可以不加条件,只初始化, 加在case中判断
score: 85
switch {
    case score > 90 :
        fmt
}
```

for 初始条件; 判断条件; 条件变化  同c 就是少个括号()

range 迭代

```go
// 返回一个元素位置和一个元素本身
for i, data := range str {
    fmt()
}
for i := range str { // 只要下标
    fmt()
}
```

go的不定参数,  (a ...int)  而(a...)是展开, 
更高级的是指定从哪个下标开始到结束用`[)`

比如 `(a[2:]...)`  从下标2开始包括2到最后
比如 `(a[:2]...)`  到下标为2不包括2

```go
func a()(res int) {     // 定义了返回的类型
    return              // 这里只写return表示返回前面的定义的格式吗但建议还是写全好了
}
```

函数名首字母是大写表示私有, 大写表示公有的函数.

函数类型

```go
type FFF func(int, int) int     // 输入2个, 输出1个
```

格式对好就行, 然后相同参数返回值的函数, 到时候调用. 先声明赋值后, 直接就可以像原来的函数调用一样. 更具有普遍性.

`t=add t(1,2)`

涉及多态, 就是不写死. 比如`sort()`

闭包, 匿名函数, 立即调用
`func () {}`

闭包以引用的方式捕获外部变量,

传统的局部变量是调用时才分配空间，然后调用完就回收了

`defer` 延时调用，在调用完前处理东西，只能用在函数内部。
类似异步后放最后用，然后多个`defer`是按照后进先出，的顺序的！！就是入栈了先！

然后`defer`是肯定能执行，发生错误也能。就是栈。

`defer func()`  这种个匿名函数一起用。

注意传入的参数是那个时候的。



