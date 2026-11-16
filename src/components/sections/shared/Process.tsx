import { Kicker } from "@/components/ui/Kicker";
import { processSteps } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * The four-step process as an editorial timeline: a gold rule runs across,
 * and each step settles a little lower than the last.
 */
export function Process({ className, title = "How we’ll work together" }: { className?: string; title?: string }) {
  return (
    <section aria-labelledby="process-title" className={cn("section-y cv-auto relative overflow-hidden bg-ivory", className)}>
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-6">
            <Kicker>My process</Kicker>
            <h2 id="process-title" className="text-display-lg mt-7 text-ink">
              {title}
            </h2>
          </div>
          <p className="text-lede text-ink/70 lg:col-span-4 lg:col-start-9">
            Clear steps, plain language, and no surprises. You’ll always know where your project stands and what
            comes next.
          </p>
        </div>

        <ol className="relative mt-20 grid gap-12 md:grid-cols-2 lg:mt-28 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="hairline absolute inset-x-0 top-[2.6rem] hidden lg:block" />
          {processSteps.map((step, i) => (
            <li
              key={step.index}
              className={cn("relative", i === 1 && "lg:mt-16", i === 2 && "lg:mt-32", i === 3 && "lg:mt-48")}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-outline font-display text-[5.25rem] leading-none text-gold-deep/80">{step.index}</span>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rotate-45 bg-gold" />
              </div>
              <h3 className="mt-6 font-display text-[1.9rem] leading-tight text-ink">{step.title}</h3>
              <p className="mt-3 max-w-xs text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
