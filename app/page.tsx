"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ZoomBg from "@/components/ZoomBg";
import TikTokEmbed from "@/components/TikTokEmbed";
import { useAdminStore } from "@/lib/store";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function HomePage() {
  const site = useAdminStore((s) => s.site);
  const products = useAdminStore((s) => s.products);
  const brands = useAdminStore((s) => s.brands);

  return (
    <>
      {/* HERO — vidéo plein écran.
          1) public/hero.mp4 (votre vidéo TikTok téléchargée) si présent,
          2) sinon URL réglable dans l'admin. Poster animé en dessous. */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.heroPoster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full animate-kenburns object-cover"
        />
        <video
          key={site.heroVideo}
          className="absolute inset-0 h-full w-full object-cover"
          poster={site.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src={site.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute right-4 top-24 flex items-center gap-2 rounded-full border border-champagne/40 bg-noir/60 px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-champagne md:right-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-champagne opacity-70" />
            <span className="h-2 w-2 rounded-full bg-champagne" />
          </span>
          Vidéo boutique
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/60" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full border border-champagne/40 px-4 py-1 text-[11px] tracking-[0.35em] uppercase text-champagne"
          >
            {site.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[17vw] leading-[0.9] font-bold md:text-[9rem]"
          >
            {site.heroTitleA}
            <span className="gold-text block italic font-normal">{site.heroTitleB}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-4 max-w-xl text-ivoire/75"
          >
            {site.heroSubtitle}
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/vetements"
              className="rounded-full bg-champagne px-8 py-3.5 text-sm tracking-[0.2em] uppercase text-noir transition hover:bg-champagnelight"
            >
              Découvrir
            </Link>
            <Link
              href="/boutiques"
              className="rounded-full border border-ivoire/30 px-8 py-3.5 text-sm tracking-[0.2em] uppercase transition hover:border-champagne hover:text-champagne"
            >
              Nos boutiques
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE + MARQUES */}
      <div className="overflow-hidden border-y border-champagne/20 bg-coal py-3">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs tracking-[0.4em] uppercase text-champagne">
          {Array.from({ length: 6 }).flatMap((_, r) =>
            brands.map((b, i) => <span key={`${r}-${i}`}>{b} ✦</span>)
          )}
        </div>
      </div>

      {/* NOUVEAUTÉS — arches, pas de carrés */}
      <ZoomBg image={site.bgHome}>
        <section className="mx-auto max-w-7xl px-5 py-20">
          <motion.div {...fade}>
            <p className="text-xs tracking-[0.4em] uppercase text-champagne">Nouveautés</p>
            <h2 className="font-display mt-2 text-5xl md:text-7xl">
              La sélection <span className="gold-text italic">du moment</span>
            </h2>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
            {products.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                {...fade}
                transition={{ delay: i * 0.05 }}
                className={i % 2 === 1 ? "md:mt-12" : ""}
              >
                <div className="arch group overflow-hidden border border-champagne/25 bg-coal/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-champagne">{p.collection}</p>
                <p className="font-display text-xl">{p.name}</p>
                <p className="text-sm text-ivoire/60">{p.price}</p>
              </motion.div>
            ))}
          </div>
          <Link
            href="/vetements"
            className="mt-10 inline-block rounded-full border border-champagne/50 px-8 py-3 text-sm tracking-[0.25em] uppercase text-champagne hover:bg-champagne hover:text-noir"
          >
            Toute la collection
          </Link>
        </section>
      </ZoomBg>

      {/* TIKTOK LIVE — vraies vidéos/produits du compte */}
      <section className="mx-auto max-w-7xl px-5 py-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-champagne">En direct de la boutique</p>
        <h3 className="font-display mt-2 text-4xl md:text-6xl">
          Vu sur <span className="gold-text italic">TikTok</span>, porté dans la vraie vie
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ivoire/60">
          Les dernières vidéos de <span className="text-champagne">Be One Luxury</span> — les pièces
          présentées sont disponibles en boutique et sur commande.
        </p>
        <div className="mt-8">
          <TikTokEmbed />
        </div>
        <a
          href={site.tiktok}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-full bg-ivoire px-10 py-4 text-sm tracking-[0.25em] uppercase text-noir hover:bg-champagne"
        >
          Suivre @beone1luxury
        </a>
      </section>
    </>
  );
}
