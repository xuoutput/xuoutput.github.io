---
title: koa的一些middleware
date: 2018-03-07 19:36:14
tags:
- koa
categories:
- newbie项目
comments: false
permalink:
---
# koa的一些常用的middleware

[直接去github中的koa的wiki中搜](https://github.com/koajs/koa/wiki)

## Frameworks

Frameworks, boilerplates and other starter kits using Koa.

## Middleware

Known middleware for Koa, you may want to search npm with "koa" to find more.

## Security

## Body Parsing

## Parameter Validation

## Rate Limiting

## Vhost

## Routing and Mounting

## Documentation

## File Serving

### koa-static

静态文件服务中间件,是`koa-send`的包装

#### 安装

```javascript
npm install koa-static
```

#### API

```javascript
API
const Koa = require('koa');
const app = new Koa();
//有点不同哦，还是看下面例子好了
app.use(require('koa-static')(root, opts));
```

* `root` 根目录 String
* `opts` options object.

#### Options

* `maxage` 浏览cache的最大时间ms 默认 0
* `hidden` 允不允许改变隐藏文件. 默认 false
* `index` 默认文件名, 默认 'index.html'
* `defer` 如果为true, 在 `return next()`之后, 服务器允许任何一个downstream middleware 首先回应.
* `gzip` 当用户支持gzip格式, 并且.gz这种文件存在就行. 默认 true.
* `br` 同上 .br 格式存在时 (但要注意这个只用在https中). 默认 true.
* `setHeaders` Function to set custom headers on response.
* `extensions` 当在URL中没有匹配到扩展名时,那么会试着去从传过来的数组中匹配. 默认 false

#### Example

```javascript
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

// $ GET /package.json
app.use(serve('.'));

// $ GET /hello.txt
app.use(serve('test/fixtures'));

// or use absolute paths
app.use(serve(__dirname + '/test/fixtures'));

app.listen(3000);

console.log('listening on port 3000');
```

## SPDY

## HTTP2

## JSON and JSONP Responses

## Compression

## Caching

## Authentication

## Sessions

## Templating

## Services

## CSS Preprocessor

## Livereload

## Error reporting

### koa-onerror

就是一个抓错误的处理器 for koa, **hack** ctx.onerror.
就是handle all errors, steams' and events' errors

比koa-error使用简单,且抓的错误多

#### 安装

```javascript
npm install koa-onerror
```

## 使用

```javascript
const fs = require('fs');
const koa = require('koa');
const onerror = require('koa-onerror');

const app = new koa();
//这里就是使用咯
onerror(app);

app.use(ctx => {
  // foo();
  ctx.body = fs.createReadStream('not exist');
});
```

#### Options

```javascript
onerror(app, options);
```

* all: if options.all exist, ignore negotiation
* text: text error handler
* json: json error handler
* html: html error handler
* redirect: if accepct html, can redirect to another error page

check out default handler to write your own handler.

#### Status and Headers

`koa-onerror` will automatic set `err.status` as response status code, and `err.headers` as response headers.


## Logging

### koa-logger

Development **style logger** middleware for koa.

**注意: `koa-logger@2` 支持 `koa@2`; 如果你想在 `koa@1`中使用, 请使用 `koa-logger@1`.**

```javascript
<-- GET /
--> GET / 200 835ms 746b
<-- GET /
--> GET / 200 960ms 1.9kb
<-- GET /users
--> GET /users 200 357ms 922b
<-- GET /users?page=2
--> GET /users?page=2 200 466ms 4.66kb
```

#### 安装

```javascript
npm install koa-logger
```

#### 使用

```javascript
const logger = require('koa-logger')
const Koa = require('koa')

const app = new Koa()
app.use(logger())
```

#### Notes

Recommended that you `.use()` this middleware near the top to "wrap" all subsequent middleware.
就是在顺序上放最上面来`app.use(logger())`

## Metrics

## Analytics

## i18n or L10n

## Response Transformation

## Utilities

### koa-convert

就是将只能在koa1中使用的middleware转换成koa2中能用的,当然也能反之咯.**但注意有些不能转换** 比如`koa-router`

#### 安装

```javascript
npm install koa-convert
```

#### 使用

```javascript
const Koa = require('koa') // koa v2.x
const convert = require('koa-convert')
const app = new Koa()
//这是正常是用koa2的middleware
app.use(modernMiddleware)
//这是使用koa2之前的版本,加上convert
app.use(convert(legacyMiddleware))
//这是一起用,混合
app.use(convert.compose(legacyMiddleware, modernMiddleware))

function * legacyMiddleware (next) {
  // before
  yield next
  // after
}

function modernMiddleware (ctx, next) {
  // before
  return next().then(() => {
    // after
  })
}
```

#### 关于区分 legacy and modern middleware

就一个意思,通过 `fn.constructor.name == 'GeneratorFunction'`来判断版本.

#### API

就3个,实现不管新版本还是旧版本都能使用middleware
一个将老的middleware转成新的,
一个混合老的和新的middleware都转成新的,
一个将新的middleware转成老的

* convert()

```javascript
modernMiddleware = convert(legacyMiddleware)
```

* convert.compose()

```javascript
composedModernMiddleware = convert.compose(legacyMiddleware, modernMiddleware)
// or
composedModernMiddleware = convert.compose([legacyMiddleware, modernMiddleware])
```

* convert.back()

```javascript
legacyMiddleware = convert.back(modernMiddleware)
```