## 一、ECharts 的显示

### 1、主题

① 内置主题：

```js
var mCharts = echarts.init(document.querySelector('div'), 'dark')

var mCharts = echarts.init(document.querySelector('div'), 'light')
```

② 自定义主题：

&emsp;&emsp;首先到 ECharts 官网进行[自定义配置](https://echarts.apache.org/zh/download-theme.html)，然后下载自定义主题 js 文件。

```html
<script src="echarts.js"></script>
<!-- 引入 vintage 主题 -->
<script src="theme/vintage.js"></script>
<script>
  // 第二个参数可以指定前面引入的主题
  var chart = echarts.init(document.getElementById('main'), 'vintage');
  chart.setOption({
      ...
  });
</script>
```

### 2、调色盘

&emsp;&emsp;调色盘是一组颜色，图形、系列会自动从其中选择颜色。

调色盘优先级：

> 局部调色盘 > 全局调色盘 > 主题调色盘

① 主题调色盘

&emsp;&emsp;主题内部使用了调色盘。

② 全局调色盘

```html
<script>
  var option = {
    color: ['red', 'green', 'blue', 'skyblue', 'purple']
  }
</script>
```

③ 局部调色盘

```html
<script>
  var option = {
    series: [
      {
        type: 'pie',
        data: pieData,
        color: ['pink', 'yellow', 'black', 'orange', 'red']
      }
    ]
  }
</script>
```

④ 颜色渐变

- 线性渐变：

```html
<script>
  var option = {
    series: [
      {
        type: 'bar',
        data: yDataArr,
        itemStyle: {
          color: {
            type: 'linear', // 线性渐变A->B
            x: 0, // 渐变方向坐标A
            y: 0,
            x2: 0, // 渐变方向坐标B
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red' // 0%处的颜色为红色
              },
              {
                offset: 1,
                color: 'blue' // 100%处的颜色为蓝
              }
            ]
          }
        }
      }
    ]
  }
</script>
```

- 径向渐变：

```html
<script>
  var option = {
    series: [
      {
        type: 'bar',
        data: yDataArr,
        itemStyle: {
          color: {
            type: 'radial', // 径向渐变
            x: 0.5, // 渐变方向坐标
            y: 0.5,
            r: 0.5, // 渐变半径
            colorStops: [
              {
                offset: 0,
                color: 'red' // 0%处的颜色为红色
              },
              {
                offset: 1,
                color: 'blue' // 100%处的颜色为蓝
              }
            ]
          }
        }
      }
    ]
  }
</script>
```

### 3、样式

① 直接样式

&emsp;&emsp;常见的标志如下：

- itemsStyle：控制区域样式
- textStyle：控制文字样式
- lineStyle：折线图
- areaStyle：雷达图
- label：控制文字样式

② 高亮样式

&emsp;&emsp;高亮样式就是鼠标触碰时，要做出改变的颜色。

实现方式：

> 在直接样式外包裹一层 `emphasis: { }`

### 4、自适应

&emsp;&emsp;当浏览器的大小发生变化时，我们可能也想让图表的大小也随之发生变化。

```html
<script>
  // 监听window窗口大小变化的事件
  window.onresize = function () {
    // console.log('window.onresize...')
    // 调用echarts实例对象的resize方法
    mCharts.resize()
  }

  // 高级🚩写法
  // window.onresize = mCharts.resize
</script>
```

## 二、ECharts 的动画

### 1、加载动画

&emsp;&emsp;Echarts 已经内置好了加载数据的动画，我们只需要在<span style="color:green">合适的时机</span>对其进行显示和隐藏操作即可。

```html
<script>
  mCharts.showLoading() // 在获取数据之前, 显示加载动画

  $.get('data/test_data.json', function (ret) {
    mCharts.hideLoading() // 当服务器数据获取成功之后, 隐藏加载动画
  })
</script>
```

### 2、增量动画

&emsp;&emsp;增量动画发生的原因是，我们有对数据更改的需求。

> 使用方式：通过 `setOption()` 方法 对原有 `option = {}` 内数据进行整合

```html
<script>
  // 示例一
  var btnModify = document.querySelector('#modify')
  btnModify.onclick = function () {
    var newYDataArr = [68, 32, 99, 77, 94, 80, 72, 86]
    // setOption 可以设置多次
    // 我们在设置新的option的时候, 只需要考虑到变化的部分就可以
    var option = {
      series: [
        {
          data: newYDataArr
        }
      ]
    }
    mCharts.setOption(option)
  }

  // 示例二
  var btnAdd = document.querySelector('#add')
  btnAdd.onclick = function () {
    xDataArr.push('小明')
    yDataArr.push(90)
    var option = {
      xAxis: {
        data: xDataArr
      },
      series: [
        {
          data: yDataArr
        }
      ]
    }
    mCharts.setOption(option)
  }
</script>
```

### 3、动画的配置

```html
<script>
  var option = {
    animation: true // 控制动画是否开启(默认开启)

    // 1、动画时长
    animationDuration: 7000, // 动画的时长, 它是以毫秒为单位
    // animationDuration: function(arg){
    //   console.log(arg)
    //   return 2000 * arg
    // },

    // 2、缓动动画
    animationEasing: 'bounceOut', //更多的效果可以查看官网

    // 3、动画元素的阈值
    animationThreshold: 7, //表示单种形式的元素数量大于这个阈值时，会关闭动画（如：柱状个数）
  }
</script>
```
