import { FREE_POEMS, type FreePoem } from "@/content/freePoems";
import { weekThursday } from "@/content/poetry";
import { getAllArtworks } from "@/lib/content";
import { isoWeek } from "@/lib/tarotSubscribers";

/**
 * This week's free poem on Poetry by Urška: her own poems, one per ISO week, in her order —
 * the first in FREE_POEM_START_WEEK, a new one every Monday. After the hundredth it starts again
 * from the first. A painting from the collection stands beside each one, in collection order.
 */
export const FREE_POEM_START_WEEK = "2026-W41";

const WEEK_MS = 7 * 86400000;

export interface FreePoemView extends FreePoem {
  number: number;
  artwork: { slug: string; title: string; image: string } | null;
}

export function freePoemForDisplay(now = new Date()): FreePoemView | null {
  if (FREE_POEMS.length === 0) return null;
  const weeks = Math.round(
    (Date.parse(weekThursday(isoWeek(now).key)) - Date.parse(weekThursday(FREE_POEM_START_WEEK))) / WEEK_MS
  );
  const index = ((weeks % FREE_POEMS.length) + FREE_POEMS.length) % FREE_POEMS.length;
  const paintings = getAllArtworks().filter((a) => a.heroImage);
  const painting = paintings.length ? paintings[index % paintings.length] : undefined;
  return {
    ...FREE_POEMS[index],
    number: index + 1,
    artwork: painting?.heroImage ? { slug: painting.slug, title: painting.title, image: painting.heroImage } : null,
  };
}
