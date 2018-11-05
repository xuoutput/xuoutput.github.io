---
title: md5使用MD5来hash
date: 2018-03-07 09:18:57
tags:
- vue
- node
- md5
categories:
- newbie项目
comments: false
permalink:
---
# 使用MD5来哈希消息的一个js函数

## 版本

version 2.0.0 前有2个package谁叫md5 on npm,一个小写,一个大写(你看到的这个就是). version 2.0.0之后,所有的版本就都是小写的md5 on npm. 如果你想在versions >= 2.0.0正确使用这个module,那么你就得改一下 require('MD5') 为 require('md5')  .

[淘宝地址md5](http://npm.taobao.org/package/md5)

## 安装

```javascript
npm install md5
```

## API

```javascript
md5(message)
```

* message: String or Buffer
* 返回    String

## 使用

```javascript
var md5 = require('md5');
console.log(md5('message'));
```

结果

```javascript
78e731027d8fd50ed642340b7c9a63b3
```

如果支持buffer

```javascript
var fs = require('fs'); //这个fs不是通过npm安装,而是node自带的
var md5 = require('md5');

fs.readFile('example.txt', function(err, buf) {
  console.log(md5(buf));
});
```