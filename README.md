# Freedom45

> Welcome to the repo. Whether you're hiring, vetting, or just nosy — you're our kind of person.

Marketing site for [Freedom45](https://freedom45.co.uk) — a software development studio for startups.

## Tech

Built with [Astro](https://astro.build). Static output, deployed to GitHub Pages.

## Getting started

```bash
npm install
npm run dev        # local dev server at localhost:4321
```

## Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # preview the build locally
```

## Deploy

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages automatically. See `.github/workflows/deploy.yml`.

## Project structure

```
src/
  config.ts              # shared constants (URLs, email)
  styles/global.css      # CSS variables, reset, base styles
  layouts/
    BaseLayout.astro     # <head>, favicon, optional Google Fonts
    SiteLayout.astro     # BaseLayout + Background + Nav + Footer
  components/
    Background.astro     # animated blob/canvas background + toggle
    Nav.astro            # site navigation
    Footer.astro         # copyright footer
  pages/
    index.astro          # homepage (scroll-snap, flywheel)
    services/index.astro # services page
    moodbuddy/           # standalone app pages (own branding)
public/
  CNAME                  # custom domain config
```
