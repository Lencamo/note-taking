## 一、node.js 学习

### nodemon 包

&emsp;&emsp;在调试 Node.js 项目的时候，如果修改了代码，则要频繁的手动 close 掉，然后重新启动，非常繁琐。

&emsp;&emsp;而使用 nodemon 工具，它可以<span style="color: green;">监听项目文件的变动，并自动帮我们重启项目</span>。

```sh
# 1、安装
npm install nodemon -g

# 2、使用
# 原来：
node app.js
# 现在：
nodemon app.js
```

## 二、性能优化 —— base64

```html
<body>
  <!-- 普通的方式： -->
  <img src="./picture.jpg" />
  <!-- base64的方式： -->
  <img src="data:image/jpg;base64,/……" />
</body>
```

优点：

- base64，拿到 html 页面的同时就拿到了图片，不用单独的再次发送 ajax 请求。

缺点：

- 数据体积变大

应用范围：

- 小图片，小 logo 图片

### 图片转换为 base64 字符串

方式 1：

> 网站在线转换为 base64

方式 2：

> 使用 webpack 插件 —— url-loader

## 三、JavaScript 的 DOM 文档

基础知识

### 1、获取 html 元素

```js
document.getElementById(id)
document.getElementsByTagName(tagname)
document.getElementsByClassName(classname)

document.querySelector('选择器')
document.querySelectorAll('选择器')
```

对比 jQuery 语法：

```js
$('选择器')
```

### 2、操作 html 元素

```js
// 元素值
element.textContent = '<text content>'
element.innerHTML = '<html content>'

// 属性值
element.setAttribute('<attribute>', '<attribute值>')
element.attribute = '<attribute值>'

// html样式
element.style.property = '<property值>'
```

对比 jQuery 语法：

```js
// 元素值
element.text = '<text content>'
element.html = '<html content>'

// 属性值
element.attr('<attribute>', 'attribute值')

// html样式
element.css('<property>', '<property值>')
element.show()
element.hide()
```

### 3、节点操作

```js
// 1、创建
document.createElement(tagname)

// 2、删除
element.parentNode.removeChild(element) //当前元素
element.remove() //所以子节点

// 3、添加
element.parentNode.appendChild(element)
// 等等
```

对比 jQuery 语法：

```js
// 1、创建
$('<tagname></tagname>')

// 2、删除
element.remove()
element.empty()

// 3、添加
// element内
element.append(tagname)
element.prevend(tagname)
// element外
element.after(tagname)
element.before(tagname)
```
