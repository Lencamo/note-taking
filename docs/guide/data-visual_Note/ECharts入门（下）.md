## ECharts 直角坐标系图表常用配置

```html
<body>
  <script>
    var option = {
      // 1、网格
      grid: {
        // 坐标轴容器
        show: true, // 是否可见
        borderWidth: 10, // 边框的宽度
        borderColor: 'red', // 边框的颜色
        left: 120, // 边框的位置
        top: 120,
        width: 300, // 边框的大小
        height: 150
      },

      // 2、区域缩放
      dataZoom: [
        // 控制区域缩放效果的实现
        {
          type: 'slider', // 缩放的🚩类型  slide代表滑块  inside代表依靠鼠标滚轮
          // type: 'inside'
          xAxisIndex: 0
        },
        {
          type: 'slider',
          yAxisIndex: 0
          // start: 0, // 渲染完成后, 数据筛选的初始值, 百分比
          // end: 80 // 渲染完成后, 数据筛选的结束值, 百分比
        }
      ],
      toolbox: {
        feature: {
          dataZoom: {}
        }
      }
    }
  </script>
</body>
```

## 三、常用的 ECharts 非直角坐标系图表

### 4、饼图

```html
<body>
  <script>
    // 一、准备饼图数据（注意和前面散点图的区别）
    var pieData = [
      {
        name: '淘宝',
        value: 11231
      },
      {
        name: '京东',
        value: 22673
      },
      {
        name: '唯品会',
        value: 6123
      },
      {
        name: '1号店',
        value: 8989
      },
      {
        name: '聚美优品',
        value: 6700
      }
    ]
    var option = {
      series: [
        {
          type: 'pie',
          // 类型🚩设置
          data: pieData,

          // 1、饼图文字的显示
          label: {
            show: true, // 显示文字
            //formatter: 'hehe' // 决定文字显示的内容
            formatter: function (arg) {
              // console.log(arg)
              return arg.name + '平台' + arg.value + '元\n' + arg.percent + '%'
            }
          },

          // 2、其他
          // radius: 20 // 饼图的半径
          // radius: '20%' // 百分比参照的是宽度和高度中较小的那一部分的一半来进行百分比设置

          // ① 圆环
          // radius: ['50%', '75%'] // 第0个元素代表的是內圆的半径 第1个元素外圆的半径

          // ② 南丁格尔图
          roseType: 'radius', // 饼图的每一个区域的半径是不同的
          // selectedMode: 'multiple',
          selectedMode: 'single' // 选中的效果,能够将选中的区域偏离圆点一小段距离

          selectedOffset: 30
        }
      ]
    }
  </script>
</body>
```

### 5、地图

地图数据获取：

- [百度地图 API](https://lbsyun.baidu.com/)（需要申请百度地图 AK）
- [矢量地图](https://datav.aliyun.com/portal/school/atlas/area_selector)（需要准备矢量地图数据）

使用方式：

&emsp;&emsp;与常规的 ECharts 图表不同的是，这里的地图图表的第二步、第三步是要写在 `$.get` 请求中的。

> 关于地图是详细数据：name、cp 坐标等等都是通过打印 ret 获取的。

```html
<body>
  <script>
    // 1、基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 使用地图数据
    $.get('json/map/china.json', function (ret) {
      // ret 就是中国的各个省份的矢量地图数据
      // console.log(ret)

      // 注册地图
      echarts.registerMap('chinaMap', ret)

      // 2、指定图表的配置项和数据
      var option = {
        // ① 常规配置
        geo: {
          type: 'map',
          map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致

          roam: true, // 设置允许缩放以及拖动的效果
          label: {
            show: true // 展示标签
          },
          zoom: 1, // 设置初始化的缩放比例
          center: [87.617733, 43.792818] // 设置地图中心点的坐标
        },

        // ② 添加数据并关联配置（如：空气质量、散点图涟漪点）
        // 空气质量与颜色
        series: [
          {
            data: [
              { name: '北京', value: 39.92 },
              { name: '天津', value: 39.13 },
              { name: '上海', value: 31.22 }
            ],

            // 关联🚩图表
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: 'map'
          },

          // 散点图涟漪点
          {
            data: scatterData, // 配置散点的坐标数据
            type: 'effectScatter',

            // 关联🚩图表
            coordinateSystem: 'geo', // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              scale: 10 // 设置涟漪动画的缩放比例
            }
          }
        ],
        // ②的必备附属配置
        visualMap: {
          min: 0,
          max: 300,
          inRange: {
            color: ['white', 'red'] // 控制颜色渐变的范围
          },
          calculable: true // 出现滑块
        }
      }

      // 3、使用刚指定的配置项和数据显示图表
      mCharts.setOption(option)
    })
  </script>
</body>
```

### 6、雷达图

&emsp;&emsp;用于对某种东西性能的观察、比较。

```html
<body>
  <script>
    var option = {
      radar: {
        indicator: [
          {
            name: '易用性',
            max: 100
          },
          {
            name: '功能',
            max: 100
          },
          {
            name: '拍照',
            max: 100
          },
          {
            name: '跑分',
            max: 100
          },
          {
            name: '续航',
            max: 100
          }
        ], // 配置各个维度的最大值
        shape: 'polygon' // 配置雷达图最外层的图形 circle polygon
      },
      series: [
        {
          type: 'radar', // radar 此图表时一个雷达图
          data: [
            {
              name: '华为手机1',
              value: [80, 90, 80, 82, 90]
            },
            {
              name: '中兴手机1',
              value: [70, 82, 75, 70, 78]
            }
          ],

          // 常见配置
          label: {
            // 设置标签的样式
            show: true // 显示数值
          },
          areaStyle: {} // 将每一个产品的雷达图形成阴影的面积
        }
      ]
    }
  </script>
</body>
```

### 7、仪表盘图

```html
<body>
  <script>
    var option = {
      series: [
        {
          type: 'gauge',
          data: [
            {
              value: 97,
              itemStyle: {
                // 指针的样式
                color: 'pink' // 指针的颜色
              }
            }, // 每一个对象就代表一个指针
            {
              value: 85,
              itemStyle: {
                color: 'green'
              }
            }
          ],
          min: 50 // min max 控制仪表盘数值范围（默认 0 - 100）
        }
      ]
    }
  </script>
</body>
```
