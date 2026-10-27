"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Cookieless visit counter for the private REMAKO stats dashboard
// (stats.remako.si). Sends only the path, where the visitor came from, the
// time zone, language, screen width and how long the page was visible: no
// cookie, no storage, no id. Same script as the other sites
// (byurska-studio/firebase/stevec.html), shaped as a component so Next's
// client navigations count as page views. The desktop app (Electron) is
// never sent.
const ENDPOINT = "https://europe-west1-byurska-studio.cloudfunctions.net/stevec";

function send(body: Record<string, unknown>) {
  try {
    navigator.sendBeacon(ENDPOINT, JSON.stringify(body));
  } catch {
    // best effort
  }
}

export function VisitCounter() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (navigator.webdriver || /Electron/.test(navigator.userAgent) || !/byurska\.com$/.test(location.hostname)) return;
    const query = new URLSearchParams(location.search);
    let timeZone = "";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {}
    const referrer = previous.current ? location.origin + previous.current : document.referrer;
    previous.current = pathname;
    send({ t: "v", p: pathname, r: referrer, us: query.get("utm_source") ?? query.get("ref") ?? "", tz: timeZone, l: navigator.language ?? "", w: screen.width });

    let visible = 0;
    let since = document.visibilityState === "hidden" ? 0 : Date.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const seconds = Math.round((visible + (since ? Date.now() - since : 0)) / 1000);
      if (seconds > 0) send({ t: "k", p: pathname, d: seconds });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (since) visible += Date.now() - since;
        since = 0;
        finish();
      } else if (!since) since = Date.now();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", finish);
    return () => {
      finish();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", finish);
    };
  }, [pathname]);

  return null;
}
