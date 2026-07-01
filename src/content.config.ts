import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const date = z.coerce.date();
const optionalDate = z.union([date, z.null()]).optional();
const optionalUrl = z.url().or(z.literal('')).default('');
const common = {
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
};

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date,
    updated: optionalDate,
    source: z.enum(['native', 'CSDN', 'Zhihu', 'EnjoyLifeBlog']).default('native'),
    sourceUrl: optionalUrl,
    migratedAt: optionalDate,
    domain: z.enum(['technology', 'reading', 'life', 'nature', 'tool']),
    format: z.enum(['article', 'answer', 'note', 'guide', 'reference', 'project-log', 'observation']),
    topics: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    series: z.array(z.string()).default([]),
    legacy: z.boolean().default(false),
    cover: z.string().default(''),
    coverAlt: z.string().default(''),
    mediaKey: z.string().default(''),
    ...common,
  }),
});

const series = defineCollection({
  loader: file('src/content/series.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    audience: z.string().default(''),
    status: z.enum(['active', 'directory', 'archived']),
    order: z.number().int().nonnegative(),
    topics: z.array(z.string()).default([]),
    progress: z.number().min(0).max(100).optional(),
    ...common,
  }),
});

const tools = defineCollection({
  loader: file('src/content/tools.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.enum(['pcie-hardware', 'browser-extension', 'developer-productivity', 'writing-media', 'life']),
    status: z.enum(['available', 'development', 'archived', 'link-pending']),
    url: optionalUrl,
    githubUrl: optionalUrl,
    articles: z.array(z.string()).default([]),
    project: z.string().default(''),
    ...common,
  }),
});

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    status: z.enum(['active', 'development', 'archived', 'private', 'link-pending']),
    category: z.enum(['browser-extension', 'web-tool', 'knowledge-library', 'private']).default('web-tool'),
    startedAt: optionalDate,
    techStack: z.array(z.string()).default([]),
    url: optionalUrl,
    githubUrl: optionalUrl,
    versions: z.array(z.string()).default([]),
    articles: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    ...common,
  }),
});

const nature = defineCollection({
  loader: file('src/content/nature.json'),
  schema: z.discriminatedUnion('draft', [
    z.object({ id: z.string(), draft: z.literal(true) }),
    z.object({ id: z.string(), draft: z.literal(false), featured: z.boolean().default(false), title: z.string(), description: z.string(), date,
      category: z.enum(['plant', 'animal', 'season', 'hiking-cycling', 'urban-wild', 'photo-aerial', 'local-memory']),
      location: z.string().default(''), method: z.string().default(''), images: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().default('') })).default([]),
      tags: z.array(z.string()).default([]), relatedWriting: z.array(z.string()).default([]) }),
  ]),
});

const books = defineCollection({
  loader: file('src/content/books.json'),
  schema: z.discriminatedUnion('draft', [
    z.object({ id: z.string(), draft: z.literal(true) }),
    z.object({ id: z.string(), draft: z.literal(false), featured: z.boolean().default(false), title: z.string(), author: z.string(), status: z.enum(['reading', 'read', 'wishlist']),
      startedAt: optionalDate, finishedAt: optionalDate,
      category: z.enum(['technology-engineering', 'history-society', 'philosophy-psychology', 'literature-life']),
      note: z.string().default(''), relatedWriting: z.array(z.string()).default([]) }),
  ]),
});

const favorites = defineCollection({
  loader: file('src/content/favorites.json'),
  schema: z.discriminatedUnion('draft', [
    z.object({ id: z.string(), draft: z.literal(true) }),
    z.object({ id: z.string(), draft: z.literal(false), featured: z.boolean().default(false), name: z.string(), url: z.url(),
      category: z.enum(['technical-spec', 'website-knowledge', 'software-tool', 'article', 'design-media-font', 'long-term-reference']),
      note: z.string().min(1), tags: z.array(z.string()).default([]), savedAt: optionalDate,
      status: z.enum(['keep', 'review']).default('keep') }),
  ]),
});

export const collections = { writing, series, tools, projects, nature, books, favorites };
