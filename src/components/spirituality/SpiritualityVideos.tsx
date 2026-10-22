import Container from "@/components/shared/Container";

const VIDEOS = [
  { src: "/images/spirituality-1.mp4", poster: "/images/spirituality-1-poster.jpg", ratio: "aspect-[9/16]" },
  { src: "/images/spirituality-2.mp4", poster: "/images/spirituality-2-poster.jpg", ratio: "aspect-[9/16]" },
  { src: "/images/spirituality-3.mp4", poster: "/images/spirituality-3-poster.jpg", ratio: "aspect-[4/3]" },
];

/** Urška's short films on Spirituality: tap to play, sound on by default (no autoplay). */
export default function SpiritualityVideos() {
  return (
    <section className="px-6 py-12">
      <Container className="max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3">
          {VIDEOS.map((v) => (
            <video
              key={v.src}
              className={`w-full ${v.ratio} rounded-2xl object-cover shadow-2xl`}
              src={v.src}
              poster={v.poster}
              controls
              playsInline
              preload="metadata"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
