## web 开发模式

目前主流的 web 开发模式有两种：

- <span style="color:red">基于服务端渲染</span>的传统 web 开发模式
  &emsp;&emsp; —— (SSR：后端组装页面)

- <span style="color:red">基于前后端分离</span>的新型 web 开发模式
  &emsp;&emsp; —— (BSR：前端组装页面)

使用选择：

&emsp;&emsp;可以从 SEO 、耗时、开发效率、服务器资源等角度选择。

① 服务端渲染 SEO 强

> 企业级网站

② Vue，React 等前端框架的<span style="color:green">SSR</span>(server side render)技术能够很好的解决 SEO 问题！

> 后台管理

&emsp;&emsp;当然，一些网站为了同时兼顾首页的渲染速度和前后端分离的开发效率，采用了<span style="color:skyblue">首屏服务器端渲染+其他页面前后端分离</span>的开发模式。

## 一、前后端分离（BSR）

&emsp;&emsp;前后端分离是一种架构模式，说通俗点就是后端项目里面看不到页面（JSP|HTML）,后端给前端提供接口，前端调用后端提供的 <span style="background-color:yellow;color:black;">REST 风格接口</span> 就行，前端专注写页面（html | jsp）和渲染（JS | CSS| 各种前端框架）；后端专注写代码就行。前后端分离的核心：后台提供数据，前端负责显示

&emsp;&emsp;目前前后端分离主要有两种方式：

① node.js 作为中间层进行全栈式的开发

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220622183858.png" width=572px />

② 前后端通过约定的数据接口进行通信，以相同的数据格式如 JSON 格式进行数据传输

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220622190548.png" width=280px />

## 二、服务端渲染（SSR）

### 1、art-template

官网介绍：

> art-template 是一个简约、超快的模板引擎。

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220616102333.png" width=683.7px />

特性：

- 支持 Express、Koa、Webpack
- ……

### 2、ejs

安装：

```sh
npm i ejs
```

配置：

- index.js

```js
// 配置模板引擎
app.set('views', './views')
app.set('view engine', 'ejs')
```

简单示例：

- route/registryRouter.js

```js
const express = require('express')

// 创建✨router实例
const route = express.Router()

route.get('/registry/test', (req, res) => {
  // res.send('<p>欢迎你，新用户！！</p>')

  // 不再使用res.send改用模板引擎🚩：res.render
  res.render('registry_view')
})

module.exports = route
```

- views/registry_view.ejs

```html
<html>
  <body>
    <p>欢迎你，新用户！！</p>
  </body>
</html>
```

## 三、ejs 语法：

### 1、输出标签（<%= %> 或者 <%- %>）

代码演示：

- route_demo.js

```js
route.get('/registry/test', (req, res) => {
  res.render('registry_view', { username: 'lencamo', msg: '<h2>首页</h2>' })
})
```

- demo_view.ejs

```html
<!-- 带解析 -->
<p><%- username %>！！</p>
<!-- 不带解析 -->
<p>欢迎你，<%= username %>！！</p>
```

登录案例演示：

- loginRouter.js

```js
route.get('/login', (req, res) => {
  res.render('login_view', { isShow: false })
})

route.post('/login/validate', (req, res) => {
  if (req.body.username === 'lencamo' && req.body.password === '123') {
    console.log('登录成功!')

    // 重定向✨
    res.redirect('/home')
  } else {
    console.log('登录失败!')

    // res.redirect('/login')
    // 或者
    res.render('login_view', { isShow: true })
  }
})
```

- login_view.ejs

```html
<body>
  <p>请登录</p>

  <form action="/login/validate" method="POST">
    <div>用户名：<input type="text" name="username" /></div>
    <div>密码：<input type="password" name="password" /></div>
    <div><input type="submit" value="登录" /></div>
  </form>

  <p><%= isShow?'用户名密码错误！':'' %></p>
</body>
```

### 2、流程控制标签（<% %>）

- homeRouter.js

```js
route.get('/login', (req, res) => {
  var people = ['geddy', 'neil', 'alex']
  res.render('home_view', { people: people })
})
```

- home_view.ejs

```html
<body>
  home-页面

  <ul>
    <% for(var i=0;i<list.length;i++){ %>
      <li></li>
    <% } %>
  </ul>
</body>
```

### 3、注释标签<%# %>

&emsp;&emsp;特点，改注释不会在页面中被渲染展示。

### 4、导入公共模板内容

> <%-include('header.ejs') %>

- home_view.ejs

```html
<body>
  <%-include('./header_view.ejs',{ isShowTitle: false }) %>
</body>
```

- header_view.ejs

```html
<header>
  <span>首页</span>

  <% if(isShowTitle) {%>
  <span>校园招聘</span>
  <% } %>
</header>
```
