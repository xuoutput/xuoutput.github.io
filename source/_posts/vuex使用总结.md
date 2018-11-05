---
title: vuex使用总结
date: 2018-02-04 17:50:05
tags:
- vuex
- vuejs
categories:
- 前端
comments: false
permalink:
---

# vuex总结(这个也是插件哦)

[vuex官网](https://vuex.vuejs.org/zh-cn/intro.html)

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用**集中式存储**管理应用的**所有组件的状态**，并以相应的规则保证状态以一种**可预测的方式**发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

## **什么是“状态管理模式”？**(这个例子别和后面的搞混了)
让我们从一个简单的 Vue **计数应用**开始：

```html
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

**注意看上面的注释**
这个状态自管理应用包含以下3个部分：

* state，驱动应用的数据源；
* view，以声明方式将 state 映射到视图；
* actions，响应在 view 上的用户输入导致的状态变化。

以下是一个表示“**单向**数据流”理念的极简示意：

![单向数据流](flow.png)

但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

* 多个视图依赖于同一状态。
* 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法**对于多层嵌套的组件将会非常繁琐**，并且对于**兄弟组件间的状态传递无能为力**。
对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的**共享状态抽取出来**，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

![vuex](vuex.png)

## 什么情况下我应该使用 Vuex？

虽然 Vuex 可以帮助我们管理共享状态，**但也附带了更多的概念和框架**。这需要对短期和长期效益进行权衡。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——**如果您的应用够简单，您最好不要使用 Vuex**。一个简单的 **global event bus** 就足够您所需了。但是，如果您需要构建是一个**中大型单页应用**，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：

Flux 架构就像眼镜：您自会知道什么时候需要它。

# 开始(这里开始才是重头戏)

每一个 Vuex 应用的**核心就是 store（仓库）**。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是**响应式**的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你**不能直接改变** store 中的状态。改变 store 中的状态的**唯一途径**就是**显式地提交 (commit) mutation**。这样使得我们可以方便地**跟踪**每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## 最简单的 Store

安装 Vuex 之后，让我们来创建一个 store。创建过程直截了当——仅需要提供一个初始 state 对象和一些 mutation(这个当成类actions好了)：

```html
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

现在，你可以通过 **store.state 来获取状态对象(后面用computed来返回)**，以及通过 **store.commit 方法触发状态变更**：

```html
//commit一个increment到mutations触发，然后这个mutations会mutate一个state
store.commit('increment')

console.log(store.state.count) // -> 1
```

**再次强调**，我们**通过提交 mutation** 的方式，而**非直接改变** store.state.count，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。

由于 store 中的**状态是响应式**的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。**触发变化**也仅仅是在组件的 methods 中提交 mutation。

这是一个最基本的 Vuex 记数应用示例。

接下来，我们将会更深入地探讨一些核心概念。让我们先从 State 概念开始

## 核心概念
在这一章，我们将会学到 Vue 的这些核心概念。他们是：

* State
* Getter
* Mutation
* Action
* Module

### State

**单一状态树**
Vuex 使用单一状态树——是的，**用一个对象就包含了全部的应用层级状态**。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，**每个应用将仅仅包含一个 store 实例**。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

**单状态树和模块化并不冲突**——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。

**那么我们如何在 Vue 组件中展示状态呢**？由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态**最简单的方法**就是在**计算属性**中返回某个状态：

```html
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {   //稳得一比，前面console.log只是打印
    count () {
      return store.state.count      //下面的例子会改下这里，从store变为this.$store
    }
  }
}
```

每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，**这种模式导致组件依赖全局状态单例**。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

Vuex 通过 store 选项，**提供了一种机制将状态从根组件“注入”到每一个子组件中**（需调用 Vue.use(Vuex)）：

```html
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件(多个了store，和router一样用法)
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在**根实例中注册 store 选项**，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 **this.$store** 访问到。让我们更新下 Counter 的实现：

```html
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count     //这里从store变为this.$store(从vue实例)
    }
  }
}
```

#### mapState 辅助函数

当**一个组件需要获取多个状态时候**，将这些状态都声明为计算属性(**这个函数还是在computed中用哦**)会有些重复和冗余。为了解决这个问题，我们可以使用 mapState **辅助函数帮助我们生成计算属性**，让你少按几次键：

```html
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({      //还是computed中用
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的**计算属性的名称**与 **state 的子节点名称相同**时，我们也可以给 mapState 传一个**字符串数组**。

```html
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

#### 对象展开运算符(...)

**mapState 函数返回的是一个对象**。我们**如何将它与局部计算属性混合使用呢**？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是自从有了对象展开运算符（现处于 ECMASCript 提案 stage-3 阶段），我们可以极大地简化写法：

```html
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中,上面算完后，这里获取
  ...mapState({
    // ...
  })
}
```

#### 组件仍然保有局部状态

使用 Vuex **并不意味着你需要将所有的状态放入 Vuex。**虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。

### Getter(在state基础上，可以认为是 store 的计算属性)

有时候我们需要**从 store 中的 state 中派生出一些状态**，例如对列表进行过滤并计数：

```html
computed: {
  doneTodosCount () {
      //在state中的todos进行过滤
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——**无论哪种方式都不是很理想**。

Vuex 允许我们在 store 中定义“getter”（**可以认为是 store 的计算属性**）。就像计算属性一样，getter 的返回值会根据它的依赖被**缓存**起来，且只有当它的依赖值发生了改变才会被重新计算。

**Getter 接受 state 作为其第一个参数(废话，在state的基础上啊，然后也有mapGetters的)**：

```html
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
      //这就直接上了，这里就一个参数
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

**Getter 会暴露为 store.getters 对象(废话了，和state调用一样)**：

```html
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为**第二个参数**：

```html
getters: {
  // 话说第二个参数就是自己么
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```html
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

你也可以通过让 getter **返回一个函数**，来实现给 getter 传参。在你**对 store 里的数组进行查询时非常有用**。

```html
getters: {
  // 这还两个箭头了
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

#### mapGetters 辅助函数

mapGetters 辅助函数仅仅是将 store 中的 getter **映射到局部计算属性**：

```html
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中,也是多个getters
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
如果你想将一个 getter 属性另取一个名字，使用对象形式：

mapGetters({
  // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### Mutation(mutation 都是同步事务)

**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation**。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个**回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数(毕竟要改state)**：

```html
//还是那个计数的例子
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

你**不能直接调用一个 mutation handler**。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

```html
store.commit('increment')
```

#### 提交载荷（Payload）

你可以向 store.commit **传入额外的参数**，即 mutation 的 载荷（payload）：

```html
// 这个n就是payload
mutations: {
  increment (state, n) {
    state.count += n
  }
}
//当然相应的
store.commit('increment', 10)
```

在大多数情况下，**载荷应该是一个对象**，这样可以包含多个字段并且记录的 mutation 会**更易读**：

```html
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

#### 对象风格的提交方式

提交 mutation 的**另一种方式是直接使用包含 type 属性的对象**：

```html
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 **handler 保持不变**：

```html
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

#### Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好**提前**在你的 store 中**初始化**好所有所需属性(响应式都这样)。

2. 当需要在**对象上添加新属性(这不就和v-for那个一样么，用set)**时，你应该

    * 使用 Vue.set(obj, 'newProp', 123), 或者

    * 以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：

    `state.obj = { ...state.obj, newProp: 123 }`

#### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```html
// mutation-types.js    这些大写的就是啦
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名，还有这操作
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做

#### Mutation 必须是同步函数

一条重要的原则就是要记住 mutation 必须是同步函数。为什么？请参考下面的例子：

```html
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

#### 在组件中提交 Mutation

你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。

```html
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

#### 下一步：Action

在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你能调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。**在 Vuex 中，mutation 都是同步事务**：

`store.commit('increment')`
// 任何由 "increment" 导致的状态变更都应该在此刻完成。
**为了处理异步操作，让我们来看一看 Action**。

### Action(为了处理异步操作)

**Action 类似于 mutation，不同在于**：

* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

让我们来注册一个简单的 action：

```html
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  //就是这个了，看图是mutation之前的一个
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个**与 store 实例具有相同方法和属性的 context 对象**，因此你可以调用 **context.commit** 提交一个 mutation，或者通过 **context.state** 和 **context.getters** 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 **context 对象为什么不是 store 实例本身**了。

实践中，我们会经常用到 ES2015 的 **参数解构** 来简化代码（特别是我们需要调用 commit 很多次的时候）：

```html
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

#### 分发 Action

Action 通过 **store.dispatch** 方法触发：

`store.dispatch('increment')`
乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，**还记得 mutation 必须同步执行这个限制么**？Action 就不受约束！我们可以在 action 内部执行异步操作：

```html
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```html
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

来看一个更加实际的购物车示例，**涉及到调用异步 API 和分发多重 mutation：**

```html
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

注意我们正在进行一系列的**异步**操作，并且通**过提交 mutation 来记录 action 产生的副作用**（即状态变更）。

#### 在组件中分发 Action

你在组件中使用 **this.$store.dispatch('xxx')** 分发 action，或者使用 **mapActions** 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：

```html
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### 组合 Action

Action 通常是异步的，那么如何知道 **action 什么时候结束呢**？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 **store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise**，并且 **store.dispatch 仍旧返回 Promise：**

```html
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```html
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```html
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async / await，我们可以如下组合 action：

```html
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

### Module

由于使用单一状态树，应用的**所有状态会集中到一个比较大的对象**。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们**将 store 分割成模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```html
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的**第一个参数是模块的局部状态对象**。

```html
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过** context.state** 暴露出来，**根节点状态则为 context.rootState**：

```html
const moduleA = {
  // ...
  actions: {
      //这有3个参数了，第3个参数是根节点的状态
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```html
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

#### 命名空间(暂不懂)

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 **namespaced: true** 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```html

```

#### 在命名空间模块内访问全局内容（Global Assets）

#### 带命名空间的绑定函数

#### 给插件开发者的注意事项

#### 模块动态注册

#### 模块重用


# 项目结构
Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。

2. 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。

3. 异步逻辑都应该封装到 action 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```html
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

# 严格模式

开启严格模式，仅需在创建 store 的时候传入 strict: true：

```html
const store = new Vuex.Store({
  // ...
  strict: true
})
```

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

**开发环境与发布环境**
**不要在发布环境下启用严格模式**！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

类似于插件，我们可以让构建工具来处理这种情况：

```html
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```
