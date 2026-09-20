import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/reveal";
import { services } from "@/lib/site";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { getContent, type LocalizedContent } from "@/lib/content";

export function Services({ copy = getDictionary("en"), content = getContent("en") }: { copy?: Dictionary; content?: LocalizedContent }) {
  return (
    <section id="services" className="section-y">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{copy.sections.servicesEyebrow}</Eyebrow>
          <h2 className="font-display text-section measure-heading">{copy.sections.servicesTitle}</h2>
          <p className="measure-sm mt-4 text-base leading-relaxed text-muted">
            {copy.sections.servicesIntro}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {content.services.map((s, i) => (
            <Reveal key={s.name} delay={i * 70} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 md:p-7">
                <h3 className="text-xl font-medium">{s.name}</h3>
                <p className="mt-2 text-base text-muted">{s.audience}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {s.includes.map((line) => (
                    <li key={line} className="flex gap-3 text-base leading-relaxed">
                      <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span className="text-muted">{line}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-8 w-full">
                  <a href="#contact">{s.cta}</a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
