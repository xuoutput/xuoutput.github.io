---
title: travis配置文件的编写
date: 2019-03-05 14:08:21
tags:
- travis
categories:
- 前端教程
comments: false
permalink:
---

# travis配置文件的编写

## 介绍

```yaml
language: node_js
dist: trusty
sudo: required
matrix:
  include:
    - language: node_js
      node_js:
        - 8.15.0
      env:
        - TRAVIS_SECURE_ENV_VARS=false
      addons:
        apt:
          sources:
            - ubuntu-toolchain-r-test
            - mysql-5.7-trusty
          packages:
      branches:
        only:
          - master
          - dev
      before_install:
        - echo -e "machine github.com\n login $CI_USER_TOKEN\n password x-oauth-basic" >> ~/.netrc
        # Repo for Yarn
        - sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
        - echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
        - sudo apt-get update -qq
        - sudo apt-get install -y -qq yarn=1.12.3-1
      script:
        - node -v
        - yarn -v
        - ./travis-script.sh
      cache:
        yarn: true
        directories:
          - $TRAVIS_BUILD_DIR/project-template/client/node_modules

```

### sudo

需不需要`sudo`权限 一般是要的`require`

### matrix

相当于就是一个几乘几的各种情况, 自动给你跑, 也可以`include`, 也可以`exclude`下.

exclude的要精确匹配 env 这种

### addons

额外的软件包

### env

就是环境咯, `TRAVIS_SECURE_ENV_VARS=false`不加密

### branch

要进行CI的分支, 可以写safelist`only`和blocklist`except`

### 在`before_install`下

第一条命令: `echo -e "machine github.com\n  login $CI_USER_TOKEN" > ~/.netrc`, 用来将登陆配置信息追加写入`~/.netrc`中, 方便以后登录不用填用户名密码.
[travis API Token machine github.com\n](https://docs.travis-ci.com/user/private-dependencies/#api-token)

第二条命令: `apt-key adv --fetch-keys` will only fetch one key from the URL, and if the URL contains multiple keys, please use `wget | apt-key add instead`.

第三条命令: `tee`用来从标准输入中读, 然后便准输出. 就是一个复制粘贴的功能. 所以后面就是将 `deb http://dl.yarnpkg.com/debian/ stable main` 写入 `yarn.list` 中

第四第五条命令: 就是更新软件库表, 然后安装上 `yarn`

> 整个第2-5条命令就是在安装`yarn` [https://yarnpkg.com/en/docs/install#debian-stable](https://yarnpkg.com/en/docs/install#debian-stable)

### `script`

就是这个travis要跑的脚本.


### cache

就是cache, 看教程就是这么写的, `$TRAVIS_BUILD_DIR`就是当前`.travis.yml`所在的目录.

## 参考

[持续集成服务 Travis CI 教程 阮一峰 666](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)

[Building a JavaScript and Node.js project](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

[travis API Token machine github.com\n](https://docs.travis-ci.com/user/private-dependencies/#api-token)
[.netrc文件简单使用](https://blog.csdn.net/du_chao_qun/article/details/53464454)
[使用auth-source库读取Netrc文件中的用户名和密码](http://lujun9972.github.io/blog/2017/05/25/%E4%BD%BF%E7%94%A8auth-source%E5%BA%93%E8%AF%BB%E5%8F%96netrc%E6%96%87%E4%BB%B6%E4%B8%AD%E7%9A%84%E7%94%A8%E6%88%B7%E5%90%8D%E5%92%8C%E5%AF%86%E7%A0%81/)
[linux >和>>的区别](https://blog.csdn.net/wenxuechaozhe/article/details/52564394)

[apt-get 命令详解(中文),以及实例](http://blog.51yip.com/linux/1176.html)
[https://yarnpkg.com/en/docs/install#debian-stable](https://yarnpkg.com/en/docs/install#debian-stable)