# Bugs and limitations

## Resolved

- GitHub Pages asset paths now honor the `/inventions-by-amaze/` base path.
- English and French pages are prerendered instead of shipping an empty client-only HTML shell.
- Canonical URLs, reciprocal `hreflang`, LocalBusiness/Organization structured data, `robots.txt`, and `sitemap.xml` are generated for all public routes.
- The hero and header now build the parent-brand line separately with the official A\Maze logo. French uses `PAR`; the obsolete `The current is on / Le courant passe` tagline is no longer shown.
- The ornate Inventions artwork is cropped to remove its baked-in parent line, preventing duplicate or mismatched A\Maze wordmarks and avoiding the old navy rectangle problem.
- The footer now uses a dedicated large `I`-in-circle secondary mark inspired by the wine-glass application; it no longer repeats the full hero lockup or reduces the `I` to an unreadable detail.
- Mobile Lighthouse contrast and accessible-name mismatches in the menu tabs, language switcher, and A\Maze family link were corrected.
- French navigation, CTAs, menu-story cues, footer, accessibility labels, and group-event page were audited for English fallback copy.
- Cocktail artwork and key venue/game photos are served as compressed WebP files to reduce page weight.
- Mobile menu categories, address overlay, cocktail-detail sizing, language switcher, and duplicate divider issues were corrected.
- Booking CTAs now lead to the official A\Maze Old Port location pages instead of the third-party booking URL.
- Small-bites prices now show House-Roasted Nuts at `$8` and Olives or Pickles at `$6`.
- ESLint now ignores generated static/SSR bundles while continuing to lint authored source files.
- Static HTML replacement callbacks preserve literal dollar signs in prices and JSON-LD.
- The homepage now identifies Inventions as a cocktail bar in Old Montreal, explicitly says no escape game is required, removes `25 seats` from the hero, and makes menu/directions the primary actions.
- The former bartender hero image and awkward mobile inset were replaced with recent cocktail photography; responsive checks show no horizontal overflow at 390 px or 1440 px.
- Private events and team building now have bar-first landing pages, published-capacity context, optional game add-ons, custom-quote language, and a structured inquiry form.
- Dedicated bilingual menu, cocktail-bar, private-event, team-building, escape-game, and FAQ routes are prerendered and included in the 14-URL sitemap.
- The hero/header lockup no longer relies on mismatched fixed aspect ratios, `overflow: hidden`, or `mix-blend-mode`; the full ornament and wordmark now remain visible and optically centered at every breakpoint.
- The reusable footer/menu monogram now uses the same outlined `I`-in-circle SVG geometry as the wine-glass production mark instead of a CSS approximation.
- The brand lockup and labelled hero/menu groups now expose valid ARIA roles instead of applying labels to semantically neutral elements.

## Known limitations

- GitHub Pages cannot provide application-level redirects or custom response headers. A custom production domain would improve brand ownership and SEO consolidation.
- Menu, prices, packages, and hours are maintained in code and must be rechecked against the official A\Maze pages when operations change.
- Google Search Console and Business Profile verification require owner account access and are not configured by this repository.
- Cocktail stories are editorial adaptations of the supplied 2026 cocktail document; current recipes remain based on the published menu rather than draft recipes in that document.
- The visible `4.6 / 284 Google reviews` trust signal is an August 2026 snapshot and must be rechecked periodically; the static site cannot update it automatically.
- No public minimum spend or starting price was available for bar-only rental, so the site correctly says `Custom quote` rather than inventing a number.
- The event inquiry form opens the visitor’s email application via `mailto:`. GitHub Pages does not provide server-side form handling or CRM storage.
