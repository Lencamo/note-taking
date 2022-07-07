## 一、js 的字符串方法

### 1、字符串内容【第一个匹配的字符串】✨ 替换

实例：replace()

```JavaScript
str = "This is Microsoft, welcome to visit Microsoft company! ";
var n = str.replace("Microsoft", "W3School"); //Please visit W3School!

// 全局🍗替换:
var n = str.replace(/Microsoft/g, "W3School"); // 使用正则

//字符串数组元素内容替换:
var n = str.replace(/Microsoft/g, "W3School");

// 全局🍗匹配替换
// var n = str.replace(/<|>|"|&/g, function(match){});
var n = str.replace(/<|>|"|&/g, match => {});
```

### 2、字符串分割为数组

实例：split()

```JavaScript
var txt = "小红 小白 小黄 小黑 小绿";   // 字符串

txt.split(" ");          // 按照" "分割成为一个字符串数组
txt.split("小");         // 按照"小"分割成为一个字符串数组
```

