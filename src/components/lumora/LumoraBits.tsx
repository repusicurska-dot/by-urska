"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LUMORA, LUMORA_COPY, lumoraShotLang } from "@/content/lumora";

/** A screenshot of the app in a simple phone frame. */
export function Phone({ shot, className = "" }: { shot: string; className?: string }) {
  return (
    <div
      className={`relative aspect-[600/1020] overflow-hidden rounded-[2.4rem] border-[6px] border-[#2b2431] bg-paper shadow-[0_40px_80px_-35px_rgba(43,36,49,0.6)] ${className}`}
    >
      <Image src={shot} alt="" fill sizes="(min-width: 1024px) 300px, 60vw" className="object-cover object-top" />
    </div>
  );
}

/** The App Store button — "coming soon" until Apple approves the app (see LUMORA.LIVE). */
export function StoreButton({ className = "" }: { className?: string }) {
  const { locale } = useLanguage();
  const c = LUMORA_COPY[locale];
  const inner = (
    <>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M16.37 12.6c.02 2.4 2.1 3.2 2.13 3.21-.02.06-.33 1.14-1.1 2.26-.66.97-1.35 1.94-2.43 1.96-1.06.02-1.4-.63-2.62-.63-1.21 0-1.6.61-2.6.65-1.05.04-1.85-1.05-2.52-2.02-1.37-1.98-2.42-5.6-1.01-8.04.7-1.21 1.95-1.98 3.3-2 1.03-.02 2 .7 2.63.7.63 0 1.81-.86 3.05-.73.52.02 1.98.21 2.92 1.59-.08.05-1.74 1.02-1.72 3.05ZM14.37 5.3c.56-.68.93-1.62.83-2.56-.8.03-1.77.53-2.35 1.21-.51.6-.97 1.56-.85 2.48.9.07 1.81-.46 2.37-1.13Z" />
      </svg>
      {LUMORA.LIVE ? c.cta : c.soon}
    </>
  );
  const cls = `inline-flex items-center gap-3 rounded-full bg-[#2b2431] px-6 py-3.5 text-sm font-medium tracking-wide text-[#fbf5ec] ${className}`;
  return LUMORA.LIVE ? (
    <a href={LUMORA.APP_STORE_URL} className={`${cls} transition-opacity hover:opacity-85`} rel="noopener">
      {inner}
    </a>
  ) : (
    <span className={`${cls} opacity-90`} aria-disabled="true">
      {inner}
    </span>
  );
}

/** A band announcing the app, for the home and Spirituality pages. */
export function LumoraTeaser() {
  const { locale } = useLanguage();
  const c = LUMORA_COPY[locale];
  const lang = lumoraShotLang(locale);
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative border-t border-bone/10 py-20 md:py-28">
      <Container className="max-w-6xl">
        <motion.div
          className="grid items-center gap-12 rounded-[2rem] border border-gold-400/30 bg-paper/70 px-6 py-12 backdrop-blur-sm md:grid-cols-[1fr_auto] md:px-14"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <Image src="/images/lumora/icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-md" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-gold-600">{c.teaserEyebrow}</span>
            </div>
            <h2 className="mt-6 font-heading text-3xl leading-tight text-bone md:text-5xl">{c.teaserTitle}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bone/75 md:mx-0">{c.teaserText}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 md:justify-start">
              <StoreButton />
              <Link
                href="/lumora"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-bone transition-colors hover:text-gold-600"
              >
                {c.teaserCta}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="mx-auto flex items-end gap-4">
            <Phone shot={`/images/lumora/today-${lang}.webp`} className="w-40 md:w-52" />
            <Phone shot={`/images/lumora/moon-${lang}.webp`} className="hidden w-36 translate-y-6 sm:block md:w-44" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
