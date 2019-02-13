---
title: 再谈js作用域
date: 2019-02-12 19:19:09
tags:
- javascript
- 作用域链
categories:
- javascript教程
comments: false
permalink:
---

# 再谈js作用域

在上一篇{% post_link js作用域链和闭包 js作用域链和闭包 %}中讲的有点没头绪, 重新梳理下

## scope, scope chain, execution context, context 的区别

### 先解释下函数和作用域的关系

每一个`JavaScript`函数都被表示为`object`,进一步, as an instance of `Function`, 函数对象和其他对象一样, 拥有你可以编程访问的属性, 和一系列不能被访问, 但仅供`JavaScript`引擎使用的内部属性. 其中一个内部属性就是`[[scope]]`.

这个内部属性`[[scope]]`包含一个代表作用域`scope`的对象集合, 这个集合是在函数被创建时产生的. 这个集合叫函数的`作用域链`, 他决定了函数能访问哪些数据. 这个集合中的每个对象叫做可变对象`variable object`. 当一个函数被创建后, 他的作用域链就有这些对象.

> 上面的创建指写好代码, 只是定义哦, 还没运行呢.

### 作用域scope

作用域是你的代码在**运行时(不运行时也是可以产生的静态作用域链, 是非自己部分的哦)**，各个变量、函数和对象的可访问性。换句话说，作用域决定了你的代码里的变量和其他资源在各个区域中的可见性。

js有3种作用域, 全局作用域, 局部作用域(函数内), 块级作用域`{}`和`const let`

### 上下文 context

上下文指的是在**相同的作用域**中的`this`的值, 这里`this`是在调用时确定的(本函数的`this`值), 而作用域`scope`也是运行时才有的. 所以没错.

## 例子add()

主要是看这个链接
[JavaScript 核心概念之作用域和闭包 666](https://www.css88.com/archives/7262)

```JavaScript
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}
```

### Scope Chain（作用域链）

> 作用域链的**非自己部分**在函数对象被建立（**函数声明、函数表达式**）的时候建立，**而不需要等到执行**，这部分**作用域链是静态**的；当函数执行时，**建立一个自己当次执行的作用域**，然后把这个作用域与前面的作用域链关联起来

所以, 当**定义** `add` 函数后，其**作用域链就创建了**。函数所在的全局作用域的全局对象被放置到 `add` 函数作用域链（`[[scope]`] 属性）中。我们可以从下图中看到作用域链的第一个对象保存的是全局对象，全局对象中保存了诸如 `this` , `window` , `document` 以及全局对象中的 `add` 函数，也就是他自己。这也就是我们可以在全局作用域下的函数中访问 `window(this)`，访问全局变量，访问函数自身的原因。
作用域链在稍后的执行函数时使用。当然还有函数作用域不是全局的情况，等会儿我们再讨论。

![scope1.jpg](scope1.jpg)

