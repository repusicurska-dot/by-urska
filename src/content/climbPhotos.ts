/**
 * Urška's climbing photos for the Climb page (her "PLEZANJE" Dropbox folder, 2026-10-05),
 * placed beside the chapter of her story they belong to — the child on the playground wall
 * next to "It started at seven", the podiums next to "The world stage", the crags next to
 * "With nature". Resized to at most 1600 px.
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

/** One list per chapter of CLIMB_STORY, in chapter order (every language has the same twelve). */
export const CHAPTER_PHOTOS: ClimbPhoto[][] = [
  // It started at seven
  [
    photo(23, 633, 500, "Urška as a little girl, peeking over a red climbing wall on a playground"),
    photo(24, 927, 1464, "Urška as a child on an indoor climbing wall"),
  ],
  // A natural feeling
  [
    photo(5, 1122, 1113, "Urška stepping high on a blue and yellow wall"),
    photo(6, 591, 660, "Urška hanging from big blue holds"),
  ],
  // The first competitions
  [
    photo(2, 891, 1277, "Urška balancing below an orange volume in competition"),
    photo(4, 1402, 1421, "Urška on a steep white-and-red competition boulder"),
  ],
  // All in
  [
    photo(25, 902, 1202, "Urška training with a weight plate"),
    photo(26, 1079, 1057, "Urška training with a resistance band"),
  ],
  // The national team
  [
    photo(1, 1065, 1600, "Urška in a World Cup bouldering final, stretched across a blue wall"),
    photo(3, 1600, 1280, "Urška reaching for a hold on a competition boulder"),
  ],
  // The world stage
  [
    photo(14, 1600, 1112, "Urška on the podium at the European Championships"),
    photo(11, 1051, 1034, "Urška smiling with a gold medal around her neck"),
    photo(8, 1600, 1308, "Urška mid-move under the competition lights"),
  ],
  // More than competition
  [
    photo(7, 1090, 1364, "Urška pulling through an overhang in competition"),
    photo(12, 1170, 1141, "Portrait of Urška chalking her hands"),
  ],
  // My inner world
  [
    photo(15, 1281, 1600, "Urška resting her cheek against the wall"),
    photo(10, 1600, 1280, "Urška on a yellow and blue competition boulder"),
    photo(9, 682, 747, "Urška high-stepping on a red and orange wall"),
  ],
  // With nature
  [
    photo(16, 1200, 1600, "Urška looking out over cliffs and the sea"),
    photo(18, 1600, 1067, "Urška resting on a mountain ridge above the clouds"),
    photo(22, 900, 1600, "Urška climbing a boulder in the forest"),
  ],
  // The people
  [
    photo(27, 1032, 881, "Urška and a friend jumping for joy at a climbing event"),
    photo(28, 1051, 819, "Urška with her coach and a teammate, holding their medals"),
    photo(29, 1007, 651, "A row of young climbers watching the wall"),
  ],
  // Why I climb
  [
    photo(17, 1290, 1600, "Urška hanging on a rope against the sun"),
    photo(20, 1200, 1600, "Urška in a helmet, rappelling on a sunny rock face"),
  ],
  // Still climbing
  [
    photo(21, 1247, 1600, "Urška smiling in her climbing helmet on the crag"),
    photo(19, 1200, 1600, "Urška sorting a pink rope in an autumn forest"),
    photo(13, 1272, 1600, "Urška holding her medals"),
  ],
];
