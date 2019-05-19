---
title: webpack简单入门
date: 2019-04-25 19:59:21
tags:
- webpack
categories:
- 前端教程
comments: false
permalink:
---

# webpack 简单入门

## 输出

见到启动 webpack 后输出的信息, 这是啥?

```bash
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from ./src
ℹ ｢atl｣: Using typescript@3.4.5 from typescript
ℹ ｢atl｣: Using tsconfig.json from /Users/xuheng/qiniu/work/annotation-sys/tsconfig.json
ℹ ｢atl｣: Checking started in a separate process...
ℹ ｢atl｣: Time: 2979ms
ℹ ｢wdm｣: Hash: d3a23643aefb00fc4a9b
```

其实都是使用依赖的简写, 如 wds 就是`webpack-dev-server`. atl 就是`awesome-typescript-loader`, wdm 是`webpack-dev-middleware`

Hot Module Replacement（HMR), 最方便的方法就使用 wds 咯

- 在 webpack 配置文件中添加 HMR 插件；
- 在 Webpack Dev Server 中添加“hot”参数；

## postcss

[在webpack项目中配置postcss，实现autoprefix](https://www.jianshu.com/p/71b8f1caef4e)

## 注意点

关于 less-loader, 要装 less 的
[webpack error in Cannot find module 'less'](https://stackoverflow.com/questions/36781031/webpack-error-in-cannot-find-module-less)

[less-loader](https://github.com/webpack-contrib/less-loader)

> 也说了 The less-loader requires less as peerDependency. Thus you are able to control the versions accurately.

## 参考

[深入浅出 Webpack](http://webpack.wuhaolin.cn/)
[入门 Webpack，看这篇就够了](https://segmentfault.com/a/1190000006178770)
[Node 的 path.resolve(\_\_dirname，'./src')](https://www.jianshu.com/p/76966243f27f)
