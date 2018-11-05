---
title: 牛客JS能力评测
date: 2018-05-30 21:29:19
tags:
- 数据结构
- 刷题
categories:
- 前端
comments: false
---
# 牛客JS能力评测

## 查找数组元素位置

题目描述
找出元素 item 在给定数组 arr 中的位置
输出描述:
如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1
示例1
输入
[ 1, 2, 3, 4 ], 3
输出
2


```javascript
function indexOf(arr, item) {
    return arr.indexOf(item) //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置，若未找到，则返回-1。
}

function indexOf(arr, item) {
    for(var i = 0; i < arr.length; ++i) {
        if(arr[i] == item) {
           return i;
        }
    }
    return -1;
}

结合两种,
第二种：如果浏览器不支持indexOf怎么办呢？

function indexOf(arr, item) {
  if (Array.prototype.indexOf){   //判断当前浏览器是否支持
      return arr.indexOf(item);
  } else {
      for (var i = 0; i < arr.length; i++){
          if (arr[i] === item){
              return i;
          }
      }
  }
  return -1;     //总是把return -1暴漏在最外层
}

//使用forEach的话用到return break continue是不会退出的
function indexOf(arr, item) {
        arr.forEach(function(ele,index){
            if (ele === item){
                return index;
            }
console.log(3333,ele);
        });
        return -1;
}


function indexOf(arr, item){
    var index = -1;
    arr.forEach(function(res,i){
        if(res === item && index === -1){
            index = i;
        }
    });
    return index;
};

提供另外一种解法，支持数组arr中的数据类型为对象, 数组, 等。
eg: var arr = [{age: 1}, '1', 2, true, [1,2]], 依然可以测试。
/** 获取元素位置 */
function indexOf(arr, item) {
    if (!arr || !arr.length) {
        return -1;
    }
  
    for (var i = 0, len = arr.length; i < len; i++) {
        // 支持 arr[i] 为对象，数组等
        if (JSON.stringify(arr[i]) === JSON.stringify(item)) {
            return i
        }
    }
    return -1;
}
```

## 数组求和

题目描述
计算给定数组 arr 中所有元素的总和
输入描述:
数组中的元素均为 Number 类型
示例1
输入
[ 1, 2, 3, 4 ]
输出
10

```javascript
//5种
//常规循环：
function sum(arr) {
    var s = 0;
    for (var i=0; i<arr.length; i--) {
        s += arr[i];
    }
//     for (var i=arr.length-1; i>=0; i--) {
//         s += arr[i];
//     }
    return s;
}

//函数式编程 map-reduce：
function sum(arr) {
    return arr.reduce(function(prev, curr, idx, arr){  //reduce也有个0咯 同forEach
        return prev + curr;
    });
}

//forEach遍历：  也可以map,用法同forEach 就是返回一个新数组
function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) { //array.forEach(function(currentValue, index, arr), thisValue)
        s += val;
        //s+=arr[idx]
    }, 0);
    return s;
};

//不考虑算法复杂度，用递归做：
function sum(arr) {
    var len = arr.length;
    if(len == 0){
        return 0;
    } else if (len == 1){
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1));
        //return arr[0] + arguments.callee(arr.slice(1));
    }
}

//eval：
function sum(arr) {
    return eval(arr.join("+"));
//eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
//语法：eval(string)
//参数string：必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。

//join() 方法用于把数组中的所有元素放入一个字符串。
//语法：arrayObject.join(separator)
//参数separator：可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。

//看得懂上面的中文的前提下你的例子就可以这么解释：
//join方法在arr数组的每一个元素之间插入一个 + 号，变成 "1+2+3+4+5+6"，然后eval()函数执行"1+2+3+4+5+6"，最后将结果复制给value。
};
```

## 移除数组中的元素

移除数组 arr 中的所有值与 item 相等的元素。**不要直接修改数组 arr，结果返回新的数组**
示例1
输入
[1, 2, 3, 4, 2], 2
输出
[1, 3, 4]

```javascript
//用filter
function remove(arr, item) {
    // return arr.filter(function(value, idx, arr) {
    //     if(arr[idx]!=item){
    //         return value
    //     }
    // })
    return arr.filter(function(value, idx, arr) {
        if(value!=item){
            return value
        }
    })

    // return arr.filter(function(value, idx, arr) {
    //     return value!=item
    // })
}

// 用push
function remove(arr, item) {
    var newArr = []
    for(var i = 0; i< arr.length; ++i) {
        if(arr[i] != item) {
            newArr.push(arr[i])
        }
    }
    return newArr;
}


function remove(arr,item){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == item){
            continue
        };
       newArr.push(arr[i]);
    }
    return newArr;
}

// 用splice
function remove(arr, item) {
    var newArr = arr.slice(0);  //复制一份原数组
    for (var i = 0; i < newArr.length; ++i) {
        if(newArr[i] == item){
            newArr.splice(i,1)
            i--;    //这很重要,记得要去掉一个长度哦,返回一步i
        }
    }
    return newArr;
}

// 倒着检测到是不用考虑位置i--
function remove(arr, item) {
    var newArr = arr.slice(0);
    for (var i = newArr.length-1; i >= 0; --i) {
        if(newArr[i] == item){
            newArr.splice(i,1)
        }
    }
    return newArr;
}
```

## 移除数组中的元素

移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
示例1
输入
[1, 2, 2, 3, 4, 2, 2], 2
输出
[1, 3, 4]

