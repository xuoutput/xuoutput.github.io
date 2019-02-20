---
title: js作用域链和闭包
date: 2019-01-10 19:15:16
tags:
- javascript
- 作用域链
categories:
- javascript教程
comments: false
permalink:
---

# js作用域链和闭包

## 1.执行环境(execution context)

> 执行环境`execution context`和环境`context`不一样, 后面有介绍

执行环境定义了**变量和函数有权访问的其他数据**，决定了他们各自的行为。每个执行环境都有与之对应的**变量对象**（`variable object`）
> `变量对象`就是执行环境中定义的变量和函数，`活动对象`是函数执行的时候被创建的，是属于某个函数的
**保存着该环境中定义的所有变量和函数**。我们无法通过代码来访问变量对象，但是**解析器**在处理数据时会在后台使用到它。
执行环境有**全局执行环境**（也称全局环境）和**函数执行环境**之分。执行环境如其名是在运行和执行代码的时候才存在的，所以我们**运行浏览器的时候**会创建全局的执行环境，在**调用函数**时，会创建函数执行环境。

### 1.1 全局执行环境

全局执行环境是**最外围的一个执行环境**，在web浏览器中，我们可以认为他是**window对象**，因此所有的全局变量和函数都是作为`window`对象的**属性和方法**创建的。代码载入浏览器时，全局环境被创建，关闭网页或者关闭浏览时全局环境被销毁。

### 1.2 函数执行环境

每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就被**推入一个环境栈**中，当函数执行完毕后，栈将其环境弹出，把控制权返回给之前的执行环境。

## 2 作用域、作用域链

### 2.1作用域(Scope)

作用域概念是理解`JavaScript`的关键所在，不仅仅从性能角度，还包括从功能角度。**作用域就是变量和函数的可访问范围，控制着变量和函数的可见性与生命周期**，换句话说，作用域决定了代码区块中变量和其他资源的可见性。在`JavaScript`中变量的作用域有全局作用域和局部作用域。`JavaScript`采用词法作用域(`lexical scoping`)，也就是**静态作用域**。

{% post_link 静态作用域与动态作用域 静态作用域与动态作用域%}

> 在下面的图中, `AO`就是一个作用域, `Global object`也是一个作用域`scope`, 他们串一起就是`scope chain`咯

#### 2.1 全局作用域（globe scope）和局部作用域（local scope）和块级作用域

在`ECMAScript 5`（包括ECMAScript 5）之前的版本中，作用域只有全局作用域和局部作用域，不存在块级作用域；`ECMAScript 6`引入了`let`和`const`关键字，利用`let`和`const`可以形成块级作用域。(**和c go那样的在`{}`里面表示块,不需要结合`if for`一起用才能形成块**)

**1、全局作用域**:

在代码中任何地方都能访问到的**对象**拥有全局作用域。全局作用域的变量是**全局对象**的属性，不论在什么函数中都可以直接访问，而不需要通过全局对象，但加上全局对象，可以提供搜索效率。

> a、没有用var声明的变量（除去函数的参数）都具有全局作用域，成为全局变量，所以声明**局部变量**必须要用var。
> b、`window`的所有属性都具有全局作用域
> c、最外层**函数体外声明的变量**也具有全局作用域

2、局部作用域

局部变量的优先级高于全局变量。

> a、函数体内用var声明的变量具有局部作用域，成为局部变量
> b、**函数的参数**也具有局部作用域

```JavaScript
var a=3; // a全局变量  
function fn(b){ // fn全局变量 b局部变量  
 c=2; // c全局变量  
 var d=5; // d局部变量  
 function subFn(){  // subFn局部变量
    var e=d; // 父函数的局部变量对子函数可见  
    for(var i=0;i<3;i++){  
      console.write(i);  
    }  
    alert(i);// 3, 在for循环内声明，循环外function内仍然可见，没有块作用域  
 }  
}  
alert(c); // 在function内声明但不带var修饰，仍然是全局变量  
```

**3、块级作用域**:

使用let和const关键字声明的变量，会在形成块级作用域。常见的是在`if`和`for`的`{}`语句块里面用, 可以单独使用`{}`作为块作用域哦

