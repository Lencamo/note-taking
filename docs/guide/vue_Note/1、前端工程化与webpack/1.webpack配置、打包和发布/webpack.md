### WebPack

官方简介：

> [webpack](https://webpack.docschina.org/) 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。

安装：

```sh
npm i webpack@5.42.1 webpack-cli@4.9.2 -D
```

&emsp;&emsp;下面介绍的是关于 webpack 手动配置的相关内容

## 一、webpack 配置文件

### 1、新建并配置 <span style="background-color:yellow;color:black"> webpack.config.js </span>

webpack.config.js 类似于 node.js 文件

① 运行模式(mode)✨

默认为 `production`，所以开发阶段必须配置。

```js
module.exports = {
  //mode表示运行模式：development、production
  mode: 'development'
}
```

- development：打包速度快
- production：会对生成的文件进行<span style="color: green;">代码压缩</span>和<span style="color: green;">性能优化</span>

② 项目打包的入口(entry)、出口(output)

在 webpack 4.x 和 5.x 的版本中，默认的打包路径如下：

```js
const path = require('path')

module.exports = {
  //下面是默认的配置
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
}
```

### 2、在 package.json 中新增并运行 dev 脚本

打包构建项目：`npm run dev`

```json
{
  "scripts": {
    "dev": "webpack"
  }
}
```

【前提： 有打包的入口文件（默认为 src ——> index.js）】

## 二、webpack 辅助插件

### 1、webpack-dev-server

```sh
# 步骤1
npm i webpack-dev-server@3.11.2 -D
```

然后配置 package.json：

```json
// 步骤2
{
  "scripts": {
    "dev": "webpack serve"
  }
}
```

> 此插件类似于 node.js 中的<span style="color: red;"> nodemon 工具</span>。

&emsp;&emsp;webpack-dev-server 插件除了可以自动打包外，还可以通过 http://localhost:8080 查看打包效果。

> 即：webpack-dev-server 会启动一个 <span style="background-color:yellow;color:black">实时打包的 http 服务器</span>

但它也有一些缺陷：

- 实时的效果只能通过 http://localhost:8080 查看，右键运行文件是 file 协议的、是无效果的。
- http://localhost:8080 没有直接显示项目效果，而展示的是项目根目录。

① 原理

&emsp;&emsp;通过控制台信息可以发现，实时的`main.js`文件放在了 http 服务器的内存根目录上，造成了本地 dist 目录下的 main.js 文件不是实时的。

② 解决办法

&emsp;&emsp;直接引入看不见的 main.js 文件（后面插件可以自动实现）

```html
<!-- 步骤3  -->
<!-- 原来： -->
<script src="../dist/main.js"></script>
<!-- 现在： -->
<script src="/main.js"></script>
```

【注意：此时本地 dist 目录下的 main.js 文件其实任然不是实时的。】

拓展 \*：webpack.config.js 配置

```js
module.exports = {
  devServer: {
    open: true, //首次打包成功时，自动打开浏览器
    port: 80,
    host: '127.0.0.1'
  }
}
```

### 2、html-webpack-plugin

&emsp;&emsp;上面的方法任然未能解决通过 http://localhost:8080 直接实时预览项目效果的要求。

```sh
# 1、步骤1
npm i html-webpack-plugin@5.3.2 -D
```

&emsp;&emsp;然后配置 webpack.config.js：

```js
// 2、步骤2
const HtmlPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlPlugin( {
  template: './src/index.html',  //复制目录
  filename: './index.html'  //粘贴目录
})

module.exports = {
  plugins: [htmlPlugin]
}
```

&emsp;&emsp;html-webpack-plugin 插件处理可以处理直接在 http://localhost:8080 查看效果外，还会自动注入了

```html
<script src="/main.js"></script>
```

&emsp;&emsp;也就是说实际上 html-webpack-plugin 插件同时解决了 webpack-dev-server 插件遗留的两个问题。

### 3、loader 插件

&emsp;&emsp;实际开发中，webpack 默认只能打包处理.js 文件，而无法处理.css、.less 等文件。
① 安装

```sh
# css文件
npm i style-loader@3.0.0 css-loader@5.2.6 -D

# less文件
npm i less@4.1.1 less-loader@10.0.1 -D

# 图片文件
npm i file-loader@6.2.0 url-loader@4.1.1 -D

# js高级语法
# 略
```

② webpack.config.js 配置

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.jpg|png|gif$/, use: 'url-loader?limit=1024' }
    ]
  }
}
```

limit 限制的是图片大小小于等于多少 B 字节，limit=1024 表示图片小于等于 1kB 才会转换为 <span style="background-color:yellow;color:black">base64 字符串</span>。

## 三、webpack 的打包发布

### 1、开发环境中的 dev 脚本

回顾：

```json
// 1、原生的webpack打包方式
{
  "scripts": {
    "dev": "webpack"
  }
}
// 【结果：放在本地物理磁盘上】

// 2、使用webpack-dev-server插件时
{
  "scripts": {
    "dev": "webpack serve"
  }
}
// 【结果：放在 http 服务器的虚拟内存上 —— 实时预览】
```

运行：

> npm run dev

### 2、项目发布时的 build 脚本

```json
{
  "scripts": {
    "build": "webpack --mode production"
  }
}
```

&emsp;&emsp;这里一定要使用上面的命令，而不能使用`webpack serve --mode production`，不然会找不到打包生成的 dist 文件。

> npm run build

### 3、dist 文件夹优化

&emsp;&emsp;普通方式打包生成的文件全部直接放在了 dist 文件夹下，没有进行分类，显得格外混乱。

- webpack.config.js 配置

```js
module.exports = {
  // 1、js文件处理
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/main.js'
  },

  // 2、图片文件处理
  module: {
    rules: [
      { test: /\.jpg|png|gif$/, use: 'url-loader?limit=1024&outputPath=images' }
    ]
  }
}
```

### 4、自动删除旧的 dist 文件夹 \*

&emsp;&emsp;防止打包时，旧的 dist 内文件对新生成的 dist 内文件造成影响。

- 安装

```sh
npm i clean-webpack-plugin@3.0.0 -D
```

- webpack.config.js 配置

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const cleanPlugin = new CleanWebpackPlugin()

module.exports = {
  plugins: [cleanPlugin]
}
```

## 四、Sourcet Map

&emsp;&emsp;运行项目报错时，我们发现<span style="color: green;">控制台报错的提示行号</span>(main.js)与<span style="color: green;">源代码的对应行号</span>不一致。

- 原因

> webpack 默认开启了 Source Map

- 解决办法：配置 webpack.config.js

```js
module.exports = {
  devtool: 'eval-source-map'
}
```

- 注意

&emsp;&emsp;开发阶段为了方便调试，可以手动关闭 Source Map。但项目发布时，出于安全角度(防止源码暴露)，建议使用默认的`none`或者使用`nosources-source-map`(只显示行号不暴露源码)。

## 五、路径优化

① 配置路径别名

- webpack-config.js

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.join(__dirname, './src/')
    }
  }
}
```

> @表示正处于项目根目录的 src 文件夹下

② 案例演示

index.js 导入文件代码优化：

```js
// 原来：
import './css/index.css'
import './css/index.less'

// 现在：
import '@/css/index.css'
import '@/css/index.less'
```
