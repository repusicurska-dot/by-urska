import Container from "@/components/shared/Container";

const VIDEOS = [
  { src: "/images/spirituality-1.mp4", poster: "/images/spirituality-1-poster.jpg" },
  { src: "/images/spirituality-3.mp4", poster: "/images/spirituality-3-poster.jpg" },
];

/** Urška's two vertical films on Spirituality (the third opens the page): tap to play, with sound. */
export default function SpiritualityVideos() {
  return (
    <section className="px-6 py-12">
      <Container className="max-w-3xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {VIDEOS.map((v) => (
            <video
              key={v.src}
              className="aspect-[9/16] w-full rounded-2xl object-cover shadow-2xl"
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
