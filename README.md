# Inventions by A\Maze

Bilingual website for Inventions, the Nikola Tesla-inspired cocktail bar inside A\Maze Old Port in Montréal. The site combines the bar menu, cocktail stories, escape games, private group packages, venue information, and official A\Maze booking links.

## Live routes

- English: https://polinadev.github.io/inventions-by-amaze/
- Français: https://polinadev.github.io/inventions-by-amaze/fr/
- Team building: https://polinadev.github.io/inventions-by-amaze/team-building/
- Événements de groupe: https://polinadev.github.io/inventions-by-amaze/fr/evenements-de-groupe/

Every push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow installs locked dependencies, runs lint and the full test suite, builds the bilingual static site, and deploys `pages-dist` to GitHub Pages.

## Requirements and installation

- Node.js `22.13.0` or newer
- npm

```bash
cd "/Users/polina/Documents/old port operations/inventions-local-site"
npm ci
cp .env.example .env.local
```

No secrets or external APIs are required. `.env.example` documents the Pages base path used by the static build.

## Local development

```bash
npm run dev
```

Open http://localhost:3000. Alternatively, double-click `Start Inventions.command` in Finder.

To share on the same Wi-Fi:

```bash
npm run dev:lan
ipconfig getifaddr en0
```

Open `http://YOUR-MAC-IP:3000` on the other device. The Mac must stay awake and allow Node through the macOS firewall.

## Production builds and checks

```bash
npm run lint
npm test
```

`npm test` performs:

1. Vinext production build.
2. Server-rendered English, French, and group-page tests.
3. GitHub Pages client and SSR builds.
4. Static SEO, localization, route, sitemap, structured-data, price, and official-link tests.

To preview the exact Pages artifact:

```bash
PAGES_BASE=/inventions-by-amaze/ npm run build:pages
PAGES_BASE=/inventions-by-amaze/ npm run preview:pages -- --host 127.0.0.1
```

## Deployment

Normal release path:

```bash
git add .
git commit -m "Describe the change"
git push origin main
gh run watch
```

Manual rebuild, if needed:

```bash
gh workflow run deploy-pages.yml
```

The release is complete only after the Pages workflow succeeds and all four public routes are checked on the live URL.

## SEO implementation

- Fully prerendered HTML for all four public routes.
- Unique English/French titles and descriptions.
- Self-referencing canonicals and reciprocal `en-CA` / `fr-CA` / `x-default` `hreflang` links.
- Open Graph and Twitter cards.
- Schema.org `BarOrPub`, `Organization`, `WebPage`, and `Service` JSON-LD.
- Generated `robots.txt` and XML sitemap.
- Semantic headings, descriptive image alt text, official A\Maze relationship links, and local Montréal address data.
- Optimized WebP cocktail, venue, and game images plus reduced-motion support.
- A dedicated secondary `I` monogram for compact footer and hospitality touchpoints, derived from the wine-glass application rather than repeating the full hero lockup.

## Content sources

Current operational facts should be verified against:

- https://www.amazemontreal.com/old-port-escape-room-restaurant
- https://www.amazemontreal.com/fr/jeu-devasion-et-restaurant-vieux-port
- https://www.amazemontreal.com/old-port-menu
- https://www.amazemontreal.com/team-building-activity
- https://www.amazemontreal.com/fr/evenement-corporatif
- the official Old Port game pages and A\Maze-owned venue photography
- `OldPort Cocktail 2026.pdf`, supplied by the owner, for cocktail-story narrative direction

Current owner-approved overrides: House-Roasted Nuts `$8`; Olives or Pickles `$6`.

See [Bugs.md](./Bugs.md) for resolved issues and known limitations. Confirm image reuse rights, menu details, prices, hours, and group-package availability before treating the site as the permanent production source of truth.
