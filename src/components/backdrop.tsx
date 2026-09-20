// Decorative background. Pure CSS, no JavaScript. Remove <Backdrop /> from a section to turn it off.
// "hero" has the glow, the faded grid and grain. "soft" is a single quiet glow for lower sections.
export function Backdrop({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  return (
    <div aria-hidden="true" className={variant === "soft" ? "backdrop backdrop-soft" : "backdrop"}>
      <span className="backdrop-glow backdrop-glow-a" />
      <span className="backdrop-glow backdrop-glow-b" />
      <span className="backdrop-grid" />
      <span className="backdrop-grain" />
    </div>
  );
}
