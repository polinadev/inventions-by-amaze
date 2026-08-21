# Inventions by A\\Maze — local website

A bilingual website for the Inventions cocktail bar and A\\Maze Old Port escape games. All fonts and images are stored inside the project, so the design does not depend on hotlinked media.

## Live site

- English: https://polinadev.github.io/inventions-by-amaze/
- Français: https://polinadev.github.io/inventions-by-amaze/fr/

Every push to `main` runs the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`. The workflow builds a static version with the correct repository base path, while the existing local Vinext app remains available for development.

## Run it on this Mac

From Terminal:

```bash
cd "/Users/polina/Documents/old port operations/inventions-local-site"
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Or double-click `Start Inventions.command` in Finder.

## Share it on the local network

Run:

```bash
npm run dev:lan
```

The server binds to `0.0.0.0:3000`. On another device connected to the same Wi-Fi, open:

```text
http://YOUR-MAC-IP:3000
```

To find the Mac IP:

```bash
ipconfig getifaddr en0
```

macOS Firewall may ask whether Node can accept incoming connections; allow it for LAN sharing. The Mac must remain awake while the site is being shared.

## Checks

```bash
npm run lint
npm test
npm run build:pages
```

`npm test` creates a production build and checks the server-rendered page.

## Live content sources

Content was checked on **August 20, 2026**:

- https://www.amazemontreal.com/old-port-escape-room-restaurant
- https://www.amazemontreal.com/old-port-menu
- the three official Old Port game pages
- the A\\Maze Old Port Google Maps listing

Before any public launch, confirm these source inconsistencies with the team:

- Cocktail of the Season is `$17` in the visible list but `$15` in the source modal.
- The IPA brewery appears as both `Wills` and `Wils`; this site uses `Wills`.
- The paired wine prices are not labelled by the source, so this site does not call them glass/bottle.
- Dedicated game pages and the source menu disagree on two success rates; this site uses the dedicated game pages.
- French and English menu pages differ on a few zero-proof items and prices.

Real venue/game photos were downloaded locally from the official A\\Maze site and its Maps “By owner” gallery. Confirm photographer/reuse rights before publishing outside the business.
