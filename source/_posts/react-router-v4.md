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
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
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
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/contact'>Contact</NavLink>
    </div>
  );
};

export default Navigation;
```

## 基本组件 3 种

- router components
- route matching components
- navigation components

```javascript
import { BrowserRouter, Route, Link } from 'react-router-dom';
```

### router components 2 种

有 2 种`<BrowserRouter>` 和 `<HashRouter>` routers. 都会创建一个`history`对象
通常 `<BrowserRouter>`用在 a server that responds to requests and a `<HashRouter>`用在 static file server.

### Route Matching 2 种

`<Route>` and `<Switch>`.

`<Route>`
就是比较 `when location = { pathname: '/about' }` 和 `<Route path='/about' component={About}/>`中的`path='/about'`, 每个`<Route />`都会比较, 最小匹配, 匹配上的`render`, 没匹配上的 render `null`, 没有写`path`的会始终匹配.

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

`<Route>`有 3 个`props`: `component`, `render`, and `children`.

```javascript
const Home = () => <div>Home</div>;
const App = () => {
  const someVariable = true;
  return (
    <Switch>
      {/* these are good */}
      <Route exact path='/' component={Home} />
      <Route
        path='/about'
        render={(props) => <About {...props} extra={someVariable} />}
      />
      {/* do not do this 就render和component*/}
      <Route
        path='/contact'
        component={(props) => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```

### Navigation

用`<Link>`, 然后会 render 成`<a>`

`<NavLink>` 是一种特殊的 `<Link>` 当`match`上`location的`的时候会加上`activeClassName` 就是`class`

强制 navigation 的话用`<Redirect>`

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

## 简介

### 包含式路由 exact

React-Router4 不在提倡集中管理路由。相反，路由规则存在于布局和 UI 组件之中。举例来说，同样的路由在 V4 版本中可能是这样的：

> `BrowserRouter` 或 hash

```JavaScript
import { BrowserRouter, Route } from 'react-router-dom'

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)

const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

render(<App />, document.getElementById('root'))
```

你可能已经注意到了 `exact` 属性。那么它到底是干嘛的呢？在 V3 中，路由规则是独一无二的，这意味着最终只有一个路由会匹配到。但是在 `V4` 中，**路由是包含式**的，这意味着可能会有**多个路由同时匹配到并且渲染**。加了 `exact` 可以控制只有一个被渲染

### 独立路由 Switch

如果你**只想匹配一个路由**，使用`<Switch>`组件来实现。`<Switch>`组件只会渲染匹配到的**第一个路由**。

```JavaScript
const PrimaryLayout = () => (
  <div className="primary-layout">
    <PrimaryHeader />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users/add" component={UserAddPage} />
        <Route path="/users" component={UsersPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
)

```

在`<Switch>`中的路由只有一个会被渲染。我们仍然需要在 home 页面的路由上添加 `exact` 属性，否则，当我们访问`‘/users’`或者`‘/users/add’`时，home 页面将会首先匹配到。事实上，在使用排他性路由时，路由的位置排列是最为关键的事，传统路由一直如此。我们把`‘/users/add’`排列在`‘/users’`之前以保证正确的匹配路由。因为`‘/users/add’`会匹配`‘/users’`和`‘/users/add’`，把`‘/users/add’`放在前面是最好的。

> 当然，如果你使用了 `exact` 属性，那放在哪儿都无所谓，但至少我们还有选择。

在遇到`<Redirect>`组件时，总是会做浏览器重定向，但是如果它在`<Switch>`组件中，那么只有当其他路由都没有匹配到时，才会重定向。

### “Index Routes” 和 “Not Found”

在 V4 中我们用`exact`属性代替了`<IndexRoute>`来做同样的事。在没有路由匹配到时，使用`<Redirect>`来重定向到默认页面的路径，或者 404 页面。

### 嵌套布局

多样的选择意味着我们可能选择并不理想的方案。表面上看来，嵌套布局很简单，但是根据你的选择不同，你可能会遇到一些麻烦因为你组织路由的方式。

想象这样一个场景，我们需要一个‘浏览用户’的页面以及‘用户信息’的页面。对于产品页面我们也有类似需求。用户和产品都需要一个子布局，并且子布局都是唯一特有的。举例来说，每一个子布局拥有不同的导航卡。我们有几种不同的方式来解决这个问题，有些比较好有些则不太好。第一种方案可能并不是那么好，但我还是想让你们看一看，**以免以后踩入这个坑。第二种方案就显得更好一些**。

```JavaScript
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" exact component={BrowseUsersPage} />
          <Route path="/users/:userId" component={UserProfilePage} />
          <Route path="/products" exact component={BrowseProductsPage} />
          <Route path="/products/:productId" component={ProductProfilePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

const BrowseUsersPage = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <BrowseUserTable />
    </div>
  </div>
)

const UserProfilePage = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <UserProfile userId={props.match.params.userId} />
    </div>
  </div>
)
```

以**浏览用户**来举例, `/users` 和 `"/users/:userId"`

> 新 API 概念： 任何由`<Route>`渲染的组件，V4 都会提供`props.match`。就像你看到的，`userId`这个参数是有`props.match.params`提供的。了解更多 V4 文档。如果一个组件并**不是直接**通过`<Route>`组件渲染的，但是却要用到`props.match`，那么我们可以借助`withRouter()`这个**高阶组件**。

实现上来说，第一种方案并没有什么问题。但是我们仔细观察一下，会发现`UserProfilePage`和`BrowserUsersPage`的布局是一样的，不同的只是`UserProfile`和`BrowserUserTable`。这种实现方法会导致一些冗余代码，并且在`UserProfilePage`和`BrowserUsersPage`之间切换时，UserNav 组件是需要完全重新渲染走一遍生命周期的。很明显这是可以避免的。
以下是更好的实现方式：

```JavaScript
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UserSubLayout} />
          <Route path="/products" component={ProductSubLayout} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

const UserSubLayout = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path="/users" exact component={BrowseUsersPage} />
        <Route path="/users/:userId" component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```

和之前实现方式不同的是，我们的**路由从 4 个变成了 2 个**。`BrowseUsersPage`和`UserProfilePage`组件只负责渲染不同的部分，作为 UserSubLayout 的子组件。需要注意的一点是，**不论你路由嵌套多深，还是需要写完整路径去匹配**。如果你不想重复书写路径或者方便统一修改路径，你可以使用`props.match.path`：

```JavaScript
const UserSubLayout = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={props.match.path} exact component={BrowseUsersPage} />
        <Route path={`${props.match.path}/:userId`} component={UserProfilePage} /> /* 注意这行path的写法*/
      </Switch>
    </div>
  </div>
)
```

## Match

正如我们所见，`props.match`在获取`userId`这类参数和简化路由书写方面很有用处。`match`对象提供了一些属性：`match.params`，`match.path`，`match.url`等等。

### match.path 和 match.url

第一眼我们**并不能清楚的区分这两者**。控制台打印时，多数情况下也是相同的结果。举例来说，当浏览器路径是`‘/users’`时，`match.path`和`match.url`打印输出的是相同的值。

```JavaScript
const UserSubLayout = ({ match }) => {
  console.log(match.url)   // output: "/users"
  console.log(match.path)  // output: "/users"
  return (
    <div className="user-sub-layout">
      <aside>
        <UserNav />
      </aside>
      <div className="primary-content">
        <Switch>
          <Route path={match.path} exact component={BrowseUsersPage} />
          <Route path={`${match.path}/:userId`} component={UserProfilePage} />
        </Switch>
      </div>
    </div>
  )
}
```

现在我们还是分不清这两者的区别，但是，如果我们用**嵌套的路由，特别是带有参数的匹配模式**，在更深一层的组件中打印，我们就能看到区别。比如我们浏览的是`‘/users/5’`这个路径，`match.url`返回的是`‘/users/5’`，而`match.path`返回的是`‘/users/:userId’`。这样就一目了然了，`match.url`返回的是具体的路由地址字符串，而`match.path`返回的是路由匹配模式的字符串。

> 就是带不带嵌套的**动态参数**

### 如何选择？ match.path 和 match.url

在用`<Route>`做嵌套路由时，建议使用`match.path`，因为你**可能在你的子组件中需要使用**`match.param`对象，在`<Link>`组件做路由跳转时，使用`match.url`。

> 有时我们用 `<Route path={match.url} exact render={(): JSX.Element => <Redirect to={`\${match.url}/info`} />}></Route>` 这里注意哦

```javascript
<Switch>
  <Route path={match.url} exact render={(): JSX.Element => <Redirect to={`${match.url}/info`} />}></Route>
  /* 这个Router也可以用 <Redirect exact from={match.url} to={`${match.url}/info`} /> */
  <Route path={`${match.path}/info`} exact component={Info}></Route>
  <Route path={`${match.path}/replica`} exact component={Replica}></Route>
  <Route path={`${match.path}/log`} render={(): JSX.Element => <Log service={currentService}/>}></Route>