[实例分析 JavaScript 作用域](https://www.css88.com/archives/7300)

上面这个链接讲了 **JavaScript 的词法作用域**

### Execution Context（执行期上下文）

> 也分**全局执行期上下文**和**函数执行期上下文**

假设我们**运行**以下代码：

```JavaScript
var total = add(5, 10);
```

执行该函数创建一个**内部对象**，称为 `Execution Context`（执行期上下文）。执行期上下文**定义了一个函数`正在执行时`的作用域环境**。
> 特别注意，执行期上下文和我们平常说的上下文不同，`执行期上下文`指的是作用域`scope`。平常说的上下文是`this`的取值指向。

执行期上下文和函数创建时的作用域链对象`[[scope]]`区分，这是**两个不同的作用域链对象**。分开的原因很简单，函数定义时的作用域链对象 `[[scope]]` 是固定的，而 `执行期上下文` 会根据不同的运行时环境变化。而且该函数每执行一次，都会创建单独的 `执行期上下文`，因此对同一函数调用多次，会导致创建多个执行期上下文。一旦函数执行完成，执行期上下文将被销毁。
> 函数定义时函数对象的属性是 `[[scope]]` ,而`Execution Context`（执行期上下文）的属性是`scope chain`

`执行期上下文对象`有自己的作用域链，当创建执期行上下文时，其作用域链将**使用**执行函数`[[scope]]`属性所包含的对象（即，函数**定义时**的作用域链对象）进行**初始化**。这些值按照它们在函数中出现的顺序复制到执行期上下文作用域链中。

### Activation Object（激活对象）

随后，在执行其上下文**中**创建一个名为 `Activation Object`（激活对象）的`新对象`。 这个`激活对象AO`保存了函数中的`所有形参，实参，局部变量，this 指针等`函数执行时函数内部的数据情况。然后将这个激活对象推送到执行其上下文作用域链的**顶部**。

`激活对象AO`是一个**可变对象**，里面的数据随着函数执行时的数据的变化而变化，当函数执行结束之后，执行期上下文将被销毁。也就会销毁`Execution Context`的作用域链，激活对象也同样被销毁。**但如果存在闭包**，激活对象就会以另外一种方式存在，这也是**闭包产生的真正原因**，具体的我们稍后讨论。下图显示了执行上下文及其作用域链：

![scope_execution.jpg](scope_execution.jpg)

从左往右看，**第一部分**是函数**执行时**创建的`执行期上下文`，它有自己的作用域链，第二部分是作用域链中的对象，`索引为1`的对象是从`[[scope]]`作用域链中**复制**过来的，`索引为0`的对象是在**函数执行时**创建的`激活对象AO`，第三部分是作用域链中的对象的内容`Activation Object`(激活对象)和`Global Object`(全局对象)。

函数在执行时，每遇到一个变量，都会去执行期上下文的作用域链的顶部，执行函数的激活对象开始向下**搜索**，如果在第一个作用域链（即，`Activation Object` 激活对象）中找到了，那么就返回这个变量。如果没有找到，那么继续向下查找，直到找到为止。如果在整个执行期上下文中都没有找到这个变量，在这种情况下，该变量被认为是**未定义**的。这也就是为什么函数可以访问全局变量，当局部变量和全局变量同名时，会使用局部变量而不使用全局变量，以及 JavaScript 中各种看似怪异的、有趣的作用域问题的答案。

### 闭包

> 尤其是注意闭包的定义哦, 要使用到父函数的变量

这个看{% post_link js作用域链和闭包 js作用域链和闭包 %}中的闭包

## JavaScript 的词法作用域

看完闭包后要看这个链接巩固, 在整体回顾.

[实例分析 JavaScript 作用域](https://www.css88.com/archives/7300)

上面这个链接讲了 **JavaScript 的词法作用域**

简要说下:

如果一个文档流中包含多个script代码段（用script标签分隔的js代码或引入的js文件），它们的运行顺序是：

1. 读入第一个代码段（js执行引擎并非一行一行地分析程序，而是一段一段地分析执行的）
2. 做**词法分析**，有错则报语法错误（比如括号不匹配等），并跳转到步骤5
3. 对`var`变量和`function`定义做“**预解析**“（永远不会报错的，因为只解析正确的声明）
4. 执行代码段，有错则报错（比如变量未定义）
5. 如果还有下一个代码段，则读入下一个代码段，重复步骤2
6. 完成

### JavaScript 解析过程

> 从前面的**例子add()**回顾下

`JavaScript` 中每个函数都都表示为一个函数对象（函数实例），函数对象有一个仅供 `JavaScript` 引擎使用的`[[scope]]` 属性。**通过语法分析和预解析**，将`[[scope]]` 属性指向**函数定义时**作用域中的所有对象集合。这个集合被称为函数的作用域链（`scope chain`），包含函数**定义时**作用域中所有可访问的数据。

对应的图是:

![scope1.jpg](scope1.jpg)

### JavaScript 执行过程

**执行**具体的某个函数时，JS引擎在执行每个函数实例时，都会创建一个`执行期上下文（Execution Context`）和`激活对象（active Object`）（它们**属于`宿主对象`**，与函数实例执行的生命周期保持一致，也就是函数执行完成，这些对象也就被销毁了，闭包例外。）

执行期上下文（`Execution Context`）定义了一个函数**正在执行时**的作用域环境。它使用函数`[[scope]]`属性进行**初始化**。

随后，执行期上下文 `顶部` 的会创建一个`激活对象（active Object）`，这个激活对象保存了函数中的`所有形参`，`实参`，`局部变量`，`this` 指针等函数执行时**函数内部**的数据情况。这个时候激活对象中的那些属性**并没有被赋值**，执行函数内的赋值语句，这才会对变量集合中的变量进行赋值处理。也就是说 激活对象是一个**可变对象**，里面的数据随着函数执行时的数据变化而变化。

🌰
考虑一下下图中的代码：

![lizi.png](lizi.png)

分析过程：

- 作用域1 (绿色) ：即全局作用域，包含变量`foo`;
- 作用域2 (黄色) ：`foo`函数的作用域，包含变量`a`,`bar`,`b`
- 作用域3 (蓝色) ：`bar`函数的作用域，包含变量`c`

`bar` 作用域里完整的包含了 `foo` 的作用域, 因为 `bar` 是定义在 `foo` 中的，产生**嵌套作用域**。值得注意的是，一个函数作用域只有可能存在于一个父级作用域中，不会同时存在两个父级作用域。还有诸如`this` , `window` , `document`等全局对象这里就不说了，避免混乱。

执行过程：

- 语句`console.log`寻找变量`a`,`b`,`c`;
- 其中`c`在自己的作用域中找到，
- `a`，`b`在自己的作用域中找不到，于是向上级作用域中查找，在`foo`的作用域中找到，并且调用。

**函数在执行时**，每遇到一个变量，都会去**执行期上下文**的作用域链的顶部，也就是**执行函数**的**激活对象**开始搜索，如果在第一个作用域链（即，`Activation Object` 激活对象）中找到了，那么就返回这个变量。如果没有找到，那么继续向下查找，直到找到为止。如果在整个执行期上下文中都没有找到这个变量，在这种情况下，该变量被认为是未定义的。也就是说如果`foo`的作用域中也定义了`c`，但`bar`函数只调用自己作用域里的`c`。这就是我们说的变量取值。

#### 关于形参, 实参, 同名局部变量的关系

```JavaScript
function one(a,b,c) {
    console.log(one.length);//形参数量  3
}
function two(a,b,c,d,e,f,g){
    console.log(arguments.length);//实参数量  1
}
one(1)
two(1)
```

```JavaScript
function DoSomething(a)
{
  console.log(a); // 1
  console.log(arguments[0]); // 1
  var a = 2;
  console.log(a); // 2
  console.log(arguments[0]); // 2
}
DoSomething( 1 );
```

打印的结果是`1,1,2,2`。从上面的代码可以看到，参数`a`和局部变量`a`值是**完全相同**的，即使是局部变量`a`重新定义和赋值之后。这样就好理解了，**参数和同名变量**之间是 “**引用**” 关系，也就是说 `JavaScript` 引擎的处理参数和同名局部变量是都引用同一个内存地址。所以示例5中修改局部变量会影响到`arguments`的情况出现。

## 再展开, execution context中有什么

看这个链接中的东西
[了解JavaScript的执行上下文](https://yanhaijing.com/javascript/2014/04/29/what-is-the-execution-context-in-javascript/)
[由变量提升谈谈 JavaScript Execution Context](https://juejin.im/post/5a5ee28f6fb9a01cbe655860)

### 什么是执行上下文？

让我们将术语`执行上下文`想象为当前被执行代码的`环境/作用域`。说的够多了，现在让我们看一个包含**全局`global context`和函数上下文`execution context`**的代码例子

![global_context.jpg](global_context.jpg)

很简单的例子，我们有一个被**紫色边框圈**起来的**全局上下文**和三个分别被**绿色，蓝色和橘色**框起来的**不同函数执行上下文**。只有全局上下文（的变量）能被其他任何上下文访问。

你可以有任意多个函数上下文，**每次调用函数创建一个新的上下文**，会创建一个**私有作用域**，函数内部声明的任何变量都不能在当前函数作用域外部直接访问。在上面的例子中，函数能访问当前上下文外面的变量声明，但在外部上下文不能访问内部的变量/函数声明。

### 执行上下文堆栈 这个看链接, 也可以看那个event loop

**浏览器**里的`JavaScript`解释器被实现为**单线程**。这意味着同一时间只能发生一件事情，其他的行文或事件将会被放在叫做执行栈里面排队。下面的图是单线程栈的抽象视图：

![stack1.jpg](stack1.jpg)

有5个需要记住的关键点，**关于执行栈（调用栈）**：

- 单线程。
- 同步执行。
- 一个全局上下文。
- 无限制函数上下文。
- 每次函数被调用创建新的执行上下文，包括调用自己。

### 执行上下文的细节

我们现在已经知道每次调用函数，都会创建新的执行上下文。然而，在JavaScript解释器内部，每次调用执行上下文，分为两个阶段：

1. **创建阶段**【当函数被调用，但未执行任何其内部代码之前】：
   - 创建作用域链（`Scope Chain`）
   - 创建变量对象`VO`，内对应的variables, functions和arguments。
   - 求”`this`“的值。
2. 激活/**代码执行**阶段：
   - 重新扫描一次代码，给变量赋值，然后执行代码。。

可以将每个执行上下文抽象为一个对象并有三个属性：

```JavaScript
executionContextObj = {
    'scopeChain': { /* variableObject + all parent execution context's variableObject */ },
    'variableObject': { /* function arguments / parameters(函数实参/形参), inner variable and function declarations */ },
    'this': {}
}
```

`executionContextObj`由函数**调用时运行前**创建，**创建阶段**`arguments`的参数会直接传入，函数**内部定义的变量**会初始化为`undefined`。**执行阶段**重新扫描一次代码，给变量赋值，然后执行代码。

#### 下面是执行上下文期间JS引擎执行伪代码

> 这里和定义时(预处理时)的函数对象的属性`[[scope]]`不同哦

1. 找到调用函数
2. 执行函数代码前，创建`execution context`
3. 进行**创建阶段**：
   - 初始化作用域链 `Scope Chain`
   - 创建 `variable object`：(全局下就是全局变量, 没有arguments, `AO`下就是4种:函数的形参实参, 函数内声明的函数和变量)
     - 创建`arguments`对象，初始化该入参变量名和值(**这个函数有, 全局的没有**)
     - 扫描该执行上下文中声明的函数： (其实就是`host提升`, 看{% post_link js作用域链和闭包 js作用域链和闭包 %}中的提升)
       - 对于声明的函数，`variable object`中创建对应的变量名，其值指向该函数（函数是存在`heap`中的）
       - 如果函数名已经存在，用新的引用值**覆盖**已有的
     - 扫描上下文中声明的变量：
       - 对于变量的声明，同样在`variable object`中创建对应的变量名，其值初始化`为undefined`
       - 如果变量的名字已经存在，则直接略过继续扫描
   - 决定上下文`this`的指向
4. 代码执行阶段：
   - 执行函数内的代码并给对应变量进行赋值（创建阶段为`undefined`的变量）

**一个简单例子如下**：

```JavaScript
console.log(foo(22))
console.log(x);

var x = 'hello world';

function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };

    function c() {

    }

    console.log(i)
}
```

提升后是如下

```JavaScript
// 提升函数声明
function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };

    function c() {

    }

    console.log(i)
}
// 提升变量的
var x

