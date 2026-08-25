import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://polinadev.github.io/inventions-by-amaze/"),
  title: "Cocktail Bar in Old Montreal | Inventions by A\\Maze",
  description:
    "A Tesla-inspired cocktail bar inside A\\Maze Old Port. Original cocktails, small plates and zero-proof drinks—no escape game required.",
  alternates: { canonical: "/", languages: { "en-CA": "/", "fr-CA": "/fr/" } },
  openGraph: {
    title: "Cocktail Bar in Old Montreal | Inventions by A\\Maze",
    description: "A Tesla-inspired cocktail bar inside A\\Maze Old Port. No escape game required.",
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
