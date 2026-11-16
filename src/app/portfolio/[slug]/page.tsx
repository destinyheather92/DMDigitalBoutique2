import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { Breadcrumbs } from "@/components/sections/shared/PageHero";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame, ScrollShot, Shot } from "@/components/ui/Frames";
import { ArrowRight, Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { getAdjacentProject, getProject, projects } from "@/data/projects";
import { getImage } from "@/lib/images";
import { breadcrumbSchema, caseStudySchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} Case Study — ${project.category}`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
    image: { url: `/projects/og/${project.slug}.jpg`, width: 1200, height: 630, alt: project.images.hero.alt },
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);
  const path = `/portfolio/${project.slug}`;
  const primaryLink = project.links[0];

  const meta = [
    { term: "Industry", detail: project.industry },
    ...(project.location ? [{ term: "Location", detail: project.location }] : []),
    { term: "Year", detail: project.year },
    { term: "My role", detail: project.scope.join(", ") },
  ];

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema({ name: project.name, description: project.summary, path, image: getImage(project.images.hero.key).src, year: project.year }),
          breadcrumbSchema([
            { name: "Portfolio", path: "/portfolio" },
            { name: project.name, path },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="surface-ink grain relative overflow-hidden">
        <InkBackground texture="hero" mobile="heroPortrait" priority drift position="75% 40%" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-ink)_10%,rgb(23_21_24/0.75)_50%,rgb(23_21_24/0.25)_90%)]" />
        <div className="container-x relative z-[2] pb-20 pt-40 lg:pb-28 lg:pt-52">
          <Breadcrumbs items={[{ name: "Portfolio", path: "/portfolio" }, { name: project.name, path }]} />
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <Kicker tone="light" className="fade-in">
                Case study — {project.category}
              </Kicker>
              <h1 className="text-display-2xl fade-in mt-8 text-ivory" style={{ ["--fade-delay" as string]: "80ms" }}>
                {project.name}
              </h1>
              <p className="text-lede fade-in mt-9 max-w-2xl text-ivory/72" style={{ ["--fade-delay" as string]: "200ms" }}>
                {project.summary}
              </p>
            </div>
            <div className="fade-in lg:col-span-4" style={{ ["--fade-delay" as string]: "300ms" }}>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {meta.map((m) => (
                  <div key={m.term} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                    <dt className="kicker pt-0.5 text-gold">{m.term}</dt>
                    <dd className="text-[0.95rem] text-ivory/80">{m.detail}</dd>
                  </div>
                ))}
              </dl>
              {primaryLink && (
                <ButtonLink href={primaryLink.href} external variant="outline-light" className="mt-8">
                  {primaryLink.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero screenshot straddling dark and light */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_45%,var(--color-ivory)_45%)]">
        <div className="container-x">
          <div className="relative pb-[6%] pr-[7%]" data-reveal="scale">
            <BrowserFrame url={primaryLink?.href} className="shadow-[0_60px_120px_-50px_rgba(0,0,0,0.7)]">
              <ScrollShot image={project.images.scroll} ratio={0.56} mode="hover" sizes="(min-width: 1280px) 1200px, 92vw" duration={16} priority />
            </BrowserFrame>
            <PhoneFrame className="absolute bottom-0 right-0 w-[19%] min-w-[5.5rem]">
              <Shot image={project.images.mobile} sizes="(min-width: 1024px) 16vw, 22vw" />
            </PhoneFrame>
          </div>
          <p className="mt-4 hidden text-sm text-ink/68 lg:block">Hover the preview to scroll through the full homepage.</p>
        </div>
      </div>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="bg-ivory pb-20 pt-24 lg:pb-28 lg:pt-32">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="overview-title" className="kicker text-rose-deep lg:col-span-3" data-reveal>
            Overview
          </h2>
          <div className="lg:col-span-8" data-reveal>
            <p className="text-display-sm text-ink">{project.overview[0]}</p>
            {project.overview.slice(1).map((p) => (
              <p key={p} className="text-lede mt-8 max-w-3xl text-ink/72">
                {p}
              </p>
            ))}
            {project.note && (
              <p className="card-frame mt-12 max-w-2xl rounded-[4px] bg-mist px-8 py-7 text-[0.95rem] text-ink/75">
                <span className="kicker mb-2 block text-gold-deep">Worth noting</span>
                {project.note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section aria-label="Challenge and solution" className="bg-ivory pb-24 lg:pb-36">
        <div className="container-x grid gap-16 border-t border-ink/12 pt-20 lg:grid-cols-2 lg:gap-16 lg:pt-28">
          <div data-reveal>
            <Kicker>The challenge</Kicker>
            <div className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-ink/75">
              {project.challenge.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:mt-32" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <Kicker>The solution</Kicker>
            <div className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-ink/75">
              {project.solution.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features + tech */}
      <section aria-labelledby="features-title" className="surface-ink grain section-y relative overflow-hidden">
        <InkBackground texture="section" />
        <div className="container-x relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Kicker tone="light">Key features</Kicker>
              <h2 id="features-title" className="text-display-md mt-7 text-ivory">
                What went <em className="italic text-blush">into it.</em>
              </h2>
            </div>
            <ol className="mt-12">
              {project.features.map((f, i) => (
                <li key={f} className="grid grid-cols-[3rem_1fr] border-t border-white/12 py-5 last:border-b" data-reveal>
                  <span className="kicker pt-1 text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.05rem] text-ivory/85">{f}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" data-reveal>
            <div className="card-frame rounded-[4px] border border-white/10 bg-ink-2/80 p-8 lg:sticky lg:top-32">
              <h2 className="kicker text-gold">Built with</h2>
              <ul className="mt-6 flex flex-wrap gap-2 text-ivory/70">
                {project.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              <h2 className="kicker mt-10 text-gold">What I did</h2>
              <ul className="mt-5 space-y-2.5">
                {project.scope.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-ivory/80">
                    <Diamond className="shrink-0 text-gold" />
                    {s}
                  </li>
                ))}
              </ul>
              {project.links.length > 0 && (
                <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/10 pt-8">
                  {project.links.map((l) => (
                    <LineLink key={l.href} href={l.href} external className="text-ivory">
                      {l.label}
                    </LineLink>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Screens */}
      <section aria-labelledby="screens-title" className="section-y grain grain-light relative isolate overflow-hidden bg-blush-pale">
        <InkBackground texture="blush" />
        <div className="container-x relative z-[2]">
          <div className="max-w-2xl" data-reveal>
            <Kicker>Screens</Kicker>
            <h2 id="screens-title" className="text-display-md mt-7 text-ink">
              Desktop to <em className="italic text-rose-deep">phone.</em>
            </h2>
          </div>
          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-14 lg:col-span-8">
              {(project.images.gallery.length ? project.images.gallery : [project.images.hero]).map((img) => (
                <figure key={img.key} data-reveal>
                  <BrowserFrame tone="light">
                    <Shot image={img} sizes="(min-width: 1024px) 62vw, 92vw" />
                  </BrowserFrame>
                  <figcaption className="mt-4 text-sm text-ink/68">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5 self-start lg:sticky lg:top-32 lg:col-span-4">
              <figure data-reveal>
                <PhoneFrame>
                  <Shot image={project.images.mobile} sizes="(min-width: 1024px) 15vw, 44vw" />
                </PhoneFrame>
                <figcaption className="mt-3 text-xs text-ink/68">Mobile homepage</figcaption>
              </figure>
              <figure className="mt-16" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
                <PhoneFrame>
                  <ScrollShot image={project.images.mobileScroll} ratio={2.16} mode="auto" duration={26} sizes="(min-width: 1024px) 15vw, 44vw" />
                </PhoneFrame>
                <figcaption className="mt-3 text-xs text-ink/68">Scrolling the mobile page</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section aria-label="Next project" className="border-t border-ink/10 bg-ivory py-20 lg:py-28">
        <div className="container-x">
          <Link href={`/portfolio/${next.slug}`} className="group grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker text-rose-deep">Next case study</p>
              <p className="mt-5 flex items-center gap-6 font-display text-[2.6rem] leading-none text-ink transition-colors group-hover:text-rose-deep sm:text-[4.5rem]">
                {next.name}
                <ArrowRight className="hidden h-6 w-12 shrink-0 transition-transform duration-500 group-hover:translate-x-2 sm:block" />
              </p>
              <p className="mt-5 text-ink/68">{next.category}</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <BrowserFrame tone="light" className="transition-transform duration-700 group-hover:-translate-y-1.5">
                <Shot image={next.images.hero} sizes="(min-width: 1024px) 30vw, 92vw" />
              </BrowserFrame>
            </div>
          </Link>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
