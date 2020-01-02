---
title: redux基本使用
date: 2019-12-14 17:29:15
tags:
- redux
categories:
- redux教程
comments: false
permalink:
---

# redux 基本使用

先看一遍阮一峰的

## 设计思想

Redux 的设计思想很简单，就两句话。

1. Web 应用是一个状态机，视图(view)与状态(state)是一一对应的。
2. 所有的状态(state)，保存在一个对象(store)里面。

## 基本概念和 API

![redux.jpg](redux.jpg)

4 个基本概念,3 个方法和 2 个组件

store, state, action, reducer

1. store 就是存整个应用数据的地方, 整个应用只能有一个 store
2. state 是 store 中某个时刻的数据,相当于快照,一个 view 对应一个 state
3. action 中存着 view 告诉 store,我要什么 state. 用户接触的是 view,所有操作都是在 view 上交互的. 同时有 action creator 来封装原始 action
4. reducer. store 收到 action 后要给出一个新的 state,这样 view 就能保持最新.通过 reducer 计算得到,即 state 的计算过程. 传入 state 和 action,返回一个 state.一般传入 createStore 中,在 store.dispatch 后自动计算.

3 个方法

1. store 的得到, 通过 createStore()得到.
2. store.dispatch(action) 用来发送一个 action
3. store.getState() 用来获取整个 store 的信息, 注意如果你使用了 combineReducers,那么使用的时候要看看是哪个 reducer
   1. 例如阮一峰的例子中,如果你想得到`count`的值,但报错 `Objects are not valid as a React child(found: object with keys (count))` 这个可能就是你直接把整个值当 value,而不是 `store.getState().count` 得到
4. store.listen()监听事件,返回新的 store 后,需要改变的方法,一般是 render 和 setState 方法

2 个从 `redux` 中导出得到的, 中间件会在多一个 `applyMiddleware`

1. createStore. 有 3 个参数,第一个是 reducers, 第二个是整个 store 的初始值,第三个是中间件
2. combineReducers. 直接传入.

## 例子

通过 `npx create-react-app redux-demo`

> 如果碰到创建后没有 src 文件夹, 可能是使用旧版的 `create-react-app` 删干净就好. [Global CRA uninstall: npm uninstall -g create-react-app #8097](https://github.com/facebook/create-react-app/issues/8097)

## 参考

[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
