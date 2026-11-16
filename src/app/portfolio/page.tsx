import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { BrowserFrame, PhoneFrame, ScrollShot, Shot } from "@/components/ui/Frames";
import { ArrowRight } from "@/components/ui/Icons";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const path = "/portfolio";

export const metadata = pageMetadata({
  title: "Portfolio & Case Studies — Websites and Custom Software",
  description:
    "Case studies from DM Digital Boutique: websites for Fort Jackson Eye Center and Hoffman HVAC, a website and client portal for LandStrong, and the CaseCompass AI web application.",
  path,
});

function GalleryItem({ project, index, wide }: { project: Project; index: number; wide?: boolean }) {
  const href = `/portfolio/${project.slug}`;
  return (
    <article data-reveal className="group">
      <Link href={href} data-scroll-parent className="block">
        <span className="sr-only">{project.name} case study.</span>
        <div className={cn("relative", wide ? "pb-[7%] pr-[9%]" : "pb-[12%] pr-[14%]")}>
          <BrowserFrame url={project.links[0]?.href} tone="light" className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
            <ScrollShot
              image={project.images.scroll}
              ratio={wide ? 0.5 : 0.66}
              sizes={wide ? "(min-width: 1024px) 85vw, 92vw" : "(min-width: 1024px) 45vw, 92vw"}
              duration={10}
            />
          </BrowserFrame>
          <PhoneFrame className={cn("absolute bottom-0 right-0", wide ? "w-[15%]" : "w-[27%]")}>
            <Shot image={project.images.mobile} sizes="(min-width: 1024px) 13vw, 27vw" />
          </PhoneFrame>
        </div>
      </Link>

      <div className={cn("mt-8 grid gap-6", wide && "lg:grid-cols-12 lg:items-start")}>
        <div className={cn(wide && "lg:col-span-5")}>
          <p className="kicker text-rose-deep">
            <span className="text-gold-deep">{String(index + 1).padStart(2, "0")}</span> — {project.category} · {project.year}
          </p>
          <h2 className="mt-3 font-display text-[2.2rem] leading-[1.05] text-ink sm:text-[2.8rem]">
            <Link href={href} className="transition-colors hover:text-rose-deep">
              {project.name}
            </Link>
          </h2>
        </div>
        <div className={cn(wide && "lg:col-span-6 lg:col-start-7")}>
          <p className="max-w-xl text-ink/70">{project.summary}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
            <ul className="flex flex-wrap gap-2 text-ink/68" aria-label="Built with">
              {project.tech.slice(0, 3).map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
            <Link href={href} className="link-line text-ink" tabIndex={-1} aria-hidden="true">
              <span>Case study</span>
              <ArrowRight className="btn-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const [first, second, third, fourth] = projects;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Portfolio", path }])} />
      <PageHero
        breadcrumbs={[{ name: "Portfolio", path }]}
        kicker="Portfolio & case studies"
        title={
          <>
            Selected <em className="italic text-blush">work.</em>
          </>
        }
        intro={
          <p>
            Websites, portals, and software built for real businesses — a medical practice, a heating and air
            contractor, a counseling practice — plus a legal-tech product of my own. Each case study covers the
            problem, the solution, and how it was built.
          </p>
        }
        texture="cta"
      />

      <section aria-label="Projects" className="section-y bg-ivory">
        <div className="container-x space-y-28 lg:space-y-40">
          <GalleryItem project={first} index={0} wide />
          <div className="grid gap-28 lg:grid-cols-2 lg:gap-12">
            <GalleryItem project={second} index={1} />
            <div className="lg:pt-48">
              <GalleryItem project={third} index={2} />
            </div>
          </div>
          <GalleryItem project={fourth} index={3} wide />
        </div>
      </section>

      <ClosingCta
        title={
          <>
            Your business could be <em className="italic text-blush">the next case study.</em>
          </>
        }
        cta="Start Your Project"
      />
    </>
  );
}
