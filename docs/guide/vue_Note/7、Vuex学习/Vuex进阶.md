### Vuex：

官方介绍：

> [Vuex](https://v3.vuex.vuejs.org/zh/) 可以帮助我们<span style="color: red;">管理共享状态（数据）</span>，并附带了更多的概念和框架。


## 一、插件

&emsp;&emsp;Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数。

### 1、简单示例

- router/index.js

```js
// 2、插件功能
const myPlugin = (store) => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}

// 1、插件使用
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

### 2、应用：Vuex 数据持久化存储 ✨

#### ① 方式一：原生代码

```js
const myPlugin = (store) => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    localStorage.setItem('store', JSON.stringify(state)) //因为vuex都是通过mutation来修改数据的，所以在每次修改的时候都把state存到本地内存中
  })
}
```

#### ② 方式二：包

> vuex 的插件包叫做`vuex-persistedstate@3.2.1`版本(配合 vue2 使用, 默认最新版是配合 vue3 使用)

下载：

```sh
yarn add vuex-persistedstate@3.2.1
```

简单示例：

```js
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // ...
  plugins: [createPersistedState()]
})
```

相关配置（下面演示的全部为默认值）：

```js
/* vuex数据持久化配置 */
plugins: [
  createPersistedState({
    // 存储方式：localStorage、sessionStorage、cookies
    storage: window.localStorage,
    // 存储的 key 的key值
    key: 'vuex',
    path: []
    render(state) {
      // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
      return { ...state }
    }
  })
]
```

模块化数据存储：

- router/modules/userStore.js

```js
export const dataStore = {
  state: {
    data: []
  }
}
```

- router/index.js

```js
import { userStore } from './userStore'

const dataState = createPersistedState({
  paths: ['data']
})

export default new Vuex.Store({
  modules: {
    dataStore
  },
  plugins: [userStore],
  reducer(state, paths) {
    return {
      // 只储存state中的user
      user: state.userInfo //只存储userInfo信息并且在localStorage中userInfo命名替换成user
    }
  }
})
```
