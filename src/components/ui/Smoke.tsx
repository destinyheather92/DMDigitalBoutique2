import { cn } from "@/lib/cn";

/**
 * A curl of smoke for dark sections. The texture sits on an ink base and uses
 * `lighten` blending, so keep it outside elements that animate opacity or
 * transform (they would isolate the blend while animating).
 */
export function Smoke({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bg-[url('/textures/ink-plume.webp')] bg-contain bg-center bg-no-repeat mix-blend-lighten",
        className,
      )}
    />
  );
}
