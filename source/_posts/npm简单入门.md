---
title: npm简单入门
date: 2019-03-15 22:50:30
tags:
---

# npm简单入门

## 总结下

### npm的命令

```javascript
// 由于新版的nodejs已经集成了npm，所以之前npm也一并安装好了。同样可以通过输入 "npm -v" 来测试是否成功安装
npm -v

// 如果你安装的是旧版本的 npm，可以很容易得通过 npm 命令来升级，命令如下：
$ sudo npm install npm -g

// npm 安装 Node.js 模块语法格式如下：
$ npm install <Module Name>
```

npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有`-g`而已，比如

```bash
npm install express         # 本地安装到./node_modules
npm install express -g      # 全局安装到/usr/local 下或者你 node 的安装目录, nvm这种

npm install <package_name> --save       # 本地安装后, 把包信息加入package.json的dependencies字段
npm install <package_name> --save-dev   # 本地安装后, 把包信息加入package.json的devDependencies字段

npm install                 # 是根据package.json的dependencies和devDependencies信息, 根据不同的环境安装不同的包到./node_modules下
```

本地安装

1. 将安装包放在 `./node_modules` 下（运行 `npm` 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。(并不会在`package.json`中填入)
2. 可以通过 `require()` 来引入本地安装的包。

全局安装

1. 将安装包放在 `/usr/local` 下或者你 node 的安装目录。
2. 可以直接在命令行里使用。

而后面加参数 `--save-dev` 和 `--save` 表示的是`dependencies`和`devDependencies`，分别对应**生产环境**需要的安装包和**开发环境**需要的安装包。

**同样在安装模块的时候，可以通过指定参数来修改`package.json`文件**

查看安装信息

你可以使用以下命令来查看所有全局安装的模块：

$ npm list -g

如果要查看某个模块的版本号，可以使用命令如下：

$ npm list grunt

也可以npm list

卸载模块, 同理分3个地方

```bash
npm uninstall express
```

卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

```JavaScript
npm ls
```

更新模块
我们可以使用以下命令更新模块：

$ npm update express
搜索模块
使用以下来搜索模块：

$ npm search express

接下来我们可以使用以下命令在 npm 资源库中注册用户（使用邮箱注册）：

$ npm adduser
接下来我们就用以下命令来发布模块：

$ npm publish



NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。

使用`npm help <command>`可查看某条命令的详细帮助，例如npm help install。

在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。

使用`npm update <package>`可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。

使用`npm update <package> -g`可以把全局安装的对应命令行程序更新至最新版。

使用`npm cache clear`可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。

使用`npm unpublish <package>@<version>`可以撤销发布自己发布过的某个版本代码。


### package.json








## 权限问题

当尝试全局安装某个包得时候，你可能会收到`EACCES`错误。这说明你**没有权限**写入npm用于存储全局包和命令的目录。

你可以用下面三种方法解决此问题：

- 修改npm默认目录的权限；
- 将npm默认目录定向到其他你具有读写权限的目录；
- 使用某个包管理器来安装node，它会为你处理好权限问题。

知道有这么个就好了

1、找到npm的目录路径：

```JavaScript
npm config get prefix
```

2、配置npm使用这个新目录：

```JavaScript
npm config set prefix '~/.npm-global'
```

## 本地安装npm

安装npm包有**两种方式**：本地安装或全局安装。根据你想如何使用包，你可以选择安装方式。

如果你想要**从你自己的模块中**通过使用Node.js的`require`方法来依赖某个包，那你可以**本地安装**这个包，这是npm安装的默认行为。
另外，如果你想**当做命令行工具**使用它，比如grunt CLI，那你应该**全局安装**这个包。

```JavaScript
npm install <package_name>
```

此命令将在你的当前目录创建`node_modules`目录（若还未安装任何包），并将下载此包到这个目录。

### 安装的是哪个版本的包？

如果在本地目录中**没有**`package.json`文件，那该包的**最新版本**会被安装了。

