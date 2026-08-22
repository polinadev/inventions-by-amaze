import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://polinadev.github.io/inventions-by-amaze/"),
  title: "Tesla-Inspired Cocktail Bar & Escape Games | Inventions Montréal",
  description:
    "Discover Tesla-inspired cocktails, immersive escape games and private events inside A\\Maze Old Port in Montréal.",
  alternates: { canonical: "/", languages: { "en-CA": "/", "fr-CA": "/fr/" } },
  openGraph: {
    title: "Tesla-Inspired Cocktail Bar & Escape Games | Inventions Montréal",
    description: "Discover Tesla-inspired cocktails, immersive escape games and private events inside A\\Maze Old Port in Montréal.",
    type: "website",
    images: [{
      url: "/images/inventions-social-preview.png",
      width: 1200,
      height: 630,
      alt: "Inventions by A Maze — cocktails, wine and escape games",
    }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
