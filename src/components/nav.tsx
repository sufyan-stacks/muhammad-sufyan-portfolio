"use client";

import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaXmark } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { nav } from "@/lib/site";

export function SiteNav({ lang = "en", copy = getDictionary("en") }: { lang?: Locale; copy?: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hide the bar while scrolling down, show it again on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > last && y > 80);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (y / maxScroll) * 100)) : 0);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the section that is currently in view.
  useEffect(() => {
    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "";

      nav.forEach((item) => {
        const section = document.getElementById(item.href.slice(1));
        if (section && section.offsetTop <= marker) current = item.href;
      });

      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Lock page scroll while the mobile menu is open, and close it with Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <span
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out",
          hidden && !open ? "-translate-y-full" : "",
          scrolled || open ? "border-border/70 bg-bg/95 shadow-[var(--shadow-border)]" : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <div className="container-page flex h-14 min-w-0 items-center justify-between gap-3">
          <a
            href="#top"
            aria-label="Muhammad Sufyan, home"
            className="flex min-w-0 shrink-0 items-center py-1"
            onClick={() => setOpen(false)}
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-medium leading-none text-fg">Muhammad Sufyan</div>
            </div>
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Primary">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                onClick={() => setActive(item.href)}
                className={cn(
                  "relative rounded-lg px-2.5 py-2 text-sm transition-[color,background-color] duration-150 after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform",
                  active === item.href ? "text-fg" : "text-muted hover:text-fg",
                  active === item.href ? "after:scale-x-100" : "",
                )}
              >
                {copy.nav[index]}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <label className="relative hidden items-center xl:flex" aria-label="Language">
              <select
                value={lang}
                onChange={(event) => {
                  const locale = event.target.value as Locale;
                  window.location.assign(locale === "en" ? "/" : `/${locale}`);
                }}
                className="h-9 appearance-none rounded-lg bg-transparent py-1 pl-2 pr-7 text-sm text-muted outline-none transition-colors hover:text-fg focus-visible:text-fg"
              >
                {locales.map((locale) => (
                  <option key={locale} value={locale} className="bg-surface text-fg">
                    {localeLabels[locale]}
                  </option>
                ))}
              </select>
              <FaChevronDown className="pointer-events-none absolute right-1.5 size-3.5 text-subtle" aria-hidden="true" />
            </label>
            <div className="flex xl:hidden" />
            <span className="mr-1 hidden items-center gap-2 text-sm text-accent 2xl:inline-flex">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {copy.hero.availability}
            </span>
            <Button asChild size="sm" className="hidden xl:inline-flex">
              <a href="#contact">{copy.hero.getInTouch}</a>
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl hover:bg-surface xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative size-5">
                <FaBars
                  className={cn(
                    "absolute inset-0 size-5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                    open ? "scale-[0.25] opacity-0" : "scale-100 opacity-100",
                  )}
                />
                <FaXmark
                  className={cn(
                    "absolute inset-0 size-5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                    open ? "scale-100 opacity-100" : "scale-[0.25] opacity-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-bg xl:hidden">
          <nav className="container-page flex flex-col py-8" aria-label="Mobile">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActive(item.href);
                  setOpen(false);
                }}
                className="flex min-h-14 items-center border-b border-border text-2xl font-medium"
              >
                {copy.nav[index]}
              </a>
            ))}
            <label className="mt-8 flex items-center justify-between border-b border-border py-4 text-sm text-muted">
              <span>{copy.footer.language}</span>
              <span className="relative">
                <select
                  value={lang}
                  onChange={(event) => {
                    const locale = event.target.value as Locale;
                    window.location.assign(locale === "en" ? "/" : `/${locale}`);
                  }}
                  className="appearance-none rounded-lg bg-surface py-2 pl-3 pr-8 text-fg outline-none"
                  aria-label={copy.footer.language}
                >
                  {locales.map((locale) => (
                    <option key={locale} value={locale} className="bg-surface text-fg">
                      {localeLabels[locale]}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-subtle" aria-hidden="true" />
              </span>
            </label>
            <Button asChild size="lg" className="mt-6 w-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                {copy.hero.getInTouch}
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </>
  );
}
