import { mkdir, readFile, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../pages-dist/", import.meta.url);
const indexPath = new URL("index.html", outputDirectory);
const englishHtml = await readFile(indexPath, "utf8");
const frenchHtml = englishHtml
  .replace('<html lang="en">', '<html lang="fr">')
  .replace(
    "Cocktails, local pours and immersive escape games in Montréal's Old Port.",
    "Cocktails, vins, bières locales et jeux d’évasion immersifs au Vieux-Port de Montréal.",
  )
  .replace('content="Inventions by A\\Maze"', 'content="Inventions par A\\Maze"')
  .replace(
    "Cocktails, wine and escape games in Montréal's Old Port.",
    "Cocktails et jeux d’évasion au Vieux-Port de Montréal.",
  )
  .replace(
    'content="https://polinadev.github.io/inventions-by-amaze/"',
    'content="https://polinadev.github.io/inventions-by-amaze/fr/"',
  )
  .replace(
    "<title>Inventions by A\\Maze | Cocktails &amp; Escape Games</title>",
    "<title>Inventions par A\\Maze | Cocktails et jeux d’évasion</title>",
  );

await mkdir(new URL("fr/", outputDirectory), { recursive: true });
await writeFile(new URL("fr/index.html", outputDirectory), frenchHtml);
await writeFile(new URL("404.html", outputDirectory), englishHtml);
