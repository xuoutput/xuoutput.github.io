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

___

命令行参数，用导入os的包`import 'os'`，然后`os.Args`  。字符数组。

局部变量和全局变量
在`{}`中就是局部，块

工作区`src`  `GOPATH`

```go
import (
    "fmt"
    "os"
)
```

`import .  "fmt"`   不建议，这个调用就不用包名了, 直接用比如`println`

别名  `import lll "fmt"`

忽略包  `import _ "fmt"`  一般使用这个包的`init`函数

工程文件下要有`src` ,`GOPATH`就是工程的路径，不进去`src`
同一个路径下`package <nane>`这个`<name>`要一样。**同一个目录下**调用别的文件的，不需导入包名，直接调用好了。

**不同目录包名**不一样，同fmt一样导入好了，然后使用，但要注意，**函数名要大写开头**。私有公有的问题。

`init`函数，会在那个包的所有函数之前运行，**执行一次好了，就是每个包运行前会执行**`init`
所以那个`import _ "fmt"`只是用来执行init的

`GOBIN`设置后用`go install`生成`pkg  bin`文件夹，一个放依赖，一个命令可执行程序。


___

复合结构 

point array slice map struct

指针point不支持`->`这种算法
go中的是nil,不是null

* &  这种和c语言一样(只是没有`->`)

`new(int)`分一个int大小的空间, 操作内存.

数组, 同一个类型的, 要固定长(常量 ), 不能变, 同c   `len()`  初始化不同 `{}`
```go
var a [12]int
```

数组声明同时赋值

```go
var a [5]int = [5]int{1, 2, 3, 4, 5}

// 部分
c := [5]int{1,2,3}
// 指定下标
d := [5]int{2:10, 4:20}
```

二维数组(了解), 看有多少个`[]` 多少维 多少循环

同一维 `{{ 两个花括号 }}`是用来初始化, 和c不同


```go
// 表示下标1的行那4个
e := [3][4]int{1: {5,6,7,8}}
```

数组比较`==` 和 `!=` 比较的事每个数组元素是不是一样

___

随机数

1. 设置种子     `rand.Seed(666)`        如果种子一样, 每次的随机数就一样, 所以用时间来做随机种子`time.Now().UnixNano()`
2. 产生随机数   `rand.Int()`        `rand.Intn(100)`限制在100内


数组做函数参数, 是值传递, 不是引用哦, 相当于copy一份, 注意哦. 当然可以用指针的方式去

```go
// 按值
func a(p [5]int)
// 按引用
func a(p *[5]int)
```

slice 弥补数组缺点, 通过内部指针和相关属性引用数组片段, 以实现变长方案.

```go
array := [...]int{10, 20, 30, 0, 0}
// 起始指针位置low, 终止位置high, 切完后要的总容量max
slice := array[0:3:5]   //[low: high: max]
[)  起点,终点, 长度
len长度是high - low
cap容量是max - low
```

切片和数组的区别: 数组的len是固定常量, 不能修改. 切片 方括号里面是空或...

```go
[6]int{}

[]int{}
[...]int{}
```

切片创建
// 自动推导

// 用make

```go
// 类型, 长度, 容量
s2 := make([]int, 5, 10)
// len和max一样
s3 := make([]int, 5)

len()  cap()
```

截取: 

```go
[low:high:max]
就是len是high-low
cap是max-low


[:6]  // 长度是6 但容量是原来的数组容量, 不是len = max

```

切片会改变原来的数组

`append`在slice末尾加一个元素, 会扩容的, 超过cap会以2倍扩容.

copy

```go
copy(dst, src)
是替换过去覆盖相应位置元素
```

当函数参数的话, slice是引用传递, 不是值传递. 不用加&, 直接变量传过去.

map就是无序key-value


```go
// map[keyType] valueType  只有len没有cap, 用make的话那个是指定容量了, 还会扩容
map[int]string {
    110: 'mike'
}
```










