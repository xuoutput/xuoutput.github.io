---
title: mongodb使用
date: 2018-02-09 15:06:37
tags:
- mongodb
- 数据库
categories:
- 前端
comments: false
permalink:
---

参考文档，菜鸟
[mongoDB入门](http://www.runoob.com/mongodb/mongodb-window-install.html)

# mongodb使用

## 下载及安装

按window上的来，下载并安装好到默认路径，**并配置好环境变量(这样才能在cmd命令行中打入mongo就能运行)**
![path](path.png)

**要用到的命令也就那几个**
mongod 打开或创建数据库
mongo   连接数据库才能继续其他操作
mongoimport 导入数据库
![mongo](mongo.png)

## 创建数据库目录并在命令行下运行 MongoDB 服务器

MongoDB将数据目录存储在 db 目录下。但是这个数据目录不会主动创建，我们在安装完成后需要创建它
名字随便取，就建个db，**注意不要放在C:\Program Files\MongoDB下**

会提示Invalid command: FilesMongoDBdb
毕竟路径中有空格
换一个位置，换到C:\Users\db下也不行，说是**只读** 不允许
**那就干脆放到D盘下**

为了从命令提示符下运行 MongoDB 服务器，你必须从 MongoDB 目录的 bin 目录中执行 `mongod.exe` 文件。

```
//改到D:\db
mongod --dbpath D:\db
```

## 连接MongoDB(这个是在上面打开服务器的基础上)

我们可以在命令窗口中运行 mongo.exe 命令即可连接上 MongoDB，执行如下命令：

```
$ mongo
```

**感觉这个用git bash来操作不好**
因为看下图比较, 就是没有提示符了
![showdbs1](showdbs1.png)
![showdbs2](showdbs2.png)

## 配置 MongoDB 服务(跳过)

管理员模式打开命令行窗口

创建目录，执行下面的语句来创建数据库和日志文件的目录

```
mkdir c:\data\db
mkdir c:\data\log
```

主要一个log日志文件，db前面已将创建了

## 一些常用命令(连接Mongo后)

总结下前面的

```
mongod:
    mongod --dbpath <path>
mongo:
    show dbs            //查看所有数据库(空的数据库不显示，注意insert({}) 这个也是插入了东西，会显示的。和remove({})一样哦 )
    db                  //db 命令查看当前数据库名,也表示当前数据库
    show collections    //查看当前库的所有集合
    show users          //查看当前库有哪些用户
        show profile
        show log

增  use <dbname>        //使用或创建数据库
        db               //查看当前是哪个数据库 show dbs看不到，因为test中没有数据
删  db.dropDatabase()    //删除当前数据库(要进到删除的数据库中么？先use到，在drop)，默认为 test，你可以使用 db 命令查看当前数据库名。删除后db下还是在被删除掉的数据库中，不过show dbs已经看不到了，和use创建那会一样

改   
查   db / show dbs



    //collections都是BSON格式 当JSON好了   BSON是一种类json的一种二进制形式的存储格式,简称Binary JSON。
增   db.collectionName.insert({"name":"pipi"})   //用json格式写入就好了，可以show dbs可以看到，当然可以定一个变量咯，然后插入。这个插入就只是插入，即使同名也插入，不会替换/合并等。都当做那条集合中的记录

删   db.collectionName.drop()                    //删了当前数据库所有集合中叫collectionName的一个集合

    db.collection.remove(                   //这个是移除某个集合中的一条记录
    <query>,
    {
        justOne: <boolean>,
        writeConcern: <document>
    }
    )

    db.col.remove({})   //删除一个collection中所有记录，这不就是drop么？不对。drop后是在show collections中也看不到了
    db.col.remove({'age': 1})   //删除所有age=1的
    db.col.remove({'age': 1}, {justOne: true})   //删除所有age=1的中第一条匹配的
    //remove drop dropDatabase

查   db.collectionName.find()        //查找当前数据库中collectionName这个集合的所有记录
        find({k: v})                  //查一个对象，age=3的就是{k:v}还是个模糊查询
        find({k: {$ne: v}})                  //查一个对象，age!=3的就是{k:v}还是个模糊查询
        find({k: v},{k: v})           //查多个对象，多个条件用逗号，AND隔开
        find($or: [{k: v},{k: v}])          //这是OR,当然AND和OR也能一起用
        //条件查询 > <
        find({ k: {$gt: v} })   gte
        find({ k: {$lt: v} })   lte
        find({ k: {$gt: v, $lt: v}, k: {$gt: v, $lt: v} })  //合起来
        find().limit(5)             //查出来了结果过滤，取前5条
        find().skip()               //这是跳过几条
        find().pretty()             //格式更好点
排序      find().sort({k1: 1}, {k2, -1})  //按k1排序，k1相同就按k2, 1表正序，-1逆序

改   //使用 update() 和 save() 方法来更新集合中的文档. 一个是更新，个是替换
    //update() 方法用于更新已存在的文档
    //save() 方法通过传入的文档来替换已有文档

    db.collection.update(
    <query>,
    <update>,
    {
        upsert: <boolean>,
        multi: <boolean>,           //默认查询第一条匹配的，true之后是所有的
        writeConcern: <document>
    }
    )
    //用到了$set: db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
    //以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true。
    //$ db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})

    db.collection.update({
        {k, v},
        {$set: {k, v2}      修改
        }
    })
    db.collection.update({
        {k, v},
        {k1, v1, k2, v2}    替换
    })

    db.collection.save(
    <document>,
    {
        writeConcern: <document>
    }
    )

mongoimport:    导入一个BSON
    mongoimport --db test --collection user --drop --file D:\db\1.json

```

最后说下nodejs连接MongoDB



