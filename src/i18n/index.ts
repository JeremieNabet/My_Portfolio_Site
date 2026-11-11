import { en } from "./en";
import { fr, type Dictionary } from "./fr";
import { he } from "./he";

export const locales = ["fr", "us", "he"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.jeremie-nabet.com").replace(/\/$/, "");

const dictionaries: Record<Locale, Dictionary> = { fr, us: en, he };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const localeLabels: Record<Locale, string> = { fr: "fr", us: "en", he: "he" };

/** Absolute URL of a page for a locale. `path` is "" | "/about" | "/bmky-app". */
export function pageUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}/${locale}${path}`;
}

/** hreflang alternates for a given page path. */
export function alternates(locale: Locale, path = "") {
  return {
    canonical: pageUrl(locale, path),
    languages: {
      fr: pageUrl("fr", path),
      en: pageUrl("us", path),
      he: pageUrl("he", path),
      "x-default": pageUrl("fr", path),
    },
  };
}
