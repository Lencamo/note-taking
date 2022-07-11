## 四、动态路由匹配

&emsp;为了提高路由规则的复用性，动态路由可以实现把 Hash 地址中可变的部分定义为参数项。

&emsp;&emsp;在 vue-router 中使用 <span style="color:red;">英文的冒号`(:)`</span> 可以用来定义路由的参数项

- index.js

```js
const router = new VueRouter({
  routes: [
    // 配置✨动态路由
    { path: '/movie:mid', component: Movie }
  ]
})
```

- App.vue

```html
<template>
  <div class="app-container">

    <router-link to="/home">首页</router-link>

    <router-link to="/movie/1">流浪地球</router-link>
    <router-link to="/movie/2">西虹市首富</router-link>
    <router-link to="/movie/3">战狼</router-link>

    <router-link to="/search">搜索</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```

> 在 index.js 中配置`mid`参数项后，其实我们在相应的 movie 组件实例中找到对应的 mid 属性。

### 1、路由的参数对象($route)

- Movie.vue（根据 id 展示不同的电影）

```html
<template>
  <div class="movie-container">
    <button @click="showThis">打印this</button>

    <!-- <p>欢迎观看电影: 《 this.$route.params.mid 》</p> -->
    <p>欢迎观看电影: {{ $route.params.mid }} </p>
  <div>
</template>

<script>
  export default {
    name: 'Movie',
    methods: {
      showThis() {
        console.log(this)
      }
    }
  }
</script>
```

### 2、路由 与 props 传参 \*

&emsp;&emsp;当然，props 传参一般存在于动态路由配置中，其他普通路由加上`props: true`是没有意义的。

特点：

> 开启了 props 传参。

- index.js

```js
const router = new VueRouter({
  routes: [
    // 配置✨动态路由，并开启props传参
    { path: '/movie:mid', component: Movie, props: true }
  ]
})
```

- Movie.vue（根据 id 展示不同的电影）

```html
<template>
  <div class="movie-container">

    <p>欢迎观看电影: {{ mid }} </p>
  <div>
</template>

<script>
  export default {
    name: 'Movie',

    // 1、接收参数
    props: ['mid'],
  }
</script>
```

### 3、路由 与 参数项

① 前面我们接触了 hash 地址中的 <span style="color: red">路径参数</span>。

> `$route.params`

- App.vue

```html
<template>
  <div class="app-container">
    <!-- 其中的 / 后面的 1 就是路径参数 -->
    <router-link to="/movie/1">流浪地球</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```

- Movie.vue

```html
<template>
  <div class="movie-container">

    <p>欢迎观看电影: {{ $route.params.mid }} </p>
  <div>
</template>
```

② 此处之外，其实还有 hash 地址中的 <span style="color: red">查询参数</span>。

> `$route.query`

- App.vue

```html
<template>
  <div class="app-container">
    <!-- 其中的 ？ 后面的 name=zs age=20 就是查询参数 -->
    <router-link to="/movie/1?name=zs age=20">阿甘正传</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```

- Movie.vue

```html
<template>
  <div class="movie-container">
    <button @click="showThis">打印this</button>

    <!-- $route.query的结果为一个对象 -->
    <p>欢迎观看电影: {{ $route.query }} </p>
  <div>
</template>
```

③ $route 的其他参数项

```html
<script>
  export default {
    name: 'Movie',
    methods: {
      showThis() {
        console.log(this)
      }
    }
  }
</script>
```

> 通过打印 this 我们可以发现：$route 的属性除了有 param、query 外，还有 fullPath、path、params 等等

以前面的案例为例：

- fullPath: 内容为（/movie/1?name=zs age=20）
- path：内容为（/movie/1）
- query：内容为（{name:"zs", age:"20"}）

## 五、导航

### 1、导航分类

&emsp;&emsp;在浏览器中:

① 声明式导航（通过<span style="color: green;">点击链接</span>实现的导航方式）

- \<a>链接
- vue 项目中的\<router-link>

② 编程式导航（通过<span style="color: green;">调用 API 方法</span>实现的导航方式）

- 常规的 location.href

### 2、vue-router 与 编程式导航

&emsp;&emsp;其实在 vue-router 中，它也提供了许多编程式导航 API，其中最常见的导航 API 有：

