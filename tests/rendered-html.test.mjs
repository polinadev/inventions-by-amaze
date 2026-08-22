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
  assert.match(html, /<title>Tesla-Inspired Cocktail Bar &amp; Escape Games \| Inventions Montréal<\/title>/i);
  assert.match(html, /The current is on\./i);
  assert.match(html, /Choose your current/i);
  assert.match(html, /Read its story/);
  assert.match(html, /The Science Experiment/);
  assert.doesNotMatch(html, /Glassware|Appearance|Garnish/);
  assert.match(html, /Tesla’s Enigmas/);
  assert.match(html, /480 Rue Saint-Jean/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("server-renders the complete French version", async () => {
  const response = await render("/fr");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Bar à cocktails inspiré de Tesla et jeux d’évasion \| Inventions Montréal<\/title>/i);
  assert.match(html, /lang="fr"/);
  assert.match(html, /Choisis ton courant/);
  assert.match(html, /L’Expérience scientifique/);
  assert.match(html, /Les énigmes de Tesla/);
  assert.match(html, /Le coffre du mort/);
  assert.match(html, /480, rue Saint-Jean/);
  assert.doesNotMatch(html, /Book an experience|View the menu/);
});

test("server-renders the bilingual team-building pages", async () => {
  const english = await render("/team-building");
  const englishHtml = await english.text();
  assert.match(englishHtml, /Bring the team/i);
  assert.match(englishHtml, /\$1,000 \+ tax/);
  assert.match(englishHtml, /Up to 30/);

  const french = await render("/fr/evenements-de-groupe");
  const frenchHtml = await french.text();
  assert.match(frenchHtml, /Rassemblez l’équipe/i);
  assert.match(frenchHtml, /1 000 \$ \+ taxes/);
  assert.match(frenchHtml, /Jusqu’à 30/);
});
