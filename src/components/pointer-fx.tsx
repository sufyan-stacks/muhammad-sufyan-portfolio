"use client";

import { useEffect } from "react";

// One listener for the page, writing CSS variables directly so moving the mouse never re-renders.
// Elements opt in with data-spotlight or data-magnetic.
export function PointerFx() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let latest: PointerEvent | null = null;
    let leaning: HTMLElement | null = null;

    const apply = () => {
      frame = 0;
      const event = latest;
      if (!event) return;
      const from = event.target instanceof Element ? event.target : null;

      const card = from?.closest<HTMLElement>("[data-spotlight]");
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - box.left}px`);
        card.style.setProperty("--my", `${event.clientY - box.top}px`);
      }

      const button = from?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (leaning && leaning !== button) {
        leaning.style.removeProperty("--mag-x");
        leaning.style.removeProperty("--mag-y");
      }
      leaning = button;
      if (button) {
        const box = button.getBoundingClientRect();
        // Capped at 8px of travel. Any further and the button starts dodging the cursor.
        const x = ((event.clientX - (box.left + box.width / 2)) / box.width) * 8;
        const y = ((event.clientY - (box.top + box.height / 2)) / box.height) * 8;
        button.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
        button.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
