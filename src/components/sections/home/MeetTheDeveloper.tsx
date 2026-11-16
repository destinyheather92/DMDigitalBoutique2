import { Portrait } from "@/components/brand/Portrait";
import { LineLink } from "@/components/ui/Button";
import { Smoke } from "@/components/ui/Smoke";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/lib/site";

const facts = [
  { term: "Works with", detail: "Small & mid-sized businesses, contractors, practices, and service providers" },
  { term: "Serving", detail: `${site.location.serviceArea.join(", ")}, SC — and remote, nationwide` },
  { term: "Builds with", detail: "Next.js, React, TypeScript, Node.js, PostgreSQL" },
];

export function MeetTheDeveloper() {
  return (
    <section aria-labelledby="meet-title" className="surface-ink grain section-y cv-auto relative overflow-hidden">
      <InkBackground texture="section" position="right bottom" />
      {/* direct child of the section so it blends with the texture beneath */}
      <Smoke className="left-1/2 top-0 aspect-square w-[140%] -translate-x-1/2 lg:left-[-4%] lg:top-1/2 lg:w-[52%] lg:-translate-x-0 lg:-translate-y-1/2" />
      <div className="container-x relative z-[2] grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none lg:pr-10" data-reveal="scale">
          <Portrait />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <Kicker tone="light">Meet the developer</Kicker>
            <h2 id="meet-title" className="text-display-lg mt-7 text-ivory">
              Hi, I’m <em className="italic text-blush">Destiny.</em>
            </h2>
          </div>
          <div className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-ivory/72" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
            <p>
              I’m the full-stack developer behind DM Digital Boutique. When you work with me, you’re working with the
              person who designs your site, writes the code, and answers your emails — no account managers, no
              hand-offs, no getting passed around.
            </p>
            <p>
              I build everything from business websites to client portals and custom web applications. Before I wrote
              code, I worked in legal support, so I know firsthand how much time disappears into paperwork and
              confusing systems. That’s a big part of why I care about building things that are genuinely easy to use.
            </p>
          </div>

          <blockquote className="mt-10 border-l border-gold/70 pl-6" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
            <p className="font-display text-[1.6rem] italic leading-snug text-petal sm:text-[1.9rem]">
              You’ll always know exactly who’s building your website.
            </p>
          </blockquote>

          <dl className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3" data-reveal style={{ ["--reveal-delay" as string]: "240ms" }}>
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="kicker text-gold">{f.term}</dt>
                <dd className="mt-2 text-[0.92rem] leading-snug text-ivory/70">{f.detail}</dd>
              </div>
            ))}
          </dl>

          <LineLink href="/about" className="mt-12 text-ivory">
            More about me
          </LineLink>
        </div>
      </div>
    </section>
  );
}
