---
title: tsconfig.json配置解析
date: 2019-04-25 10:41:22
tags:
- tsconfig.json
categories:
- 前端
comments: false
permalink:
---

# tsconfig.json 配置解析

- 指定待编译的文件
- 定义编译选项

安装外typescript后用`tsc --init`就可以生成, 也可以自己创咯

## 概述

如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是 TypeScript 项目的**根目录**。 `tsconfig.json`文件中指定了用来**编译这个项目的根文件和编译选项**。

一个项目可以通过以下方式之一来编译：
使用`tsconfig.json`(**推荐**)

- 不带任何输入文件的情况下调用`tsc`，编译器会从**当前目录开始**去查找`tsconfig.json`文件，**逐级向上搜索父目录**。(**常用**)
- 不带任何输入文件的情况下调用`tsc`，且使用命令行参数--project（或-p）**指定一个包含**`tsconfig.json`文件的目录。(不常用)

当命令行上指定了输入文件时，`tsconfig.json`文件会被忽略。(不建议)

## 示例

`tsconfig.json`示例文件:

使用`"files"`属性 (不建议)

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
  ]
}
```

使用`"include"`和`"exclude"`属性 (**推荐**)

```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

## 细节

`"compilerOptions"`可以被忽略，这时编译器会使用默认值。在这里查看[完整的编译器选项列表](https://www.tslang.cn/docs/handbook/compiler-options.html)。

`"files"`指定一个包含相对或绝对文件路径的列表。 `"include"`和`"exclude"`属性指定一个文件`glob`匹配模式列表。 支持的`glob`通配符有：

- `*` 匹配 0 或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

如果一个`glob`模式里的某部分只包含`*或.*`，那么仅有支持的**文件扩展名类型**被包含在内（比如默认`.ts`，`.tsx`，和`.d.ts`， 如果 `allowJs`设置能`true`还包含`.js`和`.jsx`）。

1. 如果`"files"`和`"include"`**都没有被指定**，编译器**默认包含当前目录和子目录下所有的`TypeScript`文件**（`.ts`, `.d.ts` 和 `.tsx`），排除在`"exclude"`里指定的文件。
`JS`文件（`.js`和`.jsx`）也被包含进来如果`allowJs`被设置成`true`。

2. 如果指定了 `"files"`或`"include"`，编译器会将它们结合一并包含进来。
使用 `"outDir"`**指定的目录下的文件永远会被编译器排除**，除非你明确地使用`"files"`将其包含进来（就算你没用`exclude`也会被排除出去）。

3. 使用`"include"`引入的文件可以使用`"exclude"`**属性过滤**。 然而，通过 `"files"`属性明确指定的文件却**总是会被包含在内**，不管`"exclude"`如何设置。 如果没有特殊指定， `"exclude"`**默认情况下会排除**`node_modules`，`bower_components`，`jspm_packages`和`<outDir>`目录。

4. 任何被`"files"`或`"include"`指定的文件所引用的文件也会被包含进来。 `A.ts`引用了`B.ts`，因此`B.ts`不能被排除，除非引用它的`A.ts`在`"exclude"`列表中。

**需要注意编译器不会去引入那些可能做为输出的文件**；比如，假设我们包含了`index.ts`，那么`index.d.ts`和`index.js`会被排除在外。 通常来讲，**不推荐只有扩展名的不同来区分同目录下的文件**。

`tsconfig.json`文件可以是个空文件，那么所有默认的文件（如上面所述）都**会以默认配置选项编译**。

**在命令行上**指定的编译选项会覆盖在`tsconfig.json`文件里的相应选项。

### file, include, exclude, outDir总结

1. 没有file和include, 默认包含当前tsconfig.json目录下和子目录下素有的(.ts, tsx, .d.ts)文件
2. file是一定不会被排除的, include的可以用exclude的排除掉一部分. outDir这个输出文件也会被排除,(按编译器不会去引入那些可能做为输出的文件)
3. 被file和include引用的文件的文件也会被包进来

> 即file和outDir都会包含和不包含, include和exclude来设置下

## `@types`，`typeRoots`和`types`

**默认**所有可见的`"@types"`包会在编译过程中被包含进来。 `node_modules/@types`文件夹下以及它们子文件夹下的所有包都**是可见的**； 也就是说， `./node_modules/@types/`，`../node_modules/@types/`和`../../node_modules/@types/`等等。

如果指定了`typeRoots`，只有`typeRoots`下面的包才会被包含进来。 比如：

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings"]
  }
}
```

这个配置文件会包含所有`./typings`下面的包，而不包含`./node_modules/@types`里面的包。(但我们不推荐用`typings`了)

如果指定了`types`，只有被列出来的包才会被包含进来。 比如：

```json
{
  "compilerOptions": {
    "types": ["node", "lodash", "express"]
  }
}
```

这个`tsconfig.json`文件将**仅会包含** `./node_modules/@types/node`，`./node_modules/@types/lodash`和`./node_modules/@types/express`。
`/@types/`。 `node_modules/@types/*`里面的其它包**不会被引入进来**。

指定`"types": []`来**禁用**自动引入`@types`包。

注意，自动引入只在你使用了全局的声明（相反于模块）时是重要的。 如果你使用 `import "foo"`语句，`TypeScript`仍然会查找`node_modules`和`node_modules/@types`文件夹来获取`foo`包。

## 使用 extends 继承配置 (不常用)

`tsconfig.json`文件可以利用`extends`属性**从另一个配置文件里继承配置**。

`extends`是`tsconfig.json`文件里的顶级属性（与`compilerOptions`，`files`，`include`，和`exclude`一样）。 `extends`的值是一个字符串，包含指向另一个要继承文件的路径。

**在原文件里的配置先被加载，然后被来至继承文件里的配置重写**。 如果发现循环引用，则会报错。

来至所继承配置文件的`files`，`include`和`exclude`**覆盖**源配置文件的属性。

配置文件里的相对路径在解析时相对于它所在的文件。

比如：

configs/base.json：

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

tsconfig.json：

```json
{
  "extends": "./configs/base",
  "files": ["main.ts", "supplemental.ts"]
}
```

tsconfig.nostrictnull.json：

```json
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

## compileOnSave (直接 false 吧)

在最顶层设置`compileOnSave`标记，可以让`IDE`在保存文件的时候根据`tsconfig.json`重新生成文件。

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

要想支持这个特性需要 Visual Studio 2015， TypeScript1.8.4 以上并且安装 atom-typescript 插件。

## 给一个简单常用的配置

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "allowSyntheticDefaultImports": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "strictNullChecks": false,
    "baseUrl": "./src",
    "lib": ["es2015", "dom"],
    "jsx": "react",
    "outDir": ".tmp"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "bower_components"],
}
```

## 参考

[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
[tsconfig.json 整理记录](https://juejin.im/post/5ac7fd1e51882555784e3575)
[完整的编译器选项列表](https://www.tslang.cn/docs/handbook/compiler-options.html)
[理解 Typescript 配置文件](https://segmentfault.com/a/1190000013514680)