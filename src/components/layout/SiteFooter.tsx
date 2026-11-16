import Link from "next/link";
import { LogoCard } from "@/components/brand/Logo";
import { Diamond } from "@/components/ui/Icons";
import { contactCta, primaryNav, site } from "@/lib/site";
import { EmailText } from "@/components/ui/EmailText";

const serviceLinks = primaryNav.slice(0, 3);
const studioLinks = [...primaryNav.slice(3), contactCta, { label: "Privacy", href: "/privacy" }];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-ink grain cv-auto relative overflow-hidden border-t border-gold/15">
      <div className="container-x relative z-[2] pb-10 pt-20 lg:pt-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* The business card */}
          <div className="lg:col-span-5">
            <LogoCard
              sizes="(min-width: 1024px) 260px, 220px"
              className="aspect-[1.75/1] w-full max-w-[22rem] px-[18%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] -rotate-[1.25deg]"
            />
            <p className="mt-10 max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">
              Custom websites, business automation, and software — designed and built by {site.founder} for
              businesses in {site.location.label} and anywhere with an internet connection.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1fr_1.8fr] lg:col-span-7 lg:pt-4">
            <FooterColumn title="Services" links={serviceLinks} />
            <FooterColumn title="Studio" links={studioLinks} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="kicker mb-5 text-gold">Say hello</h2>
              <ul className="space-y-3 text-[0.95rem]">
                <li>
                  <a href={`mailto:${site.email}`} className="text-[0.9rem] text-ivory/85 transition-colors [overflow-wrap:anywhere] hover:text-petal">
                    <EmailText email={site.email} />
                  </a>
                </li>
                <li>
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-ivory/70 transition-colors hover:text-petal">
                    LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="text-ivory/70 transition-colors hover:text-petal">
                    GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
              <p className="mt-8 text-[0.85rem] leading-relaxed text-ivory/55">
                Serving {site.location.serviceArea.join(", ")} and the surrounding South Carolina communities — and
                clients nationwide.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.75rem] text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3 font-mono tracking-wider">
            <span>{site.location.coordinates}</span>
            <Diamond className="text-gold/70" />
            <span>Designed &amp; developed in-house</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="kicker mb-5 text-gold">{title}</h2>
      <ul className="space-y-3 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ivory/75 transition-colors hover:text-petal">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
