---
title: require-dir增强require的使用
date: 2018-03-07 13:51:00
tags:
- vue
- node
- require-dir
- require
categories:
- newbie项目
comments: false
permalink:
---
# require-dir Helper to require() diretories

本来require()只能读一个文件,现在用了这个后就能读取一个目录,当做一个对象就可以使用了

## 例子

一个目录结构

```shell
dir
+ a.js
+ b.json
+ c.coffee
+ d.txt
```

在使用`requireDir('./dir')` 后将会返回:看不懂这个requireDir见下面使用

```javascript
//也可以看到这个只是名字,而不是扩展名也有,所以有options duplicate
{ a: require('./dir/a.js')
, b: require('./dir/b.json')
}
```

## 安装

```javascript
//注意这个package不是requireDir
npm install require-dir
```

## 使用

基本使用

```javascript
var requireDir = require('require-dir')
var dir = requireDir('./path/to/dir')
```

自定义使用,增加参数options

```javascript
var dir = requireDir('./path/to/dir', {recurse: true});
```

## Options

* `recurse`: 是否在子文件夹中递归 `require()` . (node_modules 中的会被忽略.) 默认 false.
* `duplicates`: 默认预设的,如果多个文件有相同的名字(**注意这个只看名字,不看扩展名**),只有最高优先权的 `require()`'d 会返回. (优先权通过`require.extensions` keys的顺序决定,如果 `recurse` is true那么文件夹的优先权大于文件.) Specifying this option `require()`'s all files and returns full filename keys in addition to basename keys. 默认 false.

例如.在上面那个例子中, 如果多了一个叫 `a.json`的, 那么结果还是一样, 但如果改了 `duplicates: true` 结果如下:

```javascript
{ a: require('./dir/a.js')
, 'a.js': require('./dir/a.js')
, 'a.json': require('./dir/a.json') //多了这个
, b: require('./dir/b.json')
, 'b.json': require('./dir/b.json')
}
```

* `filter`: 就是过滤器,在使用require前过滤夏文件名. 例如在生成环境中忽略dev开头的文件:

```javascript
requireDir('./dir', {
  filter: function (fullPath) {
    return process.env.NODE_ENV !== 'production' && !fullPath.match(/$dev/);
  }
})
```

* `mapKey`: 在require-ing后对 module base name进行转换. 例如将  any module names 都大写:

```javascript
requireDir('./dir', {
  mapKey: function (value, baseName) {
    return baseName.toUpperCase();
  }
})
```

* `mapValue`: 这个是对value. For example, uppercasing any text exported:

```javascript
requireDir('./dir', {
  mapValue: function (value, baseName) {
    return typeof value === 'string' ? value.toUpperCase() : value;
  }
})
```

## Tips

如果你想在多个文件中使用同一个文件夹下的 `require()` , 你就单独建一个 `index.js` 文件 然后如下:

```javascript
module.exports = require('require-dir')();   // defaults to '.'
```

And don't worry, the calling file is always ignored to prevent infinite loops.



