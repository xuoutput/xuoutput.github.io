---
title: React项目结构和组件命名之道
date: 2018-11-28 16:50:17
tags:
- react
categories:
- react
comments: false
permalink:
---

# React项目结构和组件命名之道

[React项目结构和组件命名之道](https://zhuanlan.zhihu.com/p/47321322)

不错, 

## 显示项目结构

从都放`User`下到, 新建一个文件夹

```javascript
src
└─ components
  └─ User
    ├─ Form.jsx
    └─ List.jsx

```

```javascript
src
└─ components
  └─ User
    ├─ Form
    │ ├─ Form.spec.jsx
    │ ├─ Form.jsx
    │ └─ Form.css
    └─ List.jsx
```

## 再是组件命名, 这里我们说的是如何命名我们的 `class` 或者定义组件的常量

2种哦,

采用基于路径的**组件命名方式**,

`components/User/List.jsx`，那么它就被命名为 `UserList`。

如果文件名和文件目录名相同，我们不需要重复这个名字。也就是说，`components/User/Form/Form.jsx` 会命名为 `UserForm` 而不是 `UserFormForm`。

好处:

1. 方便在vsc中用`cmd+p`搜
2. 目录树中定位
3. 避免引入`import`时重名
    1. 改进命名

遵循这种方式，你可以根据组件的**上下文环境**来命名文件。想一下上面的 form 组件，我们知道它是一个 User 模块下的 form 组件，但是既然我们已经把 form 组件放在了 User 模块的目录下，我们就不需要在 form 组件的文件名上重复 user 这个单词，使用 Form.jsx 就可以了。

我最初使用 React 的时候喜欢用完整的名字来命名文件，但是这样会导致相同的部分重复太多次，同时引入时的路径太长。来看看这两种方式的区别：

```javascript
import ScreensUserForm from './screens/User/UserForm';
// vs
import ScreensUserForm from './screens/User/Form';
```

**我们认为根据组件文件的上下文环境以及它的相对路径来命名是更好的方式**.

## 页面

我们以 `src` 目录为根目录，将不同页面分散在**不同文件夹**中。因为它们是**根据路由定义而不是模块来划分成组的**。

```javascript
import React, { Component } from 'react';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import ScreensUserForm from './User/Form';
import ScreensUserList from './User/List';

const ScreensRoot = () => (
  <Router>
    <Switch>
      <Route path="/user/list" component={ScreensUserList} />
      <Route path="/user/create" component={ScreensUserForm} />
      <Route path="/user/:id" component={ScreensUserForm} />
    </Switch>
  </Router>
);

export default ScreensRoot;

```

注意我们将**所有页面都放在同一个目录下**，这个目录以路由名称命名。
这种方式使你看一眼 `url` 就能够轻松定位当前路由渲染的页面。
