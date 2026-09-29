"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Accueil", icon: "◆" },
  { href: "/a-propos", label: "Maison", icon: "✦" },
  { href: "/vetements", label: "Shop", icon: "◈" },
  { href: "/boutiques", label: "Stores", icon: "◎" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="glass flex items-center justify-around rounded-[28px] border border-champagne/25 px-2 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,.6)]">
        {ITEMS.map((it) => {
          const active = path === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-1.5 transition ${
                active ? "text-champagne" : "text-ivoire/60"
              }`}
            >
              <span className="text-lg leading-none">{it.icon}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase">{it.label}</span>
              {active && <span className="h-1 w-1 rounded-full bg-champagne" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
