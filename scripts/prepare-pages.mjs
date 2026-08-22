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

const routes = [
  { path: "/", output: "index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/", title: "Tesla-Inspired Cocktail Bar & Escape Games | Inventions Montréal", description: "Discover Tesla-inspired cocktails, immersive escape games and private events inside A\\Maze Old Port in Montréal.", graph: [localBusiness, organization] },
  { path: "/fr/", output: "fr/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/", title: "Bar à cocktails inspiré de Tesla et jeux d’évasion | Inventions Montréal", description: "Découvrez des cocktails inspirés de Tesla, des jeux d’évasion immersifs et des événements privés chez A\\Maze Vieux-Port à Montréal.", graph: [{ ...localBusiness, description: "Bar à cocktails inspiré de Nikola Tesla, situé dans A\\Maze Vieux-Port à Montréal." }, organization] },
  { path: "/team-building/", output: "team-building/index.html", locale: "en-CA", lang: "en", alternatePath: "/fr/evenements-de-groupe/", title: "Old Port Team Building & Group Events | Inventions by A\\Maze", description: "Private escape games, outdoor team challenges and cocktails for Montréal group events at A\\Maze Old Port.", graph: [{ "@type": "WebPage", "@id": `${origin}/team-building/#page`, name: "Old Port Team Building & Group Events", url: `${origin}/team-building/`, about: { "@id": `${origin}/#bar` }, inLanguage: "en-CA" }, { "@type": "Service", name: "A\\Maze Old Port team building", provider: { "@id": "https://www.amazemontreal.com/#organization" }, areaServed: "Montréal", url: "https://www.amazemontreal.com/team-building-activity" }, localBusiness, organization] },
  { path: "/fr/evenements-de-groupe/", output: "fr/evenements-de-groupe/index.html", locale: "fr-CA", lang: "fr", alternatePath: "/team-building/", title: "Team building et événements de groupe | Inventions par A\\Maze", description: "Jeux d’évasion privés, défi extérieur et cocktails pour vos événements de groupe chez A\\Maze Vieux-Port à Montréal.", graph: [{ "@type": "WebPage", "@id": `${origin}/fr/evenements-de-groupe/#page`, name: "Team building et événements de groupe", url: `${origin}/fr/evenements-de-groupe/`, about: { "@id": `${origin}/#bar` }, inLanguage: "fr-CA" }, { "@type": "Service", name: "Team building A\\Maze Vieux-Port", provider: { "@id": "https://www.amazemontreal.com/#organization" }, areaServed: "Montréal", url: "https://www.amazemontreal.com/fr/evenement-corporatif" }, localBusiness, organization] },
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