```javascript
//用splice
function removeWithoutCopy(arr, item) {
    for(var i = 0; i < arr.length; ++i){
        if(arr[i] == item) {
            arr.splice(i, 1)
            i--;    //缺了这个就变成forEach的了,forEach也不是for in
        }
    }
    return arr;
}
// 倒着检测；不用考虑；位置影响
function removeWithoutCopy(arr, item) {
    for(i=arr.length-1;i>=0;i--){
       if(arr[i]==item){
            arr.splice(i,1);
       }
    }
    return arr;
}

// 用for in就不用考虑i--了
function removeWithoutCopy(arr, item) {
    for(var i in arr){
        while(arr[i]==item){
            arr.splice(i,1);
        }
    }
    return arr;
}

//使用forEach有点不对,forEach遍历每一项, 只不过不能控制i--
function removeWithoutCopy(arr, item) {
    return arr.forEach(function(value, index, arr) {
        if(value == item) {
            return  continue; //没return continue break这种
        }
    })
}

// 一个while循环就出来了，判断是否存在，存在了就删掉，不存在return
function removeWithoutCopy(arr, item) {
    while(arr.indexOf(item) != -1){         //一直到找不到item 就不删了
        arr.splice(arr.indexOf(item),1);
    }
    return arr;
}
//当然也可以这么循环下去写
function removeWithoutCopy(arr, item) {
    for(var i=0;i<arr.length;i++){
      var a=arr.indexOf(item);
      arr.splice(a,1);
    }
    return arr;
}
//用es6的set去重,然后删一次好了
function removeWithoutCopy(arr, item) {
    arr=Array.from(new Set(arr));
    var a=arr.indexOf(item);
    arr.splice(a,1);
    return arr;
}

//这个就厉害了,将每次判断第一个是不是和item同,不是就插入末尾,然后删除第一个,是的话直接删除.
function removeWithoutCopy(arr, item) {
    var n = arr.length;
    for (var i = 0; i<n;i++) {
        if(arr[0] !== item){
            arr.push(arr[0]);
        }
        arr.splice(0,1);
    }
    return arr;
}
```

## 添加元素

在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
示例1
输入
[1, 2, 3, 4],  10
输出
[1, 2, 3, 4, 10]

```javascript
/**
 * 使用concat将传入的数组或非数组值与原数组合并,组成一个新的数组并返回
 * @param arr
 * @param item
 * @returns {Array.<T>|string}
 */
function(arr, item) {
    return arr.concat(item);
};

/**
 * 普通的迭代拷贝
 * @param arr
 * @param item
 * @returns {Array}
 */
function append(arr, item) {
    var newArr = [];
    for(var i = 0; i< arr.length; ++i) {
        newArr.push(arr[i])
    }
    newArr.push(item);
    return newArr;
}

/**
 * 使用slice浅拷贝+push组合
 * @param arr
 * @param item
 * @returns {Blob|ArrayBuffer|Array.<T>|string}
 */
var append2 = function(arr, item) {
    var newArr = arr.slice(0);  // slice(start, end)浅拷贝数组
    newArr.push(item);
    return newArr;
}

/**
 * 使用join+split+push组合
 * @param arr
 * @param item
 * @returns {Array}
 */
function append(arr, item) {
    var newArr=arr.join().split(',');  //就是转了一圈
    newArr.push(item);
    return newArr;
}

https://blog.csdn.net/u013005050/article/details/78565636
/**
 * 使用unshift.apply
 * @param arr
 * @param item
 * @returns {Array}
 */
 
function append(arr, item) {
    var newArr=[item];
    [].unshift.apply(newArr, arr);
    return newArr;
}

//用JSON的parse和stringify
function append(arr, item) {
    var result = JSON.parse(JSON.stringify(arr))
    result.push(item);
    return result;
}

// 将数组转化成字符串，然后再使用+号连接item
// 最后分割字符串形成新数组
function append(arr, item) {
var str = arr.join() + "," + item;
    return str.split(",");
}
```

## 删除数组最后一个元素

删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回**新的数组**
示例1
输入
[1, 2, 3, 4]
输出
[1, 2, 3]

```javascript
//使用slice
function truncate(arr) {
    return arr.slice(0, arr.length-1)
    //return arr.slice(0, -1)   //-1会自动加上length
}

//普通的迭代拷贝for+push
function truncate(arr, item) {
    var newArr=[];
    for(var i=0;i<=arr.length-2;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

//复制一个新数组(slice或for或concat或join+split或push.apply或JSON.parse(JSON.stringify(arr))),然后pop
function truncate(arr) {
    var newArr = arr.slice(0)
    newArr.pop()
    return newArr;
}

//利用concat+pop
function truncate(arr) {
    var newArr = arr.concat();
    newArr.pop();
    return newArr;
}

//利用join+split+pop    注意！！！：数据类型会变成字符型
function truncate(arr) {
    var newArr = arr.join().split(',');
    newArr.pop();
    return newArr;
}

//利用push.apply+pop
function truncate(arr) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.pop();
    return newArr;
}
function truncate(arr) {
    var newArr = JSON.parse(JSON.stringify(arr))
    newArr.pop();
    return newArr;
}


//复制一个,然后用splice
function truncate(arr) {
    var newArr = arr.slice(0)
    newArr.splice(newArr.length-1, 1)
    return newArr;
}
//用length改大小
function truncate(arr, item){
     var newArr = arr.slice(0);
     newArr.length --;
     return newArr;
}

总结 复制一个新数组(slice或for或concat或join+split或push.apply或JSON.parse(JSON.stringify(arr)))
出来用pop或splice或length改
```

## 添加元素

在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
示例1
输入
[1, 2, 3, 4], 10
输出
[10, 1, 2, 3, 4]

