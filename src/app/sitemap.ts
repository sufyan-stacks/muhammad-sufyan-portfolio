import type { MetadataRoute } from "next";
import { defaultLocale, getAlternateLanguageUrls, getLocaleUrl, locales } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: getLocaleUrl(siteUrl, lang),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === defaultLocale ? 1 : 0.8,
    alternates: {
      languages: {
        ...getAlternateLanguageUrls(siteUrl),
        "x-default": siteUrl,
      },
    },
  }));
}
