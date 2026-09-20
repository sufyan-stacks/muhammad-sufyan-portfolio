import Image from "next/image";
import { Eyebrow, Reveal } from "@/components/reveal";
import { work } from "@/lib/site";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { getContent, type LocalizedContent } from "@/lib/content";

export function Work({ copy = getDictionary("en"), content = getContent("en") }: { copy?: Dictionary; content?: LocalizedContent }) {
  return (
    <section id="work" className="section-y">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{copy.sections.workEyebrow}</Eyebrow>
          <h2 className="font-display text-section measure-heading">
            {copy.sections.workTitle}
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-16 md:mt-12 md:gap-20">
          {content.work.map((item, i) => (
            <article key={item.id} className="group grid min-w-0 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className={i % 2 === 1 ? "min-w-0 lg:order-2 lg:col-span-7" : "min-w-0 lg:col-span-7"}>
                <figure className="work-frame min-w-0 overflow-hidden rounded-2xl bg-surface/40 p-2">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    priority={i === 0}
                    quality={75}
                    sizes="(min-width: 1152px) 560px, (min-width: 768px) 62vw, 100vw"
                    className="block h-auto max-w-full rounded-xl object-contain"
                  />
                </figure>
              </Reveal>

              <Reveal delay={80} className={i % 2 === 1 ? "min-w-0 lg:order-1 lg:col-span-5" : "min-w-0 lg:col-span-5"}>
                <div className="rounded-2xl bg-surface/40 p-5 md:p-6">
                <h3 className="font-display text-3xl">{item.name}</h3>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-subtle">
                  <span>{item.role}</span>
                  <span>{item.client}</span>
                  <span>{item.period}</span>
                </p>
                <p className="mt-5 text-lg">{item.tagline}</p>
                <p className="mt-4 text-base leading-relaxed text-muted">{item.challenge}</p>
                <p className="mt-3 text-base leading-relaxed text-fg/90">{item.contribution}</p>
                <ul className="mt-5 space-y-2">
                  {item.outcomes.map((o) => (
                    <li key={o} className="flex gap-3 text-base text-muted">
                      <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <li key={t} className="rounded-full bg-bg/20 px-2.5 py-1 text-sm text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