```javascript
//复制一个新数组(slice或for或concat或join+split或push.apply或JSON.parse(JSON.stringify(arr)),filter和map都可以复制数组)
//用unshift进,splice
function prepend(arr, item) {
    var newArr = arr.slice(0);
    newArr.unshift(item);
    return newArr;
}

function prepend(arr, item) {
    var newArr = arr.slice(0);
    newArr.splice(0, 0, item);
    return newArr;
}

//看顺序
function prepend(arr, item) {
    return [item].concat(arr);
    //return [].concat(item, arr)
}

//使用push.apply
function prepend(arr, item) {
    var newArr=[item];
    [].push.apply(newArr, arr);
    return newArr;
}

```

## 删除数组第一个元素

删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组
示例1
输入
[1, 2, 3, 4]
输出
[2, 3, 4]

```javascript
//直接从1开始复制 slice
function curtail(arr) {
    var newArr = arr.slice(1)
    return newArr;
}

//普通的迭代拷贝
function curtail(arr) {
    var newArr=[];
    for(var i=1;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

//复制后用shift()出
function curtail(arr) {
    var newArr = arr.slice(0)
    newArr.shift();
    return newArr;
}

//filter也可以复制新数组
function curtail(arr) {
    var newArr = arr.filter(function(value,index, arr) {
        // return arr
        return value;
    });
    newArr.shift();
    return newArr;
}
//map也可以
function curtail(arr) {
    var newArr = arr.map(function(value,index, arr) {
        return value;
    });
    newArr.shift();
    return newArr;
}

//利用filter
function curtail(arr) {
    return arr.filter(function(value,index) {
        return index!==0;
    });
}


```

## 数组合并

合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
示例1
输入
[1, 2, 3, 4], ['a', 'b', 'c', 1]
输出
[1, 2, 3, 4, 'a', 'b', 'c', 1]

```javascript
//直接concat,   主要就是理解了apply的用法  es6的...
// [].concat.apply([],[[1,2,3],[4,5,6],[7,8,9]])，然后你得到的是[1 2 3 4 5 6 7 8 9]
function concat(arr1, arr2) {
    return arr1.concat(arr2)
}

//都用for循环
function concat(arr1, arr2) {
    var newArr = []
    for (var i = 0; i< arr1.length; ++i) {
        newArr.push(arr1[i])
    }
    for (var j = 0; j< arr2.length; ++j) {
        newArr.push(arr2[j])
    }
    return newArr;
}

//利用slice+push.apply
function concat(arr1, arr2) {
    var newArr=arr1.slice(0);
    [].push.apply(newArr, arr2);
    return newArr;
}
//利用slice+push
function concat(arr1, arr2) {
    var newArr=arr1.slice(0);
    for(var i=0;i<arr2.length;i++){
        newArr.push(arr2[i]);
    }
    return newArr;
}

//用字符串转,也就是join也可以啊
function concat(arr1, arr2) {
    var str=arr1.toString()+","+arr2.toString();
    return str.split(",");
}

//es6的...
function concat(arr1, arr2) {
    return [...arr1, ...arr2];
}
```

## 添加元素

在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
示例1
输入
[1, 2, 3, 4], 'z', 2
输出
[1, 2, 'z', 3, 4]

```javascript
//新数组 复制的话有for slice concat join+split push.apply JSON filter map
//插入用splice,
//或者用slice+concat+slice连上来
function insert(arr, item, index) {
    var newArr = arr.slice(0)
    newArr.splice(index, 0, item)
    return newArr;
}
    //return arr.slice(0).splice(index,0,item);不行 因为splice的方法当插入使用时，不返回值，只有当删除功能使用时，才有返回值，并且返回值为其删除的数值


//利用slice+concat,这是分段连接
function insert(arr, item, index) {
    return arr.slice(0,index).concat(item,arr.slice(index));
}

//有丶意思 到了index处就push两个
function insert(arr, item, index) {
    var m = [];
    for (var i = 0; i < arr.length; i++) {
        if(i === index){
            var n = [item,arr[i]];
            [].push.apply(m,n);
            continue;
        }
        m.push(arr[i]);
    }
    return m;
}
```

## 计数

统计数组 arr 中值等于 item 的元素出现的次数
示例1
输入
[1, 2, 4, 4, 3, 4, 3], 4
输出
3

```javascript
//用filter,map也对啊,forEach,要么for
function count(arr, item) {
    var num = 0;
    arr.filter(function(value, index, arr) {
        if(value ==  item) {
            num ++;
        }
    })
    return num;
}

function count(arr, item) {
    var num = 0;
    for( var i = 0; i < arr.length; ++i) {
        if (arr[i] == item) {
            num++;
        }
    }
    return num;
}

//有丶意思 用长度
function count(arr, item) {
    return arr.filter(function(i){
        return (i === item);
    }).length;
}
//也是长度,存在就一直push进去
function count(arr, item) {
    var count = [];
    var pos = arr.indexOf(item);
    while(pos > -1){
        count.push(pos);
        pos= arr.indexOf(item, pos+1);
    }
    return count.length
}

//reduce()-->从数组的第一项开始，逐个遍历到最后；
function count(arr, item) {
    var count = arr.reduce(function(prev, curr, index, arr) {
        return curr === item ? prev+1 : prev;
    }, 0);
    return count;
}

//正则
function count(arr, item) {
return arr.toString().match(new RegExp(item,"g")).length;
}
```

## 查找重复元素

找出数组 arr 中重复出现过的元素
示例1
输入
[1, 2, 4, 4, 3, 3, 1, 5, 3]
输出
[1, 3, 4]

