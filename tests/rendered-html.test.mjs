import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Inventions site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Cocktail Bar in Old Montreal \| Inventions by A\\Maze<\/title>/i);
  assert.match(html, /A cocktail laboratory in Old Montreal/i);
  assert.match(html, /No escape game required/i);
  assert.match(html, /Read its story/);
  assert.match(html, /The Science Experiment/);
  assert.doesNotMatch(html, /Glassware|Appearance|Garnish/);
  assert.match(html, /Tesla’s Enigmas/);
  assert.match(html, /480 Rue Saint-Jean/);
  assert.match(html, /Private events/);
  assert.match(html, /4\.6/);
  assert.doesNotMatch(html, /The current is on|Choose your current|25 seats/i);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("server-renders the complete French version", async () => {
  const response = await render("/fr");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Bar à cocktails dans le Vieux-Montréal \| Inventions par A\\Maze<\/title>/i);
  assert.match(html, /lang="fr"/);
  assert.match(html, /Un laboratoire de cocktails dans le Vieux-Montréal/);
  assert.match(html, /Aucun jeu d’évasion requis/);
  assert.match(html, /L’Expérience scientifique/);
  assert.match(html, /Les énigmes de Tesla/);
  assert.match(html, /Le coffre du mort/);
  assert.match(html, /480, rue Saint-Jean/);
  assert.doesNotMatch(html, /Book an experience|View the menu|The current is on|Choose your current/);
});

test("server-renders the bilingual team-building pages", async () => {
  const english = await render("/team-building");
  const englishHtml = await english.text();
  assert.match(englishHtml, /Old Port team building/i);
  assert.match(englishHtml, /\$1,000 \+ tax/);
  assert.match(englishHtml, /Up to 30/);
  assert.match(englishHtml, /Check availability/);

  const french = await render("/fr/evenements-de-groupe");
  const frenchHtml = await french.text();
  assert.match(frenchHtml, /Team building au Vieux-Port/i);
  assert.match(frenchHtml, /1 000 \$ \+ taxes/);
  assert.match(frenchHtml, /Jusqu’à 30/);
});

test("server-renders focused SEO and event pages", async () => {
  const paths = ["/cocktail-bar-old-montreal", "/menu", "/private-events", "/escape-games", "/faq", "/fr/bar-a-cocktails-vieux-montreal", "/fr/menu", "/fr/evenements-prives", "/fr/jeux-evasion", "/fr/faq"];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /Inventions/i, path);
  }
  assert.match(await (await render("/private-events")).text(), /Make the bar yours/i);
  assert.match(await (await render("/faq")).text(), /Can I come without playing an escape game/i);
});
