---
title: git入门中
date: 2019-07-13 11:20:15
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

# git 入门中

对于掌握一些 git 命令基础的情况下,总结.
{% post_link 常用git命令总结 常用git命令总结 %}

## 刚入手的电脑装完 git 后配置

```git
git config --global user.name 'username'      // 用github就填你github的昵称, 公司内部的就填你真正的名字
git config --global user.email 'user@xx.com'  // 同理
ssh-keygen -t rsa -C "youremail" // 将~/.ssh/id_rsa.pub的内容放到你远程库上的SSH key中, 这样就可以push上去
```

开发人员一般再去远程库上 clone 下来, 而不是本地推上去一个新的(建议用 clone)

```git
git clone git@xxx.com:yourname/project.git     // 注意不是http的, http的push时要输密码的
cd project
vim readme.md
git add readme.md
git commit -m 'add readme'
git push -u origin your-branch
```

以上只是在自己开发, 在公司私有库开发要先 fork 公司的代码到自己的 github 库中

```git
git clone git@xxx.com:yourname/project.git     // 还是从你的github账号中fork的库
cd project
vim readme.md
git add readme.md
git commit -m 'add readme'
// 一种push
git push -u origin your-branch      // push到自己的远程库后, 然后提pr
// 常用的另一种方式, 推荐
git remote add upstream git@xxx.com:yourcompany/project.git   // 加了这个主要是为了提交前同步
git remote update upstream            // 提交前保持最新, 防止冲突
git rebase upstream/develop
git push -u upstream your-branch              // 也不是origin, 这样你就直接可以去upstream的仓库中找到你提交的分支信息(一般直接在项目库首页, 不需要专门点到branch, pr中),再点pr了, 当然在你的origin中也是有这个分支的
```

> 注意, 在你想推倒远程的分支上第一次 push 时要加-u,某些公司内部仓库需要每次 push 都加, github 只要一次. origin 和 upstream 这个可以在 git remote -v 中看, 一般 origin 就是你 clone 的地址(`git branch -a`也可以看), upstrea 是 fork 的地址, 没有就`git remote add`. 最后的 branch 是你想推到远程的 feat, hotfix 分支. -u 这个操作也可以在 checkout 新分支时用 `git branch -u`指定, 这样就不用-u 了.
> 在 github 中一般 origin 指你自己账号下的库, upstream 指公司开发的那个库 clone 源头
> 一般开发人员在 push 前需要更新最新分支, 防止冲突, 命令`git remote update` 在 `git rebase origin master`. `git fetch upstream` 也一样, 第二种增加远程分支主一方面是为了提 pr 方便, **但重点是同步下远程分支, 防止冲突**
> 那什么时候用`git merge` 呢, 比如你想拉别人的 branch 就可以用 `git pull` 而不是 `git rebase`

一般只会 clone 下第一个分支, 如果要别的分支呢, checkout 一个出来就好

```git
git checkout -b dev upstream/dev
```

本地 push 一个新的到远程(可不看, 只是针对自己的库)

```git
cd existing_folder
git init    // 一般都早init了 不需要这个
git remote add origin git@xxx     // origin是你自己设置的远程库
git add .
git commit
git push -u origin master
```

## 其他常用操作

### 查看配置问题 git config --list

```git
1. git config --list                    // 列出所有配置
  1. git config --system --list         // 所有用户/etc/gitconfig
  2. git config --global --list         // 当前用户~/.gitconfig 使用git前的配置
    1. git config --global user.name "yourname"
    2. git config --global user.email "youremail@cc"
    3. git config --global core.editor vim
    4. git config --global merge.tool kdiff3    // 差异分析工具
  3. git config --local --list          // 当前项目.git/config，向上覆盖
```

打 git 命令后不想弹出新的窗口用 `git config --global core.pager 'less -FXR'`

### status

`git status` 就常用了, 看状态, 有些参数也可以研究下

### add 中的操作, 到暂存区

> `.` 是用来表示当前目录
> 注意这里主要说的是添加 add 到暂存区, `git rm`有从暂存区删除的功能, 也有只删除文件, 但还是需要 add 下的

`git add -i` 可以看到用交互时, 但不推荐这么操作, 太影响使用了.

```git
1. git add [参数] <filename>
  1. git add .    // 不加参数默认将修改的文件和未跟踪新添加的文件添加到git的暂存区, **也包括删除的**, 注意git2.0开始就包括删除的了. 等同于 git add -A, 要想达到原来的效果用 git add --ignore-removal
  2. git add -u   // 将跟踪的修改或删除的文件添加到暂存区, **不包括新建的文件**
  3. git add -p <filename>  // 按选择对一个文件中的某些修改代码块进行分次add, 实现多次提交
  3. git add -f <filename>  // 强制添加, 而不管.gitignore中的设置
```

### rm 删除操作

`git rm`删除文件, 但还是需要 add 下的, 也有从暂存区删除的功能, **解除追踪** unadd

```git
git rm <filename>
git rm --cached <filename>    // 抵消git add的操作
```

### 移动 mv, 不要自己手动移动

移动和改名, 记得 `git mv`, 手动移动会导致 git 记录问题

### commit

`git commit` 就是注意按 angular 的注释规范来, 最多用的参数是 --amend. -m 就不用了

### 分支的问题

```git
1. git branch [<branchname>]                    // 不加参数就是列出全部分支, -a是显示远程, 只有分支名就是创建
    1. git branch -v                            // 显示sha1和commit的注释
    2. git branch -d <branchname>               // -D强制删除
    3. git branch -m <branchname> <newname>     // 改名
    4. git branch -u <url> [name]               // 设置upstream, 没有name就是当前分支
  2. git checkout <branchname>
    1. git checkout -b <branckname>             // 一般创建并切换就用这gco -b <>
```

### stash

暂存区, 经常用到

```git
git stash list            // 列出暂存区有哪些
git stash save 'comment'  // 给暂存进去的加个名字
git stash apply stash@{n} // 使用, 但不删除
git stash pop             // 使用最近一个, 并在暂存区中删除
git stash drop            // 删掉某一个
git stash clear           // 清空暂存区
```

### diff

很少用, 一般用 vsc 上的功能看

### remote

```git
git remote -v                         // 看下有哪些远程
git remote show <name>                // 某个远程仓库具体的信息
git remote add origin git@..          // 添加, 用来保持更新
git remote remove <name>              // 删除
git remote rename <oldname> <newname> // 改名
git remote update [name]              // 更新远程库
```

## 参考

[GitHub Pull Request 入门](https://zhuanlan.zhihu.com/p/51199833)
[阮一峰的 git 666666](https://www.bookstack.cn/read/git-tutorial/docs-commands-git-add.md)
