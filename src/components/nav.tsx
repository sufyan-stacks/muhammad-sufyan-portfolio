"use client";

import { useEffect, useRef, useState } from "react";
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
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  // Re-measured on resize, because the links reflow and old offsets would strand the pill.
  useEffect(() => {
    const measure = () => {
      const link = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
      setPill(link ? { left: link.offsetLeft, width: link.offsetWidth } : null);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Hide the bar while scrolling down, show it again on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > last && y > 80);
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
        aria-hidden="true"
        className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-accent"
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

          <nav
            ref={navRef}
            className="relative hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -z-10 h-8 -translate-y-1/2 rounded-lg bg-surface transition-[transform,width,opacity] duration-300 ease-out"
              style={
                pill
                  ? { width: pill.width, transform: `translate(${pill.left}px, -50%)`, opacity: 1 }
                  : { opacity: 0 }
              }
            />
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                onClick={() => setActive(item.href)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-2 text-sm transition-colors duration-150",
                  active === item.href ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {copy.nav[index]}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <label className="relative hidden items-center lg:flex" aria-label="Language">
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
            <div className="flex lg:hidden" />
            <Button asChild size="sm" variant="outline" className="hidden lg:inline-flex">
              <a href="#contact" data-magnetic>
                {copy.hero.getInTouch}
              </a>
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl hover:bg-surface lg:hidden"
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
        <div id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-bg lg:hidden">
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
