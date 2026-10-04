---
title: "Hello, World：博客从这里开始"
description: "一篇示例文章，用来说明如何在这个博客中写作、插入代码和管理标签。"
date: 2026-10-04 10:00:00 +0800
categories: [随笔]
tags: [博客, Jekyll, GitHub-Pages]
---

欢迎来到我的博客。

这是第一篇示例文章，也是这套博客系统的使用说明。网站中的文章全部放在 `_posts` 文件夹中，使用 Markdown 编写。

## 新增一篇文章

在 `_posts` 中创建文件，文件名必须使用下面的格式：

```text
年-月-日-英文或拼音标题.md
```

例如：

```text
2026-10-05-my-first-project.md
```

文件开头需要加入文章信息：

```yaml
---
title: "文章标题"
description: "显示在首页和文章列表中的简短摘要。"
date: 2026-10-05 20:00:00 +0800
categories: [技术]
tags: [JavaScript, 开源]
---
```

在第二个 `---` 后面就可以正常使用 Markdown 写作。

## 代码示例

代码块会自动获得语法高亮和复制按钮：

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('jhyzero'));
```

## 接下来

修改 `_config.yml` 可以更换站点名称、简介和个人信息；修改 `about.md` 可以完善关于页面。准备好之后，删除这篇示例文章，开始写自己的内容即可。

