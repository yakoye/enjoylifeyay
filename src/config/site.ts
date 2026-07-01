export const site = {
  name: 'EnjoyLife',
  tagline: '技术 · 阅读 · 自然 · 工具 · 生活',
  url: import.meta.env.SITE || '',
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
