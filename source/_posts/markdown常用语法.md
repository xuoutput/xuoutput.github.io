---
title: markdown常用语法
date: 2018-01-22 21:25:55
tags:
  - markdown
categories:
  - 前端
---

# 直接贴一段用 markdown 写好的文章，两边对照的那种看好了

用 stackEdit

## 目前用的是 vscodve

虽然 vscode 本身有 markdown 的预览，不过并不支持 LaTeX。推荐两款插件 markdown all in one 和 Markdown Preview Enhanced。不仅支持 LaTex 还有导出 pdf 这种功能，画路程图
markdownlint

### 3 款插件功能

- markdown all in one

|        Tables        |     Are      |    Cool    |
| :------------------: | :----------: | :--------: |
|         标题         | 自动生成目录 |    引用    |
| `ctrl + shift + [/]` |              |            |
|         删除         |     强调     |    斜体    |  |
|                      |  `ctrl + b`  | `ctrl + i` | `<u>` |
|       无序列表       |   有序列表   |   列表项   |
|   tab / backsapce    |
|         链接         |     图片     |  索引链接  |
|       \[\]\(\)       |  \!\[\]\(\)  |  \[\]\[\]  |
|     代码,代码块      |     高亮     |
|        \`\`\`        |  \`\`\`c++   |
|         表格         |

## 总结

```
标题 段落 引用
#
删除 强调 斜体

列表

链接 图片

代码

表格


```

|   Tables    |      Are       |   Cool   |
| :---------: | :------------: | :------: |
|    标题     |  自动生成目录  |   引用   |
| \# heading  |    \[toc\]     |    \>    |
|    删除     |      强调      |   斜体   |  |
| \~\~del\~\~ | \*\*strong\*\* |  \*em\*  | `<u>` |
|  无序列表   |    有序列表    |  列表项  |
|     \*      |      1\.       | \- \[x\] |
|    链接     |      图片      | 索引链接 |
|  \[\]\(\)   |   \!\[\]\(\)   | \[\]\[\] |
| 代码,代码块 |      高亮      |
|   \`\`\`    |   \`\`\`c++    |
|    表格     |

---

## 标题（有 2 种方式）

### Setext 方式

```
大标题         <h1>
===
小标题         <h2>
---
```

# 大标题

## 小标题

### ATX 方式

```
# 一级标题          <h1>
## 二级标题         <h2>
### 三级标题        <h3>
#### 四级标题       <h4>
##### 五级标题      <h5>
###### 六级标题     <h6>
```

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 引用

使用\>
加不加空格都行，推荐加

```
> hello world   <blockquote>
```

> hello world

嵌套的引用
注意前面加一个或多个空格或 tab，还有要 2 个\>\>

```
> hello
 >> world
```

> hello
>
> > world

## 删除 强调 斜体

使用 2 个~号包上的表示删除，没有单个~的用法哦
使用 2 个\*号或者 2 个\_包上的表示强调
单个\*或者\_包上的表示斜体

```markdown
hello world
//删除线 <del>
~~hello world~~
//强调 <em>
**hello world**
**hello world**
//斜体 <strong>
_hello world_
_hello world_
//也存在只需要\*或\_开头或结尾有就行，但不推荐,因为你不知道什么时候会和前面的\*发生闭合
_hello world
hello world_
_hello world
hello world_
```

hello world
//删除线
~~hello world~~
//强调
**hello world**
**hello world**
//斜体
_hello world_
_hello world_
//不推荐
_hello world
hello world_
_hello world
hello world_

## 分割线

用\_\_\_下划线及更多就好了,注意不是\-减号，这是小标题，虽然有些用减号来作为分割，比如 cmdmarkdown

```
hello
---
world
```

hello

---

world

## 列表

### 无序列表

用\*或\+或\-都可以（仍然推荐用\* 注意加空格,虽然可以混用）

```
<ul> <li>
* h
+ hi
- hello
```

- h

* hi

- hello

嵌套

就是加 tab，不建议只加 1 个空格

```
* h
 * hi
    * hello
```

- h
  - hi
    - hello

### 有序列表

所有的都要注意加空格，然后就是第一个起始的为参考基准，后面的数字打乱其实没关系，但不建议打乱写。

还有就是怎么重新建立一个新开始的有序列表

```
<ol> <li>
1. h
2. hi
3. hello


3. h
2. hi
3. hello

```

1. h
2. hi
3. hello

4. h
5. hi
6. hello

嵌套

```
1. h
    2. hi
        3. hello

```

1. h
   2. hi
      3. hello

### todo list

```
- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能
```

- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能

## 超链接

```
<p><a></a></p>
[www.github.com](www.github.com)
```

[www.github.com](www.github.com)

## 图片

比超链接多一个!
但图片怎么设置大小呢

```
<p><img></p>
![GitHub Mark](http://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png "GitHub Mark")
```

![GitHub Mark](http://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png 'GitHub Mark')

## 索引链接

同超链接但是用两个\[\]，也适用于图片

```
[github][1]
![octocat][2]

[1]: www.github.com
[2]: http://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png
```

[github][1]
![octocat][2]

[1]: www.github.com
[2]: http://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png

## 自动链接

用<>

```
<www.github.com>
```

<www.github.com>

## 代码(用\`)

### 行内代码

1 个\`

```
<code>
`hello`
```

`hello`

### 段落代码

2 个\`\`

`hello world`

3 个\`带序号的

```
hello
world
```

### 3. 高亮一段代码[^code]

```python
@requires_authorization
class SomeClass:
    pass

if __name__ == '__main__':
    # A comment
    print 'hello world'
```

## 转义字符(加\\)

```
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```

## 表格

```
| Tables        | Are           | Cool  |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      | $12   |
| zebra stripes | are neat      | $1    |

tips:

:---:居中
:---左对齐 --- 也是
---:右对齐
-至少有一个,否则默认左对齐;例如::(建议也放3个)

就是怎么设置几行或几列合一，并没有这功能，所以用html写？
```

| Tables        |      Are      |   Cool |
| :------------ | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

---

## 其他功能

### 2. 书写一个质能守恒公式[^latex]

```
$$E=mc^2$$
```

$$E=mc^2$$

### 5. 高效绘制 [序列图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#8-序列图)

```seq
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

### 6. 高效绘制 [甘特图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#9-甘特图)

```gantt
    title 项目开发流程
    section 项目确定
        需求分析       :a1, 2016-06-22, 3d
        可行性报告     :after a1, 5d
        概念验证       : 5d
    section 项目实施
        概要设计      :2016-07-05  , 5d
        详细设计      :2016-07-08, 10d
        编码          :2016-07-15, 10d
        测试          :2016-07-22, 5d
    section 发布验收
        发布: 2d
        验收: 3d
```

## 问题

在使用 hexo 中 如果你写表格用的是 html 这种，那么部署完 hexo 后会出现很多行空行 br，这是因为 hexo 本身的问题，所以要么压缩下，写一行，但这么不就更麻烦了么。要么还是用 markdown 的语法
