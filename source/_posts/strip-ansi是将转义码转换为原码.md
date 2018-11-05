---
title: strip-ansi是将转义码转换为原码
date: 2018-03-07 19:14:13
tags:
- vue
- node
- stirp-ansi
categories:
- newbie项目
comments: false
permalink:
---
# strip-ansi就是将转义后的符号复原

## Install

```javascript
npm install strip-ansi
```

## Usage

```javascript
const stripAnsi = require('strip-ansi');

stripAnsi('\u001B[4mUnicorn\u001B[0m');
//=> 'Unicorn'
```

## Related

* strip-ansi-cli - CLI for this module
* has-ansi - Check if a string has ANSI escape codes
* ansi-regex - Regular expression for matching ANSI escape codes
* chalk - Terminal string styling done right