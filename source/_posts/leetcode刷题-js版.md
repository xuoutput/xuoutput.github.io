---
title: leetcode刷题 js版
date: 2019-04-07 15:55:12
tags:
- 刷题
- lintcode
- leetcode
categories:
- 前端
comments: false
permalink:
---

# leetcode刷题 js版

刷题地址在这[leetcode](https://leetcode.com/problemset/all/)

当然网址上也会有java版的解答, 涉及优化的细节

## 1. Two Sum

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// Approach 1: Brute Force
var twoSum = function(nums, target) {
  for( let i = 0; i < nums.length; i++) {
    for(let j = i+1; j < nums.length; j++) {
      if (nums[j] === target - nums[i]) {
        return [i,j]
      }
    }
  }
};
// Approach 2: Two-pass Hash Table
var twoSum = function(nums, target) {
  const map = new Map()
  for(let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  for(let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map.has(complement) && map.get(complement) != i) {
      return [map.get(complement), i]
    }
  }
};
// Approach 3: One-pass Hash Table
var twoSum = function(nums, target) {
  const map = new Map()
  for(let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    map.set(nums[i], i)
  }
};
```

## 2. Add Two Numbers




## 5. Longest Palindromic Substring

## 参考

[LeetCode solutions with JavaScript](https://github.com/hanzichi/leetcode)
[chihungyu1116/leetcode-javascript](https://github.com/chihungyu1116/leetcode-javascript)
[Demonstrate all the questions on LeetCode in the form of animation.](https://github.com/MisterBooo/LeetCodeAnimation)