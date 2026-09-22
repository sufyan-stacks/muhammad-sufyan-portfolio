import { Backdrop } from "@/components/backdrop";
import { Eyebrow, Reveal } from "@/components/reveal";
import { principles, skillGroups } from "@/lib/site";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { getContent, type LocalizedContent } from "@/lib/content";

export function Approach({ copy = getDictionary("en"), content = getContent("en") }: { copy?: Dictionary; content?: LocalizedContent }) {
  return (
    <section id="approach" className="relative isolate section-y">
      <Backdrop variant="soft" />
      <div className="container-page">
        <Reveal>
          <Eyebrow>{copy.sections.approachEyebrow}</Eyebrow>
          <h2 className="font-display text-section measure-heading">{copy.sections.approachTitle}</h2>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
          {content.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="bg-surface p-6 md:p-8" data-spotlight>
              <h3 className="text-lg font-medium">{p.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <h3 className="text-sm font-medium text-subtle">{copy.sections.skills}</h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.skillGroups.map((g) => (
              <div key={g.name}>
                <p className="text-base font-medium">{g.name}</p>
                <p className="mt-2 text-base leading-relaxed text-muted">{g.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
