"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES, LOCALE_LABEL } from "@/i18n/locales";

/** Language chooser: full names in the footer, short codes in the header. */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  if (compact) {
    return (
      <label className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-bone">
        <span className="sr-only">{t.footer.language}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as (typeof LOCALES)[number])}
          className="cursor-pointer bg-transparent font-medium uppercase tracking-widest text-bone [color-scheme:light] focus:outline-none"
        >
          {LOCALES.map((l) => (
            // ink is the page ground (cream), which made the names invisible in the white list.
            <option key={l} value={l} className="bg-paper text-bone">
              {LOCALE_LABEL[l]}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <ul className="space-y-2 text-sm text-smoke">
      {LOCALES.map((l) => (
        <li key={l}>
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-current={locale === l ? "true" : undefined}
            className={`transition-colors hover:text-bone ${locale === l ? "text-bone underline" : ""}`}
          >
            {LOCALE_LABEL[l]}
          </button>
        </li>
      ))}
    </ul>
  );
}
