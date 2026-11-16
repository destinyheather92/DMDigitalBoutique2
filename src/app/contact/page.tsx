import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Kicker } from "@/components/ui/Kicker";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { EmailText } from "@/components/ui/EmailText";

const path = "/contact";

export const metadata = pageMetadata({
  title: "Start a Project — Contact",
  description:
    "Tell me about your project. Custom websites, business automation, and custom software for businesses in Columbia, Lexington, Cayce, West Columbia, and nationwide.",
  path,
});

const nextSteps = [
  { title: "I read your inquiry", body: "Personally — there’s no sales team or automated sorting on the other end." },
  { title: "We talk it through", body: "I’ll reply by email to set up a conversation about your business, goals, and timeline." },
  { title: "You get a clear plan", body: "If we’re a good fit, you’ll receive an approach and proposal before any work begins." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Start a Project", path }])} />
      <PageHero
        breadcrumbs={[{ name: "Start a Project", path }]}
        kicker="Start a project"
        title={
          <>
            Let’s talk about <em className="italic text-blush">your project.</em>
          </>
        }
        intro={
          <p>
            Tell me a little about your business and what you need. Whether it’s a new website, a redesign, a smarter
            workflow, or something custom, it starts with a conversation.
          </p>
        }
        texture="cta"
      />

      <section aria-label="Project inquiry" className="section-y bg-ivory">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="space-y-14 lg:sticky lg:top-32">
              <div>
                <Kicker>What happens next</Kicker>
                <ol className="mt-8 space-y-7">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="grid grid-cols-[2.5rem_1fr]">
                      <span className="text-outline font-display text-[2rem] leading-none text-gold-deep/80">{i + 1}</span>
                      <div>
                        <h2 className="font-display text-[1.4rem] leading-tight text-ink">{s.title}</h2>
                        <p className="mt-1.5 text-[0.95rem] text-ink/68">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card-frame rounded-[4px] bg-mist p-7">
                <h2 className="kicker text-gold-deep">Prefer email?</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block font-display text-[1.25rem] leading-snug text-ink transition-colors [overflow-wrap:anywhere] hover:text-rose-deep"
                >
                  <EmailText email={site.email} />
                </a>
                <p className="mt-6 text-[0.9rem] leading-relaxed text-ink/68">
                  Serving {site.location.serviceArea.join(", ")}, and surrounding South Carolina communities — and
                  clients nationwide.
                </p>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[0.9rem] text-rose-deep underline decoration-gold/60 underline-offset-4"
                >
                  Connect on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="card-frame rounded-[4px] bg-mist px-6 py-10 shadow-[0_40px_80px_-60px_rgba(23,21,24,0.5)] sm:px-12 sm:py-14 lg:px-14">
              <h2 className="text-display-sm text-ink">Project inquiry</h2>
              <p className="mt-3 max-w-xl text-ink/65">All fields are required except phone. It takes about two minutes.</p>
              <div className="mt-10">
                <ProjectInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