console.log(foo(22))
console.log(x);

x = 'hello world';
```

(a)：代码首先进入到`全局上下文`的**创建阶段**。

1. 初始化作用域链 `Scope Chain`
2. 创建 `variable object`
   1. 创建`arguments`对象，初始化该入参变量名和值(这个函数有, 全局的没有)
   2. 函数声明和变量声明提升
3. 决定上下文`this`的指向

得到如下的`ExecutionContextGlobal`

```JavaScript
ExecutionContextGlobal = {
  scopeChain: {...},  // 当成[]更贴切点
  variableObject: {
      x: undefined,
      foo: pointer to function foo()
  },
  this: {...}
}
```

(b): 然后进入`全局执行上下文`的**执行阶段**。

这一阶段从上至下逐条执行代码，运行到`console.log(foo(22))`该行时，**创建阶段**已经为`variableObject`中的`foo`赋值了，因此执行时会执行`foo(22)`函数。
当执行`foo(22)`函数时，又将进入`foo()`的执行上下文，详见(c)阶段。
当执行到`console.log(x)`时，此时`x`在`variableObject`中赋值为`undefined`，因此打印出`undefined`，这也正是**变量提升产生**的结果。
当执行到`var x = 'hello world';`，`variableObject`中的x被赋值为`hello world`。
继续往下是`foo`函数的声明，因此什么也不做，执行阶段结束。下面是执行阶段完成后的`ExecutionContextGlobal`。

```JavaScript
ExecutionContextGlobal = {
  scopeChain: {...},  // 当成[]更贴切点
  variableObject: {
      x: 'hello world',
      foo: pointer to function foo()
  },
  this: {...}
}
```

(c): 当js调用`foo(22)`时，进入到`foo()`函数的`执行上下文`，首先进行该上下文的**创建阶段**。

```JavaScript
ExecutionContextFoo = {
    scopeChain: {...},  // 当成[]更贴切点
    variableObject: {
      arguments: {
        0: 22,
        length: 1
      },
      i: 22,
      c: pointer to function c()
      a: undefined,
      b: undefined
    },
    this: {...}
}
```

当**执行阶段**运行完后，`ExecutionContextFoo`如下。

```JavaScript
fooExecutionContext = {
    scopeChain: { ... },  // 当成[]更贴切点
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```

理清了JS中的`执行上下文`，就很容易明白**变量提升**具体是怎么回事了。
在**代码执行前**，执行上下文已经给对应的声明赋值，只不过**变量是赋值**为`undefined`，**函数赋值**为对应的引用，
而后在**执行阶段**再将对应值**赋值**给变量。

> **区分函数声明和函数表达式**, 这个不再多说

在前面看到`execution context`中的是`VO`, 然后 `AO`是啥

`Variable object(VO)` ：在**全局作用域**就是**全局对象**，而在**其他作用域**是`活动对象AO`。
`Activation object(AO)` ：包含：函数的`形式参数`，函数的`arguments`对象，`函数内声明的变量`和`内部函数` **4种(函数的形参实参, 函数内声明的函数和变量)**。

> **其实`AO`是`VO`的一种情况**。`全局下是没有`**arguments**这个对象的，所以**全局对象不能称为活动对象**。

未进入执行阶段之前，变量对象中的属性都不能访问！但是进入执行阶段之后，变量对象转变为了活动对象，里面的属性都能被访问了，然后开始进行执行阶段的操作。

### 全局上下文的变量对象

以浏览器中为例，全局对象为`window`。
全局上下文有一个特殊的地方，它的变量对象，就是`window`对象。而这个特殊，在`this`指向上也同样适用，`this`也是指向`window`。

```JavaScript
// 以浏览器中为例，全局对象为window
// 全局上下文
windowEC = {
    VO: Window,
    scopeChain: {},  // 当成[]更贴切点
    this: Window
}
```

除此之外，全局上下文的生命周期，与程序的生命周期一致，只要程序运行不结束，比如关掉浏览器窗口，全局上下文就会一直存在。其他所有的上下文环境，都能直接访问全局上下文的属性。

### 另一种`VO`不是`this`

[js中 执行环境(execution context) 和 作用域(scope) 的区别在哪里?](https://www.zhihu.com/question/51336888)

执行环境（`Execution Context`，简称`Context`）只是一个**抽象概念**，在具体`JS Engine`实现中，**它对应很多内容**，变量对象（`Variable Object`，简写`VO`）是其一，还有`Scope Chain`，`this`等，这些**共同组成**了执行环境这个概念。

`VO`不是指具体某个`Object`，而是**指一类`Object`**，所以也具有一定程度的**抽象**。

```JavaScript
var color = "blue";

function changeColor(){
    var anotherColor = "red";

    function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;

        //color, anotherColor, and tempColor are all accessible here
    }

    //color and anotherColor are accessible here, but not tempColor
    swapColors();
}

