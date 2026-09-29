"use client";
import { useEffect, useRef, useState } from "react";

const EMBED_SRC = "https://www.tiktok.com/embed.js";

/**
 * Mur TikTok du compte @beone1luxury.
 * L'embed officiel TikTok échoue souvent en local (localhost refusé,
 * adblock, handshake iframe) et rend un cadre vide de hauteur 0.
 * Ce composant : impose une hauteur fixe, surveille le chargement réel,
 * et bascule automatiquement sur une carte profil designée si TikTok
 * ne répond pas sous ~9s. Le site n'est donc jamais "cassé".
 */
export default function TikTokEmbed({ handle = "beone1luxury" }: { handle?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "live" | "failed">("loading");

  useEffect(() => {
    setStatus("loading");
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`);
    if (!existing) {
      const s = document.createElement("script");
      s.src = EMBED_SRC;
      s.async = true;
      document.body.appendChild(s);
    } else {
      (window as unknown as { tiktokEmbedLoad?: () => void }).tiktokEmbedLoad?.();
    }

    // Surveillance : l'iframe TikTok doit exister ET avoir une vraie hauteur.
    const t0 = Date.now();
    const timer = window.setInterval(() => {
      const frame = boxRef.current?.querySelector("iframe");
      if (frame && frame.getBoundingClientRect().height > 200) {
        setStatus("live");
        window.clearInterval(timer);
      } else if (Date.now() - t0 > 9000) {
        setStatus("failed");
        window.clearInterval(timer);
      }
    }, 500);
    return () => window.clearInterval(timer);
  }, [handle]);

  return (
    <div className="mx-auto w-full max-w-[780px]">
      {/* Embed officiel — hauteur forcée pour éviter le collapse à 0px */}
      <div
        ref={boxRef}
        className="overflow-hidden rounded-[28px] border border-champagne/25 bg-coal/70 p-2"
        style={{ display: status === "failed" ? "none" : undefined }}
      >
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/@${handle}`}
          data-unique-id={handle}
          data-embed-from="oembed"
          data-embed-type="creator"
          style={{ maxWidth: 780, minWidth: 288, minHeight: 680 }}
        >
          <section style={{ padding: 24, textAlign: "center", color: "#C9A96A" }}>
            Chargement du flux TikTok @{handle}…
          </section>
        </blockquote>
      </div>

      {/* Fallback — affiché si TikTok bloque (localhost, adblock, réseau) */}
      {status === "failed" && (
        <div className="rounded-[28px] border border-champagne/25 bg-coal/70 p-8 text-center md:p-10">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-champagne/60 bg-noir font-display text-4xl font-bold text-champagne">
            B
          </span>
          <p className="font-display mt-4 text-4xl">Be One Luxury</p>
          <p className="mt-1 text-sm tracking-[0.3em] uppercase text-champagne">@{handle}</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-ivoire/60">
            Le flux intégré est bloqué par votre navigateur ou la prévisualisation locale.
            Retrouvez toutes les vidéos et pièces directement sur le compte TikTok officiel.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://www.tiktok.com/@${handle}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-champagne px-8 py-3.5 text-sm tracking-[0.2em] uppercase text-noir transition hover:bg-champagnelight"
            >
              Voir les vidéos
            </a>
            <a
              href={`https://www.tiktok.com/@${handle}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ivoire/30 px-8 py-3.5 text-sm tracking-[0.2em] uppercase transition hover:border-champagne hover:text-champagne"
            >
              Suivre
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
