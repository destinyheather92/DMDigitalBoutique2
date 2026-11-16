import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/lib/site";
import { EmailText } from "@/components/ui/EmailText";

/**
 * The closing invitation used at the bottom of every page: smoke rising
 * through deep ink, framed by a fine gold border like the business card.
 */
export function ClosingCta({
  kicker = "Let’s talk",
  title,
  body,
  cta = "Let’s Talk About Your Project",
}: {
  kicker?: string;
  title?: ReactNode;
  body?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="surface-ink grain cv-auto relative overflow-hidden">
      <InkBackground texture="cta" position="30% 70%" drift />
      <div className="relative z-[2] p-3 sm:p-5">
        <div className="relative rounded-[4px] border border-gold/35">
          <div className="container-x py-24 sm:py-32 lg:py-44">
            <div className="max-w-5xl" data-reveal>
              <Kicker tone="light">{kicker}</Kicker>
              <h2 id="cta-title" className="text-display-xl mt-8 text-ivory">
                {title ?? (
                  <>
                    Let’s build something your business can <em className="italic text-blush">actually use.</em>
                  </>
                )}
              </h2>
            </div>
            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal style={{ ["--reveal-delay" as string]: "140ms" }}>
              <p className="text-lede max-w-xl text-ivory/72 lg:col-span-6">
                {body ??
                  "Whether you need a website that brings in customers or a custom system that makes your work easier, let’s talk about what makes sense for your business."}
              </p>
              <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8 lg:items-end">
                <ButtonLink href="/contact">{cta}</ButtonLink>
                <p className="text-sm text-ivory/55">
                  or email{" "}
                  <a href={`mailto:${site.email}`} className="text-ivory/85 underline decoration-gold/60 underline-offset-4 transition-colors hover:text-petal">
                    <EmailText email={site.email} />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
