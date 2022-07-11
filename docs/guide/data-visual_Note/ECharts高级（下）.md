## 三、交互 API

### 1、全局 echarts 对象

概念：

&emsp;&emsp;全局 echarts 对象是引入 echarts.js 文件后可以直接使用的

官方 API 文档：

> https://echarts.apache.org/zh/api.html#echarts

① 常用方法：

- echarts.init( )
- registerTheme( ) ：自定义主题时接触过
- registerMap( ) ：ECharts 地图时接触过
- connect( )

② connect( )方法

&emsp;&emsp;connect()方法是用于关联多个图表。使用原因：

原理：
&emsp;&emsp;一个页面可以有多个独立图表（多个 ECharts 实例对象），而 connect()可以实现多图关联，传入联动目标为 ECharts 实例对象，支持数组。

应用场景：

- 保存图片时自动拼接
- 刷新按钮
- 重置按钮
- 提示框联动、图例选择、数据范围修改等

```html
<script>
  // 图表一
  var option = {
    toolbox: {
      feature: {
        // 1、保存图片时自动拼接
        saveAsImage: {}
      }
    },
    series: [
      {
        type: 'bar',
        data: yDataArr
      }
    ]
  }
  mCharts.setOption(option)

  // 图表二
  $.get('json/map/china.json', function (ret) {
    echarts.registerMap('aa', ret)
    var option2 = {
      geo: {
        type: 'map',
        map: 'aa'
      }
    }
    mCharts2.setOption(option2)

    // 图表🚩关联
    echarts.connect([mCharts, mCharts2]) // 将柱状图和地图关联起来
  })
</script>
```

### 2、echartsInstance 对象

概念：

&emsp;&emsp;echartsInstance 对象是通过 echarts.init 方法调用后得到的

官方 API 文档：

> https://echarts.apache.org/zh/api.html#echarts

常用方法：

- setOption( )
- resize( ) ：图表自适应时接触过
- on\off( )
- dispatchAction( )
- clear( )
- dispose

① on\off( )方法

&emsp;&emsp;on\off( )方法用于对事件的绑定或者解除。关于事件，具体可以查看官方 API 文档的[events 部分](https://echarts.apache.org/zh/api.html#events)。

- 鼠标事件

> ⅰ.常见事件：'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'等等<br/>ⅱ.事件参数(arg)：为触发事件元素的相关数据信息

```html
<script>
  mCharts.on('click', function (arg) {
    console.log(arg)
    console.log('click...')
  }) // 对事件进行监听

  // mCharts.off('click') // 解绑click的事件
</script>
```

- ECharts 其他事件

> ⅰ.常见事件：'legendselectchanged'、'datazoom'、'pieselectchange'、'mapselectchange'等等<br/>ⅱ.事件参数(arg)：为触发事件元素的相关数据信息

```html
<script>
  var option = {
    legend: {
      data: ['淘宝', '京东', '唯品会', '1号店', '聚美优品']
    }
  }
  mCharts.on('legendselectchanged', function (arg) {
    console.log(arg)
    console.log('legendselectchanged...')
  })
</script>
```

② dispatchAction( )方法

&emsp;&emsp;dispatchAction( )方法用于触发某些行为，使用代码模拟用户的行为。关于行为，具体可以查看官方 API 文档的[action 部分](https://echarts.apache.org/zh/api.html#action)。

> ⅰ.常见行为：'hightlight'、'tooltip'等等<br/>ⅱ.事件参数(arg)：为触发事件元素的相关数据信息

```html
<script>
  $('#btn1').click(function () {
    // 模拟用户的行为
    mCharts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0, // 系列的索引
      dataIndex: 1 // 数据的索引
    })
    mCharts.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: 2
    })
  })
</script>
```

③ clear( )方法、dispose( )方法

```html
<script>
  $('#btn2').click(function () {
    // 清空图表的实例（隐藏）
    mCharts.clear()
  })

  $('#btn3').click(function () {
    // 重新设置option（显示）
    mCharts.setOption(option)
  })

  $('#btn4').click(function () {
    // 销毁mCharts
    mCharts.dispose()
  })
</script>
```
