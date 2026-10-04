"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/locales";
import type { LetterView } from "@/lib/poetry/view";

/**
 * Poetry by Urška.
 *
 * No subscription any more (Urška, 2026-10-03): like the weekly scratch card, one poem a week,
 * free for everyone, and a new one every Monday. The full Poetry by Urška is coming soon.
 *
 * The page speaks all five site languages; the poems themselves are written in Slovenian and
 * English, so the reader picks one of those.
 */

const WEEKLY: Record<Locale, { subtitle: string; eyebrow: string; next: string; days: string; soonTitle: string; soonText: string }> = {
  en: {
    subtitle: "One poem a week, free for everyone — with one of Urška's paintings standing beside it.",
    eyebrow: "This week's poem — free",
    next: "A new poem in",
    days: "days",
    soonTitle: "Poetry by Urška — coming soon",
    soonText: "More poems and more of Urška's writing are on their way.",
  },
  sl: {
    subtitle: "Ena pesem na teden, zastonj za vse — ob njej pa ena od Urškinih slik.",
    eyebrow: "Pesem tega tedna — zastonj",
    next: "Nova pesem čez",
    days: "dni",
    soonTitle: "Poetry by Urška — kmalu",
    soonText: "Več pesmi in več Urškinega pisanja je na poti.",
  },
  hr: {
    subtitle: "Jedna pjesma tjedno, besplatno za sve — a uz nju jedna od Urškinih slika.",
    eyebrow: "Pjesma ovog tjedna — besplatno",
    next: "Nova pjesma za",
    days: "dana",
    soonTitle: "Poetry by Urška — uskoro",
    soonText: "Još pjesama i još Urškina pisanja je na putu.",
  },
  de: {
    subtitle: "Ein Gedicht pro Woche, kostenlos für alle — und daneben eines von Urškas Bildern.",
    eyebrow: "Das Gedicht dieser Woche — kostenlos",
    next: "Ein neues Gedicht in",
    days: "Tagen",
    soonTitle: "Poetry by Urška — demnächst",
    soonText: "Weitere Gedichte und mehr von Urškas Texten sind unterwegs.",
  },
  it: {
    subtitle: "Una poesia a settimana, gratis per tutti — con accanto uno dei dipinti di Urška.",
    eyebrow: "La poesia di questa settimana — gratis",
    next: "Una nuova poesia tra",
    days: "giorni",
    soonTitle: "Poetry by Urška — in arrivo",
    soonText: "Altre poesie e altri scritti di Urška sono in arrivo.",
  },
};

/** The poem changes with the ISO week, on Monday — the same rhythm as the scratch card. */
function daysUntilNextMonday(): number {
  const diff = (8 - new Date().getDay()) % 7;
  return diff === 0 ? 7 : diff;
}

export default function PoetryLanding({
  sample,
  quotes,
}: {
  /** This week's poem, in both languages it exists in. */
  sample: { sl: LetterView; en: LetterView } | null;
  quotes: string[];
}) {
  const { locale, t } = useLanguage();
  const p = t.poetry;
  const w = WEEKLY[locale];
  // The language provider only knows the visitor's language after hydration, so the poem
  // follows the site language until the reader picks one of the two it is written in.
  const [chosenLang, setLetterLang] = useState<"sl" | "en" | null>(null);
  const letterLang: "sl" | "en" = chosenLang ?? (locale === "sl" ? "sl" : "en");
  // On the visitor's own clock, after hydration.
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDaysLeft(daysUntilNextMonday());
  }, []);

  const letter = sample?.[letterLang] ?? null;

  return (
    <div className="spirit-light relative isolate">
      <section className="px-6 pt-24 pb-12 text-center md:pt-32">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-smoke">{p.eyebrow}</p>
          <h1 className="mt-5 font-heading text-4xl text-bone md:text-6xl">🕊️ {p.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone">{w.subtitle}</p>
        </Container>
      </section>

      <section className="px-6 pb-8">
        <Container className="max-w-xl">
          <p className="mb-6 text-center font-heading text-2xl italic leading-relaxed text-bone md:text-3xl">
            “{p.lead}”
          </p>
        </Container>
      </section>

      {letter && (
        <section className="px-6 py-12">
          <Container className="max-w-2xl">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-smoke">{w.eyebrow}</p>
            <div className="mt-5 flex justify-center gap-2" role="group" aria-label="Poem language">
              {(["sl", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLetterLang(l)}
                  aria-pressed={letterLang === l}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-widest ${
                    letterLang === l ? "border-bone/60 text-bone" : "border-bone/15 text-smoke"
                  }`}
                >
                  {l === "sl" ? "Slovensko" : "English"}
                </button>
              ))}
            </div>

            <article className="reading-panel mt-6 rounded-3xl px-6 py-8 md:px-10 md:py-10" lang={letterLang}>
              <h2 className="text-center font-heading text-3xl text-bone">{letter.title}</h2>
              {letter.artwork && (
                <Link href={`/collection/${letter.artwork.slug}`} className="mt-6 block">
                  <Image
                    src={letter.artwork.image}
                    alt={letter.artwork.title}
                    width={900}
                    height={600}
                    className="mx-auto h-auto max-h-[26rem] w-auto rounded-2xl object-contain"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                  <span className="mt-2 block text-center text-xs uppercase tracking-widest text-smoke">
                    {letter.artwork.title}
                  </span>
                </Link>
              )}
              {letter.body.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mt-5 text-lg leading-relaxed text-bone">
                  {paragraph}
                </p>
              ))}
              <p className="mt-8 text-center font-heading italic text-bone">— Urška</p>
            </article>
            {daysLeft !== null && (
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-smoke">
                {w.next} {daysLeft} {w.days}
              </p>
            )}
          </Container>
        </section>
      )}

      {quotes.length > 0 && (
        <section className="border-t border-bone/10 px-6 py-20">
          <Container className="max-w-2xl text-center">
            <h2 className="font-heading text-3xl text-bone">{p.quotesTitle}</h2>
            <div className="mt-8 space-y-8">
              {quotes.map((quote) => (
                <p key={quote} className="font-heading text-xl italic leading-relaxed text-bone md:text-2xl">
                  “{quote}”
                </p>
              ))}
            </div>
            <Link
              href="/collection"
              className="mt-10 inline-block border-b border-bone/40 pb-1 text-xs uppercase tracking-widest text-bone/85 transition-colors hover:text-bone"
            >
              {p.seePaintings}
            </Link>
          </Container>
        </section>
      )}

      <section className="border-t border-bone/10 px-6 py-20">
        <Container className="max-w-xl">
          <div className="rounded-3xl border border-accent-warm/40 bg-paper/90 p-7 text-center shadow-[0_30px_70px_-40px_rgba(75,58,94,0.5)] md:p-10">
            <p className="font-heading text-3xl text-bone md:text-4xl">🕊️ {w.soonTitle}</p>
            <p className="mt-4 text-bone">{w.soonText}</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
