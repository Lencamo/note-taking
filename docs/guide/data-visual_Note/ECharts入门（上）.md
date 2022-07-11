## ECharts

> [Apache ECharts](https://echarts.apache.org/zh/index.html) 是一个基于 JavaScript 的开源可视化图表库

> 底层依赖矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

## 一、快速使用

### 1、引入 Apache ECharts

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- 引入刚刚下载的 ECharts 文件 -->
    <script src="echarts.js"></script>
  </head>
</html>
```

### 2、绘制 ECharts 图表

准备工作：

```html
<body>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <!-- 方式一： -->
  <div id="main" style="width: 600px;height:400px;"></div>

  <!-- 方式二： -->
  <div id="main"></div>
  <script type="text/javascript">
    var myChart = echarts.init(document.getElementById('main'))

    myChart.resize({
      width: 800,
      height: 400
    })
  </script>

  <!-- 方式三： -->
  <div id="main"></div>
  <script type="text/javascript">
    var myChart = echarts.init(document.getElementById('main'), null, {
      width: 600,
      height: 400
    })
  </script>
</body>
```

正式绘制：

- <span style="color: green">echarts.init</span> 方法初始化 echarts 实例
- 编写 option 配置内容
- <span style="color: green">setOption</span> 方法生成柱状图

```html
<body>
  <script type="text/javascript">
    // 1、基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 2、指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      legend: {
        data: ['销量']
      },

      tooltip: {},

      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }

    // 3、使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  </script>
</body>
```

结果:

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220701110921.png" width=336.6px />

### 3、ECharts 的配置项

> 官网：https://echarts.apache.org/zh/option.html#title

&emsp;&emsp;通过上面的 option 配置，可以发现基础的配置项有：

① title

- text / subtext
- link / sublink
- textStyle: { } / subtextStyle: { } &emsp;&emsp;—— <span style="color: green">内容样式</span>
  - color
  - fontWeight
  - fontSize
  - lineHeight
  - ……
- padding &emsp;&emsp;—— <span style="color: green">结构样式</span>
- bottom
- backgroundColor
- borderColor
- shadowBlur

② legend

③ xAxis

- type
- data: [{ }]
  - value
  - textStyle: { }
- position

④ yAxis

- type
- data: [{ }]
  - value
  - textStyle: { }
- position

⑤ series

- name
- type &emsp;&emsp;—— <span style="color: red">图表类型</span>
- data: [{ }]

### 4、通用配置

&emsp;&emsp;在 ECharts 的任何图表中都能使用如下配置：

- 标题：title
- 提示：tooltip
- 工具按钮：toolbox
- 图例：legend

```html
<body>
  <script>
    var option = {
      // 1、标题设置
      title: {
        text: '成绩展示', // 标题文字
        textStyle: {
          // 标题文字样式设置
          color: 'red'
        },
        borderWidth: 5, // 标题边框宽度
        borderColor: 'blue', // 标题边框颜色
        borderRadius: 5, // 标题边框圆角
        left: 50, // 标题距离左边的距离
        top: 10 // 标题距离顶部的距离
      },

      // 2、工具提示
      tooltip: {
        // ① 触发类型:
        // item代表的是每个柱本身, axis代表的是坐标轴
        trigger: 'axis',

        // ② 触发时机
        // click代表点击, mouseOver代表鼠标移过
        triggerOn: 'click',

        // ③ 触发格式
        // 字符串方式（模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等）
        // formatter: '{b} 的成绩是 {c}',
        // 函数方式✨
        formatter: function (arg) {
          console.log(arg)
          return arg[0].name + '的分数是:' + arg[0].data
        }
      },

      // 3、工具箱按钮
      toolbox: {
        feature: {
          saveAsImage: {}, // 导出图片
          dataView: {}, // 数据视图
          restore: {}, // 重置
          dataZoom: {}, // 区域缩放
          magicType: {
            type: ['bar', 'line']
          } // 动态图表类型的切换
        }
      },

      // 4、图例
      legend: {
        // 图例中的data数据来源于【series中每个对象的name值】, 图例可以帮助我们对图表进行筛选
        data: ['语文', '数学']
      },
      series: [
        {
          name: '语文',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: '数学',
          type: 'bar',
          data: [36, 20, 10, 10, 5, 20]
        }
      ]
    }
  </script>
