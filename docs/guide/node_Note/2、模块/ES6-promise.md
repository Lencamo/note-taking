## ⅰ 回调函数

&emsp;&emsp;被作为实参传入另一函数，并在该外部函数内被调用，用以来完成某些任务的函数，称为回调函数。

- 同步回调

```js
function greeting(name) {
  alert('Hello ' + name)
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.')
  callback(name)
}

processUserInput(greeting)
```

- 异步回调

&emsp;&emsp;回调函数经常被用于在一个异步操作完成后执行代码，它们被称为异步回调。

&emsp;&emsp;一个常见的例子是在 promise 末尾添加的 .then 内执行回调函数（在 promise 被兑现或拒绝时执行）。这个结构常用于许多现代的 web API，例如 fetch()。

## ⅱ 回调地狱

> 多层 callback 回调函数的相互嵌套

```js
setTimeout(() => {
  console.log('延迟 1 秒后输出')

  setTimeout(() => {
    console.log('延迟 2 秒后输出')

    setTimeout(() => {
      console.log('延迟 3 秒后输出')
    }, 3000)
  }, 2000)
}, 1000)
```

缺点：

- 耦合性太高（牵一发而动全身）
- 可读性差（大量嵌套、过于冗余）

## 一、ES6 的 Promise

&emsp;&emsp;为了解决回调地狱问题，ES6（ECMAScript 2015）中新增了 Promise 的概念

文档推荐：

> [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

> [使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

### 1、Promise 基本认知

```js
console.dir(Promise)
```

结果：

```sh
# 构造函数
ƒ Promise()
- prototype: Promise

# 原型链
prototype: Promise
- catch: ƒ catch()
- constructor: ƒ Promise()
- finally: ƒ finally()
- then: ƒ then()
- Symbol(Symbol.toStringTag): "Promise"
- [[Prototype]]: Object
```

总结：

- Prmoise 是一个构造函数
- 通过原型链的方式可以访问到.then()方法

```js
const pm = new Promise()

pm.then(
  (result) => {},
  (error) => {}
)

// 或者

pm.then((result) => {}).catch((error) => {})
```

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220722195512.png" width=633.6px />

### 2、Promise 基本示例

&emsp;&emsp;通过<span style="background-color:yellow;color:black">.then()方法的链式调用</span>，可以解决回调地狱问题。

> Promise.prototype.then 和 Promise.prototype.catch 方法返回的是 promise，所以它们可以被链式调用

① 回调函数方式

```js
const fs = require('fs')

fs.readFile('./files/1.txt', 'utf8', (err, content1) => {
  console.log(content1)

  fs.readFile('./files/1.txt', 'utf8', (err, content1) => {
    console.log(content1)

    fs.readFile('./files/1.txt', 'utf8', (err, content1) => {
      console.log(content1)
    })
  })
})
```

② 使用 promise

> .then / .catch / return 的使用

```js
const fs = require('fs').promises

fs.readFile('./files/1.txt', 'utf-8')
  .catch((err) => {
    console.log(err.message)
  })
  .then((result1) => {
    console.log(result1)
    return fs.readFile('./files/2.txt', 'utf-8')
  })
  .then((result2) => {
    console.log(result2)
    return fs.readFile('./files/3.txt', 'utf-8')
  })
  .then((result3) => {
    console.log(result3)
  })
```

### 3、Promise 中的方法

- Promise.all()：等所有的异步操作全部完成后才执行下一步的.then 操作（等待机制）

```js
const fs = require('fs').promises

const promiseArr = [
  fs.readFile('./files/1.txt', 'utf-8'),
  fs.readFile('./files/2.txt', 'utf-8')
  fs.readFile('./files/3.txt', 'utf-8')
]

Promise.all(promiseArr).then((result1,result2,result3)=>{
  console.log(result1,result2,result3)
}).catch(err =>{
  console.log(err.message)
})
```

- Promise.race()：只要任何一个异步操作完成就立即执行下一步的.then 操作（赛跑机制）

```js
const fs = require('fs').promises

const promiseArr = [
  fs.readFile('./files/1.txt', 'utf-8'),
  fs.readFile('./files/2.txt', 'utf-8')
  fs.readFile('./files/3.txt', 'utf-8')
]

Promise.race(promiseArr).then((result)=>{
  console.log(result)
}).catch(err =>{
  console.log(err.message)
})
```

### 4、基于 Promise 封装

- 封装读取文件

```js
import fs from 'fs'

function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) return reject(err)
      resolve(dataStr)
    })
  })
}
```

- 使用

```js
getFile('./files/1.txt').then(
  (r1) => {
    console.log(r1)
  },
  (err) => {
    console.log(err.message)
  }
)
```

## 二、async/await

&emsp;&emsp;async/await 是 ES8（ECMAScript 2017）中新引入的语法，用来简化 Promise 异步操作。

知识回顾：

&emsp;&emsp;前面我们使用的是链式.then()的方式来处理 Promise 异步操作。

```js
const fs = require('fs').promises

fs.readFile('./files/1.txt', 'utf-8')
  .catch((err) => {
    console.log(err.message)
  })
  .then((result1) => {
    console.log(result1)
    return fs.readFile('./files/2.txt', 'utf-8')
  })
  .then((result2) => {
    console.log(result2)
    return fs.readFile('./files/3.txt', 'utf-8')
  })
  .then((result3) => {
    console.log(result3)
  })
```

缺点：

- 阅读性差
- 不易理解

使用 async/await 简化操作：

```js
const fs = require('fs').promises

async function getAllFile() {
  const result1 = await fs.readFile('./files/1.txt', 'utf-8')
  console.log(result1)

  const result2 = await fs.readFile('./files/2.txt', 'utf-8')
  console.log(result2)

  const result3 = await fs.readFile('./files/3.txt', 'utf-8')
  console.log(result3)
}

getAllFile()
```

## 三、事件循环（EventLoop）

&emsp;&emsp;JavaScript 是一门<span style="color:red">单线程执行</span>的编程语言。也就是说，同一时间只能做一件事情。

&emsp;&emsp;为了防止某个耗时任务导致程序假死的问题，JavaScript 包待执行任务分为：<span style="color:green">异步任务</span> 和 <span style="color:green">同步任务</span>。

- 执行流程

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220722204811.png" width=689px />

&emsp;&emsp;<span style="color:red">JavaScript 主线程从“任务队列”中读取异步任务的回调函数，放到执行栈中依次执行</span>。这种不断循环运行的机制又被称为 EventLoop（事件循环）

① 关于异步任务

- 异步任务分类

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220722205228.png" width=430.2px />

- 异步任务 执行细则

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220722205449.png" width=523px />

② 经典面试题

```js
setTimeout(function () {
  console.log('1')
})

new Promise(function (resolve) {
  console.log('2')
  resolve()
}).then(function () {
  console.log('3')
})

console.log('4')

// 执行结果为： 2431
```