```JavaScript
if (true) {
   // 'if' 条件语句块不会创建一个新的作用域
   // name 在全局作用域中，因为通过 'var' 关键字定义
   var name = 'Hammad';
   // likes 在局部（本地）作用域中，因为通过 'let' 关键字定义
   let likes = 'Coding';
   // skills 在局部（本地）作用域中，因为通过 'const' 关键字定义
   const skills = 'JavaScript and PHP';
}

{
    const a = 1
}
console.log(name); // logs 'Hammad'
console.log(likes); // Uncaught ReferenceError: likes is not defined
console.log(skills); // Uncaught ReferenceError: skills is not defined
console.log(a); // Uncaught ReferenceError: a is not defined
```

### 上下文(context)不是执行上下文(execution scope)

许多开发人员经常混淆作用域(`scope`)和上下文(`context`)，很多误解为它们是相同的概念。但事实并非如此。作用域(`scope`)我们上面已经讨论过了，而上下文(`context`)是用来指定代码某些特定部分中`this`的值。
作用域(`scope`) 是指**变量的可访问性**，上下文(`context`)是指`this`在**同一作用域内的值**。
我们也可以使用`call()`、`apply()`、`bind()`、`箭头函数`等改变上下文。
在浏览器中在全局作用域(`scope`)中上下文中始终是`Window对象`。在Node.js中在全局作用域(`scope`)中上下文中始终是`Global` 对象。

```JavaScript
var name = "windowsName";
function a() {
    var name = "Cherry";
    console.log(this.name);  // windowsName
    console.log("inner:" + this);// inner: Window
}
a();
console.log("outer:" + this) // outer: Window
```

上下文始终坚持一个原理：`this` **永远指向最后调用它的那个对象**参考{% post_link javascript中this指向由函数调用方式决定 javascript中this指向由函数调用方式决定%}，上例中调用`a`函数的是`window`，所以a函数中的`this`指向`window`对象。关于`this`以及改变`this`的指向，可以参考[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)

### 2.2 作用域链（scope chain）

`JavaScript` 中每个函数都都表示为一个**函数对象**（函数实例），函数对象有一个仅供 `JavaScript` 引擎使用的`[[scope]]` 属性。通过**语法分析和预解析**，将`[[scope]]` 属性**指向函数定义时**作用域中的**所有对象集合**。这个**集合**被称为函数的**作用域链**（`scope chain`），包含函数定义时作用域中所有可访问的数据。

```JavaScript
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}
```

当**定义** `add` 函数后，**其作用域链就创建了**。函数所在的全局作用域的全局对象被放置到 `add` 函数作用域链（`[[scope]]` 属性）中。我们可以从下图中看到作用域链的**第一个对象保存的是全局对象**，全局对象中保存了诸如 `this` , `window` , `document` 以及全局对象中的 `add` 函数，也就是他自己。这也就是我们可以在全局作用域下的函数中访问 `window(this)`，**访问全局变量**，**访问函数自身**的原因。全局上下文中的变量对象(`Variable object，VO`)就是全局对象。

![scopechain1.png](scopechain1.png)

全局作用域和局部作用域中**变量的访问权限**，其实是**由作用域链决定的**。

每次进入一个新的执行环境(**这里就表示程序执行起来了**)，都会创建一个用于**搜索变量和函数的作用域链**。作用域链是函数被创建的作用域中对象的**集合**。作用域链可以保证对执行环境有权访问的所有变量和函数的有序访问。

**作用域链的最前端始终是当前执行的代码所在环境的变量对象**（如果该环境是函数，则将其**活动对象**作为变量对象），下一个变量对象来自包含环境（包含当前还行环境的环境），下一个变量对象来自包含环境的包含环境，依次往上，直到全局执行环境的变量对象。全局执行环境的变量对象始终是作用域链中的最后一个对象。

**标识符解析**是沿着作用域一级一级的向上搜索标识符的过程。搜索过程始终是从作用域的前端逐地向后回溯，直到找到标识符。

```javascript
var foo = "foo";
function fName(){
    var bar="bar";
    function sName(){
        console.log(foo);//foo
        console.log(bar);//bar
        var tName="tName";
        console.log(tName);//tName
    }
    bName();
}
fName();
```

上述代码中，一共有**三个执行环境**：`全局环境`、`fName()`的局部环境和 `sName()` 的局部环境。所以，

1. 函数 `sName()`的作用域链包含三个对象：自己的变量对象----->`fName()`局部环境的变量对象 ----->全局环境的变量对象。
2. 函数 `fName()`的作用域链包含两个对象：自己的变量对象----->全局环境的变量对象。

