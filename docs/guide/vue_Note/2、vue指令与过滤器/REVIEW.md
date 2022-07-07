## 一、JavaScript 事件

常见的 HTML 事件
| 事件 | 描述 |
|-------------|--------------------|
| onchange | HTML 元素已被改变 |
| onclick | 用户点击了 HTML 元素 |
| onmouseover | 用户把鼠标移动到 HTML 元素上 |
| onmouseout | 用户把鼠标移开 HTML 元素 |
| onkeydown | 用户按下键盘按键 |
| onload | 浏览器已经完成页面加载 |

以 onclick 事件为例：

- html 中

```html
1、自定义函数
<p id="demo" onclick="myFunction()">点击我.</p>

<script>
  function myFunction() {
    document.getElementById('demo').innerHTML = 'YOU CLICKED ME!'
  }
</script>

2、内置函数
<button onclick="getElementById('demo').innerHTML = Date()">
  What is the time?
</button>
```

- js 中

```html
<p id="demo">点击我.</p>

<script>
  1、普通方式
  document.getElementById("demo").onclick = function() {myFunction()};

  2、addEventListener方式✨
  document.getElementById("demo").addEventListener("click", myFunction);


  function myFunction() {
    document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
  }
</script>
```

- 使用 jQuery

```html
<script>
  $('#demo').click(function () {
    myFunction()
  })

  function myFunction() {
    document.getElementById('demo').innerHTML = 'YOU CLICKED ME!'
  }
</script>
```

## 二、JavaScript 的字符串方法

截取字符串内容，前开后闭区间

### 1、slice()

依赖于索引值

> slice(startIndex, [endIndex])

应用场景：

```js
// 截取字符串
var res = str.slice(1)

// 截取指定位置的内容
var res = str.slice(1, 5)

//反向截取字符串
var res = str.slice(-1)
```

### 2、substr()

依赖于初始索引值、长度

> substr(startIndex, [newStrLength])

```js
// 截取字符串(等效于slice)
var res = str.substr(1)

// 截取指定长度的内容
var res = str.substr(1, 4) //等效于slice(1, 5)
```
