import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  integrations: [mdx(), sitemap()],
  site: site.url,
  base,
  markdown: {
    shikiConfig: {
      // Keep syntax tokens legible in both manually-selected themes.
      themes: {
        light: 'github-light',
        dark: 'github-dark-default',
      },
      defaultColor: false,
      wrap: false,
    },
  },
});
