"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/vetements", label: "Vêtements" },
  { href: "/boutiques", label: "Boutiques" },
];

export default function TopNav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const site = useAdminStore((s) => s.site);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass border-b border-champagne/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-champagne/60 bg-noir/60 font-display text-xl font-bold text-champagne">
            B
          </span>
          <span className="leading-tight">
            <span className="font-display text-lg font-bold tracking-[0.25em]">BEONE</span>
            <span className="block text-[10px] tracking-[0.45em] text-champagne">LUXURY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-[0.2em] uppercase transition-colors hover:text-champagne ${
                path === l.href ? "text-champagne" : "text-ivoire/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.tiktok}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-champagne/50 px-5 py-2 text-xs tracking-[0.25em] uppercase text-champagne transition hover:bg-champagne hover:text-noir"
          >
            TikTok
          </a>
        </nav>

        {/* mobile : logo seul en haut, nav en bas */}
        <a
          href={site.tiktok}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-champagne/50 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-champagne md:hidden"
        >
          TikTok
        </a>
      </div>
    </header>
  );
}
