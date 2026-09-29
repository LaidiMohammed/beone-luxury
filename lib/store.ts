"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultSite, type SiteSettings } from "@/data/site";
import { defaultProducts, type Product } from "@/data/products";
import { defaultShops, type Shop } from "@/data/shops";

export const defaultBrands = [
  "Costumes Homme",
  "Smoking & Gala",
  "Import Turquie",
  "Premium Italie",
  "Nouvelle Collection",
];

interface AdminState {
  site: SiteSettings;
  products: Product[];
  shops: Shop[];
  brands: string[];
  setSite: (patch: Partial<SiteSettings>) => void;
  setProducts: (p: Product[]) => void;
  upsertProduct: (p: Product) => void;
  removeProduct: (id: string) => void;
  setShops: (s: Shop[]) => void;
  upsertShop: (s: Shop) => void;
  removeShop: (id: string) => void;
  setBrands: (b: string[]) => void;
  resetAll: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      site: defaultSite,
      products: defaultProducts,
      shops: defaultShops,
      brands: defaultBrands,
      setSite: (patch) => set((st) => ({ site: { ...st.site, ...patch } })),
      setProducts: (products) => set({ products }),
      upsertProduct: (p) =>
        set((st) => {
          const exists = st.products.some((x) => x.id === p.id);
          return {
            products: exists
              ? st.products.map((x) => (x.id === p.id ? p : x))
              : [p, ...st.products],
          };
        }),
      removeProduct: (id) =>
        set((st) => ({ products: st.products.filter((x) => x.id !== id) })),
      setShops: (shops) => set({ shops }),
      upsertShop: (s) =>
        set((st) => {
          const exists = st.shops.some((x) => x.id === s.id);
          return {
            shops: exists
              ? st.shops.map((x) => (x.id === s.id ? s : x))
              : [...st.shops, s],
          };
        }),
      removeShop: (id) =>
        set((st) => ({ shops: st.shops.filter((x) => x.id !== id) })),
      setBrands: (brands) => set({ brands }),
      resetAll: () =>
        set({ site: defaultSite, products: defaultProducts, shops: defaultShops, brands: defaultBrands }),
    }),
    { name: "beone-luxury-store-men-v1" }
  )
);
