"use client";

import { useEffect } from "react";
import { hasConsent } from "@/lib/cookieConsent";

/**
 * How long a visitor spends with a painting (Urška, 2026-10-05) — only after they accepted
 * analytics cookies. Counts the seconds the page is actually visible, and when they leave or
 * switch away sends one number to /api/art-views: the painting and the time. Nothing that
 * identifies the visitor is stored.
 */
export default function ArtworkViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!hasConsent("analytics")) return;

    let visibleSince: number | null = document.visibilityState === "visible" ? Date.now() : null;
    let total = 0;
    let sent = false;

    function pause() {
      if (visibleSince !== null) {
        total += Date.now() - visibleSince;
        visibleSince = null;
      }
    }

    function send() {
      pause();
      if (sent || total < 1000) return;
      sent = true;
      const body = JSON.stringify({ slug, ms: total });
      if (!navigator.sendBeacon?.("/api/art-views", new Blob([body], { type: "application/json" }))) {
        fetch("/api/art-views", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(
          () => {}
        );
      }
    }

    function onVisibility() {
      if (document.visibilityState === "visible") {
        visibleSince = Date.now();
      } else {
        send();
        // A visitor who comes back to the tab starts a new viewing.
        sent = false;
        total = 0;
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", send);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", send);
      send();
    };
  }, [slug]);

  return null;
}
