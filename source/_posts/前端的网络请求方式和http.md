---
title: 前端的网络请求方式和http
date: 2019-04-01 19:12:56
tags:
- http
categories:
- 前端教程
comments: false
permalink:
---

# 前端的网络请求方式和http

## http请求报文

### HTTP之请求消息Request

客户端发送一个HTTP请求到服务器的请求消息包括以下格式：

请求行（request line）、**请求头部（header**）、空行和请求数据四个部分组成。

![request.png](request.png)

这里难理解的事请求头中各个字段的用法.

所有的头部信息[HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

列一些常见的

| 消息头 | 描述                 | 更多信息                                                               | 标准     |
| ------ | -------------------- | ---------------------------------------------------------------------- | -------- |
| date   | 报文创建的日期和时间 | [date](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Date) | RFC 7231 |
| cache-control   | 在http 请求和响应中通过指定指令来实现缓存机制 | [cache-control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control) |  |
| Connection   | 决定当前的事务完成后，是否会关闭网络连接 | [Connection](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection) |  |


### HTTP之响应消息Response

一般情况下，服务器接收并处理客户端发过来的请求后会返回一个HTTP的响应消息。

HTTP响应也由四个部分组成，分别是：**状态行、消息报头**、空行和响应正文。

![response.png](response.png)

## 按http头部分

HTTP 首部表示在HTTP请求或响应中的用来传递附加信息的字段，修改所传递的消息（或者消息主体）的语义，或者使其更加精确。**消息首部不区分大小写**，开始于一行的开头，后面紧跟着一个':'和与之相关的值。字段值在一个换行符（CR）前或者整个消息的末尾结束。

**自定专用消息头**可通过`'X-'` 前缀来添加；但是这种用法被IETF在2012年6月发布的 RFC5548 中**明确弃用**，原因是其会在非标准字段成为标准时造成不便；其他的消息头在 IANA 注册表 中列出, 其原始内容在 RFC 4229 中定义。 此外，IANA 还维护着被提议的新HTTP 消息头注册表.

按照惯例，可以把**消息首部分为几类**，尽管这种划分不存在于任何一份规范文档中：

- `General header`：可以应用于请求和响应中，但是与在消息主体中的数据无关。
- `Request header`：含有与所要获取的资源或者客户端自身相关的附加信息。
- `Response header`：含有与响应相关的附加信息，比如它的位置或者与服务器相关的信息（名称、版本号等）。
- `Entity header`: 含有与消息主体相关的附加信息，比如长度或者MIME类型。

### General header

通用首部指的是**可以应用于请求和响应中，但是不能应用于消息内容自身**的 HTTP header 。 取决于应用的上下文环境，`通用首部可以是response` 或者 `request headers`。但是不可以是 entity headers。

最常见的通用首部包括： `Date`, `Cache-Control` or `Connection`.

### Request header

请求头可以被定义为：被用于http请求中并且和请求主体无关的那一类HTTP header。某些请求头如`Accept`, `Accept-*`,  `If-*`允许执行条件请求。某些请求头如：`Cookie`, `User-Agent` 和`Referer`描述了请求本身以确保服务端能返回正确的响应。

**并非所有出现在请求中的http首部都属于请求头**，例如在 POST请求中经常出现的`Content-Length`实际上是一个代表请求主体大小的`entity header`，虽然你也可以把它叫做请求头。

此外，CORS定义了一个叫做 [simple headers](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AE%80%E5%8D%95%E5%A4%B4%E9%83%A8)的集合，它是请求头集合的一个子集。如果某次请求是只包含simple headers的话，则被认为是简单请求，不会触发请求预检（preflight）。

### Response header

响应头 可以定义为：被用于http响应中并且和响应消息主体无关的那一类 HTTP header。像`Age`, `Location` 和 `Server`都属于响应头，他们被用于描述响应。

**并非所有出现在响应中的http header都属于响应头**，例如`Content-Length`就是一个代表响应体消息大小的entity header，虽然你也可以把它叫做响应头。

下面展示了一个 GET请求的响应头。需要注意的是，严格来说`Content-Encoding`和`Content-Type`都是属于entity headers。

### Entity header

实体报头HTTP header用来描述消息体内容。**实体报头既可用于请求也可用于响应中**。如`Content-Length`，`Content-Language`，`Content-Encoding`之类的报头都是实体报头。

尽管实体报头既非请求或响应报头，（由于它经常出现在请求头或响应头中）它们通常包含于此类概念中。

在下面例子中，`Content-Length`是一个实体报头，而`Host`和`User-Agent`是request headers（请求报头）

## 按处理方式分

消息头也可以根据代理对其的处理方式分为：

### 端到端消息头

这类消息头必须被传输到**最终的消息接收者**，也即，请求的服务器或响应的客户端。**中间的代理服务器必须转发未经修改的端到端消息头，并且必须缓存它们**。

### 逐跳消息头

这类消息头仅对**单次传输连接有意义**，不能通过代理或缓存进行重新转发。这些消息头包括 `Connection`, `Keep-Alive`, `Proxy-Authenticate`, `Proxy-Authorization`, `TE`, `Trailer`, `Transfer-Encoding` 及 `Upgrade`。注意，只能使用 `Connection` 来设置逐跳一般头。

## 按使用类别

### AuthenticationSection

- WWW-Authenticate: Defines the **authentication method** that should be used to gain access to a resource.
- Authorization: Contains the **credentials** to authenticate a user agent with a server.
- Proxy-Authenticate: Defines the **authentication method** that should be used to gain access to a resource behind **a Proxy server**.
- Proxy-Authorization: Contains the **credentials** to authenticate a user agent with **a proxy server**.

### CachingSection

- Age: The time **in seconds** the object has been in a proxy cache.
- Cache-Control: Specifies directives for **caching mechanisms** in both requests and responses.
- Clear-Site-Data: **Clears browsing data** (e.g. cookies, storage, cache) associated with the requesting website.
- Expires: The **date/time** after which the response is considered stale.
- Pragma: Implementation-specific header that may have various effects anywhere along the request-response chain. Used for backwards compatibility with **HTTP/1.0 caches** where the **Cache-Control** header is **not yet present**.
- Warning: A general warning field containing information about possible problems.

### ConditionalsSection

- Last-Modified: It is a validator, **the last modification date** of the resource, used to compare several versions of the same resource. It is **less accurate than ETag**, but easier to calculate in some environments. Conditional requests using `If-Modified-Since` and `If-Unmodified-Since` use this value to change the behavior of the **request**.
- ETag: It is a validator, **a unique string identifying the version** of the resource. Conditional requests using `If-Match` and `If-None-Match` use this value to change the behavior of the **request**.
- If-Match: Makes the **request** conditional and applies the method only if the stored resource **matches** one of the given `ETags`.
- If-None-Match: Makes the **request** conditional and applies the method only if the stored resource **doesn't match** any of the given `ETags`. This is **used to update caches** (for safe requests), or **to prevent to upload** a new resource when one is already existing.
- If-Modified-Since: Makes the **request** conditional and expects the entity to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.
- If-Unmodified-Since: Makes the **request** conditional and expects the entity to be transmitted only if it has not been modified after the given date. This is used to ensure the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.
- Vary: Determines how to match future **request** headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.

### Connection managementSection

- Connection: Controls whether the network connection stays open after the current transaction finishes.
- Keep-Alive: Controls how long a persistent connection should stay open.

### Content negotiationSection

- Accept: Informs the server about the types of data that **can be sent back**. It is `MIME-type`.
- Accept-Charset: Informs the server about which **character set** the client is able to understand.
- Accept-Encoding: Informs the server about the **encoding algorithm**, usually a compression algorithm, that can be used on the resource sent back.
- Accept-Language: Informs the server about the **language** the server is expected to send back. This is a hint and is not necessarily under the full control of the user: the server should always pay attention not to override an explicit user choice (like selecting a language in a drop down list).

### ControlsSection

- Expect: Indicates expectations that need to be fulfilled by the server in order to properly handle the request.

### CookiesSection

- Cookie: Contains stored HTTP cookies previously sent by the server with the `Set-Cookie` header.
- Set-Cookie: Send cookies from the server to the user agent.

### CORSSection

Learn more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

- Access-Control-Allow-Origin: Indicates whether the response can be shared.
- Access-Control-Allow-Credentials: Indicates whether the response to the request can be exposed when the credentials flag is true.
- Access-Control-Allow-Headers: Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.
- Access-Control-Allow-Methods: Specifies the method or methods allowed when accessing the resource in response to a preflight request.
- Access-Control-Expose-Headers: Indicates which headers can be exposed as part of the response by listing their names.
- Access-Control-Max-Age: Indicates how long the results of a preflight request can be cached.
- Access-Control-Request-Headers: Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.
- Access-Control-Request-Method: Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.
- Origin: Indicates where a fetch originates from.
- Timing-Allow-Origin: Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross-origin restrictions.

## Do Not TrackSection

- DNT: Used for expressing the user's tracking preference.
- Tk: Indicates the tracking status that applied to the corresponding request.

### DownloadsSection

- Content-Disposition: Is a response header if the resource transmitted should be displayed inline (default behavior when the header is not present), or it should be handled like a download and the browser should present a 'Save As' window.

### Message body informationSection

- Content-Length: Indicates the size of the entity-body, in decimal number of octets, sent to the recipient.
- Content-Type: Indicates the media type of the resource.
- Content-Encoding: Used to specify the compression algorithm.
- Content-Language: Describes the language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.
- Content-Location: Indicates an alternate location for the returned data.

### RedirectsSection

- Location: Indicates the URL to redirect a page to.

### Request contextSection

- From: Contains an Internet email address for a human user who controls the requesting user agent.
- Host: Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.
- Referer: The address of the previous web page from which a link to the currently requested page was followed.
- Referrer-Policy: Governs which referrer information sent in the Referer header should be included with requests made.
- User-Agent: Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. See also the Firefox user agent string reference.

### Response contextSection

- Allow: Lists the set of HTTP request methods support by a resource.
- Server: Contains information about the software used by the origin server to handle the request.

### Range requestsSection

- Accept-Ranges: Indicates if the server supports range requests, and if so in which unit the range can be expressed.
- Range: Indicates the part of a document that the server should return.
- If-Range: Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource. Used to prevent downloading two ranges from incompatible version of the resource.
- Content-Range: Indicates where in a full body message a partial message belongs.




## HTTP1.0 [rfc1945](https://tools.ietf.org/html/rfc1945)

### 方法3种 GET, HEAD, POST

#### GET

GET方法意味着检索由Request-URI标识的任何信息（以实体的形式）。 如果Request-URI引用数据生成过程，则生成的数据应作为响应中的实体而不是过程的源文本返回，除非该文本恰好是过程的输出。 如果请求消息包括`If-Modified-Since`头字段，则GET方法的语义变为“条件GET”。 条件GET方法请求**仅在**自`If-Modified-Since`标头给出的**日期之后修改标识的资源时才传输**，如第10.9节所述。 条件GET方法旨在通过允许刷新缓存实体而不需要多个请求或传输不必要的数据来减少网络使用。

#### HEAD

此方法通常用于测试超文本链接的有效性，可访问性和最近的修改。 没有类似于条件GET的“条件HEAD”请求。 如果HEAD请求包含`If-Modified-Since`标头字段，则应**忽略**该字段。

#### POST

所有HTTP / 1.0 POST请求都需要有效的`Content-Length`。 一个HTTP / 1.0服务器应该无法确定请求消息内容的长度时应该响应400（错误请求）消息。

应用程序不能缓存对POST请求的响应，因为应用程序无法知道服务器将在以后的某个请求中返回等效响应。


## 1.0 目录

1. Introduction ..............................................  4
   1.1  Purpose ..............................................  4       Uniform Resource Identifier (URI)
   1.2  Terminology ..........................................  4       666
   1.3  Overall Operation ....................................  6       6666
   1.4  HTTP and MIME ........................................  8
2. Notational Conventions and Generic Grammar ................  8
   2.1  Augmented BNF ........................................  8
   2.2  Basic Rules .......................................... 10
3. Protocol Parameters ....................................... 12
   3.1  HTTP Version ......................................... 12
   3.2  Uniform Resource Identifiers ......................... 14
        3.2.1  General Syntax ................................ 14
        3.2.2  http URL ...................................... 15
   3.3  Date/Time Formats .................................... 15
   3.4  Character Sets ....................................... 17
   3.5  Content Codings ...................................... 18
   3.6  Media Types .......................................... 19
        3.6.1  Canonicalization and Text Defaults ............ 19
        3.6.2  Multipart Types ............................... 20
   3.7  Product Tokens ....................................... 20
4. HTTP Message .............................................. 21
   4.1  Message Types ........................................ 21
   4.2  Message Headers ...................................... 22
   4.3  General Header Fields ................................ 23
5. Request ................................................... 23
   5.1  Request-Line ......................................... 23
        5.1.1  Method ........................................ 24
        5.1.2  Request-URI ................................... 24
   5.2  Request Header Fields ................................ 25
6. Response .................................................. 25
   6.1  Status-Line .......................................... 26
        6.1.1  Status Code and Reason Phrase ................. 26
   6.2  Response Header Fields ............................... 28
7. Entity .................................................... 28
   7.1  Entity Header Fields ................................. 29
   7.2  Entity Body .......................................... 29
        7.2.1  Type .......................................... 29
        7.2.2  Length ........................................ 30
8. Method Definitions ........................................ 30
   8.1  GET .................................................. 31
   8.2  HEAD ................................................. 31
   8.3  POST ................................................. 31
9. Status Code Definitions ................................... 32
   9.1  Informational 1xx .................................... 32
   9.2  Successful 2xx ....................................... 32
   9.3  Redirection 3xx ...................................... 34
   9.4  Client Error 4xx ..................................... 35
   9.5  Server Error 5xx ..................................... 37
10. Header Field Definitions .................................. 37
   10.1  Allow ............................................... 38
   10.2  Authorization ....................................... 38
   10.3  Content-Encoding .................................... 39
   10.4  Content-Length ...................................... 39
   10.5  Content-Type ........................................ 40
   10.6  Date ................................................ 40
   10.7  Expires ............................................. 41
   10.8  From ................................................ 42
   10.9  If-Modified-Since ................................... 42
   10.10 Last-Modified ....................................... 43
   10.11 Location ............................................ 44
   10.12 Pragma .............................................. 44
   10.13 Referer ............................................. 44
   10.14 Server .............................................. 45
   10.15 User-Agent .......................................... 46
   10.16 WWW-Authenticate .................................... 46
11. Access Authentication ..................................... 47
   11.1  Basic Authentication Scheme ......................... 48
12. Security Considerations ................................... 49
   12.1  Authentication of Clients ........................... 49
   12.2  Safe Methods ........................................ 49
   12.3  Abuse of Server Log Information ..................... 50
   12.4  Transfer of Sensitive Information ................... 50
   12.5  Attacks Based On File and Path Names ................ 51
13. Acknowledgments 

| http status code| 说明|
|--|--|
|200|	成功|
|301|	永久重定向|
|302|	短暂重定向 303|
|307|	短暂重定向, 不改方法 303|
|308|	永久重定向, 不改方法 301|
|400|	客户端错误，**比如缺少参数**，或者业务上还不允许的操作（提交包含未标注图片的数据集）等等|
|401|	Unauthorized **未带登录**token|
|403|	Forbidden 带了token，但是没有权限（比如标注未分配给自己的数据集等等）|
|404|	资源不存在|
|409|	Conflict 资源重复|
|500|	服务器错误（程序异常，数据库异常等等情况）|


## 参考

[全面分析前端的网络请求方式](https://segmentfault.com/a/1190000018668190)
[HTTP最强资料大全 66](https://juejin.im/post/58ddb636ac502e0063992865)
[HTTP Headers MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)