---
title: PAT刷题前的准备
date: 2018-01-22 20:50:10
tags:
- pat
- 刷题
- lintcode
- leetcode
categories:
- 前端
comments: false
permalink:
---

# C/C++快速入门

```c++
#include <cstdio>

int main(){

    return 0;
}
```

一个基本的C++程序模板，当然主要是注意头文件，和c语言的`<stdio.h>`不一样的,这里是`<cstdio>`
常用的头文件还有
```c++
#include <string.h>     //字符串
#include <math.h>       //数学函数
#include <iostream>     //cin cout
using namespace std;

```

## 基本数据类型  不用markdown，用html，但br换行

|        | 类型      | 大致范围                             | 输入 | 输出 |
| :----: | :-------: | :----------------------------------: |
| 整型   | int       | 正负2*10^9用                         | %d   | %d   |
|        | long long | 9*10^18 超过了用这个 LL              | %lld |      |
| 浮点型 | float     | 精度6-7位                            | %f   | %f   |
|        | double    | 精度15-16位                          | %lf  |      |
| 字符型 | char      | -128~127 用0~127  ''                 | %c   | %c   |
| 字符串 |           | 就是字符数组         ""              | %s   |
| 布尔型 | bool      | 正负整数为true，0为false，存储按1和0 |

```
%m.nf
这个m表示最少输出m位，包括.  右对齐。前面补空格 %0md表示前面补0
n表示小数输出n位，不存在四舍五入
```

```
scanf  printf  getchar putchar gets puts  sscanf sprintf 4对

scanf是用空白符作为结束(包括tab 空格 回车。\f \r \n \t \v一般输入也就空格，tab，回车)，
这个要特别注意%d和%c混用，并且用空格来分割两个整数的情况,读取字符串"hi"时和gets一样末尾自动加'\0'。再说下字符数组{'h', 'i'}因为这样初始化后，后面的元素为0，也就是ascii 0 \0
&只有字符串不加，其他加。
getchar是用来输入字符(这个可以接受上面说的结束符，但上面scanf虽然接受了但用来做结束的)
gets输入字符串的，末尾和scanf一样自动加`\0`，getchar不加。这个gets以\n回车为结束
puts输出字符串，自动在末尾加\n

```

```c++
从scanf和printf到sscanf和sprintf
scanf("%d", &n); 到 scanf(screen, "%d", &n); 所以sscanf(str, "%d", &n);
printf("%d", n); 到 printf(screen, "%d", n); 所以sprintf(str, "%d", &n);
不过sscanf和sprintf虽然读入的是串，但可以规定按别的格式读入串。同理输出。可以和printf混用，输出到屏幕

```


```
强制转换(新类型名)变量名
```

符号常量和const常量

```
#define     const 推荐用const
```
注释

```
//  /**/
```

运算符

```
1.算数
+ - * / % ++ --
2.关系
> < >= <= == !=
3.逻辑
&& || !
4.条件
? :
5.位
& | !
```

## 顺序结构





## 常用数学函数 (加math.h)
1. fabs(double x)
2. floor(double x) ceil(double x)
3. round(double x)和java不一样
4. pow(double r, double p)
5. sqrt(double x)
6. log(double x)
7. sin(double x) cos(double x) tan(double x)
8. asin(double x) acos(double x) atan(double x)
 
## 选择

```
if  else
switch case break

在使用if的过程中如果条件是
n!=0, 可以直接写if(n)  非空
n==0, 写if(!n)        这个不是非空，而是空
```

## 循环

```
while do-while
for(int i = 0; i < n; i++) c++可以这么写。c不行

break continue
```

## 数组

一维数组 大小固定 const N
下标0~n-1

初始化的问题

```c++
int a[10] = {};
int a[10] = {0};
但不能
int a[10];  //这里就不是0，而是随机数

用memset来对数组元素全设为0或-1，其他的用fill函数
```

二维数组

int a[5][6] = { {}, {}, {} }；

若定义的数组大于10^6，则放在main函数外，不然栈中放不下，静态存储区可以放得下。


字符数组 char

```c++
char str[15] = {'A', 'B' };

char str2[15] = "hello";    //也可以用字符串，但仅在初始化可以用

一维数组当字符串，二维的当字符串数组，这里上面两种方式不同，第二种末尾自动加`\0`，第一种没有。
不过说串就是字符数组啊，末尾自动加'\0'。还有就是%s读取用scanf和gets，会在末尾自动加\0
```

//例子

