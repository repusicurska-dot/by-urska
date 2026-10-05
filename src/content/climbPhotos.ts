import type { Locale } from "@/i18n/locales";

/**
 * Urška's climbing photos for the Climb page (her "PLEZANJE" Dropbox folder, 2026-10-05),
 * in the order of her story: the first walls as a child, the competitions, the medals,
 * training, and climbing outside. Resized to at most 1600 px.
 */
export interface ClimbPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const photo = (n: number, width: number, height: number, alt: string): ClimbPhoto => ({
  src: `/images/climb/climb-${String(n).padStart(2, "0")}.jpg`,
  width,
  height,
  alt,
});

export const CLIMB_PHOTOS: ClimbPhoto[] = [
  photo(23, 633, 500, "Urška as a little girl, peeking over a red climbing wall on a playground"),
  photo(24, 927, 1464, "Urška as a child on an indoor climbing wall"),
  photo(1, 1065, 1600, "Urška in a World Cup bouldering final, stretched across a blue wall"),
  photo(3, 1600, 1280, "Urška reaching for a hold on a competition boulder"),
  photo(2, 891, 1277, "Urška balancing below an orange volume in competition"),
  photo(7, 1090, 1364, "Urška pulling through an overhang in competition"),
  photo(4, 1402, 1421, "Urška on a steep white-and-red competition boulder"),
  photo(5, 1122, 1113, "Urška stepping high on a blue and yellow wall"),
  photo(8, 1600, 1308, "Urška mid-move under the competition lights"),
  photo(6, 591, 660, "Urška hanging from big blue holds"),
  photo(9, 682, 747, "Urška high-stepping on a red and orange wall"),
  photo(10, 1600, 1280, "Urška on a yellow and blue competition boulder"),
  photo(11, 1051, 1034, "Urška smiling with a gold medal around her neck"),
  photo(14, 1600, 1112, "Urška on the podium at the European Championships"),
  photo(13, 1272, 1600, "Urška holding her medals"),
  photo(12, 1170, 1141, "Portrait of Urška chalking her hands"),
  photo(15, 1281, 1600, "Urška resting her cheek against the wall"),
  photo(25, 902, 1202, "Urška training with a weight plate"),
  photo(26, 1079, 1057, "Urška training with a resistance band"),
  photo(16, 1200, 1600, "Urška looking out over cliffs and the sea"),
  photo(17, 1290, 1600, "Urška hanging on a rope against the sun"),
  photo(18, 1600, 1067, "Urška resting on a mountain ridge above the clouds"),
  photo(19, 1200, 1600, "Urška sorting a pink rope in an autumn forest"),
  photo(20, 1200, 1600, "Urška in a helmet, rappelling on a sunny rock face"),
  photo(21, 1247, 1600, "Urška smiling in her climbing helmet on the crag"),
  photo(22, 900, 1600, "Urška climbing a boulder in the forest"),
];

export const CLIMB_GALLERY_TITLE: Record<Locale, { eyebrow: string; title: string }> = {
  en: { eyebrow: "From the wall", title: "Moments from the climb" },
  sl: { eyebrow: "S stene", title: "Trenutki s plezanja" },
  hr: { eyebrow: "Sa stijene", title: "Trenuci s penjanja" },
  de: { eyebrow: "Von der Wand", title: "Momente vom Klettern" },
  it: { eyebrow: "Dalla parete", title: "Momenti dall'arrampicata" },
};
