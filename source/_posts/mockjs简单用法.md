---
title: mockjs简单用法
date: 2018-11-28 10:08:56
tags:
- mock
categories:
- javascript教程
comments: false
permalink:
---

# mockjs简单用法

## 安装

用`npm install mockjs`好了

## 语法规范

Mock.js 的语法规范包括两部分：

1. 数据模板定义规范（Data Template Definition，DTD）
2. 数据占位符定义规范（Data Placeholder Definition，DPD）

### 数据模板定义规范 DTD 我只用到这个

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值**:

```javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value  //有个'
```

**注意**:

* `name` 和 `rule` 之间用竖线 `|` 分隔。 用`'` 包上
* `rule` 是可选的。**在函数和正则那里没有用而已**
* `rule` 有 7 种格式：
    1. 'name|min-max': value
    2. 'name|count': value
    3. 'name|min-max.dmin-dmax': value
    4. 'name|min-max.dcount': value
    5. 'name|count.dmin-dmax': value
    6. 'name|count.dcount': value
    7. 'name|+step': value

`rule` 的 含义 需要依赖 **`value`的类型** 才能确定。
`value` 还指定了最终值的**初始值和类型**
`value` 中可以含有 `@占位符`。

格式中看的 `rule`看`count`和`min-max` 然后就是组合下, 多个`+step`

### 生成规则和示例：

#### 1. 属性值是字符串 `String`

```javascript
'name|count': string        //+step当做count
```

通过重复 `string` 生成一个字符串，重复次数等于 `count`。

```javascript
'name|min-max': string
```

这个也是重复 `string` 生成一个字符串，不过重复次数 `min <= count <= max`。

**忽略这种, 只看整数部分**

```javascript
'name|min-max.dcount/dmin-dmax': string
```

#### 2. 属性值是数字 `Number`

```javascript
'name|+1': number
```

属性值自动**加 1**，初始值为 `number`(**这里是初始值**)。

```javascript
'name|count': number
```

生成一个 等于`count` 的整数，属性值 number 只是用来确定类型(**不是初始值哦**)。

```javascript
'name|min-max': number
```

同理生成一个 `min <= x <= max` 的整数，属性值 number 只是用来确定类型。

```javascript
'name|min-max/count.dmin-dmax/dcount': number
```

生成一个**浮点数**，整数部分同理，小数部分产生count位, **决定小数位数**

#### 3. 属性值是布尔型 `Boolean`

```javascript
'name|1': true
```

随机生成一个布尔值，值为 true 的概率是 1/2, 当然也有1/3, 1/4

```javascript
'name|min-max': value   /value指的是true或false
```

随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。

**忽略小数部分**.

#### 4. 属性值是对象 `Object`

```javascript
'name|count': object
```

```javascript
'name|min-max': object
```

从属性值 `object` 中随机选取 `count` 个属性。或者是`min-max`个

`+step`是直接把所有的属性列出, `count`太大也是把所有的列出.

#### 5. 属性值是数组 `Array`

```javascript
'name|1': array
```

从属性值 `array` 中**随机**选取 1 个元素，作为最终值。

```javascript
'name|+1': array
```

从属性值 `array` 中顺序选取 1 个元素，作为最终值。 但+2/+3都是第一个

```javascript
'name|count': array
```

通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。 同理`min-max`

#### 6. 属性值是函数 `Function`

```javascript
'name': function
```

执行函数 `function`，取其**返回值**作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

#### 7. 属性值是正则表达式 `RegExp`

```javascript
'name': regexp
```

根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

### `Mock.mock()`

`Mock.mock( rurl?, rtype?, template|function( options ) )`

`Mock.mock( template )`
根据数据模板生成模拟数据。

`Mock.mock( rurl, template )`       `Mock.mock( rurl, function( options ) )`

记录数据模板。当拦截到匹配 `rurl` 的 `Ajax` 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 的 `Ajax` 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

`Mock.mock( rurl, rtype, template )`        `Mock.mock( rurl, rtype, function( options ) )`
记录数据模板。当拦截到匹配 `rurl` 和 `rtype` 的 `Ajax` 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 和 `rtype` 的 `Ajax` 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。


