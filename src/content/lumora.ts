import type { Locale } from "@/i18n/locales";

/**
 * Lumora Manifest, Urška's iPhone app, as presented on the site (/lumora and the teasers on the
 * home and Spirituality pages).
 *
 * Until Apple approves it, LIVE is false and every button says it is coming soon. Once it is on
 * the App Store, set LIVE to true and the same buttons link to it.
 */
export const LUMORA = {
  LIVE: false,
  APP_STORE_URL: "https://apps.apple.com/app/id6818963913",
  price: "1,99 €",
};

/** The app speaks Slovenian and English, so its screenshots exist in those two. */
export const lumoraShotLang = (locale: Locale) => (locale === "sl" ? "sl" : "en");

export interface LumoraCopy {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  cta: string;
  soon: string;
  features: { key: "today" | "journal" | "wishes" | "moon"; title: string; text: string }[];
  priceTitle: string;
  price: string;
  priceNote: string;
  quote: string;
  teaserEyebrow: string;
  teaserTitle: string;
  teaserText: string;
  teaserCta: string;
  support: string;
  privacy: string;
  footerLink: string;
}

export const LUMORA_COPY: Record<Locale, LumoraCopy> = {
  en: {
    eyebrow: "New · iPhone app",
    title: "Lumora Manifest",
    tagline: "Three minutes a day to call in the life you want.",
    intro:
      "A gentle daily ritual made by Urška: a card every morning, one question every evening, and over time a journal full of proof that things are changing.",
    cta: "Download on the App Store",
    soon: "Coming soon to the App Store",
    features: [
      { key: "today", title: "A new card every morning", text: "An affirmation, why it works, and one small step for today. Never the same card twice." },
      { key: "journal", title: "Your journal of evidence", text: "Every evening, the sign you noticed and what you're grateful for. Read it back when you doubt." },
      { key: "wishes", title: "Your wishes", text: "Up to three wishes, written as if they're already true — and a celebration when they come true." },
      { key: "moon", title: "Moon rituals", text: "Tonight's moon as it really looks, and a short ritual for every phase." },
    ],
    priceTitle: "Lumora Premium",
    price: "7 days free, then 1,99 € a month",
    priceNote: "Cancel any time in your Apple ID settings. Your journal stays only on your phone.",
    quote: "Manifesting isn't only wishing. It's noticing, every day, that life is already answering.",
    teaserEyebrow: "New · Lumora Manifest",
    teaserTitle: "My manifesting ritual, now on your iPhone",
    teaserText: "A card every morning, a question every evening, your wishes and the moon — three quiet minutes a day.",
    teaserCta: "Discover Lumora",
    support: "Support",
    privacy: "Privacy",
    footerLink: "Lumora Manifest app",
  },
  sl: {
    eyebrow: "Novo · aplikacija za iPhone",
    title: "Lumora Manifest",
    tagline: "Tri minute na dan, da prikličeš življenje, ki ga želiš.",
    intro:
      "Nežen vsakdanji ritual, ki ga je ustvarila Urška: vsako jutro kartica, vsak večer eno vprašanje, sčasoma pa dnevnik, poln dokazov, da se stvari spreminjajo.",
    cta: "Prenesi v App Storu",
    soon: "Kmalu v App Storu",
    features: [
      { key: "today", title: "Vsako jutro nova kartica", text: "Afirmacija, zakaj deluje, in en majhen korak za danes. Nikoli dvakrat ista." },
      { key: "journal", title: "Tvoj dnevnik dokazov", text: "Vsak večer znak, ki si ga opazila, in kaj te je razveselilo. Preberi, ko dvomiš." },
      { key: "wishes", title: "Tvoje želje", text: "Do tri želje, zapisane, kot da so že resnične — in praznovanje, ko se uresničijo." },
      { key: "moon", title: "Lunini rituali", text: "Nocojšnja luna, kakršna res je, in kratek ritual za vsako fazo." },
    ],
    priceTitle: "Lumora Premium",
    price: "7 dni zastonj, nato 1,99 € na mesec",
    priceNote: "Prekličeš kadarkoli v nastavitvah Apple ID-ja. Tvoj dnevnik ostane samo na tvojem telefonu.",
    quote: "Manifestiranje ni samo želja. Je vsakodnevno opažanje, da ti življenje že odgovarja.",
    teaserEyebrow: "Novo · Lumora Manifest",
    teaserTitle: "Moj ritual manifestiranja, zdaj na tvojem iPhonu",
    teaserText: "Vsako jutro kartica, vsak večer vprašanje, tvoje želje in luna — tri tihe minute na dan.",
    teaserCta: "Spoznaj Lumoro",
    support: "Podpora",
    privacy: "Zasebnost",
    footerLink: "Aplikacija Lumora Manifest",
  },
  hr: {
    eyebrow: "Novo · aplikacija za iPhone",
    title: "Lumora Manifest",
    tagline: "Tri minute dnevno da prizoveš život koji želiš.",
    intro:
      "Nježan svakodnevni ritual koji je stvorila Urška: svako jutro kartica, svaku večer jedno pitanje, a s vremenom dnevnik pun dokaza da se stvari mijenjaju.",
    cta: "Preuzmi na App Storeu",
    soon: "Uskoro na App Storeu",
    features: [
      { key: "today", title: "Svako jutro nova kartica", text: "Afirmacija, zašto djeluje i jedan mali korak za danas. Nikad dvaput ista." },
      { key: "journal", title: "Tvoj dnevnik dokaza", text: "Svake večeri znak koji si primijetila i na čemu si zahvalna." },
      { key: "wishes", title: "Tvoje želje", text: "Do tri želje, zapisane kao da su već istinite — i slavlje kad se ostvare." },
      { key: "moon", title: "Mjesečevi rituali", text: "Večerašnji mjesec kakav zaista jest i kratak ritual za svaku fazu." },
    ],
    priceTitle: "Lumora Premium",
    price: "7 dana besplatno, zatim 1,99 € mjesečno",
    priceNote: "Otkaži bilo kada u postavkama Apple ID-a. Tvoj dnevnik ostaje samo na tvom telefonu.",
    quote: "Manifestiranje nije samo želja. To je svakodnevno primjećivanje da ti život već odgovara.",
    teaserEyebrow: "Novo · Lumora Manifest",
    teaserTitle: "Moj ritual manifestiranja, sada na tvom iPhoneu",
    teaserText: "Svako jutro kartica, svaku večer pitanje, tvoje želje i mjesec — tri tihe minute dnevno.",
    teaserCta: "Upoznaj Lumoru",
    support: "Podrška",
    privacy: "Privatnost",
    footerLink: "Aplikacija Lumora Manifest",
  },
  de: {
    eyebrow: "Neu · iPhone-App",
    title: "Lumora Manifest",
    tagline: "Drei Minuten am Tag, um das Leben zu rufen, das du dir wünschst.",
    intro:
      "Ein sanftes tägliches Ritual von Urška: jeden Morgen eine Karte, jeden Abend eine Frage – und mit der Zeit ein Tagebuch voller Beweise, dass sich etwas verändert.",
    cta: "Im App Store laden",
    soon: "Bald im App Store",
    features: [
      { key: "today", title: "Jeden Morgen eine neue Karte", text: "Eine Affirmation, warum sie wirkt, und ein kleiner Schritt für heute. Nie zweimal dieselbe." },
      { key: "journal", title: "Dein Tagebuch der Beweise", text: "Jeden Abend das Zeichen, das du bemerkt hast, und wofür du dankbar bist." },
      { key: "wishes", title: "Deine Wünsche", text: "Bis zu drei Wünsche, geschrieben, als wären sie schon wahr – und ein Fest, wenn sie es werden." },
      { key: "moon", title: "Mondrituale", text: "Der Mond, wie er heute Nacht wirklich aussieht, und ein kurzes Ritual für jede Phase." },
    ],
    priceTitle: "Lumora Premium",
    price: "7 Tage kostenlos, dann 1,99 € im Monat",
    priceNote: "Jederzeit in den Apple-ID-Einstellungen kündbar. Dein Tagebuch bleibt nur auf deinem Telefon.",
    quote: "Manifestieren ist nicht nur Wünschen. Es ist das tägliche Bemerken, dass das Leben schon antwortet.",
    teaserEyebrow: "Neu · Lumora Manifest",
    teaserTitle: "Mein Manifestations-Ritual, jetzt auf deinem iPhone",
    teaserText: "Jeden Morgen eine Karte, jeden Abend eine Frage, deine Wünsche und der Mond – drei stille Minuten am Tag.",
    teaserCta: "Lumora entdecken",
    support: "Support",
    privacy: "Datenschutz",
    footerLink: "Lumora Manifest App",
  },
  it: {
    eyebrow: "Novità · app per iPhone",
    title: "Lumora Manifest",
    tagline: "Tre minuti al giorno per richiamare la vita che desideri.",
    intro:
      "Un rituale quotidiano delicato creato da Urška: una carta ogni mattina, una domanda ogni sera e, col tempo, un diario pieno di prove che le cose stanno cambiando.",
    cta: "Scarica dall'App Store",
    soon: "Presto sull'App Store",
    features: [
      { key: "today", title: "Una nuova carta ogni mattina", text: "Un'affermazione, perché funziona e un piccolo passo per oggi. Mai due volte la stessa." },
      { key: "journal", title: "Il tuo diario delle prove", text: "Ogni sera il segno che hai notato e ciò per cui sei grata." },
      { key: "wishes", title: "I tuoi desideri", text: "Fino a tre desideri, scritti come se fossero già veri – e una festa quando si avverano." },
      { key: "moon", title: "Rituali della luna", text: "La luna di stasera com'è davvero e un breve rituale per ogni fase." },
    ],
    priceTitle: "Lumora Premium",
    price: "7 giorni gratis, poi 1,99 € al mese",
    priceNote: "Disdici quando vuoi nelle impostazioni dell'ID Apple. Il tuo diario resta solo sul tuo telefono.",
    quote: "Manifestare non è solo desiderare. È accorgersi, ogni giorno, che la vita sta già rispondendo.",
    teaserEyebrow: "Novità · Lumora Manifest",
    teaserTitle: "Il mio rituale di manifestazione, ora sul tuo iPhone",
    teaserText: "Una carta ogni mattina, una domanda ogni sera, i tuoi desideri e la luna – tre minuti di quiete al giorno.",
    teaserCta: "Scopri Lumora",
    support: "Assistenza",
    privacy: "Privacy",
    footerLink: "App Lumora Manifest",
  },
};
