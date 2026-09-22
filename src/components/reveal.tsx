"use client";

import { useEffect, useRef, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Fades content in as it scrolls into view. Content is visible until this mounts, so nothing
// is ever stuck hidden if scripting fails. Only elements below the fold get the hidden state.
export function Reveal({
  children,
  className,
  delay = 0,
  ...rest
}: ComponentProps<"div"> & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // globals.css animates this with a scroll timeline where supported.
    if (CSS.supports("animation-timeline: view()")) return;

    if (window.matchMedia("(max-width: 767px)").matches) {
      setShown(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already on screen, leave it alone

    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // animation-delay does nothing on a scroll timeline, so the CSS path shifts the range instead.
  const style = delay
    ? ({
        transitionDelay: `${delay}ms`,
        "--reveal-stagger": `${Math.min(delay / 10, 18)}%`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      {...rest}
      data-armed={armed}
      className={cn("reveal", shown && "is-in", className)}
      style={style}
    >
      {children}
    </div>
  );
}

// Small label above a section heading.
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-sm font-medium text-accent">{children}</p>;
}
