# 当前生效说明：v0.14 内容去重与工具、生活整理（优先级最高）

> 本段覆盖本文件后续历史版本中关于公开导航、页面职责、收藏、项目、书架和专题名称的旧描述；后续内容仅作为开发历史参考。

## 当前正式导航

```text
主页  技术  工具  阅读  自然  生活  归档  关于
```

站点副标题：

```text
技术 · 工具 · 阅读 · 自然 · 生活
```

### 栏目职责

- **技术**：`/technology/`。技术文章与有公开文章的技术专题；空专题不输出链接。
- **工具**：`/tools/`。自己 DIY 项目、Chrome 扩展与网页工具、PCIe / 硬件工具、文字图片记录工具、资料库、历史内容来源。
- **阅读**：`/reading/`。只显示已公开阅读文章；不重复展示书架或阅读专题。
- **自然**：`/nature/`。自然观察与地方记录。
- **生活**：`/life/`。饮食、影集与家庭、运动、生活与思考。
- **归档**：`/archive/`。所有已确认历史条目的日期时间线。

### 内容维护

- 技术、阅读、生活类文章：`src/content/writing/`，通过 `domain` 区分。
- 工具、DIY 项目、扩展、资料库、生活网站：`src/content/tools.json`。
- 历史内容来源：`src/content/favorites.json`。
- 生活网站（`websites-life`）只在 `/life/` 展示，不要在 `/tools/` 重复展示。
- 历史项目集合已移除；旧 `/projects/` 仅跳转到 `/tools/#diy-projects`。

旧入口：

```text
/writing/   -> /technology/#technical-writing
/series/    -> /technology/#technology-series
/bookshelf/ -> /reading/
/favorites/ -> /tools/#historical-sources
/projects/  -> /tools/#diy-projects
```


# Enjoy Life — 个人知识与生活档案站
## Codex 开发与 Cloudflare Pages 部署总交接文档

> **站点长期主线：技术 · 阅读 · 自然 · 工具 · 生活**  
> 文档版本：v0.10  
> 更新日期：2026-07-01  
> 本文件是项目根目录应长期保留的开发约束、内容盘点、迁移规则与部署说明。当前代码已完成 v0.10；后续开发必须先阅读 `README.md`、`docs/BUILD_PREVIEW_DEPLOY.md`、`docs/CONTENT_MIGRATION_STATUS.md` 与 `docs/TYPOGRAPHY_SYSTEM.md`，再把本文件作为长期产品约束。

---

## v0.10 当前实现状态

- 每篇公开文章都必须有可展开的“目录”；`npm run audit:toc` 会阻止无分节标题的公开文章进入发布流程。
- 网站不提供评论、登录或访客数据写入功能；保持纯静态输出。

## 0. 给 Codex 的首要指令

请实现一个**长期可维护的极简个人知识与生活档案站**，不是营销网站、不是卡片瀑布流、不是传统模板博客，也不是后台管理系统。

必须遵守：

1. 使用 **Astro 的静态输出模式**、Markdown / MDX 内容集合、TypeScript、语义化 HTML 和原生 CSS。站点保持纯静态输出，不使用 Pages Functions、D1、React、登录、CMS 或其他接口服务。
2. 目标部署平台是 **Cloudflare Pages + GitHub Git integration**。构建产物为 `dist/`。
3. 内容必须优先存放在 Git 仓库中；GitHub 是版本与备份来源。不要把文章正文存到第三方数据库。
4. 网站桌面正文最大宽度必须为 **890px**，居中；手机端左右保留 **16px** 左右内边距。
5. 普通中文正文两端对齐；代码、表格、列表、引用、命令行、图片说明、技术参数和英文密集段落必须左对齐，不能被 `justify` 拉开。
6. 默认克制、稳定、文本优先。不要大 Banner、轮播、玻璃卡片墙、瀑布流、自动播放视频、夸张渐变、炫技动效、头像大图。
7. 对现有 CSDN、知乎、旧 旧个人站 内容：保留原始发布日期、原始来源和原文链接；不要伪装成今天新写的文章；不要自动搬运版权不清晰的转载内容或下载资源正文。
8. 任何当前没有公开地址的工具/项目，不得编造 URL；在内容数据中标记为 `draft` / `private` / `linkPending`，公开列表不显示“准备中”“待确认”等占位状态。
9. 必须提供深浅色主题，默认遵循系统；用户手动切换后用 `localStorage` 保存主题偏好。`localStorage` 仅可用于主题偏好和无敏感的 UI 状态。
10. 所有图标采用一个统一的非 Emoji 图标体系（建议 Lucide）；但主题切换按钮可以使用太阳/月亮图形图标。交互图标必须有 `aria-label`、键盘焦点态和桌面端 tooltip。

---

## 1. 站点定位与命名

### 1.1 当前站点名称

- 主名称：**Enjoy Life**
- 浏览器标题默认格式：`{页面标题} · Enjoy Life`
- 首页副标题（永久保留）：

> **技术 · 阅读 · 自然 · 工具 · 生活**

站点不是只写技术的博客，也不是纯生活日志。它同时承担：

- 技术知识库与工程经验沉淀；
- 阅读、学习与长期思考的记录；
- 自然、骑行、徒步、摄影、地方观察的档案；
- 可直接使用的小工具入口；
- Chrome 扩展、网页、文档库等项目作品集；
- 值得长期保存的资料、网站、软件与书籍索引。

### 1.2 语气与内容原则

- 写清楚，不故作深奥；
- 区分事实、经验、个人观点和转载来源；
- 长期可复查、可修订、可链接；
- 旧内容尊重历史语境，保留首次发布时间；
- 不追求日更，不用“最新最热”营销话术；
- 强调长期积累，而不是短期流量。

---

## 2. 全站公开导航与 URL 结构

### 2.1 顶部导航（桌面端）

```text
主页   写作   专题   工具   自然   书架   收藏   项目   归档   关于        搜索图标   主题图标
```

**准确页面文字：**

```text
主页 | 写作 | 专题 | 工具 | 自然 | 书架 | 收藏 | 项目 | 归档 | 关于 | ⌕ | ☾ / ☀
```

