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
[廖雪峰的 Git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
[图解 Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)
[Git 官网](https://git-scm.com/docs)
[Git 重要概念与常用命令](https://www.linuxidc.com/Linux/2018-04/151810.htm)

[在线动画 git](https://learngitbranching.js.org/?demo)

# Git 命令行使用，不是 desktop

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

## 安装 Git

win 上直接下

## 创建 Git 仓库

> - 创建一个文件夹`<filename>`cd 进入后用`git init`初始化一个 Git 仓库，会有个`.git`文件，用来跟踪管理版本。**其实想让哪个文件夹成为仓库都是用这个命令**
> - 添加文件到仓库
>   - 第一步，使用`git add <filename>`,可以反复添加多个
>   - 第二步，使用命令`git commit -m "<some defination>"`，来提交到`工作区`(如果 commit 不成功应该要先配置

```bash
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

我是用 git add \*
git add \* git 会自动把你当前目录所有修改过的文件添加
git add . Git 会递归地将你执行命令时所在的目录中的所有文件添加上去，所以如果你将当前的工作目录作为参数，它就会追踪那儿的所有文件

- git add . ：他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。
- git add -u ：他仅监控已经被 add 的文件（即 tracked file），他会将被修改的文件提交到暂存区。add -u 不会提交新文件（untracked file）。（git add --update 的缩写）
- git add -A ：是上面两个功能的合集（git add --all 的缩写）

- 删除就是`git rm <filename>` 当然先得删掉本地文件夹中的

### 工作区，暂存区

![localOperations](localOperations.png)

- 工作区（working directory）就是你的文件夹
- 版本库(repository) 里面有 stage 暂存区 和 第一个分支 master

工作区的用`git add`加到库中 stage，`git commit`到当前分支 master
第一步是用 git add 把文件添加进去，实际上就是把文件修改`添加`到暂存区(working directory 没空哦)；
第二步是用 git commit 提交更改，实际上就是把暂存区的`所有内容提交`到当前分支(暂存区也没空，不然怎么 git diff)。

---

## 文件状态

untracked unmodified / tracked modified staged committed

> git 指跟踪 tracked 的文件，也就是 git add filename 之后的，在 staged 状态，changes to be committed
> modified 之后 git status 看到 Changes not staged for commit

`git status` 查看
![fileStatus](fileStatus.png)

## .gitignore 文件

文件 .gitignore 的格式规范如下：

- 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。
- 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

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

> 回顾下`git diff` 3 个地方 2 种比较
> `git diff` #是工作区(work dict)和暂存区(stage)的比较
> `git diff --cached` #是暂存区(stage)和分支(master)的比较
> 以可以在 add 前看一个 diff，在 commit 之前也看一次 diff

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

---

## 穿越版本

### 修改文件 （掌握 working tree 状态）

> - 随时掌握 working tree 状态用`git status`
> - 如果`git status`告诉你有文件被修改过，可以使用`git diff <filename>`来查看不同

- 使用`git status`可以看目前状态，每次`修改`文件后可以查看
  要看文件具体修改了什么，用`git diff <filename>`
  知道修改了什么后就可以放心用`git add <filename>`添加到工作区
  这里如果在使用`git commit`之前用`git status`看就是会提示 modified readme.md

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

> Git 告诉我们当前没有需要提交的修改（nothing to commit），而且，工作目录是干净（working tree clean）的

### 版本回退

- 手动存盘，就是这个`commit`的
- 用`git log`来查看用了哪些 commit，对应有-m ""的内容，作者 时间，所以这个-m 一定要写
- 加参数的`git log --pretty=oneline`

```
$ git log --pretty=oneline
186306069575833edac48f1e8fc581223abdc33f (HEAD -> master) append GPL
6b2bbfa0c2f61d76d470b63fd77381e86f98d263 add distrubuted
b1f7c3c78f2597143c184ab51c51378934920a92 write a readme file
```

- 好长前面的是 hash 算出来的数

- 怎么知道当前版本呢用`HEAD`表示当前版本，上一个是`HEAD^`，上上一个`HEAD^^`,一次类推。简写`HEAD~2` `HEAD`可以看成是一个指针。
- 知道了版本号，怎么回去用呢？用`git reset`

```
//这里表示回到上一个版本
$ git reset --hard HEAD
HEAD is now at 1863060 append GPL
```

- 但回到过去后再用`git log`就没有未来版本的`HEAD`怎么办？
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

- 因为 Git 跟踪并管理的是修改，而非文件。

第一次修改 -> git add -> 第二次修改 -> git commit

你看，我们前面讲了，Git 管理的是修改，当你用 git add 命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit 只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

### 撤销修改 用版本库里的版本替换工作区的版本

命令`git checkout -- readme.txt` (不是`git checkout` 有--)意思就是，把 readme.txt 文件在工作区的修改全部撤销，这里有两种情况：

一种是 readme.txt 自修改后还没有被放到暂存区，现在，撤销修改就回到和`版本库`一模一样的状态；
一种是 readme.txt 已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到`暂存区`后的状态。

总之，就是让这个文件回到最近一次 git commit 或 git add 时的状态。就是`stage暂存库`咯

- 一种是 add 添加到了 stage，用`git reset HEAD file`撤销修改
- commit 到了版本库了呢，用`git reset`

> 场景 1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

> 场景 2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD file`，就回到了场景 1，第二步按场景 1 操作。

> 场景 3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节`git reset --hard HEAD`，不过前提是没有推送到远程库。

### 删除文件 （删除也是修改哦）

- 首先自己在 working directory 中删了，但怎么把 stage repository 中也删了呢？
- 现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：
- 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：`git checkout -- test.txt`

`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

当然还能从版本库中删除，不顾版本库能 reset

---

## 远程仓库

### 添加到远程仓库

- 第 1 步：创建 SSH Key。在用户主目录下看有没有.ssh 目录，里面有没有 id_rsa 和 id_rsa.pub 这两个文件。没有就用命令创建。

```
//使用默认值，一路回车
ssh-keygen -t rsa -C "youremail@example.com"
//不知道就用git config 查看
```

- 第 2 步：登录 github，点击头像，"setting", "SSH and GPG keys"页面。点击"New SSH key"填好 title，复制 id_rsa.pub。这样就添加好了，用来使 github 识别这个推送是你发起的。

> 现在情况是我们只是在本地建立库，但没有在 github 上建立，为了保持同步，所以得现在 github 上**手动建立一个同名的仓库，这步省不了**
> 可以看到有提示，可以与本地已有的库关联，就 2 条命令

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

> - 要关联一个远程库，使用命令 git remote add origin git@server-name:path/repo-name.git；
> - 关联后，使用命令 git push -u origin master 第一次推送 master 分支的所有内容；
> - 此后，每次本地提交后，只要有必要，就可以使用命令 git push origin master 推送最新修改；

上面是从本地到远程
当然也有从远程到本地咯，用`git clone <这里加远程库的git地址git://开头的>`

记住克隆不是关联 remote 哦，所以没事就是下载。
要推送得先关联，

#### **push 过去还有个问题**

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

还有关于 git 库的，不需要删了库中的内容重新提交，只要你直接提交，那个库就按你最新的文件内容更改。
比如原来库中是文件 abc，你要改成文件 456，不需要删了 abc，直接本地工作区删了 abc，commit 文件 456，库中就没有 abc 了，这个库中哦不是 append，

## stash 存储和清理

```git
// 全部清空
git stash clear
```

## git bisect

git bisect start HEAD xxx  // 从不正常到正常范围

git bisect good/bad

git bisect reset

配合 git log --pretty=oneline 用

也可以

git bisect start
然后 git bisect `good/bad [commithash]` 指定范围

还有个操作时replay吧, 如果good后bad打错了可以撤销

## git remote

git remote -v

git remote add upstream xxx

git remote set-url xxxx

这个命令一般和 git fetch , git rebase , git checkout 一起用

## 常用缩写

结合 zsh 的 git 插件

gfu = git fetch upstream
gbc = git branch --show-current

## git pull

git pull upstream pull/2398/head 
可以拉取github上指定的MR

`git remote set-url origin [url]`

## FAQ

整理下, 写个3个阶段吧

- 第一阶段就介绍常用的 git 命令
- 结合一些工具 zsh 的插件, 等 fork 这种, 介绍常用快捷键 场景, git open
- 将 git 底层原理
- 讲 git 其他命令
- 将工程中, 比如tapd, gitub上 issue 的标签, tag

git config
git branch
git checkout
git remote
git bisect
git rebase
git fetch
git commit
git push

git add
git status
git diff
  diff的 --name-only和 --stat  相对而言,--stat详细点点
git show
git log
  tig
  [自定义log颜色](https://jasonhzy.github.io/2016/05/05/git-log/)
  tig 就是一些查看的命令
```bash
tig log    [options] [revisions] [--] [paths]
tig show   [options] [revisions] [--] [paths]
tig blame  [options] [rev] [--] path
tig grep   [options] [pattern]
tig refs
tig stash
tig status
```

这些常用的

[进阶 git 底层原理](http://gitbook.liuhui998.com/1_2.html)


2. git push的会后要你输入账号密码的问题. 是协议的不对.
`git remote -v`后如果是https的地址, 在push的时候回让你填账号密码的, 所以用`git remote set-url origin [url]`来修改为用`git@`的协议

3. 获取远程库中指定分支

直接gco -b好了, 然后带上远程库/远程分支名
git checkout -b 本地分支名 upstream/远程分支名

4. git remote update, git fetch, git pull的区别
git remote update will update all of your branches set to track remote ones, but not merge any changes in., 比如你设置了origin和upstream的, 都更新, 然后你可以指定某一个远程分支
git fetch will update only the branch you're on, but not merge any changes in., 这里你可以用git fetch --all拉所有的,效果同上, 也可以指定git fetch origin , 当然git fetch origin master:master
git pull will update and merge any remote changes of the current branch you're on. This would be the one you use to update a local branch.

加这个 不要新建一页
git config --global core.pager 'less -FXR'

## 参考

[Git 和 Pager 的那点事](http://icyleaf.com/2013/10/about-pager-on-git/)
[猴子](https://backlog.com/git-tutorial/cn/intro/intro1_1.html)

## 配置参考

```git
  1 [user]
  2         name = xuheng
  3         email = xuheng@qiniu.com
  4 [core]
  5         pager = less -FXR
  6         excludesfile = /Users/xuheng/.gitignore_global
  7 [difftool "sourcetree"]
  8         cmd = opendiff \"$LOCAL\" \"$REMOTE\"
  9         path =
 10 [mergetool "sourcetree"]
 11         cmd = /Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \    "$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
 12         trustExitCode = true
 13 [commit]
 14         template = /Users/xuheng/.stCommitMsg
 15 [color]
 16         ui = true
```

alias 用的多的是用 oh-my-zsh 的自带的 `~/.oh-my-zsh/plugins/git/git.plugin.zsh`

> 可以添加 自定义 命令缩写的