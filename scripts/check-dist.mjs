#!/usr/bin/env node
// Basic SEO/works regression check on the built site (`npm run build` first).
// Not a real test suite - there isn't one yet - but a cheap guard against the
// kind of regression that actually happens on a static marketing site: a new
// page shipped with no <title>/description, a broken canonical, a missing H1.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function hasTag(html, re) {
  return re.test(html);
}

const files = htmlFiles(DIST);
if (files.length === 0) {
  console.error(`No .html files found under ${DIST} - did the build run?`);
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(DIST.length);
  const isNoindex = hasTag(html, /<meta\s+name="robots"\s+content="noindex/i);
  // SiteLayout always injects the schema.org script - the signal that this is a real
  // marketing page (vs a bare-BaseLayout utility page like a privacy policy, which
  // intentionally skips social-share metadata nobody will ever use).
  const isSitePage = hasTag(html, /application\/ld\+json/i);

  const checks = [
    ['<title> non-empty', /<title>[^<]+<\/title>/i],
    ['at least one <h1>', /<h1[\s>]/i],
  ];
  if (!isNoindex) checks.push(['canonical link (indexable page)', /<link\s+rel="canonical"/i]);
  if (isSitePage) {
    checks.push(
      ['meta description non-empty', /<meta\s+name="description"\s+content="[^"]+"/i],
      ['og:title', /property="og:title"/i],
      ['og:description', /property="og:description"/i],
      ['og:image', /property="og:image"/i],
    );
  }

  for (const [label, re] of checks) {
    if (!hasTag(html, re)) {
      console.error(`FAIL ${rel}: missing ${label}`);
      failed++;
    }
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed across ${files.length} page(s).`);
  process.exit(1);
}
console.log(`OK: ${files.length} page(s), all basic SEO/structure checks passed.`);
