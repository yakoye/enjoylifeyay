import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const date = z.coerce.date();
const optionalDate = z.union([date, z.null()]).optional();

const sourceSchema = z.object({
  type: z.enum(['native', 'csdn', 'zhihu', 'enjoy-life-blog']),
  originalUrl: z.url().or(z.literal('')).default(''),
  originalPublishedAt: optionalDate,
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().default(''),
    date,
    updated: optionalDate,
    category: z.enum(['technology', 'reading', 'life', 'nature', 'tools']),
    format: z.enum(['article', 'answer', 'note', 'guide', 'reference', 'project-log']),
    topics: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    series: z.array(z.string()).default([]),
    source: sourceSchema.default({ type: 'native', originalUrl: '' }),
    migratedAt: optionalDate,
    legacy: z.boolean().default(false),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    cover: z.string().default(''),
    coverAlt: z.string().default(''),
  }),
});

export const collections = { writing };
