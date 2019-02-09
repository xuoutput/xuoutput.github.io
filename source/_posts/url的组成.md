---
title: url的组成
date: 2019-01-31 20:09:33
tags:
- url
categories:
- 网络
comments: false
permalink:
---

# url的组成

## whatwg标准

[whatwg](https://url.spec.whatwg.org/)

WHATWG 的 `API` 与遗留的 `API` 的区别如下。 在下图中，URL `'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'` 上方的是遗留的 `url.parse()` 返回的对象的属性。 下方的则是 `WHATWG` 的 URL 对象的属性。

WHATWG 的 `origin` 属性包括 `protocol` 和 `host`，但**不包括** `username` 或 `password`。

```JavaScript
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

host是hostname + port
origin是protocol(这个有个`:`) + host
然后后面是pathname(这个有`/`), search(这个有`?`), hash(这个有`#`)

username:password这个是用来保护url的, 而不是用来登录的.

比如在ftp中, 你的浏览器登录后会使用`anonymous`, 所以你可以指定某一个`username`来, 只不过对于`password`不建议使用. 会被窃听到的, 况且还有https这个呢.

## 参考

[nodejs中 URL 字符串与 URL 对象](http://nodejs.cn/api/url.html#url_url_strings_and_url_objects)
[Specifying username/password in a URL](https://www.cs.rutgers.edu/~watrous/user-pass-url.html)