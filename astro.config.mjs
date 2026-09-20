import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://freedom45.co.uk',
  // Root by default (real site). Sandbox previews build under a subpath via
  // PREVIEW_BASE=/<demo>/ so several demos can share one static host.
  base: process.env.PREVIEW_BASE || '/',
  trailingSlash: 'never',
});
