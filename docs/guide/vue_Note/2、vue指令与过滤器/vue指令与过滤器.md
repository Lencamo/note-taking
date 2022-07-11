## Vue.js

官方简介

> [Vue](https://cn.vuejs.org/) (读音 /vjuː/，类似于 view) 是一套用于<span style="color: green;">构建用户界面</span>的渐进式框架。

知识点

> vue 指令、vue 组件、路由、Vuex、vue 组件库等等

API 文档：

> 关于 vue 指令的更多信息可以查看 [API 文档](https://cn.vuejs.org/v2/api/)。

## 一、vue 特性

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220513233752.png" width=460px />

### 1、数据驱动视图（v-bind）

&emsp;&emsp;vue 会<span style="color: green;">监听数据源的变化</span>，从而<span style="color: green;">自动重新渲染</span>页面的结构。并且为<span style="color: red;">单向</span>的数据绑定。

### 2、双向数据绑定（v-model）

&emsp;&emsp;在页面表单数据值发生变化时，双向数据绑定可以在不操作 DOM 的前提下，自动把 form 数据同步到数据源中。

> 即：在网页中，form 表单负责<span style="color: green;">采集数据</span>，Ajax 负责<span style="color: green;">提交数据</span>。

### 3、MVVM 原理

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220514000028.png" width=379px />

## 二、vue 基本使用

### 前期准备

- 在项目中安装 vue.js
  > 安装方式： 下载 vue.js、CDN、npm 等等
- 在浏览器中安装 Vue Devtool 插件
  > 配置插件权限为： 允许访问文件地址、在所以网站上

### 代码体验

```html
<body>
  <!-- 1、view部分 -->
  <div id="app">
    <span>{{ username }}</span>
  </div>

  <!-- 2、ViewModel部分🚩 -->
  <script src="./lib/vue-2.6.14.js"></script>
  <script>
    const vm = new Vue({
      // DOM Listeners处理
      el: '#app',
      // Data Bindings处理
      data: {
        username: 'zhangsan'
      }
    })
  </script>
</body>
```

## 三、vue 指令

官方简介

> Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

> 指令 (Directives) 是带有 v- 前缀的特殊 attribute。

### 1、内容渲染

```html
<div id="app">
  1、纯文本 v-text
  <p v-text="text-message"></p>

  2、HTML标签字符串 v-html
  <p v-html="html-message"></p>

  3、文本插值 {{}}
  <p>{{ text-message }}</p>
</div>
```

&emsp;&emsp;即使标签内有内容，也会被 vue 指令：`v-text`、`v-html`的内容覆盖。

注意点：

- ① 使用`{{ }}`的位置只能在内容节点，不能在属性节点。
- ② 使用 v-once 可以限制渲染的次数。

#### 插值表达式

前提：简单的 js 表达式

```html
运算
<div>{{ number + 1 }}</div>

三目运算符
<div>{{ ok ? 'yes' : 'no' }}</div>

内置函数
<div>{{ message.split('').reverse().join('') }}</div>

拼接🍗
<div v-bind:id=" 'list-' + id "></div>
```

### 2、属性、事件绑定

&emsp;&emsp;属性绑定以`placeholder`属性为例，事件绑定以`onclik`事件为例。

```html
<div id="app">
  <div>{{ count }}</div>

  1、属性绑定（:）
  <input type="text" v-bind:placeholder="tips" />
  <img :src="imgsrc" alt="" />

  2、事件绑定（@）
  <button v-on:click="myFunction">点击我.</button>
  <p id="demo" @click="myFunction">点击我.</p>
</div>

<script>
  const vm = new Vue({
    el: '#app',
    data: {
      count: 0,
      tips: '请输入用户名',
      imgsrc: 'https://cn.vuejs.org/images/logo.svg'
    },
    methods: {
      myFunction() {
        this.count += 1
      }
    }
  })
</script>
```

知识回顾：

```html
<!-- 原生js事件处理  -->
<button onclick="myFunction()">点击我.</button>
```

#### ① 原生事件对象 $event \*

&emsp;&emsp;有参数时必须写上原生事件对象$event；没有参数时，可以省略直接使用 e 参数。

```html
<div id="app">
  <!-- 1、无参数时 -->
  <button @click="add()">+N</button>
  <!-- 2、有参数时 -->
  <button @click="add($event, 1)">+N</button>
</div>

<script>
  const vm = new Vue({
    el: '#app',
    methods: {
      // myFunction(e){}
      myFunction(e, n) {
        // 1、this的指向
        console.log(vm === this) //true
        // 2、默认参数e
        console.log(e)
        console.log(e.target) //表示触发事件的事件源button

        this.count += n
      }
    }
  })
</script>
```

#### ② 事件修饰符 ✨

&emsp;&emsp;在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。

- `.prevent`： 阻止默认行为

```html
<!-- 1、传统方式 -->
<div id="app">
  <a href="http://www.baidu.com" @click="myFunction">deer-sir网站</a>
</div>

<script>
  const vm = new Vue({
    el: '#app',
    methods: {
      myFunction(e) {
        e.preventDefault()
      }
    }
  })
</script>

<!-- 2、事件修饰符 -->
<div id="app">
  <a href="http://www.baidu.com" @click.prevent="myFunction">deer-sir网站</a>
</div>
```

- `.stop`：阻止事件冒泡

```html
<div id="app">
  <div id="outbox" @click="divHandler">
    <button @click.stop="btnHandler">验证是否冒泡</button>
  </div>
</div>
```

&emsp;&emsp;在<span style="background-color:yellow;color:black;"> 组件标签 </span>上绑定的所有事件（包括原始事件的名字 click、input 等等）都是自定义事件，都需要组件内的`$emit`来触发才行。

- `.native`：监听组件根元素的原生事件 ✨

应用场景：

> 若组件内不支持某个原生事件名时（通过代码测试发现），<span style="color:green">.native 可以给组件内的根标签绑定该原生事件</span>。

```html
<div id="app">
  <div class="box">
    <Son @click.native="handlerFun" @mouseover="parentMoverFun"></Son>
  </div>
</div>

<!-- 拓展：在element-ui中的<el-menu-item>组件🤔支持原生事件click -->
<el-menu-item index="3" @click="logoutFn">退出</el-menu-item>
```

#### ③ 按键修饰符

&emsp;&emsp;在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符。

常用的按键码别名：

> enter、tab、delete、esc、space、up、down、left、right

思考：

> <span style="background-color:yellow;color:black;">防抖与节流</span>

- 传统方式

```html
<!-- 当$event.key===esc时，`vm.clearInput()`会被调用 -->
<input v-on:keyup="submit" />

<script>
  const vm = new Vue({
    el: "#app",
    methods: {
      if(e.key === enter) {
          submit() {}
      }
    },
  });
</script>
```

- 使用按键修饰符

```html
<!-- 在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit" />
```

### 4、条件渲染

```html
<div id="app">
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else-if="type === 'C'">C</div>
  <div v-else>Not A/B/C</div>
</div>
```

应用场景(表单复用)：

```html
<div id="app">
  <div v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" />
  </div>
  <div v-else>
    <label>Email</label>
    <input placeholder="Enter your email address" />
  </div>
</div>
```

#### 显示与隐藏 ✨

① 实现原理：

- v-if 指令<span style="color: red;">动态的创建或移除 DOM 元素</span>，从而控制元素在页面上的显示与隐藏。
- v-show 指令会<span style="color: red;">动态的添加或移除 style="display: none;"元素样式</span>，从而控制元素在页面上的显示与隐藏。

② 性能消耗

&emsp;&emsp;&emsp;v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此:

- 如果需要非常频繁地切换，则使用 `v-show` 较好
- 如果在运行时条件很少改变，则使用 `v-if` 较好

```html
<div id="app">
  <div v-if="flag">v-if控制的内容区域</div>
  <div v-show="flag">v-show控制的内容区域</div>
</div>

<script>
  const vm = new Vue({
    el: '#app',
    flag: true
  })
</script>
```

### 5、列表渲染

&emsp;&emsp;在 vue 中我们可以用 v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。

```html
<div id="app">
  <!-- 1、数组 -->
  <ul id="example-1">
    <li v-for="(item, index) in items" :key="item.message">
      {{ item.message }}
    </li>
  </ul>

  <!-- 2、对象 -->
  <ul id="example-2">
    <li v-for="(value, name, index) in object">
      {{ index }}. {{ name }}: {{ value }}
    </li>
  </ul>

  <script>
    cosnt vm = new Vue({
      el: '#app',
      data: {
        parentMessage: 'Parent',
        // 一个数组
        items: [
          { message: '1', message2: 'Foo'},
          { message: '2', message2: 'Bar'},
          ……,
        ]
        // 单个对象
        object: {
          title: 'How to do lists in Vue',
          author: 'Jane Doe',
          publish: '2016-04-10'
        }
      }
    })
  </script>
</div>
```

【:key 值 只能是字符串或者数字类型，具有唯一性。使用:key 接口提高 v-for 的性能，又防止列表状态紊乱；在较低的 vue 版本中若不使用:key 可能会报错。】

- 应用场景

```html
<div id="app">
  <table>
    <thead>
      <th>索引</th>
      <th>ID</th>
      <th>姓名</th>
    </thead>
    <tbody>
      <tr v-for="(item, index) in list" :key="item.id">
        <td>{{ index }}</td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
  cosnt vm = new Vue({
    el: '#app',
    data: {
      list: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
        { id: 4, name: '赵柳' },
      ]
    }
  })
</script>
```

### 6、双向绑定（表单）🚩

&emsp;&emsp;在 vue 中你可以使用 <span style="background-color:yellow;color:black;">v-model</span> 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定，用来辅助开发者在<span style="color: green;">不操作 DOM </span>的情况下，快速获取表单的数据。

```html
<div id="app">
  <!-- 普通的{{ }}使用 -->
  <span>用户名：{{ username }}</span>

  <!-- 使用v-model实现与🤔username的双向绑定 -->
  <input type="text" v-model="username" />
</div>

<script>
  const vm = new Vue({
    // DOM Listeners处理
    el: '#app',
    // Data Bindings处理
    data: {
      username: 'zhangsan'
    }
  })
</script>
```

总结：

- `<input>`中的数据与数据源中的 username 同步。
- 修改`<input>`内的值，其值会同步到数据源中

#### 单向与双向绑定

```html
<div id="app">
  <!-- 1、数据驱动视图(单向) -->
  <!-- 属性绑定 —— :value -->
  <input type="text" :value="username" />

  <!-- 2、双向数据绑定(双向) -->
  <!-- 表单输入绑定 —— v-model -->
  <input type="text" v-model="username" />
</div>
```

思考？

> <span style="background-color:yellow;color:black;">数据回显、数据修改</span>

#### 修饰符

- .lazy

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />
```

- .number

```html
<!-- 自动将用户的输入值转为数值类型 -->
<input v-model.number="age" type="number" />
```

- <span style="color: red;">.trim</span>

```html
<!-- 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg" />
```

#### 案例：

Bootstrap 4 的 IOS 风格开关

- 上面演示的是`type="text"` —— 绑定 value 属性
- 下面要演示的是`type="checkbox"` —— 绑定 checked 属性

```html
<td>
  <div class="custom-control custom-switch">
    <!-- 使用 v-model 实现双向数据绑定 -->
    <input
      type="checkbox"
      class="custom-control-input"
      :id="'customSwitch' + item.id"
      v-model="item.status"
    />
    <!-- 使用 v-if 结合 v-else 实现按需渲染 -->
    <!-- 对id、for属性进行v-bind属性✨绑定，保证for属性值的唯一性 -->
    <label
      class="custom-control-label"
      :for="'customSwitch' + item.id"
      v-if="item.status"
      >已启用</label
    >
    <label class="custom-control-label" :for="'customSwitch' + item.id" v-else
      >已禁用</label
    >
  </div>
</td>
<td>
  <a href="javascript:;" @click="remove(item.id)">删除</a>
</td>
```

```html
<script type="text/javascript" src="./lib/vue-2.6.14.js"></script>
<script>
  const vm = new Vue({
    // DOM Listeners处理
    el: '#app',
    // Data Bindings处理
    data: {
      list: [
        { id: 1, brand: '宝马', status: true, buildTime: new Date() },
        { id: 2, brand: '奔驰', status: false, buildTime: new Date() },
        { id: 3, brand: '奥迪', status: true, buildTime: new Date() }
      ]
      // 或者：
      /*
      list: [
          { id: 1, brand: '宝马', status: 1, buildTime: new Date() },
          { id: 2, brand: '奔驰', status: 0, buildTime: new Date() },
          { id: 3, brand: '奥迪', status: 1, buildTime: new Date() },
        ] */
      // 或者：
      /*
      list: [
          { id: 1, brand: '宝马', status: "checked", buildTime: new Date() },
          { id: 2, brand: '奔驰', status: "", buildTime: new Date() },
          { id: 3, brand: '奥迪', status: "checked", buildTime: new Date() },
        ] */
    },
    methods: {
      remove(id) {
        // 假删除
        // 使用filter过滤器对不等于当前id值的其他list数据进行放行
        this.list = this.list.filters((item) => item.id != id)
      }
    }
  })
</script>
```

对应 checked 属性的两种 💖 操作方式

&emsp;&emsp;① DOM 操作：`checkboxObject.checked=<true/1 | false/0>`

&emsp;&emsp;② 属性操作：`checked="" | checked="随便的values值即可"`

#### 总结

v-model 在内部会根据不同的控件类型(<span style="color: green;">text、checkbox、radio</span> 等等)自动选取正确的 property(<span style="color: green;">value、Boolean 值</span>等等)来绑定 并抛出不同的事件，v-model 本质上不过是语法糖。

- text 和 textarea 元素使用 value 属性 和 input 事件；
- checkbox 和 radio 使用 checked 属性 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

## 四、拓展

### filters 过滤器

&emsp;&emsp;上面进行假删除时使用了 filter，但要注意的是 vue3.0 已经弃用了 filters。Vue.js 允许你自定义过滤器，它常用的场景(对文本格式化)：

- 双花括号插值中
- v-bind 表达式中

```html
<div id="app1">
  <!-- 在双花括号中 -->
  {{ message | capitalize }}

  <!-- 在 `v-bind` 中 -->
  <div v-bind:id="idtext | maxLength(12)">div盒子id值长度测试</div>
</div>

<div id="app2">
  <!-- 在 `v-bind` 中 -->
  <div v-bind:id="idtext | maxLength(12)">div盒子id值长度测试</div>
</div>

<script src="./lib/vue-2.6.14.js"></script>
<script>
  // 1、全局过滤器🤔
  // 注意观察参数
  Vue.filter('maxLength', function (value, len) {
    if (value.length <= len) {
      return value
    }
    return value.substr(0, len)
  })

  const vm1 = new Vue({
    // DOM Listeners处理
    el: '#app1',
    // Data Bindings处理
    data: {
      message: 'zhangsan',
      idtext: 'head-for-table-first-cell'
    },
    // 2、本地过滤器
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  })

  const vm2 = new Vue({
    // DOM Listeners处理
    el: '#app2',
    // Data Bindings处理
    data: {
      idtext: 'head-for-table-first-cell'
    }
  })
</script>
```

思考：

> 品牌列表案例的 <span style="color: green;">格式化时间</span>问题。
