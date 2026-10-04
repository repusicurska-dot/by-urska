"use client";

import { createContext, useContext, useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { placeFor, WORLD_LOGO, WORLD_NAME, type Place } from "@/lib/worlds";

/**
 * Each world's gold logo, drawn in on every arrival — the logo itself and nothing added around
 * it (Urška, 2026-10-03: "ohrani osnovne logote brez teh dodatkov"). Each world still uncovers it
 * in its own way, and white light opens out from behind it as it appears:
 *
 *   art           uncovered from the centre outwards, the ring laid down in one stroke
 *   poetry        the name is written first, then "by Urška", then the ring is traced
 *   spirituality  a single point of light grows until the whole logo appears in it
 *   home          a line of light opens like dawn over the monogram
 *   climb         the logo rises from the bottom to the top
 *   finance       the ring is struck all the way round, the name uncovered along a rising line
 *
 * Every world draws its own logo (public/images/logo-<world>.webp); Urška's home draws the UR
 * monogram and writes "Urška" in place of its "Art by Urška". All of them end the same way — a
 * slow shimmer across the finished logo.
 *
 * The drawing is done with feathered SVG masks over the image, measured to its parts: ring
 * r 426–448 around (450, 449), monogram y 178–672, wordmark y 691–723.
 */

export type ArrivalVariant = Place;

export function arrivalVariantFor(pathname: string): ArrivalVariant {
  return placeFor(pathname);
}

/** Seconds from the start until the drawing — shimmer included — is complete. */
export const ARRIVAL_DRAW_SECONDS = 3.2;

/** The logo image the current world is drawing. */
const LogoSrc = createContext(WORLD_LOGO.art);
const GOLD = "#b8892f";
const CX = 450;
const CY = 449;
const EASE = [0.45, 0, 0.25, 1] as const;

type At = (delay: number, duration: number) => object;

export default function ArrivalLogo({
  variant = "art",
  reduceMotion = false,
}: {
  variant?: ArrivalVariant;
  reduceMotion?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const src = WORLD_LOGO[variant];
  const { t } = useLanguage();
  const at: At = (delay, duration) => (reduceMotion ? { duration: 0 } : { delay, duration, ease: EASE });

  return (
    <div className="flex flex-col items-center">
      <motion.svg
        viewBox="-160 -160 1220 1218"
        className="h-72 w-72 md:h-96 md:w-96 overflow-visible"
        role="img"
        aria-label={WORLD_NAME[variant]}
        initial={reduceMotion ? false : { scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={at(0, ARRIVAL_DRAW_SECONDS)}
      >
        <defs>
          <filter id={`feather-${id}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <clipPath id={`monoClip-${id}`}>
            <rect x="0" y="150" width="900" height="590" />
          </clipPath>
          <clipPath id={`wordClip-${id}`}>
            <rect x="0" y="682" width="900" height="52" />
          </clipPath>
          {/* the whole logo except its own "Art by Urška", for the worlds that write their own name */}
          <clipPath id={`noWord-${id}`}>
            <path clipRule="evenodd" d="M-400 -400 H1300 V1300 H-400 Z M125 680 H775 V738 H125 Z" />
          </clipPath>
          <linearGradient id={`goldText-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e6c67e" />
            <stop offset="55%" stopColor="#b8892f" />
            <stop offset="100%" stopColor="#8a6122" />
          </linearGradient>
          <radialGradient id={`light-${id}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`spark-${id}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`shine-${id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* The logo's own shape, so the shimmer only touches the gold. */}
          <mask id={`shape-${id}`} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
            <image href={src} x="0" y="0" width="900" height="898" />
          </mask>
        </defs>

        {/* White light opening out from behind the logo as it appears, staying as a soft glow. */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={640}
          fill={`url(#light-${id})`}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0.75], scale: [0.4, 1.08, 1] }}
          transition={at(0.3, 2.2)}
        />

        <LogoSrc.Provider value={src}>
          {variant === "art" && <ArtLogo id={id} at={at} />}
          {variant === "poetry" && <PoetryLogo id={id} at={at} />}
          {variant === "spirituality" && <SpiritLogo id={id} at={at} />}
          {variant === "climb" && <ClimbLogo id={id} at={at} />}
          {variant === "finance" && <FinanceLogo id={id} at={at} />}
          {variant === "home" && (
            <>
              <g clipPath={`url(#noWord-${id})`}>
                <HomeLogo id={id} at={at} />
              </g>
              <WordName id={id} at={at} label={WORLD_NAME.home} delay={1.75} duration={0.9} />
            </>
          )}
        </LogoSrc.Provider>

        {/* The same ending for every world: a slow shimmer across the finished logo. */}
        <g mask={`url(#shape-${id})`}>
          <motion.rect
            y="-200"
            width="220"
            height="1300"
            fill={`url(#shine-${id})`}
            transform="rotate(18 450 449)"
            initial={{ x: -700 }}
            animate={{ x: 1200 }}
            transition={at(ARRIVAL_DRAW_SECONDS - 0.95, 0.95)}
          />
        </g>
      </motion.svg>

      {variant === "poetry" && (
        <motion.p
          className="-mt-4 max-w-md px-6 text-center font-heading italic text-lg leading-relaxed text-bone/85 md:text-xl"
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={at(2.2, 1)}
        >
          “{t.poetry.lead}”
        </motion.p>
      )}
    </div>
  );
}

/** "Urška" in place of the UR logo's "Art by Urška": the same spaced gold capitals between two rules. */
function WordName({ id, at, label, delay, duration }: { id: string; at: At; label: string; delay: number; duration: number }) {
  const text = label.toUpperCase();
  const n = text.length;
  const fs = Math.min(45, 600 / (n * 0.99));
  const width = n * fs * 0.99;
  const rule = width < 470;
  const left = CX - width / 2;
  return (
    <>
      <defs>
        <mask id={`nameWipe-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={100}
            y={660}
            height={100}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ width: 0 }}
            animate={{ width: 700 }}
            transition={at(delay, duration)}
          />
        </mask>
      </defs>
      <g mask={`url(#nameWipe-${id})`} fill={`url(#goldText-${id})`}>
        <text
          x={CX}
          y={723}
          textAnchor="middle"
          fontSize={fs}
          textLength={width}
          lengthAdjust="spacing"
          style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}
        >
          {text}
        </text>
        {rule && (
          <>
            <rect x={left - 90} y={705} width={62} height={3.5} rx={1.75} />
            <rect x={CX + width / 2 + 28} y={705} width={62} height={3.5} rx={1.75} />
          </>
        )}
      </g>
    </>
  );
}

/** The logo image seen through one mask. */
function Part({ mask }: { mask: string }) {
  const src = useContext(LogoSrc);
  return <image href={src} x="0" y="0" width="900" height="898" mask={`url(#${mask})`} />;
}

/* --------------------------------- Art ---------------------------------- */

function ArtLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* uncovered from the centre outwards */}
        <mask id={`artMono-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#monoClip-${id})`}>
            <motion.circle
              cx={450}
              cy={420}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ r: 0 }}
              animate={{ r: 430 }}
              transition={at(0.25, 1.3)}
            />
          </g>
        </mask>
        {/* the ring, laid down in one stroke from the lower left */}
        <mask id={`artRing-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            r={437}
            fill="none"
            stroke="white"
            strokeWidth={48}
            transform={`rotate(135 ${CX} ${CY})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={at(1.1, 1.05)}
          />
        </mask>
        <mask id={`artWord-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#wordClip-${id})`}>
            <motion.rect
              x={80}
              y={660}
              height={100}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 780 }}
              transition={at(1.9, 0.6)}
            />
          </g>
        </mask>
      </defs>

      <Part mask={`artMono-${id}`} />
      <Part mask={`artRing-${id}`} />
      <Part mask={`artWord-${id}`} />
    </>
  );
}

/* -------------------------------- Poetry -------------------------------- */

function PoetryLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        <clipPath id={`poTop-${id}`}>
          <rect x="100" y="215" width="700" height="247" />
        </clipPath>
        <clipPath id={`poBottom-${id}`}>
          <rect x="110" y="462" width="680" height="260" />
        </clipPath>
        {/* "Poetry", written first */}
        <mask id={`poWord-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#poTop-${id})`}>
            <motion.rect
              x={40}
              y={200}
              height={280}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 860 }}
              transition={at(0.15, 1.2)}
            />
          </g>
        </mask>
        {/* "by Urška" flowing in beneath it like ink across a page */}
        <mask id={`poMono-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#poBottom-${id})`}>
            <motion.rect
              x={60}
              y={440}
              height={300}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 820 }}
              transition={at(0.95, 1.0)}
            />
          </g>
        </mask>
        {/* the ring filling with gold once it has been traced */}
        <mask id={`poRing-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            r={437}
            fill="none"
            stroke="white"
            strokeWidth={48}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={at(2.25, 0.5)}
          />
        </mask>
      </defs>

      <Part mask={`poWord-${id}`} />
      <Part mask={`poMono-${id}`} />
      <Part mask={`poRing-${id}`} />

      {/* a fine line tracing the ring, then fading into the gold */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={437}
        fill="none"
        stroke={GOLD}
        strokeWidth={3}
        strokeLinecap="round"
        transform={`rotate(-90 ${CX} ${CY})`}
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
        transition={{
          pathLength: at(1.45, 0.9),
          opacity: { ...at(1.45, 1.3), times: [0, 0.7, 1] },
        }}
      />
    </>
  );
}

/* ----------------------------- Spirituality ----------------------------- */

function SpiritLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* everything appears inside the growing light */}
        <mask id={`spLight-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ r: 0 }}
            animate={{ r: 560 }}
            transition={at(0.55, 1.5)}
          />
        </mask>
      </defs>

      <Part mask={`spLight-${id}`} />

      {/* a single point of light, before anything else */}
      <motion.circle
        cx={CX}
        cy={CY}
        fill={`url(#spark-${id})`}
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: [0, 90, 220], opacity: [0, 1, 0] }}
        transition={at(0, 1.6)}
      />
    </>
  );
}