```javascript
// Set数据结构，它类似于数组，其成员的值都是唯一的。
// 利用Array.from将Set结构转换成数组
function dedupe(array){
    return Array.from(new Set(array));
}

//直接用...
let arr = [1,2,3,3];
let resultarr = [...new Set(arr)];
console.log(resultarr); //[1,2,3]

//先用原数组的indexOf+lastIndexOf来判断读取重复的(这里还没用到去重,而是用到读重复),
//在对新数组用indexOf == -1来去重,只不过顺序不一样了
function duplicates(arr) {
    var newArr = [];
    arr.map(function(value, index, arr) {
        if(arr.indexOf(value) != arr.lastIndexOf(value) && newArr.indexOf(value) == -1) {
            newArr.push(value)
        }
    })
    return newArr;
}

//重点在数组去重了
//数组下标判断法, 遍历数组，利用indexOf判断元素的值是否与当前索引相等，如相等则加入
function unique(arr) {
    result = []
    arr.forEach(function (value, index, arr) {
        if(arr.indexOf(value) == index) {       //第2中用indexOf了,
            result.push(value)
        }
    })
    return result;
}


//典型的循环判断
function unique(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (arr[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        //每次按顺序判断原数组的第1个,第2个与新数组数组中的所有元素有没有相同的,没有相同就把原数组的当前加入新数组.
        if (!repeat) {
            res.push(arr[i]);
        }
    }
    return res;
}

// 双层循环，外层循环元素，内层循环时比较值
// 如果有相同的值则跳过，不相同则push进数组
function distinct(arr) {
    var result = []
    for( var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}

// 双层循环，外层循环元素，内层循环时比较值
// 值相同时，则删去这个值
// 注意点:删除元素之后，需要将数组的长度也减1.
function distinct(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                arr.length--;
                j--;
            }
        }
    }
    return arr;
};



//还有就是利用sort,再次判断原数组中的第i个元素与新数组中的最后一个元素,因为已经排好序了,所以,重复的都是在相邻,容易比出来
//就是一头一尾进行去重
function unique(arr) {
    arr.sort(); //先排序,不需要从大到小 只需要相同的在一起
    // arr.sort(function(a,b){  //对数组进行排序才能方便比较
    // return a - b;
    // })
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== result[result.length - 1]) {
            result.push(arr[i]);
        }
    }
    return result;
}

//去重,用hash对象,
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; i < arr.length; i++) {
        elem = arr[i];  // hash[arr[i]] != null
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    // for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    //     if (!hash[elem]) {  //判断hasn对象中有没有这个elem属性,没有就加入result
    //         result.push(elem);
    //         hash[elem] = true;
    //     }
    // }
    return result;
}



//还有利用下标的 因为number,只不过最后都变成string了,因为对象的属性名就是string
function unique(arr) {
    var result = [], hash = [];
    for(var i = 0; i < arr.length; ++i) {
        hash[arr[i]] = null
    }
    //用for in得 key
    for(var key in hash) {
        result.push(key)
    }
    return result;
}


```

## 求二次方

为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
示例1
输入
[1, 2, 3, 4]
输出
[1, 4, 9, 16]

```javascript
//直接使用map
function square(arr) {
    return arr.map(function(value, index, arr) {
        return value = value*value
        //return Math.pow(value,2)
    })
}

//复制一个shuzu
//在for
function square(arr) {
    var newArr = arr.slice(0)
    for(var i in newArr) {
        newArr[i] = newArr[i]*newArr[i]
    }
    return newArr
}
```

## 查找元素位置

在数组 arr 中，查找值与 item 相等的元素出现的所有位置
示例1
输入
'abcdefabc'
输出
[0, 6]

```javascript
//这题没给出target 所以自己假设有这么个target而且要返回是一个数组 新的.
//filter和map都可以
function findAllOccurrences(arr, target) {
    var newArr = []
    arr.filter(function(value, index, arr) {
        if(value == target) {
            return newArr.push(index)
        }
    })
    return newArr
}

//for 遍历
function findAllOccurrences(arr, target) {
    var newArr = []
    for(var i in arr) {
        if(arr[i] == target) {
            newArr.push(i)
        }
    }
    return newArr
}

//lastIndexOf+slice/splice
function findAllOccurrences(arr, target) {
    var result=[],index=arr.lastIndexOf(target);
    while(index>-1){
        result.push(index);
        arr.splice(index,1);//arr=arr.slice(0,index);
        index=arr.lastIndexOf(target);
    }
    return result;
}
//indexOf
function findAllOccurrences(arr, target) {
    var result=[],index=arr.indexOf(target);
    while(index>-1){        //!=-1
        result.push(index);
        index=arr.indexOf(target,index+1);
    }
    return result;
}
```

## 避免全局变量

给定的 js 代码中存在全局变量，请修复

```javascript
function globals() {
    myObject = {
      name : 'Jory'
    };

    return myObject;
}

改为
function globals() {
    var myObject = {
      name : 'Jory'
    };

    return myObject;
}
```

## 正确的函数定义

请修复给定的 js 代码中，函数定义存在的问题
示例1
输入
true
输出
a

```javascript
function functions(flag) {
    if (flag) {
      function getValue() { return 'a'; }
    } else {
      function getValue() { return 'b'; }
    }

    return getValue();
}

改为
function functions(flag) {
    var getValue
    if (flag) {
      getValue = function () { return 'a'; }
    } else {
      getValue = function () { return 'b'; }
    }

    return getValue();
}
```

## 正确的使用 parseInt

