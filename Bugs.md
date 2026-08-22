# Bugs and limitations

## Resolved

- GitHub Pages asset paths now honor the `/inventions-by-amaze/` base path.
- English and French pages are prerendered instead of shipping an empty client-only HTML shell.
- Canonical URLs, reciprocal `hreflang`, LocalBusiness/Organization structured data, `robots.txt`, and `sitemap.xml` are generated for all public routes.
- The French hero and header now use localized lockups: `PAR A\MAZE` and `LE COURANT PASSE.`
- French lockups use transparent alpha assets so no baked-in navy rectangle appears over the hero gradient.
- The footer now uses a dedicated large `I`-in-circle secondary mark inspired by the wine-glass application; it no longer repeats the full hero lockup or reduces the `I` to an unreadable detail.
- Mobile Lighthouse contrast and accessible-name mismatches in the menu tabs, language switcher, and A\Maze family link were corrected.
- French navigation, CTAs, menu-story cues, footer, accessibility labels, and group-event page were audited for English fallback copy.
- Cocktail artwork and key venue/game photos are served as compressed WebP files to reduce page weight.
- Mobile menu categories, address overlay, cocktail-detail sizing, language switcher, and duplicate divider issues were corrected.
- Booking CTAs now lead to the official A\Maze Old Port location pages instead of the third-party booking URL.
- Small-bites prices now show House-Roasted Nuts at `$8` and Olives or Pickles at `$6`.
- ESLint now ignores generated static/SSR bundles while continuing to lint authored source files.
- Static HTML replacement callbacks preserve literal dollar signs in prices and JSON-LD.

## Known limitations

- GitHub Pages cannot provide application-level redirects or custom response headers. A custom production domain would improve brand ownership and SEO consolidation.
- Menu, prices, packages, and hours are maintained in code and must be rechecked against the official A\Maze pages when operations change.
- Google Search Console and Business Profile verification require owner account access and are not configured by this repository.
- Cocktail stories are editorial adaptations of the supplied 2026 cocktail document; current recipes remain based on the published menu rather than draft recipes in that document.