- “写作”统一承载旧博客文章、知乎回答、CSDN 教程、短记、清单、项目日志。
- “专题”负责按长期主题重组内容；不能用“发布”替代专题。
- “工具”用于直接打开和使用。
- “项目”用于记录作品、演进、源码、版本和设计过程。
- “自然”覆盖动植物，但范围大于动植物。
- 搜索和主题仅使用图标，不显示“搜索”“主题”文字。

### 2.2 手机导航

- 顶栏保持单行，高度紧凑；
- 主导航可以横向滚动；不要折叠成多层汉堡菜单；
- 主题图标固定在导航区域最右侧；
- 页面主体不贴边，左右各约 `16px`；
- 不要把桌面文字缩得很小硬塞进一屏。

### 2.3 路由建议

```text
/                         首页
/writing/                 写作总览
/writing/[slug]/          文章 / 问答 / 短记 / 清单 / 项目日志
/series/                  专题总览
/series/[slug]/           单个专题
/tools/                   工具总览
/tools/[slug]/            工具详情或跳转页
/nature/                  自然观察总览
/nature/[slug]/           自然观察详情
/bookshelf/               书架总览
/bookshelf/[slug]/        单本书详情
/favorites/               收藏总览
/favorites/[slug]/        收藏详情（可选；第一版可只做列表）
/projects/                项目总览
/projects/[slug]/         项目详情
/about/                   关于
/search/                  全站搜索
/now/                     正在做（隐藏辅助页面）
/archive/                 年月归档（隐藏辅助页面）
/tags/                    标签索引（隐藏辅助页面）
/rss.xml                  RSS
/sitemap-index.xml        Sitemap
/404/                     404 页面
/studio/                  私人写作工作台占位页，不进入公开导航
```

---

## 3. 全站信息架构

```text
主页
│
├─ 写作
│  ├─ 全部
│  ├─ 技术
│  ├─ 阅读
│  ├─ 生活
│  ├─ 自然
│  ├─ 长文
│  ├─ 问答
│  ├─ 短记
│  ├─ 清单 / 速查
│  ├─ 操作指南
│  ├─ 项目日志
│  └─ 时间归档
│
├─ 专题
│  ├─ PCIe 与高速互连
│  ├─ 芯片、固件与 SoC 工程
│  ├─ 开发环境与工程效率
│  ├─ Chrome 扩展与网页工具
│  ├─ Cloudflare、个人网站与长期记录
│  ├─ 知识管理、Obsidian 与长期记录
│  ├─ 阅读与学习方法
│  └─ 自然观察与行走
│
├─ 工具
│  ├─ PCIe / 硬件工具
│  ├─ 浏览器扩展
│  ├─ 开发效率工具
│  ├─ 文字、图片与记录工具
│  └─ 生活小工具
│
├─ 自然
│  ├─ 植物
│  ├─ 动物
│  ├─ 季节与天气
│  ├─ 骑行与徒步
│  ├─ 城市与山野观察
│  ├─ 摄影与航拍
│  └─ 故乡、方言与地方记忆
│
├─ 书架
│  ├─ 在读
│  ├─ 读过
│  ├─ 想读
│  ├─ 技术与工程
│  ├─ 历史、哲学与社会
│  ├─ 心理、成长与生活
│  └─ 阅读笔记
│
├─ 收藏
│  ├─ 技术资料与规范
│  ├─ 网站与知识库
│  ├─ 软件与工具
│  ├─ 文章与长文
│  ├─ 图片、设计与字体
│  └─ 长期参考资料
│
├─ 项目
│  ├─ PCIe 中文资料库
│  ├─ Chrome 扩展
│  ├─ 网页工具
│  ├─ Cloudflare 网站
│  ├─ 个人知识管理系统
│  ├─ 开源仓库
│  └─ 已归档项目
│
└─ 关于
   ├─ 我是谁
   ├─ 这个站点
   ├─ 写作与更新原则
   ├─ 站点技术栈
   ├─ 隐私与版权
   └─ 联系方式
```

---

## 4. 视觉与排版系统

### 4.1 核心视觉目标

参考“文字规整、重内容、长久耐看”的知识站，不复制任何一个参考站的布局。

必须做到：

- 页面主体居中；绝不出现正文从浏览器最左侧铺到最右侧；
- 不使用大面积阴影卡片来切分每个条目；
- 靠排版、间距、细分隔线、日期和内容层级组织信息；
- 标题、日期、分类、来源信息一眼清楚；
- 技术文章、图片文章、问答文章、阅读文章使用同一阅读系统；
- 图片保持自然显示，不增加厚重装饰框。

### 4.2 页面尺寸与间距

```css
:root {
  --content-max: 890px;
  --page-gutter-desktop: 28px;
  --page-gutter-mobile: 16px;
  --nav-height: 48px;
  --rule-color: #e7e7e2;
}
```

- 桌面：正文容器 `max-width: 890px; margin-inline: auto;`
- 手机：内容容器 100% 宽度，左右 `16px`；
- 阅读正文：桌面 `17px` 左右；手机 `16px`；
- 中文正文行高：`1.9` 至 `1.95`；
- 标题、段落、代码和图片之间保留充分但不过大的垂直留白；
- 除正文外，列表页元数据可更小，约 `13px–14px`。

### 4.3 字体

v0.6 已将 CSDN 和旧博客历史元数据同步到公开 `/archive/`，归档生成源是 `docs/CONTENT_MIGRATION_MANIFEST.csv`，生成文件是 `src/data/legacyArchive.ts`。

v0.5 的实际字体源以 `src/styles/tokens.css` 为准：全站采用中文等宽优先字体栈，形成“文本文件 / 技术知识目录”气质。

```css
--font-mono:
  "Sarasa Mono SC",
  "Maple Mono SC",
  "Cascadia Mono",
  "JetBrains Mono",
  "SFMono-Regular",
  "Menlo",
  "Consolas",
  "Liberation Mono",
  "Microsoft YaHei UI",
  "PingFang SC",
  "Noto Sans SC",
  monospace;
```

标题、正文、导航、日期、代码、表格和目录统一使用该字体栈。不要改回多字体混用，也不要引入大体积在线字体。

### 4.4 中文两端对齐规则

```css
.article-prose p {
  text-align: justify;
  text-justify: inter-ideograph;
  text-align-last: left;
}
```

