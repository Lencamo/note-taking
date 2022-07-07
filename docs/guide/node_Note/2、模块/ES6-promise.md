## 回调地狱

概念：

> 多层回调函数的相互嵌套

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

### 1、Promise 基本认知

```js
console.dir(Promise)
```

结果：

```sh
构造函数
ƒ Promise()
- prototype: Promise

原型链
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
```

### 2、Promise 基本示例

&emsp;&emsp;通过<span style="background-color:yellow;color:black">.then()方法的链式调用</span>，可以解决回调地狱问题。

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