就上述程序中出现的变量和函数来讲（不考虑隐形变量）：

1. `sName()` 局部环境的变量对象中存放变量 `tName`；
2. `fName()` 局部环境的变量对象中存放变量 `bar` 和 函数`sName()`；
3. 全局环境的变量对象中存放变量 `foo` 、函数`fName()`;

![scope1.gif](scope1.gif)

作用域链相关知识的总结：

1. 执行环境决定了变量的生命周期，以及哪部分代码可以访问其中变量和函数
2. 执行环境有全局执行环境（全局环境）和局部执行环境之分。
3. 每次进入一个新的执行环境，都会创建一个用于搜索变量和函数的作用域链
4. 函数的局部环境可以访问函数作用域中的变量和函数，也可以访问其父环境，乃至全局环境中的变量和环境。
5. 全局环境只能访问全局环境中定义的变量和函数，不能直接访问局部环境中的任何数据。
6. 变量的执行环境有助于确定应该合适释放内存。

### execution context, scope chain, scope三者关系

看闭包那个图图可以知道, 最左边的是`execution context`, 中间的是`scope chain`, 最右边的是`scope`

### 再说下执行器上下文(execution context)

**执行具体的某个函数时**，JS引擎在执行每个函数实例时，都会创建一个执行期上下文（`Execution Context`）和激活对象（`active Object`）（它们**属于宿主对象**，与函数实例执行的生命周期保持一致，也就是函数执行完成，这些对象也就被销毁了，闭包例外。）

假设我们运行以下代码：

```JavaScript
var total = add(5, 10);
```

执行该函数创建一个**内部对象**，称为 `Execution Context`（执行期上下文）。执行期上下文**定义了一个函数正在执行时的作用域环境**。
> 特别注意，**执行期上下文`execution context`和我们平常说的上下文`context`不同**，执行期上下文指的是**作用域`[[scope]]`**??。平常说的上下文是`this`的取值指向。

**执行期上下文**和**函数创建时**的作用域链对象 `[[scope]]` 区分，**这是两个不同的作用域链对象**。分开的原因很简单，函数定义时的作用域链对象 `[[scope]]` 是固定的，而 执行期上下文 会**根据不同的运行时环境变化**。而且该函数每执行一次，都会创建单独的 执行期上下文，因此对同一函数调用多次，会导致创建多个执行期上下文。一旦函数执行完成，执行期上下文将被销毁。

执行期上下文对象有自己的作用域链，当创建执期行上下文时，其作用域链将使用执行函数`[[scope]]`属性所包含的对象（即，函数定义时的作用域链对象）进行初始化。**这些值按照它们在函数中出现的顺序复制到执行期上下文作用域链中**。(所以要注意闭包的产生)

无论有多少个函数上下文，但是全局上下文只有一个。**执行期上下文有创建和代码执行的两个阶段**。

下面链接讲了函数定义时的作用域链,以及函数运行时的执行上下文的区别.
[JavaScript 核心概念之作用域和闭包][1]
[前端基础进阶（四）：详细图解作用域链与闭包][2]

> JavaScript代码的整个执行过程，分为两个阶段，代码编译阶段与代码执行阶段。编译阶段由编译器完成，将代码翻译成可执行代码，这个阶段**作用域规则**会确定。执行阶段由引擎完成，主要任务是执行可执行代码，**执行上下文**在这个阶段创建。

```JavaScript
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}
```

#### 第一阶段：创建阶段

当一个**函数被调用但是其代码还没有被执行**的时候。在创建阶段主要做的三件事情是：

1. 创建变量（激活）对象（`VO == AO`) **详看变量对象干了啥**: [前端基础进阶（三）：变量对象详解][3]
2. 创建作用域链
3. 设置上下文(`context`)的值（ `this` ）

**激活对象(`Activation Object，AO`)**

当一个函数被调用但是其代码还没有被执行的时，在执行其上下文中创建一个名为 `Activation Object`（激活对象）的**新对象**。这个激活对象保存了函数中的**所有形参，实参，局部变量**，`this` 指针等函数执行时函数内部的数据情况。然后将这个激活对象推送到执行其上下文作用域链的顶部。

1. 函数参数(若未传入，初始化该参数值为`undefined`)
2. 函数声明(若发生命名冲突，会覆盖)
3. 变量声明(初始化变量值为`undefined`，若发生命名冲突，会忽略。)

