"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Fond image plein écran avec zoom-out au scroll (1.15 -> 1.0) */
export default function ZoomBg({
  image,
  children,
  overlay = true,
}: {
  image: string;
  children: React.ReactNode;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-noir/80 via-noir/55 to-noir" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