修改 js 代码中 parseInt 的调用方式，使之通过全部测试用例
示例1
输入
'12'
输出
12
示例2
输入
'12px'
输出
12
示例3
输入
'0x12'
输出
0

```javascript
function parse2Int(num) {
    return parseInt(num);
}

改为
function parse2Int(num) {
    return parseInt(num, 10);
}
```

## 完全等同

判断 val1 和 val2 是否完全等同

```javascript
function identity(val1, val2) {
    return val1===val2;
}
```

## 计时器

实现一个打点计时器，要求
1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
3、第一个数需要立即输出

```javascript
//用setInterval clearInterval
function count(start, end) {
    //立即输出第一个值
    console.log(start++);
    var timer = setInterval(function () {
        if (start <= end) {
            console.log(start++);
        } else {
            clearInterval(timer);
        }
    }, 100);
    //返回一个对象
    return {
        cancel: function () {
            clearInterval(timer);
        }
    };
}


//用setTimeout clearTimeout
function count(start, end) {
    if (start <= end) {
        console.log(start);
        start++;
        st = setTimeout(function () {
            count(start, end)
        }, 100);
    }
    return {
        cancel: function () {
            clearTimeout(st);
        }
    }
}
```

## 流程控制

实现 fizzBuzz 函数，参数 num 与返回值的关系如下：
1、如果 num 能同时被 3 和 5 整除，返回字符串 fizzbuzz
2、如果 num 能被 3 整除，返回字符串 fizz
3、如果 num 能被 5 整除，返回字符串 buzz
4、如果参数为空或者不是 Number 类型，返回 false
5、其余情况，返回参数 num

示例1
输入
15
输出
fizzbuzz

```javascript
function fizzBuzz(num) {
    if(num % 3 ==0 && num % 5 == 0 ){
        return 'fizzbuzz'
    }else if(num % 3 == 0) {
        return 'fizz'
    }else if(num % 5 == 0) {
        return 'buzz'
    }else if(typeof num == undefined || typeof num != 'number') {
        return false
    }
    return num
}

function fizzBuzz(num) {
    if(num % 3 ==0 && num % 5 == 0 ){
        return 'fizzbuzz'
    }
    if(num % 3 == 0) {
        return 'fizz'
    }
    if(num % 5 == 0) {
        return 'buzz'
    }
    if(num == null || typeof num != 'number') {
        return false
    }
    return num
}


function fizzBuzz(num) {
    switch(true){
        case num == null || typeof(num) != "number" :return false;break;
        case num%3==0&&num%5==0 :return "fizzbuzz";break;
        case num%3==0 :return "fizz";break;
        case num%5==0 :return "buzz";break;      
        default:return num;           
    } 
}

// 高程明确定义 Number类型下两种表示: var num = 120 or var num1 = new Number(120)
// 高票第一回答下需要考虑一个问题new Number(120)也是Number类型。
// 前者typeof num === 'number', 后者typeof num1 = 'object';
// 最精确的判断方法向来是Object.prototype.toString.call(args) === '[object ' + type + ]';
// 这里type可取[ 'Array', 'Number', 'Object', 'String', 'Undefined', 'null' ]
function fizzBuzz(num) {
    if (num === undefined || Object.prototype.toString.call(num) !== '[object Number]') {
        return false;
    }
    if (num % 3 === 0 && num % 5 === 0) {
        return 'fizzbuzz';
    } else if (num % 3 === 0) {
        return 'fizz';
    } else if (num % 5 === 0) {
        return 'buzz';
    }
    return num;
}
```

## 函数传参

将数组 arr 中的元素作为调用函数 fn 的参数
示例1
输入
function (greeting, name, punctuation) {return greeting + ', ' + name + (punctuation || '!');}, ['Hello', 'Ellie', '!']
输出
Hello, Ellie!

```javascript
//调用函数可以使用call或者apply这两个方法，区别在于call需要将传递给函数的参数明确写出来，是多少参数就需要写多少参数。而apply则将传递给函数的参数放入一个数组中，传入参数数组即可。
// 调用函数有3种方式：
// obj.func();
// func.call(obj,args);//参数列出
// func.apply(obj,[m,n......]);//参数数组
function argsAsArray(fn, arr) {
    return fn.apply(this, arr)
}


// 笨办法
function argsAsArray(fn, arr) {
  return fn(arr[0],arr[1],arr[2]);
}

// 用apply
function argsAsArray(fn, arr) {
  return fn.apply(fn, arr);
}

//或者
function argsAsArray(fn, arr) {
  return fn.apply(this, arr);
}
//或者不要随便绑定this
function argsAsArray(fn, arr) {
    return fn.apply(null, arr);
}

// 用call
function argsAsArray(fn, arr) {
  return fn.call(fn, arr[0],arr[1],arr[2]);
}
//或者
function argsAsArray(fn, arr) {
  return fn.call(this, arr[0],arr[1],arr[2]);
}

//es6
function argsAsArray(fn, arr) {
    return fn(...arr)
}
```

## 函数的上下文

将函数 fn 的执行上下文改为 obj 对象
示例1
输入
function () {return this.greeting + ', ' + this.name + '!!!';}, {greeting: 'Hello', name: 'Rebecca'}
输出
Hello, Rebecca!!!

```javascript
//https://www.cnblogs.com/libin-1/p/6069031.html
//用apply或call
//还有bind
//bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用
function speak(fn, obj) {
    return fn.call(obj)
}

function speak(fn, obj) {
    return fn.bind(obj)();
}
```

## 返回函数

