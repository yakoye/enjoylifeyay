export const site = {
  name: 'Enjoy Life',
  description: '记录技术、阅读、工具、自然与生活的个人知识与生活档案。',
  tagline: '技术 · 阅读 · 工具 · 自然 · 生活',
  url: 'https://enjoylifeyay.pages.dev',
  authorName: '',
  githubUrl: '',
  defaultOgImage: '',
  navigation: [
    { href: '/', label: '主页' },
    { href: '/writing/', label: '写作' },
    { href: '/series/', label: '专题' },
    { href: '/tools/', label: '工具' },
    { href: '/nature/', label: '自然' },
    { href: '/bookshelf/', label: '书架' },
    { href: '/favorites/', label: '收藏' },
    { href: '/projects/', label: '项目' },
    { href: '/about/', label: '关于' },
  ],
} as const;

export const categoryLabels = {
  technology: '技术',
  reading: '阅读',
  life: '生活',
  nature: '自然',
  tools: '工具',
} as const;

export const formatLabels = {
  article: '长文',
  answer: '问答',
  note: '短记',
  guide: '操作指南',
  reference: '清单 / 速查',
  'project-log': '项目日志',
} as const;