以下元素必须覆盖为 `text-align: left`：

```text
pre / code / table / ul / ol / blockquote / figure / figcaption /
.article-meta / .definition-list / .command-line / 英文密集技术段落
```

### 4.5 颜色与主题

浅色主题：

```text
背景             #FCFCFA
正文             #202020
次级文字         #6B6B6B
分隔线           #E7E7E2
链接             #1F5E9C
代码背景         #F4F4F1
引用边线         #B8B8B0
```

深色主题：

```text
背景             #151515
正文             #E8E6E1
次级文字         #A5A39D
分隔线           #303030
链接             #7DB7E8
代码背景         #1E1E1E
引用边线         #6B6B66
```

要求：

- 深色不是纯黑；文字不是纯白；
- 主题切换不得白屏闪烁；应尽量在首屏脚本中读取保存的主题；
- 链接在正文中有明显但克制的下划线/悬停状态；
- 不引入过多颜色；默认只允许一个蓝色强调色。

---

## 5. 页面功能设计

### 5.1 首页 `/`

首页不是“欢迎页”，而是全站总目录。推荐结构：

```text
Enjoy Life
技术 · 阅读 · 自然 · 工具 · 生活

[顶部导航]
────────────────────────────────────
最近写作（4–8 条）
正在做（3–5 条）
一个专题
一个工具
一则自然 / 生活记录
站点状态（低调显示）
页脚：GitHub · RSS · Archive
```

**最近写作条目格式：**

```text
2026-06-30    PCIe / SerDes 架构：PCS、PMA 与数字接口
             技术 · 长文
```

首页不需要：大头像、大封面、轮播、瀑布流、访问量、评论数量、广告位。

### 5.2 写作 `/writing/`

“写作”是统一内容流，不以来源平台分栏。

顶部双层筛选：

```text
领域：全部   技术   阅读   生活   自然   工具
形式：全部   长文   问答   短记   清单   操作指南   项目日志
```

列表每项必须包含：

```text
日期 | 标题 | 领域 · 形式 · 少量标签 | 可选：来源标识
```

示例：

```text
2024-03-18    Windows PowerShell 如何登录 Linux 机器
             技术 · 操作指南 · Windows / Linux
             原载于 CSDN
```

- 默认不显示文章摘要，避免视觉噪声；
- 可选的简短摘要只能出现在搜索结果或专题简介中；
- 默认按首次发布时间倒序，迁入时间不得影响时间线；
- 支持按年份继续浏览和按 URL 查询参数筛选。

### 5.3 文章详情 `/writing/[slug]/`

标题区必须包含：

```text
标题
领域 · 内容形式 · 标签
首次发布 / 原载来源 / 迁入本站 / 最后修订 / 阅读时间
```

旧文章样例：

```text
首次发布：2024-03-18
原载于：CSDN
迁入本站：2026-07-xx
最后修订：2026-07-xx
```

问答型文章保留：

```text
问题
回答
```

文章正文必须支持：

```text
标题层级、图片、图片说明、链接、引用、代码、复制代码按钮、表格、
行内代码、脚注、数学公式、列表、视频嵌入、下载附件、锚点链接、
上一篇/下一篇、相关文章、所属专题。
```

文章目录：

- 只有长文才显示；
- 桌面端优先做标题下方的轻量目录或折叠式目录；
- 不要长期占用右侧一个很宽的固定侧栏；
- 手机端默认折叠。

### 5.4 专题 `/series/`

专题不是标签云。专题必须有：

```text
专题简介
适合谁阅读
建议阅读顺序
章节 / 条目清单
当前完成度（可选）
相关工具
相关项目
相关收藏
```

第一批专题：

1. **PCIe 与高速互连**
   - 基础架构、RC/EP/Switch、TLP/DLLP、Configuration Space、BAR/MPS/MRRS/RCB、MSI/MSI-X、Completion/Timeout、AER、ASPM、Equalization、Lane Margining、PCIe 6.0/PAM4/FLIT/FEC、CXL、调试与验证案例。
2. **芯片、固件与 SoC 工程**
   - GPU Firmware、SoC 验证、IOMMU、Bring-up、寄存器、Palladium、调试方法、工艺角/时序/Sign-off、SerDes/PHY。
3. **开发环境与工程效率**
   - Windows、Linux、PowerShell、Windows Terminal、SSH、VS Code、Git、GitHub、Python、Shell、Vim、Source Insight、Graphviz、文档处理、编码与字体、远程开发。
4. **Chrome 扩展与网页工具**
   - DictFloat、简读 · 网页阅读助手、Quick Note Float、KeyPass、RegCalc64、飞书小助理、Chrome Web Store 发布、权限与隐私、UI/UX、版本记录。
5. **Cloudflare、个人网站与长期记录**
   - Pages、R2、D1、静态网站、FamilyJourney、图片压缩、GitHub 自动部署、Markdown、搜索、RSS、长期备份。
6. **知识管理、Obsidian 与长期记录**
   - Obsidian、日记、Templater、WebDAV/S3、Remotely Save、天气与位置、Markdown、Typora、年度回顾。
7. **阅读与学习方法**
   - 技术书、规范、长文、数学与基础知识、学习路线、长期笔记、知识输出。
8. **自然观察与行走**
   - 植物、动物、城市自然、骑行、徒步、季节、摄影、故乡与地方、民勤与沙生植物、北京的树鸟花。

### 5.5 工具 `/tools/`

工具页只展示“打开即可使用”的对象。每张工具条目必须包含：

```text
工具名称
一句话用途
状态：可用 / 开发中 / 已归档
打开工具 →
使用说明 →
GitHub / 源码 →（有链接才显示）
相关文章 →
```

工具分类与已知项目：

#### PCIe / 硬件

- PCIe LTSSM Visualizer
- Register Bitfield Parser
- lspci Explorer
- RegCalc64
- PCIe HeaderLog 解析工具（如后续公开）

#### 浏览器扩展

- DictFloat
- 简读 · 网页阅读助手
- Quick Note Float
- KeyPass
- 飞书小助理

#### 文字、图片与记录

- Rich Editor
- 人生进度可视化
- 图片压缩相关工具（如后续公开）
- 日记与记录模板工具（如后续公开）

### 5.6 项目 `/projects/`

