---
title: mysql的timestamp和datetime区别
date: 2019-04-11 16:48:00
tags:
- mysql
- innoDB
categories:
- mysql
comments: false
permalink:
---

# mysql 的 timestamp 和 datetime 区别

首先 DATETIM 和 TIMESTAMP 类型所占的**存储空间**不同，前者 8 个字节，后者 4 个字节，这样造成的后果是两者能表示的**时间范围不同**。前者范围为 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59，后者范围为 1970-01-01 08:00:01 到 2038-01-19 11:14:07。所以可以看到 TIMESTAMP 支持的范围比 DATATIME 要小,容易出现超出的情况.

其次: TIMESTAMP 类型在默认情况下，insert、update 数据时，TIMESTAMP 列会自动以当前时间（CURRENT_TIMESTAMP）填充/更新。

第三: **最主要的区别-受时区影响不同**TIMESTAMP 比较受时区 timezone 的影响以及 MYSQL 版本和服务器的 SQL MODE 的影响, 

> 详细可以阅读这篇博客的演示：[MySQL: Datetime Versus Timestamp Data Types](https://www.tech-recipes.com/rx/22599/mysql-datetime-vs-timestamp-data-type/)
> 一个timestamp字段，一个datetime字段，修改时区SET TIME_ZONE = "america/new_york";后，timestamp字段的值变了! 
> 因此，如果应用场景有跨时区要求的要特别注意这点。

第四: 索引速度
不同。timestamp 更轻量，索引相对 datetime 更快。

所以一般来说，我比较倾向选择 DATETIME，至于你说到索引的问题，选择 DATETIME 作为索引，如果碰到大量数据查询慢的情况，也可以分区表解决。

## 参考

[Mysql 时间字段格式如何选择，TIMESTAMP，DATETIME，INT？](https://segmentfault.com/q/1010000000121702)
[MySQL date、datetime 和 timestamp 类型的区别](https://zhuanlan.zhihu.com/p/23663741)
[MySQL: Datetime Versus Timestamp Data Types](https://www.tech-recipes.com/rx/22599/mysql-datetime-vs-timestamp-data-type/)
[TIMESTAMP和DATETIME相同和区别](https://blog.csdn.net/u012516166/article/details/79094560)
[mysql datetime与timestamp区别](https://blog.csdn.net/wangjun5159/article/details/48010563)