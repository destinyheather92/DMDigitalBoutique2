import { ButtonLink } from "@/components/ui/Button";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { websiteBenefits } from "@/data/services";

export function MoreThanAWebsite() {
  return (
    <section aria-labelledby="more-title" className="section-y grain grain-light cv-auto relative isolate overflow-clip bg-blush-pale">
      <InkBackground texture="blush" position="left center" />

      <div className="container-x relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36" data-reveal>
            <Kicker>More than a website</Kicker>
            <h2 id="more-title" className="text-display-lg mt-7 text-ink">
              A website should pull its <em className="italic text-rose-deep">weight.</em>
            </h2>
            <p className="text-lede mt-8 max-w-md text-ink/72">
              Plenty of websites just sit there looking nice. Yours should be working — answering questions,
              collecting requests, and handling the small, repetitive tasks that eat your day.
            </p>
            <ButtonLink href="/contact" variant="ink" className="mt-10">
              Talk through your project
            </ButtonLink>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {websiteBenefits.map((b, i) => (
            <li
              key={b.title}
              className="group grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ink/15 py-8 last:border-b sm:grid-cols-[4.5rem_1fr]"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
            >
              <span className="kicker pt-2 text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[1.6rem] leading-tight text-ink transition-colors duration-500 group-hover:text-rose-deep sm:text-[1.9rem]">
                  {b.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-ink/70">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