</body>
```

## 二、常用的 ECharts 直角坐标系图表

&emsp;&emsp;通过 ECharts 官方文档的示例部分，我们可以发现 ECharts 支持了绝大部分的图表类型。

### 图表选择

① 柱状图（bar）

&emsp;&emsp;描述分类数据

② 线性图（line）

&emsp;&emsp;描述变化趋势

③ 散点图（scatter/effectScatter）

&emsp;&emsp;描述不同维度数据之间的相关性

④ 饼图（pie）

&emsp;&emsp;描述数据占比情况

⑤ 地图（map）

&emsp;&emsp;描述地理差异

⑥ 雷达图（radar）

&emsp;&emsp;描述多维度对比

⑦ 仪表盘图（gauge）

&emsp;&emsp;描述指标进度

### 1、柱状图

```html
<body>
  <script>
    var option = {
      series: [
        {
          name: '语文',
          // 类型🚩设置
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],

          // 1、标记点
          markPoint: {
            data: [
              {
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
            ]
          },

          // 2、标记线
          markLine: {
            data: [
              {
                type: 'average',
                name: '平均值'
              }
            ]
          },

          // 3、柱状图上的文字设置
          label: {
            show: true, // 是否显示
            rotate: 60, // 旋转角度
            position: 'top' // 显示位置
          },

          // 4、柱的宽度
          barWidth: '30%'
        }
      ]
    }
  </script>
</body>
```

### 2、折线图

```html
<body>
  <script>
    var option = {
      xAxis: {
        type: 'category',
        data: [
          3005, 3003, 3001, 3002, 3009, 3007, 3003, 3001, 3005, 3004, 3001, 3009
        ],
        // 细节✨一：初始点紧挨y轴
        boundaryGap: false // x轴的第1个元素是否与y轴有距离
      },

      yAxis: {
        type: 'value',
        // 细节✨二：支持缩放/脱离0值比例（防止y轴初始值过小，折线变为直线）
        scale: true
      },

      series: [
        {
          name: '康师傅',
          // 类型🚩设置
          type: 'line',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],

          // 1、标记点
          markPoint: {
            data: [
              {
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
            ]
          },

          // 2、标记线
          markLine: {
            data: [
              {
                type: 'average',
                name: '平均值'
              }
            ]
          },

          // 3、标记区域
          markArea: {
            data: [
              [
                {
                  xAxis: '1月'
                },
                {
                  xAxis: '2月'
                }
              ],
              [
                {
                  xAxis: '7月'
                },
                {
                  xAxis: '8月'
                }
              ]
            ]
          },

          // 4、其他
          smooth: true, // 是否为平滑线
          lineStyle: {
            // 线的样式设置
            color: 'green',
            type: 'solid' // dashed dotted solid
          },
          areaStyle: {
            // 线和x轴形成的区域设置
            color: 'Skyblue'
          }
        }
      ]
    }
  </script>
</body>
```

```html
<body>
  <script>
    var option = {
      series: [
        {
          type: 'line',
          data: [
            3000, 2800, 900, 1000, 800, 700, 1400, 1300, 900, 1000, 800, 600
          ],
          stack: 'all', // 堆叠图的设置
          areaStyle: {} // 便于观察：添加默认背景样式
        },
        {
          type: 'line',
          data: [
            2000, 3800, 1900, 500, 900, 1700, 2400, 300, 1900, 1500, 1800, 200
          ],
          stack: 'all', // 堆叠图的设置
          areaStyle: {}
        }
      ]
    }
  </script>
</body>
```

### 3、散点图

```html
<body>
  <script>
    // 一、数据处理
    // 原始数据
    var data = [
      { gender: 'female', height: 161.2, weight: 51.6 },
      { gender: 'female', height: 167.5, weight: 59 },
      ……
    ]

    // 生成目标二维数组（身高和体重的散点图）
    var axisData = []
    for (var i = 0; i < data.length; i++) {
      var height = data[i].height
      var weight = data[i].weight
      var newArr = [height, weight]
      axisData.push(newArr)
    }

    // 二、配置参数
    var option = {
      xAxis: {
        type: 'value',
        // 脱离0值比例
        scale: true
      },
      yAxis: {
        // 细节✨：在散点图中，y轴也是数值
        type: 'value',
        // 脱离0值比例
        scale: true
      },
      series: [
        // 1、普通图效果
        {
          // 类型🚩设置
          type: 'scatter',
          data: axisData,

          // 2、气泡图效果
          // symbolSize: 30
          symbolSize: function (arg) {
            // 控制散点的大小
            // console.log(arg)
            var height = arg[0] / 100
            var weight = arg[1]
            // bmi = 体重kg / (身高m*身高m)   大于28,就代表肥胖
            var bmi = weight / (height * height)
            if (bmi > 28) {
              return 20
            }
            return 5
          },

          itemStyle: {
            // 控制散点的样式
            color: function (arg) {
              // console.log(arg)
              var height = arg.data[0] / 100
              var weight = arg.data[1]
              // bmi = 体重kg / (身高m*身高m)   大于28,就代表肥胖
              var bmi = weight / (height * height)
              if (bmi > 28) {
                return 'red'
              }
              return 'green'
            }
          }
        },

        // 3、涟漪图效果
        // {
        //   type: 'effectScatter', // 指明图表为带涟漪动画的散点图
        //   showEffectOn: 'emphasis', // 出现涟漪动画的时机 render、emphasis
        //   rippleEffect: {
        //     scale: 10 // 涟漪动画时, 散点的缩放比例
        //   }
        // }
      ]
    }
  </script>
</body>
```
