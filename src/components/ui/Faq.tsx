import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

/** Native <details> accordion: keyboard-accessible and works without JavaScript. */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("border-t border-ink/15", className)}>
      {items.map((item) => (
        <details key={item.q} className="faq group border-b border-ink/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.35rem] leading-snug text-ink transition-colors group-hover:text-rose-deep sm:text-[1.6rem]">
              {item.q}
            </span>
            <span aria-hidden="true" className="relative mt-3 h-3 w-3 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-3 bg-gold-deep" />
              <span className="absolute left-1/2 top-0 h-3 w-px bg-gold-deep transition-transform duration-500 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="max-w-2xl pb-8 pr-10 text-ink/72">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
