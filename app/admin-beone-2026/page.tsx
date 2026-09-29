"use client";
import { useState } from "react";
import { useAdminStore } from "@/lib/store";
import type { Product } from "@/data/products";
import type { Shop } from "@/data/shops";

const PIN = "2026";
const inputCls =
  "w-full rounded-2xl border border-ivoire/15 bg-coal px-4 py-2.5 text-sm outline-none focus:border-champagne";
const btnGold =
  "rounded-full bg-champagne px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-noir hover:bg-champagnelight";
const btnGhost =
  "rounded-full border border-ivoire/20 px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:border-champagne hover:text-champagne";

export default function HiddenAdminPage() {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState<"produits" | "hero" | "boutiques" | "reseaux">("produits");
  const st = useAdminStore();

  if (!ok) {
    return (
      <section className="mx-auto grid min-h-screen max-w-md place-items-center px-5 pt-24">
        <div className="w-full rounded-[32px] border border-champagne/25 bg-coal p-8 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-champagne">Zone privée</p>
          <h1 className="font-display mt-2 text-4xl">Admin BEONE</h1>
          <p className="mt-2 text-sm text-ivoire/60">Page cachée — entrez le code PIN.</p>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            inputMode="numeric"
            placeholder="PIN (défaut : 2026)"
            className={`${inputCls} mt-6 text-center tracking-[0.5em]`}
          />
          <button
            onClick={() => (pin === PIN ? setOk(true) : alert("PIN incorrect"))}
            className={`${btnGold} mt-4 w-full`}
          >
            Entrer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-champagne">Panneau caché</p>
          <h1 className="font-display text-5xl">Contrôle <span className="gold-text italic">total</span></h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => st.resetAll()} className={btnGhost}>Réinitialiser</button>
          <button onClick={() => setOk(false)} className={btnGhost}>Verrouiller</button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["produits", "hero", "boutiques", "reseaux"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-xs tracking-[0.25em] uppercase ${
              tab === t ? "bg-champagne text-noir" : "border border-ivoire/20 text-ivoire/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "produits" && <ProductsTab />}
      {tab === "hero" && <HeroTab />}
      {tab === "boutiques" && <ShopsTab />}
      {tab === "reseaux" && <SocialsTab />}
    </section>
  );
}

function ProductsTab() {
  const products = useAdminStore((s) => s.products);
  const upsert = useAdminStore((s) => s.upsertProduct);
  const remove = useAdminStore((s) => s.removeProduct);
  const [form, setForm] = useState({ name: "", price: "", image: "", collection: "Hiver 2026", desc: "" });

  const add = () => {
    if (!form.name || !form.price || !form.image) return alert("Nom + prix + image requis");
    const p: Product = {
      id: "p" + Date.now(),
      name: form.name,
      price: form.price,
      image: form.image,
      collection: form.collection as Product["collection"],
      desc: form.desc || form.name,
    };
    upsert(p);
    setForm({ name: "", price: "", image: "", collection: "Hiver 2026", desc: "" });
  };

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[320px_1fr]">
      <div className="rounded-[28px] border border-champagne/20 bg-coal p-5">
        <p className="font-display text-2xl">Ajouter</p>
        {[
          ["name", "Nom (ex. Robe Champagne)"],
          ["price", "Prix (ex. 18 500 DA)"],
          ["image", "URL image https://…"],
          ["desc", "Description courte"],
        ].map(([k, ph]) => (
          <input
            key={k}
            value={(form as Record<string, string>)[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            placeholder={ph}
            className={`${inputCls} mt-3`}
          />
        ))}
        <select value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })} className={`${inputCls} mt-3`}>
          {["Hiver 2026", "Soirée", "Street Luxe", "Promo"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={add} className={`${btnGold} mt-4 w-full`}>Publier la pièce</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-[24px] border border-ivoire/10 bg-coal p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" className="h-16 w-14 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="text-xs text-champagne">{p.price} · {p.collection}</p>
            </div>
            <button onClick={() => remove(p.id)} className="rounded-full border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400 hover:text-noir">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroTab() {
  const site = useAdminStore((s) => s.site);
  const setSite = useAdminStore((s) => s.setSite);
  return (
    <div className="mt-6 grid gap-4 rounded-[28px] border border-champagne/20 bg-coal p-6 md:grid-cols-2">
      {[
        ["heroTitleA", "Titre ligne 1"],
        ["heroTitleB", "Titre ligne 2"],
        ["heroSubtitle", "Sous-titre"],
        ["heroVideo", "URL vidéo héros (.mp4)"],
        ["heroPoster", "URL poster / image de fond"],
        ["tagline", "Slogan"],
      ].map(([k, label]) => (
        <label key={k} className="block">
          <span className="mb-1 block text-[11px] tracking-[0.3em] uppercase text-champagne">{label}</span>
          <input
            value={String((site as Record<string, string>)[k] ?? "")}
            onChange={(e) => setSite({ [k]: e.target.value } as Partial<typeof site>)}
            className={inputCls}
          />
        </label>
      ))}
      <p className="text-xs text-ivoire/50 md:col-span-2">
        Vidéo d’accueil : déposez votre vidéo TikTok téléchargée en <span className="text-champagne">public/hero.mp4</span> (prioritaire),
        ou collez une URL .mp4 dans « URL vidéo héros ». Marques du bandeau défilant :
      </p>
      <div className="md:col-span-2">
        <BrandsEditor />
      </div>
    </div>
  );
}

function ShopsTab() {
  const shops = useAdminStore((s) => s.shops);
  const upsert = useAdminStore((s) => s.upsertShop);
  const remove = useAdminStore((s) => s.removeShop);
  const [form, setForm] = useState({ name: "", address: "", hours: "", phone: "", image: "", mapUrl: "", mapQuery: "" });

  const add = () => {
    if (!form.name || !form.address) return alert("Nom + adresse requis");
    const s: Shop = { ...form, id: "s" + Date.now(), mapUrl: form.mapUrl || "https://maps.google.com", mapQuery: form.mapQuery || form.address };
    upsert(s);
    setForm({ name: "", address: "", hours: "", phone: "", image: "", mapUrl: "", mapQuery: "" });
  };

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[320px_1fr]">
      <div className="rounded-[28px] border border-champagne/20 bg-coal p-5">
        <p className="font-display text-2xl">Ajouter boutique</p>
        {[
          ["name", "Nom"],
          ["address", "Adresse"],
          ["hours", "Horaires"],
          ["phone", "Téléphone"],
          ["image", "URL photo https://…"],
          ["mapQuery", "Localisation carte (ex. Alger centre)"],
          ["mapUrl", "Lien Google Maps (Itinéraire)"],
        ].map(([k, ph]) => (
          <input key={k} value={(form as Record<string, string>)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className={`${inputCls} mt-3`} />
        ))}
        <button onClick={add} className={`${btnGold} mt-4 w-full`}>Ajouter</button>
      </div>
      <div className="grid gap-3">
        {shops.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 rounded-[24px] border border-ivoire/10 bg-coal p-4">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-ivoire/60">{s.address} · {s.hours}</p>
            </div>
            <button onClick={() => remove(s.id)} className="rounded-full border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400 hover:text-noir">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandsEditor() {
  const brands = useAdminStore((s) => s.brands);
  const setBrands = useAdminStore((s) => s.setBrands);
  const [val, setVal] = useState("");
  return (
    <div className="rounded-2xl border border-ivoire/10 p-4">
      <div className="flex flex-wrap gap-2">
        {brands.map((b) => (
          <span key={b} className="flex items-center gap-2 rounded-full border border-champagne/40 px-4 py-1.5 text-xs tracking-widest uppercase text-champagne">
            {b}
            <button onClick={() => setBrands(brands.filter((x) => x !== b))} className="text-ivoire/50 hover:text-red-300">✕</button>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ajouter une marque / origine (ex. Zara, Turquie…)" className={inputCls} />
        <button
          onClick={() => { if (val.trim()) { setBrands([...brands, val.trim()]); setVal(""); } }}
          className={btnGold}
        >
          +
        </button>
      </div>
    </div>
  );
}

function SocialsTab() {
  const site = useAdminStore((s) => s.site);
  const setSite = useAdminStore((s) => s.setSite);
  return (
    <div className="mt-6 grid gap-4 rounded-[28px] border border-champagne/20 bg-coal p-6 md:grid-cols-2">
      {[
        ["tiktok", "Lien TikTok"],
        ["instagram", "Lien Instagram"],
        ["facebook", "Lien Facebook"],
        ["whatsapp", "Lien WhatsApp"],
        ["bgHome", "Fond image — Accueil"],
        ["bgAbout", "Fond image — À propos"],
        ["bgClothes", "Fond image — Vêtements"],
        ["bgShops", "Fond image — Boutiques"],
      ].map(([k, label]) => (
        <label key={k} className="block">
          <span className="mb-1 block text-[11px] tracking-[0.3em] uppercase text-champagne">{label}</span>
          <input value={String((site as Record<string, string>)[k] ?? "")} onChange={(e) => setSite({ [k]: e.target.value } as Partial<typeof site>)} className={inputCls} />
        </label>
      ))}
    </div>
  );
}
