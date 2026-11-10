#!/usr/bin/env node
// Accessibility gate for the built site (`npm run build` first).
//
// Every page in dist/ is loaded in headless Chromium and checked with axe-core
// against WCAG 2.2 AA, at desktop width and at 320px (the WCAG 1.4.10 reflow
// width), plus a check that nothing scrolls sideways at 320px. Any finding
// fails the run, so the deploy workflow never publishes a page that breaks
// the standard we promise clients.
//
// axe catches roughly a third to a half of WCAG issues - the machine-checkable
// ones. Keyboard, screen-reader and plain-language checks are still done by a
// person before a release.
import { createServer } from 'node:http';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const DIST = new URL('../dist/', import.meta.url).pathname;
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'reflow-320', width: 320, height: 640 },
];
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

// URL path of every page in dist/: 'a/index.html' -> '/a/', 'b.html' -> '/b.html'
function htmlPages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) htmlPages(p, out);
    else if (name === 'index.html') out.push(`/${p.slice(DIST.length, -'index.html'.length)}`);
    else if (name.endsWith('.html')) out.push(`/${p.slice(DIST.length)}`);
  }
  return out.sort();
}

function serve() {
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(DIST, path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!file.startsWith(DIST) || !existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

if (!existsSync(DIST)) {
  console.error(`No dist/ at ${DIST} - run the build first.`);
  process.exit(1);
}
const pages = htmlPages(DIST);
if (pages.length === 0) {
  console.error('No pages found in dist/.');
  process.exit(1);
}

// `--list` prints the pages that would be checked, without a browser.
if (process.argv.includes('--list')) {
  console.log(pages.join('\n'));
  process.exit(0);
}

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
let problems = 0;

try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const path of pages) {
      const page = await context.newPage();
      await page.goto(base + path, { waitUntil: 'networkidle' });
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      for (const v of violations) {
        problems++;
        console.error(`FAIL ${path} [${vp.name}] ${v.id} (${v.impact}): ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.error(`     at ${n.target.join(' ')}`);
        console.error(`     ${v.helpUrl}`);
      }
      if (vp.width === 320) {
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 1) {
          problems++;
          console.error(`FAIL ${path} [${vp.name}] reflow: page scrolls sideways by ${overflow}px (WCAG 1.4.10)`);
        }
      }
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

const checks = pages.length * VIEWPORTS.length;
if (problems) {
  console.error(`\n${problems} accessibility problem(s) across ${pages.length} pages. Fix them before this ships.`);
  process.exit(1);
}
console.log(`Accessibility check passed: ${pages.length} pages x ${VIEWPORTS.length} viewports (${checks} runs), WCAG 2.2 AA, no findings.`);
