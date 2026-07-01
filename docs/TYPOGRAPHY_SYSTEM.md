# Enjoy Life Typography System

## Design principle

> 像一个认真维护的文本文件，而不是一个努力模仿终端的网页。

全站以文字、链接、留白和细线组织内容。它不是黑底绿字终端，也不是卡片式博客模板。

## Typeface

全站使用同一套等宽优先字体栈：

```css
"Sarasa Mono SC", "Maple Mono SC", "Cascadia Mono", "JetBrains Mono",
"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono",
"Microsoft YaHei UI", "PingFang SC", "Noto Sans SC", monospace
```

第一版不下载在线字体文件；使用访客设备已有字体，保证页面打开稳定。

## Type scale

| Element | Desktop | Mobile | Rule |
| --- | ---: | ---: | --- |
| Page title | 32px | 26px | 600 / 1.3 |
| Article title | 30px | 25px | 600 / 1.42 |
| H2 | 21px | 20px | 600 / 1.45 |
| H3 | 17px | 17px | 600 / 1.55 |
| Body | 16px | 16px | 400 / 1.9 |
| Intro and list | 15px | 15px | 400 / 1.75–1.8 |
| Metadata and caption | 13px | 13px | 400 / 1.55–1.6 |
| Code block | 14px | 13px | 400 / 1.7 |

## Alignment

- 长文章中的普通中文段落：两端对齐，最后一行左对齐。
- 标题、导航、元信息、列表、表格、代码、引用、图片说明：左对齐。
- 桌面端文章目录：标题左侧，日期右侧。
- 手机端文章目录：标题在上，日期落到标题下方。

## Rich text

- 链接：蓝色，悬停或键盘聚焦时出现 1px 实线下划线。
- 加粗：`600`，只用于少量关键词。
- 斜体：只用于短语、外文术语或轻强调。
- 下划线：真实 1px 实线，不用波浪线字符模拟。
- 行内代码：浅灰背景、无圆角、等宽字体。
- 代码块：浅灰背景、1px 边线、无圆角、无阴影；复制按钮仅在 hover 或 focus 时显示。
- 引用：左侧 2px 细线，文字略浅；不显示 `>` 或巨大引号。
- 表格：横向细线为主；不使用厚重全网格。
- 图片：无圆角、无阴影；白底截图可有 1px 淡边线。

## Do not use

- Hero 大横幅
- 卡片墙、厚边框、阴影、渐变
- 圆角胶囊标签和状态徽章
- emoji 作为列表符号
- `#`、`>`、`````、`---`、`〰` 等 Markdown 符号作为视觉装饰
- fake terminal prompt、闪烁光标、终端三色圆点
- “公开地址待确认”等公开占位状态
