"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * A whispered line between the film and the first painting. It stays in the flow and leaves with
 * the scroll: a pinned chapter here faded out early and left a whole empty screen before the painting.
 */
export default function SilenceIntro() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      {/* The opening line doubles as the page's h1 — without it the page has no heading for search
          engines and screen readers. */}
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="font-heading italic text-2xl md:text-4xl text-bone max-w-3xl"
      >
        {t.about.lead}
      </motion.h1>

      <div className="flex flex-col items-center gap-2 text-bone/75">
        <span className="text-xs tracking-[0.3em] uppercase">{t.home.scrollToEnter}</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={1.25} />
        </motion.div>
      </div>
    </section>
  );
}
