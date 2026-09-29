"use client";
import { useAdminStore } from "@/lib/store";

export default function Footer() {
  const site = useAdminStore((s) => s.site);
  return (
    <footer className="border-t border-champagne/15 bg-noir px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.2em]">BEONE</p>
          <p className="text-xs tracking-[0.4em] text-champagne">LUXURY</p>
          <p className="mt-3 max-w-xs text-sm text-ivoire/60">{site.tagline}</p>
        </div>
        <div className="flex gap-3">
          {[
            ["TikTok", site.tiktok],
            ["Insta", site.instagram],
            ["FB", site.facebook],
            ["WhatsApp", site.whatsapp],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="h-11 flex-1 rounded-full border border-ivoire/15 text-center text-xs leading-[44px] tracking-widest text-ivoire/70 transition hover:border-champagne hover:text-champagne"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="text-sm text-ivoire/50 md:text-right">
          <p>© {new Date().getFullYear()} BEONE LUXURY</p>
          <p className="mt-1">Design front-end · Supabase-ready</p>
        </div>
      </div>
    </footer>
  );
}
