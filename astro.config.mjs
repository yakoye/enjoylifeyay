import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

export default defineConfig({
  output: 'static',
  integrations: [mdx(), sitemap()],
  site: site.url,
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: false },
  },
});
