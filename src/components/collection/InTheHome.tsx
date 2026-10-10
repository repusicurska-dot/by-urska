"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getArtworkBySlug } from "@/lib/content";

/**
 * Urška's own photographs of the originals on real walls — the one thing a catalogue
 * shot can't show a buyer: scale, and how a piece actually lives in a room.
 *
 * Grouped by painting, in the same order as the collection (Urška, 2026-10-10): the blue
 * piece, the pink one, the two small canvases together, the white figure, then the black
 * paintings last, the wolf first. One photo per view — near-identical shots are left out (Urška, 2026-10-10). Each group is a masonry row so every frame keeps the proportions it
 * was shot in. The two wide "whole collection" shots bookend it.
 */
type Shot = { src: string; width: number; height: number; alt: string };
type Group = { slugs: string[]; shots: Shot[] };

const GROUPS: Group[] = [
  {
    slugs: ["artwork-05"],
    shots: [
      { src: "/images/on-wall-heart.jpg", width: 1004, height: 1302, alt: "\"Somehow My Heart Still Remembers You\" on a plain white wall" },
      { src: "/images/artist-hanging-heart.jpg", width: 1021, height: 1507, alt: "Urška hanging the turquoise canvas above the sofa" },
      { src: "/images/in-home-heart-6.jpg", width: 1080, height: 1620, alt: "The turquoise canvas above a sofa with plum and copper cushions" },
      { src: "/images/in-home-heart-1.jpg", width: 1072, height: 1607, alt: "The turquoise canvas above a pale sofa" },
      { src: "/images/in-home-heart-3.jpg", width: 1080, height: 1620, alt: "The full living room, with plants and a low round table" },
      { src: "/images/in-home-heart-2.jpg", width: 1080, height: 1620, alt: "The living room seen past a white orchid" },
    ],
  },
  {
    slugs: ["artwork-04"],
    shots: [
      { src: "/images/on-wall-birds.jpg", width: 1023, height: 1560, alt: "\"Birds of Light\" hanging beside a feathered dreamcatcher" },
      { src: "/images/on-wall-birds-2.jpg", width: 1067, height: 1461, alt: "\"Birds of Light\" in full, on a white wall" },
      { src: "/images/in-home-birds-3.jpg", width: 1080, height: 1620, alt: "\"Birds of Light\" above the sofa, between trailing ivy and a dreamcatcher" },
      { src: "/images/in-home-birds-1.jpg", width: 1080, height: 1620, alt: "\"Birds of Light\" above a sofa dressed in rose and plum" },
      { src: "/images/in-home-birds-2.jpg", width: 1080, height: 1620, alt: "\"Birds of Light\" seen from across the room" },
    ],
  },
  {
    slugs: ["artwork-01", "artwork-03"],
    shots: [
      { src: "/images/on-wall-blossoming.jpg", width: 1056, height: 1584, alt: "\"Blossoming Love\" resting on a shelf between trailing plants" },
      { src: "/images/in-home-shelf-1.jpg", width: 1289, height: 1080, alt: "\"Eternal Love\" and \"Blossoming Love\" on two white shelves" },
      { src: "/images/in-home-shelf-2.jpg", width: 1078, height: 1146, alt: "The two smaller canvases seen from the side, among plants and crystals" },
    ],
  },
  {
    slugs: ["artwork-08"],
    shots: [
      { src: "/images/artist-hanging-becoming.jpg", width: 1080, height: 1620, alt: "Urška hanging \"Becoming\" on a white wall" },
      { src: "/images/in-home-becoming-1.jpg", width: 1048, height: 1573, alt: "\"Becoming\" above the sofa" },
      { src: "/images/in-home-becoming-2.jpg", width: 1080, height: 1620, alt: "\"Becoming\" below a beaded ceiling light and a dreamcatcher" },
    ],
  },
  {
    slugs: ["artwork-06"],
    shots: [
      { src: "/images/on-wall-wolf.jpg", width: 1049, height: 1515, alt: "\"Voice of the Night\" in full, on a white wall" },
      { src: "/images/in-home-wolf-1.jpg", width: 1080, height: 1620, alt: "\"Voice of the Night\" above the white sofa" },
    ],
  },
  {
    slugs: ["artwork-02"],
    shots: [
      { src: "/images/on-wall-prophecy-2.jpg", width: 816, height: 963, alt: "\"The Prophecy\" in full, on a white wall" },
      { src: "/images/in-home-prophecy-2.jpg", width: 1080, height: 1620, alt: "\"The Prophecy\" above the sofa, next to a hanging plant" },
      { src: "/images/in-home-prophecy-3.jpg", width: 1080, height: 1620, alt: "\"The Prophecy\" above the sofa, beside a trailing plant" },
      { src: "/images/in-home-prophecy-1.jpg", width: 883, height: 1202, alt: "\"The Prophecy\" below a beaded ceiling light" },
      { src: "/images/in-home-room-1.jpg", width: 1620, height: 1080, alt: "\"The Prophecy\" in the living room, seen past a white orchid" },
    ],
  },
  {
    slugs: ["artwork-07"],
    shots: [
      { src: "/images/on-wall-horse.jpg", width: 1452, height: 1022, alt: "\"Wild Spirit\" in full, on a white wall" },
      { src: "/images/in-home-horse-1.jpg", width: 1080, height: 1620, alt: "\"Wild Spirit\" on the living-room wall above the sofa" },
    ],
  },
];

function WideShot({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  return (
    <div className="art-card relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
    </div>
  );
}

export default function InTheHome() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-bone/10 px-2 py-24 md:py-28">
      <Container>
        <span className="block text-xs tracking-[0.35em] uppercase text-accent-warm">{t.collection.inHomeEyebrow}</span>
        <h2 className="font-gothic text-3xl md:text-5xl text-bone mt-5 leading-[1.1]">{t.collection.inHomeTitle}</h2>
        <p className="mt-6 max-w-xl text-lg text-bone/75 leading-relaxed">{t.collection.inHomeText}</p>

        <div className="mt-14">
          <WideShot
            src="/images/collection-together-1.jpg"
            alt="Five originals lined up together against a garden window"
            ratio="1569 / 684"
          />
        </div>

        {GROUPS.map((group) => {
          const pieces = group.slugs.map((slug) => getArtworkBySlug(slug)).filter((a) => a !== undefined);
          return (
            <div key={group.slugs.join("+")} className="mt-16">
              <h3 className="font-heading text-2xl text-bone">
                {pieces.map((piece, i) => (
                  <span key={piece.slug}>
                    {i > 0 && <span className="text-bone/40"> &amp; </span>}
                    <Link href={`/artworks/${piece.slug}`} className="transition-colors hover:text-accent-warm">
                      {piece.title}
                    </Link>
                  </span>
                ))}
              </h3>
              <div className="mt-6 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
                {group.shots.map((shot) => (
                  <div key={shot.src} className="art-card group mb-6 break-inside-avoid overflow-hidden rounded-2xl">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-10">
          <WideShot
            src="/images/collection-together-2.jpg"
            alt="Three of the large originals side by side on the terrace"
            ratio="1578 / 679"
          />
        </div>
      </Container>
    </section>
  );
}
