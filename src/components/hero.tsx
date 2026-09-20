import { FaArrowDownLong, FaClock, FaLanguage, FaLaptop, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { Backdrop } from "@/components/backdrop";
import { Button } from "@/components/ui/button";
import { metrics, person, stack } from "@/lib/site";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { getContent, type LocalizedContent } from "@/lib/content";

export function Hero({ copy = getDictionary("en"), content = getContent("en") }: { copy?: Dictionary; content?: LocalizedContent }) {
  const details = [
    { label: copy.hero.basedIn, value: person.location, icon: FaLocationDot },
    { label: copy.hero.timezone, value: person.timezone, icon: FaClock },
    { label: copy.hero.work, value: copy.hero.remote, icon: FaLaptop },
    { label: copy.hero.languages, value: copy.hero.languagesValue, icon: FaLanguage },
  ];
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/cover.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={52}
          sizes="100vw"
          className="object-cover object-center opacity-32 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_4%,color-mix(in_srgb,var(--color-bg)_72%,transparent)_52%,color-mix(in_srgb,var(--color-bg)_30%,transparent)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-bg)_82%,transparent)_0%,transparent_42%,var(--color-bg)_100%)]" />
      </div>
      <Backdrop />
      <div className="container-page relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(15rem,0.6fr)] lg:items-start lg:gap-12">
          <div>
            <h1 className="font-display text-hero">
              <span className="hero-in block" style={{ animationDelay: "100ms" }}>
                {person.firstName}
              </span>
              <span className="hero-in mt-1 block text-muted italic" style={{ animationDelay: "180ms" }}>
                {person.lastName}
              </span>
            </h1>
            <p className="hero-in mt-6 text-lead text-muted" style={{ animationDelay: "260ms" }}>
              {content.person.title}
            </p>
            <p className="hero-in measure mt-4 text-lead text-fg" style={{ animationDelay: "340ms" }}>
              {content.person.headline}
            </p>
            <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "420ms" }}>
              <Button asChild size="lg">
                <a href="#work">
                  {copy.hero.seeWork}
                  <FaArrowDownLong className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">{copy.hero.getInTouch}</a>
              </Button>
            </div>
            <p className="hero-in mt-6 max-w-xl text-sm uppercase tracking-[0.12em] text-subtle" style={{ animationDelay: "500ms" }}>
              AI • SaaS • RAG • Automation • Next.js • Product delivery
            </p>
          </div>

          <aside
            className="hero-in group relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-4 shadow-[0_20px_80px_-40px_rgba(142,163,150,0.45)] backdrop-blur-sm lg:max-w-sm lg:justify-self-end"
            style={{ animationDelay: "480ms" }}
            aria-label={copy.hero.details}
          >
            <div className="flex items-center justify-center pt-2">
              <div className="relative size-40 overflow-hidden rounded-full bg-surface shadow-[0_24px_60px_-30px_rgba(142,163,150,0.65)] ring-1 ring-white/10 md:size-44">
                <Image
                  src="/me.png"
                  alt="Muhammad Sufyan portrait"
                  fill
                  priority
                  quality={75}
                  sizes="(min-width: 1024px) 15rem, 100vw"
                  className="object-cover object-[center_16%] transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {details.map((d) => (
                <div key={d.label} className="flex gap-3 rounded-xl border border-border/60 bg-bg/20 px-3 py-3 shadow-[0_12px_28px_-24px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-bg/30 hover:shadow-[0_16px_36px_-24px_rgba(142,163,150,0.45)]">
                  <d.icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.08em] text-subtle">{d.label}</span>
                    <span className="mt-1 block text-sm leading-snug text-fg">{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-12 md:mt-14">
          <ul
            className="hero-in grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-4"
            style={{ animationDelay: "560ms" }}
          >
            {content.metrics.map((m) => (
              <li key={m.label} className="bg-surface px-5 py-5 md:px-6 md:py-6">
                <p className="font-display text-2xl tabular-nums md:text-3xl">{m.value}</p>
                <p className="mt-1 text-sm text-muted">{m.label}</p>
              </li>
            ))}
          </ul>
          <ul className="hero-in mt-8 flex flex-wrap gap-2" style={{ animationDelay: "640ms" }}>
            {content.stack.map((item) => (
              <li key={item} className="rounded-full px-3 py-1.5 text-sm text-muted shadow-[var(--shadow-border)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
