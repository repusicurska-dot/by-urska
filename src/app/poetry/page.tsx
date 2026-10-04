import type { Metadata } from "next";
import { URSKA_QUOTES } from "@/content/poetry";
import { currentLetterForDisplay } from "@/lib/poetry/schedule";
import { letterView } from "@/lib/poetry/view";
import PoetryLanding from "@/components/poetry/PoetryLanding";

export const metadata: Metadata = {
  title: "Poetry by Urška — Letters from the studio",
  description:
    "One poem a week, free for everyone, with one of Urška's paintings beside it. Poetry by Urška — coming soon.",
  alternates: { canonical: "/poetry" },
};

// This week's poem has to be this week's.
export const dynamic = "force-dynamic";

export default function PoetryPage() {
  const letter = currentLetterForDisplay();
  return (
    <PoetryLanding
      sample={letter ? { sl: letterView(letter, "sl"), en: letterView(letter, "en") } : null}
      quotes={URSKA_QUOTES}
    />
  );
}
