import Link from "next/link";
import type { ReactNode } from "react";
import { InkBackground, type Texture } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="fade-in">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ivory/60">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2.5">
            {i > 0 && <span aria-hidden="true" className="text-gold/70">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ivory/70">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition-colors hover:text-petal">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Dark, smoky opening section for inner pages. */
export function PageHero({
  kicker,
  title,
  intro,
  breadcrumbs,
  actions,
  aside,
  texture = "hero",
  className,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  texture?: Texture;
  className?: string;
}) {
  return (
    <section className={cn("surface-ink grain relative overflow-hidden", className)}>
      <InkBackground texture={texture} mobile={texture === "hero" ? "heroPortrait" : undefined} priority position="72% 40%" drift />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-ink)_10%,rgb(23_21_24/0.78)_45%,rgb(23_21_24/0.2)_85%)]" />

      <div className="container-x relative z-[2] pb-24 pt-40 lg:pb-32 lg:pt-52">
        <Breadcrumbs items={breadcrumbs} />
        <div className={cn("mt-12 grid gap-16 lg:mt-16", aside ? "lg:grid-cols-12 lg:items-center lg:gap-8" : undefined)}>
          <div className={cn(aside ? "lg:col-span-7" : "max-w-5xl")}>
            <Kicker tone="light" className="fade-in">
              {kicker}
            </Kicker>
            <h1 className="text-display-xl fade-in mt-8 text-ivory" style={{ ["--fade-delay" as string]: "80ms" }}>
              {title}
            </h1>
            {intro && (
              <div className="text-lede fade-in mt-9 max-w-2xl space-y-5 text-ivory/72" style={{ ["--fade-delay" as string]: "200ms" }}>
                {intro}
              </div>
            )}
            {actions && (
              <div className="fade-in mt-11 flex flex-wrap items-center gap-x-9 gap-y-6" style={{ ["--fade-delay" as string]: "320ms" }}>
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div className="fade-in lg:col-span-5" style={{ ["--fade-delay" as string]: "260ms" }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
