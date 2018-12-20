---
title: react-router-v4
date: 2018-12-16 17:57:46
tags:
- react
- react-router
categories:
- react教程
comments: false
permalink:
---

# react-router-v4

app.js

```javascript
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/home'
import About from './components/About'
import Contact from './components/Contact'
import Error from './components/Error'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

```

Navigation.js

```javascript
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  )
}

export default Navigation

```

## 基本组件 3种

* router components
* route matching components
* navigation components

```javascript
import { BrowserRouter, Route, Link } from "react-router-dom";
```

### router components 2种

有2种`<BrowserRouter>` 和 `<HashRouter>` routers. 都会创建一个`history`对象
通常 `<BrowserRouter>`用在 a server that responds to requests and a `<HashRouter>`用在static file server.

### Route Matching 2种

`<Route>` and `<Switch>`.

`<Route>`
就是比较 `when location = { pathname: '/about' }` 和 `<Route path='/about' component={About}/>`中的`path='/about'`, 每个`<Route />`都会比较, 最小匹配, 匹配上的`render`, 没匹配上的render `null`, 没有写`path`的会始终匹配.

`<Switch>`
只会递归的匹配第一个非`exact`匹配上的(注意嵌套模式), 而没写`path`的`<Route />`当做兜底的情况.

`exact`是用来完全匹配的`path`

```javascript
import { Route, Switch } from "react-router-dom";
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>

<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    {/* when none of the above match, <NoMatch> will be rendered */}
    <Route component={NoMatch} />
</Switch>
```

#### Route Rendering Props

`<Route>`有3个`props`: `component`, `render`, and `children`.

```javascript
const Home = () => <div>Home</div>;
const App = () => {
const someVariable = true;
  return (
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* do not do this 就render和component*/}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```

### Navigation

用`<Link>`, 然后会render成`<a>`

`<NavLink>` 是一种特殊的 `<Link>` 当`match`上`location的`的时候会加上`activeClassName` 就是`class`

强制navigation的话用`<Redirect>`

```javascript
<Link to="/">Home</Link>
// <a href='/'>Home</a>

// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>

<Redirect to="/login" />
```

## 服务端的


## 参考

[React Router tutorial for beginners | React Router v4 2018](https://www.youtube.com/watch?v=91F8reC8kvo)
[React Router v4 Tutorial](https://www.youtube.com/watch?v=l9eyot_IXLY)+[quick Start](https://reacttraining.com/react-router/web/guides/quick-start)
