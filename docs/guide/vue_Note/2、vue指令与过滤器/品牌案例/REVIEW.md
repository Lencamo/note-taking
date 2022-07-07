:::tip
《品牌案例》的部分知识点回顾。
:::

## 一、HTML5

### 1、\<label>标签

&emsp;&emsp;如果用户点击 label 元素内的文本，则会切换到控件本身。

> <label> 标签的 <span style="color: green;">for 属性</span> 应该等于相关元素的 <span style="color: green;">id 属性</span>

```html
<form>
  <label for="male">Male</label>
  <input type="radio" name="sex" id="male" />
  <br />
  <label for="female">Female</label>
  <input type="radio" name="sex" id="female" />
</form>
```

### 2、表单中的 scope 属性

两个 th 元素标识为列的表头，把两个 td 元素标识为行的表头

- scope 属性定义将表头单元与数据单元相关联的方法。
- scope 属性不会在普通浏览器中产生任何视觉变化，屏幕阅读器可以利用该属性

```html
<table border="1">
  <tr>
    <th scope="col">Month</th>
    <th scope="col">Savings</th>
  </tr>
  <tr>
    <td scope="row">1</td>
    <td>January</td>
    <td>$100.00</td>
  </tr>
  <tr>
    <td scope="row">2</td>
    <td>February</td>
    <td>$10.00</td>
  </tr>
</table>
```

### 3、input 标签中的 checked 属性

&emsp;&emsp;checked 属性值除了`0`、`false`、`""`，其他任何 value 值都为选中状态。
