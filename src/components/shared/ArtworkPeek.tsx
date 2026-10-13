"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Artwork } from "@/content/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatPrice } from "@/lib/format";

const AVAILABILITY_DOT: Record<Artwork["availability"], string> = {
  available: "#7fae8b",
  reserved: "#c5aa82",
  sold: "#8f8d88",
  inquire: "#afc4d6",
};

/**
 * A painting's picture that tells you about itself in place: hovering shows "View more", and a
 * click lays the painting's details over the picture. Its own page opens only from the link in
 * those details — a second, deliberate click (Urška, 2026-10-13).
 */
export default function ArtworkPeek({
  artwork,
  children,
  className = "",
  onFullSize,
}: {
  artwork: Artwork;
  /** The picture itself, usually a `fill` Image. */
  children: ReactNode;
  className?: string;
  onFullSize?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { t, locale } = useLanguage();
  const meta = [artwork.year, artwork.dimensions, artwork.medium].filter(Boolean).join(" · ");

  return (
    <div className={`group/peek relative ${className}`} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label={`${artwork.title} — ${t.collection.viewMore}`}
        className="absolute inset-0 block h-full w-full cursor-pointer"
      >
        {children}
      </button>

      {!open && (
        <span className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
          <span className="rounded-full bg-ink/75 px-4 py-1.5 text-[10px] tracking-widest uppercase text-bone backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover/peek:opacity-100">
            {t.collection.viewMore}
          </span>
        </span>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-20 flex flex-col overflow-y-auto bg-ink/85 p-5 text-left backdrop-blur-md md:p-6"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              className="ml-auto -mr-1 -mt-1 h-8 w-8 shrink-0 rounded-full text-lg leading-none text-bone/70 transition-colors hover:text-bone"
            >
              ×
            </button>
            <div className="mt-auto">
              <h3 className="font-heading text-2xl leading-tight text-bone">{artwork.title}</h3>
              {meta && <p className="mt-2 text-[11px] tracking-widest uppercase text-bone/60">{meta}</p>}
              {artwork.quote && <p className="mt-3 font-heading italic text-sm text-bone/80">“{artwork.quote}”</p>}
              {artwork.shortIntro && <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-bone/75">{artwork.shortIntro}</p>}
              <p className="mt-4 flex items-center gap-2 text-sm text-bone">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: AVAILABILITY_DOT[artwork.availability] }} />
                {artwork.availability === "available" ? formatPrice(artwork.price, locale) : t.collection[artwork.availability]}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={`/artworks/${artwork.slug}`}
                  className="border-b border-bone/40 pb-1 text-xs tracking-widest uppercase text-bone transition-colors hover:border-bone"
                >
                  {t.collection.readStory} →
                </Link>
                {onFullSize && (
                  <button
                    type="button"
                    onClick={onFullSize}
                    className="text-xs tracking-widest uppercase text-bone/70 transition-colors hover:text-bone"
                  >
                    {t.collection.viewFullSize}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
