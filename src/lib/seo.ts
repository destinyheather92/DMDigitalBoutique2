import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

type PageSeo = {
  /** Used inside the "%s | DM Digital Boutique" template */
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  /** Skip the title template (homepage) */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

const defaultImage = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "DM Digital Boutique — custom websites and digital solutions",
};

export function pageMetadata({ title, description, path, image, absoluteTitle, noindex }: PageSeo): Metadata {
  const img = image ?? defaultImage;
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ------------------------------------------------------------ structured data
const orgId = `${site.url}/#business`;
const personId = `${site.url}/#founder`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl(site.logo.src),
    image: absoluteUrl("/images/og-default.jpg"),
    description: site.description,
    email: site.email,
    founder: { "@id": personId },
    areaServed: [
      ...site.location.serviceArea.map((city) => ({
        "@type": "City",
        name: `${city}, SC`,
      })),
      { "@type": "State", name: "South Carolina" },
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: [
      "Custom website design",
      "Website development",
      "Responsive web design",
      "On-page SEO",
      "Business workflow automation",
      "Custom software development",
      "Client portals",
      "Web applications",
    ],
    sameAs: [site.social.linkedin, site.social.github],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.founder,
    jobTitle: "Founder & Full-Stack Developer",
    worksFor: { "@id": orgId },
    image: absoluteUrl("/images/destiny-mills-headshot.webp"),
    url: absoluteUrl("/about"),
    sameAs: [site.social.linkedin, site.social.github],
    knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Web development", "Workflow automation"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { "@id": orgId },
    areaServed: [
      ...site.location.serviceArea.map((city) => ({ "@type": "City", name: `${city}, SC` })),
      { "@type": "Country", name: "United States" },
    ],
  };
}

export function caseStudySchema({ name, description, path, image, year }: { name: string; description: string; path: string; image: string; year: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${name} — case study`,
    headline: name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    dateCreated: year,
    creator: { "@id": orgId },
    author: { "@id": personId },
  };
}
