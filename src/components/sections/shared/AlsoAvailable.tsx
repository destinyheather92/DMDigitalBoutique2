import { LineLink } from "@/components/ui/Button";
import { Diamond } from "@/components/ui/Icons";
import { secondaryServices } from "@/data/services";
import { cn } from "@/lib/cn";

/** Secondary services, set as a flowing run-in list rather than another grid of cards. */
export function AlsoAvailable({ className, tone = "light" }: { className?: string; tone?: "light" | "paper" }) {
  return (
    <section
      aria-labelledby="also-title"
      className={cn("cv-auto relative border-y border-ink/10 py-20 lg:py-28", tone === "paper" ? "bg-paper" : "bg-mist", className)}
    >
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3" data-reveal>
          <h2 id="also-title" className="kicker text-rose-deep">
            Already have a website?
          </h2>
          <p className="mt-4 max-w-xs text-ink/70">
            I also take care of the work that keeps a site healthy, current, and useful.
          </p>
          <LineLink href="/contact" className="mt-6 text-ink">
            Ask about support
          </LineLink>
        </div>
        <ul className="lg:col-span-9" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          {secondaryServices.map((s, i) => (
            <li key={s} className="inline font-display text-[1.6rem] leading-[1.6] text-ink sm:text-[2.1rem] lg:text-[2.5rem]">
              <span className={cn("sm:whitespace-nowrap", i % 2 === 1 && "italic text-rose-deep")}>{s}</span>
              {i < secondaryServices.length - 1 && (
                <Diamond className="mx-3 inline-block h-2.5 w-2.5 -translate-y-1 align-middle text-gold sm:mx-5" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
