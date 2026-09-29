export interface Shop {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  mapUrl: string;
  /** Requête utilisée pour la carte embarquée (ex. "Alger centre"). Modifiable dans l'admin. */
  mapQuery: string;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`;

export const defaultShops: Shop[] = [
  {
    id: "s1",
    name: "BEONE — Flagship",
    address: "Rue principale, centre-ville — Alger",
    hours: "Sam – Jeu · 10h00 → 20h00",
    phone: "+213 000 00 00 00",
    image: img("photo-1441986300917-64674bd600d8"),
    mapUrl: "https://maps.google.com/?q=Alger+centre",
    mapQuery: "Alger centre, Algérie",
  },
  {
    id: "s2",
    name: "BEONE — Galerie",
    address: "Centre commercial Garden City — Oran",
    hours: "Tous les jours · 10h00 → 22h00",
    phone: "+213 000 00 00 01",
    image: img("photo-1567401893414-76b7b1e5a7a5"),
    mapUrl: "https://maps.google.com/?q=Oran+centre+commercial",
    mapQuery: "Oran, Algérie",
  },
  {
    id: "s3",
    name: "BEONE — Atelier",
    address: "Avenue des Fleurs — Constantine",
    hours: "Sam – Jeu · 09h30 → 19h30",
    phone: "+213 000 00 00 02",
    image: img("photo-1555529669-e69e7aa0ba9a"),
    mapUrl: "https://maps.google.com/?q=Constantine",
    mapQuery: "Constantine, Algérie",
  },
];