//only color is accessible here
changeColor();
```

书上（《Javascript高级程序设计(第三版)》）的代码（如下）说得很清楚：**`global context`对应一个`VO`（就是`window`!!）**, `changeColor`的`local context`对应一个`VO`，`swapColors`的`local context`对应一个`VO`。所以每个context都对应了一个`VO`。

如上所说，**`this`也是执行环境的一部分**，所以不要与`VO`搞混，`VO`是`JS Engine`**内部实现**，用于`identifier resolution`，**JS代码层面是接触不到的**。参见ES2016规范：

> Lexical Environments and Environment Record values are purely specification mechanisms and need not correspond to any specific artefact of an ECMAScript implementation. It is impossible for an ECMAScript program to directly access or manipulate such values.

当然如果你这个`VO`是`global`的话，比较特殊一点：

> A global environment's Environment Record may be prepopulated with identifier bindings and includes an associated global object whose properties provide some of the global environment's identifier bindings. As ECMAScript code is executed, additional properties may be added to the global object and the initial properties may be modified.

这也是为什么前面提到说`global context`对应`window`。

同一本书专门讲Function一章有这样一句话：

> The this object is bound at runtime based on the context in which a function is executed: when used inside global functions, this is equal to window in nonstrict mode and undefined in strict mode, whereas this is equal to the object when called as an object method.

简言之，`this`只是存了一个地址，要么指向`window`，要么指向**调用该方法**的那个`object`。
把上面代码改一下：

```JavaScript
var o = {color: "black"};

