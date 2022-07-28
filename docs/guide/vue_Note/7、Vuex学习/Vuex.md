### 数据共享

&emsp;&emsp;我们在学习 vue 的时候，可以知道要想实现<span style="color: green;">数据间的数据共享</span>，常见的有下面的几种方式：

- v-bind 属性绑定
- v-on 事件绑定
- EventBus

&emsp;&emsp;但我们发现：当开发大型单页面应用时，我们需要大范围、频繁的使用数据共享，上述的方案显然就力不从心了。

## 一、状态管理模式

### 1、单向数据流

```js
new Vue({
  // state
  data() {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment() {
      this.count++
    }
  }
})
```

图示：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220709151119.png" width=340px />

缺点：

> 当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏

解决办法：

### 2、全局单例模式管理

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220709151441.png" width=467px />

## 二、Vuex

官方介绍：

> [Vuex](https://v3.vuex.vuejs.org/zh/) 可以帮助我们<span style="color: red;">管理共享状态（数据）</span>，并附带了更多的概念和框架。

概念：

> 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。

&emsp;&emsp;简单的来说，就是 Vuex 是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。

效果演示：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220608204642.png" width=485px />

使用范围 ✨：

&emsp;&emsp;一般情况下，存储到 vuex 中的数据是组件间的共享数据；对于组件中私有数据，存储在组件自身的 data 中即可。

### 1、安装

```sh
npm i vuex -S
```

### 2、配置

> 新建文件：src/store/index.js

① 创建 vuex 模块

- index.js

```js
// 1、导包
import Vue from 'vue'
import Vuex from 'vuex'

// 2、将Vuex安装为Vue插件
Vue.use(Vuex)

// 3、创建vuex实例
const store = new Vuex.Store()

// 4、向外共享路由的实例对象
export default store
```

② 导入并挂载 vuex

main.js

```js
import Vue from 'vue'
import App from './App.vue'

// 导入路由模块（拿到实例对象router）
import store from '@/store/index.js'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),

  // 挂载✨路由模块
  // 其中：(store: store) 可以简写为：
  store
}).$mount('#app')
```

拓展：

> 在以前 node.js 的学习中，我们知道进行模块化导入的时候，路径是可以简写的

```js
// 导入路由模块（拿到实例对象router）
import store from '@/store'
```

### 3、使用

&emsp;&emsp;同创建 vue-router 路由一样，使用 vue-cli 创建 SPA 项目以后，会自动生成相关文件 😂，不用自己手动编写。

&emsp;&emsp;Vuex 中的主要核心概念如下：

- State
- Mutation
- Action
- Getter

&emsp;&emsp;下面学习 Vuex 核心概念时，有两种实现方式。

个人使用情况：

- 若在组件中使用时推荐方法二
- 若在其他地方使用推荐方式一

## 三、核心概念

### 1、State

&emsp;&emsp;State 提供唯一的公共数据源，用于<span style="color:red">存储</span>共享数据。

配置

- index.js

```js
const vuex = new Vuex.Store({
  state: {
    count: 0
  }
})
```

访问方式 1

- Addition.vue

```html
<template>
  <!-- 使用✨数据 -->
  <p>当前最新的count值为：{{ $store.state.count }}</p>

  <button @click="add_Handler">+1</button>
</template>
```

访问方式 2

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ count }}</p>

  <button @click="add_Handler">+1</button>
</template>

<script>
  // 从vuex中按需导入🚩函数
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['count'])
    }
  }
</script>
```

### 2、Mutation

&emsp;&emsp;Mutation 用于<span style="color:red">变更</span>Store 中的数据。

> 注意点：mutation 必须是同步函数

配置

- index.js

```js
const vuex = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // 1、不带参
    add(state) {
      state.count++
    },

    // 2、带参
    // addN(state, step) {
    //   state.count += step
    // },
    // 大多数情况下，载荷应该是一个✨对象
    addN(state, payload) {
      state.count += payload.step
    }
  }
})
```

访问方式 1

&emsp;&emsp;通过调用<span style="color:green">commit 函数</span>，来触发 mutations，进而改变数据。

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ $store.state.count }}</p>

  <button @click="add_Handler1">+1</button>
  <button @click="add_Handler2">+N</button>
</template>

<script>
  export default {
    methods: {
      add_Handler1() {
        // 变更数据✨
        this.$store.commit('add')
      },

      add_Handler2() {
        // 变更数据✨
        // this.$store.commit('addN', 3)
        this.$store.commit('addN', { step: 3 })
      }
    }
  }
</script>
```

