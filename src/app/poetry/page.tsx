import type { Metadata } from "next";
import { URSKA_QUOTES } from "@/content/poetry";
import { freePoemForDisplay } from "@/lib/poetry/freePoem";
import PoetryLanding from "@/components/poetry/PoetryLanding";

export const metadata: Metadata = {
  title: "Poetry by Urška — A poem a week",
  description:
    "One of Urška's own poems every week, free for everyone, with one of her paintings beside it.",
  alternates: { canonical: "/poetry" },
};

// This week's poem has to be this week's.
export const dynamic = "force-dynamic";

export default function PoetryPage() {
  return <PoetryLanding poem={freePoemForDisplay()} quotes={URSKA_QUOTES} />;
}