例如: `add`函数被调用，但是还未执行时的VO(变量对象)==AO(激活对象)是：

```JavaScript
AO(add) = {
  arguments: {
    0: 5,
    1: 10
    length: 2
  },
  num1: 5,  
  num2: 10,  
  sum: undefined  
};
```

> 上面代码是不是少了`this`的值, 调用的时候`this`就可以确定了的啊, 图中就有`this`

**激活对象AO是一个可变对象**，里面的数据随着函数执行时的数据的变化而变化(比如进行赋值)，当函数执行结束之后，执行期上下文将被销毁。也就会销毁`Execution Context`的作用域链，激活对象也同样被销毁。**但如果存在闭包**，激活对象就会以另外一种方式存在，这也是**闭包产生的真正原因**，具体的我们稍后讨论。下图显示了执行上下文及其作用域链：

![execution_scope1.png](execution_scope1.png)

从左往右看，**第一部分**是函数执行时创建的执行期上下文，它有自己的作用域链，**第二部分**是作用域链中的对象，**索引为1**的对象是从`[[scope]]`作用域链中**复制**过来的，**索引为0**的对象是在函数执行时**创建**的激活对象，**第三部分**是作用域链中的对象的内容`Activation Object`(激活对象)和`Global Object`(全局对象)。

**函数在执行时，每遇到一个变量，都会去执行期上下文的作用域链的顶部，执行函数的激活对象开始向下搜索**，如果在第一个作用域链（即，`Activation Object` 激活对象）中找到了，那么就返回这个变量。如果没有找到，那么继续向下查找，直到找到为止。如果在整个执行期上下文中都没有找到这个变量，在这种情况下，该变量被认为是未定义的。这也就是为什么函数可以访问全局变量，当局部变量和全局变量同名时，会使用局部变量而不使用全局变量，以及 `JavaScript` 中各种看似怪异的、有趣的作用域问题的答案。

#### 第二阶段：代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值，并最终执行代码(这里只是变化变量的值, 但`this`是一直在的)。当代码执行完后，这时候的 AO 是：

```javascript
AO(add) = {
  arguments: {
    0: 5,
    1: 10
    length: 2
  },
  num1: 5,  
  num2: 10,  
  sum: 15       // sum有了
};
```

## 闭包Closure 重点看这里, 前面讲的不怎么细

> 前面讲的不怎么细, 这里重新开始把在函数定义时产生的`scope chain`和`函数调用但未执行时`和`函数执行时`的各个情况画图

闭包（`Closure`）是 `JavaScript` 最强大的特性之一，它允许函数访问局部作用域之外的数据。闭包在日常编码工作中非常常见。但是，它会对性能造成影响。了解闭包我们使用以下示例代码：

```JavaScript
function assignEvents(){
    var id = "666677";
    document.getElementById("save-btn").onclick = function(event) {
        saveDocument(id);
    };
}
```

> 闭包是一种特殊的对象。
> 它由两部分组成。执行上下文(代号A)，以及在该执行上下文中创建的函数（代号B）。
> 当B执行时，**如果访问了A中变量对象中的值(不访问当然不产生闭包)**，那么闭包就会产生。
> 在大多数理解中，包括许多著名的书籍，文章里都**以函数B**的名字代指这里生成的**闭包**。而在`chrome`中，则以**执行上下文A的函数名**代指**闭包**。

`assignEvents` 函数为DOM元素分配一个事件处理程序。这个处理函数就是一个闭包。为了使该闭包访问id变量，必须创建一个特定的作用域链。

**我们一起来从作用域的角度分析一下闭包的形成过程**：

`assignEvents` 函数创建并且词法解析后，函数对象`assignEvents`的`[[scope]]`属性被初始化，作用域链形成，作用域链中包含了全局对象的所有属性和方法（**注意，此时因为 `assignEvents` 函数还未被执行，所以闭包函数并没有被解析**）。

类似这图:
![scopechain1.png](scopechain1.png)

`assignEvents` 开始执行时，创建 `Execution Context`（执行期上下文），在执行期上下文的作用域链中创建 `Activation Object`(激活对象)，并将 `Activation Object`(激活对象) 推送到作用域链顶部，在其中保存了函数执行时所有可访问函数内部的数据。激活对象包含 id 变量。

类似这图:
![execution_scope1.png](execution_scope1.png)

