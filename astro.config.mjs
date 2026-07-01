import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  site: process.env.SITE_URL,
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: false },
  },
});
