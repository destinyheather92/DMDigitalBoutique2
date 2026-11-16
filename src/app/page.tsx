import { JsonLd } from "@/components/seo/JsonLd";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Hero } from "@/components/sections/home/Hero";
import { MeetTheDeveloper } from "@/components/sections/home/MeetTheDeveloper";
import { MoreThanAWebsite } from "@/components/sections/home/MoreThanAWebsite";
import { WhatIBuild } from "@/components/sections/home/WhatIBuild";
import { AlsoAvailable } from "@/components/sections/shared/AlsoAvailable";
import { ClosingCta } from "@/components/sections/shared/ClosingCta";
import { Process } from "@/components/sections/shared/Process";
import { businessSchema, pageMetadata, personSchema, websiteSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "DM Digital Boutique | Custom Websites & Business Software in Columbia, SC",
  absoluteTitle: true,
  description:
    "Custom websites, business automation, and custom software for small businesses in Columbia, Lexington, and across South Carolina. Designed and built by full-stack developer Destiny Mills.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[businessSchema(), websiteSchema(), personSchema()]} />
      <Hero />
      <WhatIBuild />
      <FeaturedWork />
      <MoreThanAWebsite />
      <MeetTheDeveloper />
      <Process />
      <AlsoAvailable />
      <ClosingCta />
    </>
  );
}
