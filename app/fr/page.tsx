import type { Metadata } from "next";
import { InventionsPage } from "../page";

export const metadata: Metadata = {
  title: "Bar à cocktails inspiré de Tesla et jeux d’évasion | Inventions Montréal",
  description: "Découvrez des cocktails inspirés de Tesla, des jeux d’évasion immersifs et des événements privés chez A\\Maze Vieux-Port à Montréal.",
  alternates: { canonical: "/fr/", languages: { "en-CA": "/", "fr-CA": "/fr/" } },
  openGraph: {
    title: "Bar à cocktails inspiré de Tesla et jeux d’évasion | Inventions Montréal",
    description: "Découvrez des cocktails inspirés de Tesla, des jeux d’évasion immersifs et des événements privés chez A\\Maze Vieux-Port à Montréal.",
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
