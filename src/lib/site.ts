/**
 * Business facts in one place. Everything here is verified information —
 * update it here and it changes everywhere (header, footer, metadata,
 * structured data, contact page).
 */
export const site = {
  name: "DM Digital Boutique",
  legalName: "DM Digital Boutique",
  founder: "Destiny Mills",
  tagline: "Custom websites and smarter digital solutions",
  description:
    "DM Digital Boutique builds custom websites, business automation, and custom software for small and medium-sized businesses in Columbia, Lexington, and across South Carolina — and remotely nationwide.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmdigitalboutique.com").replace(/\/$/, ""),
  email: "dhmills292@gmail.com",
  locale: "en_US",
  location: {
    label: "Columbia, SC",
    region: "South Carolina",
    serviceArea: ["Columbia", "Lexington", "Cayce", "West Columbia"],
    /** Used in a couple of editorial details. Columbia, SC city center. */
    coordinates: "34.0007° N, 81.0348° W",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/destinyhmills225/",
    github: "https://github.com/destinyheather92",
  },
  logo: {
    src: "/logos/dm-digital-boutique-logo.png",
    width: 619,
    height: 383,
    alt: "DM Digital Boutique",
  },
} as const;

export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Websites", href: "/website-development", description: "Custom website design & development" },
  { label: "Automation", href: "/business-automation", description: "Workflows that cut the busywork" },
  { label: "Software", href: "/custom-software", description: "Portals, dashboards & web apps" },
  { label: "Work", href: "/portfolio", description: "Case studies from real projects" },
  { label: "About", href: "/about", description: "Meet the developer" },
];

export const contactCta: NavItem = { label: "Start a Project", href: "/contact" };

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