如果有`package.json`文件，那么在`package.json`中声明的满足semver（语义化版本）规则的最新版本会被安装。

### 使用已安装的包

一旦包被安装在`node_modules`，你就可以在你的代码中使用它了。比如，当你创建Node.js模块是，你可以引入它。

```JavaScript
// index.js
var lodash = require('lodash');

var output = lodash.without([1, 2, 3], 1);
console.log(output);
```

## 5. 使用package.json配置文件

管理本地安装的包的最好方法是创建一个`package.json`文件。

`package.json`文件会给你提供很多好东西：

- 它用**作你的项目的包依赖管理文档**。
- 它允许你使用**语义化版本**管理规则，**指定**项目中能使用的**包的版本**。
- 使你的**构建版本可以重新生成**，这意味着你可以更易于与其他开发者**分享代码**。

### 创建package.json文件

要创建package.json文件，运行以下命令：

```bash
npm init
```

此为初始化项目命令，会在你运行此命令的文件夹根目录下创建项目配置文件：package.json。**同时每行会出现一个问题**，你输入答案后会出来另一个问题。这些问题最终会记录到package.json文件中。

**“--yes”标签**
扩展的命令行问答式流程不是必须的。通常你可以轻松地使用package.json文件快速配置项目。

你可以运行带`--yes`或`-y`标签的`npm init`命令，来生成默认的package.json文件：

这样**name是默认的文件夹名**。其他的问题都是用默认值填充的：

内容如下：

