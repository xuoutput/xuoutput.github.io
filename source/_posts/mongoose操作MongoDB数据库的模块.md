---
title: mongoose操作MongoDB数据库的模块
date: 2018-03-07 10:16:54
tags:
- vue
- node.js
- mongodb
- mongoose
categories:
- newbie项目
comments: false
permalink:
---
# mongoose让你用js的方式来操纵mongodb数据库

[入门](https://www.cnblogs.com/bax-life/p/7795061.html)

[官网Quick Start](http://mongoosejs.com/docs/index.html)

首先理下思路

1. 有个数据库叫mongodb
2. nodejs中有个模块叫mongoose
3. nodejs不通过shell命令行而是通过使用mongoose的API来控制mongodb

## quick start

### 安装mongoose

```javascript
npm install mongoose
```

### 例子

例子就是我们想在mongodb中创建一个叫test的数据库,然后再数据库中增加一个collection,这个collection中存入fuzzy kittens

这其实就对应着3块,Schemas，Models，Documents

### 使用开始

要在nodejs中使用mongoose,先得连接mongodb数据库.指的是在shell中

```shell
mongod --dbpath d:/db
```

不懂得话先看mongodb教程熟悉一下.然后

```javascript
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
```

当然这个test同mongodb那样,要存入数据口才能show dbs看到

接下来看看有没有连接成功

```javascript
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });

var db = mongoose.connection;
//这里就是说连接成功的话会打印出coneect success,失败的话会打印出失败的信息
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect success')
});
```

然后启动

```javascript
node app.js
```

接着连接成功,那么如何往MongoDB中存入数据呢,这个看例子,注意理清Schema,Model,Documents关系

```javascript
//Schema,相当于规定好数据的属性
var kittySchema = mongoose.Schema({
    name: String
});

//这边还可以插入方法,但只能放这里哦

//Model 依照上面那个大纲,实例化一个collection,Kitten在mongodb中会加上s
var Kitten = mongoose.model('Kitten', kittySchema);

//Documents,这里就是填入具体数据了
var silence = new Kitten({ name: 'Silence' });

//将数据保存到数据库里面去，没有这一步，数据库是不会被建立的,下面有详细展开这个save参数
silence.save();
```

接着上面,除了规定属性外,当然还有方法咯(**注意顺序**)

```javascript
//给猫加个猫猫叫
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

//这是和上面一样的model
var Kitten = mongoose.model('Kitten', kittySchema);
//这也是上面一样的,注意方法调用也很方便
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
```

接下来就是保存到MongoDB数据库中了

```javascript
//将Documents存入MongoDB中去,第一个参数是error的callback
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});
```

当然存入后还能查找所有kittens中的(find咯),和save一样的格式

```javascript
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
```

过滤下查找结果,条件查找,查找所有name叫fluff的,然后通过callback返回一组array

```javascript
Kitten.find({ name: /^fluff/ }, callback);
```

## 配置