访问方式 2

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ count }}</p>

  <button @click="add_Handler1">+1</button>
  <button @click="add_Handler2">+N</button>
</template>

<script>
  // 从vuex中按需导入🚩函数
  import { mapState, mapMutations } from 'vuex'

  export default {
    // 1、使用✨数据时
    computed: {
      ...mapState(['count'])
    },
    // 2、变更✨数据时
    methods: {
      ...mapMutations(['add', 'addN']),

      add_Handler1() {
        this.add()
      },
      add_Handler2() {
        // this.addN(3)
        this.addN({ step: 3 })
      }
    }
  }
</script>
```

### 3、Action

&emsp;&emsp;Action 类似于 Mutation

不同的是：

- Action 可以包含任意<span style="background-color:yellow;color:black">异步操作</span>。
- 若使用 Action <span style="color:red">变更</span>数据，需要通过触发 Mutation 的方式间接变更数据。

> 不建议在 mutation 函数中执行异步操作

配置

- index.js

```js
const vuex = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    },
    addN(state, step) {
      state.count += step
    }
  },
  actions: {
    // 延时
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addNAsync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    }
  }
})
```

访问方式 1

&emsp;&emsp;通过调用 <span style="color:green">dispatch 函数</span>，来触发 action，进而间接改变数据。

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ $store.state.count }}</p>

  <button @click="add_Handler3">+1 Async</button>
  <button @click="add_Handler4">+N Async</button>
</template>

<script>
  export default {
    methods: {
      add_Handler3() {
        // 变更数据✨
        this.$store.dispatch('addAsync')
      },
      add_Handler4() {
        // 变更数据✨
        this.$store.dispatch('addAsyncN', 3)
      }
    }
  }
</script>
```

访问方式 2

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ count }}</p>

  <button @click="add_Handler3">+1 Async</button>
  <button @click="add_Handler4">+N Async</button>
</template>

<script>
  // 从vuex中按需导入🚩函数
  import { mapState, mapActions } from "vuex";

  export default {
    // 1、使用✨数据时
    computed: {
      ...mapState(["count"]),
    },
    // 2、变更✨数据时
    methods: {
      ...mapActions(['addAsync','addNAsync'])

      add_Handler3() {
        this.addAsync();
      },
      add_Handler4() {
        this.addNAsync(3);
      },
    },
  };
</script>
```

#### 应用场景：—— 数据请求

```js
import { getUserInfoAPI } from '@/api'

export default new Vuex.Store({
  state: {
    userInfo: {} // 定义用户信息对象
  },
  mutations: {
    // 更新用户的信息
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    async initUserInfo(store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  }
})
```

### 4、Getter

&emsp;&emsp;Getter 用于对 Store 中的数据进行<span style="color:red">加工处理（包装）</span>形成新的数据，类似于 vue 中的计算属性。

配置

- index.js

```js
const vuex = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    msgNum: (state) => {
      return '当前最新的数据为：' + state.count + ''
    }
  }
})
```

方式 1

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ $store.state.count }}</p>

  <p>{{$store.getters.msgNum}}</p>
</template>
```

访问方式 2

- Addition.vue

```html
<template>
  <p>当前最新的count值为：{{ count }}</p>

  <p>{{ msgNum }}</p>
</template>

<script>
  // 从vuex中按需导入🚩函数
  import { mapState, mapGetters } from 'vuex'

  export default {
    // 1、使用✨数据时
    computed: {
      ...mapState(['count']),
      ...mapGetters(['msgNum'])
    }
  }
</script>
```
