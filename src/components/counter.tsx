"use client";

import { useEffect, useRef, useState } from "react";

// Splits "<150 ms" into prefix, figure and suffix, so only the figure counts.
const shape = /^(\D*)([\d.]+)(.*)$/;

// Starts from the final value, so the server HTML is correct for crawlers and without JS.
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = shape.exec(value);
    if (!match) return;

    const [, prefix, figure, suffix] = match;
    const target = Number.parseFloat(figure);
    const decimals = figure.includes(".") ? figure.split(".")[1].length : 0;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        const started = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - started) / 2000);
          const eased = 1 - Math.pow(1 - progress, 4);
          setShown(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}
