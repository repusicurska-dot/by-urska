"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { fadeInUp } from "@/lib/motion";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Urška's story. On a phone it reads straight down; on a wide screen the text sits beside the
 * photographs, so the page isn't one long narrow column.
 */
export default function AboutContent() {
  const { t } = useLanguage();
  const a = t.about;
  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" },
  } as const;
  return (
    <div>
      <section className="py-24 md:py-32">
        <Container className="reading-panel max-w-3xl rounded-3xl px-6 py-10 md:px-10 md:py-12 lg:max-w-6xl lg:px-14 lg:py-16">
          <motion.span
            className="text-xs tracking-widest uppercase text-gold-400 block"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {a.eyebrow}
          </motion.span>
          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-bone mt-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            {a.name}
          </motion.h1>

          <div className="mt-10 grid md:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
            <motion.div
              className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            >
              <Image
                src="/images/about-castle-1.jpg"
                alt={a.alt.portrait}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 280px, 80vw"
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              className="space-y-5 text-bone/75 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <p className="font-heading italic text-xl md:text-2xl lg:text-3xl text-bone">{a.lead}</p>
              <p>{a.remembered}</p>
              {/* On a wide screen the climbing years sit beside the portrait too. */}
              <div className="hidden space-y-5 lg:block">
                <p>{a.climbing}</p>
                <p>{a.shaped}</p>
                <p>{a.today}</p>
              </div>
            </motion.div>
          </div>

          <motion.div className="mt-16 space-y-5 text-bone/75 leading-relaxed max-w-2xl lg:hidden" {...reveal}>
            <p>{a.climbing}</p>
            <p>{a.shaped}</p>
            <p>{a.today}</p>
          </motion.div>

          <motion.div
            className="relative mt-16 aspect-[3/4] md:aspect-[16/9] lg:aspect-[21/9] rounded-sm overflow-hidden max-w-3xl lg:max-w-none"
            {...reveal}
          >
            <Image
              src="/images/about-castle-2.jpg"
              alt={a.alt.garden}
              width={1365}
              height={2048}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          {/* Two photos and her closing words: side by side on a wide screen. */}
          <div className="lg:mt-16 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <motion.div className="mt-16 grid grid-cols-2 gap-4 max-w-2xl lg:mt-0" {...reveal}>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/about-castle-4.jpg"
                  alt={a.alt.lookingBack}
                  fill
                  sizes="(min-width: 768px) 340px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/about-castle-3.jpg"
                  alt={a.alt.roses}
                  fill
                  sizes="(min-width: 768px) 340px, 45vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div className="mt-16 space-y-5 text-bone/75 leading-relaxed max-w-2xl lg:mt-0" {...reveal}>
              <p>{a.work}</p>
              <p>{a.dialogue}</p>
              <p>{a.invitation}</p>
              <p className="font-heading italic text-xl text-bone pt-4">{a.welcome}</p>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
