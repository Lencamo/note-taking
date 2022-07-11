### 路由

&emsp;&emsp;前面我们讲过使用 vue-cli 创建的项目本质上讲是一个 SPA（单页面）项目，而不同页面之间的切换，就需要通过 <span style="background-color: yellow;color:black">前端路由</span> 来实现。

官方介绍：

> [Vue Router](https://v3.router.vuejs.org/zh/) 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。

&emsp;&emsp;通俗的理解就是：<span style="color: green;">Hash 地址</span>（锚链接）与<span style="color: green;">组件</span>之间的<span style="color: red;">对应关系</span>。

类似效果：

- 锚链接测试.html

```html
<head>
  <style>
    .footer {
      position:fixed;
    }
  <style>
</head>

<body>
  <!-- 底部的页面切换部分 -->
  <div class="footer">
    <a href="#Home">首页</a>
    <a href="#Cart">购物车</a>
    <a href="#Search">搜索</a>
  </div>

  <!-- 不同的页面 -->
  <div id="Home"><div>
  <div id="Cart"><div>
  <div id="Search"><div>
</body>
```

&emsp;&emsp;锚链接的特点 —— 在地址栏上有浏览历史

> 打印地址 ：<br/>&emsp;&emsp;location.href、location.hash

## 一、前端路由

### 1、工作方式

- 点击页面的路由链接
- URL 地址栏中的 Hash 值变化
- 前端路由监听到 Hash 地址变化
- 将当前 Hash 地址对应的组件渲染到浏览器中

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220608082202.png" width=560px />

### 2、简单实现

- App.vue

```html
<template>
  <div class="app-container">
    <div class="footer">
      <a href="#Home">首页</a>
      <a href="#Cart">购物车</a>
      <a href="#Search">搜索</a>
    </div>

    <hr/>

    <!-- <Home></Home> -->
    <!-- <Cart></Cart> -->
    <!-- <Search></Search> -->

    <!-- 使用动态组件 -->
    <component :is="comp_Name"></component>
  <div>
</template>

<script>
  import Home from '@/components/Home.vue'
  import Cart from '@/components/Cart.vue'
  import Search from '@/components/Search.vue'

  export default {
    name: 'Test',
    data() {
      return {
        comp_Name: 'Home'
      }
    },
    components: {
      Home,
      Cart,
      Search
    },
    created() {
      // 监听🚩hash值变化
      window.onhashchange = () => {
        switch(location.hash) {
          case '#/home':
            this.comp_Name = 'Home'
            break
          case '#/cart':
            this.comp_Name = 'Cart'
            break
          case '#/search':
            this.comp_Name = 'Search'
            break
        }
      }
    }
  }
</script>
```

## 二、vue-router

&emsp;&emsp;通过上面的案例，我们发现手动配置编写路由，十分笨拙，此时就可以使用 vue-router 来简化开发。

### 1、安装

```sh
npm i vue-router@3.5.2 -S
```

### 2、配置

① 创建路由模块

> 新建文件：src/router/index.js

- index.js

```js
// 1、导包
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2、将VueRouter安装为Vue插件
Vue.use(VueRouter)

// 3、创建路由实例
const router = new VueRouter()

// 4、向外共享路由的实例对象
export default router
```

② 导入并挂载路由

main.js

```js
import Vue from 'vue'
import App from './App.vue'

// 导入路由模块（拿到实例对象router）
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),

  // 挂载✨路由模块
  // 其中：(router: router) 可以简写为：
  router
}).$mount('#app')
```

拓展：

> 在以前 node.js 的学习中，我们知道进行模块化导入的时候，路径是可以简写的

```js
// 导入路由模块（拿到实例对象router）
import router from '@/router'
```

### 3、使用 🚩

&emsp;&emsp;上面的安装、配置的步骤，其实在使用 vue-cli 创建 vue 项目的时候都会自动生成的 😂，不用自己手动编写。

- router 文件夹下的 index.js（自动生成）

```js
// 1、导入组件
import Home from '@/components/Home.vue'
import Cart from '@/components/Cart.vue'
import Search from '@/components/Search.vue'

// 2、配置路由实例
const router = new VueRouter({
  // routes是一个数组：用来定义🚩“hash地址”与“组件”之间的对应关系
  routes: [
    // 路由规则
    { path: '/home', component: Home },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search }
  ]
})
```

- App.vue

```html
<template>
  <div class="app-container">
    <div class="footer">
      <a href="#Home">首页</a>
      <a href="#Cart">购物车</a>
      <a href="#Search">搜索</a>
    </div>

    <hr />

    <!-- 使用动态组件 -->
    <!-- <component :is="comp_Name"></component> -->

    <!-- 直接使用vue-router的 router-view🚩组件即可（起占位作用） -->
    <router-view></router-view>
  <div>
</template>
```

升级改造（专业写法）：

- App.vue

```html
<template>
  <div class="app-container">
    <!-- <div class="footer">
      <a href="#Home">首页</a>
      <a href="#Cart">购物车</a>
      <a href="#Search">搜索</a>
    </div> -->

    <!-- 使用 router-link 来代替 普通的 a 链接 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/cart">购物车</router-link>
    <router-link to="/search">搜索</router-link>

    <hr />

    <!-- 直接使用vue-router的 router-view🚩组件即可（起占位作用） -->
    <router-view></router-view>
  <div>
</template>
```

### 4、重定向

&emsp;&emsp;在前面我们使用 vue-router 的时候，我们发现即使我们没有使用`#/`，在地址栏也会自动帮我们生成。

- router 文件夹下的 index.js（自动生成）

```js
// 1、导入组件
import Home from '@/components/Home.vue'

// 2、配置路由实例
const router = new VueRouter({
  routes: [
    // 重定向✨
    { path: '/', redirect: '/home' },
    // 路由规则
    { path: '/home', component: Home }
  ]
})
```

## 三、vue-router 与 嵌套路由

&emsp;&emsp;什么是嵌套路由？如图所示：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220608112136.png" width=228px />

### 1、代码演示

- App2.vue（一级路由）

```html
<template>
  <div class="app2-container">

    <router-link to="/home">首页</router-link>
    <router-link to="/cart">购物车</router-link>
    <router-link to="/about">关于</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```

- About.vue（二级路由）

```html
<template>
  <div class="about-container">

    <router-link to="/about/tab1">tab1</router-link>
    <router-link to="/about/tab2">tab2</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```

- router 文件夹下的 index.js（自动生成）

```js
// 1、导入组件
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'

// 2、配置路由实例
const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/home' },
    // 路由规则
    { path: '/home', component: Home },
    // 嵌套路由
    {
      path: '/about',
      component: About,
      children: [
        // 注意二级路由是✨不用加'/'的
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})
```

### 2、二级路由的重定向

即：设置二级路由 router-view 组件的默认显示页面

```js
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: Search,
      // 二级路由的重定向
      redirect: '/search/tab1',
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})
```

### 2、默认子路由

&emsp;&emsp;上面用重定向的方式设置二级路由 router-view 组件的默认显示页面，显然可能有点复杂。先对其升级如下：

- index.js

```js
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: Search,
      children: [
        // 将Tab1设置为默认✨子路由
        { path: '', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    }
  ]
})
```

- Search.vue（二级路由）

```html
<template>
  <div class="about-container">

    <!-- 注意这里省略了`/tab1` -->
    <router-link to="/search">tab1</router-link>
    <router-link to="/search/tab2">tab2</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```
