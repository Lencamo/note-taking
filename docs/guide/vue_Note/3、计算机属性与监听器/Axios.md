## 一、async/await 与 axios

async/await 的用处就是： 用同步方式，执行异步操作

### 1、axios 发起 GET 请求

```html
<body>
  <button id="btnGET">发起get请求</button>

  <script src="./lib/axios.min.js"></script>
  <script>
    document
      .querySelector('#btnGET')
      .addEventListener('click', async function () {
        const { data: res } = await axios({
          method: 'GET',
          url: 'http://www.liulongbin.top:3006/api/getbooks',

          //get请求url中的查询参数 —— ✨params
          params: { id: 1 }
        })
        // }).then(function (result) {
        //   console.log(result);
        // });

        console.log(res)
      })
  </script>
</body>
```

```js
const { data: res } = await axios.get(
  'http://www.liulongbin.top:3006/api/getbooks',
  {
    //get请求url中的查询参数 —— ✨params
    params: { id: 1 }
  }
)
```

### 2、axios 发起 POST 请求

```html
<body>
  <button id="btnPOST">发起post请求</button>

  <script src="./lib/axios.min.js"></script>
  <script>
    document
      .querySelector('#btnPOST')
      .addEventListener('click', async function () {
        const { data: res } = await axios({
          method: 'POST',
          url: 'http://www.liulongbin.top:3006/api/post',

          //post请求：请求体参数 —— ✨data
          data: {
            name: 'zs',
            age: 20
          }
        })
        // }).then(function (result) {
        //   console.log(result);
        // });

        console.log(res)
      })
  </script>
</body>
```

```js
const { data: res } = await axios.post(
  'http://www.liulongbin.top:3006/api/post',
  {
    //post请求：请求体参数 —— ✨[data]可以省略
    name: 'zs',
    age: 20
  }
)
```

### 3、总结

> 如果调用某个方法的返回值是`Promise实例`，则前面可以添加 <span style="background-color:yellow;color: black">await</span>；并且使用 await 时要确保它在`async`修饰的方法中。

① axios 请求：

axios 方法得到的返回值是 🚩Promise 对象

> 【{data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…}, …}】

② 若不加 await

则返回的是`Promise {<pending>}`

③ 解构赋值：

上面的演示案例中，使用了解构赋值来获得指定的 响应内容。

- 解构赋值的重命名

```js
//这里的data属性被重命名为res
const { data: res } = await axios{}

console.log(res.data)
```

## 二、Vue 与 axios 详解

### 1、安装 axios：

```sh
npm i axios -S
```

### 2、使用 axios

> 其实和上面的案例大差不差

① 常规的方式

```html
<template>
  <div class="test-container">
    <button @click="axios_get">发起get请求<button>

    <button @click="axios_post">发起post请求<button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    methods: {
      async axios_get() {
        const { data: res1 } = await axios.get("http://www.liulongbin.top:3006/api/getbooks", {
          //get请求url中的查询参数 —— ✨params
          params: { id: 1 },
        });

        console.log(res1)
      },


      async axios_post() {
        const { data: res2 } = await axios.post("http://www.liulongbin.top:3006/api/post", {
          //post请求：请求体参数 —— ✨[data]可以省略
          name: "zs",
          age: 20,
        });

        console.log(res2)
      }
    }
  }
</script>
```

② axios 导入升级

> 挂载为共享成员

- main.js

```js
import axios from 'axios'

// 将axios挂载到Vue🌈原型上
// Vue.prototype.axios = axios
// 屌丝写法：
Vue.prototype.$http = axios
```

经过上面的操作，后面组件使用 axios 时，就不用单独导入了，自己使用`this.$http.xxx`即可

- 任意组件

```html
<script>
  export default {
    methods: {
      async axios_get() {
        const { data: res1 } = await this.$http.get(
          'http://www.liulongbin.top:3006/api/getbooks',
          {
            params: { id: 1 }
          }
        )

        console.log(res1)
      },

      async axios_post() {
        const { data: res2 } = await this.$http.post(
          'http://www.liulongbin.top:3006/api/post',
          {
            name: 'zs',
            age: 20
          }
        )

        console.log(res2)
      }
    }
  }
</script>
```

③ 接口路径升级

> 挂载共享成员

- main.js

```js
import axios from 'axios'

// 全局配置axios的请求🌈根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
Vue.prototype.$http = axios
```

经过上面的操作，后面组件使用 axios 时，就连根路径都不用写了

- 任意组件

```html
<script>
  export default {
    methods: {
      async axios_get() {
        const { data: res1 } = await this.$http.get('/api/getbooks', {
          params: { id: 1 }
        })

        console.log(res1)
      },

      async axios_post() {
        const { data: res2 } = await this.$http.post('/api/post', {
          name: 'zs',
          age: 20
        })

        console.log(res2)
      }
    }
  }
</script>
```

## 三、Axios 拦截器

作用：

- 在请求或响应被 then 或 catch 处理前拦截它们。

图解：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220710175238.png" width=442px /><br/>

```js
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    ……
    // 【config】🚩为axios配置对象（请求后台的参数都在这个对象上）
    console.log(config)

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // 打印错误🚩信息
    console.dir(error)

    return Promise.reject(error)
  }
)
```

- 移除拦截器

```js
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
})
axios.interceptors.request.eject(myInterceptor)
```

- 给自定义的 axios 实例添加拦截器

```js
const instance = axios.create()
instance.interceptors.request.use(function () {
  /*...*/
})
```

## 四、Axios 实例

&emsp;&emsp;在项目中，为了便于开发，往往我们使用是<span style="color:red">创建 axios 实例</span> 的方式，而不是使用上面的 <span style="color:green">axios 全局配置</span> 的方式。

- utils/axios-instance.js

```js
import axios from 'axios'

// 自定义配置新建一个axios实例
const reqAxios = axios.create({
  baseURL: 'http://www.liulongbin.top:3006',
  timeout: 1000
  // 【其他更多的配置参考axios官网】
})

// 导出自定义的axios方法, 供外面调用传参发请求
export default reqAxios
```

- api/index.js

```js
import reqAxios from '@/utils/axios-instance.js'

// 接口请求测试
export const getDemoAPI = () => {
  return reqAxios({
    method: 'GET',
    url: '/api/getbooks',

    // get请求url中的查询参数 —— ✨params
    params: { id: 1 }
  })
}
```

- 任意组件（使用）

```js
<script>
import { getDemoAPI } from '@/api/index.js'
export default {
  created() {
    this.getDemoFn()
  },
  methods: {
    async getDemoFn() {
      const { data: res } = await getDemoAPI()
      console.log(res)
    }
  }
}
</script>
```
