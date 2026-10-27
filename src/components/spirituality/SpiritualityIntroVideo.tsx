"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Urška's short film at the very top of /spirituality: plays muted on arrival (browsers only autoplay muted). */
export default function SpiritualityIntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <section className="relative flex justify-center px-4 pt-6">
      <div className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/images/spirituality-intro.mp4"
          poster="/images/spirituality-intro-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Sound on" : "Sound off"}
          className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2.5 text-bone backdrop-blur transition hover:bg-black/70"
        >
          {muted ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
        </button>
      </div>
    </section>
  );
}
