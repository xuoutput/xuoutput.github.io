---
title: 在前端用JavaScript来实现下载
date: 2019-04-08 20:26:42
tags:
- javascript
- a
- download
categories:
- javascript教程
comments: false
permalink:
---

# 在前端用JavaScript来实现下载

很多情况下我们都只能给出个链接，让用户点击打开->另存为。如下面这个链接：

```html
<a href=”file.js”>file.js</a>
```

用户点击这个链接的时候，浏览器会打开并显示链接指向的文件内容，显然，这并没有实现我们的需求。

幸好，HTML 5 里面为 `<a>` 标签添加了一个 `download` 的属性，我们可以轻易的利用它来实现下载功能。

```html
<a href="http://somehost/somefile.zip" download="filename.zip">Download file</a>
```

只要为 `<a>` 标签添加 `download` 属性就行, 并且添加的属性值是下载的文件名.

在用javascript写的时候也是按这个思路

- 用 JavaScript 创建一个隐藏的 `<a>` 标签
- 设置它的 href 属性
- 设置它的 download 属性
- 用 JavaScript 来触发这个它的 click 事件

翻译成javascript代码就是

```javascript
var a = document.createElement('a');
var url = window.URL.createObjectURL(blob);
var filename = 'what-you-want.csv';
a.href = url;
a.download = filename;
a.click();
window.URL.revokeObjectURL(url);
```

在设置属性的时候不用`setAttribute`可以看这个链接[What is happening behind .setAttribute vs .attribute=?](https://stackoverflow.com/questions/22151560/what-is-happening-behind-setattribute-vs-attribute)

## DataURI

这只是下载对应href中的文件, 或者说是在服务器端的文件, 如果是在前端的文件呢, `DataURI`来解决
[什么是data URI scheme及如何使用data URI scheme](https://sjolzy.cn/What-is-the-data-URI-scheme-and-how-to-use-the-data-URI-scheme.html)

这种取得资料的方法称为 `http URI scheme`, 同样的效果使用 `data URI scheme`

> 简单说就是这种方式会把所有的数据都存在href中, 而不会去请求服务器.

## URL.createObjectURL()

[URL.createObjectURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)

window.URL 里面有两个方法：

- `createObjectURL` 用 blob 对象来创建一个 object URL(它是一个 DOMString)，我们可以用这个 object URL 来表示某个 blob 对象，这个 object URL 可以用在 href 和 src 之类的属性上。
- `revokeObjectURL` 释放由 createObjectURL 创建的 object URL，当该 object URL 不需要的时候，我们要主动调用这个方法来获取最佳性能和内存使用。

知道了这两个方法之后，我们再回去看看上面的例子就很容易理解了吧！只是用 blob 对象来创建一条 URL，然后让 `<a>` 标签引用该 URL，然后触发个点击事件，就可以下载文件了！

## Blob 对象

Blob 全称是 Binary large object，它表示一个类文件对象，可以用它来表示一个文件。根据 MDN 上面的说法，File API 也是基于 blob 来实现的。

[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

这里使用 `Blob() 构造函数` 允许用其它对象创建 Blob 对象。比如，用字符串构建一个 blob：

```javascript
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)],
  {type : 'application/json'});
```

所以依赖这个我们可以从后端拿到数据, 然后再前端下载它. 设计分页的我们也都是前端开分页.

## MIME类型(Multipurpose Internet Mail Extensions)

上面Blob的类型type选择比如要下载csv的就要选`text/csv`

[多用途Internet邮件扩展（MIME）类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

[完整的MIME类型列表](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types) 可以按扩展名来查看MIME Type

## 参考

[如何用 JavaScript 下载文件](https://scarletsky.github.io/2016/07/03/download-file-using-javascript/)
[前端 javascript 实现文件下载](https://lzw.me/a/fed-file-download.html)
[在浏览器端用JS创建和下载文件](http://www.alloyteam.com/2014/01/use-js-file-download/)
[什么是data URI scheme及如何使用data URI scheme](https://sjolzy.cn/What-is-the-data-URI-scheme-and-how-to-use-the-data-URI-scheme.html)
[What is happening behind .setAttribute vs .attribute=?](https://stackoverflow.com/questions/22151560/what-is-happening-behind-setattribute-vs-attribute)
[多用途Internet邮件扩展（MIME）类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
[Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
[什么是data URI scheme及如何使用data URI scheme](https://sjolzy.cn/What-is-the-data-URI-scheme-and-how-to-use-the-data-URI-scheme.html)
[Data URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)
[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
