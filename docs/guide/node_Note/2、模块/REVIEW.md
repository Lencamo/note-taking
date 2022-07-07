## 一、js 的数组方法

### 1、向【数组尾部】添加新元素

实例：push()

```JavaScript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi");       //  向 fruits 添加一个新元素
```

### 2、数组重组为字符串

实例：join()

```JavaScript
var txt = ["小红" "小白" "小黄" "小黑" "小绿"];   // 数组

txt.join(' ')            // 按照自定义的" "重组成为一个字符串


// tostring()🍗方法
txt.tostring()          // 相当于txt.join(',')的简写
```

## 二、js 的数组迭代

### 1、forEach()方法

实例：Array.forEach()

```JavaScript
var txt = "";
var numbers = [45, 4, 9, 16, 25];

// 普通函数
numbers.forEach(myFunction);
function myFunction(value, index, array) {
  txt = txt + value + "<br>";
}
// 箭头函数
numbers.forEach(value => {
  txt = txt + value + "<br>";
})
```

其中的 index、array 是 🍗 可选参数