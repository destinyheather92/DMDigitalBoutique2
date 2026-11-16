import { ProjectFeature } from "@/components/portfolio/ProjectFeature";
import { LineLink } from "@/components/ui/Button";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { projects } from "@/data/projects";

const layouts = ["image-left", "image-right", "wide", "offset"] as const;

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-title" className="surface-ink grain section-y cv-auto relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[130vh]">
        <InkBackground texture="section" position="left top" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-ink" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[120vh] rotate-180">
        <InkBackground texture="section" position="left top" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative z-[2]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Kicker tone="light">Featured work</Kicker>
            <h2 id="work-title" className="text-display-2xl mt-8 text-ivory">
              Real work,
              <br />
              <em className="italic text-blush">real businesses.</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <p className="text-lede text-ivory/70">
              A medical practice, an HVAC contractor, a counseling practice, and a software product of my own. Every
              screenshot here comes straight from the live site.
            </p>
            <LineLink href="/portfolio" className="mt-8 text-ivory">
              See all case studies
            </LineLink>
          </div>
        </div>

        <div className="mt-24 space-y-32 lg:mt-36 lg:space-y-48">
          {projects.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i} layout={layouts[i % layouts.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
