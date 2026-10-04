import type { ReactNode } from "react";
import Container from "@/components/shared/Container";

/**
 * The frame for the Lumora Manifest app's public pages (support and privacy), which the App
 * Store links to. Written in English and Slovenian on the same page, as the app is.
 */
export default function LumoraPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="py-24 md:py-32">
      <Container className="reading-panel max-w-2xl rounded-3xl px-6 py-10 md:px-10 md:py-12">
        <span className="block text-xs tracking-widest uppercase text-gold-400">Lumora Manifest</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-4">{title}</h1>
        <p className="mt-2 text-xs text-bone/50">Last updated / Zadnja posodobitev: {updated}</p>
        <div className="mt-10 space-y-8 text-bone/80 leading-relaxed [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-bone [&_h2]:mb-3 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-bone [&_h3]:mt-6 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline [&_a]:hover:text-gold-400 [&_hr]:my-12 [&_hr]:border-bone/15">
          {children}
        </div>
      </Container>
    </section>
  );
}