实现函数 functionFunction，调用之后满足如下条件：
1、返回值为一个函数 f
2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
3、所有函数的参数数量为 1，且均为 String 类型
示例1
输入
functionFunction('Hello')('world')
输出
Hello, world

```javascript
//先传入str,然后返回函数执行,再传入s
function functionFunction(str) {
    return f = function(s){
        return str+', '+s
    }
}

function functionFunction(str) {
    return function(newStr) {
        return [str, newStr].join(', ');
    };
}

function functionFunction(str) {
    var args = Array.prototype.slice.call(arguments);
    return function() {
        return args.concat(Array.prototype.slice.call(arguments)).join(', ')
    }
}
```

## 使用闭包

实现函数 makeClosures，调用之后满足如下条件：
1、返回一个函数数组 result，长度与 arr 相同
2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同
示例1
输入
[1, 2, 3], function (x) {
	return x * x;
}
输出
4

```javascript
简单的描述闭包：如果在函数func内部声明函数inner，然后在函数外部调用inner，这个过程即产生了一个闭包。
题目要求的是返回一个函数数组，如果在循环中直接写result[i] = function(){return fn(arr[i]);}或者result.push(function(){return fn(arr[i]);})，最终的结果是不正确的，因为在每次迭代的时候，那样的语句后面的方法并没有执行，只是创建了一个函数体为“return fn(arr[i]);”的函数对象而已，当迭代停止时，i为最终迭代停止的值，在函数被调用时，i依旧为最终迭代停止的值，因此无法返回正确的结果。
为了解决这个问题，需要声明一个匿名函数，并立即执行它。
function(num){return function(){return fn(arr[num]); }; }(i)，函数执行后，i立即传入并被内部函数访问到，因此就能得到正确的结果。闭包允许你引用存在于外部函数中的变量。

function makeClosures(arr, fn) {
    var result = [];
    arr.forEach(function(value, index, arr){
        result.push(function(num){
            return function(){
                return fn(num);
            };
            }(value));  //只要给fn传递的是arr中的项就行了。我上面用的forEach，迭代的参数就是arr中的每一项,value就是每一项
    });
    return result;
}

function makeClosures(arr, fn) {
    var result = [];
    arr.forEach(function(value, index, arr){
        result.push(function(i){
            return function(){
                return fn(arr[i]) //只要包上一个函数,传入相应参数就好
            }
        }(index));
    });
    return result;
}

//直接用es6的let就不用闭包了
function makeClosures(arr, fn) {   
    var result = new Array();
    for(let i=0;i<arr.length;i++){
        result[i] = function(){
            return fn(arr[i]); //let声明的变量只在let所在代码块内有效，因此每次循环的i都是一个新的变量
        };
    }
    return result;
}

//var 这种是错误的写法会导致result中每个函数的参数都是arr[arr.length]
function makeClosures(arr, fn) {
    var result = new Array();
     for(var i=0;i<arr.length;i++){
        result[i] = function(){
            return fn(arr[i]);
        };
    }
    return result;
}

//参考《JavaScript高级程序设计》的典型方法
function makeClosures(arr, fn) {
    var result = new Array();
    for(var i=0;i<arr.length;i++){
        result[i] = function(num){
            return function(){
                return fn(num);
            }
        }(arr[i]);
    }
    return result;
}

// 此外ES5提供了bind方法，apply(),call(),bind()方法在使用时如果已经对参数进行了定义
//使用ES5的bind()方法
function makeClosures(arr, fn) {
    var result = new Array();
    for(var i=0;i<arr.length;i++){
        result[i] = fn.bind(null,arr[i]);
    }
    return result;
}


// 还是喜欢直接匿名函数
function makeClosures(arr, fn) {
    var result = [];
    for(var i=0; i<arr.length; ++i){
        (function(v){
            result[v] = function(){
                return fn.call(null,arr[v]);
            }
        })(i);
    }
    return result;
}

```

## 二次封装函数

已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
1、返回一个函数 result，该函数接受一个参数
2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致
示例1
输入
var sayIt = function(greeting, name, punctuation) {     return greeting + ', ' + name + (punctuation || '!'); };  partial(sayIt, 'Hello', 'Ellie')('!!!');
输出
Hello, Ellie!!!

```javascript
// call和apply必须显式地调用str3，立即执行
// bind不是立即执行，未传入str3时，并未执行，只是返回一个函数，等待参数传入
// this用于上下文不确定的情况

因为这题传入的函数没有用到传入的this，所以不管传的是什么，都没有影响。this可以改成任何东西
// call
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.call(this, str1, str2, str3);
    }
 
     return result;
}
 
// apply（这里只是为了对照）
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.apply(this, [str1, str2, str3]);
    }
 
    return result;
}
 
// 这个bind会生成一个新函数（对象）, 它的str1, str2参数都定死了, str3未传入, 一旦传入就会执行
function partial(fn, str1, str2) {
    return fn.bind(this, str1, str2); // 或 return fn.bind(null, str1, str2);
}
 
// bind同上, 多了一步, 把str3传入的过程写在另一个函数里面,
// 而另一个函数也有str1, str2参数
// 此法有种多次一举的感觉，但是表示出了后续的调用。
function partial(fn, str1, str2) {
    function result(str3) {
        return fn.bind(this, str1, str2)(str3);
    }
 
    return result;
}
 
// 匿名函数，默认this绑定global，与bind的第一个参数为this时效果一样。
function partial(fn, str1, str2) {
    return function(str3) {
        return fn(str1, str2, str3);
    }
}
 
// ES6。this指向undefined.
const partial = (fn, str1, str2) => str3 => fn(str1, str2, str3);
```