</Switch>
```

> `<Redirect exact>` 的 `exact` 只用在当在`<Switch>`内部渲染`<Redirect>`时，只能与 `from` 结合使用以精确匹配位置。

```JavaScript
<Switch>
  <Redirect exact from="/" to="/home" />
  <Route path="/home">  /* 到home */
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

### 避免 match 冲突 换位置或做限制

假设现在我们需要一个编辑页面对用户信息进行编辑，那此页面的路由规则应该类似于`‘/users/:userId/edit’`。那么问题来了，前面的例子中，用户信息页面的路由匹配规则是`/users/:userId`，当我们访问`‘/users/5/edit’`的时候，将会首先匹配到**用户信息页面而不是编辑页**。那是否意味着我们要像之前做的那样，在原有的信息页面同时添加一个编辑的子页面，再去匹配呢？并不一定。我们可以通过将`‘/users/:userId/edit’`规则放在`/users/:userId`**之前**来达到此效果。或者对`/users/:userId`进行进一步约定，比如限制:userId 为数字：`users/:userId(\\d+)`。

```JavaScript
const UserSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route exact path={props.match.path} component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} component={AddUserPage} />
        <Route path={`${match.path}/:userId/edit`} component={EditUserPage} />  /* 这个位置在前 */
        <Route path={`${match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```

## 授权路由

在我们的项目中，根据**用户的登录状态**来限制用户访问某些路由的功能是很常见的。让**授权页面**（应用程序的主要页面）和未授权页面（比如登录页面以及忘记密码页面）拥有不同的 UI 和感受也是常见的需求。

```JavaScript
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={UnauthorizedLayout} />
            <AuthorizedRoute path="/app" component={PrimaryLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
```

这种方法有几个关键点。首先，根据我们所处的应用程序的哪个部分，我**在两个顶级布局之间**进行选择。访问路径，如`“/auth/login”`或`“/auth/forget-password”`将使用**未经授权**的布局。**当用户登录时**，我们将保证所有路径都有一个`' /app '`前缀，它使用`AuthorizedRoute`组件来确定用户是否登录。如果用户试图访问以`' /app '`开头的页面，但他们没有登录，他们将被**重定向到登录页面**。
但是`AuthorizedRoute`并不是 V4 本身提供的，而是我自己实现的。V4 中一个惊人的新特性是能够为特定目的创建自己的路由。不同于通过传递一个组件属性到`<Route>`，而是传递一个`rendr`**回调**:

```JavaScript
class AuthorizedRoute extends React.Component {
  componentWillMount() {
    getLoggedUser()
  }

  render() {
    const { component: Component, pending, logged, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        if (pending) return <div>Loading...</div>
        return logged
          ? <Component {...this.props} />
          : <Redirect to="/auth/login" />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(stateToProps)(AuthorizedRoute)
```

你的登录策略可能和我的并不一样，我用一个网络请求`getLoggedUser()`去获取状态并把 p`ending`和`logged`的值插入`redux`管理的状态中。p`ending`意味着请求还没结束。

## 其他注意点

React-Router V4 还有其他更多炫酷的特性。最后，我们来了解一些小特性，以防遇到时犯迷糊。

### `<Link>` 和 `<NavLink>`

在 V4 中，有两种方式可以将锚点和路由集成：`<Link>`和`<NavLink>`。
`<NavLink>`的原理和`<Link>`一样，不同的是，`<NavLink>`能根据浏览器 URL 是否匹配从而提供额外的样式定制。详情可以在线查看该 demo。部分代码如下：

```javascript
const PrimaryHeader = () => (
  <header className='primary-header'>
    <h1>Welcome to our app!</h1>
    <nav>
      <NavLink to='/app' exact activeClassName='active'>
        Home
      </NavLink>
      <NavLink to='/app/users' activeClassName='active'>
        Users
      </NavLink>
      <NavLink to='/app/products' activeClassName='active'>
        Products
      </NavLink>
    </nav>
  </header>
);
```

复制代码当`<NavLink>`匹配到当前 URL 时，它允许我们在此`<NavLink>`上添加一个自定义的`class`，以便控制样式。

### URL 查询字符串

在 V4 中已经**没有方式可以直接得到 URL 的查询字符串了**。在我看来，做出这个决定是因为对于如何处理复杂的查询字符串没有标准。因此，v4 没有在模块中引入相关方法，而是决定**让开发人员自己选择如何处理查询字符串**。这是一件好事。

就我个人而言，我使用 sindresorhus 大神（twitter）编写的`query-string`模块来处理查询字符串。

### 动态路由

V4 最出色的一点是**几乎所有的东西都是一个`React`组件**，包括`<Route>`。路由再也不是什么魔法，我们可以在任何需要的时候有条件的渲染它们。想象一下，当满足某些条件时，您的应用程序的整个部分都可用于路由。当这些条件不满足时，我们可以删除路由。我们甚至可以做一些炫酷的事，比如递归路由。
React-Router4 变得更为简单了，因为万物皆组件。

## 参考

[（译）React-Router4 的变化 666666](https://juejin.im/post/5c14ab92e51d450b3e0cbfdd)
[原文 All About React Router 4](https://css-tricks.com/react-router-4/)

[React Router tutorial for beginners | React Router v4 2018](https://www.youtube.com/watch?v=91F8reC8kvo)
[React Router v4 Tutorial](https://www.youtube.com/watch?v=l9eyot_IXLY)+[quick Start](https://reacttraining.com/react-router/web/guides/quick-start)
[react-router v4 使用 history 控制路由跳转](https://github.com/brickspert/blog/issues/3)
