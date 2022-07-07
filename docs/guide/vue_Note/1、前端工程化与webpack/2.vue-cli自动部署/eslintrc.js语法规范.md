&emsp;&emsp;当我们在使用 <span style="background-color: yellow;color:black;">vue-cli</span> 创建项目时，使用了 Eslint 语法规范时。

> 默认情况下 ESLint 语法规范风格都选的：
> &emsp;&emsp;【 ESLint + Stndard config 】
> &emsp;&emsp;【 Lint on save 】

## 一、ESLint 规则

> 官网：https://cn.eslint.org/docs/rules/

### 1、文件配置

&emsp;&emsp;通过 vue-cli 创建项目时使用 ESLint 时，在项目文件夹中会自动生成一个`eslintrc.js`文件。
&emsp;&emsp;其中，它定义了一些规范，并且预留了我们只可以自定义语法规则的区域。

- eslintrc.js

```js
module.exports = {
  rules: {
    // 默认的规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 自定义的规则
    'space-before-function-paren': ['warn', 'never'],
    'vue/multi-word-component-names': 'off' // 关闭名称校验
  }
}
```

### 2、vscode 配置

&emsp;&emsp;在 vscode 设置中，搜索并配置如下：

- Tab Size 填上 2
- Format On Save 打上勾

## 二、vscode 相关插件

&emsp;&emsp;由于 ESLint 的语法规范对新手会造成极度不适，使用 vscode 可以解决部分问题。

### 1、ESLint 插件

前提

- 必须单独 🚩 打开项目文件夹（和之前的那个 Path Autocomplete 插件类似）
- 无论是 js 文件还是 vue 文件，默认的格式化文档方式都要选 Prettier（通过鼠标右键实现）

配置

```json
{
  "eslint.alwaysShowStatus": true
}
```

### 2、Prettier-code formatter 插件

配置

```json
{
  // 指定.prettierrc文件的存放位置
  "prettier.configPath": "C:\\Users\\Lencamo\\.prettierrc",

  "prettier.trailingComma": "none",
  "prettier.semi": false,
  // 每行文字个数超出此限制将会被迫换行
  "prettier.printWidth": 300,
  // 使用单引号替换双引号
  "prettier.singleQuote": true,
  "prettier.arrowParens": "avoid"
}
```

- .prettierrc 文件

```json
{
  //重点✨
  "trailingComma": "none",
  //禁止默认末尾自动添加逗号
  "semi": false,
  //对内容使用单引号
  "singleQuote": true,
  //对象属性添加空格
  "bracketSpacing": true
}
```

### 3、Vetur

配置

```json
{
  // 设置 .vue 文件中，HTML代码的格式化插件
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.ignoreProjectWarning": true,
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "trailingComma": "none",
      "singleQuote": true,
      "semi": false,
      "arrowParens": "avoid",
      "printWidth": 300
    },
    "js-beautify-html": {
      "wrap_attributes": false
    }
  }
}
```
