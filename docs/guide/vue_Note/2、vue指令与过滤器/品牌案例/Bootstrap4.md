### Bootstrap4

官方介绍

> [Bootstrap 4](https://code.z01.com/v4/) 是全球最受欢迎的前端开源工具库，它支持 <span style="color: green;">Sass 变量</span>和 <span style="color: green;">mixin</span>、响应式栅格系统、自带大量组件和众多强大的 JavaScript 插件。

简单的说：

- 预处理器由 less 切换到 sass
- 响应式布局方式改为：<span style="color: red;">rem + Flexbox 布局</span>
- 移动端设备优先并且适配了移动端
- 依赖 jQuery

## 一、默认配置

```css
font-size: 16px,
line-height: 1.5,
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif,

/* <p>元素 */
margin-top: 0
margin-bottom: 1rem (16px)
```

### 1、内边距（pading）外边距（margin）

① m 代表 margin

- .m-1 相当于 margin: 0.25rem !important;
- .m-2 相当于 margin: 0.5rem !important;
- <span style="color: green;">.m-3</span> 相当于 margin: 1rem !important;

&emsp;&emsp;针对单条边

- .mt-3、.ml-3、.mr-3、.mb-3
- .mx-3、.my-3

② p 代表 padding

- .p-1 相当于 padding: 0.25rem !important;
- .p-2 相当于 padding: 0.5rem !important;
- <span style="color: green;">.p-3</span> 相当于 padding: 1rem !important;

&emsp;&emsp;针对单条边

- .pt-3、.pl-3、.pr-3、.pb-3
- .px-3、.py-3

### 2、display 和 float

d 代表 display

- .d-inline-block 行内块元素
- .d-block 块级元素

float 值

- .float-left
- .float-right
- .float-none

### 3、尺寸大小

w 代表 width

- .w-25 相当于 width: 25%
- .w-50 相当于 width: 50%
- .w-75 相当于 width: 75%
- .w-100 相当于 width: 100%

区间

- .mw-100
- .mh-100

### 4、其他

- .overflow-hidden
- .position-relative
- .invisible

> [更多常用样式](https://zhuanlan.zhihu.com/p/133941009)

## 二、公共样式

略

## 三、总结

&emsp;&emsp;在学完 Bootstrap 3 后，其实除了观察新增的一些内容，其他内容和 Bootstrap 3 大差不差。

&emsp;&emsp;重点关注 <span style="color: red;">rem + Flexbox 布局</span>思想，其他的完全可以查看[官方文档](https://code.z01.com/v4/)。