当执行到闭包时，`JavaScript` 引擎发现了闭包函数的存在，按照通常的手法，将闭包函数解析，为闭包函数对象创建 `[[scope]]` 属性，初始化作用域链。特别注意的是，这个时候，闭包函数对象的作用域链中有两个对象，一个是 `assignEvents` 函数执行时的 `Activation Object`(激活对象) ，还有一个是全局对象，如下图

![closure1.png](closure1.png)

我们看到图中闭包函数对象的作用域链和 `assignEvents` 函数的执行期上下文的作用域链是相同的。为什么相同呢？我们来分析一下，闭包函数是在 `assignEvents` 函数执行的过程中被定义并且解析的，而函数执行时的作用域是 `Activation Object`(激活对象) ，闭包函数被解析的时候它的作用域正是 `assignEvents` 作用域链中的第一个作用域对象 `Activation Object`(激活对象) ，当然，由于作用域链的关系，全局对象作用域也被引入到闭包函数的作用域链中。

在词法分析的时候闭包函数的 `[[scope]]` 属性 就已经在作用域链中保存了对 `assignEvents` 函数的 `Activation Object`(激活对象) 的引用，所以当 `assignEvents` 函数执行完毕之后，**闭包函数虽然还没有开始执行(执行后是另一个作用域链)**，但依然可以访问 `assignEvents` 的局部数据，并不是因为闭包函数要访问 `assignEvents` 的局部变量`id`，所以当 `assignEvents` 函数执行完毕之后依然保持了对局部变量`id`的引用。而是不管是否存在变量引用，都会保存对 `assignEvents` 的 `Activation Object`(激活对象)作用域对象的引用。因为在词法分析时，闭包函数没有执行，函数内部根本就不知道是否要对 `assignEvents` 的局部变量进行访问和操作，所以只能先把 `assignEvents` 的 `Activation Object`(激活对象) 作用域对象保存起来，当闭包函数执行时，如果需要访问 `assignEvents` 的局部变量，那么再去作用域链中查找。

也正是因为这种引用，造成了一个**副作用**。通常，当执行期上下文被销毁时，函数的激活对象也就被销毁了。当有闭包引用时，激活对象就不会被销毁，因为他仍然被引用。这意味着闭包比非隔离的函数需要更多的内存。

**闭包函数**执行时创建了自己的 `Execution Context`（执行期上下文），其作用域链使用了 `[[scope]]` 属性，其引用了 `assignEvents` 函数的 `Activation Object`(激活对象) 和 全局对象。然后为闭包本身创建一个新的 `Activation Object`(激活对象)。 所以在闭包函数的执行期上下文的作用域链中保存了自己的 `Activation Object`(激活对象)，外层函数 `assignEvents` `Execution Context`（执行期上下文）的 `Activation Object`(激活对象)，以及 `Global Object`(全局对象)，如图：

![closure2.png](closure2.png)

## 3.提升（hoisting）

**提升有变量提升和函数提升之分, 先提升函数声明, 在提升变量声明**.

