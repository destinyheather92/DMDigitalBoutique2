import { PageHero } from "@/components/sections/shared/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { EmailText } from "@/components/ui/EmailText";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How DM Digital Boutique handles the information you share through this website.",
  path: "/privacy",
});

/*
 * Plain-language summary of what this website actually does with data.
 * If you add analytics, a newsletter, or other tools, update this page.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Privacy", path: "/privacy" }]}
        kicker="Privacy"
        title={
          <>
            Your information, <em className="italic text-blush">handled with care.</em>
          </>
        }
        intro={<p>A plain-language summary of what this website collects and how it’s used.</p>}
        texture="section"
      />
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div className="max-w-2xl space-y-12 text-[1.05rem] leading-relaxed text-ink/75">
            <div>
              <h2 className="text-display-sm text-ink">What’s collected</h2>
              <p className="mt-4">
                When you send a project inquiry, the form collects the details you choose to share: your name, business
                name, email address, phone number (optional), the service you’re interested in, your budget range, and
                your project description. Basic technical information, such as your IP address, is used to protect the
                form from spam and abuse.
              </p>
            </div>
            <div>
              <h2 className="text-display-sm text-ink">How it’s used</h2>
              <p className="mt-4">
                Your inquiry is delivered by email to {site.name} so I can reply to you about your project. It isn’t
                sold, rented, or shared for marketing. Email delivery is handled by a third-party email service
                provider.
              </p>
            </div>
            <div>
              <h2 className="text-display-sm text-ink">Cookies & analytics</h2>
              {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
                <p className="mt-4">
                  This website uses Google Analytics to understand, in aggregate, how visitors find and use the site —
                  for example, which pages are viewed. It doesn’t use advertising cookies, and analytics data isn’t
                  used to identify you personally.
                </p>
              ) : (
                <p className="mt-4">
                  This website doesn’t use analytics or advertising cookies. If analytics are added in the future, this
                  page will explain what’s measured.
                </p>
              )}
            </div>
            <div>
              <h2 className="text-display-sm text-ink">Questions or requests</h2>
              <p className="mt-4">
                To ask about or remove information you’ve sent, email{" "}
                <a href={`mailto:${site.email}`} className="text-rose-deep underline decoration-gold/60 underline-offset-4 [overflow-wrap:anywhere]">
                  <EmailText email={site.email} />
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
