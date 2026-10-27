import { Artwork } from "@/content/types";
import ArtIntroVideo from "./ArtIntroVideo";
import SilenceIntro from "./SilenceIntro";
import ArtworkReveal from "./ArtworkReveal";
import HorizontalGallery from "./HorizontalGallery";
import WorldsPortal from "./WorldsPortal";
import PoetryExperience from "./PoetryExperience";
import ArtistMoment from "./ArtistMoment";
import FinalInvitation from "./FinalInvitation";
import ScrollProgress from "./ScrollProgress";

export default function HomeJourney({ artworks }: { artworks: Artwork[] }) {
  const withImages = artworks.filter((a) => a.heroImage);
  // the opening painting is the first in the shown order; the dragon (The Prophecy) sits
  // second-to-last in the gallery (Urška, 2026-10-27)
  const signature = withImages[0] ?? artworks[0];
  const poetryPiece =
    withImages.find((a) => a.slug === "artwork-05") ??
    withImages.find((a) => a.slug !== signature.slug) ??
    signature;

  return (
    <>
      <div id="arrival" />
      <ArtIntroVideo />
      <SilenceIntro />

      <div id="painting" />
      <ArtworkReveal artwork={signature} />

      <div id="collection" />
      {/* the signature painting is already shown above, so the gallery leaves it out */}
      <HorizontalGallery artworks={withImages.filter((a) => a.slug !== signature.slug)} />

      <div id="poetry" />
      <WorldsPortal />
      <PoetryExperience artwork={poetryPiece} />

      <div id="artist" />
      <FinalInvitation />
      <ArtistMoment />

      <ScrollProgress />
    </>
  );
}
