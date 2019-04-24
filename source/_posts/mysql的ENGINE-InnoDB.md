---
title: mysql的ENGINE=InnoDB
date: 2019-04-11 16:38:10
tags:
- mysql
- innoDB
categories:
- mysql
comments: false
permalink:
---

# mysql 的 ENGINE=InnoDB

最开始用 MySQL Administrator 建数据库的时候，表缺省是 `InnoDB` 类型，也就没有在意。后来用 Access2MySQL 导数据的时候发现只能导成 `MyISAM` 类型的表，不知道这两种类型有什么区别，就去查了查。
原来是 `MyISAM` 类型不支持事务处理等高级处理，而 `InnoDB` 类型支持。 `MyISAM` 类型的表强调的是性能，其执行数度比 `InnoDB` 类型更快，但是不提供事务支持，而 `InnoDB` 提供事务支持已经外部键等高级数据库功能。这样就可以根据数据表不同的用处是用不同的存储类型。
另外，MyISAM 类型的二进制数据文件可以在不同操作系统中迁移。也就是可以直接从 Windows 系统拷贝到 linux 系统中使用。

## AUTO_INCREMENT=22

这个是自增的，在这里设置数字的意思是想要让这条语句在增长的时候，从22开始自增。

## 参考

[mysql 中 engine=innodb 和 engine=myisam 的区别](https://www.waitig.com/mysql%E4%B8%ADengineinnodb%E5%92%8Cenginemyisam%E7%9A%84%E5%8C%BA%E5%88%AB.html)
[mysql 中 engine=innodb 和 engine=myisam 的区别](https://blog.csdn.net/feng88724/article/details/6829416)
[MySQL中ENGINE=InnoDB、AUTO_INCREMENT的意思](https://blog.csdn.net/yuxinha11/article/details/80090197)