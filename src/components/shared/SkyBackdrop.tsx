import Image from "next/image";
import { preload } from "react-dom";

/**
 * The site's sky: soft clouds with the light breaking through, fixed behind every page.
 * It is Urška's sky (sky-golden-2560.webp) recoloured to pearl, lilac and blush, so the clouds
 * stay real but stop competing with the paintings. It holds still: every glass panel on the page
 * re-renders whatever moves behind it. The veils keep the text readable over the cloud banks.
 */
export default function SkyBackdrop() {
  // `.sky-curtain` paints this file on the very first frame, before the page is there.
  preload("/images/sky-pearl-2560.webp", { as: "image" });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/sky-pearl-2560.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={92}
        />
      </div>

      {/* A woven canvas grain, so the sky reads as a painting on canvas. */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15 0.95' numOctaves='2'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23c)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* A veil of light: keeps the plum text readable over the darker cloud banks and lets the
          bright centre of the painting carry the page. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 18%, rgba(255,252,245,0) 0%, rgba(253,248,238,0.2) 45%, rgba(250,245,236,0.3) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,253,248,0) 0%, rgba(250,244,234,0.1) 55%, rgba(244,238,229,0.2) 100%)" }}
      />
    </div>
  );
}
