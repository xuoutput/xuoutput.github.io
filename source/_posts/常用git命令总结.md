---
layout: post
title: 常用git命令总结
date: 2018-01-20 19:51:47
updated: 
tags:
- git
- github
- 前端工具
- 前端
categories: 
- 前端
comments: false
permalink: 
---
首先推荐
[廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
[图解Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)
[Git官网](https://git-scm.com/docs)
[Git重要概念与常用命令](https://www.linuxidc.com/Linux/2018-04/151810.htm)

[在线动画git](https://learngitbranching.js.org/?demo)


# Git命令行使用，不是desktop

```java
1. git init
2. git config --list
  1. git config --system --list         所有用户/etc/gitconfig
  2. git config --global --list         当前用户~/.gitconfig 使用git前的配置
    1. git config --global user.name "yourname"
    2. git config --global user.email "youremail@cc"
    3. git config --global core.editor vim      
    4. git config --global merge.tool kdiff3    差异分析工具
  3. git config --local --list          当前项目.git/config，向上覆盖
3. git add <filename> 
  1. git add .
  2. git add -u
  3. git add -A
  4. git add -f <filename>  强制添加
4. git rm <filename>  //直接连带工作区的也删了，untracked，而不是简单的rm工作区的文件
  1. git rm -f <filename>   //强制删除
  2. git rm --cached readme.txt   //只删除stage中的，工作区不删除
  3. git rm -r --cached .     // 先把本地缓存删除（改变成未track状态）
5. git mv file_from file_to   //移动或改名, 其实就是下面三条
  1. mv README.txt README
  2. git rm README.txt
  3. git add README
6. git commit -m "comments"  / git commit -a -m "comments"直接把tracked的文件跳过add，直接commit
7. git status
  1. git diff [<filename>]
  2. git diff --cached, git diff --staged 一样的
  3. git diff HEAD -- <filename>
8. git log, git reflog
  1. git log --pretty=oneline 看HEAD
  2. git log --graph -pretty=oneline --abbrev-commit  分支
  3. git log -p -2    //-p 选项展开显示每次提交的内容差异，用 -2 则仅显示最近的两次更新
9. git reset --hard HEAD  ^ ~
  1. git checkout -- <filename>
  2. git reset HEAD <filename>
  3. git reset --hard HEAD  
10. 远程库
  1. ssh-keygen -t rsa -C "youremail" + 将pub_key放到github上
  2. github上new repository
  3. git remote add origin git@
    1. 关联后可以用git remote -v看
    2. git remote rm origin   删除关联  默认名字origin
    3. git remote add github git@   这里就换名字了，以后git push github master这样换名字
       git remote add gitee git@
    4. git remote rename pb paul
  4. git push -u origin master 第一次加-u，以后不加. 这个必须要本地commit后才能推送，
  5. git clone git@   clone的只是master分支
    1. git clone -b <branchname> git@
11. 分支
  1. git branch [<branchname>] 
    1. git branch -v
    2. git branch -d <branchname>
    3. git branch --merged      //查看哪些分支已被并入当前分支
    4. git branch --no-merged   //查看尚未合并的工作
  2. git checkout <branchname>
    1. git checkout -b <branckname>
  3. git merge <baranchname>  默认merge是Fast forward, 没有commit的HEAD
    1. git merge --no-ff -m "comments" <branchname>
  4. 若有冲突，就改下一下,删了>> == <<，然后add commit，不用git merge  
    1. mergetool, kdiff, meld
  5. git log --graph -pretty=oneline --abbrev-commit
  6. 策略 bug和feature分支，保存现场，防止干扰。因为working directory and stage sharing
    1. git stash 
      1. git stash apply, git stash drop => git stash pop 二合一  
      2. git stash apply stash@{0} 序号
12. 多人协作
  1. git remote [-v]
    1. git remote show [remote-name]
  2. git checkout -b dev origin/dev   远程库dev分支创建并切换到本地
  3. git push origin master/dev   
  4. 冲突 git branch --set-upstream <branch-name> origin/<branch-name> 关联
  5. 解决冲突在 git pull   //pull=fetch+merge 
  //git fetch 并没更改本地仓库的代码，只是拉取了远程 commit 数据，将本地库所关联的远程库的 commit id 更新为latest
12. 标签tags
  1. git tag [<tagname>] 查看，打在最新的commmit上 // git tag -l 'v1.4.2.*'
    1. git tag -d <tagname>   删本地
    2. git push origin:ref/tags/<tagname>
  2. git tag <tagname> <HEAD>  用git log --pretty=oneline 查到
    1. git tag -a <tagname> -m "comments" [<HEAD>]  //annotated
    2. git tag -s <tagname> -m "comments" [<HEAD>]
  3. git show <tagname>
13. 自定义 git config 在.git/config
  1. .gitignore 忽略文件  # ! /
    1. 若添加不进去, git add -f <filename>
    2. git check-ignore -v <filename>是在不行check下
  2. git config --global alias.st status    设置别名
    1. git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"


```
---

# 总结

## 安装Git

win上直接下

## 创建Git仓库

> * 创建一个文件夹`<filename>`cd进入后用`git init`初始化一个Git仓库，会有个`.git`文件，用来跟踪管理版本。**其实想让哪个文件夹成为仓库都是用这个命令**
> * 添加文件到仓库
>    * 第一步，使用`git add <filename>`,可以反复添加多个
>    * 第二步，使用命令`git commit -m "<some defination>"`，来提交到`工作区`(如果commit不成功应该要先配置
```
git config --global user.name ""
git config --gaobal user.email ""
//这个配置用 git config --list 可以看到3种级别所有信息
//git config 有3种级别
//查看系统config
git config --system --list
//查看当前用户（global）配置
git config --global  --list
//查看当前仓库配置信息
git config --local  --list


```
我是用git add \*
git add \* git会自动把你当前目录所有修改过的文件添加
git add . Git会递归地将你执行命令时所在的目录中的所有文件添加上去，所以如果你将当前的工作目录作为参数，它就会追踪那儿的所有文件

* git add . ：他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。
* git add -u ：他仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区。add -u 不会提交新文件（untracked file）。（git add --update的缩写）
* git add -A ：是上面两个功能的合集（git add --all的缩写）

* 删除就是`git rm <filename>` 当然先得删掉本地文件夹中的

### 工作区，暂存区

![localOperations](localOperations.png)

* 工作区（working directory）就是你的文件夹
* 版本库(repository) 里面有stage暂存区 和 第一个分支master

工作区的用`git add`加到库中stage，`git commit`到当前分支master
第一步是用git add把文件添加进去，实际上就是把文件修改`添加`到暂存区(working directory没空哦)；
第二步是用git commit提交更改，实际上就是把暂存区的`所有内容提交`到当前分支(暂存区也没空，不然怎么git diff)。


___

## 文件状态
untracked unmodified /  tracked modified staged committed 
> git指跟踪tracked的文件，也就是git add filename之后的，在staged状态，changes to be committed
> modified之后 git status 看到Changes not staged for commit


`git status` 查看
![fileStatus](fileStatus.png)


## .gitignore文件

文件 .gitignore 的格式规范如下：

* 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配。
* 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

例子

```
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# ignore all .txt files in the doc/ directory
doc/**/*.txt
```

## 查看已暂存未暂存的更新

> 回顾下`git diff` 3个地方2种比较
> `git diff` #是工作区(work dict)和暂存区(stage)的比较
> `git diff --cached`    #是暂存区(stage)和分支(master)的比较
以可以在add前看一个diff，在commit之前也看一次diff

```
git diff
git diff readme.md
git diff HEAD -- readme.txt
效果一样诶，不对

git diff 是工作区和暂存区的对比
git diff --cached 是暂存区和分支的对比
git diff HEAD -- readme.txt  工作区和分支的对比
```

## 移动文件或改名
git mv file_from file_to
分解为下面三条
```
$ mv README.txt README
$ git rm README.txt
$ git add README
```
___




## 穿越版本

### 修改文件 （掌握working tree状态）
> * 随时掌握working tree状态用`git status`
> * 如果`git status`告诉你有文件被修改过，可以使用`git diff <filename>`来查看不同

* 使用`git status`可以看目前状态，每次`修改`文件后可以查看
要看文件具体修改了什么，用`git diff <filename>`
知道修改了什么后就可以放心用`git add <filename>`添加到工作区
这里如果在使用`git commit`之前用`git status`看就是会提示modified readme.md
```git
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   readme.md

```
然后`git commit`再用`git status`。
```
$ git status
On branch master
nothing to commit, working tree clean
```
> Git告诉我们当前没有需要提交的修改（nothing to commit），而且，工作目录是干净（working tree clean）的


### 版本回退

* 手动存盘，就是这个`commit`的
* 用`git log`来查看用了哪些commit，对应有-m ""的内容，作者 时间，所以这个-m 一定要写
* 加参数的`git log --pretty=oneline`

```
$ git log --pretty=oneline
186306069575833edac48f1e8fc581223abdc33f (HEAD -> master) append GPL
6b2bbfa0c2f61d76d470b63fd77381e86f98d263 add distrubuted
b1f7c3c78f2597143c184ab51c51378934920a92 write a readme file
```
* 好长前面的是hash算出来的数

* 怎么知道当前版本呢用`HEAD`表示当前版本，上一个是`HEAD^`，上上一个`HEAD^^`,一次类推。简写`HEAD~2` `HEAD`可以看成是一个指针。
* 知道了版本号，怎么回去用呢？用`git reset`

```
//这里表示回到上一个版本
$ git reset --hard HEAD
HEAD is now at 1863060 append GPL
```
* 但回到过去后再用`git log`就没有未来版本的`HEAD`怎么办？
用`git reflog`来查看

```
$ git reflog
6b2bbfa (HEAD -> master) HEAD@{0}: reset: moving to HEAD^
1863060 HEAD@{1}: reset: moving to HEAD
1863060 HEAD@{2}: commit: append GPL
6b2bbfa (HEAD -> master) HEAD@{3}: commit: add distrubuted
b1f7c3c HEAD@{4}: commit (initial): write a readme file
```

> `HEAD`指向的是当前版本，允许我们用`git reset --hard HEAD`来在不同版本之间穿梭
> 用`git log`和`git reflog`一个看过去，一个看未来 确保不会丢`HEAD`




### 管理修改

* 因为Git跟踪并管理的是修改，而非文件。

第一次修改 -> git add -> 第二次修改 -> git commit

你看，我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

### 撤销修改 用版本库里的版本替换工作区的版本

命令`git checkout -- readme.txt` (不是`git checkout` 有--)意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和`版本库`一模一样的状态；
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到`暂存区`后的状态。

总之，就是让这个文件回到最近一次git commit或git add时的状态。就是`stage暂存库`咯

* 一种是add添加到了stage，用`git reset HEAD file`撤销修改
* commit到了版本库了呢，用`git reset`

> 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

> 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD file`，就回到了场景1，第二步按场景1操作。

> 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节`git reset --hard HEAD`，不过前提是没有推送到远程库。


### 删除文件 （删除也是修改哦）

* 首先自己在working directory中删了，但怎么把stage repository中也删了呢？
* 现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：
* 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：`git checkout -- test.txt`

`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

当然还能从版本库中删除，不顾版本库能reset

---
## 远程仓库

### 添加到远程仓库

* 第1步：创建SSH Key。在用户主目录下看有没有.ssh目录，里面有没有id_rsa和id_rsa.pub这两个文件。没有就用命令创建。

```
//使用默认值，一路回车
ssh-keygen -t rsa -C "youremail@example.com"
//不知道就用git config 查看
```

* 第2步：登录github，点击头像，"setting", "SSH and GPG keys"页面。点击"New SSH key"填好title，复制id_rsa.pub。这样就添加好了，用来使github识别这个推送是你发起的。

> 现在情况是我们只是在本地建立库，但没有在github上建立，为了保持同步，所以得现在github上**手动建立一个同名的仓库，这步省不了**
> 可以看到有提示，可以与本地已有的库关联，就2条命令

```
//添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。
git remote add origin git@github.com:xuoutput/learngit.git
//把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
//由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
git push -u origin master
```
```
//以后提交不需要加-u
git push origin master
```

> * 要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；
> * 关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
> * 此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

上面是从本地到远程
当然也有从远程到本地咯，用`git clone <这里加远程库的git地址git://开头的>`

记住克隆不是关联remote哦，所以没事就是下载。
要推送得先关联，

#### **push过去还有个问题**
```
git remote add origin git@github.com:xuoutput/xuoutput.github.io.git
git push -u origin master
error: src refspec master does not match any.
error: failed to push some refs to 'git@github.com:xuoutput/xuoutput.github.io.git'
//是因为你没有add commit 库里啥也没有

$ git push origin master
Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
//明明已经成功过一次，怎么就不行了，应为你把生成的ras秘钥都删了，我去
```

### 还有个坑的， `hexo d`之后首页没有变化
这个你要修改下配置文件才会发生变化，好气啊，不知道什么鬼设定

---

## 分支管理








---
还有关于git库的，不需要删了库中的内容重新提交，只要你直接提交，那个库就按你最新的文件内容更改。
比如原来库中是文件abc，你要改成文件456，不需要删了abc，直接本地工作区删了abc，commit文件456，库中就没有abc了，这个库中哦不是append，

