---
title: yarn的使用
date: 2019-03-05 19:32:25
tags:
- yarn
categories:
- 前端教程
comments: false
permalink:
---

# yarn的使用

## 使用

### 初始化

初始化新项目

```JavaScript
yarn init
```

添加依赖包

```JavaScript
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

将依赖项添加到不同依赖项类别

分别添加到 `devDependencies`、`peerDependencies` 和 `optionalDependencies`：

```JavaScript
yarn add [package] --dev/-D
yarn add [package] --peer/-P
yarn add [package] --optional/-O
```

全局安装

```JavaScript
yarn global add <package...>
```

> 注意：`yarn add global <package...>`会变成本地安装，注意顺序。

升级依赖包

```JavaScript
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

移除依赖包

```JavaScript
yarn remove [package]
```

安装项目的全部依赖

```JavaScript
yarn
// 或者
yarn install
```

### 查看

#### yarn cache

运行 `yarn cache dir`会打印出当前的 yarn 全局缓存在哪里。

`yarn cache list --pattern <pattern>` 将列出匹配指定模式的已缓存的包。

示例：`yarn cache list --pattern "gulp-(match|newer)"`

`yarn cache clean`运行此命令将清除全局缓存。

将在下次运行 `yarn` 或 `yarn install` 时重新填充。

#### yarn list

`yarn list [--depth] [--pattern]`

默认情况下，所有包和它们的依赖会被显示。 **要限制依赖的深度**，你可以给 `list` 命令添加一个标志 `--depth` 所需的深度。
示例: `yarn list --depth=0`

### 运行

#### yarn run

`yarn run [script] [<args>]`

如果你已经在你的包里定义了 `scripts`，这个命令会运行指定的 `[script]`。例如：
运行这个命令会执行你的 `package.json` 里名为 `"test"` 的脚本。

## 参考

[官网使用](https://yarnpkg.com/zh-Hans/docs/usage)
[yarn 常用命令](https://www.jianshu.com/p/f5d85e541a99)
[命令列表](https://www.kancloud.cn/shellway/yarn-notes/262504)