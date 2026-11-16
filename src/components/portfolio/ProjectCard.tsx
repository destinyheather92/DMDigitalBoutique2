import Link from "next/link";
import { BrowserFrame, ScrollShot } from "@/components/ui/Frames";
import { ArrowRight } from "@/components/ui/Icons";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

/** Compact project tile: hover scrolls the live page inside the frame. */
export function ProjectCard({
  project,
  tone = "light",
  ratio = 0.62,
  sizes = "(min-width: 1024px) 40vw, 92vw",
  className,
  headingLevel = "h3",
}: {
  project: Project;
  tone?: "light" | "dark";
  ratio?: number;
  sizes?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const dark = tone === "dark";
  return (
    <Link href={`/portfolio/${project.slug}`} data-scroll-parent className={cn("group block", className)}>
      <BrowserFrame url={project.links[0]?.href} tone={dark ? "dark" : "light"} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
        <ScrollShot image={project.images.scroll} ratio={ratio} sizes={sizes} duration={9} />
      </BrowserFrame>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className={cn("kicker", dark ? "text-petal" : "text-rose-deep")}>{project.category}</p>
          <H className={cn("mt-2 font-display text-[1.75rem] leading-tight transition-colors", dark ? "text-ivory group-hover:text-petal" : "text-ink group-hover:text-rose-deep")}>
            {project.name}
          </H>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:bg-gold group-hover:text-ink",
            dark ? "border-white/20 text-ivory" : "border-ink/20 text-ink",
          )}
        >
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
