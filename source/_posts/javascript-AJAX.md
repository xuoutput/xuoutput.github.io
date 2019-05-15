---
title: javascript-AJAX
date: 2019-05-15 11:15:13
tags:
- ajax
- XMLHttpRequest
categories:
- 网络
comments: false
permalink:
---

# javascript-AJAX

```javascript
var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

request.onreadystatechange = function() {
  // 状态发生变化时，函数被回调
  if (request.readyState === 4) {
    // 成功完成
    // 判断响应结果:
    if (request.status === 200) {
      // 成功，通过responseText拿到响应的文本:
      return success(request.responseText);
    } else {
      // 失败，根据响应码判断失败原因:
      return fail(request.status);
    }
  } else {
    // HTTP请求还在继续...
  }
};

// 发送请求:
request.open('GET', '/api/categories');
request.send();
```

## 创建 XMLHttpRequest 对象

创建 XMLHttpRequest 对象的语法：

```javascript
variable = new XMLHttpRequest();
```

老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：

```javascript
variable = new ActiveXObject('Microsoft.XMLHTTP');
```

## 向服务器发送请求请求

如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 `open()` 和 `send()` 方法：

```javascript
xmlhttp.open('GET', 'ajax_info.txt', true);
xmlhttp.send();
```

```javascript
xmlhttp.open('POST', '/try/ajax/demo_post2.php', true);
xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xmlhttp.send('fname=Henry&lname=Ford');
```

## 服务器 响应

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。

| 属性         | 描述                       |
| ------------ | -------------------------- |
| responseText | 获得字符串形式的响应数据。 |
| responseXML  | 获得 XML 形式的响应数据。  |

## onreadystatechange 事件

当请求被发送到服务器时，我们需要执行一些**基于响应的任务**。

每当 `readyState` 改变时，就会触发 `onreadystatechange` 事件。

`readyState` 属性存有 `XMLHttpRequest` 的状态信息。

下面是 XMLHttpRequest 对象的三个重要的属性：

### readyState

存有 `XMLHttpRequest` 的状态。从 0 到 4 发生变化。

- 0：初始化，`XMLHttpRequest` 对象还没有完成初始化
- 1：载入，初始化完成, `XMLHttpRequest` 对象开始发送请求
- 2：载入完成，`XMLHttpRequest` 对象的请求发送完成, 开始接受
- 3：解析，`XMLHttpRequest` 对象开始读取服务器的响应, 解析中
- 4：完成，`XMLHttpRequest` 对象读取服务器响应结束

onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。

## 参考

[菜鸟 AJAX](http://www.runoob.com/ajax/ajax-xmlhttprequest-create.html)
