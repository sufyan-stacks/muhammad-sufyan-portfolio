import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Figtree, Fraunces } from "next/font/google";
import Script from "next/script";
import { personJsonLd, person } from "@/lib/site";
import { defaultLocale, getAlternateLanguageUrls, localeOpenGraph, locales } from "@/lib/i18n";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-loaded",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in production so link previews (LinkedIn, WhatsApp, Slack) use the right address.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `${person.name}, ${person.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: person.description,
  verification: {
    google: "WW9tbQ5FcysDVX52O6rqL4l5epTuxE1EOPM43_Yukqs",
  },
  alternates: {
    canonical: "/",
    languages: {
      ...getAlternateLanguageUrls(siteUrl),
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title,
    description: person.description,
    type: "profile",
    siteName: person.name,
    locale: localeOpenGraph[defaultLocale],
    alternateLocale: locales.filter((locale) => locale !== defaultLocale).map((locale) => localeOpenGraph[locale]),
    images: [
      {
        url: "/cover-og.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Sufyan working on a software project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: person.description,
    images: ["/cover-og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the page use the full screen on phones with a notch. The layout keeps content clear of it.
  viewportFit: "cover",
  themeColor: "#100f0c",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-locale") ?? "en";

  return (
    <html lang={lang} className={`${figtree.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...personJsonLd,
              url: siteUrl,
              image: `${siteUrl}/me.png`,
            }),
          }}
        />
        {children}
        {/* Starts the repaint-heavy background loops only once the page has loaded (see globals.css). */}
        <Script id="motion-ready" strategy="lazyOnload">
          {`document.documentElement.dataset.motion = "on";`}
        </Script>
      </body>
    </html>
  );
}
