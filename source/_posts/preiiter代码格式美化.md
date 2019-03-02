---
title: preiiter代码格式美化
date: 2019-02-20 20:39:17
tags:
- prettier
- vsc
categories:
- vsc插件
comments: false
permalink:
---

# preiiter代码格式美化

从`EditorConfig`到各种`***Lint`, 再到 `prettier`。 其实就是一起用

为什么要用Prettier

用来替代`*lint`中的一些场景，比如说分号/tab缩进/空格/引号，这些在lint工具检查出问题之后**还需要手动修改**，而通常这样的错误都是空格或者符号之类的，这样相对来说不太优雅，利用格式化工具自动生成省时省力。

## 搞起

## 在项目中

[为什么用Prettier 66](https://juejin.im/post/59ddc2a751882578c17e9ccf)

安装完依赖, `npm install --save-dev prettier`后, 执行常见的.

```JavaScript
prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"
或
prettier -l --write 'src/**/*.{ts,tsx,less,css}' --no-semi --single-quote
```

### 在vscode中

首先安装`vscode`的插件`Prettier-Code formatter`

安装成功后，编辑器默认的格式化处理就会被`prettier`代替， 默认快捷键是`alt + shift + f`

插件安装成功后，按`cmd+,`调出编辑器的配置,会出现`prettier`插件的相关配置节点，同时也能看到一些默认的配置信息, 在`setting.json`中也可以自己定义。  

更多的配置方式
[Configuration File](https://prettier.io/docs/en/configuration.html)

## 其他的prettier

除了直接用`prettier`, 还有像`tslint-config-prettier`这种prettier

## typescript配置prettier

- 文件保存时执行一次格式化
- 迁移已有代码的格式
- 代码提交前进行一次格式化

首先确认了 `Prettier` 对 `TypeScript` 有良好的支持.

### 保存时格式化

但我更喜欢保存时只是做一点比如去掉多余的空格, 按`alt + shift + f`才进行格式化.

在vsc中安装完插件后, 配置`prettierrc` 文件, 临时的配置比如:

```json
{
  "tabWidth": 4,
  "useTabs": true
}
```

更多配置文件方式
[Configuration File](https://prettier.io/docs/en/configuration.html)

然后`cmd+,`调出编辑器的配置, 设置`editor.formatOnSave` 选项.把值设置为 `true`.

### 代码提交前

[为什么用Prettier 66](https://juejin.im/post/59ddc2a751882578c17e9ccf)

## 已经有了ESlint下

[Prettier 介绍与基本用法 6](https://juejin.im/post/5ae91143f265da0ba60f97ea)

### 使用ESLint运行Prettier

如果你已经在你的项目中使用`ESLint`并且想要只通过**单独一条命令**来执行你的所有的代码检查的话，你可以使用`ESLint`来为你运行`Prettier`。

只需要使用`eslint-plugin-prettier`来添加`Prettier`作为`ESLint`的**规则配置**。

```JavaScript
yarn add --dev prettier eslint-plugin-prettier
```

**.eslintrc.json**:

```JavaScript
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### 关闭ESLint的格式规则

**你是否通过`ESLint`来运行`Prettier`，又或者是单独运行两个工具**，那你大概**只想要每个格式问题只出现一次**，而且你特别不想要`ESLint`仅仅是和`Prettier`有简单的不同和偏好而报出“问题”。

所以你大概想要**禁用冲突的规则**（当保留其他`Prettier`不关心的规则时）最简单的方式是使用`eslint-config-prettier`。它可以添加到任何`ESLint`配置上面。

## 345345总

目标是有两个setting,
一个是user的setting, 设置好自己对常用的语言的一些代码规范
一个是workspace的setting, 是读取要工作的项目文件中的文件, 来保持项目的代码规范
(先设置自己的user, 在读取项目中的`setting`)


然后自己对于`cmd+s`的情况是只去掉空格, 而不格式化,用`alt+shift+f`是来手动格式化, 然后`pre-commit`前会最好自动格式化下

从EditorConfig到xxLint, 到prettier.  prettier只暴力格式化, xxlint是检查

安装prettier的话有2种, 一种是在vsc中安装插件`prettier code format`
一种是在项目中用`npm`或`yarn`安装dev依赖, **依赖项目, 不依赖编辑器**
2者略有不同.

### 项目npm, yarn中后

项目中的就是比如`npm`安装完后, 就可以在script中写个prettier的格式命令, 然后`yarn prettier`下

常见的命令是`prettier --write --config .prettierrc src/*.ts` 当然还要一些prettier的参数等会看 比如`{}`, `[]`

```json
# 这个是对前端的, 后面不加分号
prettier -l --write 'src/**/*.{ts,tsx,less,css}' --no-semi --single-quote
# 这个是后端的js 加分号
prettier -l --write 'app/**/*.js' --single-quote
# 这个是按.prettierrc中的格式
prettier --write --config .prettierrc src/*.ts
```

当然可以在`package.json`中的`script`写`prettier`搞定.
而在`package.json`中的`prettier`写是自定义格式选项. 一般不会用这个

```json
"prettier": {
    "singleQuote": true,
    "semi": false,
    "printWidth": 120,
    "proseWrap": "never"
},
```

查看prettier中内置的一些`formatter`

### vsc中

在vsc中多说下, 首先vsc有自己的格式方式, 按`cmd+k m`可以查看到许多语言, 然后是你可以自己配置`Configure 'language_name' language based settings.`, 跳转到`setting.json` 中写这种(和你用`cmd+shift+p`在输入`preferences: config`这种快多了)

这里的保存后格式化是对当前文件吧, 而不是本项目中所有的.

```json
    // Set the default
    "editor.formatOnSave": false,
    // Enable per-language
    "[javascript]": {
        "editor.formatOnSave": true
    }
```

 在`cmd+,`中看`setting.json` 中可以自己直接改

vsc的配置, workspace setting在项目根目录`.vscode`中, 但我找不到. 一般我在里面写debug的文件, 比如egg的那个配置

### 各种不同的prettier

常见的[prettier文件](https://prettier.io/docs/en/configuration.html)

- A `.prettierrc` file, written in YAML or JSON, with optional extensions: `.yaml/.yml/.json`.
- A `.prettierrc.toml` file, written in TOML (the .toml extension is required).
- A `prettier.config.js` or `.prettierrc.js` file that exports an object.
- A `"prettier"` key in your `package.json` file.

常见的4种吧, 首先是`.prettierrc`, 你可以在里面用`YAML or JSON`格式来写, 其次是`.prettierrc.toml`, 用`TOML`格式来写 算一类吧, 我们常见的事用`JSON`写
还有就是用`prettier.config.js` or `.prettierrc.js`这种导出一个对象来写
最后就是在`package.json`中的`"prettier"`, 一般就是在`script`中写呗, 不会单独搞一个属性

当然`.editorconfig, .babelrc, .eslintrc, .prettierrc` 都挺常见的

### 对于我常用的配置

ts, tsx, js, jsx, md这些文件, 在setting.json中可以单独配置user的, 还有css, less 都可以

但是不能配合`prettier`用

```json
    // js
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  },
  // jsx
  "[javascriptreact]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  },
  // ts
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  },
  // tsx
  "[typescriptreact]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  }
  // md
  "[markdown]": {},
```

### 下面链接中讲了详细使用prettier

[Code Formatting 6666 各种配置](https://survivejs.com/maintenance/code-quality/code-formatting/)

### 读取顺序

先从vsc的市场中可以看到, setting会先从

1. prettier 的配置文件读, 也就是前面说的4种
2. 没有的话从`.editorconfig`这个小老鼠读
3. 最后才是从默认的vsc的prettier setting

再说下一下默认在vsc中插件prettier设置

```json
// 一行最大80个字符
prettier.printWidth (default: 80)

// 使用tab代表几个空格
prettier.tabWidth (default: 2)

// 是否使用单引号代替双引号
prettier.singleQuote (default: false)

// 末尾的逗号, 3个选项, "none"就是无, "es5"会在例如对象和数组, "all"是包括函数参数
prettier.trailingComma (default: 'none')

// 控制对象字面量里面的空格
prettier.bracketSpacing (default: true)

// 如果为true, 在多行的jsx元素中, 最后的 > 单独一行,而不是跟在最后一样的末尾
prettier.jsxBracketSameLine (default: false)

// 用什么 parser .只有 'flow' 和 'babylon'.
prettier.parser (default: 'babylon') - JavaScript only

// 在每行的末尾加上分号 true. false就是用ASI, 看链接参考
prettier.semi (default: true)

// 缩进用不用tab
prettier.useTabs (default: false)

// (Markdown) wrap prose over multiple lines.
prettier.proseWrap (default: 'preserve')

// 对只有一个参数的箭头函数的这个参数, 用不用圆括号包上
prettier.arrowParens (default: 'avoid')

// 在jsx中用单引号而不是双引号
prettier.jsxSingleQuote (default: false)

// 对html文件空格敏感, 有更多选项
prettier.htmlWhitespaceSensitivity (default: 'css')

// 对每行末尾通过prettier自己设定, 有更多选项
prettier.endOfLine (default: 'auto')
```

然后是vsc中特殊指定的, 通过`setting.json`可以改 [User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings)

```json
// 使用 prettier-eslint 代替 prettier.
prettier.eslintIntegration (default: false) - JavaScript and TypeScript only

// 使用 prettier-tslint 代替 prettier.
prettier.tslintIntegration (default: false) - JavaScript and TypeScript only

// 使用 prettier-stylelint 代替 prettier.
prettier.stylelintIntegration (default: false) - CSS, SCSS and LESS only

// 需要一个 a 'prettierconfig' 文件来格式化
prettier.requireConfig (default: false)

// 支持写一个 .gitignore 或 .prettierignore 这样的文件来忽略项目中哪些路径下的不进行格式化. 需要重启下vsc
prettier.ignorePath (default: .prettierignore)

// 对一些特定语言不进行用prettier的格式化. 在父目录下设置也会组织所有子目录下的配置
prettier.disableLanguages (default: ["vue"])
```

> vsc中的`prettier`插件也是会依赖项目中的本地依赖, 就是前面的优先级.

#### vsc中的setting

按`cmd+,`打开, 有两种不同的设定

- User Settings - 这是全局的设定
- Workspace Settings - 指定的workspace打开才会应用, 这个优先级高. 常用在小组中分享项目设定. 在`.vscode`文件中de `.settings.json`,  `launch.json`是用来debug的

改变会需要重启下vsc, 也有不需要重启的, 自己点着试试, 先看Commonly Userd => workbench  看下去

对于workspace setting在一个文件下当然可以加一个`.vacode`文件夹, 但当有一个根文件下有很多项目时呢. 比如ava
那就在根目录下写一个`Global Workspace settings` 叫`.code-workspace`文件

```json
{
    "folders": [
        {
            "path": "vscode"
        },
        {
            "path": "vscode-docs"
        },
        {
            "path": "vscode-generator-code"
        }
    ],
    "settings": {
        "window.zoomLevel": 1,
        "files.autoSave": "afterDelay"
    }
}
```

比如debugging的东西就写在`.vscode`文件夹下的`lounch.json`中

然后就是语言指定配置, 这个在前面讲过`cmd+k, m`

### prettier的默认配置

[options.](https://prettier.io/docs/en/options.html)

### prettierc常用命令参数

基本命令就是

```JavaScript
prettier [opts] [filename ...]
```

实际中常用

```JavaScript
prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"
```

默认是不会访问`node_modules`文件夹中的, 需要访问的话加参数`--with-node-modules`

#### CLI的一些其他参数

讲的主要是比`option`多一点的东西.

##### `--check`或`-c`

就是check下文件是否格式化了, 也经常配合在`pre-commit hook`前使用,
如果是想讲这些没格式化的文件输出给下一个命令, 就用`--list-different`. 两者还是有区别的

##### `--debug-check`

如果你怕`prettier`改变你正确的代码, 那么用这个. 当然`--write`是不能配合这个用了.

##### `--find-config-path` 和 `--config`

当你经常去格式化那些指定目录的文件时, `prettier`会先尝试读取配置文件的信息, **造成性能有点缺失**, 所以你可以用这个命令配置好, 先读第一次, 之后就重用第一次的配置.

```JavaScript
prettier --find-config-path ./my/file.js
./my/.prettierrc  // 这是配置文件
```

而这里是, 直接提供一个配置文件路径`--config`, 当然可以任意指定配置文件在哪了.

```JavaScript
prettier --config ./my/.prettierrc --write ./my/file.js
```

不想要配置文件用`--no-config`, 默认配置就是不查找.

##### `--ignore-path`

用来忽略一些不需要格式化的目录中的文件, 比如 `./.prettierignore`

##### `--require-pragma`

pragma指需要一些特别的comment.

```JavaScript
/**
 * @prettier  // @prettier 或 @format
 */
```

##### `--insert-pragma`

在没有pragma的时候会插入`@format`这种pragma到格式化文件最顶端, 配合`--require-pragma`一起用

##### `--list-different`或`-l`

这是另一个常用的flag, 会打印出prettier格式化前后不同的文件名.

```JavaScript
prettier --single-quote --list-different "src/**/*.js"
```

也可以用`--check`, 这个打印出跟人性化的信息

##### `--config-precedence`

config file文件中的配置优先级高还是 CLI options中的高

- config file 指的是配置文件
- CLI options 指的是输入的命令参数

- cli-override (default)
  - 默认cli中高, 也就是默认的prettier的配置高
- file-override
  - config file中的高
- prefer-file
  - 如果配置文件找到了, 就按配置文件, 没找到就用CLI的

常用来整合编辑器中的, 比如用户定义了自己的配置, 但还是尊重项目的定的配置.

##### `--no-editorconfig`

不考虑小老鼠了, 具体看[API](https://prettier.io/docs/en/api.html)中的信息

##### `--with-node-modules`

默认不会访问, 加了后就去访问格式化咯.

##### `--write`

就地改正, 按prettier的格式

##### `--loglevel`

改一下CLI的log等级

- error
- warn
- log (default)
- debug
- silent

##### `--stdin-filepath`

prettier CLI当做`stdin`的文件路径, 比如

abc.css

```css
.name {
  display: none;
}
```

shell

```shell
$ cat abc.css | prettier --stdin-filepath abc.css
.name {
  display: none;
}
```

#### API 用来setting.json中的

不推荐, 就是直接在js中写

#### 默认的option

[prettier的配置选项（参数）官网直译](https://segmentfault.com/a/1190000012909159)

总结下就是

- 一行超过多少个字符换行, markdown也需要强制换行么. 末尾加不加分号, 换行后`>`在哪
- 对象字面量前后加空格么, 最后一个属性加逗号么, 单引号代替双引号么, 箭头寒素参数括号么.
- 缩进用tab还是空格, 一个tab几个空格
- html默认, endOfLine默认, parser, filePath, pragma. range默认
- **关注点还是末尾js加分号, tsx不加,多一个--no-semi, 然后都用单引号** 比vsc的配置多一点点

##### Print Width

指定一行不能超过多少长, 长了换行, 报错是xxlint的事

为了可读写, 建议不要超过80个字符的, 因为人阅读的时候一般不会超过100-120的, `prettier`的话倒是希望每行越长越好.

| Default | CLI Override          | API Override        |
| ------- | --------------------- | ------------------- |
| 80      | `--print-width <int>` | `printWidth: <int>` |

> 如果你不想在`markdown`中限定换行, 可以用`Prose Wrap`来关闭它, 默认`preserve`是保持`markdown`的`as-is`

##### Tab Width

一个缩进等级代表几个空格

| Default | CLI Override        | API Override      |
| ------- | ------------------- | ----------------- |
| 2       | `--tab-width <int>` | `tabWidth: <int>` |

##### Tabs

缩进的行用tab而不是用空格

| Default | CLI Override | API Override      |
| ------- | ------------ | ----------------- |
| false   | `--use-tabs` | `useTabs: <bool>` |

tab常用来缩进,但在prettier中tab是用来align的

##### Semicolons

每行后面带不带分号

| Default | CLI Override | API Override   |
| ------- | ------------ | -------------- |
| true    | `--no-semi`  | `semi: <bool>` |

true是在每行末尾加
false是在每行开头加,但会引入ASI问题.

##### Quotes

使用单引号而不是双引号:

注意:

- jsx的会忽略这个配置, 用的是`jsx-single-quote.`
- 如果在一个用字符串包上字符串的情况下, `"I'm double quoted"`变`"I'm double quoted"`. `"This \"example\" is single quoted"`变`'This "example" is single quoted'`
- 更多信息看`strings rationale`

| Default | CLI Override     | API Override          |
| ------- | ---------------- | --------------------- |
| false   | `--single-quote` | `singleQuote: <bool>` |

##### JSX Quotes

在jsx中用单引号代替双引号

| Default | CLI Override         | API Override             |
| ------- | -------------------- | ------------------------ |
| false   | `--jsx-single-quote` | `jsxSingleQuote: <bool>` |

##### Trailing Commas

多行的时候在末尾打印逗号. 单行数组是不会有末尾逗号的.
尾逗号`[a,b,c,d,]` 数组项d后面的逗号就是尾逗号

可选项:

- `none`, 不加
- `es5`: 在es5中某些加, 比如(objects, arrays, etc.)
- `all`: 甚至在函数参数中也加

| Default | CLI Override                      | API Override                      |
| ------- | --------------------------------- | --------------------------------- |
| "none"  | `--trailing-comma <none|es5|all>` | `trailingComma: "<none|es5|all>"` |

##### Bracket Spacing

在一个对象字面量中加空格

`true` - Example: `{ foo: bar }`.
`false` - Example: `{foo: bar}`.

| Default | CLI Override           | API Override             |
| ------- | ---------------------- | ------------------------ |
| true    | `--no-bracket-spacing` | `bracketSpacing: <bool>` |

##### JSX Brackets

对一个jsx元素而言,`>`是加在最后一样还是换新行

Valid options:

`true` - Example:

```JavaScript
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}>
  Click Here
</button>
```

`false` - Example:

```JavaScript
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>
```

| Default | CLI Override              | API Override                 |
| ------- | ------------------------- | ---------------------------- |
| false   | `--jsx-bracket-same-line` | `jsxBracketSameLine: <bool>` |

##### Arrow Function Parentheses

箭头函数的参数, 在只有一个的情况下加不加圆括号`()`

Valid options:

`"avoid"` - 忽略. Example: `x => x`
`"always"` - 加上. Example: `(x) => x`

| Default | CLI Override                    | API Override                    |
| ------- | ------------------------------- | ------------------------------- |
| "avoid" | `--arrow-parens <avoid|always>` | `arrowParens: "<avoid|always>"` |

##### Range

只format文件中的一段, `[)` 选一个偏移范围

不能和`cursorOffset`一起用

| Default  | CLI Override          | API Override        |
| -------- | --------------------- | ------------------- |
| 0        | `--range-start <int>` | `rangeStart: <int>` |
| Infinity | `--range-end <int>`   | `rangeEnd: <int>`   |

##### Parser

指定用什么parse, `prettier`会自动从输入的文件目录中读取, 你不需要配置这个.

但 `babel` 和 `flow`对一个js集来说是不同的两种, 所以可以选.

当然还要其他选项.

##### File Path

指定前面parser的路径

```bash
cat foo | prettier --stdin-filepath foo.css
```

| Default | CLI Override                | API Override           |
| ------- | --------------------------- | ---------------------- |
| None    | `--stdin-filepath <string>` | `filepath: "<string>"` |

##### Require pragma

`prettier`可以按照这个标志来严格指定format 文件, 只需要在每个文件前面加上`pramga`

例如文件中带上下面的参数后, 使用`--require-pragma`就会format

```JavaScript
/**
 * @prettier
 */
```

or

```JavaScript
/**
 * @format
 */
```

| Default | CLI Override       | API Override            |
| ------- | ------------------ | ----------------------- |
| false   | `--require-pragma` | `requirePragma: <bool>` |

##### Insert Pragma

prettier可以在用prettier进行format的时候在文件的开头插入`@format`, 如果已经有其他的`docblock`的时候会加入一行的

| Default | CLI Override      | API Override           |
| ------- | ----------------- | ---------------------- |
| false   | `--insert-pragma` | `insertPragma: <bool>` |

##### Prose Wrap

换行问题, 最开始的是超过多少字符提示, 但不换行的.

Valid options:

- `"always"` - Wrap prose if it exceeds the `print width`.
- `"never"` - Do not wrap prose.
- `"preserve"` - Wrap prose as-is. First available in v1.9.0

| Default      | CLI Override                            | API Override                           |
| ------------ | --------------------------------------- | -------------------------------------- |
| `"preserve"` | `--prose-wrap <always|never|preserve>|` | `proseWrap: "<always|never|preserve>"` |

##### HTML Whitespace Sensitivity

HTML文件全局空格敏感问题, 详细看`whitespace-sensitive formatting`

就是空格会影响布局, 就按css的display来

Valid options:

- `"css"` - Respect the default value of CSS `display` property.
- `"strict"` - Whitespaces are considered sensitive.
- `"ignore"` - Whitespaces are considered insensitive.

| Default | CLI Override                                        | API Override                                       |
| ------- | --------------------------------------------------- | -------------------------------------------------- |
| `"css"` | `--html-whitespace-sensitivity <css|strict|ignore>` | `htmlWhitespaceSensitivity: "<css|strict|ignore>"` |

##### End of Line

历史原因, 有两种, That is `\n` (or `LF` for Line Feed) and `\r\n` (or `CRLF` for Carriage Return + Line Feed).






## 参考

[Visual Studio Code入门(译)](https://www.jianshu.com/p/3dda4756eca5)
[VS Code使用之基本设置与配置详解](https://blog.csdn.net/u013304372/article/details/78917536)
[使用ESLint+Prettier来统一前端代码风格](https://juejin.im/post/5b27a326e51d45588a7dac57)
[Prettier 插件为更漂亮快应用代码](https://www.jeffjade.com/2019/02/02/150-prettier-quickapp-plugin/)
[使用Prettier美化JavaScript代码，让编程更舒心](http://www.valarvo.com/edwardvoon/587.html)
[vscode + prettier 专治代码洁癖（一）](https://juejin.im/post/5a791d566fb9a0634853400e)
[笔记, TypeScript 配置 Prettier 6](https://segmentfault.com/a/1190000011122443)
[Prettier 介绍与基本用法 6](https://juejin.im/post/5ae91143f265da0ba60f97ea)
[为什么用Prettier 66](https://juejin.im/post/59ddc2a751882578c17e9ccf)
[我为什么推荐Prettier来统一代码风格 6](https://blog.fundebug.com/2017/10/23/format-code-use-Prettier/)
[Code Formatting 6666 各种配置](https://survivejs.com/maintenance/code-quality/code-formatting/)
[What are the rules for JavaScript's automatic semicolon insertion (ASI)?](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)