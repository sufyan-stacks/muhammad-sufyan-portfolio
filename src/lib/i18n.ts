export const locales = ["en", "fr", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ru: "Русский",
};

export const localeOpenGraph = {
  en: "en_GB",
  fr: "fr_FR",
  ru: "ru_RU",
} as const satisfies Record<Locale, string>;

export function getLocaleUrl(siteUrl: string, locale: Locale = defaultLocale) {
  return locale === defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
}

export function getAlternateLanguageUrls(siteUrl: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, getLocaleUrl(siteUrl, locale)]),
  ) as Record<Locale, string>;
}

export const localeMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Muhammad Sufyan, Full-Stack AI SaaS Engineer for AI Automation",
    description:
      "Muhammad Sufyan builds AI assistants, RAG and LLM integrations, workflow automation, and reliable SaaS products for startups and product teams.",
  },
  fr: {
    title: "Muhammad Sufyan, ingénieur Full-Stack AI SaaS et automatisation IA",
    description:
      "Muhammad Sufyan crée des assistants IA, des intégrations RAG et LLM, des automatisations métier et des produits SaaS fiables.",
  },
  ru: {
    title: "Мухаммад Суфьян, Full-Stack AI SaaS инженер по AI-автоматизации",
    description:
      "Мухаммад Суфьян создаёт AI-ассистентов, RAG и LLM-интеграции, автоматизацию рабочих процессов и надёжные SaaS-продукты.",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPath(pathname: string) {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}