/* --------------------------------- Home --------------------------------- */

function HomeLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* dawn: a line of light opening upwards and downwards */}
        <mask id={`homeDawn-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={-100}
            width={1100}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ y: CY, height: 0 }}
            animate={{ y: -80, height: 1060 }}
            transition={at(0.55, 1.35)}
          />
        </mask>
        <linearGradient id={`dawnLine-${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <Part mask={`homeDawn-${id}`} />

      {/* the line of light itself, drawn out from the centre and then fading into the logo */}
      <motion.rect
        y={CY - 2.5}
        height={5}
        rx={2.5}
        fill={`url(#dawnLine-${id})`}
        initial={{ x: CX, width: 0, opacity: 1 }}
        animate={{ x: -60, width: 1020, opacity: [1, 1, 0] }}
        transition={{ x: at(0, 0.7), width: at(0, 0.7), opacity: { ...at(0, 1.6), times: [0, 0.55, 1] } }}
      />
    </>
  );
}

/* --------------------------------- Climb -------------------------------- */

function ClimbLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* the logo rising from the bottom to the top */}
        <mask id={`climbRise-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={-100}
            width={1100}
            height={1300}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ y: 1000 }}
            animate={{ y: -150 }}
            transition={at(0.45, 1.6)}
          />
        </mask>
      </defs>

      <Part mask={`climbRise-${id}`} />
    </>
  );
}

/* -------------------------------- Finance ------------------------------- */

function FinanceLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* the name, uncovered along a rising line from the lower left */}
        <mask id={`finText-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#finInner-${id})`}>
            <motion.rect
              x={-200}
              y={-300}
              height={1500}
              fill="white"
              filter={`url(#feather-${id})`}
              transform={`rotate(-18 ${CX} ${CY})`}
              initial={{ width: 0 }}
              animate={{ width: 1300 }}
              transition={at(0.45, 1.4)}
            />
          </g>
        </mask>
        <clipPath id={`finInner-${id}`}>
          <circle cx={CX} cy={CY} r={420} />
        </clipPath>
        {/* the ring, struck from the lower left all the way round */}
        <mask id={`finRing-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            r={437}
            fill="none"
            stroke="white"
            strokeWidth={50}
            transform={`rotate(135 ${CX} ${CY})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={at(0.2, 1.3)}
          />
        </mask>
      </defs>

      <Part mask={`finRing-${id}`} />
      <Part mask={`finText-${id}`} />
    </>
  );
}
