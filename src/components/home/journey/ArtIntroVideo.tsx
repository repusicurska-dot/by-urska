"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** First thing on /art: Urška's short vertical film, playing muted on arrival (browsers only autoplay muted). */
export default function ArtIntroVideo() {
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
    <section className="relative flex min-h-[calc(100svh-7rem)] items-center justify-center px-4 py-6">
      <div className="relative h-[calc(100svh-10rem)] max-h-[860px] aspect-[9/16] max-w-full overflow-hidden rounded-2xl shadow-2xl">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/images/art-intro.mp4"
          poster="/images/art-intro-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
