import { Portrait } from "@/components/brand/Portrait";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { Breadcrumbs } from "@/components/sections/shared/PageHero";
import { Process } from "@/components/sections/shared/Process";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { Smoke } from "@/components/ui/Smoke";
import { techStack } from "@/data/services";
import { breadcrumbSchema, pageMetadata, personSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/about";

export const metadata = pageMetadata({
  title: "About Destiny Mills — Full-Stack Developer & Founder",
  description:
    "Meet Destiny Mills, the full-stack developer behind DM Digital Boutique. Custom websites, client portals, and business software for small businesses in Columbia, SC and nationwide.",
  path,
  image: { url: "/images/og-default.jpg", width: 1200, height: 630, alt: "DM Digital Boutique" },
});

const path_ = [
  {
    title: "Legal support",
    body: "I started out as a legal secretary and later studied paralegal work. I saw how much time disappears into paperwork — and how hard confusing systems are on the people who have to use them.",
  },
  {
    title: "Teaching web development",
    body: "As a teaching assistant, I helped new developers learn React and JavaScript fundamentals by breaking complicated ideas into plain, hands-on steps.",
  },
  {
    title: "Full-stack development",
    body: "I build production web applications, client portals, dashboards, and business websites with Next.js, React, TypeScript, Node.js, and PostgreSQL.",
  },
  {
    title: "Building with AI",
    body: "Through an AI builder apprenticeship, I design and ship AI-assisted features and automation — carefully, with people kept in the loop.",
  },
  {
    title: "Founding CaseCompass AI",
    body: "I founded and built CaseCompass AI, a platform that turns complex legal situations into plain-language research roadmaps.",
  },
];

const values = [
  {
    title: "You work with the developer",
    body: "The person you talk to is the person designing and building your project. Nothing gets lost in translation.",
  },
  {
    title: "Plain language",
    body: "I explain things clearly, without jargon, and I’ll make sure you understand every decision that affects your business.",
  },
  {
    title: "Honest scope",
    body: "I’ll tell you what you need and what you don’t — even when the answer is a smaller project.",
  },
  {
    title: "Built to last",
    body: "Clean, documented code and sensible structure, so your site or software can keep growing with you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema(), breadcrumbSchema([{ name: "About", path }])]} />

      {/* Hero with portrait */}
      <section className="surface-ink grain relative overflow-hidden">
        <InkBackground texture="hero" mobile="heroPortrait" priority drift position="70% 40%" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-ink)_10%,rgb(23_21_24/0.7)_55%,rgb(23_21_24/0.25)_95%)]" />
        <Smoke className="right-[-10%] top-[30%] hidden aspect-square w-[55%] lg:block" />
        <div className="container-x relative z-[2] pb-24 pt-40 lg:pb-32 lg:pt-52">
          <Breadcrumbs items={[{ name: "About", path }]} />
          <div className="mt-12 grid items-center gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Kicker tone="light" className="fade-in">
                About the studio
              </Kicker>
              <h1 className="text-display-xl fade-in mt-8 text-ivory" style={{ ["--fade-delay" as string]: "80ms" }}>
                Hi, I’m Destiny. <em className="italic text-blush">I build the whole thing.</em>
              </h1>
              <div className="text-lede fade-in mt-9 max-w-2xl space-y-5 text-ivory/72" style={{ ["--fade-delay" as string]: "200ms" }}>
                <p>
                  I’m the founder and full-stack developer behind {site.name}. I design and build custom websites,
                  business automation, and software for small and medium-sized businesses — from first sketch to launch
                  and beyond.
                </p>
              </div>
              <div className="fade-in mt-11 flex flex-wrap items-center gap-x-9 gap-y-6" style={{ ["--fade-delay" as string]: "320ms" }}>
                <ButtonLink href="/contact">Work With Me</ButtonLink>
                <LineLink href={site.social.linkedin} external className="text-ivory">
                  LinkedIn
                </LineLink>
              </div>
            </div>
            <div className="fade-in mx-auto w-full max-w-[24rem] lg:col-span-4 lg:col-start-9 lg:max-w-none" style={{ ["--fade-delay" as string]: "260ms" }}>
              <Portrait priority sizes="(min-width: 1024px) 30vw, 80vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title" className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Kicker>Why DM Digital Boutique</Kicker>
            <h2 id="story-title" className="text-display-md mt-7 text-ink">
              Boutique, <em className="italic text-rose-deep">on purpose.</em>
            </h2>
          </div>
          <div className="space-y-6 text-[1.1rem] leading-relaxed text-ink/75 lg:col-span-7 lg:col-start-6" data-reveal>
            <p className="font-display text-[1.7rem] leading-snug text-ink sm:text-[2.1rem]">
              Small businesses deserve the same care in their websites and software that big companies pay agencies
              for — without the agency runaround.
            </p>
            <p>
              That’s the idea behind a boutique studio. You get one accountable person who learns how your business
              works, designs something that fits it, and builds it properly. No juggling between a designer, a
              developer, and an account manager. No template dressed up as custom.
            </p>
            <p>
              I care about the details you can see — typography, spacing, the way a page feels on your phone — and the
              ones you can’t: clean code, fast loading, solid security, and a structure search engines understand.
              Good design gets attention. Smart development makes it useful. You need both.
            </p>
          </div>
        </div>
      </section>

      {/* Path */}
      <section aria-labelledby="path-title" className="surface-ink grain section-y relative overflow-hidden">
        <InkBackground texture="section" />
        <div className="container-x relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Kicker tone="light">My path</Kicker>
            <h2 id="path-title" className="text-display-md mt-7 text-ivory">
              Not a straight line — <em className="italic text-blush">a useful one.</em>
            </h2>
            <p className="mt-6 max-w-sm text-ivory/65">
              My background outside of tech is a big part of how I build: for real people, in plain language, with
              very little patience for needless complexity.
            </p>
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-gold/40" />
            {path_.map((step, i) => (
              <li key={step.title} className="relative pb-12 pl-12 last:pb-0" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <span aria-hidden="true" className="absolute left-0 top-2.5 h-[11px] w-[11px] rounded-full border border-gold bg-ink" />
                <h3 className="font-display text-[1.75rem] leading-tight text-ivory">{step.title}</h3>
                <p className="mt-3 max-w-xl text-ivory/68">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="section-y grain grain-light relative isolate overflow-hidden bg-blush-pale">
        <InkBackground texture="blush" />
        <div className="container-x relative z-[2]">
          <div className="max-w-3xl" data-reveal>
            <Kicker>How I work</Kicker>
            <h2 id="values-title" className="text-display-lg mt-7 text-ink">
              What you can <em className="italic text-rose-deep">count on.</em>
            </h2>
          </div>
          <dl className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className={i % 2 === 1 ? "md:mt-16" : undefined} data-reveal>
                <dt className="flex items-baseline gap-4 border-b border-ink/15 pb-4 font-display text-[1.8rem] leading-tight text-ink sm:text-[2.2rem]">
                  <Diamond className="shrink-0 text-gold-deep" />
                  {v.title}
                </dt>
                <dd className="mt-4 max-w-md text-ink/70">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Toolkit + area */}
      <section aria-labelledby="toolkit-title" className="section-y bg-ivory">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Kicker>Where & how</Kicker>
            <h2 id="toolkit-title" className="text-display-md mt-7 text-ink">
              Local roots, <em className="italic text-rose-deep">remote reach.</em>
            </h2>
            <p className="mt-6 max-w-md text-ink/72">
              I work with businesses in {site.location.serviceArea.join(", ")}, and the surrounding South Carolina
              communities — and remotely with clients anywhere in the country.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <LineLink href={site.social.github} external className="text-ink">
                GitHub
              </LineLink>
              <LineLink href={site.social.linkedin} external className="text-ink">
                LinkedIn
              </LineLink>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <div className="card-frame rounded-[4px] bg-mist p-8 sm:p-12">
              <h3 className="kicker text-gold-deep">The toolkit</h3>
              <dl className="mt-8 divide-y divide-ink/10">
                {techStack.map((g) => (
                  <div key={g.group} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-medium text-ink">{g.group}</dt>
                    <dd className="text-[0.95rem] text-ink/68">{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Process className="border-t border-ink/10 bg-paper" />

      <ClosingCta
        title={
          <>
            I’d love to hear <em className="italic text-blush">what you’re building.</em>
          </>
        }
        cta="Start a Conversation"
      />
    </>
  );
}
