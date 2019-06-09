---
title: python环境安装
date: 2018-11-25 16:19:10
tags:
- es6
- promise
categories:
- python教程
comments: false
permalink:
---

# python 环境安装

下一个`thonny`先用着,

在 mac 上安装 python, 就是用`brew install python3` 然后启动格式 `python3` 而不是 `python`

## 基本语法

print(), 字符串+, 但只能串和串, 这里和 int 这种数学的

+-\*/%
\*\* 幂

变量小写,不用声明, 用`_`隔开.直接赋值好了, 定义多个变量用`a,b,c=11,12,13`, 注意如果是 `a=1,2` 这个是 tuple. #是注释 """ """是块

### 变量

变量不用声明, 直接用. 有 int float bool string

有函数 function, tuple, list, dict

类 class 是 type

```python
print(type(a)) # 看类型
```

### 循环 while 和 for, 没有括号, 只有缩进

```python
while True:
    print("I'm True")
```

True, False. None

在 Python 中集合类型有 list、 tuple 、dict 和 set 等, 都能迭代.

```python
a = range(10)
while a:
    print(a[-1])
    a = a[:len(a)-1]


for item in sequence: # 序列哦
    expressions
```

1 range(start, stop) [start, stop)
2 range(stop)
3 range(start, stop, step)

```python
list []

tuple 类型 ()
tup = ('python', 2.7, 64)
for i in tup:
    print(i)

dictionary 类型 {}
dic = {}
dic['lan'] = 'python'
dic['version'] = 2.7
dic['platform'] = 64
for key in dic:
    print(key, dic[key])

set 类型
s = set(['python', 'python2', 'python3','python'])
for item in s:
    print(item)
```

迭代器 `__iter__` 和 `__next__` 生成器 yield

#### 跳出循环, pass, break, continue

```python
a=True
while a:
    b= input('type somesthing')
    if b=='1':
        a= False
    else:
        pass    # 这是啥事不干, 只是占个位, 还是继续下个循环, 但continue会跳过后面的print
    print('still in while')
print ('finish run')

# type somesthing44
# still in while
# type somesthing3
# still in while
# type somesthing2
# still in while
# type somesthing1
# still in while
# finish run

while True:
    b= input('type somesthing:')
    if b=='1':
        break
    else:
        pass
    print('still in while')
print ('finish run')

"""
type somesthing:4
still in while
type somesthing:5
still in while
type somesthing:1
finish run
"""

while True:
    b=input('input somesthing:')
    if b=='1':
       continue
    else:
        pass
    print('still in while' )

print ('finish run')
"""
input somesthing:3
still in while
input somesthing:1  # 没有"still in while"。直接进入下一次循环
input somesthing:4
still in while
input somesthing:
"""
```

### if, if else 和 if elif

```python
if condition:
    true_expressions
else:
    false_expressions
```

没有 `condition ? value1 : value2` 三目操作符, 用:

```python
var = var1 if condition else var2
```

### def 函数 是函数哦

```python
def function_name(parameters):
    expressions

调用时换参数位置, 但指定
func(b=2,a=1)是同样的 的效果

默认参数
def sale_car(price, color='red', brand='carmy', is_second_hand=True):

自调用, 不晓得
if __name__ == '__main__':
    #code_here

可变参数, 可迭代的grades对象
def report(name, *grades):
    total_grade = 0
    for grade in grades:
        total_grade += grade
    print(name, 'total grade is ', total_grade)

report('Mike', 8, 9, 10)
# Mike total grade is 27

关键字参数, 自动封装成一个字典(dict)
def portrait(name, **kw):
    print('name is', name)
    for k,v in kw.items():
        print(k, v)

portrait('Mike', age=24, country='China', education='bachelor')

# name is Mike
# age 24
# country China
# education bachelor

通过可变参数和关键字参数，任何函数都可以用 universal_func(*args, **kw) 表达。

```

> return 可以返回多个值，以逗号分隔。相当于返回一个 tuple(定值表)。
> `return a,b,c # 相当于 return (a,b,c)`

#### lambda

lambda 定义一个**简单的函数**，实现简化代码的功能，看代码会更好理解。

`fun = lambda x,y : x+y`, 冒号前的 x,y 为自变量，冒号后 x+y 为具体运算。

