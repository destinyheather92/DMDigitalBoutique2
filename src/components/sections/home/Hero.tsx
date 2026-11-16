import type { CSSProperties } from "react";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { Diamond } from "@/components/ui/Icons";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";
import { projects } from "@/data/projects";
import { getImage, type ImageKey } from "@/lib/images";
import { site } from "@/lib/site";
import { HeroShowcase, type ShowcaseItem } from "./HeroShowcase";

const delay = (ms: number) => ({ "--line-delay": `${ms}ms` }) as CSSProperties;
const fade = (ms: number) => ({ "--fade-delay": `${ms}ms` }) as CSSProperties;

/** Only what the client component needs — keeps the page payload small. */
function lean(key: ImageKey, alt: string) {
  const { src, width, height } = getImage(key);
  return { src, width, height, alt };
}

export function Hero() {
  const items: ShowcaseItem[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    url: p.links[0]?.href ?? site.url,
    desktop: lean(p.images.scroll.key, p.images.scroll.alt),
    mobile: lean(p.images.mobileScroll.key, p.images.mobileScroll.alt),
  }));

  return (
    <section aria-labelledby="hero-title" className="surface-ink grain relative overflow-hidden">
      <InkBackground texture="hero" mobile="heroPortrait" priority drift position="68% 40%" />
      {/* keep the headline side calm and legible */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-ink)_8%,rgb(23_21_24/0.82)_38%,rgb(23_21_24/0.15)_75%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x relative z-[2] grid min-h-[100svh] grid-cols-1 items-center gap-16 pb-28 pt-40 lg:grid-cols-12 lg:gap-6 lg:pb-32 lg:pt-48">
        <div className="lg:col-span-7 xl:col-span-7">
          <Kicker tone="light" className="fade-in" >
            Custom website &amp; software studio — {site.location.label}
          </Kicker>

          <h1 id="hero-title" className="text-display-xl mt-8 text-ivory sm:mt-10">
            <span className="line-mask"><span style={delay(120)}>Your business</span></span>
            <span className="line-mask"><span style={delay(220)}>deserves more</span></span>
            <span className="line-mask">
              <span style={delay(320)}>
                than a <em className="font-normal italic text-blush">pretty</em>
              </span>
            </span>
            <span className="line-mask"><span style={delay(420)}>website.</span></span>
          </h1>

          <p className="text-lede fade-in mt-9 max-w-[34rem] text-ivory/72" style={fade(650)}>
            Custom websites and smarter digital solutions built to help your business stand out, connect with
            customers, and work more efficiently.
          </p>

          <div className="fade-in mt-11 flex flex-wrap items-center gap-x-9 gap-y-6" style={fade(800)}>
            <ButtonLink href="/contact">Start Your Project</ButtonLink>
            <LineLink href="/portfolio" className="text-[0.95rem] text-ivory">
              Explore My Work
            </LineLink>
          </div>
        </div>

        <div className="fade-in lg:col-span-5 lg:-mr-4 xl:-mr-10" style={fade(450)}>
          <HeroShowcase items={items} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2] hidden border-t border-white/10 md:block">
        <div className="container-x kicker flex h-14 items-center gap-5 text-ivory/60">
          <span>Websites</span>
          <Diamond className="text-gold/70" />
          <span>Automation</span>
          <Diamond className="text-gold/70" />
          <span>Custom software</span>
          <span className="ml-auto hidden lg:inline">
            {site.location.serviceArea.join(" · ")} — &amp; remote, nationwide
          </span>
        </div>
      </div>
    </section>
  );
}
