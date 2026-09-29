"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ZoomBg from "@/components/ZoomBg";
import { COLLECTIONS } from "@/data/products";
import { useAdminStore } from "@/lib/store";

export default function ClothesPage() {
  const site = useAdminStore((s) => s.site);
  const products = useAdminStore((s) => s.products);
  const [cat, setCat] = useState<(typeof COLLECTIONS)[number]>("Tout");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Tout" || p.collection === cat) &&
          (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
      ),
    [products, cat, q]
  );

  return (
    <ZoomBg image={site.bgClothes}>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-32">
        <p className="text-xs tracking-[0.4em] uppercase text-champagne">Vêtements · par collection</p>
        <h1 className="font-display mt-2 text-5xl md:text-7xl">
          La <span className="gold-text italic">Collection</span>
        </h1>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une pièce…"
          className="mt-8 w-full rounded-full border border-ivoire/20 bg-noir/60 px-6 py-3 text-sm outline-none placeholder:text-ivoire/40 focus:border-champagne"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-xs tracking-[0.2em] uppercase transition ${
                cat === c
                  ? "bg-champagne text-noir"
                  : "border border-ivoire/20 text-ivoire/70 hover:border-champagne hover:text-champagne"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-12 text-center text-ivoire/60">Aucune pièce dans cette collection pour le moment.</p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              className={i % 3 === 1 ? "md:mt-14" : ""}
            >
              <div className="arch group relative overflow-hidden border border-champagne/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
                {p.tag && (
                  <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-champagne px-4 py-1 text-[10px] tracking-[0.25em] uppercase text-noir">
                    {p.tag}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-champagne">{p.collection}</p>
              <p className="font-display text-2xl">{p.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-ivoire/70">{p.price}</p>
                <a
                  href={`${site.whatsapp}?text=${encodeURIComponent("Bonjour BEONE, je veux : " + p.name + " (" + p.price + ")")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-champagne/40 px-4 py-1.5 text-[11px] tracking-widest uppercase text-champagne hover:bg-champagne hover:text-noir"
                >
                  Commander
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </ZoomBg>
  );
}
