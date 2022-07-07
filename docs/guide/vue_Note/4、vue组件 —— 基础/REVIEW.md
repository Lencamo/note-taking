## 一、JavaScript 的数组迭代

声明：普通数组的值用 `value` 表示，对象数组的值用 `item` 表示。

### 1、forEach()循环

&emsp;&emsp;遍历数组元素（循环不会中途停止）

```js
const arr = ['我', '你', '它', '他', '她']

arr.forEach((value, index) => {
  console.log(value)

  if (value === '你') {
    console.log('success！')
  }
})
```

结果：

> 我
> 你
> success
> 它
> 他
> 她

### 2、some()循环

&emsp;&emsp;对<span style="color: green;">某个</span>数组元素进行检测、查找。

```js
const arr = ['我', '你', '它', '他', '她']

arr.some((value, index) => {
  console.log(value)

  if (value === '你') {
    console.log('success！')

    // 终止✨some循环
    return true
  }
})
```

结果：

> 我
> 你
> success

### 3、every()循环

&emsp;&emsp;对<span style="color: green;">所有</span>数组元素进行检测、查找。返回是一个 <span style="color: red;">Boolean 值</span> 。

- 应用场景：判断是否全选

```js
const arr = {
  {id: 1, name: "华为", status: true},
  {id: 2, name: "小米", status: false},
  {id: 3, name: "格力", status: true},
}

// 它的返回值✨是一个Boolean值
const result = arr.every((item) => {
  // 检测是不是所有的status值都为true
  return item.status === true
})

console.log(result)

// 简写
// const result = arr.every(item => item.status)
```

结果：

> false

### 4、filter()循环

&emsp;&emsp;对<span style="color: green;">所有</span>数组元素进行检测、查找。返回是一个通过测试 <span style="color: red;">新数组</span> 。

- 应用场景：对购物车选中的商品价格累加

```js
const arr = {
  {id: 1, name: "西瓜", status: true, price:10 ,count: 2},
  {id: 2, name: "榴莲", status: false, price:80, count: 1},
  {id: 3, name: "草莓", status: true, price: 20,count: 3},
}

// 简写
// const arrNew = arr.filter(item => item.status)

/* 方式一 */
let priceAll = 0;
arr.filter(item => item.status).forEach((item) => {
  priceAll += (item.price * item.count)
})

console.log(priceAll)
```

### 5、reduce()循环

&emsp;&emsp;对数组内的某些数据 <span style="color: red;">求和</span> ，返回的是一个值。

- 应用场景：对购物车选中的商品价格累加

```js
const arr = {
  {id: 1, name: "西瓜", status: true, price:10 ,count: 2},
  {id: 2, name: "榴莲", status: false, price:80, count: 1},
  {id: 3, name: "草莓", status: true, price: 20,count: 3},
}

// 可进一步简写为：
// const result = arr.filter(item => item.status).reduce((priceAll, item) =>  priceAll += (item.price * item.count), 0)

/* 方式二 */
// 结构：arr.filter(item => item.status).reduce((总值, item) => {},初始值)
const result = arr.filter(item => item.status).reduce((priceAll, item) => {
  return priceAll += (item.price * item.count)
}, 0)

console.log(result)
```
