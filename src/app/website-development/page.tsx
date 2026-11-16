import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ScreenStack } from "@/components/portfolio/ScreenStack";
import { JsonLd } from "@/components/seo/JsonLd";
import { AlsoAvailable } from "@/components/sections/shared/AlsoAvailable";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { Faq, faqSchema, type FaqItem } from "@/components/ui/Faq";
import { Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { getProject } from "@/data/projects";
import { seoFoundations } from "@/data/services";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

const path = "/website-development";
const description =
  "Custom website design and development for small businesses in Columbia, Lexington, and across South Carolina. Responsive, fast, SEO-friendly websites with quote forms, booking, and the features your business needs.";

export const metadata = pageMetadata({
  title: "Custom Website Design & Development in Columbia, SC",
  description,
  path,
});

const included = [
  {
    title: "Custom website design",
    body: "Designed from a blank page around your brand, your customers, and your goals. No themes, no page builders, no lookalike layouts.",
  },
  {
    title: "Responsive development",
    body: "Built to work beautifully on phones, tablets, and desktops — and tested at real screen sizes, not just shrunk to fit.",
  },
  {
    title: "Website functionality",
    body: "Contact and quote forms, booking integrations, galleries, FAQs, client logins, and custom features when your business calls for them.",
  },
  {
    title: "Lead capture",
    body: "Clear calls to action and forms that ask the right questions, so inquiries arrive with what you need to give a real answer.",
  },
  {
    title: "Website performance",
    body: "Lean code, optimized images, and modern hosting so pages load quickly. People don’t wait for slow sites — and they don’t come back.",
  },
  {
    title: "SEO-friendly foundations",
    body: "Clean structure, proper headings, unique page titles and descriptions, and the technical basics search engines look for.",
  },
  {
    title: "Website redesigns",
    body: "If your current site looks dated or isn’t doing its job, I’ll rebuild it into something that looks current and works harder — keeping what’s worth keeping.",
  },
];

const siteTypes = [
  { name: "Business websites", body: "A complete, professional home for your business: who you are, what you do, and how to reach you." },
  { name: "Service-based websites", body: "For contractors, practices, and service providers — built around services, service areas, and getting the call." },
  { name: "Landing pages", body: "One focused page for a campaign, launch, or offer, with a single clear next step." },
  { name: "Website redesigns", body: "A rebuild of an existing site that’s outgrown its template, its look, or its usefulness." },
];

const faqs: FaqItem[] = [
  {
    q: "How much does a custom website cost?",
    a: "It depends on what the site needs to do. A focused small-business site and a site with booking, client logins, and custom features are very different projects. After we talk, you’ll get a clear proposal with the price before any work begins.",
  },
  {
    q: "How long does it take?",
    a: "Timelines depend on the size of the site, how quickly content comes together, and any integrations. Your proposal includes a realistic timeline, and I’ll keep you posted the whole way through.",
  },
  {
    q: "Do you use templates or website builders?",
    a: "No. Every site is designed and coded for the business it’s built for. That’s what keeps it fast, flexible, and distinctly yours.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. I’ll look at what’s working, what isn’t, and what your customers actually need — then rebuild it, carrying over the content and pages worth keeping.",
  },
  {
    q: "Will my website work on phones?",
    a: "Yes. Every site is responsive and tested across phone, tablet, and desktop sizes. For many local businesses, phones are where most visitors arrive.",
  },
  {
    q: "Do you work with businesses outside Columbia?",
    a: "Yes. I work with businesses in Columbia, Lexington, Cayce, West Columbia, and the surrounding communities — and remotely with clients anywhere in the country.",
  },
  {
    q: "Can you help after the site launches?",
    a: "Yes. Maintenance, updates, improvements, and troubleshooting are all available. We’ll talk about what level of support makes sense for you.",
  },
];

export default function WebsiteDevelopmentPage() {
  const fortJackson = getProject("fort-jackson-eye-center")!;
  const hoffman = getProject("hoffman-hvac")!;
  const landstrong = getProject("landstrong")!;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: "Custom Website Design & Development", serviceType: "Website development", description, path }),
          breadcrumbSchema([{ name: "Website Development", path }]),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: "Website Development", path }]}
        kicker="Website design & development"
        title={
          <>
            Built around your business. <em className="italic text-blush">Not a template.</em>
          </>
        }
        intro={
          <p>
            I design and develop custom websites for small and medium-sized businesses in Columbia, Lexington, and
            across South Carolina — and for clients anywhere. Every site is shaped around how you work and what your
            customers need to do next.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact">Start Your Project</ButtonLink>
            <LineLink href="#work" className="text-ivory">
              See website work
            </LineLink>
          </>
        }
        aside={
          <ScreenStack
            desktop={hoffman.images.hero}
            mobile={hoffman.images.mobile}
            url={hoffman.links[0].href}
            priority
          />
        }
      />

      {/* What's included — a spec sheet, not a card grid */}
      <section aria-labelledby="included-title" className="section-y relative overflow-clip bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36" data-reveal>
              <Kicker>What’s included</Kicker>
              <h2 id="included-title" className="text-display-md mt-7 text-ink">
                Everything a hard-working website <em className="italic text-rose-deep">needs.</em>
              </h2>
              <p className="mt-6 max-w-sm text-ink/70">
                Your business is unique. Your website should be, too — and it should be built properly underneath,
                where most people never look.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {included.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ink/15 py-9 last:border-b sm:grid-cols-[5rem_1fr]" data-reveal>
                <span className="text-outline font-display text-[2.4rem] leading-none text-gold-deep/80">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.7rem] leading-tight text-ink sm:text-[2rem]">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-ink/70">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kinds of websites */}
      <section aria-labelledby="types-title" className="surface-ink grain section-y relative overflow-hidden">
        <InkBackground texture="section" />
        <div className="container-x relative z-[2]">
          <div className="max-w-3xl" data-reveal>
            <Kicker tone="light">What I build</Kicker>
            <h2 id="types-title" className="text-display-lg mt-7 text-ivory">
              Websites for businesses that <em className="italic text-blush">take their work seriously.</em>
            </h2>
          </div>
          <dl className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {siteTypes.map((t, i) => (
              <div key={t.name} className={i % 2 === 1 ? "md:mt-20" : undefined} data-reveal>
                <dt className="flex items-baseline gap-4 border-b border-white/12 pb-5">
                  <Diamond className="shrink-0 text-gold" />
                  <span className="font-display text-[2rem] leading-tight text-ivory sm:text-[2.6rem]">{t.name}</span>
                </dt>
                <dd className="mt-5 max-w-md text-ivory/68">{t.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Work */}
      <section id="work" aria-labelledby="work-title" className="section-y bg-ivory">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between" data-reveal>
            <div>
              <Kicker>Recent websites</Kicker>
              <h2 id="work-title" className="text-display-lg mt-7 text-ink">
                See it <em className="italic text-rose-deep">in the wild.</em>
              </h2>
            </div>
            <LineLink href="/portfolio" className="text-ink">
              All case studies
            </LineLink>
          </div>
          <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7" data-reveal>
              <ProjectCard project={fortJackson} ratio={0.66} sizes="(min-width: 1024px) 55vw, 92vw" />
            </div>
            <div className="space-y-16 lg:col-span-5 lg:pt-32">
              <div data-reveal>
                <ProjectCard project={hoffman} ratio={0.6} sizes="(min-width: 1024px) 38vw, 92vw" />
              </div>
              <div data-reveal>
                <ProjectCard project={landstrong} ratio={0.6} sizes="(min-width: 1024px) 38vw, 92vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO, honestly */}
      <section aria-labelledby="seo-title" className="section-y grain grain-light relative isolate overflow-hidden bg-blush-pale">
        <InkBackground texture="blush" position="right bottom" />
        <div className="container-x relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Kicker>SEO-friendly development</Kicker>
            <h2 id="seo-title" className="text-display-md mt-7 text-ink">
              Search-ready from <em className="italic text-rose-deep">the first line of code.</em>
            </h2>
            <p className="mt-6 text-ink/72">
              Good SEO starts with a well-built website. I’ve written keyword-conscious copy and structured pages for
              search visibility on the sites I build, and every project includes these foundations as standard.
            </p>
            <div className="card-frame mt-10 rounded-[4px] bg-ivory/80 p-8">
              <h3 className="kicker text-gold-deep">The honest part</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75">
                I build the foundation that helps your site get found. I don’t run ongoing SEO campaigns, manage ads or
                Google Business Profiles, or promise rankings — and no one can honestly guarantee a spot on Google.
              </p>
            </div>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {seoFoundations.map((s) => (
              <li key={s.title} className="border-t border-ink/15 pt-5" data-reveal>
                <h3 className="flex items-center gap-3 font-medium text-ink">
                  <Diamond className="shrink-0 text-gold-deep" />
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.92rem] text-ink/68">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AlsoAvailable tone="paper" />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Kicker>Questions</Kicker>
            <h2 id="faq-title" className="text-display-md mt-7 text-ink">
              Good questions to ask <em className="italic text-rose-deep">before you hire anyone.</em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6" data-reveal>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <ClosingCta
        title={
          <>
            Ready for a website that <em className="italic text-blush">earns its keep?</em>
          </>
        }
        body="Tell me about your business and what you need your website to do. I’ll take it from there."
        cta="Start Your Project"
      />
    </>
  );
}
