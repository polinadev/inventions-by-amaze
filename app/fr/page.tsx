import type { Metadata } from "next";
import { InventionsPage } from "../page";

export const metadata: Metadata = {
  title: "Bar à cocktails dans le Vieux-Montréal | Inventions par A\\Maze",
  description: "Un bar à cocktails inspiré de Tesla chez A\\Maze Vieux-Port. Aucun jeu d’évasion requis.",
  alternates: { canonical: "/fr/", languages: { "en-CA": "/", "fr-CA": "/fr/" } },
  openGraph: {
    title: "Bar à cocktails dans le Vieux-Montréal | Inventions par A\\Maze",
    description: "Un bar à cocktails inspiré de Tesla chez A\\Maze Vieux-Port. Aucun jeu d’évasion requis.",
    type: "website",
    images: [{
      url: "/images/inventions-social-preview.png",
      width: 1200,
      height: 630,
      alt: "Inventions par A Maze — cocktails et jeux d’évasion",
    }],
  },
};

export default function FrenchHome() {
  return <InventionsPage locale="fr" />;
}
