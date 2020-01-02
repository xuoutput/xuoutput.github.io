---
title: react-router
date: 2019-01-04 09:08:00
tags:
- react-router
categories:
- react-router教程
comments: false
permalink:
---

# react-router

`<BrowserRouter>`和`<HashRouter>`两个组件。前者在你有服务器处理动态请求的时候使用，后者在静态网站的时候使用。

每种路由都会创建history对象，用来追踪当前的location

在匹配路由时，React Router只关心位置的路径名(pathname)  这意味着给定URL：
http://www.example.com/my-projects/one?extra=false
React Router尝试匹配的唯一部分是/my-projects/one。

可以在路由内部的任何位置创建<Route>，但是通常在同一地方渲染它们。你可以使用<Switch>组件来包裹一组<Route>。 <Switch>将迭代其子元素（路由），并仅渲染与当前路径名匹配的第一个元素。





## 参考

{% post_link react-router-v4 react-router-v4%}
[React Router Tutorial](https://github.com/reactjs/react-router-tutorial)