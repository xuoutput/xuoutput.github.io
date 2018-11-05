---
layout: post
title: gitpage+jekyll/hexo搭建blog
date: 2018-01-20 19:55:48
updated: 
tags:
- git
- jekyll
- hexo
- blog
categories: 
- 前端
comments: ture
permalink:
---

# 使用github page 和jekyll  hexo来搭免费博客


先使用github page来做一个仓库，可以看到显示结果。

[github page](https://pages.github.com/)
当然下个github desktop也会是可以玩玩的**这个desktop就是个垃圾**

windows上
下个[ruby](https://rubyinstaller.org/downloads/),下个稳定版比如与2.4的
安装完ruby后不用装那个什么c，要啊MSYS2
然后安装[rubygems](https://rubygems.org/pages/download)一个包管理的
二、win
 　　1.安装Ruby windows下Ruby安装包 安装成功以后检查 ruby -v 、gem -v  ；

　　 2.gem install bundle、gem install jekyll 安装成功 检查 bundle -v、jekyll -v  看到各自安装的版本；

　　[环境搭建]Windows下安装Ruby和Jekyll

　　win下 bundle install的时候需要安装msys2 关于msys2  软件主页：https://sourceforge.net/projects/msys2/
```
//在RubyGems官网上下载压缩包，解压到你的本地任意位置
//在Terminal中
cd yourpath to RubyGems //你解压的位置
ruby setup.rb

//有了gems之后安装jekyll
$ gem install jekyll 

```

我用了 [Jacman](http://jekyllthemes.org/themes/jacman/)这个模板放到你的仓库中
```
$ cd you website path //cd到你的网站目录下
$ jekyll serve
//一个开发服务器将会运行在 http://localhost:4000/
//你就能在本地服务器看到你用模板搭建的网站了
```


---

用hexo吧 这个是nodejs环境的
[hexo官网](https://hexo.io/docs/)

这是基于nodejs的，所以安装好nodejs和git就行

然后用npm命令安装hexo-cli而不是hexo咯

```
npm install -g hexo-cli
```

模板用[iissnan](https://github.com/iissnan/hexo-theme-next)
也就是
[nextT主题](http://theme-next.iissnan.com/getting-started.html)
上面的是themes，不是正文，要区别好。
上面的_ 开头的配置和你用 hexo init建立的不一样。

一开始我也不懂  后来才懂，看下鑫客栈 就是哔哩哔哩视频 你就会懂这个next主题是在themes中，而整个博客的文章是个大的配置

首先要`hexo init <name>`才会有，进入后在`npm install`

``
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
``

> 在 Hexo 中有**两份**主要的配置文件，其名称都是 _config.yml。 其中，一份位于站点根目录下，主要包含 Hexo 本身的配置；另一份位于主题目录下，这份配置由主题作者提供，主要用于配置主题相关的选项。为了描述方便，在以下说明中，将前者称为 站点配置文件， 后者称为 主题配置文件。

```
//常用
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub

//简写
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy

//复合
hexo deploy -g
hexo server -g
```

## 说下怎么用nexT主题

安装 Installation
1. 在终端切换到hexo 根目录. 在hexo目录下一定有 node_modules, source, themes 和其他文件夹:
```
$ hexo init username.github.io
$ cd username.github.io
$ ls
_config.yml  node_modules  package.json  public  scaffolds  source  themes
```

2. 从 github 上获取主题 。这里有几种方式来获取主题:
下载最新发布的版本 Download tagged release version
  在大多数情况下 稳定。 推荐用户下载这个。 还有两种什么标签发布版本，稳定master分支不管
```
$ mkdir themes/next
$ curl -s https://api.github.com/repos/iissnan/hexo-theme-next/releases/latest | grep tarball_url | cut -d '"' -f 4 | wget -i - -O- | tar -zx -C themes/next --strip-components=1
```

直接git到github上出问题了，不像jekyll直接放上去就好了，不知道什么问题


遇到
#### **问题1**
```
git remote add origin git@github.com:xuoutput/xuoutput.github.io.git
git push -u origin master
error: src refspec master does not match any.
error: failed to push some refs to 'git@github.com:xuoutput/xuoutput.github.io.git'
//是因为你没有add commit 库里啥也没有
```

#### **问题2**

* 用git push到github上了但还是看不来。
> 因为这个不是和jekyll一样的，直接push就好了，而是用hexo g生成后的publish文件。推荐用hexo d


## 单独来讲下hexo deploy

* 在使用`git deploy`之前，先去 `_config.yml` 中修改参数

```
deploy:
  type: git
```
* 安装 hexo-deployer-git。
```
$ npm install hexo-deployer-git --save
```

修改配置。
```
deploy:
  type: git             //有空格
  repo: <repository url>
  branch: [branch]
  message: [message]
参数	描述
repo	库（Repository）地址
branch	分支名称。如果您使用的是 GitHub 或 GitCafe 的话，程序会尝试自动检测。
message	自定义提交信息 (默认为 Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }})

//注意空格要加上，
```

### 其他方法
Hexo 生成的所有文件都放在 public 文件夹中，您可以将它们复制到您喜欢的地方。不过我没找到public文件夹


### 每次部署的步骤，可按以下三步来进行。
```
    hexo clean
    hexo generate
    hexo deploy
    
```

**再说三遍，不要用git push直接提交整个源blog，用hexo d来提交生成文件，这两个不一样的**
**再说三遍，不要用git push直接提交整个源blog，用hexo d来提交生成文件，这两个不一样的**
**再说三遍，不要用git push直接提交整个源blog，用hexo d来提交生成文件，这两个不一样的**

还有关于git库的，不需要删了库中的内容重新提交，只要你直接提交，那个库就按你最新的文件内容更改。
比如原来库中是文件abc，你要改成文件456，不需要删了abc，直接本地工作区删了abc，commit文件456，库中就没有abc了，这个库中哦不是append，

---

## 写作`hexo new`  然后做一个例子你就可以区分和`hexo new page`

先在主题配置文档中打开,这样才能体会new和new page区别

```
menu:
  home: / || home
  about: /about/ || user
  tags: /tags/ || tags
  categories: /categories/ || th
  archives: /archives/ || archive
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  commonweal: /404/ || heartbeat

```


用一下命令来新建一篇文章，注意新建的文件名是按title名来的
```
$ hexo new [layout] <title>
```

### 文件名称
Hexo 默认以标题做为文件名称，但您可编辑 `new_post_name` 参数来改变默认的文件名称，举例来说，设为 `:year-:month-:day-:title.md` 可让您更方便的通过日期来管理文章。

## Front-matter
Front-matter 是文件最上方以 --- 分隔的区域，用于指定个别文件的变量，举例来说：

```
---
title: my new post
date: 2018-01-20 14:54:25
tags:
---

参数	描述	默认值
layout	布局	
title	标题	
date	建立日期	文件建立日期
updated	更新日期	文件更新日期

tags	标签（不适用于分页）	
categories	分类（不适用于分页）

comments	开启文章的评论功能	true
permalink	覆盖文章网址	
```

例子

```
---
layout: post
title: my new post with resource
date: 2018-01-20 15:14:47
updated: 
tags:
- git
- hexo
- nodejs
- resource directory
categories: 
- diary
comments: true
premalink: 
---
```
[hexo下新建页面下如何放多个文章？](https://www.zhihu.com/question/33324071)
上面添加好也可以点开标签tags或categories能看到你的文章，但是你在导航栏中点点tags或categories就找不到。这个就是`hexo new page`的功能了，其实在主题中的那个`menu`开启的也是这个功能，这个menu里面的名字可以自定义的

```
---
layout: post
title: my new post with resource
date: 2018-01-20 15:14:47
updated: 
tags:
- git
- hexo
- nodejs
- resource directory
categories: 
- diary
comments: true
premalink: 
---
```
下面实例，建tags和categories页面

这其实就是hexo new [layout]这个layout的属性
```
hexo new page tags
```

打开 tags/index.md ，并改成：
```
title: 标签
date: 日期
type: "tags"        //这个一致，加不加引号无所谓
comments: false
```

**同理categories**



---

### 资源文件夹
比如图片，文章小，你可以放在source/images中（直接用markdown的语法![]()引用），但一旦文章多了，这就不好管理了。

所以，为每个文章设置一个资源文件夹，首先开启配置
```
_config.yml
post_asset_folder: true
```
然后`hexo new `就会多一个文件夹

使用3种语法
```
{% asset_path slug %}
{% asset_img slug [title] %}
{% asset_link slug [title] %}
//比如图片
{% asset_img example.jpg This is an example image %}

```




