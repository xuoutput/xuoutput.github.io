---
title: Building-C-Projects
date: 2019-05-31 15:31:24
tags:
- c
- 翻译
categories:
- c教程
comments: false
permalink:
---

# Building-C-Projects

通常情况下，我会从构建的第一步开始，然后从那里往后解释。 然而，在构建C时，如果按给的列表内容的顺序看的话实际上是非常令人感到混乱; 许多步骤只是为将来的步骤而做的准备，也没有必要事先解释他。 因此，我将从中间步骤开始，从那里开始向后和向前解释。 但是，在解释前,我先按顺序列出这些步骤（这个顺序不是一成不变的，但是使用它是合理且合理的）：

1. Configuration
2. Standard directory detection
3. Source file dependency calculation
4. Header file location
5. Header precompilation
6. Preprocessing
7. Compilation and assembly
8. Object file dependency calculation
9. Linking
10. Installation
11. Resource linking
12. Package generation
13. Dynamic linking

大多数构建系统处理此列表中的步骤3,5到7,9和10（将其他步骤在构建之前或之后就手动完成了）。 `aimake` 目前处理1到11并且在12开始。步骤13几乎总是由操作系统处理。

而现在，这篇文章的主体，描述了构建本身。

## 6: Preprocessing

一个贯穿本篇文章的例子, 用c写的 Hello, world!

```c
#include <stdio.h>

int main(void)
{
    fputs("Hello, world!\n", stdout);
    return 0;
}
```

现在，我想让你关注下`#include <stdio.h>`这行。 **C新手之间经常会犯的一个常见误解是认为它与库有关**，认为通常会导致 `fput` 的定义以某种方式与程序“链接”。 **实际上，完全不是这么回事**：它用于告诉编译器 `fput` 和 `stdout` 是什么`类型`。 在Linux上，上述程序100％和下面的程序一样：

```c
struct foo;
typedef struct foo FILE;

extern int fputs(const char *, FILE *);
extern FILE *stdout;

int main(void)
{
    fputs("Hello, world!\n", stdout);
    return 0;
}
```

我们在任何地方都没有提到 `stdio.h` ，但该程序仍然有效。 很明显，它与**链接**无关。

这里实际发生的是 `stdio.h` 只是一个表示类型，函数和变量声明的列表，以及一些宏定义。 C标准对编译器如何选择实现这些定义没有任何限制，但实际上，像 `stdio.h` 这样的头部几乎总是以稍微得扩展的C语言的实现（使用特定于编译器的扩展来执行原本不能直接用C表示的操作。例如根据源程序中的数组长度添加缓冲区溢出校验码。

在这种情况下，我们将FILE定义为一个不完整的类型（编译器不需要知道运行程序的FILE的定义，只是它是某种结构，因为所有理智的编译器都会相同地处理指向所有结构的指针）; 将 `fput` 作为函数从 `const char *` 和 `FILE *` 转换为 `int` ; 和 `stdout` 作为`FILE`类型的变量。 `extern` 意味着这只是一个声明，并且该文件不一定包含有问题的函数和变量的定义。 （当链接器涉及时，我们将看到定义实际上在哪里。）





## 参考

[Building-C-Projects](http://nethack4.org/blog/building-c.html)