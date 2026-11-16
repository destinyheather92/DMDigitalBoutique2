import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * The original DM Digital Boutique logo, displayed exactly as designed.
 * Its wordmark is charcoal on a transparent background, so it always sits
 * on a light surface — see LogoCard for use over dark sections.
 */
export function Logo({ className, priority, sizes = "200px" }: { className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src={site.logo.src}
      width={site.logo.width}
      height={site.logo.height}
      alt={site.logo.alt}
      priority={priority}
      sizes={sizes}
      quality={90}
      className={cn("h-auto w-full select-none", className)}
    />
  );
}

/**
 * The logo on an ivory card with a fine gold inset border — a nod to the
 * business cards, and the brand's home over dark, smoky sections.
 */
export function LogoCard({
  className,
  logoClassName,
  priority,
  sizes,
}: {
  className?: string;
  logoClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("card-frame flex items-center justify-center rounded-[3px] bg-ivory", className)}>
      <Logo priority={priority} sizes={sizes} className={logoClassName} />
    </div>
  );
}
