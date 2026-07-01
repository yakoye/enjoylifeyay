export const site = {
  name: 'Enjoy Life',
  description: '记录技术、工具、阅读、自然与生活的个人知识与生活档案。',
  tagline: '技术 · 工具 · 阅读 · 自然 · 生活',
  url: 'https://enjoylifeyay.pages.dev',
  authorName: '',
  githubUrl: '',
  defaultOgImage: '',
  navigation: [
    { href: '/', label: '主页' },
    { href: '/technology/', label: '技术' },
    { href: '/tools/', label: '工具' },
    { href: '/reading/', label: '阅读' },
    { href: '/nature/', label: '自然' },
    { href: '/life/', label: '生活' },
    { href: '/archive/', label: '归档' },
    { href: '/about/', label: '关于' },
  ],
} as const;

export const categoryLabels = {
  technology: '技术',
  reading: '阅读',
  life: '生活',
  nature: '自然',
  tool: '工具',
} as const;

export const formatLabels = {
  article: '长文',
  answer: '问答',
  note: '短记',
  guide: '操作指南',
  reference: '清单 / 速查',
  'project-log': '项目日志',
  observation: '自然观察',
} as const;
