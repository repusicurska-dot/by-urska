import type { Locale } from "@/i18n/locales";

/**
 * The shop's terms that came with Urška's "Art to do!" note (2026-10-05), in the five site
 * languages: the certificate that travels with every painting, the early-bird code, the
 * discount-code field, and buying from outside the EU by request.
 */
export interface ShopTerms {
  certificateIncluded: string;
  /** {percent}, {code} and {date} are filled in. */
  earlyBird: string;
  discountLabel: string;
  discountApply: string;
  discountInvalid: string;
  discountApplied: string;
  discountLine: string;
  outsideEu: string;
  outsideEuTitle: string;
  outsideEuText: string;
  sendRequest: string;
}

export const SHOP_TERMS: Record<Locale, ShopTerms> = {
  en: {
    certificateIncluded: "A signed certificate of authenticity comes with the painting.",
    earlyBird: "Early bird: {percent} % off every original with the code {code} — until {date}.",
    discountLabel: "Discount code",
    discountApply: "Apply",
    discountInvalid: "This code isn't valid.",
    discountApplied: "Code {code} applied — {percent} % off.",
    discountLine: "Discount ({code})",
    outsideEu: "Outside the EU: on request",
    outsideEuTitle: "Outside the European Union?",
    outsideEuText:
      "Paintings are bought directly within the EU. For anywhere else, send Urška a request — she will arrange shipping, customs and the price with you personally.",
    sendRequest: "Send a request",
  },
  sl: {
    certificateIncluded: "Sliki je priloženo podpisano potrdilo o pristnosti.",
    earlyBird: "Early bird: {percent} % popusta na vse originale s kodo {code} — do {date}.",
    discountLabel: "Koda za popust",
    discountApply: "Uporabi",
    discountInvalid: "Ta koda ni veljavna.",
    discountApplied: "Koda {code} je upoštevana — {percent} % popusta.",
    discountLine: "Popust ({code})",
    outsideEu: "Izven EU: na povpraševanje",
    outsideEuTitle: "Izven Evropske unije?",
    outsideEuText:
      "Slike se neposredno kupijo znotraj EU. Za vse druge države pošlji Urški povpraševanje — dostavo, carino in ceno se dogovori s tabo osebno.",
    sendRequest: "Pošlji povpraševanje",
  },
  hr: {
    certificateIncluded: "Uz sliku dolazi potpisana potvrda o autentičnosti.",
    earlyBird: "Early bird: {percent} % popusta na sve originale s kodom {code} — do {date}.",
    discountLabel: "Kod za popust",
    discountApply: "Primijeni",
    discountInvalid: "Ovaj kod nije valjan.",
    discountApplied: "Kod {code} je primijenjen — {percent} % popusta.",
    discountLine: "Popust ({code})",
    outsideEu: "Izvan EU: na upit",
    outsideEuTitle: "Izvan Europske unije?",
    outsideEuText:
      "Slike se izravno kupuju unutar EU. Za sve ostale zemlje pošalji Urški upit — dostavu, carinu i cijenu dogovorit će s tobom osobno.",
    sendRequest: "Pošalji upit",
  },
  de: {
    certificateIncluded: "Dem Gemälde liegt ein signiertes Echtheitszertifikat bei.",
    earlyBird: "Early Bird: {percent} % auf jedes Original mit dem Code {code} — bis {date}.",
    discountLabel: "Rabattcode",
    discountApply: "Einlösen",
    discountInvalid: "Dieser Code ist nicht gültig.",
    discountApplied: "Code {code} eingelöst — {percent} % Rabatt.",
    discountLine: "Rabatt ({code})",
    outsideEu: "Außerhalb der EU: auf Anfrage",
    outsideEuTitle: "Außerhalb der Europäischen Union?",
    outsideEuText:
      "Innerhalb der EU kaufst du die Bilder direkt. Für alle anderen Länder sende Urška eine Anfrage — Versand, Zoll und Preis bespricht sie persönlich mit dir.",
    sendRequest: "Anfrage senden",
  },
  it: {
    certificateIncluded: "Il dipinto è accompagnato da un certificato di autenticità firmato.",
    earlyBird: "Early bird: {percent} % di sconto su ogni originale con il codice {code} — fino al {date}.",
    discountLabel: "Codice sconto",
    discountApply: "Applica",
    discountInvalid: "Questo codice non è valido.",
    discountApplied: "Codice {code} applicato — {percent} % di sconto.",
    discountLine: "Sconto ({code})",
    outsideEu: "Fuori dall'UE: su richiesta",
    outsideEuTitle: "Fuori dall'Unione Europea?",
    outsideEuText:
      "All'interno dell'UE i dipinti si acquistano direttamente. Per tutti gli altri paesi invia una richiesta a Urška — spedizione, dogana e prezzo li concorderà con te personalmente.",
    sendRequest: "Invia una richiesta",
  },
};

const DATE_LOCALE: Record<Locale, string> = { en: "en-GB", sl: "sl-SI", hr: "hr-HR", de: "de-DE", it: "it-IT" };

/** A YYYY-MM-DD day written the way the language writes it ("31 December 2026"). */
export function formatDay(day: string, locale: Locale): string {
  return new Date(`${day}T12:00:00Z`).toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
