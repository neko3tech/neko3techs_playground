import { defineConfig } from 'astro/config';
import { siteMeta } from './src/lib/constants';
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
const {
  siteUrl
} = siteMeta;


// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  markdown: {
    theme: "dracula",
    langs: [],
    wrap: true
  },
  integrations: [mdx(), prefetch()]
});