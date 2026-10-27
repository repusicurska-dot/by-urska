"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Presentation film of a painting, shown in the /art gallery right after the painting itself. */
export default function GalleryVideoCard({
  src,
  poster,
  label,
  className,
  style,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
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
    <div className={className} style={style}>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl shadow-2xl">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          aria-label={label}
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
          className="absolute bottom-3 right-3 rounded-full bg-black/50 p-2 text-bone backdrop-blur transition hover:bg-black/70"
        >
          {muted ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
        </button>
      </div>
      <p className="mt-5 text-xs tracking-widest text-smoke uppercase">{label}</p>
    </div>
  );
}
