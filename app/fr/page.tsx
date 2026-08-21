import type { Metadata } from "next";
import { InventionsPage } from "../page";

export const metadata: Metadata = {
  title: "Inventions par A\\Maze | Cocktails et jeux d’évasion",
  description: "Cocktails, vins, bières locales et jeux d’évasion immersifs au Vieux-Port de Montréal.",
  openGraph: {
    title: "Inventions par A\\Maze",
    description: "Cocktails et jeux d’évasion au Vieux-Port de Montréal.",
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
