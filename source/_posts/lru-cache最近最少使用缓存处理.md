---
title: lru_cache最近最少使用缓存处理
date: 2018-03-07 11:12:20
tags:
- vue
- node.js
- lru-cache
categories:
- newbie项目
comments: false
permalink:
---
# LRU是Least Recently Used 的缩写，翻译过来就是“最近最少使用”。

LRU缓存的处理方式如其命名，在固定的缓存空间下，把最近最少使用的数据移除，让给最新读取的数据。算法假设最常读取的数据一般也是访问次数最多的，尽力保留这部分数据可以提高cache的命中。

[lru-cache](https://npm.taobao.org/package/lru-cache)

## 例子

在保持几个从MongoDB中取出来的数据

## 使用

```javascript
var LRU = require("lru-cache")
//默认接受max,下面的参数都是可选的
otherCache = LRU(50) // sets just the max size

options = {
    max: 500,
    length: function (n, key) {
        return n * 2 + key.length
        },
    dispose: function (key, n) { 
        n.close() 
    },
    maxAge: 1000 * 60 * 60
}
cache = LRU(options)

cache.set("key", "value")
cache.get("key") // "value"

// non-string keys ARE fully supported
var someObject = {}
cache.set(someObject, 'a value')
cache.set('[object Object]', 'a different value')
assert.equal(cache.get(someObject), 'a value')

cache.reset()    // empty the cache
```

当然要注意数据不能放太多,不然溢出

### Options

* `max` cache的最大长度,使用length函数来对所有值检查合法性.必须设置,不然默认无穷大.
* `maxAge` 以ms为单位的最大逗留时间.
* `length` 这是一个Function用来计算 the length of stored items.
    > 你在存储 strings or buffers时, 你可能想要做如下 `function(n, key){return n.length}`. The default is `function(){return 1}`, 表示你存储大小规模是 `max` 那设置就没事. The item is passed as the first argument, and the key is passed as the second argumnet.
* `dispose` 这个Function 是用来将items从cache中drop的. 当你关闭文件或做其他清除cache工作时,不需要用到这些items时可以使用. Called with `key, value`. 实际上是先call再把这个item是从内部cache中remove,如果你想立即put it back in, you'll have to do that in a `nextTick` or `setTimeout` callback or it won't do anything.
* `stale` By default, if you set a `maxAge`, 只有当你使用`get(key)` 他才会真正把 stale items 拉出cache . (也就是说在做`setTimeout` or `anything`前并不能做其他事.)
    1. 如果你设置stale:true, 在你删除这个stale value前,他会返回给你.
    2. 如果你没有设置这个值, 那么当你试图get a stale entry,  他会返回undefined , 因为他已经被删除了
* `noDisposeOnSet` By default, 如果你设置了 `dispose()` 方法,当你使用 `set()` 操作来重写一个已经存在的key时,他会被调用 If you set this option, `dispose()` will only be called when a key falls out of the cache, not when it is overwritten.

### API

* set(key, value, maxAge)

* get(key) => value

Both of these will update the "recently used"-ness of the key. They do what you think. `maxAge` is optional and overrides the cache `maxAge` option if provided.

If the key is not found, `get()` will return `undefined`.

The key and val can be any value.

* peek(key)

Returns the key value (or `undefined` if not found) without updating the "recently used"-ness of the key.

(If you find yourself using this a lot, you might be using the wrong sort of data structure, but there are some use cases where it's handy.)

* del(key)

Deletes a key out of the cache.

* reset()

Clear the cache entirely, throwing away all values.

* has(key)

Check if a key is in the cache, without updating the recent-ness or deleting it for being stale.

* forEach(function(value,key,cache), [thisp])

Just like `Array.prototype.forEach`. Iterates over all the keys in the cache, in order of recent-ness. (Ie, more recently used items are iterated over first.)

* rforEach(function(value,key,cache), [thisp])

The same as `cache.forEach(...)` but items are iterated over in reverse order. (ie, less recently used items are iterated over first.)

* keys()

Return an array of the keys in the cache.

* values()

Return an array of the values in the cache.

* length

Return total length of objects in cache taking into account length options function.

* itemCount

Return total quantity of objects currently in cache. Note, that `stale` (see options) items are returned as part of this item count.

* dump()

Return an array of the cache entries ready for serialization and usage with 'destinationCache.load(arr)`.

* load(cacheEntriesArray)

Loads another cache entries array, obtained with `sourceCache.dump()`, into the cache. The destination cache is reset before loading new entries

* prune()

Manually iterates over the entire cache proactively pruning old entries