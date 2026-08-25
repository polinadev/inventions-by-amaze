import { mkdir, readFile, writeFile } from "node:fs/promises";
import { renderPath } from "../pages-server/render.mjs";

const outputDirectory = new URL("../pages-dist/", import.meta.url);
const template = await readFile(new URL("index.html", outputDirectory), "utf8");
const origin = "https://polinadev.github.io/inventions-by-amaze";
const socialImage = `${origin}/images/inventions-social-preview.png`;

const localBusiness = {
  "@type": "BarOrPub", "@id": `${origin}/#bar`, name: "Inventions by A\\Maze", url: `${origin}/`, image: socialImage,
  telephone: "+1-514-504-2139", email: "escape@amazemontreal.com", priceRange: "$$",
  servesCuisine: ["Cocktails", "Wine", "Small plates"], menu: "https://www.amazemontreal.com/old-port-menu",
  address: { "@type": "PostalAddress", streetAddress: "480 Rue Saint-Jean", addressLocality: "Montréal", addressRegion: "QC", postalCode: "H2Y 2S3", addressCountry: "CA" },
  geo: { "@type": "GeoCoordinates", latitude: 45.5027776, longitude: -73.5577795 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "10:00", closes: "23:00" },
  ],
  parentOrganization: { "@id": "https://www.amazemontreal.com/#organization" },
  sameAs: ["https://www.amazemontreal.com/old-port-escape-room-restaurant", "https://www.instagram.com/amazemontreal/", "https://www.facebook.com/amazemontreal"],
};
const organization = { "@type": "Organization", "@id": "https://www.amazemontreal.com/#organization", name: "A\\Maze Montréal", url: "https://www.amazemontreal.com/", logo: `${origin}/images/amaze-official-logo.webp` };
const webPage = (path, name, language) => ({ "@type": "WebPage", "@id": `${origin}${path}#page`, name, url: `${origin}${path}`, about: { "@id": `${origin}/#bar` }, inLanguage: language });
const service = (name, url) => ({ "@type": "Service", name, provider: { "@id": "https://www.amazemontreal.com/#organization" }, areaServed: "Montréal", url });

const routes = [
  { path: "/", output: "index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/", title: "Cocktail Bar in Old Montreal | Inventions by A\\Maze", description: "A Tesla-inspired cocktail bar inside A\\Maze Old Port. Original cocktails, small plates and zero-proof drinks—no escape game required.", graph: [localBusiness, organization] },
  { path: "/fr/", output: "fr/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/", title: "Bar à cocktails dans le Vieux-Montréal | Inventions par A\\Maze", description: "Un bar à cocktails inspiré de Tesla chez A\\Maze Vieux-Port. Cocktails originaux, bouchées et options sans alcool—aucun jeu requis.", graph: [{ ...localBusiness, name: "Inventions par A\\Maze", description: "Bar à cocktails inspiré de Nikola Tesla dans le Vieux-Montréal; aucun jeu d’évasion requis." }, organization] },
  { path: "/cocktail-bar-old-montreal/", output: "cocktail-bar-old-montreal/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/bar-a-cocktails-vieux-montreal/", title: "Tesla-Inspired Cocktail Bar in Old Montreal | Inventions", description: "Visit Inventions, an intimate cocktail bar hidden inside A\\Maze Old Port in Montréal. Walk-ins welcome; no escape game required.", graph: [webPage("/cocktail-bar-old-montreal/", "Cocktail bar in Old Montreal", "en-CA"), localBusiness, organization] },
  { path: "/fr/bar-a-cocktails-vieux-montreal/", output: "fr/bar-a-cocktails-vieux-montreal/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/cocktail-bar-old-montreal/", title: "Bar à cocktails dans le Vieux-Montréal | Inventions", description: "Visitez Inventions, un bar à cocktails intime caché chez A\\Maze Vieux-Port à Montréal. Aucun jeu d’évasion requis.", graph: [webPage("/fr/bar-a-cocktails-vieux-montreal/", "Bar à cocktails dans le Vieux-Montréal", "fr-CA"), localBusiness, organization] },
  { path: "/menu/", output: "menu/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/menu/", title: "Cocktail Menu in Old Montreal | Inventions by A\\Maze", description: "Explore Tesla-inspired cocktails, zero-proof drinks, wine, local beer and small plates at Inventions in Old Montreal.", graph: [webPage("/menu/", "Inventions cocktail menu", "en-CA"), { "@type": "Menu", name: "Inventions menu", url: `${origin}/menu/` }, localBusiness, organization] },
  { path: "/fr/menu/", output: "fr/menu/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/menu/", title: "Menu de cocktails dans le Vieux-Montréal | Inventions", description: "Découvrez les cocktails inspirés de Tesla, boissons sans alcool, vins, bières locales et bouchées chez Inventions.", graph: [webPage("/fr/menu/", "Menu d’Inventions", "fr-CA"), { "@type": "Menu", name: "Menu d’Inventions", url: `${origin}/fr/menu/` }, localBusiness, organization] },
  { path: "/private-events/", output: "private-events/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/evenements-prives/", title: "Private Bar Events in Old Montreal | Inventions", description: "Rent an intimate Old Montreal cocktail bar for corporate 5 à 7s, birthdays and celebrations. Escape games are an optional add-on.", graph: [webPage("/private-events/", "Private events at Inventions", "en-CA"), service("Private bar events at Inventions", `${origin}/private-events/`), localBusiness, organization] },
  { path: "/fr/evenements-prives/", output: "fr/evenements-prives/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/private-events/", title: "Privatisation de bar dans le Vieux-Montréal | Inventions", description: "Privatisez un bar à cocktails intime pour un 5 à 7, anniversaire ou célébration. Le jeu d’évasion est facultatif.", graph: [webPage("/fr/evenements-prives/", "Événements privés chez Inventions", "fr-CA"), service("Événements privés chez Inventions", `${origin}/fr/evenements-prives/`), localBusiness, organization] },
  { path: "/team-building/", output: "team-building/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/evenements-de-groupe/", title: "Team Building in Montreal Old Port | Inventions by A\\Maze", description: "Cocktails, private escape games and outdoor challenges for Montréal team building and corporate 5 à 7s at A\\Maze Old Port.", graph: [webPage("/team-building/", "Old Port team building", "en-CA"), service("A\\Maze Old Port team building", "https://www.amazemontreal.com/team-building-activity"), localBusiness, organization] },
  { path: "/fr/evenements-de-groupe/", output: "fr/evenements-de-groupe/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/team-building/", title: "Team building au Vieux-Port de Montréal | Inventions", description: "Cocktails, jeux d’évasion privés et défis extérieurs pour votre team building ou 5 à 7 chez A\\Maze Vieux-Port.", graph: [webPage("/fr/evenements-de-groupe/", "Team building au Vieux-Port", "fr-CA"), service("Team building A\\Maze Vieux-Port", "https://www.amazemontreal.com/fr/evenement-corporatif"), localBusiness, organization] },
  { path: "/escape-games/", output: "escape-games/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/jeux-evasion/", title: "Escape Games in Montreal Old Port | A\\Maze & Inventions", description: "Discover three private A\\Maze Old Port escape experiences and enjoy Inventions before or after. Bar visits do not require a game.", graph: [webPage("/escape-games/", "Escape games in Montreal Old Port", "en-CA"), service("A\\Maze Old Port escape games", "https://www.amazemontreal.com/old-port-escape-room-restaurant"), localBusiness, organization] },
  { path: "/fr/jeux-evasion/", output: "fr/jeux-evasion/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/escape-games/", title: "Jeux d’évasion au Vieux-Port de Montréal | A\\Maze", description: "Découvrez trois expériences privées A\\Maze Vieux-Port et profitez d’Inventions avant ou après. Le bar reste accessible sans jeu.", graph: [webPage("/fr/jeux-evasion/", "Jeux d’évasion au Vieux-Port", "fr-CA"), service("Jeux d’évasion A\\Maze Vieux-Port", "https://www.amazemontreal.com/fr/jeu-devasion-et-restaurant-vieux-port"), localBusiness, organization] },
  { path: "/faq/", output: "faq/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/faq/", title: "Inventions Cocktail Bar FAQ | Old Montreal", description: "Answers about walk-ins, reservations, bar hours, food, zero-proof cocktails, accessibility, parking, private events and escape games.", graph: [webPage("/faq/", "Inventions cocktail bar FAQ", "en-CA"), localBusiness, organization] },
  { path: "/fr/faq/", output: "fr/faq/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/faq/", title: "FAQ du bar Inventions | Vieux-Montréal", description: "Réponses sur les visites spontanées, réservations, heures, nourriture, sans alcool, accessibilité, stationnement et jeux d’évasion.", graph: [webPage("/fr/faq/", "FAQ du bar Inventions", "fr-CA"), localBusiness, organization] },
];