function changeColor(){
    var color = "red";
    console.log(this === window);
    function swapColors(){
        console.log(this === window);
        console.log(this.color);
        console.log(color);
    }

    swapColors();
}

changeColor(); // Output: true, true, undefined, red
o.changeColor = changeColor;
o.changeColor(); // Output: false, true, undefined, red
```

`swapColors`里的`this`，和`swapColors`的`context`对应的`VO`没什么关系，而是指向`window`。

### 再说下作用域与执行上下文

JavaScript代码的整个执行过程，分为两个阶段，**代码编译阶段与代码执行阶段**。
**编译阶段**由编译器完成，将代码翻译成可执行代码，这个阶段作用域规则会确定。
**执行阶段**由引擎完成，主要任务是执行可执行代码，执行上下文在这个阶段创建。

![process.webp](process.webp)

然后是前面说的`执行上下文`的**生命周期**

![execution_context.webp](execution_context.webp)

### 函数调用栈与作用域链

```JavaScript
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() {
        console.log(c); // 在这里，试图访问函数bar中的c变量，会抛出错误
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    var c = 100;
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar();
```

这里打印`c`要看你的作用域链上能不能找到`c`,而不是说调用的时候, 前面有个`c`用过.

## 参考

[《高性能JavaScript》第2章](http://www.menvscode.com/detail/599fd4673bb2bd430d7a7e01)

**重点是这4篇文章, 然后看完就看下浏览器的机制, 再看下执行上下文的结构**
[JavaScript 核心概念之作用域和闭包 666](https://www.css88.com/archives/7262)
[深入理解JavaScript中的作用域和上下文 666](https://www.css88.com/archives/7255)
[实例分析 JavaScript 作用域 6666](https://www.css88.com/archives/7300)
[JavaScript 中的 Hoisting (变量提升和函数声明提升) 666](https://www.css88.com/archives/7924)

{% post_link 从输入URL到页面加载发生了什么 从输入URL到页面加载发生了什么 %}

[了解JavaScript的执行上下文](https://yanhaijing.com/javascript/2014/04/29/what-is-the-execution-context-in-javascript/)
[由变量提升谈谈 JavaScript Execution Context](https://juejin.im/post/5a5ee28f6fb9a01cbe655860)

[js中 执行环境(execution context) 和 作用域(scope) 的区别在哪里?](https://www.zhihu.com/question/51336888)
[js 中的活动对象 与 变量对象 什么区别？](https://www.zhihu.com/question/36393048)

[讲清楚之javascript作用域](https://segmentfault.com/a/1190000014980841)
[深入理解JS中声明提升、作用域（链）和`this`关键字](https://github.com/creeperyang/blog/issues/16)
[图解JS闭包形成的原因](https://segmentfault.com/a/1190000011504517)