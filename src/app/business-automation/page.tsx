import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { BrowserFrame, Shot } from "@/components/ui/Frames";
import { Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { WorkflowLine } from "@/components/ui/WorkflowLine";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

const path = "/business-automation";
const description =
  "Business workflow automation for small businesses: automated inquiry notifications, scheduling integrations, email workflows, client portals, CRM integrations, and internal tools — built by DM Digital Boutique.";

export const metadata = pageMetadata({
  title: "Business Workflow Automation for Small Businesses",
  description,
  path,
});

const beforeAfter = [
  {
    topic: "Quote requests",
    before: "A request lands in a shared inbox and waits until someone happens to see it.",
    after: "You’re notified the moment it arrives, the customer gets a confirmation, and it’s logged for follow-up.",
  },
  {
    topic: "Scheduling",
    before: "Booking one visit takes three phone calls and a voicemail.",
    after: "Customers choose an open time online. Confirmations and reminders go out on their own.",
  },
  {
    topic: "Client intake",
    before: "New clients fill out paper forms that someone retypes later.",
    after: "Intake happens online and arrives organized, complete, and ready to use.",
  },
  {
    topic: "Follow-ups",
    before: "Follow-ups depend on someone remembering to send them.",
    after: "Follow-up emails and reminders go out on schedule, every time.",
  },
  {
    topic: "Status questions",
    before: "Clients call or email to ask where things stand.",
    after: "A client portal shows them — and you get that time back.",
  },
];

const capabilities = [
  { title: "Automated contact form notifications", body: "New inquiries reach the right person instantly, with every detail in one place." },
  { title: "Customer inquiry management", body: "Every lead tracked from first message to final answer, so nothing slips." },
  { title: "Appointment scheduling integrations", body: "Connect the booking tools you already use to your website and calendar." },
  { title: "Automated email workflows", body: "Confirmations, reminders, and follow-ups that send themselves." },
  { title: "Client portals", body: "A secure place for clients to book, view updates, and handle paperwork." },
  { title: "Custom administrative dashboards", body: "The numbers and lists you check every day, on one screen." },
  { title: "CRM integrations", body: "Website leads flow straight into your CRM instead of a spreadsheet." },
  { title: "Internal business tools", body: "Small, focused tools that replace the clunky workaround your team relies on." },
];

const examples = [
  {
    name: "LandStrong Client Care Portal",
    href: "/portfolio/landstrong",
    body: "A demo MVP that brings intake, Google Calendar and Meet scheduling, reminders, invoicing, and email notifications into one place — plus AI-drafted session notes that stay private until the therapist approves them.",
  },
  {
    name: "Hoffman HVAC",
    href: "/portfolio/hoffman-hvac",
    body: "Every “Client Login” link on the new website connects customers to the company’s existing Jobber Client Hub, so the website and the scheduling system work together.",
  },
  {
    name: "Fort Jackson Eye Center",
    href: "/portfolio/fort-jackson-eye-center",
    body: "Every “Schedule an Appointment” button sends patients straight to the practice’s secure EHR scheduling portal — no duplicate systems, and no health information collected by the website.",
  },
];

const principles = [
  { title: "Start with the bottleneck", body: "We automate the task that costs you the most time first — not whatever is trendiest." },
  { title: "Use what already works", body: "If you love your booking tool or CRM, I’ll connect to it rather than replace it." },
  { title: "Keep a person in the loop", body: "Automation handles the routine. Anything that needs judgment still gets a human." },
  { title: "Keep it understandable", body: "You’ll know what runs, when, and why — written down in plain language." },
];

export default function BusinessAutomationPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: "Business Workflow Automation", serviceType: "Business process automation", description, path }),
          breadcrumbSchema([{ name: "Business Automation", path }]),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: "Business Automation", path }]}
        kicker="Business workflow automation"
        title={
          <>
            Less busywork. <em className="italic text-blush">Better systems.</em>
          </>
        }
        intro={
          <p>
            If you’re copying form submissions into spreadsheets, chasing appointment confirmations, or typing the same
            email for the tenth time this week, there’s a better way. I build automations and simple tools that take
            repetitive work off your plate.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact">Talk About Your Workflow</ButtonLink>
            <LineLink href="#examples" className="text-ivory">
              See real examples
            </LineLink>
          </>
        }
        aside={
          <div className="card-frame rounded-[4px] border border-white/10 bg-ink-2/80 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-10">
            <p className="kicker text-gold">One inquiry, handled</p>
            <p className="mt-3 font-display text-2xl text-ivory">What happens when a customer reaches out</p>
            <WorkflowLine
              tone="light"
              orientation="vertical"
              className="mt-8"
              steps={[
                { label: "New inquiry from your website", detail: "Name, needs, and contact details captured" },
                { label: "You’re alerted instantly", detail: "Email or text, wherever you’ll see it" },
                { label: "Customer gets a confirmation", detail: "They know you received it" },
                { label: "Added to your CRM or list", detail: "No copying and pasting" },
                { label: "Follow-up reminder scheduled", detail: "So nothing falls through the cracks" },
              ]}
            />
          </div>
        }
      />

      {/* Before / after */}
      <section aria-labelledby="time-title" className="section-y bg-ivory">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <Kicker>Where the time goes</Kicker>
              <h2 id="time-title" className="text-display-lg mt-7 text-ink">
                Small tasks. <em className="italic text-rose-deep">Every single day.</em>
              </h2>
            </div>
            <p className="text-lede text-ink/70 lg:col-span-4 lg:col-start-9">
              None of these take long on their own. Together, they quietly eat hours every week.
            </p>
          </div>

          <div className="mt-16 hidden grid-cols-12 gap-8 border-b border-ink/15 pb-4 md:grid">
            <span className="kicker col-span-3 text-ink/68">The task</span>
            <span className="kicker col-span-4 text-ink/68">Without a system</span>
            <span className="kicker col-span-5 text-rose-deep">With one</span>
          </div>
          <ul>
            {beforeAfter.map((row) => (
              <li key={row.topic} className="grid gap-3 border-b border-ink/15 py-8 md:grid-cols-12 md:gap-8" data-reveal>
                <h3 className="font-display text-[1.6rem] leading-tight text-ink md:col-span-3">{row.topic}</h3>
                <p className="text-ink/68 md:col-span-4">
                  <span className="kicker mr-2 text-ink/68 md:hidden">Without:</span>
                  {row.before}
                </p>
                <p className="flex gap-3 text-ink md:col-span-5">
                  <Diamond className="mt-2 shrink-0 text-gold-deep" />
                  <span>{row.after}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="cap-title" className="section-y grain grain-light relative isolate overflow-hidden bg-blush-pale">
        <InkBackground texture="blush" />
        <div className="container-x relative z-[2]">
          <div className="max-w-3xl" data-reveal>
            <Kicker>What I can build</Kicker>
            <h2 id="cap-title" className="text-display-lg mt-7 text-ink">
              Systems that <em className="italic text-rose-deep">quietly do the work.</em>
            </h2>
          </div>
          <ol className="mt-16 grid gap-x-12 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[3rem_1fr] border-t border-ink/15 py-7" data-reveal>
                <span className="kicker pt-1.5 text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.45rem] leading-snug text-ink">{c.title}</h3>
                  <p className="mt-2 text-ink/68">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Real examples */}
      <section id="examples" aria-labelledby="examples-title" className="surface-ink grain section-y relative overflow-hidden">
        <InkBackground texture="section" />
        <div className="container-x relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div data-reveal>
              <Kicker tone="light">In practice</Kicker>
              <h2 id="examples-title" className="text-display-lg mt-7 text-ivory">
                Connected, <em className="italic text-blush">not complicated.</em>
              </h2>
            </div>
            <div className="mt-12 space-y-10">
              {examples.map((ex) => (
                <article key={ex.name} className="border-t border-white/12 pt-6" data-reveal>
                  <h3 className="font-display text-[1.6rem] text-ivory">
                    <Link href={ex.href} className="transition-colors hover:text-petal">
                      {ex.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-ivory/68">{ex.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-24" data-reveal="scale">
            <BrowserFrame url="land-strong-client-care-portal.vercel.app">
              <Shot
                image={{ key: "landstrong-portal-desktop", alt: "LandStrong Client Care Portal: “A calmer way to run client care.”" }}
                sizes="(min-width: 1024px) 45vw, 92vw"
              />
            </BrowserFrame>
            <p className="mt-5 text-sm text-ivory/50">
              LandStrong Client Care Portal — a working demo MVP built for LandStrong Counseling.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="approach-title" className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Kicker>My approach</Kicker>
            <h2 id="approach-title" className="text-display-md mt-7 text-ink">
              Automation should make work <em className="italic text-rose-deep">simpler,</em> not stranger.
            </h2>
          </div>
          <dl className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <div key={p.title} className={i % 2 === 1 ? "sm:mt-12" : undefined} data-reveal>
                <dt className="font-display text-[1.6rem] text-ink">{p.title}</dt>
                <dd className="mt-3 text-ink/70">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta
        title={
          <>
            Let’s find the busywork <em className="italic text-blush">worth automating.</em>
          </>
        }
        body="Tell me about the tasks that eat your week. I’ll tell you honestly which ones are worth automating — and how."
        cta="Talk About Your Workflow"
      />
    </>
  );
}
