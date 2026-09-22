import { notFound } from "next/navigation";
import { Approach } from "@/components/approach";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { SiteFooter } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/nav";
import { PointerFx } from "@/components/pointer-fx";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <LocalizedHome lang={lang} />;
}

function LocalizedHome({ lang }: { lang: Locale }) {
  const copy = getDictionary(lang);
  const content = getContent(lang);

  return (
    <div lang={lang} dir="ltr" className="min-h-svh bg-bg text-fg">
      <SiteNav lang={lang} copy={copy} />
      <main id="main">
        <Hero copy={copy} content={content} />
        <Work copy={copy} content={content} />
        <Approach copy={copy} content={content} />
        <Experience copy={copy} content={content} />
        <Services copy={copy} content={content} />
        <Contact copy={copy} />
      </main>
      <SiteFooter />
      <PointerFx />
    </div>
  );
}
