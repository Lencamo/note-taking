### Bootstrap3

官方介绍

> [Bootstrap 3](https://www.bootcss.com/) 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发<span style="color: green;">响应式布局</span>、<span style="color: green;">移动设备优先</span>的 WEB 项目。

简单的说：

- 支持 less
- 响应式布局
- 移动端设备优先
- 依赖 jQuery

## 一、入门

### 1、下载

①CDN

```html
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
/>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
```

②npm

```sh
npm install bootstrap@3.4.1
```

- main.js

```js
// 导入Bootstrap样式文件
import 'bootstrap/dist/css/bootstrap.min.css'
```

③ 引入源码的 dist 文件夹内容（预编译版）

```sh
bootstrap/
├── dist/     ✔
    ├── css/
    ├── js/
    └── fonts/
```

### 2、基本模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />

    <!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
    <!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 -->
    <!-- [if lt IE 9]>
      <script src="https://fastly.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
      <script src="https://fastly.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
    <![endif] -->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
    <script src="https://fastly.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </body>
</html>
```

#### 代码分析：

- 使用当前浏览器的最高版本的内核渲染

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

- 使用移动设备优先且禁止缩放功能

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- 解决 IE 9 以下版本对`html 5`新增标签、`css 3`Media Query 的不识别问题。

```html
<!-- 条件注释 -->
<!-- [if lt IE 9]>
  <script src="https://fastly.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
  <script src="https://fastly.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
<![endif] -->
```

### 3、Bootstrap3.4.1 源码

> https://github.com/twbs/bootstrap/archive/v3.4.1.zip

源码结构：

```sh
bootstrap/
├── less/      源码文件
│   ├── variables.less (变量定义)
│   ├── normalize.less (规范化样式)
│   └── scaffolding.less (基本全局样式 🚩)
├── js/
├── fonts/
├── dist/      预编译文件
│   ├── css/
│   ├── js/
│   └── fonts/
└── docs/      所有源码文件夹
    └── examples/
```

## 二、全局 CSS 样式

### 1、栅格系统

- 行(row)必须放在 container 布局容器中
- 列(column)必须小于 12，并且每列默认有`padding: 0px 15px`
- 实现方式：添加类名<span style="color: green;">col-\*-\*</span>

### 2、全局默认内容

&emsp;&emsp;最好是下载==Bootstrap3.4.1 源码==去源码 less 目录中查看对应组件、基础配置。

重点关注的几个.less 文件

- variables.less ： 例如@font-size-base: 14px
- normalize.less
- scaffolding.less
- 等等

### 3、拓展

① `.sr-only`：
&emsp;&emsp;全称是 screen reader only，意为：（仅供）屏幕阅读器。

```html
<!-- 例如： -->
<div class="alert alert-danger" role="alert">
  <!-- 普通用户 -->
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true">
    Enter a valid email address</span
  >
  <!-- 特殊人士 -->
  <span class="sr-only">Enter a valid email address</span>
</div>
```

&emsp;&emsp;仅仅为残障人士准备的，残障专用设备读取到<span style="color: green;">备注信息</span>，但是不会在普通设备上显示，不影响正常人的阅读。

② HTML5 针对 html tag 增加的属性：`role` 和 `aria-`。

```html
<div role="checkbox" aria-checked="checked"></div>
```

- `role`: html 辅助工具就可以认出这里的 div 实际上是个 button。
- `aria-`: tag 辅助工具就会知道，这个 div 实际上是个 checkbox 的角色，为选中状态。

## 三、类名汇总

### 1、基本类名

- .container
- .col-xs-3
- .col-md-offset-3
- .row
- .col-md-push-3

```html
<div class="container"></div>
```

### 2、排版类名

- list-unstyle
- dl-horizontal

### 3、表格类名

响应式表格

```html
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

①table 标签
前提： `.table`

- .table-striped
- .table-bordered
- .table-hover
- .table-condensed

② tr、td 标签

- .active 灰色
- .success 绿色
- .info 蓝色
- .warning 黄色
- .danger 红色

### 4、表单类名

基础类名

- .form-control
  对`<input>`、`<textarea>` 和 `<select>` 元素默认设置宽度属性为 width: 100%;
- .form-control-static
  静态控件，针对于`<p>`标签的纯文本内容
- .form-group
  `<label>`标签和`<input>`、`<textarea>` 和 `<select>` 元素组成

①form 标签

- .form-inline

内联表单:

```html
<form class="form-inline">
  <div class="form-group">
    <label for="example">Amount</label>
    <!-- .input-group类 -->
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" class="form-control" placeholder="金额" />
      <div class="input-group-addon">.00</div>
    </div>
  </div>
</form>
```

- .form-horizontal
  此时内部的`.form-group`类似于`.row`

Bootstrap 默认情况下，control-label 的文本采用右对齐方式。

```html
<form class="form-horizontal">
  <div class="form-group">
    <!-- 1、 -->
    <!-- 加上control-label后可以使用col-sm-3 -->
    <label for="inputEmail" class="col-sm-3 control-label">Email</label>
    <!-- 外套一个🚩div来使用col-sm-9 -->
    <div class="col-sm-9">
      <input
        type="email"
        class="form-control"
        id="inputEmail"
        placeholder="Email"
      />
    </div>
  </div>
  <!-- 2、 -->
  <div class="form-group">
    <!-- 列偏移 -->
    <div class="col-sm-offset-3 col-sm-9">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
  <!-- 3、 -->
  <div class="form-group">
    <label class="col-sm-3 control-label">Email</label>
    <div class="col-sm-9">
      <!-- 静态控件 -->
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
</form>
```

② .checkbox 、.radio 和 selec 标签的使用

```html
<form>
  <!-- 常规 -->
  <div class="form-group">
    <label for="example">Amount</label>
    <input type="text" class="form-control" placeholder="金额" />
  </div>

  <!-- checkbox演示 -->
  <div class="checkbox">
    <label>
      <input type="checkbox" value="" />
      why it's great
    </label>
  </div>

  <!-- radio演示 -->
  <div class="radio">
    <label class="radio-inline">
      <input
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio1"
        value="option1"
      />
      男
    </label>
    <label class="radio-inline">
      <input
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio2"
        value="option2"
      />
      女
    </label>
  </div>

  <!-- select演示 -->
  <select class="form-control">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
</form>
```

### 5、按钮

按钮标签
前提：`.bt`

① 样式

- .btn-default 白色
- .btn-primary 蓝色
- .btn-success 绿色
- .btn-info 蓝色
- .btn-warning 黄色
- .btn-danger 红色
- .btn-link 链接

② 尺寸

- .btn-block
  可以将其拉伸至父元素 100%的宽度，而且按钮也变为了块级（block）元素。

### 6、图片

响应式图片

- .img-responsive

图片形状

- img-rounded
- img-rounded
- img-thumbnail

### 其他

① 关闭按钮

```html
<button type="button" class="close">
  <span>&times;</span>
</button>
```

② 上下三角符号

```html
<button type="button" class="btn btn-default">
  <span class="caret"></span>
</button>
```

③ 清除浮动

```html
<div class="clearfix">...</div>
```

相当于：

```less
// Mixin itself
.clearfix() {
  &:before,
  &:after {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
}
```

④ 显示或隐藏

```html
<div class="show">...</div>
<div class="hidden">...</div>
```

相当于：

```less
.show {
  display: block !important;
}
.hidden {
  display: none !important;
}
```

⑤ 图标

```html
<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
```

## 四、Bootstrap 组件 、JavaScript 插件

&emsp;&emsp;其实，通过上面的基础内容，我们已经可以使用 Bootstrap 了，但是使用 Bootstrap 组件、JavaScript 插件会使我们的开发更加便捷、高效。

①Bootstrap 组件：静态的

②JavaScript 插件：动态交互 ✨ 的
&emsp;&emsp;其中，<span style="color: green;">data-toggle</span> 指以什么事件触发，<span style="color: green;">data-target</span> 指事件的目标

> 学习建议：结合项目使用
