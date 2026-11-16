import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";

const textures = {
  hero: { src: "/textures/ink-hero.webp", width: 2400, height: 1500 },
  heroPortrait: { src: "/textures/ink-hero-portrait.webp", width: 1000, height: 1800 },
  section: { src: "/textures/ink-section.webp", width: 2400, height: 1400 },
  cta: { src: "/textures/ink-cta.webp", width: 2400, height: 1400 },
  light: { src: "/textures/ink-light.webp", width: 2400, height: 1500 },
  blush: { src: "/textures/ink-blush.webp", width: 2400, height: 1500 },
  plume: { src: "/textures/ink-plume.webp", width: 1000, height: 1000 },
} as const;

export type Texture = keyof typeof textures;

/**
 * Full-bleed smoky ink texture behind a section. Decorative only (empty alt).
 * Pass `mobile` to art-direct a different composition below 768px.
 */
export function InkBackground({
  texture,
  mobile,
  className,
  imgClassName,
  position = "center",
  priority,
  drift,
}: {
  texture: Texture;
  mobile?: Texture;
  className?: string;
  imgClassName?: string;
  position?: string;
  priority?: boolean;
  drift?: boolean;
}) {
  const t = textures[texture];
  const common = { alt: "", sizes: "100vw", quality: 85, priority } as const;
  const desktop = getImageProps({ ...common, ...t });
  const m = mobile ? getImageProps({ ...common, ...textures[mobile] }) : null;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <picture>
        {m && <source media="(max-width: 767px)" srcSet={m.props.srcSet} sizes="100vw" />}
        <source media={m ? "(min-width: 768px)" : "all"} srcSet={desktop.props.srcSet} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative; alt="" is in props */}
        <img
          {...desktop.props}
          className={cn("h-full w-full object-cover", drift && "ink-drift", imgClassName)}
          style={{ objectPosition: position }}
        />
      </picture>
    </div>
  );
}