① this.$router.push('hash 地址')

&emsp;&emsp;跳转到指定 hash 地址，并<span style="color: red;">添加</span>一条历史记录

② this.$router.replace('hash 地址')

&emsp;&emsp;跳转到指定 hash 地址，并<span style="color: red;">替换</span>当前的历史记录

③ this.$router.go(数值 n)

&emsp;&emsp;实现导航历史的前进、后退（n 为正数——>前进几步；n 为负数——>后退几步）

### 3、路由的导航对象（$router）

&emsp;&emsp;下面我们以`$router.push`为例进行演示（其他同理）：

- App.vue

```html
<template>
  <div class="movie-container">
    <router-link to="/movie/1">流浪地球</router-link>
    <router-link to="/movie/2">西虹市首富</router-link>
    <router-link to="/movie/3">暖春</router-link>

    <hr />

    <router-view></router-view>
  <div>
</template>
```

- Movie2.vue

```html
<template>
  <div class="movie-container">
    <button @click="go_movie1">上一部</button>
    <button @click="go_movie3">下一部</button>
  <div>
</template>

<script>
  export default {
    name: 'Movie',
    methods: {
      go_movie1() {
        // 通过编程式🚩导航API的方式跳转到指定页面
        this.$router.push('/movie/1')
      }
      go_movie2() {
        // 通过编程式🚩导航API的方式跳转到指定页面
        this.$router.replace('/movie/3')
      }
    }
  }
</script>
```

### 4、拓展：

> 在实际开发中，一般只会前进和后退一步。因此可以简写为：
> ① `$router.back()`
> ② `$router.forward()`

```html
<template>
  <div class="movie-container">
    在行内✨使用编程式导航时，this必须省略（不然会报错）
    <button @click="$router.back()">后退</button>
  <div>
</template>
```

## 六、导航守卫

&emsp;&emsp;导航守卫可以控制路由的访问权限。示意图如下：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220608174713.png" width=676px />

&emsp;&emsp;每✨一次在<span style="background-color: yellow;color:black">路由中发生导航跳转时</span>，都会触发<span style="color: red">全局前置守卫</span>，通过它可以对每一个路由进行访问权限的控制。

> 下面以全局前置守卫为例，进行初步学习。

### 1、配置

&emsp;&emsp;回到第一次接触 vue-router 时的地方：

- index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter()

// 设置全局前置守卫
router.beforeEach((to, from, next) => {
  // 放行限制（下面表示放行）
  next()
})
export default router
```

参数解析：

- to
- from
- next

```js
router.beforeEach((to, from, next) => {
  // to表示将要访问的路由信息对象
  console.log(to)

  // from表示将要离开的路由信息对象
  console.log(from)
})
```

### 2、案例演示

&emsp;&emsp;如下图所示，next 函数的 3 种调用方式最终会导致不同的结果：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220608190639.png" width=713px />

① 代码演示：

- index.js

```js
import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'

// 路由规则
const router = new VueRouter({
  routes: [
    { path: '/main', component: Main },
    { path: '/login', component: Login }
  ]
})

// 设置全局前置守卫
router.beforeEach((to, from, next) => {
  // 放行🚩限制（若访问地址包含/main，则需要验证其是否登录）
  // 1、是否包含/main
  if (to.path === '/main') {
    const token = localStorage.getItem('token')
    // 2、是否有token
    if (token) {
      next() //访问后台主页且有token，直接放行
    } else {
      next('/login') //没有登录，强制转到登录页面
    }
  } else {
    next() // 访问的不是后台主页，直接放行
  }
})
export default router
```

- Home.vue（首页）

```html
<template>
  <div class="app-container">
    <router-link to="/main">访问后台主页</router-link>

    <hr />

    <router-view></router-view>
  </div>
</template>
```

- Main.vue（后台）

```html
<template>
  <div class="main-container">
    <p>欢迎来到Main.vue后台页面！！！</p>
  </div>
</template>
```

- Login.vue（登录）

```html
<template>
  <div class="login-container">
    <p>请登录：</p>
  </div>
</template>
```

② 思考

&emsp;&emsp;通过上面的案例，可以发现使用了在 Node.js 学习时接触的 <span style="background-color: yellow;color:black">JWT 认证机制</span>
