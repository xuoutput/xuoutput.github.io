---
title: typescript代码检查
date: 2019-05-08 09:37:29
tags:
- tslint
categories:
- 前端教程
comments: false
permalink:
---

# typescript 代码检查

主要用来统一代码风格

> tslint 被弃用了

## 代码检查

目前 `TypeScript` 的代码检查主要有两个方案：使用 `TSLint` 或使用 `ESLint` + `typescript-eslint-parser`。

## 什么是代码检查

代码检查主要是用来**发现代码错误、统一代码风格**。

在 JavaScript 项目中，我们一般使用 `ESLint` 来进行代码检查。它通过插件化的特性极大的丰富了适用范围，搭配 `typescript-eslint-parser` 之后，甚至可以用来检查 `TypeScript` 代码。

`TSLint` 与 `ESLint` 类似，不过除了能检查常规的 js 代码风格之外，TSLint 还能够通过 `TypeScript` 的语法解析，利用类型系统做一些 `ESLint` 做不到的检查。

## 为什么需要代码检查

有人会觉得，`JavaScript` 非常灵活，所以需要代码检查。而 `TypeScript` 已经能够在编译阶段检查出很多问题了，为什么还需要代码检查呢？

因为 `TypeScript` 关注的**重心是类型的匹配，而不是代码风格**。当团队的人员越来越多时，同样的逻辑不同的人写出来可能会有很大的区别：

- 缩进应该是四个空格还是两个空格？
- 是否应该禁用 `var`？
- 接口名是否应该以 `I` 开头？
- 是否应该强制使用 `===` 而不是 `==`？
- 这些问题 `TypeScript` 不会关注，但是却影响到多人协作开发时的效率、代码的可理解性以及可维护性。

下面来看一个具体的例子：

## 配置

先看链接中各个链接的内容

[How do I configure my project to use typescript-eslint? 666](https://github.com/typescript-eslint/typescript-eslint#how-do-i-configure-my-project-to-use-typescript-eslint)

在 eslint-plugin 中设置的 rules

[Supported Rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)

点击去就能看具体设置, 比如indent, 默认是4个space, 我们改为改2个space

```JavaScript
{
    // note you must disable the base rule as it can report incorrect errors
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2, {"SwitchCase": 1}]
}
```

## 参考

[代码检查 666666](https://ts.xcatliu.com/engineering/lint.html)
[TSLint Deprecated to Focus Support on typescript-eslint](https://www.infoq.com/news/2019/02/tslint-deprecated-eslint)
[The future of TypeScript on ESLint](https://eslint.org/blog/2019/01/future-typescript-eslint)
[Eslint 和 Tslint 使用指南](https://dodoblog.cn/blog?id=5c998ec94122ac2a34b2c2fb)
[使用 ESLint+Prettier 规范 React+Typescript 项目 666](https://zhuanlan.zhihu.com/p/62401626)
[How do I configure my project to use typescript-eslint? 666](https://github.com/typescript-eslint/typescript-eslint#how-do-i-configure-my-project-to-use-typescript-eslint)
