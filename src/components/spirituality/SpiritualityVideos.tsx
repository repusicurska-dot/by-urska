import Container from "@/components/shared/Container";

const VIDEOS = [1, 2, 3];

/** Urška's short films on the Spirituality page. Files live in /public/videos/spirituality. */
export default function SpiritualityVideos() {
  return (
    <section className="pb-24 md:pb-32">
      <Container className="max-w-2xl lg:max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {VIDEOS.map((n) => (
            <video
              key={n}
              className="h-auto w-full self-start rounded-2xl bg-black/20 shadow-xl"
              src={`/videos/spirituality/video-${n}.mp4`}
              poster={`/videos/spirituality/video-${n}.jpg`}
              controls
              playsInline
              preload="none"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