## 使用 arguments

函数 useArguments 可以接收 1 个及以上的参数。请实现函数 useArguments，返回所有调用参数相加后的结果。本题的测试参数全部为 Number 类型，不需考虑参数转换。
示例1
输入
1, 2, 3, 4
输出
10

```javascript
// 这里重点就是类数组对象：arguments -- 接收所有传入函数的参数值的类数组对象，它有两个特点跟数组很像，1.可以用下标访问每个元素2.具有length属性。
// 这里最好先通过Array.prototype.slice.call(我们的类数组对象) 将其转换成一个真正的数组对象，然后再遍历求和即可。
function useArguments() {
    var sum = 0
    for(var i = 0; i < arguments.length; ++i) {
        sum += arguments[i]
    }
    return sum
}

//这里从类数组转成真的数组,可以用使用数组的迭代方法,不然只要length属性和[]下标可以用
function useArguments() {
    return Array.prototype.slice.call(arguments).reduce(function(x, y) {
      return x + y;
    });
}

//这里也是一样,只不过求和方式不同,3种求和方式
function useArguments() {
    var arr=Array.prototype.slice.call(arguments)//把arguments类数组转化为数组
    return eval(arr.join("+"));//求和
}
```

## 使用 apply 调用函数

实现函数 callIt，调用之后满足如下条件
1、返回的结果为调用 fn 之后的结果
2、fn 的调用参数为 callIt 的第一个参数之后的全部参数
示例1
输入
无
输出
无

```javascript
要注意arguments本身不存在slice方法，需要借用Array.prototype.slice进行类数组到数组的转换
function callIt(fn) {
    //将arguments转化为数组后，截取第一个元素之后的所有元素
    var args = Array.prototype.slice.call(arguments,1);
    //调用fn
    var result = fn.apply(null,args);
    return result;
}

// slice (不改变数组)
function callIt(fn) {
    return fn.apply(this, [].slice.call(arguments, 1));
}
 
// shift (会改变数组)
function callIt(fn) {
    return [].shift.call(arguments).apply(null, arguments);
}

//反正就是复制一份arguments
function callIt(fn) {
    var args=[];
    for(var i=1;i<arguments.length;i++){
        args.push(arguments[i]);
    }
    var result=fn.apply(null,args);
    return result;
}
```

## 二次封装函数


实现函数 partialUsingArguments，调用之后满足如下条件：
1、返回一个函数 result
2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数

```javascript
function partialUsingArguments(fn) {
     //先获取p函数第一个参数之后的全部参数
     var args = Array.prototype.slice.call(arguments,1);
     //声明result函数
     var result = function(){
         //使用concat合并两个或多个数组中的元素
         return fn.apply(null, args.concat([].slice.call(arguments)));
     }
     return result;
 }


function partialUsingArguments(fn){
    //得到partialUsingArguments方法第一个参数后面的参数组成的数组
    var args=Array.prototype.slice.call(arguments,1); 
    var result=function(){
        //将上面的args和result的参数组合成一个数组argss
        var argss=args.concat(Array.prototype.slice.call(arguments));
        //fn调用这个参数数组
        return fn.apply(null,argss);
    }
    return result;
}
```

## 柯里化

已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
4、调用 c 之后，返回的结果与调用 fn 的返回值一致
5、fn 的参数依次为函数 a, b, c 的调用参数
示例1
输入
var fn = function (a, b, c) {return a + b + c}; curryIt(fn)(1)(2)(3);
输出
6

```javascript

柯里化是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。简单理解题目意思，就是指，我们将预定义的函数的参数逐一传入到curryIt中，当参数全部传入之后，就执行预定义函数。于是，我们首先要获得预定义函数的参数个数fn.length，然后声明一个空数组去存放这些参数。返回一个匿名函数接收参数并执行，当参数个数小于fn.length，则再次返回该匿名函数，继续接收参数并执行，直至参数个数等于fn.length。最后，调用apply执行预定义函数。

function curryIt(fn) {
     //获取fn参数的数量,总的实参参数个数
     var n = fn.length;
     //声明一个数组args
     var args = [];
     //返回一个匿名函数
     return function(arg){
         //将curryIt后面括号中的参数放入数组,这类事返回的,少了一个参数的总参数
         args.push(arg);
         //如果args中的参数个数小于fn函数的参数个数，
         //则执行arguments.callee（其作用是引用当前正在执行的函数，这里是返回的当前匿名函数）。
         //否则，返回fn的调用结果
         if(args.length < n){
            return arguments.callee;
         }else {
            return fn.apply("",args);
        }
     }
 }


function curryIt(fn) {
    var length = fn.length,
        args = [];
    var result =  function (arg){
        args.push(arg);
        length --;
        if(length <= 0 ){
            return fn.apply(this, args);
        } else {
            return result;
        }
    }
     
    return result;
}

var currying = function (fn) {
    var _args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }
        Array.prototype.push.apply(_args, [].slice.call(arguments));
        return arguments.callee;
    }
};

```

## 或运算

返回参数 a 和 b 的逻辑或运算结果
示例1
输入
false, true
输出
true

```javascript
function or(a, b) {
  return a||b;
 }
```

## 且运算

返回参数 a 和 b 的逻辑且运算结果
示例1
输入
false, true
输出
false

```javascript
function and(a, b) {
    return a && b
}
```

## 模块

完成函数 createModule，调用之后满足如下要求：
1、返回一个对象
2、对象的 greeting 属性值等于 str1， name 属性值等于 str2
3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + ', ' + name属性值