```c++
#include<cstdio>
//通过vs调试可以看到
int main(){
	char str[15] = {'h', 'e', 'l', 'l', 'o'};    //这里都输出hello，因为str[5]及以后被初始化0，就是字符串的结束符
	char str2[15] = "hello"; 
	printf("%s\n", str );
	printf("%s\n", str2 );
	return 0;
}

```
![char1](char1.png)

```c++
char str[5] = {'h', 'e', 'l', 'l', 'o'};    //这个字符数组是不会自动加\0，这个没有溢出
char str2[5] = "hello";     //运行时这里报错，溢出，说明字符串是默认后面加个\0，

char str[5] = {'h', 'e', 'l', 'l', 'o'};   // 用%s格式可以输出，但因为末尾没有0，%s所以末尾会输出乱码
char str2[6] = "hello"; //%s输出hello

```
![char2](char2.png)
![char3](char3.png)

## string.h头文件

4个常用的

1. strlen(str) 
可以得到字符数组中第一个\0前的字符个数
2. strcmp(str1, str2)
按ASCII大小比较，按编辑器不同，返回正数，0，负数。
3. strcpy(str1, str2)
str2复制给str1，包括str2的\0，不然怎么结束
4. kstrcat(str1, str2)
str1接上str2

sscanf和spritf

## 函数

## 指针
一个地址表示存有1个字节，通过数据类型知道要读多少个字节。

&取地址 是个unsigned整型。

定义
```c++
int *p1, p2;    //一个是指针，一个是整型
int *p1, *p2;   //两个指针

```
指针加减法

加法表示跳过n个**此种类型的距离**。
减法表示以此种类型为**基准**，相差n个距离。

### 指针和数组

数组名就是个指针，当数组首地址使用，表示整个数组。

### 指针与函数

### 引用

对引用变量的操作就是对原变量的操作。
当你不想通过传地址，可以通过引用来实现交换数据。

```c++
#include <cstdio>

void change (int &y){
    y = 1;
}

int main(){
    int x = 10;
    change(x);
    printf("%d\n", x);
    return 0;
}

```
就是在函数的参数中，&。
**注意参数变量得是变量，不能是const常量**

## 结构体

```c++
struct studentInfo {
    int id;
    char gender;
    char name[20];
    char major[20];
}Alice, Bob, stu[1000];
```
上面的定义中，studentInfo是结构体名字，Alice Bob是结构体变量，stu[1000]是数组。
上面studentInfo中不能出现studentInfo类型的，但可以出现定义自身类型的指针变量。

```c++
struct node {
    node n;
    struct node *next;
}
```

### 访问结构体内元素

要么用. 要么->

```c++
struct studentInfo {
    int id;
    char name[20];
    studentInfo *next;
}stu, *p
```


可以
```c++
stu.id stu.name stu.next
(*p).id (*p).name (*p).next
p->id p->name p->next
```

### 结构体初始化(利用构造函数)

同java 没有返回类型，名字同结构体名
```c++
struct studentInfo {
    int id;
    char gender;
    studentInfo(){};
    studentInfo(char x){
        gender = x;
    };
    studentInfo(int x, char y){
        id = x;
        gender = y;
    };
    
}

```

## 补充

### cin和cout
加头文件
```c++
#include <iostream>
using namespace std;
```

不需要指定格式

```c++
cin >> n >>db >> c >> str;

//一整行用getline
char str[100];
cin.getline(str, 100)

//string容器
string str;
getling(cin, str);

//换行可以加\n或者endl
cout << n <<"" << c <<"\n" <<endl
```

### 浮点数比较大小

利用一个eps 10^-8

大于，小于 大于等于， 小于等于
这些都画个图就知道了

(b-eps,b+eps) a
a > b+eps
即a-b > eps
同理

cos(π) = -1 所以 π = acos(-1.0)

### 复杂度

时间复杂度一般为10^7~10^8次,所以O(n^2) n=1000可以接受
空间复杂度也不要超过10^7 `A[10000][10000]`的就不要

## 黑盒测试

单点测试 PAT

多点测试
3种
1. while……EOF   题目没有说明有多少数据需要输入时

```c++
while(scanf("%d", &n) != EOF) {

}
```

2. while……break 题目要求输入的数据满足某个条件时停止输入

```c++
while(scanf("%d%d", &a, &b) != EOF) {
    if(a == 0 && b == 0) break;
    printf("%d\n" , a + b);
}

改为更简洁的

while(scanf("%d%d", &a, &b), a || b) {
    printf("%d\n" , a + b);
}
```

3. while(T--)   题目给出测试数据的组数

```c++
1. 正常输出
2. 每行输出后带一个空行
3. 最后一行不输出空行，就是加个判断，当T>0才输出空行。
```