[JavaScript 中的 Hoisting (变量提升和函数声明提升)](https://www.css88.com/archives/7924)

**规则**:

1. 扫描当前**函数声明**中的代码。**函数表达式和箭头函数**会被跳过。对于每个被发现的函数，**都会创建一个新的函数**，并使用函数名称将其绑定到环境中。如果标识符的名称已经存在，那么它的值就会被**覆盖**。
2. 然后扫描当前环境的**变量**。找到使用 `var` 定义的变量和放置在其他函数之外的变量，并注册一个标识符，其值初始化为 `undefined` 。**如果存在标识符，则该值将保持不变(就是忽略后面的生命, 反正都是`undefined`)**。

> 注意：用 `let` 和 `const` 定义的是块变量，与 `var` 的处理稍微不同, **不能重复定义**。

[JavaScript深入之执行上下文栈](https://github.com/mqyqingfeng/Blog/issues/4)

> javascript 函数声明和变量声明会被解释器提升到最顶端，但是**变量的初始化不会被提升**  因为`var foo = "变量"`; `foo`被初始化了
> 其实主要是`var foo`;并不会覆盖之前的变量

```JavaScript
var foo = "function";
var foo;//它只是定义，全不会覆盖变量
console.log(foo);//返回 function
```

**例子**: 如果先提升函数声明,在提升变量声明, 那么结果怎么不打印`变量`,而是函数. (**注意只是提升声明而已, 不是提升变量的初始化**)

```JavaScript
console.log(foo);   // 这边是执行
function foo(){
    console.log("函数声明");
}
var foo = "变量";
```

**解答**:

函数提升优先级比变量提升要高，**且不会被变量声明覆盖**，**但是会被变量赋值覆盖**，所以你上面的代码实际上是

```JavaScript
function foo(){             // 函数声明提前了
    console.log("函数声明");
}
var foo;                    // 然后是变量声明再提前
console.log(foo);           // 执行在这里哦, 执行的语句不会提, 还是在原来的位置
foo = "变量";
```

在最后再加上打印就能看到函数已经被覆盖了。
注：初始化变量不会把值也提上上去，只会提升变量的声明。(**只是提升声明, 运行还是在那行运行的**)

**再比如**:

```JavaScript
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???  1
```

提升后的结果是

```JavaScript
function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

var value;
value = 1;  // 注意这里条赋值语句之前都是提升, 然后这行开始运行, 赋值了,

bar();      // 这边的bar()是执行前面声明过的函数, 运行前value的值就是1了, 所以最后打印1
```

这里注意作用域链

### 3.1 变量提升（variable hoisting）

```JavaScript
var name="foo";
 function fName(){
     console.log(name); // undefined
     var name="bar";
 }
 fName();
 console.log(name); // foo
```

输出结果结果分别是 `undefined` 和 `foo`。为什么是`undefined`？

那我们先来分析一下代码 函数`fName()`的作用域链： 自己的变量对象 -----> 全局变量对象。解析器在函数执行环境中发现变量 `name`，因此不会再向全局环境的变量对象中寻找。但是大家要注意的是，解析器在解析第3句代码时，**还不知道变量`name`的值**，也就是说只知道有变量`name`，但是不知道它具体的值（因为还没有执行第4句代码），因此输出是 `undefined`，第7行输出`foo`大家应该都理解把（作用域问题）。所以上述代码可以写成下面的形式：

```JavaScript
var name="foo";
 function fName(){
     var name;
     console.log(name); // undefined
     name="bar";
 }
 fName();
 console.log(name); // foo
```

这个现象就是**变量提升**！

变量提升，就是把变量提升到函数的顶部，需要注意的是，**变量提升只是提升变量的声明，不会把变量的值也提升上来**

### 3.2 函数提升

函数提升就是把函数提升到前面。

在`JavaScript`中函数的创建方式有三种：函数声明（静态的）、函数表达式（函数字面量）、函数构造法（动态的，匿名的）。

函数声明

```JavaScript
function f(n1,n2){
    //function body;
};
```

函数表达式的形式如下：

```JavaScript
var func1 = function(n1,n2){
    //function body;
};
```

函数构造法构造函数的形式如下：

```JavaScript
var func2 = new Function("para1","para2",...,"function body");  
```

## 总结下

{% post_link 再谈js作用域 再谈js作用域 %}

## 参考

[JavaScript中作用域和作用域链的简单理解（变量提升）](https://www.cnblogs.com/buchongming/p/5858026.html)
[JavaScript作用域、上下文、执行期上下文、作用域链、闭包 666](https://blog.csdn.net/qq_27626333/article/details/78463565)
[实例分析 JavaScript 作用域, 同时讲了形参, 实参, 同名局部变量 666](https://www.css88.com/archives/7300)

4个一起看
[JavaScript 核心概念之作用域和闭包 666](https://www.css88.com/archives/7262)
[深入理解JavaScript中的作用域和上下文 666](https://www.css88.com/archives/7255)
[实例分析 JavaScript 作用域](https://www.css88.com/archives/7300)
[JavaScript 中的 Hoisting (变量提升和函数声明提升) 666](https://www.css88.com/archives/7924)

[前端基础进阶（四）：详细图解作用域链与闭包](https://www.jianshu.com/p/21a16d44f150)
[前端基础进阶系列 贼6](https://www.jianshu.com/p/cd3fee40ef59)

[1]:https://www.css88.com/archives/7262
[2]:https://www.jianshu.com/p/21a16d44f150
[3]:https://www.jianshu.com/p/330b1505e41d

[《高性能JavaScript》第2章](http://www.menvscode.com/detail/599fd4673bb2bd430d7a7e01)
[闭包，是真的美 666](https://juejin.im/entry/5aca253e5188255c5668b7bb)