项目页展示“为什么做、如何演进、现在状态”，区别于工具页的使用入口。

第一批项目卡片：

```text
PCIe 中文资料库
DictFloat
简读 · 网页阅读助手
Quick Note Float
KeyPass
RegCalc64
飞书小助理
FamilyJourney
个人博客站点
Obsidian 日记系统
人生进度可视化
Rich Editor
```

项目详情统一结构：

```text
项目名称
一句话说明
状态 / 开始时间 / 技术栈
在线地址 / GitHub（存在时）
为什么做
解决什么问题
核心功能
设计过程
版本记录
截图与演示
相关工具
相关文章
后续计划
```

**重要：** FamilyJourney 使用独立、私有的家庭记录架构与 Cloudflare 资源；个人公开站第一版不得复用或泄露其私有图片、R2 路径、D1 数据或家庭资料。

### 5.7 自然 `/nature/`

自然页不是摄影瀑布流，也不是百科图鉴。应为“自然观察与行走档案”。

筛选：

```text
全部   植物   动物   季节   骑行与徒步   城市与山野   地方记忆
```

每项可包含：

```text
标题
分类与标签
日期
一张可选缩略图
地点（只到城市/区县/路线/模糊区域）
观察文字
图片与说明
查阅资料
相关观察
```

默认不得公开精确家庭地址、常用住址、私密路线起终点或他人隐私。

### 5.8 书架 `/bookshelf/`

书架是结构化索引，读书文章属于“写作”。

书籍字段：

```text
书名、作者、出版信息（可选）、状态（在读/读过/想读）、
开始日期、完成日期、分类、标签、一句话感受、相关笔记。
```

不强制评分。

### 5.9 收藏 `/favorites/`

收藏不是书签垃圾场。每一条必须包含自己的说明。

分类：

```text
技术资料与规范
网站与知识库
软件与工具
文章与长文
图片、设计与字体
长期参考资料
```

条目字段：

```text
名称、外部链接、分类、个人说明、标签、收藏日期、状态（长期保留/待整理）。
```

公开页面只显示已经整理过的收藏；“待整理”可仅留在私有内容文件中。

### 5.10 关于 `/about/`

结构：

```text
我是谁
我记录什么
这个站点是什么
写作与更新原则
站点技术栈
隐私、版权与联系
```

需要明确：

- 原创内容版权归作者；
- 转载内容只保留合法必要引用、摘要或原链接；
- 旧文章保留来源和时间；
- 有错误持续修订；
- 涉及他人的内容尽量匿名化；
- 不公开敏感个人位置与家庭隐私。

### 5.11 隐藏辅助页

- `/now/`：当前在做的事，约每月更新一两次，不是日记；
- `/archive/`：按年月归档；
- `/tags/`：不做标签云，只做规整索引；
- `/search/`：本地全文检索；支持 `Ctrl+K` / `Cmd+K`；
- `/studio/`：私有写作工作台占位，不加入公开导航；
- `/404/`：简单、克制，并提供返回首页、搜索、最新文章的入口。

---

## 6. 内容数据模型与文件组织

### 6.1 内容形式（严格枚举）

```text
article       长文文章
answer        问答
note          短记
guide         操作指南
reference     清单 / 速查 / 资料索引
project-log   项目日志
observation   自然观察
book          书籍条目
favorite      收藏条目
tool          工具条目
project       项目条目
series        专题条目
```

### 6.2 内容领域（严格枚举）

```text
technology
reading
life
nature
tools
```

### 6.3 文章 Frontmatter

```yaml
---
title: "PCIe 拆包规则：RCB、MPS 与 Completion 边界"
description: "梳理 Requester、Completer、MPS、MRRS 与 RCB 在拆包中的关系。"
date: 2026-06-25
updated: 2026-06-30
category: technology
format: answer
topics:
  - PCIe
  - Protocol
tags:
  - RCB
  - MPS
  - MRRS
series:
  - pcie-high-speed-interconnect
source:
  type: native # native | csdn | zhihu | enjoy-life-blog
  originalUrl: ""
  originalPublishedAt: null
migratedAt: null
draft: false
featured: false
cover: ""
coverAlt: ""
---
```

### 6.4 旧内容 Frontmatter

```yaml
---
title: "更改 Linux 默认启动内核版本，修改 GRUB 设置"
description: "在 Ubuntu 等系统中安全切换默认启动内核，不直接编辑 grub.cfg。"
date: 2024-01-30
updated: 2026-07-01
category: technology
format: guide
topics:
  - Linux
  - Boot
  - GRUB
tags:
  - Ubuntu
series:
  - dev-environment-productivity
source:
  type: csdn
  originalUrl: "https://blog.csdn.net/BjarneCpp?type=blog"
  originalPublishedAt: 2024-01-30
migratedAt: 2026-07-01
legacy: true
draft: true
---
```

### 6.5 项目数据字段

```yaml
name: "DictFloat"
slug: "dictfloat"
summary: "面向技术阅读的浮动词典与术语表 Chrome 扩展。"
status: "active" # active | building | archived | private
startedAt: 2026-06
tech:
  - Chrome Extension
  - JavaScript
links:
  demo: ""
  github: ""
  store: ""
featured: true
visibility: public # public | private
```

### 6.6 推荐目录结构