const absolute = (path) => `${origin}${path === "/" ? "/" : path}`;
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function headFor(route, noindex = false) {
  const alternateLocale = route.lang === "fr" ? "en-CA" : "fr-CA";
  const defaultUrl = route.lang === "fr" ? absolute(route.alternatePath) : absolute(route.path);
  return [
    `<meta name="description" content="${escapeHtml(route.description)}" />`, noindex ? '<meta name="robots" content="noindex,follow" />' : "",
    `<link rel="canonical" href="${absolute(route.path)}" />`, `<link rel="alternate" hreflang="${route.locale}" href="${absolute(route.path)}" />`,
    `<link rel="alternate" hreflang="${alternateLocale}" href="${absolute(route.alternatePath)}" />`, `<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`, `<meta property="og:description" content="${escapeHtml(route.description)}" />`, '<meta property="og:type" content="website" />',
    `<meta property="og:locale" content="${route.locale.replace("-", "_")}" />`, `<meta property="og:locale:alternate" content="${alternateLocale.replace("-", "_")}" />`,
    `<meta property="og:url" content="${absolute(route.path)}" />`, `<meta property="og:image" content="${socialImage}" />`, '<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />', `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": route.graph }).replaceAll("<", "\\u003c")}</script>`,
  ].filter(Boolean).join("\n    ");
}
function buildHtml(route, noindex = false) {
  return template.replace(/<html lang="[^"]+">/, () => `<html lang="${route.lang}">`)
    .replace(/<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/, () => `<!-- SEO_HEAD_START -->\n    ${headFor(route, noindex)}\n    <!-- SEO_HEAD_END -->`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(route.title)}</title>`)
    .replace('<div id="root"></div>', () => `<div id="root">${renderPath(route.path)}</div>`);
}
for (const route of routes) {
  const target = new URL(route.output, outputDirectory);
  await mkdir(new URL("./", target), { recursive: true });
  await writeFile(target, buildHtml(route));
}
await writeFile(new URL("404.html", outputDirectory), buildHtml(routes[0], true));
await writeFile(new URL("robots.txt", outputDirectory), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map((route) => `  <url>
    <loc>${absolute(route.path)}</loc>
    <xhtml:link rel="alternate" hreflang="${route.locale}" href="${absolute(route.path)}" />
    <xhtml:link rel="alternate" hreflang="${route.locale === "fr-CA" ? "en-CA" : "fr-CA"}" href="${absolute(route.alternatePath)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${route.locale === "fr-CA" ? absolute(route.alternatePath) : absolute(route.path)}" />
  </url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("sitemap.xml", outputDirectory), sitemap);
