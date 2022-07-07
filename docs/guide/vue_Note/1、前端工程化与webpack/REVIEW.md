## 一、包下载

### npm 命令

&emsp;&emsp;大多数下，npm 下载命令在 npm 包共享平台上提供了下载的 npm 命令。

```sh
# 快速下载包

# 1、方式一
npm config get registry
npm config set registry https://registry.npm.taobao.org/

# 2、方式二
npm i nrm -g
nrm ls
nrm use taobao

npm i
```

&emsp;&emsp;前提引入：install 可以替换为 i ，--save-dev 可以替换为 -D ,高版本的 --save 可以省略

> npm 5.0.0 之前，有 --save 参数才会把模块写入到 packages.json（）。

### 1、devDependencies 与 dependencies 节点

&emsp;&emsp;devDependencies 为开发依赖包，项目上线后不会用的。dependencies 为核心依赖包，开发、上线阶段都会用到(占多数)。

&emsp;&emsp;在这里可以对比回忆一下 Maven 管理依赖是的`<scope></scope>`

### 2、npm 包下载

&emsp;&emsp;全局包会安装到电脑上的默认安装路径内。

```sh
# 下载【🚩 全局包】
npm i [包名] -g
（例如：nrm）

# 下载核心依赖包【生产环境】
npm i [包名] [包名] [包名] < -S | --save >
npm i
# 【注意：npm 5.0.0 之后`< -S | --save >`可以省略】

# 下载开发依赖包【开发环境】
npm i [包名] < -D | --save-dev >
# （例如：webpack）
```

- 查看全局包在本地电脑的位置

```sh
npm root -g
```

## 二、jQuery 使用

&emsp;&emsp;要注意的是引入的 jQuery 的 js 文件要其他引入的 js 文件前面，不然会造成 jQuery 语法不生效的问题

> https://jquery.com/download/

引入 jQuery：

```sh
# 1、下载jQuery文件
# 不推荐

# 2、引用CDN链接
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>

# 3、使用npm包
# 下载
npm i jquery -S
# es6语法导入
import $ from 'jquery'
```

## 三、代码提示

&emsp;&emsp;在项目中生成 package.json 和 node_modules 配置文件

```sh
# 下载@types/node包:
cnpm install --save @types/node
```