```text
enjoy-life/
├─ PERSONAL_SITE_CODEX_HANDOFF.md
├─ README.md
├─ package.json
├─ astro.config.mjs
├─ tsconfig.json
├─ .nvmrc
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ static/
├─ src/
│  ├─ config/
│  │  └─ site.ts
│  ├─ content/
│  │  ├─ config.ts
│  │  ├─ writing/
│  │  ├─ series/
│  │  ├─ tools/
│  │  ├─ projects/
│  │  ├─ nature/
│  │  ├─ books/
│  │  └─ favorites/
│  ├─ data/
│  │  ├─ navigation.ts
│  │  ├─ now.ts
│  │  ├─ source-inventory.ts
│  │  └─ project-links.ts
│  ├─ assets/
│  │  ├─ images/
│  │  └─ icons/
│  ├─ components/
│  │  ├─ SiteHeader.astro
│  │  ├─ SiteFooter.astro
│  │  ├─ ThemeToggle.astro
│  │  ├─ ContentList.astro
│  │  ├─ ContentMeta.astro
│  │  ├─ SourceBadge.astro
│  │  ├─ SeriesList.astro
│  │  ├─ Figure.astro
│  │  ├─ CodeBlock.astro
│  │  ├─ TableOfContents.astro
│  │  ├─ SearchDialog.astro
│  │  └─ EmptyState.astro
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  ├─ ContentLayout.astro
│  │  └─ ProjectLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ writing/
│  │  ├─ series/
│  │  ├─ tools/
│  │  ├─ nature/
│  │  ├─ bookshelf/
│  │  ├─ favorites/
│  │  ├─ projects/
│  │  ├─ about.astro
│  │  ├─ search.astro
│  │  ├─ now.astro
│  │  ├─ archive.astro
│  │  ├─ tags.astro
│  │  ├─ rss.xml.ts
│  │  └─ 404.astro
│  ├─ styles/
│  │  ├─ tokens.css
│  │  ├─ global.css
│  │  ├─ prose.css
│  │  └─ syntax.css
│  └─ scripts/
│     └─ theme.ts
├─ scripts/
│  ├─ validate-content.mjs
│  ├─ build-search.mjs
│  └─ migration/
│     ├─ README.md
│     └─ content-manifest.example.json
└─ docs/
   └─ content-migration-notes.md
```

---

## 7. 技术实现要求

### 7.1 技术栈

第一版建议：

```text
Astro（静态输出）
TypeScript
Markdown / MDX Content Collections
Astro 内建 Markdown / Shiki 高亮能力
Pagefind（本地静态全文搜索）
@astrojs/rss
@astrojs/sitemap
Lucide 图标
原生 CSS
GitHub
Cloudflare Pages
```

### 7.2 明确不做

```text
不做登录
不做评论
不做访客统计面板
不做在线后台编辑器
不做数据库
不做 SSR
不做 R2 / D1 / KV 依赖
不做广告
不做点赞和社交计数
不做复杂动画
不做第三方搜索 SaaS
```

第一版是纯静态站。只有当后续确实需要私有管理、图片上传或访客交互时，才讨论 Pages Functions / Workers / R2 / D1。

### 7.3 搜索

- 采用 **Pagefind** 或等价纯静态本地全文搜索；
- 索引文章、专题、工具、项目、书籍、收藏、自然观察；
- 搜索结果必须区分类型，例如：`[文章]`、`[工具]`、`[项目]`、`[书籍]`、`[收藏]`；
- 支持键盘快捷键 `Ctrl+K` / `Cmd+K`；
- 无结果时提供“查看全部写作”“浏览专题”等下一步入口；
- 不将用户查询发送给第三方服务。

### 7.4 图片与媒体

- 内容图片优先存放在仓库的 `src/assets/images/`；
- 为新内容提供 `Figure.astro` / MDX 图片组件，支持 `src`、`alt`、`caption`、`credit`、`width`；
- 尽可能通过 Astro 图像处理生成现代格式与合适尺寸；
- 图片必须有 alt；照片必须能显示图片说明；
- 禁止无意义的图片边框、浮夸阴影、固定大高度裁切；
- 视频默认不自动播放；
- 外部视频需延迟加载；
- 公开站不上传家庭私密图片、位置敏感照片、未经授权他人肖像。

### 7.5 代码、表格与技术内容

- 使用 Shiki 或 Astro 默认高亮；
- 所有代码块提供可访问的“复制代码”按钮；
- 长代码块允许横向滚动，不能压缩到难读；
- 表格外包可横向滚动容器；
- 行内代码须与中文文本保持良好折行；
- 命令行、寄存器、二进制、地址、参数表采用等宽字体；
- 支持 Mermaid 可作为后续增强项，但第一版不依赖复杂运行时。

### 7.6 可访问性与性能

- 页面有合理 `<main>`、`<header>`、`<nav>`、`<article>`、`<footer>` 语义；
- 首个标题为单个 `h1`；
- 键盘能访问全部导航、筛选、主题、搜索、复制按钮；
- 可见 focus 状态；
- 图片懒加载但首屏主图不误懒加载；
- 默认无大体积 Web 字体下载；
- 尽量少 JavaScript；
- Lighthouse 目标：性能、可访问性、最佳实践、SEO 均不低于 90；
- 自动生成 sitemap、RSS、canonical、Open Graph、基础 JSON-LD（WebSite / BlogPosting）。

---

## 8. 已有内容与链接盘点

> 此表同时是内容迁移的**来源台账**。原站内容不应由生产站在运行时抓取；迁移应将用户确认的原创内容整理为本仓库 Markdown / MDX 文件。

### 8.1 用户已有公开内容来源

| 来源 | 链接 | 主要内容 / Codex 处理方式 |
|---|---|---|
| 旧个人博客 旧个人站 | （已退役旧站，仅本地迁移使用） | 迁入高质量原创文章；保留原始日期与 `source.type: enjoy-life-blog`。主要方向：PCIe、读书笔记、植物、地方与生活。 |
| 知乎个人内容页 | https://www.zhihu.com/people/wikiye/posts | 迁入用户明确确认的高质量回答、图文与视频类记录；保持“问题 / 回答”结构；不要自动抓取，页面可能限制访问。 |
| CSDN 博客主页 | https://blog.csdn.net/BjarneCpp?type=blog | 技术教程、操作指南、速查、工具和问题排查；保留来源与原始日期。 |
| PCIe 中文资料库 GitHub | https://github.com/yakoye/pci-express-technology-3.0-chinese | 作为项目与专题入口；可链接至仓库、在线文档和项目说明。 |

### 8.2 旧 旧个人站 已识别内容

以下不是完整迁移清单，而是本次已确认的公开内容样本与归类方向。上线前应由用户决定每篇是否迁入、修订或仅保留原链接。

