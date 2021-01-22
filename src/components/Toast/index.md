---
title: Toast
subtitle: Toast提示
---

Toast提示。

### Toast

具体 Props 如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | toast文案 | string | 无 |
| style | toast样式 | object | {} |


### Usage

#### simple

```jsx
Toast(msg})
```

#### complex

```jsx
// 点击处上方
const { left, top, width } = e.target.getBoundingClientRect()
Toast({ content, style: { left: left + width / 2, top: top - 30 }})
```