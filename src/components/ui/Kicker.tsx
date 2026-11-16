import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small mono label introduced by a gold hairline — used to open sections. */
export function Kicker({
  children,
  className,
  tone = "dark",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  /** "dark" for use on light backgrounds, "light" on dark ones */
  tone?: "dark" | "light";
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        "kicker flex items-center gap-4",
        tone === "light" ? "text-petal" : "text-rose-deep",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold" />
      <span>{children}</span>
    </Tag>
  );
}
