// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages user site (repo: mihneacatana.github.io).
// Drives sitemap/RSS/canonical/OG URLs. If you later switch to a custom
// domain, change this and add public/CNAME containing the domain.
const SITE = 'https://mihneacatana.github.io';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
