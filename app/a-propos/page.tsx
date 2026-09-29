"use client";
import { motion } from "framer-motion";
import ZoomBg from "@/components/ZoomBg";
import { useAdminStore } from "@/lib/store";

export default function AboutPage() {
  const site = useAdminStore((s) => s.site);
  const shops = useAdminStore((s) => s.shops);
  const flagship = shops[0];
  return (
    <ZoomBg image={site.bgAbout}>
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-36 text-center">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs tracking-[0.4em] uppercase text-champagne"
        >
          À propos
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="font-display mt-4 text-5xl md:text-7xl"
        >
          {site.aboutTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-ivoire/75"
        >
          {site.aboutText}
        </motion.p>
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            ["100%", "premium"],
            ["+500", "pièces / mois"],
            ["3", "boutiques"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-[28px] border border-champagne/25 bg-noir/60 px-4 py-8">
              <p className="font-display gold-text text-4xl md:text-5xl">{n}</p>
              <p className="mt-2 text-[11px] tracking-[0.3em] uppercase text-ivoire/60">{l}</p>
            </div>
          ))}
        </div>

        {/* Localisation — boutique flagship sur Google Maps */}
        {flagship && (
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[32px] border border-champagne/25 bg-noir/60 p-5 text-left">
            <p className="text-xs tracking-[0.4em] uppercase text-champagne">Nous trouver</p>
            <p className="font-display mt-1 text-3xl">{flagship.name}</p>
            <p className="mt-1 text-sm text-ivoire/65">{flagship.address} · {flagship.hours}</p>
            <iframe
              title={`Carte — ${flagship.name}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(flagship.mapQuery || flagship.address)}&z=14&output=embed`}
              loading="lazy"
              className="mt-4 h-64 w-full rounded-[20px] border border-champagne/20"
            />
            <a
              href={flagship.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full bg-champagne px-7 py-2.5 text-xs tracking-[0.25em] uppercase text-noir hover:bg-champagnelight"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        )}
      </section>
    </ZoomBg>
  );
}
