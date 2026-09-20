import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-xl bg-surface px-3.5 text-base text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle",
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

export { Input };
