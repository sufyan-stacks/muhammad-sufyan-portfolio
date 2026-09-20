import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full resize-y rounded-xl bg-surface px-3.5 py-3 text-base text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle",
        "transition-[box-shadow,background-color] duration-150 ease-out",
        "hover:shadow-[var(--shadow-border-hover)]",
        "focus-visible:shadow-[0_0_0_1px_var(--color-accent)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
