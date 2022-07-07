## 一、js 的日期获取方法

| 方法                                            | 描述                                 |
| ----------------------------------------------- | ------------------------------------ |
| getTime()                                       | 获取时间（从 1970 年 1 月 1 日至今） |
| getDay()                                        | 以数值获取周名（0-6）                |
| <span style="color:green">getFullYear()</span>  | 获取四位的年（yyyy）                 |
| <span style="color:green">getMonth()</span>     | 获取月（0-11）                       |
| <span style="color:green">getDate()</span>      | 以数值返回天（1-31）                 |
|                                                 |                                      |
| <span style="color:SkyBlue">getHours()</span>   | 获取小时（0-23）                     |
| <span style="color:SkyBlue">getMinutes()</span> | 获取分（0-59）                       |
| <span style="color:SkyBlue">getSeconds()</span> | 获取秒（0-59）                       |
| getMilliseconds()                               | 获取毫秒（0-999）                    |

## 二、ES6 语法： RegExp 对象

### 1、ecex()方法

实例：返回的是一个 【字符串 🍗 数组】

```JavaScript
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null

// 高级案例 —— 带()：
// 1、
var s = '_x_x';
var r = /_(x)/;

r.exec(s) // [ '_x', 'x', index: 0, input: '_x_x', groups: undefined ]

// 2、
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr // [ 'abbba', 'bbb', index: 1, input: '_abbba_aba_', groups: undefined ]
```

注意事项：观察打印的数组内！！
（index 为第一次匹配成功的位置, input 为
index 属性理解实例：

```JavaScript
// 默认情况下只会打印第一次匹配成功的索引值。
// 如果正则表达式加上🍗g修饰符，则可以使用多次exec()方法，下一次搜索的位置从上一次匹配成功结束的位置开始。
var reg = /a/g;
var str = 'abc_abc_abc'

var r1 = reg.exec(str);
r1 // ["a"]
r1.index // 0
reg.lastIndex // 1

var r2 = reg.exec(str);
r2 // ["a"]
r2.index // 4
reg.lastIndex // 5

var r3 = reg.exec(str);
r3 // ["a"]
r3.index // 8
reg.lastIndex // 9

var r4 = reg.exec(str);
r4 // null
reg.lastIndex // 0
```

### 2、text()方法

返回的是一个布尔值
