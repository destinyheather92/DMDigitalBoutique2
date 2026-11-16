import { LineLink } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/ui/Frames";
import { Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { WorkflowLine } from "@/components/ui/WorkflowLine";
import { primaryServices } from "@/data/services";

export function WhatIBuild() {
  const [websites, automation, software] = primaryServices;

  return (
    <section aria-labelledby="build-title" className="section-y cv-auto relative overflow-hidden bg-ivory">
      <div className="container-x">
        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Kicker>What I build</Kicker>
            <h2 id="build-title" className="text-display-lg mt-7 text-ink">
              Good design gets attention. Smart development makes it <em className="italic text-rose-deep">useful.</em>
            </h2>
          </div>
          <p className="text-lede text-ink/70 lg:col-span-4 lg:col-start-9" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            Every project starts with how your business actually runs. Then I design and build around that — not
            around whatever a template happens to allow.
          </p>
        </div>

        {/* 01 — Websites: the flagship, given the most room */}
        <article className="mt-24 grid items-center gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5" data-reveal>
            <p className="text-outline font-display text-[5.5rem] leading-none text-gold-deep/70 lg:text-[7rem]" aria-hidden="true">
              {websites.index}
            </p>
            <h3 className="text-display-md mt-4 text-ink">{websites.headline}</h3>
            <p className="mt-6 max-w-md text-ink/72">{websites.summary}</p>
            <ul className="mt-8 grid max-w-md grid-cols-1 gap-x-6 gap-y-3 xs:grid-cols-2">
              {websites.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[0.92rem] text-ink/80">
                  <Diamond className="shrink-0 text-gold" />
                  {h}
                </li>
              ))}
            </ul>
            <LineLink href={websites.href} className="mt-10 text-ink">
              Explore {websites.linkLabel.toLowerCase()}
            </LineLink>
          </div>

          <div className="relative lg:col-span-7 lg:pl-6" data-reveal="scale">
            <div className="relative pb-[14%] pr-[16%]">
              <BrowserFrame url="fort-jackson-eye-care.vercel.app" tone="light" className="parallax-slow">
                <Shot
                  image={{ key: "fort-jackson-desktop", alt: "Fort Jackson Eye Center homepage" }}
                  sizes="(min-width: 1024px) 48vw, 90vw"
                />
              </BrowserFrame>
              <PhoneFrame className="absolute bottom-0 right-0 w-[30%]">
                <Shot image={{ key: "hoffman-mobile", alt: "Hoffman HVAC homepage on a phone" }} sizes="(min-width: 1024px) 15vw, 30vw" />
              </PhoneFrame>
            </div>
          </div>
        </article>

        {/* 02 + 03 — offset pair, two different materials */}
        <div className="mt-24 grid gap-8 lg:mt-36 lg:grid-cols-12 lg:gap-8">
          <article className="relative isolate overflow-hidden rounded-[4px] bg-blush-pale p-8 sm:p-12 lg:col-span-5 lg:mt-28" data-reveal>
            <InkBackground texture="blush" position="left center" />
            <p className="text-outline font-display text-[4.5rem] leading-none text-rose-deep/70" aria-hidden="true">
              {automation.index}
            </p>
            <h3 className="text-display-sm mt-4 text-ink">{automation.headline}</h3>
            <p className="mt-5 text-ink/72">{automation.summary}</p>
            <div className="mt-10 border-t border-rose/25 pt-8">
              <p className="kicker mb-6 text-rose-deep">For example: a new quote request</p>
              <WorkflowLine
                orientation="vertical"
                steps={[
                  { label: "A customer submits the form" },
                  { label: "You get an instant notification" },
                  { label: "They get a confirmation email" },
                  { label: "It’s logged for follow-up" },
                ]}
              />
            </div>
            <LineLink href={automation.href} className="mt-10 text-ink">
              Explore {automation.linkLabel.toLowerCase()}
            </LineLink>
          </article>

          <article className="surface-ink grain relative overflow-hidden rounded-[4px] p-8 sm:p-12 lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "150ms" }}>
            <InkBackground texture="section" position="right bottom" />
            <div className="relative z-[2]">
              <p className="text-outline font-display text-[4.5rem] leading-none text-gold/80" aria-hidden="true">
                {software.index}
              </p>
              <h3 className="text-display-sm mt-4 text-ivory">{software.headline}</h3>
              <p className="mt-5 max-w-lg text-ivory/70">{software.summary}</p>
              <p className="mt-10 font-display text-[1.65rem] italic leading-[1.35] text-petal sm:text-[2rem]">
                {software.highlights.map((h, i) => (
                  <span key={h}>
                    {h}
                    {i < software.highlights.length - 1 && <Diamond className="mx-3 inline-block -translate-y-1 text-gold not-italic" />}
                  </span>
                ))}
              </p>
              <div className="mt-12 grid items-end gap-8 sm:grid-cols-[1fr_auto]">
                <BrowserFrame url="casecompassai.com" className="max-w-md">
                  <Shot image={{ key: "casecompass-desktop", alt: "CaseCompass AI web application homepage" }} sizes="(min-width: 1024px) 28vw, 80vw" />
                </BrowserFrame>
                <LineLink href={software.href} className="text-ivory">
                  Explore {software.linkLabel.toLowerCase()}
                </LineLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
