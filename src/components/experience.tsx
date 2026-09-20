import { Eyebrow, Reveal } from "@/components/reveal";
import { education, experience } from "@/lib/site";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { getContent, type LocalizedContent } from "@/lib/content";

export function Experience({ copy = getDictionary("en"), content = getContent("en") }: { copy?: Dictionary; content?: LocalizedContent }) {
  return (
    <section id="experience" className="section-y">
      <div className="container-page">
        <Reveal>
          <Eyebrow>{copy.sections.experienceEyebrow}</Eyebrow>
          <h2 className="font-display text-section measure-heading">{copy.sections.experienceTitle}</h2>
        </Reveal>

        <ol className="mt-10 divide-y divide-border">
          {content.experience.map((job, i) => (
            <li key={job.org} className="py-8 first:pt-0">
              <Reveal delay={i * 40}>
                <div className="grid gap-4 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
                  <p className="text-sm tabular-nums text-subtle md:pt-1.5">{job.dates}</p>
                  <div>
                    <h3 className="text-xl font-medium">{job.role}</h3>
                    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                      <span>{job.org}</span>
                      <span>{job.place}</span>
                    </p>
                    <ul className="measure mt-4 space-y-2">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-base leading-relaxed text-muted">
                          <span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-6 grid gap-6 border-t border-border pt-10 md:grid-cols-3">
          {content.education.map((ed) => (
            <div key={ed.name}>
              <p className="text-sm text-subtle">{ed.dates}</p>
              <p className="mt-2 text-base font-medium">{ed.name}</p>
              <p className="mt-1 text-sm text-muted">{ed.org}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
