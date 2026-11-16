"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoCard } from "@/components/brand/Logo";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { contactCta, primaryNav, site } from "@/lib/site";
import { EmailText } from "@/components/ui/EmailText";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 32));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-gold/15 bg-ink/88 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* The logo card hangs from the top edge, then tucks into the bar on scroll */}
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className={cn(
            "relative -mt-px self-start origin-top-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "scale-[0.64] lg:scale-[0.58]" : "scale-100",
          )}
        >
          <LogoCard
            priority
            sizes="(min-width: 1024px) 150px, 112px"
            className="w-[7.75rem] rounded-t-none px-3 pb-3.5 pt-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] before:inset-[5px] lg:w-[10.5rem] lg:px-4 lg:pb-5 lg:pt-6 lg:before:inset-[7px]"
            logoClassName="w-full"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative px-3.5 py-2 text-[0.8125rem] font-medium tracking-[0.06em] transition-colors duration-300",
                  active ? "text-petal" : "text-ivory/78 hover:text-ivory",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
          <Link
            href={contactCta.href}
            className="btn btn-outline-light ml-5 min-h-[2.75rem] px-5 py-3 text-[0.72rem]"
          >
            <span>{contactCta.label}</span>
            <ArrowRight className="btn-arrow" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={openMenu}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="-mr-2 flex h-11 items-center gap-3 px-2 text-ivory lg:hidden"
        >
          <span className="kicker text-[0.68rem]">Menu</span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
            <span className="h-px w-full bg-ivory" />
            <span className="ml-auto h-px w-4 bg-gold" />
          </span>
        </button>
      </div>

      <dialog
        id="site-menu"
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setMenuOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
        className="mobile-menu m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-ink p-0 text-ivory lg:hidden"
      >
        <div className="relative isolate flex min-h-dvh flex-col">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[url('/textures/ink-hero-portrait.webp')] bg-cover bg-bottom opacity-80"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
          <div className="container-x flex h-[var(--header-h)] items-center justify-between">
            <span className="kicker text-petal">{site.name}</span>
            <button
              type="button"
              onClick={closeMenu}
              className="-mr-2 flex h-11 items-center gap-3 px-2"
              autoFocus
            >
              <span className="kicker text-[0.68rem]">Close</span>
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-ivory" />
                <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-gold" />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x mt-6 flex-1">
            <ol className="border-t border-white/10">
              {[{ label: "Home", href: "/" }, ...primaryNav].map((item, i) => (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-baseline gap-5 py-4"
                  >
                    <span className="font-mono text-[0.68rem] text-gold">{String(i).padStart(2, "0")}</span>
                    <span className="font-display text-[2.1rem] leading-none tracking-tight aria-[current=page]:text-petal">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="container-x pb-10 pt-10">
            <Link href={contactCta.href} onClick={closeMenu} className="btn btn-primary w-full">
              <span>{contactCta.label}</span>
              <ArrowRight className="btn-arrow" />
            </Link>
            <a href={`mailto:${site.email}`} className="mt-6 block text-center text-sm text-ivory/70">
              <EmailText email={site.email} />
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
