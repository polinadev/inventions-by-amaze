import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../pages-dist/${path}`, import.meta.url), "utf8");

test("static pages are prerendered with bilingual SEO metadata", async () => {
  const english = await read("index.html");
  const french = await read("fr/index.html");
  const team = await read("team-building/index.html");
  const teamFrench = await read("fr/evenements-de-groupe/index.html");

  assert.match(english, /<html lang="en">/);
  assert.match(english, /rel="canonical" href="https:\/\/polinadev\.github\.io\/inventions-by-amaze\/"/);
  assert.match(english, /hreflang="fr-CA"/);
  assert.match(english, /application\/ld\+json/);
  assert.match(english, /Read its story/);
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /name: "House-Roasted Nuts", price: "\$8"/);
  assert.match(source, /name: "Olives or Pickles", price: "\$6"/);
  assert.match(english, /"priceRange":"\$\$"/);
  assert.match(english, /amaze-official-logo\.webp/);
  assert.match(english, /https:\/\/www\.amazemontreal\.com\/old-port-escape-room-restaurant/);
  assert.doesNotMatch(english, /offthecouch\.io/);

  assert.match(french, /<html lang="fr">/);
  assert.match(french, /hreflang="en-CA"/);
  assert.match(french, /Lire son histoire/);
  assert.match(french, /inventions-wordmark-lockup-fr-transparent\.webp/);
  assert.match(french, /Inventions par A\\Maze\. Le courant passe\./);
  const frenchVisible = french.slice(french.indexOf('<div id="root">'));
  assert.doesNotMatch(frenchVisible, /Book an experience|View the menu|The current is on|Read its story|Story open|Opening hours|Gift cards|Part of the family|English version/);
  assert.match(team, /Old Port Team Building &amp; Group Events/);
  assert.match(team, /\$1,000 \+ tax/);
  assert.match(teamFrench, /Team building et événements de groupe/);
  assert.match(teamFrench, /1 000 \$ \+ taxes/);
  assert.match(teamFrench, /inventions-header-lockup-fr-transparent\.webp/);
  const teamFrenchVisible = teamFrench.slice(teamFrench.indexOf('<div id="root">'));
  assert.doesNotMatch(teamFrenchVisible, /Bring the team|Switch on the current|Current packages|Choose your experiment|Back to Inventions/);
});

test("robots, sitemap and 404 are search-safe", async () => {
  const robots = await read("robots.txt");
  const sitemap = await read("sitemap.xml");
  const notFound = await read("404.html");
  assert.match(robots, /Sitemap: https:\/\/polinadev\.github\.io\/inventions-by-amaze\/sitemap\.xml/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 4);
  assert.match(sitemap, /hreflang="fr-CA"/);
  assert.match(notFound, /name="robots" content="noindex,follow"/);
});
