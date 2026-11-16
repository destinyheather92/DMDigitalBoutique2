import { cn } from "@/lib/cn";

/**
 * A simple, honest diagram of an automated workflow: labeled steps joined by
 * a gold line. "responsive" runs horizontally from md up; "vertical" never does.
 */
export function WorkflowLine({
  steps,
  tone = "dark",
  orientation = "responsive",
  className,
}: {
  steps: Array<{ label: string; detail?: string }>;
  tone?: "dark" | "light";
  orientation?: "responsive" | "vertical";
  className?: string;
}) {
  const light = tone === "light";
  const h = orientation === "responsive";
  return (
    <ol className={cn("relative grid gap-6", h && "md:auto-cols-fr md:grid-flow-col md:gap-4", className)}>
      {steps.map((step, i) => (
        <li
          key={step.label}
          className={cn("relative pl-8", h && "md:pl-0 md:pt-8")}
          data-reveal
          style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
        >
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[5px] top-3 h-[calc(100%+1.5rem)] w-px",
                h && "md:left-3 md:top-[5px] md:h-px md:w-[calc(100%+1rem)]",
                light ? "bg-gold/60" : "bg-gold/80",
              )}
            />
          )}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border",
              h && "md:top-0",
              light ? "border-gold bg-ink" : "border-gold-deep bg-ivory",
            )}
          />
          <span className={cn("kicker block", light ? "text-gold" : "text-gold-deep")}>{String(i + 1).padStart(2, "0")}</span>
          <span className={cn("mt-1.5 block text-[0.95rem] font-medium leading-snug", light ? "text-ivory" : "text-ink")}>
            {step.label}
          </span>
          {step.detail && (
            <span className={cn("mt-1 block text-sm leading-snug", light ? "text-ivory/60" : "text-ink/65")}>{step.detail}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