```python
fun= lambda x,y:x+y
x=int(input('x='))    #这里要定义int整数，否则会默认为字符串
y=int(input('y='))
print(fun(x,y))

"""
x=6
y=6
12
"""
```

#### map

map 是把函数和参数绑定在一起。一对一对.

```python
>>> def fun(x,y):
        return (x+y)
>>> list(map(fun,[1],[2]))
"""
[3]
"""
>>> list(map(fun,[1,2],[3,4]))
"""
[4,6]
"""
```

### 全局和局部, 同 javascript, 在函数中的就是局部

用 `global` 关键字在局部作用域中改这个全局同名变量

```python
APPLY = 100 # 全局变量
a = None
def fun():
    global a    # 使用之前在全局里定义的 a
    a = 20      # 现在的 a 是全局变量了
    return a+100

print(APPLE)    # 100
print('a past:', a)  # None
fun()
print('a now:', a)   # 20
```

[python 单下划线及双下划线使用总结](https://blog.csdn.net/qq_31821675/article/details/78022862)

### 类 class

按变量, 函数的定义, 从 js 理解, 反正也是类. 没有 this 但有 self

```python
class Calculator:       #首字母要大写，冒号不能缺
    name='Good Calculator'  #该行为class的属性
    price=18
    def add(self,x,y):      # self
        print(self.name)
        result = x + y
        print(result)
    def minus(self,x,y):
        result=x-y
        print(result)
    def times(self,x,y):
        print(x*y)
    def divide(self,x,y):
        print(x/y)

"""
>>> cal=Calculator()  #注意这里运行class的时候要加"()",否则调用下面函数的时候会出现错误,导致无法调用.
>>> cal.name
'Good Calculator'
>>> cal.price
18
>>> cal.add(10,20)
Good Calculator
30
>>> cal.minus(10,20)
-10
>>> cal.times(10,20)
200
>>> cal.divide(10,20)
0.5
>>>
"""

class Human(object):
    laugh = 'hahahaha'
    def show_laugh(self):
        print self.laugh
    def laugh_100th(self):
        for i in range(100):
            self.show_laugh()

li_lei = Human()
li_lei.laugh_100th()
```

> 它的参数中有一个`self`，它是为了方便我们引用对象自身。方法的第一个参数必须是`self`，无论是否用到。有关`self`的内容会在下一讲展开
> 在定义方法时，必须有 self 这一参数。这个参数表示某个对象。对象拥有类的所有性质，那么我们可以通过 self，调用类属性。

这里有一个类属性 laugh。在方法 show_laugh()中，通过 self.laugh，调用了该属性的值。
还可以用相同的方式调用其它方法。方法 show_laugh()，在方法 laugh_100th 中()被调用。
通过对象可以修改类属性值。但这是危险的。类属性被所有同一类及其子类的对象共享。类属性值的改变会影响所有的对象

用 `__init__()` 初始化, 当然也可以放初始值.Python 会自动调用这个方法

```python
class Calculator:
    name='good calculator'
    price=18
    def __init__(self,name,price,height,width,weight):   # 注意，这里的下划线是双下划线
        self.name=name
        self.price=price
        self.h=height
        self.wi=width
        self.we=weight
"""
>>> c=Calculator('bad calculator',18,17,16,15) # 这里传入
>>> c.name
'bad calculator'
>>> c.price
18
>>> c.h
17
>>> c.wi
16
>>> c.we
15
>>>
"""
```

子类继承

```python
class Bird(object): # （括号中的object，当括号中为object时，说明这个类没有父类（到头了））
    have_feather = True
    way_of_reproduction = 'egg'
    def move(self, dx, dy):
        position = [0,0]
        position[0] = position[0] + dx
        position[1] = position[1] + dy
        return position

summer = Bird()
print 'after move:',summer.move(5,8)

class Chicken(Bird):    # 不是用extends 而是传入Bird这个
    way_of_move = 'walk'
    possible_in_KFC = True

class Oriole(Bird):
    way_of_move = 'fly'
    possible_in_KFC = False

summer = Chicken()
print summer.have_feather
print summer.move(5,8)
```

### 元组 Tuple 列表 List 统称为 sequence(序列)是一组有顺序的元素的集合

1. tuple 元素不可变，list 元素可变
2. 序列的引用 `s[2]`, `s[1:8:2]`
3. 字符串是一种 tuple

开始

或者说对象集合

> tuple 和 list 的主要区别在于，一旦建立，tuple 的各个元素不可再变更，而 list 的各个元素可以再变更。

Tuple
叫做 tuple，用小括号、或者无括号来表述，是一连串有顺序的数字。

```python
a_tuple = (12, 3, 5, 15 , 6)
another_tuple = 12, 3, 5, 15 , 6
```

> **字符串**是一种特殊的 tuple, 因此可以执行元组的相关操作

List
而 list 是以中括号来命名的:

```python
a_list = [12, 3, 67, 7, 82]
```

可以用 range() len()

`range()` 这个函数的功能是新建一个表。这个表的元素都是整数，从 0 开始，下一个元素比前一个大 1， 直到函数中所写的上限 （不包括该上限本身）

list 是一个类, 是 Python 已经定义好的一个类, 通过`print(dir(list))` 和 help 来查看, 有方法. **运算符都是特殊方法**

#### 序列都可以用[]来引用

还有见到用`[:]`

```python
范围引用： 基本样式[下限:上限:步长]

>>>print(s1[:5])             # 从开始到下标4 （下标5的元素 不包括在内）

>>>print(s1[2:])             # 从下标2到最后

>>>print(s1[0:5:2])          # 从下标0到下标4 (下标5不包括在内)，每隔2取一个元素 （下标为0，2，4的元素）

>>>print(s1[2:0:-1])         # 从下标2到下标1

从上面可以看到，在范围引用的时候，如果写明上限，那么这个**上限本身不包括在内**。

尾部元素引用

>>>print(s1[-1])             # 序列最后一个元素

>>>print(s1[-3])             # 序列倒数第三个元素

同样，如果s1[0:-1], 那么最后一个元素不会被引用 （**再一次，不包括上限元素本身**）
```

#### List

```python
插入
a = [1,2,3,4,1,1,-1]
a.append(0)  # 在a的最后面追加一个0
print(a)
# [1, 2, 3, 4, 1, 1, -1, 0]
在指定的地方添加项：

a = [1,2,3,4,1,1,-1]
a.insert(1,0) # 在位置1处添加0
print(a)
# [1, 0, 2, 3, 4, 1, 1, -1]

删除元素
a = [1,2,3,4,1,1,-1]
a.remove(2) # 删除列表中第一个出现的值为2的项
print(a)
# [1, 3, 4, 1, 1, -1]

用del删
li = [1, 2, 3, 4]
del li[3]
print(li)
# Output [1, 2, 3]

pop删索引出
li = [1, 2, 3, 4]
li.pop(2)
print(li)
# Output [1, 2, 4]

显示特定位：

a = [1,2,3,4,1,1,-1]
print(a[0])  # 显示列表a的第0位的值
# 1

print(a[-1]) # 显示列表a的最末位的值
# -1

print(a[0:3]) # 显示列表a的从第0位 到 第2位(第3位之前) 的所有项的值 切片
# [1, 2, 3]

print(a[5:])  # 显示列表a的第5位及以后的所有项的值
# [1, -1]

print(a[-3:]) # 显示列表a的倒数第3位及以后的所有项的值
# [1, 1, -1]

li = [1, 2, 3, 4]
li = li[:2] + li[3:]
print(li)
# Output [1, 2, 4]

打印列表中的某个值的索引(index):

a = [1,2,3,4,1,1,-1]
print(a.index(2)) # 显示列表a中第一次出现的值为2的项的索引
# 1
统计列表中某值出现的次数：, 而len()是list总长度

a = [4,1,2,3,4,1,1,-1]
print(a.count(-1))
# 1

对列表的项排序：

a = [4,1,2,3,4,1,1,-1]
a.sort() # 默认从小到大排序
print(a)
# [-1, 1, 1, 1, 2, 3, 4, 4]

a.sort(reverse=True) # 从大到小排序
print(a)
# [4, 4, 3, 2, 1, 1, 1, -1]
```

##### 多维列表 二维数组咯

创建二维列表
一个一维的 List 是线性的 List，多维 List 是一个平面的 List：

```python
a = [1,2,3,4,5] # 一行五列

multi_dim_a = [[1,2,3],
			   [2,3,4],
			   [3,4,5]] # 三行三列


print(a[1])
# 2

print(multi_dim_a[0][1])
# 2
```

list() 函数

#### 拉链 zip

zip 函数接受任意多个（包括 0 个和 1 个）序列作为参数，合并后返回一个 tuple 的列表,请看示例：

```python
a=[1,2,3]
b=[4,5,6]
ab=zip(a,b)
print(list(ab))  #需要加list来可视化这个功能
"""
[(1, 4), (2, 5), (3, 6)]
"""
```

#### 字典, dict

对象?

```python
a_list = [1,2,3,4,5,6,7,8]

d1 = {'apple':1, 'pear':2, 'orange':3}
d2 = {1:'a', 2:'b', 3:'c'}
d3 = {1:'a', 'b':2, 'c':3}

print(d1['apple'])  # 1
print(a_list[0])    # 1

del d1['pear']    # 和js的delete不同, js删数组的会保留位置, 只是设undefined而已
print(d1)   # {'orange': 3, 'apple': 1}

d1['b'] = 20
print(d1)   # {'orange': 3, 'b': 20, 'pear': 2, 'apple': 1}
```

### 模块安装

```python
先安装
pip install numpy   # 这是 python2+ 版本的用法
pip3 install numpy   # 这是 python3+ 版本的用法

或更新
pip install -U numpy   # 这是 python2+ 版本的用法
pip3 install -U numpy   # 这是 python3+ 版本的用法

再使用
import numpy as np
import matplotlib.pyplot as plt
```

这里的 Numpy 和 matplotlib 都是外部模块, 需要安装以后才会有的. 他不属于 python 自带的模块.

### import

```python
import time
print(time.localtime())  #这样就可以print 当地时间了
""""
time.struct_time(tm_year=2016, tm_mon=12, tm_mday=23, tm_hour=14, tm_min=12, tm_sec=48, tm_wday=4, tm_yday=358, tm_isdst=0)
""""

import time as t # 重命名
print(t.localtime()) # 需要加t.前缀来引出功能

from time import time, localtime # 只import自己想要的功能.
print(localtime())
print(time())

from time import *  # 所有模块
```

### 没有导出这, 直接就用

### 读写文件

写, 只读,写, 添加

```python
my_file=open('my file.txt','w')   #用法: open('文件名','形式'), 其中形式有'w':write;'r':read.
my_file=open('my file.txt','a')   # 'a'=append 以增加内容的形式打开


my_file.write(text)               #该语句会写入先前定义好的 text
my_file.close()                   #关闭文件
```

读, 所有文件, 按行读文件

```python
一下读所有内容
file= open('my file.txt','r')
content=file.read()
print(content)


使用一次readline读一行

file= open('my file.txt','r')
content=file.readline()  # 读取第一行
print(content)

"""
This is my first test.
"""

second_read_time=file.readline()  # 读取第二行
print(second_read_time)

"""
This is the second line.
"""

读所有行到 list []
file= open('my file.txt','r')
content=file.readlines() # python_list 形式
print(content)

"""
['This is my first test.\n', 'This is the second line.\n', 'This the third line.\n', 'This is appended file.']
"""

# 之后如果使用 for 来迭代输出:
for item in content:
    print(item)

"""
This is my first test.

This is the second line.

This the third line.

This is appended file.
"""
```

### input

```pyhton
a_input=input('please input a number:')
print('this number is:',a_input)

''''
please input a number:12 #12 是我在硬盘中输入的数字
this number is: 12
''''
```

input 在判断中

```python
a_input=int(input('please input a number:'))#注意这里要定义一个整数型
if a_input==1:
    print('This is a good one')
elif a_input==2:
    print('See you next time')
else:
    print('Good luck')

"""
please input a number:1   #input 1
This is a good one

please input a number:2   #input 2
See you next time

please input a number:3   #input 3 or other number
Good luck
"""
```

### 错误处理 try except else finally

```python
try:
    file=open('eeee.txt','r')  #会报错的代码
except Exception as e:  # 将报错存储在 e 中
    print(e)
"""
[Errno 2] No such file or directory: 'eeee.txt'
"""

def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError:
        print("division by zero!")
    else:
        print("result is", result)
    finally:
        print("executing finally clause")
```

### id 看地址, copy, deepcopy

什么是 id？一个对象的 id 值在 CPython 解释器里就代表它在内存中的**地址**

```python
>>> import copy
>>> a=[1,2,3]
>>> b=a
>>> id(a)
"""
4382960392
"""
>>> id(b)
"""
4382960392
"""
>>> id(a)==id(b)    #附值后，两者的id相同，为true。
True
>>> b[0]=222222  #此时，改变b的第一个值，也会导致a值改变。
>>> print(a,b)
[222222, 2, 3] [222222, 2, 3] #a,b值同时改变
```

当使用浅拷贝时，python 只是拷贝了最外围的对象本身，内部的元素都只是拷贝了一个引用而已。看代码：

```python
>>> import copy
>>> a=[1,2,3]
>>> c=copy.copy(a)  #拷贝了a的外围对象本身,
>>> id(c)
4383658568
>>> print(id(a)==id(c))  #id 改变 为false
False
>>> c[1]=22222   #此时，我去改变c的第二个值时，a不会被改变。
>>> print(a,c)
[1, 2, 3] [1, 22222, 3] #a值不变,c的第二个值变了，这就是copy和‘==’的不同
```

deepcopy 对外围和内部元素都进行了拷贝对象本身，而不是对象的引用。

```python
#copy.copy()

>>> a=[1,2,[3,4]]  #第三个值为列表[3,4],即内部元素
>>> d=copy.copy(a) #浅拷贝a中的[3，4]内部元素的引用，非内部元素对象的本身
>>> id(a)==id(d)
False
>>> id(a[2])==id(d[2])
True
>>> a[2][0]=3333  #改变a中内部原属列表中的第一个值
>>> d             #这时d中的列表元素也会被改变
[1, 2, [3333, 4]]


#copy.deepcopy()

>>> e=copy.deepcopy(a) #e为深拷贝了a
>>> a[2][0]=333 #改变a中内部元素列表第一个的值
>>> e
[1, 2, [3333, 4]] #因为时深拷贝，这时e中内部元素[]列表的值不会因为a中的值改变而改变
>>>
```

## 总结

看成 2 块: 基本数据类型和序列, 函数, 面向对象, 循环和判断, 运算,

基本数据类型

1. 变量不需要声明，不需要删除，可以直接回收适用。注意声明多个函数 a,b=1,2 和声明为 tuple a=1,2 当然可以在函数中 return 一个 tuple
2. type(): 查询数据类型
3. 有 None, int, float, bool, string. function, tuple, list, dict. 类 class 是 type. 都是对象, 就算是 `a=1` 也是引用, 不过是不可变数据对象, 可以当做 c 的值处理.

序列

1. tuple 元素不可变，list 元素可变
2. 字符串是一种 tuple
3. 序列的引用 s[2], s[1:8:2]

运算

1. 判断 ==, !=, >, >=, <, <=, in
2. 数学 +, -, \*, /, \*\*, %
3. 逻辑 and, or, not
4. 类上的算特殊方法,当然有`[:]`

缩进

1. :冒号
2. 4 个空格

循环

1. range(start, stop, step), [)
2. for 元素 in 序列:
3. while 条件:
4. continue
5. break
6. 利用 enumerate()函数，可以在每次循环中同时得到下标和元素：返回的是一个包含两个元素的定值表(tuple)
7. zip, 如果你多个等长的序列，然后想要每次循环时从各个序列分别取出一个元素, 合并成一个 tuple，可以利用 zip()方便地实现, 聚合列表

函数, 函数也是对象哦

1. 定义和 return
2. 默认参数, 自调用, 关键参数(传递是根据每个参数的名字传递参数, 可以和常见的位置传参混用), 可变参数(包裹传递加* tuple, 包裹关键字传递\*\* dict. 定义的时候使用是 packeging, 函数调用的时候用*和\*\*就是 unpackaging).
3. lambda,
4. map()的功能是将函数对象依次作用于表的每一个元素. map()的返回值是一个循环对象。可以利用`list()`函数，将该**循环对象转换成表**。
5. `filter(func,[10,56,101,500])` 通过读入的函数来筛选数据, **filter 返回的不是表，而是循环对象。** reduce()函数

循环对象: 相对于序列，用循环对象的好处在于：不用在循环还没有开始的时候，就生成好要使用的元素。所使用的元素可以在循环过程中逐次生成。这样，节省了空间，提高了效率，编程更灵活

1. 有一个`__next__()`方法, 这个方法的目的是进行到下一个结果，而在结束一系列结果之后，举出`StopIteration`错误
2. 迭代器: 从技术上来说，循环对象和 for 循环调用之间还有一个中间层，就是要将循环对象转换成迭代器(iterator)。这一转换是通过使用`iter()`函数实现的。但从逻辑层面上，常常可以忽略这一层，所以循环对象和迭代器常常相互指代对方。
3. 生成器(generator)的主要目的是构成一个用户**自定义**的循环对象。 生成器表达式(Generator Expression) `G = (x for x in range(4))`
4. 表推导(list comprehension)是快速生成表的方法. `L = [x**2 for x in range(10)]`

面向对象

将东西根据属性归类 ( 将 object 归为 class )
方法是一种属性，表示动作
用继承来说明父类-子类关系。子类自动具有父类的所有属性。
self 代表了根据类定义而创建的对象。这个参数表示某个对象。对象拥有类的所有性质，那么我们可以通过 self，调用类属性。

建立对一个对象： 对象名 = 类名()
引用对象的属性： object.attribute

通过 self 调用类属性
`__init__()`: 在建立对象时自动执行
类属性和对象的性质的区别

反过头来看看

1. len() dir() help()
2. 数据结构 list(列表)是一个类。
3. 运算符是方法

字典也叫容器

1. 类似对象但 key 可以是数字或布尔, map?
2. 没有序列, 没有下标, 用 key

词典的每个元素是键值对。元素没有顺序。

```python
dic = {'tom':11, 'sam':57,'lily':100}

dic['tom'] = 99   # 加一个元素

for key in dic: ...

del, len()

>>>print dic.keys()           # 返回dic所有的键

>>>print dic.values()         # 返回dic所有的值

>>>print dic.items()          # 返回dic所有的元素（键值对）, 不是js的entries()

>>>dic.clear()                # 清空dic，dict变为{}
```

文件

```python
f = open(name, "r") # f = open(文件名，模式) 创建文件对象

文件对象的方法
读取：
content = f.read(N)          # 读取N bytes的数据, 不填表示所有都读入
content = f.readline()       # 读取一行
content = f.readlines()      # 读取所有行，储存在列表[]中，每个元素是一行。

写入：

f.write('I like apple')      # 将'I like apple'写入文件

关闭文件：

f.close()
```

模块

1. 通过`模块.对象`的方式来调用引入模块中的某个对象, (被引用的那个没有导出关键字, 就是普通的一个 py 文件)
   1. 4 种 import
2. Python 会在以下路径中搜索它想要寻找的模块：
   1. 标准库的安装路径
   2. 程序所在的文件夹
   3. 操作系统环境变量 PYTHONPATH 所包含的路径
3. 模块包
   1. `import this_dir.module` 引入 this_dir 文件夹中的 module 模块(文件)。
   2. 该文件夹中必须包含一个**init**.py 的文件，提醒 Python，该文件夹为一个模块包。`__init__.py`可以是一个空文件。

特殊方法, python 中一切都是对象, 对象就有方法

1. `dir()` 来查看
2. 运算符是通过调用对象的特殊方法实现的
3. 对于内置的对象来说(比如整数、表、字符串等)，它们所需要的特殊方法都已经在Python中准备好了。而用户自己定义的对象也可以通过增加特殊方法，来实现自定义的语法。特殊方法比较靠近Python的底层，许多Python功能的实现都要依赖于特殊方法。我们将在以后看到更多的例子。

## 参考

[mac 下安装 Python3.\*(最新版本)](https://www.cnblogs.com/meng1314-shuai/p/9031686.html)
[莫烦 python](https://morvanzhou.github.io/tutorials/python-basic/basic/)
[Python 快速教程](https://www.cnblogs.com/vamei/archive/2012/09/13/2682778.html)
