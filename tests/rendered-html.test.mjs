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
  assert.match(html, /<title>Inventions by A\\Maze \| Cocktails &amp; Escape Games<\/title>/i);
  assert.match(html, /The current is on\./i);
  assert.match(html, /Choose your current/i);
  assert.match(html, /View cocktail illustration/);
  assert.doesNotMatch(html, /Glassware|Appearance|Garnish/);
  assert.match(html, /Tesla’s Enigmas/);
  assert.match(html, /480 Rue Saint-Jean/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("server-renders the complete French version", async () => {
  const response = await render("/fr");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Inventions par A\\Maze \| Cocktails et jeux d’évasion<\/title>/i);
  assert.match(html, /lang="fr"/);
  assert.match(html, /Choisis ton courant/);
  assert.match(html, /L’Expérience scientifique/);
  assert.match(html, /Les énigmes de Tesla/);
  assert.match(html, /Le coffre du mort/);
  assert.match(html, /480, rue Saint-Jean/);
  assert.doesNotMatch(html, /Book an experience|View the menu/);
});
