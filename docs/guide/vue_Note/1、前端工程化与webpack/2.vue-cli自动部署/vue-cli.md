### Vue CLI

官方简介：

> [vue-cli](https://cli.vuejs.org/zh/) 是 Vue.js 开发的标准工具。程序员可以专注在撰写应用上，而不必花好几天去纠结配置的问题。

## 一、vue-cli 项目开发

### 1、起步

```sh
# 1、安装
npm i @vue/cli -g

# 2、使用（项目名不能有大写字母）
vue create <projectName>

# 3、运行
cd <projectName>
npm run serve
```

构建项目：

- 默认构建(Default)

> babel、eslint

- 自定义构建(Manually select features)

> (\*) Babel&emsp;&emsp;<span style="color: skyblue;">兼容性</span>

> ( ) TypeScript&emsp;&emsp;<span style="color: skyblue;">TS</span>

> ( ) Progressive Web App (PWA) Support

> ( ) Router&emsp;&emsp;<span style="color: skyblue;">路由</span>

> ( ) Vuex&emsp;&emsp;<span style="color: skyblue;">Vuex</span>

> (\*) CSS Pre-processors&emsp;&emsp;<span style="color: skyblue;">预处理器</span>

> ( ) Linter / Formatter&emsp;&emsp;<span style="color: skyblue;">代码格式校验</span>

> ( ) Unit Testing

> ( ) E2E Testing

【 ↑ ↓ 选择、空格键选中、Ent 键下一步】

### 2、结构

```sh
vue-cli-demo
├─ .gitignore
├─ node_modules
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html🤔
├─ README.md
├─ src
│  ├─ App.vue🤔（根组件）
│  ├─ assets（项目的静态资源文件夹）
│  │  └─ logo.png
│  ├─ components（vue组件文件夹）
│  │  └─ HelloWorld.vue
│  └─ main.js🚩（入口文件）
└─ vue.config.js
```

### 3、打包发布

&emsp;&emsp;通过`npm run serve`运行项目发现其效果类似于 webpack 中的 <span style="background-color: yellow;color:black">webpack-dev-server</span> 辅助插件。

```js
{
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
}
```

注意：

&emsp;&emsp;之前使用 webpack 时，开发环境中打包使用的是`dev脚本`而不是`serve脚本`

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220718152431.png" width=547px />

① 打包升级 1 —— dist 文件项目预览：

> 不使用 publicPath, 打包的项目必须保证 dist 的内容在服务器的根目录

- vue.config.js

```js
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
})
```

② 打包升级 2 —— CDN 减小包体积（dist 瘦身）

> 更多的 vue-cli 配置可以参考：https://cli.vuejs.org/zh/config/

&emsp;&emsp;推荐一个免费的 CDN 网站：https://unpkg.com/

```sh
unpkg.com/:package@:version/:file
```

配置：

- vue.config.js

```js
// 一、不使用下载的第三方包（production环境下、external有值）
let externals = {}

// 二、使用CDN上的第三方包（production环境下、使用CDN地址）
let CDN = { css: [], js: [] }

// 生产环境判断
if (process.env.NODE_ENV === 'production') {
  externals = {
    // 基本格式：
    // '包名' : '在项目中引入的名字'
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-ui': 'ELEMENT' // cdn里的源代码配置💖在ELEMENT这个变量
    // （一定要去修改掉引入Element用的变量名, 这里要匹配ELEMENT去替换）
    // ……
  }
  CDN = {
    css: [
      'https://unpkg.com/element-ui@2.15.8/lib/theme-chalk/index.css'
      // ……
    ],
    js: [
      // vue must at first!
      'https://unpkg.com/vue@2.6.14/dist/vue.js',
      'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js',
      'https://unpkg.com/vuex@3.6.2/dist/vuex.js',
      'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
      'https://unpkg.com/element-ui@2.15.8/lib/index.js'
      // ……
    ]
  }
}

module.exports = defineConfig({
  // 需要排除的包对象
  configureWebpack: {
    externals: externals
  },
  // 需要配置的 CDN 链接
  chainWebpack(config) {
    // 注入cdn变量 (打包时会执行)
    config.plugin('html').tap((args) => {
      args[0].cdn = CDN // 配置 CDN 给插件
      return args
    }) // 省略其他...
  }
})
```

- public/index.html

```html
<head>
  <!-- 1、引入CDN的css链接 -->
  <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
  <link rel="stylesheet" href="<%=css%>" />
  <% } %>
  <!-- …… -->
</head>
<body>
  <!-- 2、引入CDN的js链接 -->
  <!-- built files will be auto injected -->
  <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
  <script src="<%=js%>"></script>
  <% } %>
  <!-- …… -->
</body>
```

### 4、运行流程 ✨

&emsp;&emsp;通过入口文件 —— <span style="color: red;">main.js</span>把<span style="color: green;">App.vue</span>渲染到<span style="color: green;">index.html</span>的指定区域中。

① main.js

&emsp;&emsp;将根组件 App.vue 的结构覆盖到 index.html 默认的`<div id="app"></div>` —— render 属性。

```js
// 1、导vue包
import Vue from 'vue'
// 2、导App.vue根组件
import App from './App.vue'

Vue.config.productionTip = false

// 通过main.js把🌈App.vue渲染到index.html的指定区域中('#app')。
new Vue({
  el: '#app',
  render: (h) => h(App)
})
```

其中`el: '#app'`也可以写成：

```js
new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

- 拓展应用：

```html
<div id="app">{{username}}</div>

<script>
  const vm = new Vue({
    data: {
      username: 'zhangsan'
    }
  })

  vm.$mount('#app')
</script>
```

② index.html

```html
<body>
  <!-- 1、App.vue组件内容会将其覆盖 -->
  <div id="app"></div>

  <!-- 2、将所需要的css、js等等文件自动注入 -->
  <!-- built files will be auto injected -->
</body>
```

&emsp;&emsp;通过右键查看源码，可以发现页面自动注入了打包生成的 js 文件，类似于 webpack 中的 <span style="background-color: yellow">html-webpack-plugin</span> 辅助插件。

```html
<script defer src="/js/chunk-vendors.js"></script>
<script defer src="/js/app.js"></script>
```

思考？

> 如果生成的 js 文件中包含 new Vue 实例 🤔

③ vue 组件

- App.vue

```html
<template>
  <div id="app">
    <!-- 嵌入HelloWorld.vue组件 -->
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
</script>
```

- components 文件夹下的 HelloWorld.vue

```html
<template>
  <p>调用了HelloWorld组件</p>
</template>

<script>
  export default {
    name: 'HelloWorld'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
```

## 二、vue 的工程化开发

### 1、工程化

&emsp;&emsp;我们在学习 vue 指令的时候写的“ <span style="color: red;">品牌列表案例.html</span> ”，为了方便学习，我们只是建了<span style="color: green;">一个单纯的 html 页面</span>实现开发需求。

&emsp;&emsp;虽然也可以实现功能，但不符合项目开发的<span style="color: green;">工程化开发思想</span>，所以使用 webpack、vue-cli 的使用是必要的。

### 2、单页面应用程序（SPA）

&emsp;&emsp;是指一个 web 网站只有唯一的一个 HTML 页面，所以的功能与交互都在这唯一的一个页面完成。

- 动手实践

> 用工程化的方式重构一下 vue 指令时写的《品牌列表案例.html》
