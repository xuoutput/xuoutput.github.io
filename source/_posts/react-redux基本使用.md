---
title: react-redux基本使用
date: 2019-12-14 19:26:27
tags:
- react-redux
categories:
- redux教程
comments: false
permalink:
---

# react-redux基本使用

使用react-redux前也需要装redux,

不用在监听render方法了,只需要用`<provider>` 将APP根组件包上. 

> 但原来使用最基本的redux方法会失效,因为没有监听render了.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './store'

// 新增
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));


// 原来使用redux的
// const render = () => ReactDOM.render(<App />, document.getElementById('root'));
// render()
// store.subscribe(render)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## 参考

[Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
