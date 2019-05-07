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

# webpack简单入门

## 输出

见到启动webpack后输出的信息, 这是啥?

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

其实都是使用依赖的简写, 如wds就是`webpack-dev-server`. atl就是`awesome-typescript-loader`, wdm是`webpack-dev-middleware`

## 参考

[深入浅出 Webpack](http://webpack.wuhaolin.cn/)
[入门 Webpack，看这篇就够了](https://segmentfault.com/a/1190000006178770)
[Node的path.resolve(__dirname，'./src')](https://www.jianshu.com/p/76966243f27f)