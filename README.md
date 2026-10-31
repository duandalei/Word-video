# Word Video · 单词动画

把英语单词做成可以点击、会动、能朗读的网页故事。

**在线体验：** https://duandalei.github.io/Word-video/

## 这是什么

每个单词都是一张互动卡片：点击词卡、点击画面，或按 ▶，页面会用浏览器英文语音朗读单词，同时播放与词义对应的动画。适合孩子、英语初学者或课堂演示使用。

- 7 个主题故事，共 95 个单词
- 每个词都有动画、IPA 音标和中文释义
- 支持慢速朗读、全部连读、键盘切换
- 适配手机和桌面，支持深色模式与减少动态效果
- 纯 HTML / CSS / JavaScript，无需安装依赖

## 故事书架

| 故事 | 中文 | 单词数 | 在线打开 |
| --- | --- | ---: | --- |
| L6 Row your boat | 丛林小河 | 17 | [打开](https://duandalei.github.io/Word-video/l6-row-your-boat.html) |
| L3 rain rain go away | 晴天雨天 | 17 | [打开](https://duandalei.github.io/Word-video/l3-rain-rain-go-away.html) |
| L5 Go away mosquito | 蚊子包 | 16 | [打开](https://duandalei.github.io/Word-video/l5-go-away-mosquito.html) |
| L2 I have a pet cat | 小猫的一天 | 13 | [打开](https://duandalei.github.io/Word-video/l2-i-have-a-pet-cat.html) |
| L1 Let’s go to the supermarket | 从种子到大树 | 13 | [打开](https://duandalei.github.io/Word-video/L1%20Let%E2%80%99s%20go%20to%20the%20supermarket.html) |
| A Day at the Zoo | 动物园的一天 | 11 | [打开](https://duandalei.github.io/Word-video/zoo.html) |
| Fruit Words | 水果形容词 | 8 | [打开](https://duandalei.github.io/Word-video/fruit-words.html) |

## 怎么用

1. 打开 [在线首页](https://duandalei.github.io/Word-video/) 或本地 `index.html`。
2. 从“故事书架”选择一个故事。
3. 点击任意词卡切换单词，点击画面或 ▶ 听发音。
4. 使用 `←` / `→` 切换单词，空格键重新朗读。
5. 需要慢慢听时打开“🐢 慢速”，需要连续听时打开“🔁 全部连读”。

朗读使用浏览器自带的 Web Speech API，建议使用 Chrome 或 Edge，并确保系统安装了英文语音。

## 项目结构

```text
.
├── index.html            # 故事书架首页
├── l6-row-your-boat.html         # L6 Row your boat
├── l3-rain-rain-go-away.html     # L3 rain rain go away
├── l5-go-away-mosquito.html      # L5 Go away mosquito
├── l2-i-have-a-pet-cat.html      # L2 I have a pet cat
├── L1 Let’s go to the supermarket.html  # L1 Let’s go to the supermarket
├── zoo.html              # A Day at the Zoo
├── fruit-words.html      # Fruit Words
├── CLAUDE.md             # 项目协作说明
└── .gitignore
```

每个动画页面都是独立的单文件页面，包含自己的样式、单词数据和朗读逻辑。

## 本地预览

直接双击 `index.html` 即可。也可以在当前目录启动一个本地服务器：

```bash
python -m http.server 8000
```

然后打开 <http://localhost:8000>。

## 技术说明

- 原生 HTML、CSS、JavaScript，无框架、无构建步骤
- Web Speech API 提供英文朗读
- Google Fonts 加载 Baloo 2 与 Nunito，断网时回退到系统字体
- GitHub Pages 托管在线版本
- 所有动画页面都包含 `<meta name="viewport" content="width=device-width, initial-scale=1">`。缺少这行时，手机浏览器会按约 980px 的桌面宽度渲染再整体缩小，页面看起来像横屏且字很小；电脑端不受影响
- 通过 `.gitignore` 排除本地截图、临时测试页和本地 Claude 设置

## 发布

推送到 `main` 分支后，GitHub Pages 会自动重新发布，通常需要等待 30–60 秒：

```bash
git add .
git commit -m "更新说明"
git push
```
