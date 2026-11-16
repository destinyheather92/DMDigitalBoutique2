import type { Metadata } from "next";
import { ButtonLink, LineLink } from "@/components/ui/Button";
import { InkBackground } from "@/components/ui/InkBackground";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="surface-ink grain relative flex min-h-[100svh] items-center overflow-hidden">
      <InkBackground texture="cta" mobile="heroPortrait" priority drift />
      <div className="container-x relative z-[2] py-40">
        <Kicker tone="light">Error 404</Kicker>
        <h1 className="text-display-xl mt-8 max-w-4xl text-ivory">
          This page drifted off <em className="italic text-blush">like smoke.</em>
        </h1>
        <p className="text-lede mt-8 max-w-xl text-ivory/70">
          The link may be old, or the address may have a typo. Everything else is right where you left it.
        </p>
        <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-6">
          <ButtonLink href="/">Back to home</ButtonLink>
          <LineLink href="/portfolio" className="text-ivory">
            See my work
          </LineLink>
          <LineLink href="/contact" className="text-ivory">
            Start a project
          </LineLink>
        </div>
      </div>
    </section>
  );
}
