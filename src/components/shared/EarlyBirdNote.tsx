"use client";

import { EARLY_BIRD, isActive } from "@/lib/discounts";
import { SHOP_TERMS, fill, formatDay } from "@/lib/shopTerms";
import { useLanguage } from "@/i18n/LanguageProvider";

/** The early-bird offer, for as long as its code still works. */
export default function EarlyBirdNote({ className = "" }: { className?: string }) {
  const { locale } = useLanguage();
  if (!isActive(EARLY_BIRD)) return null;
  const text = fill(SHOP_TERMS[locale].earlyBird, {
    percent: Math.round(EARLY_BIRD.percent * 100),
    code: EARLY_BIRD.code,
    date: EARLY_BIRD.until ? formatDay(EARLY_BIRD.until, locale) : "",
  });
  return (
    <p className={`text-xs tracking-widest uppercase text-gold-600 ${className}`}>
      {text}
    </p>
  );
}