```javascript
// 字面量模式：
function createModule(str1, str2) {
     var obj = {
         greeting : str1,
         name     : str2,
         sayIt    : function(){
             return this.greeting+", "+this.name
         }
     }
     return obj
 }


// 原型模式：
function createModule(str1, str2) {
    function Obj()
    {
        this.greeting = str1;
        this.name = str2;
    }
    Obj.prototype.sayIt = function(){
        return this.greeting + ", " + this.name;
    }
    return new Obj();
}

// 构造函数模式：
function createModule(str1, str2) {
    function Obj()
    {
        this.greeting = str1;
        this.name = str2;
        this.sayIt = function(){
            return this.greeting + ", " + this.name;
        }
    }
    return new Obj();
}

// 创建对象模式：
function createModule(str1, str2) {
    function CreateObj()
    {
        obj = new Object;
        obj.greeting = str1;
        obj.name = str2;
        obj.sayIt = function(){
            return this.greeting + ", " + this.name;
        }
        return obj;
    }
    return CreateObj();
}

```

## 二进制转换

获取数字 num 二进制形式第 bit 位的值。注意：
1、bit 从 1 开始
2、返回 0 或 1
3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1
示例1
输入
128, 8
输出
1

```javascript
//才不是parseInt(num, 2) 这个是把num按基数为2当做, 表示为10进制是多少,而不是转成2进制
function valueAtBit(num, bit) {
    return (num >> (bit -1)) & 1;
}

function valueAtBit(num, bit) {
  var s = num.toString(2);
     return s[s.length - bit];
}


function valueAtBit(num, bit) {
    //toString转化为二进制，split将二进制转化为数组，reverse()将数组颠倒顺序
    var arr = num.toString(2).split("").reverse();
    return arr[bit-1];
}

// 方法多多 就是不知道每个方法的优点与缺点
// 我的是按位与运算 看结果是不是0
function valueAtBit(num, bit) {
    return (num&Math.pow(2,bit-1))==0?0:1;
}
```

## 二进制转换

给定二进制字符串，将其换算成对应的十进制数字
示例1
输入
'11000000'
输出
192

```javascript

function base10(str) {
    /**
        其它进制转十进制
        parseInt(str,2)
        parseInt(str,8)
        parseInt(str,16)
    */
    return parseInt(str,2);
}


function base10(str) {

    var res=str.split('');
    var sum=0;
    for(var i=0;i<res.length;i++)
    {
        sum+=res[i]*Math.pow(2,res.length-i-1);
    }
    return sum;
}

```

## 二进制转换

将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。
示例1
输入
65
输出
01000001

```javascript
// // 首先通过toString方法将num转为2进制数形式，然后判断其长度是否足够8位。如不足8位，则声明一个“0000000”字符串用于补0，因为目标的2进制数形式最少为一位，因此最多只需要7个0；通过slice方法对“0000000”进行截取，然后将其结果加在目标前面即可。
function convertToBinary(num) {
     //转换为2进制格式
     var s = num.toString(2);
     //获得2进制数长度
     var l = s.length;
     if(l<8){
         //声明一个字符串用于补满0
         var s1 = "0000000";
         var s2 = s1.slice(0,8-l);
         s = s2+s; 
     }
     return s;
 }

function convertToBinary(num) {
    var str = num.toString(2);
    while(str.length < 8) {
        str = "0" + str;
    }
    return str;
}


function convertToBinary(num) {
    var res = num.toString(2);
    return res.length > 8 ? res : ('00000000' + res).slice(-8);
}
```

## 乘法

求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题
示例1
输入
3, 0.0001
输出
0.0003

```javascript
function multiply(a, b) {
  return a*b;
}
```

## 改变上下文

将函数 fn 的执行上下文改为 obj，返回 fn 执行后的值
示例1
输入
alterContext(function() {return this.greeting + ', ' + this.name + '!'; }, {name: 'Rebecca', greeting: 'Yo' })
输出
Yo, Rebecca!

```javascript
//apply  call  bind
function alterContext(fn, obj) {
    return fn.apply(obj)
    // return fn.call(obj)
    // return fn.bind(obj)()
}
```

## 批量改变对象的属性

给定一个构造函数 constructor，请完成 alterObjects 方法，将 constructor 的所有实例的 greeting 属性指向给定的 greeting 变量。
示例1
输入
var C = function(name) {this.name = name; return this;};
var obj1 = new C('Rebecca');
alterObjects(C, 'What\'s up'); obj1.greeting;
输出
What's up

```javascript
function alterObjects(constructor, greeting) {
    constructor.prototype.greeting = greeting;
}
```

## 属性遍历

找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
1、返回数组，格式为 key: value
2、结果数组不要求顺序
示例1
输入
var C = function() {this.foo = 'bar'; this.baz = 'bim';};
C.prototype.bop = 'bip';
iterate(new C());
输出
["foo: bar", "baz: bim"]

```javascript
function iterate(obj) {
     var arr = [];
     //使用for-in遍历对象属性
     for(var key in obj){
         //判断key是否为对象本身的属性
         if(obj.hasOwnProperty(key)){
             //将属性和值按格式存入数组
             arr.push(key+": "+obj[key]);
         }
     }
     return arr;
}

function iterate(obj) {
    return Object.getOwnPropertyNames(obj).map(function(key){
        return key+": "+obj[key];
    });
}


// Object.keys 只收集自身属性名，不继承自原型链上的属性，所以可以直接这么写
function iterate(obj) {
    var arr=Object.keys(obj);
    var arrs=[];
    arr.forEach(function(item){
        arrs.push(item+': '+obj[item])
    })
    
    return arrs
     
}
```