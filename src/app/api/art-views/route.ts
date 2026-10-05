import { NextRequest, NextResponse } from "next/server";
import { getAllArtworks, getArtworkBySlug } from "@/lib/content";
import { isRedisConfigured, pipeline } from "@/lib/redis";
import { OSS_ALERT_EMAILS } from "@/lib/ossThreshold";
import { currentMemberEmail } from "@/lib/starCalendar/session";

/**
 * Time spent with each painting (see components/story/ArtworkViewTracker.tsx).
 *
 * POST — one viewing from a visitor who accepted analytics cookies: { slug, ms }. Kept per
 * painting as a running total of viewings and seconds in Redis (`art-views:<slug>`); nothing
 * about the visitor is stored.
 *
 * GET — the totals, for the owners only (Urška and Teo, signed in like for the OSS alert).
 */

const KEY = (slug: string) => `art-views:${slug}`;
/** A single viewing longer than this is a tab left open, not someone looking. */
const MAX_MS = 30 * 60 * 1000;

export async function POST(request: NextRequest) {
  let body: { slug?: unknown; ms?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const slug = typeof body.slug === "string" ? body.slug : "";
  const ms = typeof body.ms === "number" && Number.isFinite(body.ms) ? Math.round(body.ms) : 0;
  if (!getArtworkBySlug(slug) || ms < 1000) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!isRedisConfigured()) return NextResponse.json({ ok: true });

  const seconds = Math.round(Math.min(ms, MAX_MS) / 1000);
  try {
    await pipeline([
      ["HINCRBY", KEY(slug), "views", 1],
      ["HINCRBY", KEY(slug), "seconds", seconds],
    ]);
  } catch {
    // Counting a view must never break the page.
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const email = await currentMemberEmail();
  if (!email || !OSS_ALERT_EMAILS.includes(email)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!isRedisConfigured()) return NextResponse.json({ paintings: [] });

  const artworks = getAllArtworks();
  const rows = await pipeline<string[]>(artworks.map((a) => ["HGETALL", KEY(a.slug)]));
  const paintings = artworks.map((artwork, i) => {
    const flat = rows[i] ?? [];
    const fields: Record<string, number> = {};
    for (let j = 0; j + 1 < flat.length; j += 2) fields[flat[j]] = Number(flat[j + 1]);
    const views = fields.views ?? 0;
    const seconds = fields.seconds ?? 0;
    return {
      title: artwork.title,
      views,
      totalSeconds: seconds,
      averageSeconds: views ? Math.round(seconds / views) : 0,
    };
  });
  paintings.sort((a, b) => b.totalSeconds - a.totalSeconds);
  return NextResponse.json({ paintings }, { headers: { "Cache-Control": "private, no-store" } });
}
