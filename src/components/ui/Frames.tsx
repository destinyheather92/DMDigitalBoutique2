import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { getImage, type ImageRef } from "@/lib/images";

/**
 * A quiet browser frame: a hairline chrome bar with the site address set in
 * mono. No traffic-light dots — just enough to read as "a live website".
 */
export function BrowserFrame({
  url,
  children,
  tone = "dark",
  className,
}: {
  url?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[6px] border shadow-[0_40px_80px_-40px_rgba(0,0,0,0.65)]",
        dark ? "border-white/12 bg-ink-2" : "border-ink/12 bg-mist",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-8 items-center gap-3 border-b px-3.5",
          dark ? "border-white/10 bg-[#211c22]" : "border-ink/10 bg-paper",
        )}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
        {url && (
          <span aria-hidden="true" className={cn("truncate font-mono text-[0.65rem] tracking-wide", dark ? "text-ivory/55" : "text-ink/68")}>
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/15 bg-[#120f12] p-[0.4rem] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.75)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.65rem] bg-ink">{children}</div>
    </div>
  );
}

/** A screenshot from the generated manifest, with blur placeholder. */
export function Shot({
  image,
  sizes,
  priority,
  className,
  quality,
}: {
  image: ImageRef;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}) {
  const img = getImage(image.key);
  return (
    <Image
      src={img.src}
      width={img.width}
      height={img.height}
      alt={image.alt}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("block h-auto w-full", className)}
    />
  );
}

/**
 * A full-page screenshot inside a fixed-ratio window that slowly scrolls
 * through the page — automatically (`auto`) or on hover/focus. Respects
 * reduced-motion preferences (stays at the top).
 */
export function ScrollShot({
  image,
  sizes,
  ratio = 10 / 16,
  mode = "hover",
  duration = 22,
  priority,
  className,
}: {
  image: ImageRef;
  sizes: string;
  /** frame height / width */
  ratio?: number;
  mode?: "auto" | "hover";
  duration?: number;
  priority?: boolean;
  className?: string;
}) {
  const img = getImage(image.key);
  const imgRatio = img.height / img.width;
  const distance = Math.max(0, (1 - ratio / imgRatio) * 100);
  return (
    <div
      className={cn("scroll-shot group/scroll relative overflow-hidden", mode === "auto" ? "is-auto" : "is-hover", className)}
      style={{ aspectRatio: `${1} / ${ratio}`, ["--scroll-distance" as string]: `-${distance.toFixed(2)}%`, ["--scroll-duration" as string]: `${duration}s` }}
    >
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={image.alt}
        sizes={sizes}
        priority={priority}
        className="scroll-shot-img absolute inset-x-0 top-0 block h-auto w-full"
      />
    </div>
  );
}
