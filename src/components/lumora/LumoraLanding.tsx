"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LUMORA_COPY, lumoraShotLang } from "@/content/lumora";
import { Phone, StoreButton } from "./LumoraBits";

const EASE = [0.22, 1, 0.36, 1] as const;

/** /lumora — the page for Urška's iPhone app, and the App Store's marketing URL. */
export default function LumoraLanding() {
  const { locale } = useLanguage();
  const c = LUMORA_COPY[locale];
  const lang = lumoraShotLang(locale);
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <div className="relative isolate overflow-x-clip">
      <section className="pb-20 pt-24 md:pt-32">
        <Container className="max-w-6xl">
          <div className="grid items-center gap-14 text-center lg:grid-cols-[1.1fr_0.9fr] lg:text-left">
            <motion.div {...rise(0)}>
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <Image src="/images/lumora/icon.png" alt="Lumora Manifest" width={72} height={72} className="rounded-[1.25rem] shadow-md" priority />
                <span className="text-[11px] uppercase tracking-[0.35em] text-gold-600">{c.eyebrow}</span>
              </div>
              <h1 className="mt-8 font-heading text-5xl leading-[1.02] text-bone md:text-7xl">{c.title}</h1>
              <p className="mt-6 font-heading text-2xl italic leading-snug text-bone/85 md:text-3xl">{c.tagline}</p>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bone/75 lg:mx-0">{c.intro}</p>
              <div className="mt-10">
                <StoreButton />
              </div>
            </motion.div>
            <motion.div {...rise(0.15)} className="relative mx-auto flex items-end gap-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,246,220,0.95),rgba(255,246,220,0))]"
              />
              <Phone shot={`/images/lumora/today-${lang}.webp`} className="w-52 md:w-64" />
              <Phone shot={`/images/lumora/journal-${lang}.webp`} className="hidden w-44 translate-y-8 sm:block md:w-52" />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-t border-bone/10 py-20 md:py-28">
        <Container className="max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
            {c.features.map((f, i) => (
              <motion.div key={f.key} {...rise(i * 0.08)} className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
                <Phone shot={`/images/lumora/${f.key}-${lang}.webp`} className="w-40 shrink-0" />
                <div>
                  <span className="font-heading text-sm tracking-[0.3em] text-gold-600/80">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-heading text-3xl leading-tight text-bone">{f.title}</h2>
                  <p className="mt-3 leading-relaxed text-bone/75">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-bone/10 py-20 md:py-28">
        <Container className="max-w-3xl text-center">
          <motion.div {...rise(0)}>
            <span aria-hidden="true" className="block font-heading text-8xl leading-none text-gold-400/60">
              “
            </span>
            <p className="-mt-6 font-heading text-3xl italic leading-snug text-bone md:text-4xl">{c.quote}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-600">— Urška</p>
          </motion.div>
          <motion.div {...rise(0.1)} className="mx-auto mt-16 max-w-xl rounded-[2rem] border border-gold-400/40 bg-paper/80 px-8 py-10">
            <p className="font-heading text-3xl text-bone">{c.priceTitle}</p>
            <p className="mt-3 text-lg text-bone">{c.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-smoke">{c.priceNote}</p>
            <div className="mt-8">
              <StoreButton />
            </div>
          </motion.div>
          <p className="mt-10 flex justify-center gap-6 text-xs uppercase tracking-[0.3em] text-bone/70">
            <Link href="/lumora/support" className="hover:text-gold-600">
              {c.support}
            </Link>
            <Link href="/lumora/privacy" className="hover:text-gold-600">
              {c.privacy}
            </Link>
          </p>
        </Container>
      </section>
    </div>
  );
}
