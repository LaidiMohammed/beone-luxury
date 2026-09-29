"use client";
import { motion } from "framer-motion";
import ZoomBg from "@/components/ZoomBg";
import { useAdminStore } from "@/lib/store";

export default function ShopsPage() {
  const site = useAdminStore((s) => s.site);
  const shops = useAdminStore((s) => s.shops);
  return (
    <ZoomBg image={site.bgShops}>
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-32">
        <p className="text-xs tracking-[0.4em] uppercase text-champagne">Mes boutiques</p>
        <h1 className="font-display mt-2 text-5xl md:text-7xl">
          Où nous <span className="gold-text italic">trouver</span>
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {shops.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="overflow-hidden rounded-[32px] border border-champagne/25 bg-noir/70"
            >
              <div className="overflow-hidden rounded-b-[0] rounded-t-[32px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.name} className="aspect-[16/10] w-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-3xl">{s.name}</h2>
                <p className="mt-2 text-sm text-ivoire/70">{s.address}</p>
                <p className="mt-1 text-sm text-ivoire/70">{s.hours}</p>
                <p className="mt-1 text-sm text-champagne">{s.phone}</p>
                {/* Localisation boutique — carte Google Maps embarquée */}
                <iframe
                  title={`Carte — ${s.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery || s.address)}&z=14&output=embed`}
                  loading="lazy"
                  className="mt-4 h-44 w-full rounded-[20px] border border-champagne/20"
                />
                <div className="mt-5 flex gap-2">
                  <a href={s.mapUrl} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-champagne py-2.5 text-center text-xs tracking-[0.2em] uppercase text-noir hover:bg-champagnelight">
                    Itinéraire
                  </a>
                  <a href={site.whatsapp} target="_blank" rel="noreferrer" className="flex-1 rounded-full border border-ivoire/25 py-2.5 text-center text-xs tracking-[0.2em] uppercase hover:border-champagne hover:text-champagne">
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-10 rounded-[32px] border border-champagne/25 bg-noir/70 p-8 text-center">
          <p className="font-display text-3xl">Commande en ligne</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ivoire/65">
            Repérez une pièce sur TikTok ou Instagram, envoyez-nous le lien en DM — on vous répond avec taille, dispo et livraison.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={site.tiktok} target="_blank" rel="noreferrer" className="rounded-full bg-ivoire px-7 py-3 text-xs tracking-[0.25em] uppercase text-noir hover:bg-champagne">TikTok</a>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-ivoire/25 px-7 py-3 text-xs tracking-[0.25em] uppercase hover:border-champagne hover:text-champagne">Instagram</a>
          </div>
        </div>
      </section>
    </ZoomBg>
  );
}
