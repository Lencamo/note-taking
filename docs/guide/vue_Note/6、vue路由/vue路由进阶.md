### Vue Router：

> [Vue Router](https://v3.router.vuejs.org/zh/) 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。、

## 一、导航守卫

&emsp;&emsp;在 <span style="color:red">Vue Router</span> 基础部分我们已经了解了<span style="color:green">全局前置守卫</span>，当然导航守卫不仅仅局限于它一个。

### 1、全局前置守卫

- router/index.js（从 路径 角度）

```js
// 白名单页面
const whiteList = ['/login', '/reg']

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    let token = localStorage.getItem('Authorization')

    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
```

或者：

- router/index.js（从 token 角度）

```js
// 无需验证token的页面
// 【因为登录、注册页面也没有token，根据全局前置守卫的定义不做白名单处理，会一直处于跳转——触发——跳转循环中】
const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  // 和前面获取token的方式相比，其实vuex🚩默认也是从Application中取的
  const token = $store.state.token

  // 如果有token, 证明已登录
  if (token) {
    next()
  } else {
    // 白名单✨页面放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }

  next()
})
```

### 2、全局解析守卫

### 3、全局后置钩子

### 4、路由独享守卫

### 5、组件内的守卫

## 二、路由懒加载

官方描述：

> 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。

> 如果我们能把不同路由对应的组件分割成不同的代码块，然后<span style="color:green">当路由被访问的时候才加载对应组件</span>，这样就会更加高效。

使用：

&emsp;&emsp;Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入。

```js
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const Login = () => import('./views/Login')

const router = createRouter({
  // ...
  routes: [{ path: '/login', component: Login }]
})
```

代码升级：

```js
const router = createRouter({
  // ...
  routes: [{ path: '/login', component: () => import('./views/Login') }]
})
```