| 原文标题 / 主题 | 原日期 | 建议领域 | 形式 | 推荐专题 / 页面 |
|---|---:|---|---|---|
| PCIe低功耗 | 2024-06-12 | 技术 | article / note | PCIe 与高速互连 |
| PCIe问题汇总-1 | 2024-06-06 | 技术 | answer / reference | PCIe 与高速互连 |
| PCIe MSI 简介 | 2024-05-24 | 技术 | article | PCIe 与高速互连 |
| PCIe概念，一句话说明白 | 2024-05-08 | 技术 | reference | PCIe 与高速互连 |
| 方言：常州话 | 2024-05-06 | 生活 / 自然 | article | 自然观察与行走 / 地方记忆 |
| 关于肥胖 | 2024-05-06 | 生活 | essay | **默认不迁入公开站；用户另行确认** |
| 沙生植物 | 2024-04-29 | 自然 | observation / reference | 自然观察与行走 |
| 常见植物的花 | 2024-04-25 | 自然 | reference | 自然观察与行走 |
| 极简生活 | 2024-04-03 | 生活 | note / essay | 写作 / 生活 |
| 《原则》1、2 | 2023-11-11 | 阅读 | note | 阅读与学习方法 |
| 《臣服实验》 | 2023-06-27 | 阅读 | note | 阅读与学习方法 |
| 《额尔古纳河右岸》读书笔记 | 2022-09-11 | 阅读 | article | 书架 + 阅读与学习方法 |
| 《平面国》总结 | 2022-02-26 | 阅读 | article | 书架 + 阅读与学习方法 |
| 《自我突围》施一公 | 2021-06-10 | 阅读 | note | 书架 + 阅读与学习方法 |

### 8.3 CSDN 已识别原创内容方向

CSDN 主页当前显示的内容覆盖：密码学、区块链、C 语言、Python、Linux、算法与数据结构、程序员自我提升等目录；近期与历史文章可优先按如下方式迁移。**迁移时只搬运用户原创、允许修订的内容；转载和资源下载页不搬全文。**

#### A. 开发环境与工程效率（高优先级）

```text
更改 Linux 默认启动内核版本，修改 GRUB 设置
在 Windows 10 的 PowerShell 上实现对 Linux 机器登录，VS Code 同样可登录
右键菜单“以 Notepad++ 打开”
Windows BAT 脚本增加 / 删除防火墙入站与出站规则
MobaXterm 自动替换 =>、!= 等符号的关闭方法
如何使用 SSH 远程控制一台 Windows 服务器
VS Code SSH Remote 多级跳转、免密登录与默认平台
编译 pciutils（lspci / setpci）到 Windows x86 平台
MinGW-W64-builds 版本差异
bash 脚本 if 比较中使用 x 的原因
Word 批量设置图片大小与对齐（宏）
Git 速查
C 语言速查
VS Code 常用快捷键、配置、问题
Linux 速查
Git 使用问题总结
Xshell 配色方案
Vim 中文速查图
Source Insight 中文注释乱码
Graphviz 画流程图
编程官方 / 标准 / 草稿文档汇总
Diff 命令输出格式
Linux 根目录空间不足、du 未发现大文件
Windows 文件夹重命名 / 移动异常
Windows 软件窗口或对话框超出屏幕
Chrome 快捷键
Ubuntu 开机进入命令行模式
systemd 时间同步
VMware Tools 与共享文件夹
Manjaro 安装
双击 HTML / CMD 自动打开网站
OpenSSL 工具使用
```

建议：`category: technology`，对应 `guide` / `reference` / `answer`，专题为 `dev-environment-productivity`。

#### B. 技术基础、数学与工程知识

```text
傅里叶变换解析：来龙去脉全解析
C 语言入门
密码学、区块链、算法与数据结构相关内容
PCIe 资料整理与问题记录
```

建议：`technology` 或 `reading`，对应 `article` / `note` / `reference`，按具体内容归入 PCIe、数学与计算机基础、阅读与学习方法。

#### C. 迁移限制

以下默认不直接迁移正文：

```text
转载的“老男孩读 PCIe 介绍系列”或其他第三方原文
包含第三方书籍 PDF、网盘资源、破解 / 规避许可内容的页面
单纯软件资源下载页
版权或来源无法确认的图片、附件和文档
```

做法：可写一篇新的原创导读、学习笔记、资源索引，并给出原始合法链接与来源说明。

### 8.4 知乎内容

知乎个人页：

```text
https://www.zhihu.com/people/wikiye/posts
```

本次用户提供了长截图，确认其内容由大量**问题回答、短文字、图文、视频/外链卡片**构成。由于知乎页面可能限制自动访问，**不要在构建或部署期间依赖抓取**，也不要根据模糊截图猜测具体标题。

迁移策略：

1. 用户手动选择要迁移的回答；
2. 逐条保存为 Markdown / MDX；
3. 保留原始问题与回答结构；
4. 在 Frontmatter 写入 `source.type: zhihu`、原始 URL、原始发布日期；
5. 图文内容保留图片说明，视频内容不自动播放；
6. 与技术、阅读、自然、生活、工具等领域重新归档；
7. 不单独设置“知乎”顶栏栏目；知乎只是来源，不是永久分类。

### 8.5 已有项目与作品清单（需由用户补充公开链接）

以下项目均应预先建入 `src/content/projects/` 或 `src/content/tools/`；没有公开 URL 时使用 `draft: true` 或 `links: {}`，避免出现虚假链接。

| 名称 | 类型 | 建议领域 / 页面 | 当前链接状态 |
|---|---|---|---|
| PCIe 中文资料库 | 文档与资料库 | 项目 + PCIe 专题 | GitHub 已知 |
| PCIe LTSSM Visualizer | 网页工具 | 工具 + 项目 | 待补充 |
| Register Bitfield Parser | 网页工具 | 工具 + 项目 | 待补充 |
| lspci Explorer | 网页工具 | 工具 + 项目 | 待补充 |
| RegCalc64 | Chrome 扩展 / 工具 | 工具 + 项目 | 待补充 |
| DictFloat | Chrome 扩展 | 工具 + 项目 | 待补充 |
| 简读 · 网页阅读助手 | Chrome 扩展 | 工具 + 项目 | 待补充 |
| Quick Note Float | Chrome 扩展 | 工具 + 项目 | 待补充 |
| KeyPass | Chrome 扩展 | 工具 + 项目 | 待补充 |
| 飞书小助理 | Chrome 扩展 | 工具 + 项目 | 待补充 |
| Rich Editor | 网页工具 | 工具 + 项目 | 待补充 |
| 人生进度可视化 | 网页工具 | 工具 + 项目 | 待补充 |
| FamilyJourney | 家庭生活记录网站 | 项目（仅公开说明） | 待补充；不可引用私密数据 |
| Obsidian 日记系统 | 个人知识管理系统 | 项目 + 专题 | 待补充 |
| 个人博客站点本身 | 网站 | 项目 | 本仓库上线后自动生成 |

