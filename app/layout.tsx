import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inventions by A\\Maze | Cocktails & Escape Games",
  description:
    "Cocktails, local pours and immersive escape games in Montréal's Old Port.",
  openGraph: {
    title: "Inventions by A\\Maze",
    description: "Cocktails, wine and escape games in Montréal's Old Port.",
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
