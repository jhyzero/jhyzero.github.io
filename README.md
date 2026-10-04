# jhyzero.github.io

一个基于 Jekyll 的个人博客，适合直接部署到 GitHub Pages。

## 发布到 GitHub

1. 在 GitHub 创建名为 `jhyzero.github.io` 的公开仓库。
2. 将本目录中的所有文件提交并推送到仓库的 `main` 分支。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`。
5. 等待 GitHub 完成构建，访问 <https://jhyzero.github.io>。

## 写文章

在 `_posts` 目录中新建 `YYYY-MM-DD-title.md`。复制现有示例文章的头部信息，然后使用 Markdown 写正文。

## 修改资料

- `_config.yml`：站名、简介、作者和网址。
- `about.md`：个人介绍。
- `assets/css/main.css`：颜色、字体与布局。
- `assets/js/particles.js`：首页代码粒子效果。

## 本地预览

安装 Ruby 与 Bundler 后执行：

```bash
bundle install
bundle exec jekyll serve
```

然后访问 <http://127.0.0.1:4000>。

