# 图片与媒体管理

## v0.7 的正式选择

**默认把本站公开图片放进 Git 仓库的 `public/images/`，再由 Cloudflare Pages 发布。**

这不是让访客从 GitHub 加载图片：构建后的图片会随 `dist/` 一起上传到 Cloudflare Pages，访问者请求的是本站 `/images/...` 路径。GitHub 只负责保存源文件；运行时图片由 Cloudflare 网络提供。

这一阶段最适合本站，因为它免费、简单、可随文章版本一起回退，也不需要单独维护 R2 权限、桶策略、域名或上传流程。Cloudflare Pages 的 Direct Upload 可以把本地构建出的静态资源发布到 Cloudflare 网络；静态图片属于可缓存资源。详见 Cloudflare 官方文档链接（见项目交接文档）。

## 目录规则

不要让图片目录依赖 Markdown 文件名或文章 slug。文章改名时，不应该要求图片跟着移动。

每篇有图片的文章设置一个**永久不轻易修改**的 `mediaKey`：

```yaml
mediaKey: "2026-07-01-pcie-serdes"
```

推荐目录：

```text
public/images/
├─ articles/
│  └─ 2026-07-01-pcie-serdes/
│     ├─ cover.webp
│     ├─ pcs-pma.svg
│     └─ equalization-flow.png
├─ nature/
│  └─ 2026/
│     └─ 2026-07-01-city-plant/
│        ├─ 01.webp
│        └─ 02.webp
└─ legacy/
   └─ legacy-2024-06-12-pcie-low-power/
      └─ image-<stable-hash>.png
```

Markdown 中使用根路径：

```md
![PCIe 分层图](/images/articles/2026-07-01-pcie-serdes/pcs-pma.svg)
```

`mediaKey` 是图片目录的稳定身份，不等于 Markdown 文件名。以后把
`2026-07-01-pcie-serdes.md` 改名为别的 slug，也**不要**改 `mediaKey` 或图片目录。

## 新文章添加图片

1. 新建文章时先决定 `mediaKey`。
2. 图片先用 RIOT、Squoosh 或同类工具压缩；照片优先 WebP，截图/图表按清晰度选择 PNG 或 WebP。
3. 放到 `public/images/articles/<mediaKey>/`。
4. 在 Markdown 使用 `/images/...` 路径，并写清楚替代文本。
5. 执行 `npm run build`，再用 `npm run preview` 确认图片存在、比例正常、暗色主题下图表可读。

不在公开站中直接使用：

```text
https://raw.githubusercontent.com/...
https://github.com/.../blob/...
```

它们会把访客访问重新依赖到 GitHub；本站应该优先加载自己的 `/images/...`。

## 把已迁入旧文的图片搬到本站

v0.7 提供了一次性脚本，只处理仍然指向你旧 旧个人站 图片目录的 Markdown 图片。

先只看计划，不下载、不改文件：

```powershell
npm run import:legacy-images -- --dry-run
```

确认后下载图片、写进 `public/images/legacy/`，并把 Markdown 中相应链接改成本站路径：

```powershell
npm run import:legacy-images -- --write
```

只处理指定文章：

```powershell
npm run import:legacy-images -- --write --media-key=legacy-2024-06-12-pcie-low-power
```

完成后务必检查改动，再构建：

```powershell
git status
npm run check
npm test
npm run build
npm run check:links
npm run preview
```

这个脚本需要你本地能访问旧 GitHub 博客。若访问 GitHub 较慢，可以先完成文章与站点发布，图片迁移分批执行；在迁移完成前，旧文仍会使用原始图片链接。

## 什么时候再使用 R2

先不要为了少量文章图片上 R2。以下情况再迁移到 R2：

- 图片长期增长到让 Git 仓库明显笨重；
- 需要上传大量照片或家庭相册类媒体；
- 单张文件较大、文章图片更新很频繁；
- 需要内容与代码仓库完全独立管理。

R2 适合作为第二阶段的对象存储。当前 R2 Standard 免费额度包含每月 10 GB-month 存储、100 万次 Class A 操作、1000 万次 Class B 操作，Internet egress 免费；额度和收费政策可能调整，启用前以 Cloudflare 官方定价页为准。不要把 FamilyJourney 的私有 R2 桶和本站公开图片混在一起。

届时建议单独建一个公开桶，例如：

```text
enjoylife-public-media
```

并用独立公开域名或 Workers 路由提供图片，不直接暴露私有家庭桶。现阶段不在源码中预设 R2 Token、绑定或私有配置。

## 公开图片的长期规则

- 只上传你拥有、授权明确或可公开使用的图片。
- 对旧文章的第三方图片、书封、截图先确认权利范围。
- 不上传家庭照片、精确住址、私密路线和私人文件到本站公开 `public/images/`。
- 优先保留原图的本地备份；站点里放压缩后的 WebP/PNG/JPG 副本。
- 每次新增一组图片都和对应 Markdown 一起提交 Git。这样文章和图片可以一起回退。

## v0.12 图片显示规则

- 桌面端文章中的普通图片默认显示为正文列约 60% 宽度，并居中，适合普通截图、照片和小型示意图。
- 手机端普通图片自动使用 100% 宽度，避免 60% 过小。
- 只有必须细看细节的流程图、宽表格、终端长截图才使用全宽 `wide`；在 MDX 中使用：

```mdx
<Figure wide src="/images/articles/<mediaKey>/wide-diagram.png" alt="详细流程图" caption="图 1：详细流程图" />
```

图片目录与 `mediaKey` 的关系仍保持不变：文章文件可改名，图片目录不要随 Markdown slug 改名。
