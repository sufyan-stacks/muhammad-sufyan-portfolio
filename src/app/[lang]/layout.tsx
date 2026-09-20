import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, getAlternateLanguageUrls, isLocale, localeMetadata, localeOpenGraph, locales } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = localeMetadata[lang];
  const canonical = lang === defaultLocale ? "/" : `/${lang}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        ...getAlternateLanguageUrls(siteUrl),
        "x-default": siteUrl,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: lang === defaultLocale ? siteUrl : `${siteUrl}/${lang}`,
      locale: localeOpenGraph[lang],
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => localeOpenGraph[locale]),
      type: "profile",
      images: [
        {
          url: "/cover.png",
          width: 1536,
          height: 1024,
          alt: "Muhammad Sufyan working on a software project",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/cover.png"],
    },
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
