import { BrowserFrame, PhoneFrame, Shot } from "@/components/ui/Frames";
import type { ImageRef } from "@/lib/images";

/** A desktop screenshot with a phone screenshot overlapping its corner. */
export function ScreenStack({
  desktop,
  mobile,
  url,
  priority,
}: {
  desktop: ImageRef;
  mobile: ImageRef;
  url?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative pb-[14%] pl-[14%]">
      <BrowserFrame url={url}>
        <Shot image={desktop} sizes="(min-width: 1024px) 36vw, 86vw" priority={priority} />
      </BrowserFrame>
      <PhoneFrame className="absolute bottom-0 left-0 w-[29%]">
        <Shot image={mobile} sizes="(min-width: 1024px) 11vw, 26vw" />
      </PhoneFrame>
    </div>
  );
}
