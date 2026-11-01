"use client";

import { useEffect, useRef } from "react";

/**
 * Turns every card and panel on the site into glass, so a new surface on any page gets it
 * without having to remember a class. The look itself lives in `.liquid-glass` (globals.css);
 * this adds the refraction at the rim, which only Chromium can draw inside backdrop-filter.
 * Safari, Firefox and phones keep the frosted glass from the stylesheet.
 */
const SURFACES = '.art-card, .reading-panel, .liquid-glass, [class*="bg-paper"], [class*="bg-raised"]';
const FORM_CONTROLS = "input, textarea, select";
const MIN_WIDTH = 96;
const MIN_HEIGHT = 40;
const BEZEL = 46;
const BACKDROP = "blur(5px) saturate(1.5) brightness(1.04)";
const SVG_NS = "http://www.w3.org/2000/svg";

/** A displacement map for a rounded rectangle: neutral inside, bending inwards at the rim. */
function displacementMap(width: number, height: number, radius: number, bezel: number) {
  // Half size: the map is smooth, and a tall panel would otherwise cost millions of pixels.
  const w = Math.ceil(width / 2);
  const h = Math.ceil(height / 2);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const image = ctx.createImageData(w, h);
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const x = (px + 0.5) * 2 - width / 2;
      const y = (py + 0.5) * 2 - height / 2;
      const ax = Math.abs(x) - (width / 2 - radius);
      const ay = Math.abs(y) - (height / 2 - radius);
      const ox = Math.max(ax, 0);
      const oy = Math.max(ay, 0);
      const corner = Math.hypot(ox, oy);
      const depth = -(corner + Math.min(Math.max(ax, ay), 0) - radius);
      let nx = 0;
      let ny = 0;
      if (corner > 0) {
        nx = ox / corner;
        ny = oy / corner;
      } else if (ax > ay) {
        nx = 1;
      } else {
        ny = 1;
      }
      const edge = Math.max(0, 1 - Math.max(depth, 0) / bezel);
      const bend = edge * edge * edge;
      const i = (py * w + px) * 4;
      image.data[i] = 128 - Math.sign(x) * nx * bend * 127;
      image.data[i + 1] = 128 - Math.sign(y) * ny * bend * 127;
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

function setAttributes(el: Element, attributes: Record<string, string | number>) {
  for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, String(value));
}

export default function LiquidGlass() {
  const defs = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = defs.current;
    if (!svg) return;
    const refracts =
      navigator.userAgent.includes("Chrome/") && window.matchMedia("(min-width: 768px)").matches;
    const filters = new Map<string, string>();

    function filterFor(width: number, height: number, radius: number) {
      const key = `${width}x${height}r${radius}`;
      const known = filters.get(key);
      if (known) return known;
      const bezel = Math.min(BEZEL, height / 2);
      const map = displacementMap(width, height, radius, bezel);
      if (!map) return null;
      const id = `liquid-glass-${filters.size}`;
      const filter = document.createElementNS(SVG_NS, "filter");
      setAttributes(filter, {
        id,
        x: 0,
        y: 0,
        width,
        height,
        filterUnits: "userSpaceOnUse",
        "color-interpolation-filters": "sRGB",
      });
      const image = document.createElementNS(SVG_NS, "feImage");
      setAttributes(image, { href: map, x: 0, y: 0, width, height, result: "map", preserveAspectRatio: "none" });
      const displace = document.createElementNS(SVG_NS, "feDisplacementMap");
      setAttributes(displace, {
        in: "SourceGraphic",
        in2: "map",
        scale: bezel * 2,
        xChannelSelector: "R",
        yChannelSelector: "G",
      });
      filter.append(image, displace);
      svg!.append(filter);
      filters.set(key, id);
      return id;
    }

    function refract(el: HTMLElement) {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      if (width < MIN_WIDTH || height < MIN_HEIGHT) return;
      const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, width / 2, height / 2);
      const id = filterFor(width, height, Math.round(radius));
      if (id) el.style.setProperty("backdrop-filter", `url(#${id}) ${BACKDROP}`);
    }

    let resizeTimer = 0;
    const resized = new Set<HTMLElement>();
    const sizes = new ResizeObserver((entries) => {
      entries.forEach((entry) => resized.add(entry.target as HTMLElement));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resized.forEach(refract);
        resized.clear();
      }, 150);
    });

    const seen = new WeakSet<HTMLElement>();
    function scan() {
      document.querySelectorAll<HTMLElement>(SURFACES).forEach((el) => {
        if (el.matches(FORM_CONTROLS)) return;
        if (el.offsetWidth < MIN_WIDTH || el.offsetHeight < MIN_HEIGHT) return;
        // React rewrites className when a card's state changes, so this can run again on one.
        if (!el.classList.contains("liquid-glass")) el.classList.add("liquid-glass");
        if (refracts && !seen.has(el)) {
          seen.add(el);
          sizes.observe(el);
        }
      });
    }

    let scanTimer = 0;
    const changes = new MutationObserver(() => {
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(scan, 120);
    });
    scan();
    changes.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });

    return () => {
      changes.disconnect();
      sizes.disconnect();
      window.clearTimeout(scanTimer);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return <svg ref={defs} aria-hidden="true" width="0" height="0" className="absolute" />;
}
