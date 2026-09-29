export type Collection = "Hiver 2026" | "Soirée" | "Street Luxe" | "Promo";

export interface Product {
  id: string;
  name: string;
  price: string;
  collection: Collection;
  image: string;
  tag?: string;
  desc: string;
}

// Photos costumes homme — URLs vérifiées HTTP 200
// (House of Cavani, SuitHarbor, Mens Event Wear, Unsplash)
const cav = (file: string, v: string) =>
  `https://cdn.shopify.com/s/files/1/1723/3291/files/${file}.png?v=${v}&width=900`;

const CAVANI: Record<number, [string, string]> = {
  1: ["1_f0bd007b-fa8d-4713-9925-99afac7cfaea", "1774874559"],
  2: ["2_08707784-b1a0-420a-b13c-2555e0557575", "1774874557"],
  3: ["3_cbdabc71-fd25-4e22-99ef-090ba39dcf5c", "1774874559"],
  4: ["4_6cd87239-c226-4835-8196-dea2588c26d3", "1774874559"],
  5: ["5_abc154d0-8d92-412f-8ab0-1b3cc3851dc8", "1774874559"],
  6: ["6_b66ab14f-66b6-410f-9a0d-cccc112bb350", "1774874559"],
  7: ["7_dca8500d-5bb2-488d-b94b-0dc1247b357a", "1774874558"],
};

const cavImg = (n: 1 | 2 | 3 | 4 | 5 | 6 | 7) => cav(CAVANI[n][0], CAVANI[n][1]);

export const COLLECTIONS: ("Tout" | Collection)[] = [
  "Tout",
  "Hiver 2026",
  "Soirée",
  "Street Luxe",
  "Promo",
];

export const defaultProducts: Product[] = [
  { id: "m1", name: "Costume Croisé Marine", price: "32 900 DA", collection: "Soirée", image: cavImg(2), tag: "Nouveau", desc: "Costume croisé bleu marine, revers en pointe, allure autoritaire." },
  { id: "m2", name: "Costume Relaxed Sable", price: "28 500 DA", collection: "Hiver 2026", image: cavImg(1), desc: "Coupe relaxed moderne, épaules naturelles, confort absolu." },
  { id: "m3", name: "Veste Velours Émeraude", price: "24 900 DA", collection: "Soirée", image: cavImg(7), tag: "Iconique", desc: "Veste de soirée en velours vert émeraude, esprit gala." },
  { id: "m4", name: "Costume Vert Sauge 2026", price: "29 800 DA", collection: "Hiver 2026", image: cavImg(4), tag: "Nouveau", desc: "La couleur breakout de l'année, laine premium." },
  { id: "m5", name: "Blazer Séparé Lin", price: "16 400 DA", collection: "Street Luxe", image: cavImg(6), desc: "Blazer dépareillé en lin, à porter avec jean ou chino." },
  { id: "m6", name: "Costume Taupe Quiet Luxury", price: "31 000 DA", collection: "Soirée", image: cavImg(5), desc: "Ton taupe discret, confection impeccable, luxe silencieux." },
  { id: "m7", name: "Costume Oversize Prestige", price: "27 500 DA", collection: "Street Luxe", image: cavImg(3), desc: "Silhouette oversize maîtrisée, esprit power dressing." },
  { id: "m8", name: "Costume Marine Héritage", price: "30 900 DA", collection: "Hiver 2026", image: "https://cavani.co.uk/cdn/shop/articles/James_Marine_27-01_cfc2f935-e02b-45a8-80ef-2f196213329e.jpg?v=1774875575", desc: "Le costume marine intemporel, coupe héritage." },
  { id: "m9", name: "Smoking Noir Gala", price: "34 500 DA", collection: "Soirée", image: "https://suitharbor.com/cdn/shop/articles/Suit-guide-for-men_ff5c3068-072f-4fc4-940b-855337d55b78.webp?v=1776013920", tag: "Cérémonie", desc: "Smoking noir, revers satin, pour les grandes occasions." },
  { id: "m10", name: "Ensemble Terre d'Automne", price: "26 800 DA", collection: "Hiver 2026", image: "https://www.menseventwear.com/cdn/shop/articles/editorial-2026-08-earth-tones-v2.png?v=1789977169", desc: "Tons terre et camel, l'uniforme automne-hiver 2026." },
  { id: "m11", name: "Chemise Blanche Homme", price: "5 900 DA", collection: "Promo", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=900&auto=format&fit=crop", tag: "-20%", desc: "Chemise blanche coupe ajustée, l'essentiel du vestiaire." },
  { id: "m12", name: "Jean Brut Coupe Droite", price: "8 200 DA", collection: "Promo", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=900&auto=format&fit=crop", tag: "-30%", desc: "Denim brut, coupe droite parfaite, offre boutique." },
];
