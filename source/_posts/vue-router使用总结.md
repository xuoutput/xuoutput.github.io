---
title: vue-router使用总结
date: 2018-02-03 14:48:00
tags:
- vue-router
- vuejs
categories:
- 前端
---

# vue-route(这货是个插件)

主要想整理的是这个配合v-for一起用

[vue-router官网的介绍](https://router.vuejs.org/zh-cn/essentials/getting-started.html)

**使用vue-cli来构建路由**

先说下3个基本概念：route, routes, router
[详解vue-router基本使用](http://www.jb51.net/article/111499.htm)

1， route，它是一条路由，是单数。 
Home按钮  => home内容， 这是一条route,  
about按钮 => about 内容， 这是另一条路由。

2， routes 是一组路由，把上面的每一条路由组合起来，形成一个数组。
[
    {home 按钮 =>home内容 }， 
    { about按钮 => about 内容}
]

3， router 是一个机制，相当于一个**管理者**，它来管理路由。
因为routes 只是定义了一组路由放在那里，是静止的，当有请求时，怎么找到对应的那条route呢？ 比如当用户点击home 按钮的时候，怎么知道跳转到home页面？这时router 就起作用了，它到routes 中去查找，去找到对应的route(home页面)，所以页面中就显示了home 内容。

4，客户端中的路由，实际上就是dom 元素的显示和隐藏。当页面中显示home 内容的时候，about 中的内容全部隐藏，反之也是一样。
客户端路由有两种实现方式：基于hash 和基于html5 history api.

## 基本的路由(静态路由)

**下面开始**
官网一个基本的例子

```html
HTML
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <!-- 当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

JavaScript
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由(就是放在children中)。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！

```

可以看到html中只用了2个标签
`<router-link>` `<router-view>`

`<router-view>`反正是显示路由内容的，
功能都在`<router-link>`，它定义了to那个路由 。

javascript页面
可以简单的理解为就是定义了一组routers，然后通过vue的vuerouter来管理

## 动态路由（也就是把routers中的path改了: 多对一，传参而已。另外注意watch和beforeRouteUpdate）

**除了这个传参，还有url 这个query传参**
**上面的例子中router里面都是静态的,一一对应**

```html
<router-link to="/foo">Go to Foo</router-link>
<router-link to="/bar">Go to Bar</router-link>

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```

**我们来看下动态路由，然后比较他们的区别**

我们经常需要把某种模式匹配到的所有路由，**全都映射到同个组件(组件复用)**。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』（dynamic segment）来达到这个效果：


```html
//这还是原来的User组件
const User = {
  template: '<div>User</div>'
}
//动态路由下复用这个User组件，改为
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})

```

> 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，**使用 props** 将组件和路由解耦，**详见路由组件传参**

现在呢，像 /user/foo 和 /user/bar 都将映射到相同的路由。

一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户的 ID：

这里如果你看`<router-link>`这个to还是不动的，该foo该bar。只是routes和组件内变化(毕竟动态)

> 把这个当做函数的传参记，比如`<router-link to="/ser/foo">`这个to中传过来一个foo,(这里的话还是和静态一样，只是routes变了，组件复用当然也给改，就是拿出参数问题)
> 然后再routers中的{ path: '/user/:id', component: User } 匹配到了这个id，成了这么一个对象{id：foo}
> 最后去User组件中用$route.params这个对象可以拿出来用，毕竟就是传过来用的
> 还有就是beforeRouteUpdate的用处

| 模式                           | 匹配路径            | $route.params                      |
| :----------------------------- | :-----------------: | :--------------------------------: |
| /user/:username                | /user/evan          | { username: 'evan' }               |
| /user/:username/post/:post\_id | /user/evan/post/123 | { username: 'evan', post_id: 123 } |

**响应路由参数的变化**
提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 **watch（监测变化） $route 对象**：

```html
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}

或者使用 2.2 中引入的 beforeRouteUpdate 守卫：

const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

**匹配优先级**
有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

## 嵌套路由 (就是一个套一个，在`<router-view>`中套，在routes中套children)(同级的呢，命名看命名视图)

前面的例子并没有嵌套，现在搞下嵌套

```html
//这个是默认app挂在的地方，看到app了么
<div id="app">
  <router-view></router-view>
</div>

//这是User组件
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
//配置哦
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

```

在app中的 `<router-view>`是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>：

```html
//这是User组件，现在就有两层了
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

//要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置(上面嵌套了2层，**想一下再往下呢，就是再放一个children咯**)：
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [   //要再嵌套可以在放一个children
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',    //可以注意这里是相对路径哦
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        },
        // 这是一个当做默认路由的，空路由
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```

**问题**

```html
//嵌套不是这样嵌套，
<div id="app">
  <router-view>
    <router-view></router-view>
  </router-view>
</div>
//也不是这样哦。  嵌套是一对一啊，这个user套在app去，同理 你要多层的嵌套就再导入一个组件呗，在那个组件里写router-view
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view>
        <router-view></router-view> <!-- 不报错，不过反正是丢弃 -->
      </router-view>
    </div>
  `
}

//还有既然这样不行，那么直接在router-view写东西怎么样，和slot一回事么
<div id="app">
  <router-view>
    在这写东西怎么处理的？<!-- 这个直接丢弃了 -->
  </router-view>
</div>
```


## 命名路由

有时候，通过一个**名称来标识(name)**一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。(只要先记住name好了，下面的编程式路由接着往下看)

```html
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',   //就多了这个name
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `<router-link>`的 **to 属性**传一个**对象**：(这块往下看)

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 router.push() 是一回事(就是编程式路由一回事)：

```html
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 /user/123 路径。

## 编程式的导航(借助 router 的**实例方法**，通过编写代码来实现，重要的是学to的参数用法)

```html
router.push(location, onComplete?, onAbort?)
```

> 在 2.2.0+，可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。这些回调将会在导航**成功完成** (在所有的异步钩子被解析之后) 或**终止** (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

> 注意：如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 **beforeRouteUpdate** 来响应这个变化 (比如抓取用户信息) (就是前面的动态路由 组件复用)。

注意：在 **Vue 实例内部**，你可以通过 $router 访问路由实例。因此你可以调用 **this.$router.push**。

想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">`(看到这个用了v-bind哦动态) 等同于调用 router.push(...)。

| 声明式                    | 编程式           |
| :-----------------------: | :--------------: |
| `<router-link :to="...">` | router.push(...) |

**上面没啥，下面重要来了，to的参数**
**同样的规则也适用于 router-link 组件的 to 属性。**

该方法的参数可以是一个**字符串路径**，或者一个描述地址的**对象**。例如：

**(3种传参，[path]/[name params]/[path/name+query])**

```html
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

> Get请求传参, 看最后一个带查询参数
> 这个明明实在不好形容啊。不过真的是和Get请求一样。你完全可以在链接后加上?进行传参。
> 样例：http://localhost:8080/linkParamsQuestion?age=18
> 项目里获取：
> `let age = this.$route.query.age;` //问号后面参数会被封装进 this.$route.query;

注意：**如果提供了 path，params 会被忽略(毕竟路径就代表参数)**，上述例子中的 **query 并不属于这种情况**。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：

```html
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123  es6写法
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```
___

**router.replace(location, onComplete?, onAbort?)**

跟 router.push 很像，唯一的不同就是，**它不会向 history 添加新记录**，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                            | 编程式              |
| :-------------------------------: | :-----------------: |
| `<router-link :to="..." replace>` | router.replace(...) |

**router.go(n)**
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

例子
```html
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

**操作 History(我怎么觉得这东西都不用了)**
你也许注意到 router.push、 router.replace 和 router.go 跟 window.history.pushState、 window.history.replaceState 和 window.history.go好像， 实际上它们确实是效仿 window.history API 的。

因此，如果你已经熟悉 Browser History APIs，那么在 vue-router 中操作 history 就是超级简单的。

还有值得提及的，vue-router 的导航方法 （push、 replace、 go） 在各类路由模式（history、 hash 和 abstract）下表现一致。

## 命名视图(同级的视图view，前面讲过嵌套的)

有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 **sidebar（侧导航） 和 main（主内容） 两个视图**，这个时候命名视图就派上用场了。你可以在界面中**拥有多个单独命名的视图**，而不是只有一个单独的出口。如果 router-view **没有设置名字**，那么**默认为 default**。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，**多个视图就需要多个组件**。确保正确使用 **components 配置（带上 s）**：

```html
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

**嵌套命名视图(厉害了，嵌套，同级的合在一起)**

重点记住这个就好了
我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 router-view 组件。我们以一个设置面板为例：

```html
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

* UserSettings 是一个视图组件。
* Nav 只是一个常规组件。
* UserEmailsSubscriptions、UserProfile、UserProfilePreview 是嵌套的视图组件。

就是UserSettings下有左右两块，右边那块又有嵌套。

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>

{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

## 重定向 和 别名

**重定向(一对一，有3种: '', name, =>)**

重定向也是通过 **routes 配置**来完成，下面例子是从 /a 重定向到 /b：

```html
const router = new VueRouter({
  routes: [
    { 
      path: '/a',
      redirect: '/b'  //就加了这么一条redirect
    }
  ]
})
```

重定向的目标也可以是一个**命名的路由(和编程式to的 name写法一样)**：

```html
const router = new VueRouter({
  routes: [
    { 
      path: '/a', 
      redirect: { name: 'foo' }
    }
  ]
})
```

甚至是一个**方法(es6的箭头函数)**，动态返回重定向目标：

```html
const router = new VueRouter({
  routes: [
    { 
      path: '/a', 
      redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

注意**导航守卫并没有应用在跳转路由上**，而仅仅应用在其目标上。在下面这个例子中，为 /a 路由添加一个 beforeEach 或 beforeLeave 守卫并不会有任何效果。

**别名(一对多)**
『**重定向**』的意思是，当用户访问 /a时，URL 将会被**替换成 /b**，然后匹配路由为 /b，那么『别名』又是什么呢？

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

上面对应的路由配置为：

```html
const router = new VueRouter({
  routes: [
    { 
      path: '/a', 
      component: A, 
      alias: '/b' 
    }
  ]
})
```

『别名』的功能让你可以自由地将 UI 结构**映射到任意的 URL**，而**不是受限于配置的嵌套路由结构**。

## 路由组件传参(props 也有3种模式: 布尔，对象，函数)

在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

**使用 props 将组件和路由解耦，取代与 $route 的耦合**

```html
//这是动态路由那块的东西
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

**通过 props 解耦**

```html
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

**布尔模式**
如果 props 被设置为 true，route.params 将会被设置为组件属性。

**对象模式**
如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

```html
const router = new VueRouter({
  routes: [
    { 
      path: '/promotion/from-newsletter', 
      component: Promotion, 
      props: { newsletterPopup: false } <!-- 这个newsletterPopup是name么？和布尔模式啥区别，就是同级的用命名视图解耦用么？ -->
    }
  ]
})
```

**函数模式**
你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```html
const router = new VueRouter({
  routes: [
    { 
      path: '/search', 
      component: SearchUser, 
      props: (route) => ({ query: route.query.q }) 
    }
  ]
})
```

URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。

**请尽可能保持 props 函数为无状态的**，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

## HTML5 History 模式(暂时不知道)

___

# 进阶

## 导航守卫（『导航』表示路由正在发生改变。暂时用全局的）

**(做登录拦截 或 loading)**

正如其名，vue-router 提供的导航守卫主要用来**通过跳转或取消的方式守卫导航**。有多种机会植入路由导航过程中：**全局的, 单个路由独享的, 或者组件级的。**
记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察(watch) $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。

### 全局守卫
你可以使用 **router.beforeEach** 注册一个全局前置守卫：

```html
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫**按照创建顺序调用**。守卫是**异步**解析执行，此时导航在所有守卫 **resolve 完之前一直处于 等待**中。

每个守卫方法接收**三个参数**：

to: Route: 即将要进入的目标 路由对象

from: Route: 当前导航正要离开的路由

next: Function: 一定要**调用该方法来 resolve** 这个钩子。执行**效果依赖 next 方法**的调用参数。

* next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

* next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

* next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

* next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

**确保要调用 next 方法，否则钩子就不会被 resolved。**

### 全局解析守卫（router.beforeResolve）
2.5.0 新增

在 2.5.0+ 你可以用 **router.beforeResolve** 注册一个**全局守卫**。这和 router.beforeEach 类似，**区别**是在导航被确认之前，**同时**在**所有**组件内守卫和异步路由组件**被解析之后**，解析守卫就被调用。

### 全局后置钩子
你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子**不会接受 next 函数也不会改变导航本身**：

```html
router.afterEach((to, from) => {
  // ...
})
```

### 组件内的守卫(3个)
最后，你可以在路由组件内直接定义以下路由导航守卫：

beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave

```html
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

beforeRouteEnter 守卫 **不能访问 this**，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```html
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 beforeRouteEnter **是支持给 next 传递回调的唯一守卫**。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。

```html
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。

```html
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

## 路由元信息(可以用来搞允许登录页面)

定义路由的时候可以配置 meta 字段：

```html
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field 和props挺像的啊
          //设置一个允不允许登录的标志
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

那么**如何访问**这个 meta 字段呢？

**用处**

首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录

例如，根据上面的路由配置，/foo/bar 这个 URL 将会**匹配父路由记录以及子路由记录**。

一个路由匹配到的所有路由记录会暴露为 $route 对象（还有在导航守卫中的路由对象）的 **$route.matched** 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。

下面例子展示在**全局导航守卫中检查**元字段：

```html
//全局导航守卫
router.beforeEach((to, from, next) => {
  //这个就难懂了
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page 登录页.
    //这个auth.loggedIn 方法是外部引入的，你可以先写好一个校验是否登录的方法，再import进 router.js中去判断
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 过渡效果(暂时不管)

## 数据获取（这里有渲染导航，还有获取数据两块的）

有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

* **导航完成之后**获取：先完成导航，然后在接下来的**组件生命周期钩子**中获取数据。在**数据获取期间显示『加载中』之类**的指示。

* 导航完成**之前**获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错(我喜欢之后的) —— 就看你想要的用户体验是哪种。

### 导航完成后获取数据

当你使用这种方式时，我们会**马上导航和渲染组件**，然后在组件的**created 钩子中获取数据**。这让我们有机会在数据获取期间展示**一个 loading 状态**，还可以在**不同视图间展示不同的 loading** 状态。

假设我们有一个 Post 组件，需要基于 $route.params.id 获取文章数据：

```html
<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

### 在导航完成前获取数据

通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 **beforeRouteEnter** 守卫中获取数据，当数据获取成功后只调用 next 方法。

```html
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，**显示一些进度条或者别的指示**。如果数据获取失败，同样有必要展示一些全局的错误提醒。

### 滚动行为(就是跳转后滚动条位置确定, 用scrollBehavior方法)

使用前端路由，当**切换到新路由**时，想要页面滚到**顶部**，或者是保持**原先**的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

**注意: 这个功能只在支持 history.pushState 的浏览器中可用。**

当创建一个 Router 实例，你可以提供一个 **scrollBehavior** 方法：

```html
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {  
    // return 期望滚动到哪个的位置
  }
})
```

scrollBehavior 方法**接收 to 和 from 路由对象**。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：

```html
{ x: number, y: number }
{ selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
```

如果返回一个 falsy (译者注：falsy 不是 false，参考这里)的值，或者是一个空对象，那么不会发生滚动。

举例：

```html
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

对于所有路由导航，简单地让页面滚动到顶部
返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

```html
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

如果你要模拟『**滚动到锚点**』的行为：

```html
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

### 路由懒加载(路由不用变，变的是webpack配置，和我想的有点不一样)

## Router 构造配置

**routes**(**一看感觉都见过了，确实**)
类型: Array<RouteConfig>

RouteConfig 的类型定义：

```html
declare type RouteConfig = {
  path: string;
  component?: Component;
  name?: string; // 命名路由
  components?: { [name: string]: Component }; // 命名视图组件
  redirect?: string | Location | Function;
  props?: boolean | string | Function;
  alias?: string | Array<string>;
  children?: Array<RouteConfig>; // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void;
  meta?: any;

  // 2.6.0+
  caseSensitive?: boolean; // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object; // 编译正则的选项
}
```

**mode(一种hash， 一种history)**
类型: string

默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)

可选值: "hash" | "history" | "abstract"

配置路由模式:

hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。

history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。

abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

**base**
类型: string

默认值: "/"

**应用的基路径**。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
一般写成 **__dirname**，在**webpack**中有配置。