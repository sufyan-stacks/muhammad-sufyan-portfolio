import { Approach } from "@/components/approach";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { SiteFooter } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/nav";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { getDictionary } from "@/lib/dictionaries";
import { getContent } from "@/lib/content";

export default function Home() {
  const copy = getDictionary("en");
  const content = getContent("en");

  return (
    <div className="min-h-svh bg-bg text-fg">
      <SiteNav lang="en" copy={copy} />
      <main id="main">
        <Hero copy={copy} content={content} />
        <Work copy={copy} content={content} />
        <Approach copy={copy} content={content} />
        <Experience copy={copy} content={content} />
        <Services copy={copy} content={content} />
        <Contact copy={copy} />
      </main>
      <SiteFooter />
    </div>
  );
}
