"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/shared/Container";
import WorldLogo from "@/components/shared/WorldLogo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { HUB } from "@/content/hub";
import { CLIMB_STORY } from "@/content/climbStory";
import { CHAPTER_PHOTOS, MEDAL_PHOTOS, type ClimbPhoto } from "@/content/climbPhotos";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A photo at its own shape — never cropped, on a phone or on a wide screen. */
function Shot({ shot, sizes }: { shot: ClimbPhoto; sizes: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-bone/5" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-contain" />
    </div>
  );
}

/**
 * A chapter's photos as one small composition: two stand side by side, the second a little
 * lower; with three, the first spans the width and the other two sit beneath it. Every photo
 * keeps its own shape, so nothing is cut off.
 */
function ChapterPhotos({ photos }: { photos: ClimbPhoto[] }) {
  const sizes = "(min-width: 1024px) 28vw, 50vw";
  const wide = "(min-width: 1024px) 50vw, 100vw";
  if (photos.length === 1) return <Shot shot={photos[0]} sizes={wide} />;
  const [first, ...rest] = photos;
  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 items-start gap-4">
        {photos.map((shot, i) => (
          <div key={shot.src} className={i === 1 ? "mt-12" : ""}>
            <Shot shot={shot} sizes={sizes} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 items-start gap-4">
      <div className="col-span-2">
        <Shot shot={first} sizes={wide} />
      </div>
      {rest.slice(0, 2).map((shot) => (
        <Shot key={shot.src} shot={shot} sizes={sizes} />
      ))}
    </div>
  );
}

/** Her medals and podiums: a gallery of whole photos, right after the opening. */
function Medals({ title, intro, rise }: { title: string; intro: string; rise: (d: number) => object }) {
  return (
    <section className="pb-16 md:pb-24">
      <Container className="max-w-6xl">
        <div className="text-center">
          <motion.p {...rise(0)} aria-hidden="true" className="text-4xl">
            🥇
          </motion.p>
          <motion.h2 {...rise(0.05)} className="mt-3 font-heading text-3xl uppercase tracking-[0.12em] text-bone md:text-5xl">
            {title}
          </motion.h2>
          <motion.span {...rise(0.1)} aria-hidden="true" className="mx-auto mt-6 block h-px w-12 bg-gold-400/60" />
          <motion.p {...rise(0.15)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bone/80">
            {intro}
          </motion.p>
        </div>
        <motion.div {...rise(0.2)} className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {MEDAL_PHOTOS.map((shot) => (
            <div key={shot.src} className="break-inside-avoid">
              <Shot shot={shot} sizes="(min-width: 768px) 33vw, 50vw" />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/** Climb by Urška — her story on the wall, in her own words, chapter by chapter. */
export default function ClimbContent() {
  const { locale } = useLanguage();
  const c = HUB[locale];
  const story = CLIMB_STORY[locale];
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <div className="relative isolate overflow-x-clip">
      {/* a ridge line across the top of the page */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[60vh] -z-10 h-[34vh] w-full text-gold-400"
      >
        <motion.path
          d="M0 300 L180 170 L300 230 L470 80 L610 210 L760 40 L920 200 L1060 120 L1200 220 L1440 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity="0.35"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
        />
        <path
          d="M0 300 L180 170 L300 230 L470 80 L610 210 L760 40 L920 200 L1060 120 L1200 220 L1440 90 V320 H0 Z"
          fill="url(#climbFade)"
        />
        <defs>
          <linearGradient id="climbFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e9d3a2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e9d3a2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <section className="pb-16 pt-24 text-center md:pb-24 md:pt-32">
        <Container className="max-w-3xl">
          <motion.div
            className="mx-auto w-fit text-gold-600"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <WorldLogo world="climb" className="h-44 w-44 md:h-52 md:w-52" delay={0.2} sizes="208px" />
          </motion.div>
        </Container>
      </section>

      <Medals title={story.medals.title} intro={story.medals.intro} rise={rise} />

      {/* Her story, chapter by chapter, each beside the photos that belong to it — on a wide
          screen the text and the photos swap sides from one chapter to the next. */}
      <section className="pb-16 md:pb-24">
        <Container className="max-w-2xl lg:max-w-6xl">
          {story.chapters.map((chapter, i) => {
            const photos = CHAPTER_PHOTOS[i] ?? [];
            const flip = i % 2 === 1;
            return (
              <div
                key={chapter.title}
                className="py-12 md:py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-16"
              >
                <div className={`text-center ${flip ? "lg:order-2" : ""}`}>
                  <motion.p {...rise(0)} className="font-heading text-sm tracking-[0.3em] text-gold-600/80">
                    {String(i + 1).padStart(2, "0")}
                  </motion.p>
                  <motion.h2 {...rise(0.05)} className="mt-3 font-heading text-3xl uppercase tracking-[0.12em] text-bone md:text-4xl">
                    {chapter.title}
                  </motion.h2>
                  <motion.span {...rise(0.1)} aria-hidden="true" className="mx-auto mt-6 block h-px w-12 bg-gold-400/60" />
                  <motion.div {...rise(0.15)} className="mt-6 space-y-4">
                    {chapter.paragraphs.map((p) => (
                      <p key={p} className="text-lg leading-relaxed text-bone/80">
                        {p}
                      </p>
                    ))}
                  </motion.div>
                  {chapter.quote && (
                    <motion.blockquote {...rise(0.2)} className="mx-auto mt-12 max-w-xl">
                      <span aria-hidden="true" className="block font-heading text-7xl leading-none text-gold-400/60">
                        “
                      </span>
                      <p className="-mt-5 font-heading text-2xl italic leading-snug text-bone md:text-3xl">{chapter.quote}</p>
                    </motion.blockquote>
                  )}
                </div>
                {photos.length > 0 && (
                  <motion.div {...rise(0.2)} className={`mt-10 lg:mt-0 ${flip ? "lg:order-1" : ""}`}>
                    <ChapterPhotos photos={photos} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container className="max-w-3xl text-center">
          <motion.p {...rise(0)} className="font-heading text-4xl italic leading-tight text-bone md:text-6xl">
            {story.closing}
          </motion.p>
          <motion.p {...rise(0.1)} className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-600">
            — Urška
          </motion.p>
          <motion.div {...rise(0.2)}>
            <Link
              href="/"
              className="group mt-12 inline-flex items-center gap-3 border-b border-bone/30 pb-1 text-xs uppercase tracking-[0.3em] text-bone transition-colors hover:border-gold-600 hover:text-gold-600"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              {c.worldsTitle}
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
