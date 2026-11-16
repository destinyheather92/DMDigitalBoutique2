import Link from "next/link";
import { LineLink } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame, ScrollShot, Shot } from "@/components/ui/Frames";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type Layout = "image-left" | "image-right" | "wide" | "offset";

/**
 * One project, presented large. Four layouts keep a run of projects from
 * feeling repetitive. Hovering the preview scrolls through the live page.
 */
export function ProjectFeature({
  project,
  index,
  layout,
  tone = "dark",
}: {
  project: Project;
  index: number;
  layout: Layout;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const href = `/portfolio/${project.slug}`;
  const site = project.links[0]?.href;

  const preview = (
    <Link
      href={href}
      data-scroll-parent
      className="group block focus-visible:outline-offset-8"
    >
      <span className="sr-only">{project.name} case study.</span>
      <div className={cn("relative", layout === "wide" ? "pb-[6%] pr-[8%]" : "pb-[10%] pr-[12%]")}>
        <BrowserFrame url={site} tone={dark ? "dark" : "light"} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
          <ScrollShot
            image={project.images.scroll}
            ratio={layout === "wide" ? 0.52 : 0.62}
            sizes={layout === "wide" ? "(min-width: 1024px) 80vw, 92vw" : "(min-width: 1024px) 58vw, 92vw"}
            duration={10}
          />
        </BrowserFrame>
        <PhoneFrame className={cn("absolute bottom-0 right-0", layout === "wide" ? "w-[17%]" : "w-[25%]")}>
          <Shot image={project.images.mobile} sizes="(min-width: 1024px) 14vw, 25vw" />
        </PhoneFrame>
        <span
          aria-hidden="true"
          className="kicker pointer-events-none absolute left-4 top-12 rounded-full bg-ivory px-3.5 py-2 text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Scrolling the live page
        </span>
      </div>
    </Link>
  );

  const text = (
    <div className={cn(dark ? "text-ivory" : "text-ink")}>
      <p className={cn("text-outline font-display text-[4rem] leading-none lg:text-[5.5rem]", dark ? "text-gold/70" : "text-gold-deep/70")} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </p>
      <p className={cn("kicker mt-5", dark ? "text-petal" : "text-rose-deep")}>
        {project.category} · {project.year}
      </p>
      <h3 className="text-display-md mt-3">
        <Link href={href} className={cn("transition-colors", dark ? "hover:text-petal" : "hover:text-rose-deep")}>
          {project.name}
        </Link>
      </h3>
      <p className={cn("mt-5 max-w-md", dark ? "text-ivory/68" : "text-ink/70")}>{project.summary}</p>
      <ul className={cn("mt-7 flex flex-wrap gap-2", dark ? "text-ivory/55" : "text-ink/68")} aria-label="Built with">
        {project.tech.slice(0, 4).map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      <LineLink href={href} className={cn("mt-9", dark ? "text-ivory" : "text-ink")}>
        View the case study
      </LineLink>
    </div>
  );

  if (layout === "wide") {
    return (
      <article className="relative" data-reveal>
        <div className="lg:pr-[6%]">{preview}</div>
        <div className={cn("relative mt-10 lg:absolute lg:-bottom-16 lg:left-0 lg:mt-0 lg:w-[26rem]", "card-frame rounded-[4px] p-8 lg:p-10", dark ? "bg-ink-2/95 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]" : "bg-ivory shadow-xl")}>
          {text}
        </div>
      </article>
    );
  }

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10" data-reveal>
      <div
        className={cn(
          layout === "image-left" && "lg:col-span-8",
          layout === "image-right" && "lg:order-2 lg:col-span-8",
          layout === "offset" && "lg:col-span-8 lg:col-start-2",
        )}
      >
        {preview}
      </div>
      <div
        className={cn(
          layout === "image-left" && "lg:col-span-4 lg:self-end lg:pb-16",
          layout === "image-right" && "lg:order-1 lg:col-span-4 lg:self-start lg:pt-10",
          layout === "offset" && "lg:col-span-3 lg:self-end lg:pb-16",
        )}
      >
        {text}
      </div>
    </article>
  );
}
