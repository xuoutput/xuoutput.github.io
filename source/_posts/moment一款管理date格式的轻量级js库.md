---
title: moment一款管理date格式的轻量级js库
date: 2018-03-07 09:39:40
tags:
- vue
- node
- moment
categories:
- newbie项目
comments: false
permalink:
---
# [Moment.js](http://momentjs.com/docs/)是一款解析,验证,控制和格式化时间的轻量级javascript库

可以使用在browser和Node.js中

## 安装

### Node.js

```javascript
npm install moment

var moment = require('moment');
moment().format();
```

### Browser

```javascript
//就是使用CDN  在cdnjs.com或jsDelivr上都有
<script src="moment.js"></script>

<script>
    moment().format();
</script>
```

### 官方推荐用Require.js(但我不会)

先通过bower或node_modules安装依赖,然后通过packages config

### Browserify

```javascript
npm install moment

var moment = require('moment');
moment().format();
```

#### **Note**: There is a bug that prevents moment.locale from being loaded.

```javascript
var moment = require('moment');
moment.locale('cs');
console.log(moment.locale()); // en
```

#### Use the workaround below

```javascript
var moment = require('moment');
require('moment/locale/cs');
console.log(moment.locale()); // cs
```

#### In order to include all the locales

```javascript
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('cs');
console.log(moment.locale()); // cs
```

### Typescript 2.13.0+

这个要moment版本大于2.13.0才能用

```javascript
//install via NPM
npm install moment
//Import and use in your Typescript file
import * as moment from 'moment';

let now = moment().format('LLLL');
```

#### **Note**: If you have trouble importing moment, try adding `"allowSyntheticDefaultImports": true` in compilerOptions in your` tsconfig.json` file and then use the syntax

```typescript
import moment from 'moment';
```

#### Locale Import(就是设置时区)

To use `moment.locale` you first need to import the language you are targeting.

```typescript
import * as moment from 'moment';
//就是这个
import 'moment/locale/pt-br';

console.log(moment.locale()); // en
moment.locale('fr');
console.log(moment.locale()); // en
moment.locale('pt-BR');
console.log(moment.locale()); // pt-BR
```

## 解析

为了修改原生的 `Date.prototype`, Moment.js 创建了一个 wrapper for the `Date` object. 获取这个wrapper object, 只需要简单的调用 `moment()` 输入支持的类型即可.

The `Moment` prototype is exposed through `moment.fn`.如果你想增加你自定义的函数,可以通过这个

为了简单使用,所有在 `Moment.prototype`中的方法 都会指到 `moment#method`. So `Moment.prototype.format == moment.fn.format == moment#format`.

### Now

```javascript
moment();
// From 2.14.0 onward, also supported
moment([]);
moment({});
```

获得当前时间只需要调用 `moment()` 不需要参数.

```javascript
var now = moment();
```

本质上就是和调用 `moment(new Date())`一样.

**Note**: From version 2.14.0, `moment([])` and `moment({})` also return now. They used to default to start-of-today before 2.14.0, but that was arbitrary so it was changed.

### String

要用到时查下
