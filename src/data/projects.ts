import type { ImageRef } from "@/lib/images";

/**
 * Portfolio case studies. Every detail below comes from the actual project
 * source code, READMEs and live sites — no invented metrics, testimonials
 * or outcomes. Add a project by adding an entry; its page is generated.
 */
export type Project = {
  slug: string;
  name: string;
  /** Short label shown on cards, e.g. "Medical practice website" */
  category: string;
  industry: string;
  location?: string;
  year: string;
  /** One sentence, used on cards and in metadata */
  summary: string;
  overview: string[];
  challenge: string[];
  solution: string[];
  features: string[];
  tech: string[];
  /** What DM Digital Boutique did on the project */
  scope: string[];
  links: { label: string; href: string }[];
  images: {
    hero: ImageRef;
    mobile: ImageRef;
    scroll: ImageRef;
    mobileScroll: ImageRef;
    gallery: ImageRef[];
  };
  /** A candid note shown on the case study, when useful */
  note?: string;
  /** Services this project demonstrates (used to cross-link service pages) */
  services: Array<"websites" | "automation" | "software">;
};

export const projects: Project[] = [
  {
    slug: "fort-jackson-eye-center",
    name: "Fort Jackson Eye Center",
    category: "Medical practice website",
    industry: "Eye care / optometry",
    location: "Columbia, SC",
    year: "2026",
    summary:
      "A calm, trustworthy multi-page website for an independent eye care practice serving military families, retirees, and civilians.",
    overview: [
      "Fort Jackson Eye Center is an independent eye care practice in Columbia, SC that sees patients of all ages — infants through senior adults — including military families, retirees, and civilians.",
      "The practice needed a website that explains its services in plain language, introduces the doctor and staff, and gets patients to the right place to book an appointment.",
    ],
    challenge: [
      "Patients needed clear answers quickly: what the practice offers, who they’ll see, how to get there (including the visitor process for patients coming from off post), and how to book.",
      "Scheduling already ran through the practice’s secure EHR portal. The website had to send patients there without collecting any health information itself — and every page needed to be easy for search engines to find and understand.",
    ],
    solution: [
      "I designed and built a six-page site — Home, About, Services, Meet the Team, Eye Health, and Contact, plus a custom 404 — in React and TypeScript. Each page is prerendered to static HTML with its own title, description, and content, so it loads quickly and reads cleanly to search engines.",
      "Every “Schedule an Appointment” button opens the practice’s existing secure scheduling portal. Office details live in a single configuration file, so changing hours or a phone number is a one-line update that flows to the header, footer, contact page, and structured data at once.",
    ],
    features: [
      "Prerendered pages with unique titles and meta descriptions",
      "Scheduling buttons connected to the practice’s secure EHR portal",
      "Click-to-call phone links and a Google Maps embed with directions",
      "Structured data for search engines, generated from verified practice details",
      "Team profiles and a visitor-access note for patients coming from off post",
      "An image pipeline that resizes photos and strips metadata like GPS location",
      "One source of truth for office info, services, and team bios",
    ],
    tech: ["React", "TypeScript", "Vite", "Static prerendering", "Structured data", "Vercel"],
    scope: ["Website design", "Development", "SEO foundations", "Content structure"],
    links: [{ label: "Visit the live site", href: "https://fort-jackson-eye-care.vercel.app" }],
    images: {
      hero: { key: "fort-jackson-desktop", alt: "Fort Jackson Eye Center homepage with the headline “Clear Vision. Personalized Care.” beside a photo of an exam room" },
      mobile: { key: "fort-jackson-mobile", alt: "Fort Jackson Eye Center homepage on a phone" },
      scroll: { key: "fort-jackson-desktop-full", alt: "The full Fort Jackson Eye Center homepage, top to bottom" },
      mobileScroll: { key: "fort-jackson-mobile-full", alt: "The full Fort Jackson Eye Center homepage on a phone" },
      gallery: [
        { key: "fort-jackson-services-desktop", alt: "Fort Jackson Eye Center services page" },
        { key: "fort-jackson-meet-the-team-desktop", alt: "Fort Jackson Eye Center Meet the Team page" },
      ],
    },
    note: "The site intentionally collects no patient health information. Appointment requests go through the practice’s existing secure scheduling portal.",
    services: ["websites"],
  },
  {
    slug: "hoffman-hvac",
    name: "Hoffman HVAC",
    category: "Contractor website rebuild",
    industry: "Heating & air conditioning",
    location: "West Columbia, SC",
    year: "2026",
    summary:
      "A bold, fast website for a West Columbia heating and air contractor — built so calling or requesting an estimate is never more than a tap away.",
    overview: [
      "Hoffman HVAC LLC installs, repairs, and maintains heating and cooling systems — including ductless mini splits — for homes and businesses in Columbia and the surrounding area, with 24/7 emergency service.",
      "Their previous website was built with a site builder’s standard templates. They wanted a site that looked like the hands-on company behind it.",
    ],
    challenge: [
      "HVAC customers usually arrive with a problem — the air is out, the heat quit — and want to reach someone fast. The new site needed to make calling or requesting an estimate effortless, especially on a phone.",
      "Existing customers also needed a clear way into the company’s Jobber client hub, and the business details had to stay accurate everywhere without hand-editing every page.",
    ],
    solution: [
      "I rebuilt the site from the ground up in React, TypeScript, and Tailwind CSS with a strong, industrial look and real photos from Hoffman’s own job sites. Calling and requesting an estimate are always within reach — including a sticky action bar on mobile.",
      "Every “Client Login” link opens the company’s Jobber Client Hub. Phone, hours, address, services, and FAQs live in data files that also generate the structured data search engines read, so one edit updates the whole site.",
    ],
    features: [
      "Sticky mobile action bar with tap-to-call and Get Estimate",
      "Client Login links connected to the company’s Jobber Client Hub",
      "Real job-site photos, resized into responsive sizes with metadata (including GPS) removed",
      "Service sections for cooling, heating, commercial, and emergency work",
      "FAQ accordion that also feeds FAQ structured data",
      "Business details, hours, and schema generated from a single data file",
      "Estimate request form that opens a pre-filled email",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "JSON-LD", "Jobber Client Hub", "Vercel"],
    scope: ["Website redesign", "Development", "SEO foundations", "Photo optimization"],
    links: [{ label: "Visit the live site", href: "https://hoffman-hvac.vercel.app" }],
    images: {
      hero: { key: "hoffman-desktop", alt: "Hoffman HVAC homepage with the headline “Your Comfort. Our Craft.” over a photo of outdoor AC units and service tools" },
      mobile: { key: "hoffman-mobile", alt: "Hoffman HVAC homepage on a phone with Call Now and Get Estimate buttons" },
      scroll: { key: "hoffman-desktop-full", alt: "The full Hoffman HVAC homepage, top to bottom" },
      mobileScroll: { key: "hoffman-mobile-full", alt: "The full Hoffman HVAC homepage on a phone" },
      gallery: [],
    },
    services: ["websites", "automation"],
  },
  {
    slug: "landstrong",
    name: "LandStrong Counseling",
    category: "Website redesign + client portal",
    industry: "Coaching & counseling",
    year: "2026",
    summary:
      "A warm, calm website redesign for LandStrong — plus a client care portal prototype that takes the admin work around each session off the therapist’s plate.",
    overview: [
      "I’ve built several pieces for LandStrong: a redesigned marketing website for LandStrong Coaching & Consulting, a Client Care Portal demo MVP for LandStrong Counseling, and an interactive nervous system regulation experience.",
      "LandStrong works with capable, exhausted women who are ready to stop performing “fine.” Everything needed to feel steady and personal — never like one more complicated thing.",
    ],
    challenge: [
      "The website had to explain coaching, workshops, and resources clearly, make booking a consultation effortless, and feel as calm as the work itself.",
      "Behind the scenes, client care involves intake, scheduling, reminders, invoicing, and session notes. That’s a lot of admin wrapped around every hour spent with a client.",
    ],
    solution: [
      "I redesigned the website as a fast, accessible React site with real routes for Home, About, Coaching, Workshops, Resources, and Contact. A design-token system controls color, type, spacing, and motion, and Acuity Scheduling is connected to every “Book a Consultation” button.",
      "For the practice side, I built a Client Care Portal demo MVP: separate, authenticated portals for therapists and clients, with Google Calendar and Meet scheduling, invoicing, email notifications, and an AI-assisted tool that drafts session notes — each note stays private until the therapist reviews and approves it.",
    ],
    features: [
      "Six real pages with client-side routing and per-page titles and descriptions",
      "Acuity Scheduling connected to every booking button",
      "Design tokens, plus a side-by-side theme preview for comparing palettes with the client",
      "Accessibility built in: skip link, keyboard-friendly menu and FAQ, visible focus states",
      "Portal: separate, authenticated experiences for therapists and clients",
      "Portal: Google Calendar and Meet scheduling, reminders, and invoicing",
      "Portal: AI-drafted session notes that stay private until a therapist approves them",
    ],
    tech: ["React", "TypeScript", "React Router", "Vite", "Next.js", "Clerk", "Google Calendar & Meet", "Acuity Scheduling"],
    scope: ["Website redesign", "Client portal (demo MVP)", "Workflow automation", "Interactive experience"],
    links: [
      { label: "Visit the website", href: "https://landstrong-revamped.vercel.app" },
      { label: "View the portal demo", href: "https://land-strong-client-care-portal.vercel.app" },
      { label: "Try the simulator", href: "https://landstrong-nervous-system-simulator.vercel.app" },
    ],
    images: {
      hero: { key: "landstrong-desktop", alt: "LandStrong homepage with the headline “You’ve held it together long enough. Let’s build something steadier.” beside a video of the founder" },
      mobile: { key: "landstrong-mobile", alt: "LandStrong homepage on a phone" },
      scroll: { key: "landstrong-desktop-full", alt: "The full LandStrong homepage, top to bottom" },
      mobileScroll: { key: "landstrong-mobile-full", alt: "The full LandStrong homepage on a phone" },
      gallery: [
        { key: "landstrong-coaching-desktop", alt: "LandStrong coaching page" },
        { key: "landstrong-portal-desktop", alt: "LandStrong Client Care Portal landing page: “A calmer way to run client care.”" },
        { key: "landstrong-simulator-desktop", alt: "LandStrong Nervous System Simulator start screen: “Regulate. Reset. Reconnect.”" },
      ],
    },
    note: "The Client Care Portal is a working demo MVP built for LandStrong Counseling, not a production system holding client records.",
    services: ["websites", "automation", "software"],
  },
  {
    slug: "casecompass-ai",
    name: "CaseCompass AI",
    category: "Custom web application",
    industry: "Legal technology",
    year: "2026",
    summary:
      "An AI-powered platform I founded and built that turns a person’s situation into a plain-language legal research roadmap.",
    overview: [
      "CaseCompass AI is my own product: an AI-powered legal research roadmap platform that helps incarcerated individuals understand where to begin, what to research, and how to navigate complex legal information — through personalized, plain-language guidance.",
      "It’s the clearest example of what I can build beyond websites: a full application with authentication, roles, a database, and AI woven into a careful, structured workflow.",
    ],
    challenge: [
      "The legal system is notoriously difficult to navigate, especially for incarcerated people who often lack reliable internet access, legal literacy, or an attorney to guide them.",
      "Legal research databases assume a baseline of legal knowledge most people don’t have, which leaves people making life-altering decisions without knowing where to start.",
    ],
    solution: [
      "CaseCompass AI turns a person’s situation into a personalized research roadmap — what to look into, in what order, and why — without requiring prior legal knowledge or expensive research tools. It offers guidance, not legal advice, and says so plainly.",
      "It’s built as a Next.js application with Clerk handling authentication and access control, PostgreSQL through Prisma for structured case and research data, Supabase for storage, and the OpenAI API generating plain-language roadmaps from a structured intake.",
    ],
    features: [
      "Personalized legal research roadmaps generated from a structured intake",
      "Plain-language explanations of legal concepts and next steps",
      "Step-by-step guidance instead of raw legal database search",
      "Secure, authenticated access with role-based permissions",
      "Facility registration for institutional access",
      "Automated tests with Vitest, Playwright, and React Testing Library",
    ],
    tech: ["Next.js", "React", "TypeScript", "OpenAI API", "Clerk", "Prisma", "PostgreSQL", "Supabase", "Tailwind CSS", "Zustand", "Vitest", "Playwright"],
    scope: ["Product design", "Full-stack development", "AI workflow design", "Authentication & roles"],
    links: [{ label: "Visit casecompassai.com", href: "https://casecompassai.com" }],
    images: {
      hero: { key: "casecompass-desktop", alt: "CaseCompass AI homepage: “When you don’t know where to start, CaseCompass shows you the path forward.”" },
      mobile: { key: "casecompass-mobile", alt: "CaseCompass AI homepage on a phone" },
      scroll: { key: "casecompass-desktop-full", alt: "The full CaseCompass AI homepage, top to bottom" },
      mobileScroll: { key: "casecompass-mobile-full", alt: "The full CaseCompass AI homepage on a phone" },
      gallery: [],
    },
    note: "CaseCompass AI provides research guidance, not legal advice.",
    services: ["software"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
