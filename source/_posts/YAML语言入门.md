---
title: YAML语言入门
date: 2019-02-12 11:37:53
tags:
- yaml
categories:
- YAML
comments: false
permalink:
---

# YAML语言入门

YAML 是专门用来**写配置文件**的语言，非常简洁和强大，远比 `JSON` 格式方便。

## 二 对象

对象的一组键值对，使用冒号结构表示。(**记住这个是基本的结构**)

```yaml
animal: pets
```

转为 `JavaScript` 如下。

```JavaScript
{ animal: 'pets' }
```

`Yaml` 也允许另一种写法，将所有键值对写成一个行内对象。

```yaml
hash: { name: Steve, foo: bar } 
```

转为 `JavaScript` 如下。

```JavaScript
{ hash: { name: 'Steve', foo: 'bar' } }
```

然后是多个的

```yaml
YAML: yaml.org
Ruby: ruby-lang.org
Python: python.org
Perl: use.perl.org
```

转为 `JavaScript` 如下。

```JavaScript
{
    YAML: 'yaml.org',
    Ruby: 'ruby-lang.org',
    Python: 'python.org',
    Perl: 'use.perl.org'
}
```

## 三 数组

一组连词线开头的行，构成一个数组。

```yaml
- Cat
- Dog
- Goldfish
```

转为 `JavaScript` 如下。

```JavaScript
[ 'Cat', 'Dog', 'Goldfish' ]
```

数据结构的子成员是一个数组，则可以在该项下面**缩进一个空格**。

```yaml
-
 - Cat
 - Dog
 - Goldfish
```

转为 `JavaScript` 如下。

```JavaScript
[ [ 'Cat', 'Dog', 'Goldfish' ] ]
```

数组也可以采用行内表示法。

```yaml
animal: [Cat, Dog]
```

转为 `JavaScript` 如下。

```JavaScript
{ animal: [ 'Cat', 'Dog' ] }
```

## 四、复合结构

对象和数组可以结合使用，形成复合结构。

```yaml
languages:
 - Ruby
 - Perl
 - Python
websites:
 YAML: yaml.org
 Ruby: ruby-lang.org
 Python: python.org
 Perl: use.perl.org
```

转为 `JavaScript` 如下。

```JavaScript
{ languages: [ 'Ruby', 'Perl', 'Python' ],
  websites:
   { YAML: 'yaml.org',
     Ruby: 'ruby-lang.org',
     Python: 'python.org',
     Perl: 'use.perl.org'
   }
}
```

> 从上面可以得出写法, **从最里层往外看**,就可以转成`JavaScript`的写法

## 五、纯量

纯量是最基本的、不可再分的值。以下数据类型都属于 `JavaScript` 的纯量。

- 字符串
- 布尔值
- 整数
- 浮点数
- Null
- 时间
- 日期

`null`用`~`表示。

```yaml
parent: ~
```

转为 `JavaScript` 如下。

```JavaScript
{ parent: null }
```

时间采用 `ISO8601` 格式。

```JavaScript
iso8601: 2001-12-14t21:59:43.10-05:00 
```

转为 `JavaScript` 如下。

```JavaScript
{ iso8601: new Date('2001-12-14t21:59:43.10-05:00') }
```

日期采用复合 `iso8601` 格式的年、月、日表示。

```yaml
date: 1976-07-31
```

转为 `JavaScript` 如下。

```JavaScript
{ date: new Date('1976-07-31') }
```



## 参考

[YAML 语言教程](http://www.ruanyifeng.com/blog/2016/07/yaml.html)