```json
{
  "name": "testnpm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- name：默认为目录名字，除非在git目录中，它会是git仓库的名字；
- version：版本号，刚初始化的项目总是1.0.0；
- description - 包的描述。
- main：总是index.js；
- scripts：默认创建一行空的测试脚本；
- keywords：关键字
- author：作者
- contributors - 包的其他贡献者姓名。
- license：ISC开源证书
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- devDependencies
- repository: will pull in info from the current directory, if present
- bugs: will pull in info from the current directory, if present
- homepage: 包的官网 url 。


你也可以通过set命令来设置一些配置项。比如下边的这些：

```bash
npm set init.author.email "xxx@xx.com"
npm set init.author.name "example user"
npm set init.license "MIT"
```

### 指定依赖包

- "dependencies": these packages are required by your application in `production`  这货线上
- "devDependencies": these packages are only needed for `development` and `testing` 这个本地开发和测试

### `--save` 和 `--save-dev`安装标记

在命令行中使用这两个标记，是添加依赖到你的package.json文件的更简单（也更酷）的方式。

添加package.json依赖的入口：

```bash
npm install <package_name> --save
```

添加package.json**开发环境依赖**的入口：

```bash
npm install <package_name> --save-dev
```

### 管理依赖包的版本

npm使用**语义化版本**管理依赖包，也就是我们常说的“SemVer”。

如果在项目文件夹下有package.json文件，你在此文件夹下运行命令`npm install`，npm就会**检查文件中列出的依赖包**，并**下载所有满足语义化规则的最新版本的依赖包**。

一开始`npm install <package_name>`的时候会在`package.json`中的`dependencies`或`devDependencies`中填入相关信息, 然后再本路径目录下下载包到`node_modules`中
直接`npm install` 会读取`package.json` 中信息, 然后下载包到`node_modules`

## 6、更新本地包

很多时候，你需要**升级项目中的依赖包**，以获得上游源代码的更新。

运在package.json同级目录下，运行`npm update`命令，来实现**依赖包的更新**。

测试：运行`npm outdated`命令，包都是最新版的话应该不会有什么结果。

## 7、卸载本地包

通过`npm uninstall <package>`命令，你可以将`node_modules`目录下的某个依赖包移除：

```bash
npm uninstall lodash
```

要从`package.json`文件的依赖列表中移除，你需要使用`--save`标签：

```bash
npm uninstall --save lodash
```

注意：如果你是以开发依赖包（`devDependency`）的方式安装的（即安装时待`--dave -dev`标签），那用--save将无法从package.json中移除，你必须用`--save -dev`标签。

> 有3种方式哦

## 8、全局安装npm包

安装npm包有两种方法：**本地安装和全局安装**。如何选择安装方式取决于你想如何使用这些依赖包。

译注：所谓“本地安装”，就是在项目文件夹中安装npm依赖包，以便此项目调用；“全局安装”相反，安装之后可以供所有项目直接调用，可以免去重复安装的步骤和空间。

如果你期望将包当作命令行工具来使用，比如grunt命令行工具，那你就需要全局安装。
相反地，如果你期望在你自己的模块中引入依赖包，比如用Node的 require 方法，那么你需要将它本地安装。

要全局下载依赖包的话，添加`-g`标识符就好了哦，`npm install -g <package>`，像下面这样：

```bash
npm install -g jshint
```

如果出现EACCES错误，你就修复一下权限。逼不得已的时候，你也可以试试 sudo：

```bash
sudo npm install -g jshint
```

## 9、更新全局包

要更新全局包的话，那**就再全局安装一下**：`npm install -g <package>`：

```bash
npm install -g jshint
```

如果想要找出哪些包需要更新，你可以使用 `npm outdated -g --depth=0` 命令帮忙。

译注：

有时候，在项目文件夹中直接 `npm install`，通过`package.json`的依赖声明中**重新安装所有包**，给人感觉挺Low B的。这个时候就需要找出哪些包已经过时了，需要更新。
而且，有时候**有些依赖包没被声明**在package.json文件中，那`npm install`就对他不起作用了。
`--depth=0` 的意思是依赖包的深度，**只检查顶层依赖包**。(因为存在一个包依赖另一个包, 比如`tslint`)
**更新所有全局包**，你可以使用 `npm update -g`。（译注：这可能会很慢，因为你装了太多依赖了）
注意：npm版本低于2.6.1的话，此命令被建议用来更新所有过时的全局包。

## 10、卸载全局包

卸载全局包使用 `npm uninstall -g <package>` 命令：

```bash
npm uninstall -g jshint
```

## 11、创建Node.js模块

Node.js模块是一种可以**发布**到npm的包。当你创建一个新模块的时候，你将从 `package.json` 文件开始。

使用 `npm init` 命令创建 `package.json` 文件。命令行中将会弹出`package.json`字段中要你输入的值。两个必填字段：名称（name）和版本（version）。你可能也需要输入主文件字段（main），可以使用默认值 index.js。

如果你想为作者（author）字段添加信息，你可以使用以下格式（邮箱、网站都是选填的）：

一旦`package.json`文件创建好了，你将想要创建模块的入口文件，如果使用默认值，他将会是 `index.js`。

在此文件中，添加一个函数，作为 `exports` 对象的一个属性。这样，require此文件之后，这个函数在其他代码中就可以使用了。

```JavaScript
exports.printMsg = function() {
  console.log("This is a message from the demo package");
}
```

测试：

将你的包发布到npm
在你的项目外新建一个目录，然后 cd 过去
运行 `npm install <package>`
创建一个test.js文件，require这个包，并调用此方法（函数）
运行 node test.js。终端将会输出：This is a message from the demo package
恭喜你，你的第一个npm包创建成功了。

## 12、发布npm包

你可以发布任何包含package.json文件的目录，比如Nodejs模块。

创建用户
发布包之前，你必须创建一个npm用户账号。如果还没有，你可以用`npm adduser`创建一个。如果已经注册了，使用`npm login`命令将账号信息存储到本地客户端。

测试：使用`npm config ls`确认账号信息已经存储到您的客户端。访问https://npmjs.com/~ 以确保信息正确。

### 发布包

使用`npm publish`来发布程序包。

注意，目录下的所有文件都将被包含进去，除非目录下有`.gitignore` 或 `.npmignore` 文件（详情请看npm-developers）将其排除。

同时，请确保npm上没有别的开发者提交的同名都包存在。

### 更新包

当你**修改了你的包文件**，你可以用`npm version <update_type>`更新它。
`update_type`是指语义化版本管理的发布类型的一种：补丁版本（patch）、次版本（minor）或主版本（major）。
此命令会更改package.json中的**版本号**。注意哦，如果你**有此包的git仓库**，那么此命令也会向git仓库添加此版本的一个标签。

更新版本号之后，你就可以再次 `npm publish` 了。

站点下的README文件是不会更新，除非你的包的新版本发布成功。所以你需要运行`npm version patch`和`npm publish`命令来修复站点下的文档。

## 13、语义化版本号

语义化版本控制是一种标准，许多项目都用它来标识新版本是何种更改。这是非常重要的，因为有时这些更改会破坏依赖这个包的代码。

### 语义化版本对于发布者

如果项目将要与他人分享，那它的版本应该始于1.0.0，尽管npm上有些项目不遵循此规则。
之后，所有更改应该按如下方法处理：

- Bug修复和其他小版本修改：用`Patch`版本，增加**最后**的版本数，如：1.0.1；
- 不会破坏已有特性的新特性：用`Minor`版本，增加**中间**的版本数，如：1.1.0；
- 会破坏向后兼容的更改：用`Majo`版本，增加**第一个**版本数，如：2.0.0.

### 语义化版本对于使用者

如果你是包的使用者，你可以在package.json文件中指定你的app能接受哪种版本。

如果你用某包的1.0.4版本开始开发的，你可以按下面方式指定版本范围：

- 补丁版本（Patch releases）: 1.0 or 1.0.x or ~1.0.4
- 次版本（Minor releases）: 1 or 1.x or ^1.0.4
- 主版本（Major releases）: * or x

## 14、使用局部包, 私有包

对npm的包而言, scope就像一个命名空间, 如果一个包的名字前带有`@`, 那么这就是一个`scoped package`, scopes是在`@`和`/`之间的所有东西

```json
@scope/project-name
```

每一个npm 用户都有他们自己的scope

```json
@username/project-name
```

### 更新npm并登录

你的npm包版本要大于2.7.0的, 然后第一个使用scoped modules要先登录

```bash
sudo npm install -g npm
npm login
```

### 初始化局部包

只需要如下在一个包名前带上你的名字就好

```json
{
  "name": "@username/project-name"
}
```

如果你用`npm init`来初始化, 可以带一个`--scope`来

```bash
npm init --scope=username
```

如果你想一直用同一个scope, 可以在`.npmrc`中设置

```bash
npm config set scope username
```

### 发布局部包

scoped包默认是私有的, 要发布的话, 你得付费买一个私有模块账户

```bash
npm publish --access=public
```

### 使用局部包

一样的用法
In package.json:

```json
{
  "dependencies": {
    "@username/project-name": "^1.0.0"
  }
}
```

On the command line:

```bash
npm install @username/project-name --save
```

In a require statement:

```JavaScript
var projectName = require("@username/project-name")
```

For information about using scoped private modules, visit npmjs.com/private-modules.

## 15、使用标签

为了更可读, 和git一样

### 添加标签（tag）

To add a tag to a specific version of your package, use `npm dist-tag add @ []`. See the CLI docs for more information.

### 使用标签（tag）发布

默认情况下, `npm publish` 给你的包打上 `latest` tag. 使用 `--tag` , 你可以指定当前发布的包的tag是beta

```bash
npm publish --tag beta
```

### 使用标签（tag）安装

Like `npm publish`, `npm install` will use the `latest` tag by default.
To override this behavior, use `npm install @`.

```bash
npm install somepkg@beta
```

### Caveats 警告

Because `dist-tags` share the same namespace with `semver`, avoid using any tag names that may cause a conflict.
最好就是不要在打tag前加上`v`, 防止和`semver`语义化的冲突







## 参考文献

[NPM文档](https://www.kancloud.cn/shellway/npm-doc/199981)