---

## 9. 外部设计与内容参考链接

这些站点用于理解参考点，不用于复制设计或爬取内容。

| 链接 | 可借鉴 | 必须避免 |
|---|---|---|
| https://agri-history.ihns.ac.cn/ | 朴素文字内容、长期资料感 | 正文过宽、左贴边、首页缺少规整日期 |
| https://agri-history.ihns.ac.cn/scholars/zhangxinguang/20120505.htm | 学术正文与长文阅读感 | 内容不居中、可读行宽过长 |
| https://agri-history.ihns.ac.cn/agrobiology/20110429.htm | 纯文本文章的克制感 | 全屏平铺、缺少现代导航与时间信息 |
| http://scz.617.cn:8/ | 文字排版规整、信息密度克制 | 左贴边、宽屏阅读距离过长 |
| https://jia.je/kb/mathematics/abstract_algebra.html | 知识库的章节组织、清晰信息结构 | 过重的文档站导航感、复杂侧栏常驻 |
| （已退役旧站，仅本地迁移使用） | 旧内容主题与长期写作脉络 | 模板博客化右侧栏、旧式摘要布局 |

---

## 10. 内容迁移流程

### 10.1 迁移原则

```text
先迁高价值原创内容；
保留首次发布时间和来源；
只维护一份 Markdown 正文；
迁入后允许修订，但必须显示最后修订日期；
转载和版权不清晰内容改写为原创导读 / 索引或仅保留链接；
不得通过运行时抓取平台文章来充当站点内容源。
```

### 10.2 迁移优先级

**第一批种子内容（建议 10–16 篇）：**

```text
1. PCIe 低功耗
2. PCIe 问题汇总-1
3. PCIe MSI 简介
4. PCIe 概念，一句话说明白
5. 更改 Linux 默认启动内核版本，修改 GRUB 设置
6. PowerShell / VS Code 登录 Linux
7. VS Code SSH Remote 多级跳转
8. Git 速查
9. Linux 速查
10. 傅里叶变换解析
11. 沙生植物
12. 常见植物的花
13. 《额尔古纳河右岸》读书笔记
14. 《平面国》总结
15. DictFloat 项目介绍
16. RegCalc64 或 LTSSM Visualizer 项目介绍
```

**第二批：** CSDN 工具与环境文章、知乎精选回答、旧博客全部阅读与自然文章、项目日志。

### 10.3 迁移辅助文件

Codex 需创建：

```text
scripts/migration/content-manifest.example.json
docs/content-migration-notes.md
```

示例：

```json
[
  {
    "source": "csdn",
    "originalUrl": "https://blog.csdn.net/BjarneCpp?type=blog",
    "title": "更改 Linux 默认启动内核版本，修改 GRUB 设置",
    "originalPublishedAt": "2024-01-30",
    "targetSlug": "set-linux-default-kernel-grub",
    "category": "technology",
    "format": "guide",
    "series": ["dev-environment-productivity"],
    "status": "to-review"
  }
]
```

这是迁移清单，不是自动爬虫。用户可从平台复制自己的原文，再由脚本检查 Frontmatter、日期、链接和图片引用。

---

## 11. Cloudflare Pages + GitHub 部署方案

### 11.1 部署策略

第一版采用**静态 Astro 站点**：

```text
本地开发 → Git commit → Git push → GitHub → Cloudflare Pages 自动构建 → 生产站
```

- 生产分支：`main`
- 开发分支：`dev`
- 每次推送 `dev` 生成 Cloudflare 预览部署；
- 合并到 `main` 生成生产部署；
- 不使用 SSR；不使用 Astro Cloudflare adapter；静态输出直接生成 `dist/`。

### 11.2 仓库建议

```text
仓库名：enjoy-life
分支：main / dev
Node：24（使用 `.nvmrc` 固定）
包管理器：npm（除非仓库已明确统一为 pnpm）
```

### 11.3 Cloudflare Pages Dashboard 配置

```text
Framework preset: Astro
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 24
```

- 首次部署前，先在本地完成：`npm ci && npm run build`；
- 项目名称可使用：`enjoy-life`（如 Cloudflare 名称冲突可调整，但站点标题仍为 Enjoy Life）；
- 绑定 GitHub 仓库，开启预览部署；
- 域名后续单独绑定，不把域名写死进组件；
- 在 `src/config/site.ts` 通过环境变量或单一配置项设置 `siteUrl`。

### 11.4 资源隔离

- 当前已有的 `familyjourney-uploads`（R2）与 `familyjourney-prod`（D1）属于 **FamilyJourney 私有项目**；
- 个人公开站 v1 不使用它们；
- 后续若站点需要大量公开图片，单独新建专用 Bucket，例如 `enjoy-life-media`，不要和家庭私密媒体混用；
- 任何密钥、R2 binding、D1 binding、CF API Token 不得提交到 Git。

### 11.5 部署完成后的检查

```text
[ ] 生产站与 dev 预览站均可访问
[ ] 首页、写作、文章、专题、工具、自然、书架、收藏、项目、关于可访问
[ ] 404 正常
[ ] RSS 正常
[ ] sitemap 正常
[ ] robots.txt 正常
[ ] 深浅色主题无闪烁
[ ] 手机宽度下导航和表格不溢出
[ ] 文章中文正文两端对齐，代码/表格不强行对齐
[ ] 搜索索引在生产构建后可用
[ ] 所有外链安全地新窗口打开（target=_blank 时带 rel=noopener noreferrer）
[ ] 所有公开来源文章有 source 标识和原始链接
```

---

## 12. 交付阶段与验收标准

### Milestone 1 — 基础骨架

```text
Astro 项目初始化
内容集合 schema
全局字体、颜色、主题
SiteHeader / SiteFooter
首页静态样式
所有导航页面占位
Cloudflare Pages 可构建
```

**验收：** 本地 `npm run dev`、`npm run build` 成功；基本页面路由完整；桌面宽度 890px、手机 16px 边距正确。

