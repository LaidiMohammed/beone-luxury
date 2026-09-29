import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "BEONE LUXURY — Boutique premium",
  description: "BEONE LUXURY — vêtements haut de gamme. Nouvelle collection, boutiques, TikTok.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-noir text-ivoire antialiased pb-24 md:pb-0">
        <SmoothScroll />
        <TopNav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
