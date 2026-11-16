"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
type ImageAsset = { src: string; width: number; height: number };

export type ShowcaseItem = {
  slug: string;
  name: string;
  category: string;
  url: string;
  desktop: ImageAsset & { alt: string };
  mobile: ImageAsset & { alt: string };
};

const INTERVAL = 9000;
/** How many screens of each site to scroll through in the hero. */
const SCREENS = 2.6;
const FRAME_RATIO = 0.68; // browser viewport height / width
const PHONE_RATIO = 2.05;

function scrollDistance(img: ImageAsset, ratio: number) {
  const imgRatio = img.height / img.width;
  const full = 1 - ratio / imgRatio;
  const limited = ((SCREENS - 1) * ratio) / imgRatio;
  return `-${(Math.max(0, Math.min(full, limited)) * 100).toFixed(2)}%`;
}

export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // user toggled
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const running = !paused && !hovering && !reduced;

  const next = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (!running) return;
    timer.current = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(timer.current);
  }, [active, running, next]);

  useEffect(() => {
    const onVisibility = () => setHovering(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const current = items[active];
  // Mount images lazily: the current project, the next one, and any already seen.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]));
  const mounted = (i: number) => seen.has(i) || i === active || i === (active + 1) % items.length;
  useEffect(() => {
    const t = window.setTimeout(() => {
      setSeen((s) => (s.has(active) && s.has((active + 1) % items.length) ? s : new Set([...s, active, (active + 1) % items.length])));
    }, 0);
    return () => window.clearTimeout(t);
  }, [active, items.length]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className="relative pb-[12%] pl-[9%] sm:pl-[12%] lg:pl-[14%]">
        {/* Browser */}
        <Link
          href={`/portfolio/${current.slug}`}
          className="group relative block overflow-hidden rounded-[6px] border border-white/14 bg-ink-2 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)]"
        >
          <span className="sr-only">View the {current.name} case study.</span>
          <div className="flex h-8 items-center gap-3 border-b border-white/10 bg-[#211c22] px-3.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="truncate font-mono text-[0.65rem] tracking-wide text-ivory/55" aria-hidden="true">
              {current.url.replace(/^https?:\/\//, "")}
            </span>
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: `1 / ${FRAME_RATIO}` }}>
            {items.map((item, i) => (
              <div
                key={item.slug}
                aria-hidden={i !== active}
                className={cn(
                  "scroll-shot absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                  i === active ? "is-auto opacity-100" : "opacity-0",
                )}
                style={{
                  ["--scroll-distance" as string]: scrollDistance(item.desktop, FRAME_RATIO),
                  ["--scroll-duration" as string]: `${INTERVAL / 1000 + 3}s`,
                }}
              >
                {mounted(i) && <Image
                  src={item.desktop.src}
                  width={item.desktop.width}
                  height={item.desktop.height}
                  alt={i === active ? item.desktop.alt : ""}
                  sizes="(min-width: 1024px) 36vw, 88vw"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  className="scroll-shot-img absolute inset-x-0 top-0 h-auto w-full"
                />}
              </div>
            ))}
          </div>
        </Link>

        {/* Phone */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[30%] min-w-[6.5rem] rounded-[1.6rem] border border-white/15 bg-[#120f12] p-[0.3rem] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.85)] sm:w-[27%]"
        >
          <div className="relative overflow-hidden rounded-[1.35rem] bg-ink" style={{ aspectRatio: `1 / ${PHONE_RATIO}` }}>
            {items.map((item, i) => (
              <div
                key={item.slug}
                className={cn(
                  "scroll-shot absolute inset-0 transition-opacity duration-1000",
                  i === active ? "is-auto opacity-100" : "opacity-0",
                )}
                style={{
                  ["--scroll-distance" as string]: scrollDistance(item.mobile, PHONE_RATIO),
                  ["--scroll-duration" as string]: `${INTERVAL / 1000 + 3}s`,
                }}
              >
                {mounted(i) && <Image
                  src={item.mobile.src}
                  width={item.mobile.width}
                  height={item.mobile.height}
                  alt=""
                  sizes="(min-width: 1024px) 11vw, 30vw"
                  loading="lazy"
                  className="scroll-shot-img absolute inset-x-0 top-0 h-auto w-full"
                />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caption + controls */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pl-[12%] lg:pl-[14%]">
        <div aria-live="polite" className="min-w-0 flex-1">
          <p className="kicker text-gold">
            Now showing <span className="text-ivory/50">— {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </p>
          <p className="mt-2 font-display text-[1.35rem] leading-tight text-ivory sm:text-2xl">
            <Link href={`/portfolio/${current.slug}`} className="transition-colors hover:text-petal">
              {current.name}
            </Link>
          </p>
          <p className="mt-1 text-sm text-ivory/55">{current.category}</p>
        </div>

        <div className="-ml-1.5 flex shrink-0 items-center gap-1 sm:ml-0">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${item.name}`}
              aria-current={i === active ? "true" : undefined}
              className="group relative flex h-11 w-9 items-center justify-center"
            >
              <span className="absolute inset-x-1.5 top-1/2 h-px bg-white/20" />
              <span
                key={`${active}-${running}`}
                className={cn(
                  "absolute inset-x-1.5 top-1/2 h-px origin-left bg-gold",
                  i < active && "scale-x-100",
                  i > active && "scale-x-0",
                  i === active && (running ? "animate-[progress_9s_linear_both]" : "scale-x-100"),
                )}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play showcase" : "Pause showcase"}
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
          >
            {paused ? (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                <path d="M0 0l10 6-10 6z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                <path d="M0 0h3v12H0zM7 0h3v12H7z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