### Milestone 2 — 写作与内容阅读

```text
写作列表
文章详情页
来源 badge
Frontmatter 校验
代码、表格、引用、图片、脚注样式
RSS、sitemap、SEO 基础元数据
```

**验收：** 至少放入 8 篇种子内容（可先为占位 Markdown，不搬运全文）；时间、来源、文章类型、专题关联均正确显示。

### Milestone 3 — 专题、工具、项目、自然

```text
专题总览与详情
工具总览与详情
项目总览与详情
自然总览与详情
书架与收藏基础列表
```

**验收：** 项目与工具能区分；无 URL 的项目不会产生失效链接；自然条目图文清晰且不暴露精确位置。

### Milestone 4 — 搜索与精修

```text
Pagefind 搜索
Ctrl/Cmd + K
移动端导航优化
无障碍与焦点态
Lighthouse 优化
部署文档与 README
```

**验收：** 搜索可准确区分内容类型；所有键盘交互可用；不引入不必要的大型前端框架。

---

## 13. 明确禁止的设计偏差

Codex 不得把本项目做成以下任意一种：

```text
- 卡片墙作品集
- 企业官网
- 互联网产品落地页
- 只有技术博客、丢失阅读/自然/生活的站
- 全屏宽正文、左贴边旧网站
- 瀑布流摄影图库
- 侧栏永久占据大量宽度的文档站
- 复杂登录后台 / CMS
- 主题颜色过多的个人主页
- 自动抓取 CSDN、知乎内容的站
- 把 FamilyJourney 私有资料公开混入本站
```

---

## 14. Codex 实施顺序

1. 先读本文档，输出简短 implementation plan；
2. 建立 Astro 静态项目与内容 schema；
3. 完成排版系统、导航、主题和响应式规则；
4. 先完成首页、写作列表页、文章详情页三张核心页面；
5. 再实现专题、工具、项目、自然、书架、收藏；
6. 加入搜索、RSS、sitemap、SEO；
7. 创建种子内容与迁移 manifest；
8. 写 README，包含本地开发、内容新增、构建与 Cloudflare 部署方法；
9. 执行 lint / typecheck / build；
10. 不要在未确认内容和链接前虚构文章正文、项目网址或个人信息。

---

## 15. Codex 启动提示词（可直接复制）

```text
请读取仓库根目录的 PERSONAL_SITE_CODEX_HANDOFF.md，并严格按其中的全部约束实现网站。

先输出：
1. 你理解的页面、内容模型与技术方案；
2. 拟创建/修改的文件清单；
3. 分阶段执行计划。

随后直接开始实现第一阶段：Astro 静态站骨架、内容集合 schema、全局排版/主题系统、响应式顶部导航、首页、写作列表页、文章详情页，并保证 npm run build 成功。

重要：不要使用 React、数据库、登录、CMS、SSR、Cloudflare R2/D1；不要添加卡片墙、大 Banner、瀑布流、复杂动画或虚构的链接/内容。站点必须以 Markdown 内容、GitHub 备份、Cloudflare Pages 静态部署为中心。正文桌面最大 890px，手机左右约 16px，普通中文正文两端对齐，但代码/表格/列表/引用保持左对齐。
```

---

## 16. 本文档维护规则

- 新增工具、项目或公开链接时，优先更新 `src/content/` 对应条目；
- 站点架构级变更再更新本文档；
- 每次迁入旧文章时，必须保留来源字段；
- 不把个人工作台、私有家庭资料、Token、密码、精确地理位置写进公开仓库；
- 本文档中的“待补充链接”由用户在确认公开后再填写；Codex 不负责猜测。


## v0.7 补充

- 顶栏、归档、favicon、写作筛选和图片迁移策略见 `docs/V0.7_LAYOUT_MEDIA.md` 与 `docs/MEDIA_MANAGEMENT.md`。

## v0.11 追加交接

评论功能已经移除；不要重新加入评论组件、评论 API、D1 或公开管理后台。


## v0.11.2：本地一键预览

日常本地查看站点时，使用根目录 `preview-local.cmd`；第一次安装依赖或依赖变化时使用 `preview-local.cmd -Install`。脚本会检查、测试、构建、启动 `http://127.0.0.1:4321/` 并自动打开浏览器。停止时使用 `stop-local-preview.cmd`。


## v0.12 update

- Public project navigation has been removed. `/projects/` redirects to `/tools/`; public extensions, websites and libraries belong in `src/content/tools.json`.
- Keep the tools categories: `browser-extension`, `pcie-hardware`, `writing-media`, `websites-life`, `knowledge-library`.
- Article images default to a centered 60% desktop reading width and 100% on mobile; only MDX `Figure wide` should opt into full width.
- New pages: `/about/me/`; new life series writing for cycling and running.


## v0.14 当前栏目约束

- 阅读页只显示已公开阅读文章；不要同时复制书架、读过、阅读专题。
- 技术页仅链接到有已公开文章的专题；不能有空专题详情页。
- 工具页优先放自己 DIY 项目、Chrome 扩展与网页工具、PCIe / 硬件工具、文字图片记录工具、资料库；生活网站放到生活页。
- `Rich Editor` 和 `quick_note_richtext` 的公开入口必须是可直接渲染的 HTML，不是 GitHub `blob` 代码查看页。

---

## v0.17 阅读站外专题

`/reading/` 在本站阅读文章后增加了站外专题目录。数据来源于 `src/content/reading-sites.json`，由用户明确提供的独立博客和长文专栏整理而来。该目录不做推荐排名；名称直接跳转站外网页；通过 `pinned: true` 支持用户自己维护“常看”。

## v0.17.1：站外专题描述

阅读页的站外专题仍维护在 `src/content/reading-sites.json`。本版已将 69 个站点的描述改为更具辨识度的单句提示；新增或修改时，请优先保留一个能让人立刻联想到该站点的关键词或代表性主题，并尽量控制为桌面端一行。常看站点仍只通过 `pinned: true` 手动置顶。


## v0.17.2 update

External reading data is user-maintained in `src/content/reading-sites.json` and now contains 96 unique entries. Preserve descriptions; desktop list is single-line with ellipsis and native hover text, mobile wraps.
