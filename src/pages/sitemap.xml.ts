import type { APIRoute } from 'astro';
import { pageUrl } from '../config';

// Freedom45 pages only - the standalone app pages (moodbuddy/) are Nothrix Labs, not this brand.
const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((p) => !p.startsWith('./moodbuddy/'))
  .map((p) => p.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/?index$/, '') || '/')
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = pages
    .map((path) => `  <url><loc>${pageUrl(path, site!)}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
