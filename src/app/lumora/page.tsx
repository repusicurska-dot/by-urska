import type { Metadata } from "next";
import LumoraLanding from "@/components/lumora/LumoraLanding";

export const metadata: Metadata = {
  title: "Lumora Manifest — Urška's manifesting app for iPhone",
  description:
    "A gentle daily manifesting ritual by Urška: a card every morning, a question every evening, your wishes and the moon. 7 days free, then €1.99 a month.",
  alternates: { canonical: "/lumora" },
  openGraph: { images: ["/images/lumora/today-en.webp"] },
};

export default function LumoraPage() {
  return <LumoraLanding />;
}
