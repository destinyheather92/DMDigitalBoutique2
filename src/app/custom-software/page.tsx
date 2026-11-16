import { ScreenStack } from "@/components/portfolio/ScreenStack";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { BrowserFrame, ScrollShot } from "@/components/ui/Frames";
import { Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { getProject } from "@/data/projects";
import { techStack } from "@/data/services";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

const path = "/custom-software";
const description =
  "Custom business software development: web applications, client portals, dashboards, internal tools, API integrations, and database-driven apps built with Next.js, React, TypeScript, and PostgreSQL.";

export const metadata = pageMetadata({
  title: "Custom Business Software & Web Application Development",
  description,
  path,
});

const signs = [
  "You pay for three tools that don’t talk to each other.",
  "Your team keeps a “real” spreadsheet next to the software you bought.",
  "Clients email you for information they could look up themselves.",
  "An important process lives entirely in one person’s head.",
  "Your business has simply outgrown the way it’s set up.",
];

const capabilities = [
  { title: "Custom web applications", body: "Browser-based software built for one job — yours — and nothing you don’t need." },
  { title: "Business management systems", body: "Jobs, clients, schedules, and paperwork, organized the way your team actually works." },
  { title: "Client portals", body: "Secure logins where clients can book, upload, pay, and check progress on their own." },
  { title: "Custom dashboards", body: "The information you need to run the business, gathered onto one clear screen." },
  { title: "Internal tools", body: "Focused tools that replace fragile spreadsheets and copy-paste routines." },
  { title: "API integrations", body: "Connecting the services you already rely on so data moves on its own." },
  { title: "Database-driven applications", body: "Structured, searchable data with the right people seeing the right things." },
];

const principles = [
  { title: "Secure by default", body: "Real authentication, role-based access, and validated input — not an afterthought." },
  { title: "Tested", body: "Automated tests around the parts that matter, so changes don’t quietly break things." },
  { title: "Built to grow", body: "Clean, typed, documented code that another developer could pick up — and that can expand with you." },
  { title: "Explained plainly", body: "You’ll understand what’s being built and why, without needing a technical vocabulary." },
];

export default function CustomSoftwarePage() {
  const casecompass = getProject("casecompass-ai")!;
  const landstrong = getProject("landstrong")!;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: "Custom Software Development", serviceType: "Custom software development", description, path }),
          breadcrumbSchema([{ name: "Custom Software", path }]),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: "Custom Software", path }]}
        kicker="Custom software development"
        title={
          <>
            Software shaped like <em className="italic text-blush">your business.</em>
          </>
        }
        intro={
          <p>
            When off-the-shelf tools almost fit — but not quite — you end up working around them. I build custom web
            applications, client portals, dashboards, and internal tools that fit the way your business actually runs.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact">Discuss Your Idea</ButtonLink>
            <LineLink href="/portfolio/casecompass-ai" className="text-ivory">
              See CaseCompass AI
            </LineLink>
          </>
        }
        aside={<ScreenStack desktop={casecompass.images.hero} mobile={casecompass.images.mobile} url={casecompass.links[0].href} priority />}
      />

      {/* When custom makes sense */}
      <section aria-labelledby="signs-title" className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Kicker>When custom makes sense</Kicker>
            <h2 id="signs-title" className="text-display-md mt-7 text-ink">
              Sound <em className="italic text-rose-deep">familiar?</em>
            </h2>
            <p className="mt-6 max-w-sm text-ink/70">
              Not every problem needs custom software. But if a few of these ring true, it’s worth a conversation.
            </p>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {signs.map((s) => (
              <li key={s} className="border-t border-ink/15 py-7 font-display text-[1.6rem] italic leading-snug text-ink last:border-b sm:text-[2.1rem]" data-reveal>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="sw-cap-title" className="surface-ink grain section-y relative overflow-hidden">
        <InkBackground texture="section" />
        <div className="container-x relative z-[2]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <Kicker tone="light">What I build</Kicker>
              <h2 id="sw-cap-title" className="text-display-lg mt-7 text-ivory">
                Development <em className="italic text-blush">beyond the basics.</em>
              </h2>
            </div>
            <p className="text-lede text-ivory/68 lg:col-span-4 lg:col-start-9">
              This is what separates DM Digital Boutique from a typical web design shop: full-stack development, front
              to back.
            </p>
          </div>
          <ol className="mt-16 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <li key={c.title} className="border-t border-white/12 py-8" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}>
                <span className="kicker text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-[1.6rem] leading-snug text-ivory">{c.title}</h3>
                <p className="mt-2 text-ivory/65">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Spotlight */}
      <section aria-labelledby="spot-title" className="section-y relative overflow-hidden bg-paper">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-reveal="scale">
            <BrowserFrame url={casecompass.links[0].href} tone="light">
              <ScrollShot image={casecompass.images.scroll} ratio={0.62} mode="hover" sizes="(min-width: 1024px) 55vw, 92vw" duration={12} />
            </BrowserFrame>
          </div>
          <div className="lg:col-span-5" data-reveal>
            <Kicker>Spotlight</Kicker>
            <h2 id="spot-title" className="text-display-md mt-7 text-ink">
              CaseCompass AI
            </h2>
            <p className="mt-6 text-ink/72">{casecompass.summary}</p>
            <p className="mt-4 text-ink/72">
              It brings together authentication and role-based access, a PostgreSQL database, a structured intake, and
              AI that turns that intake into a plain-language roadmap — the same kind of foundation a client portal or
              business system needs.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2 text-ink/68" aria-label="Built with">
              {casecompass.tech.slice(0, 7).map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <LineLink href="/portfolio/casecompass-ai" className="text-ink">
                Read the case study
              </LineLink>
              <LineLink href="/portfolio/landstrong" className="text-ink">
                See the {landstrong.name} portal
              </LineLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stack + principles */}
      <section aria-labelledby="stack-title" className="section-y bg-ivory">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Kicker>How I build</Kicker>
            <h2 id="stack-title" className="text-display-md mt-7 text-ink">
              Modern tools, <em className="italic text-rose-deep">careful habits.</em>
            </h2>
            <ul className="mt-12 space-y-8">
              {principles.map((p) => (
                <li key={p.title} className="grid grid-cols-[1.25rem_1fr] gap-3">
                  <Diamond className="mt-2.5 text-gold-deep" />
                  <div>
                    <h3 className="font-display text-[1.45rem] text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-ink/70">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
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

      <ClosingCta
        title={
          <>
            Have a process that deserves <em className="italic text-blush">better software?</em>
          </>
        }
        body="Describe what you’re trying to do — even roughly. I’ll help you figure out whether custom software is the right answer."
        cta="Discuss Your Idea"
      />
    </>
  );
}
