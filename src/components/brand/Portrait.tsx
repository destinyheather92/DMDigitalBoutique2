import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Destiny's professional headshot, framed with an offset gold hairline.
 * Pair with <Smoke> placed outside any reveal wrapper for the plume behind it.
 */
export function Portrait({ className, priority, sizes = "(min-width: 1024px) 34vw, 80vw" }: { className?: string; priority?: boolean; sizes?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[3px] border border-gold/60 sm:translate-x-6 sm:translate-y-6" />
      <div className="relative overflow-hidden rounded-[3px] bg-smoke">
        <Image
          src="/images/destiny-mills-headshot.webp"
          width={1254}
          height={1254}
          alt={`${site.founder}, founder and developer of ${site.name}`}
          sizes={sizes}
          priority={priority}
          quality={90}
          className="aspect-[4/5] h-auto w-full object-cover object-[50%_30%]"
        />
      </div>
    </figure>
  );
}
