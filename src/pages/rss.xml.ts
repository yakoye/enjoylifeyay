import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export async function GET() {
  const entries = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: site.name,
    description: site.description,
    site: site.url,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/writing/${entry.id}/`,
    })),
    customData: '<language>zh-CN</language>',
  });
}
