/**
 * Service content shared across the homepage and service pages.
 * Scope note: SEO is offered as foundational, on-page work built into
 * development — not ongoing campaigns, ads, or ranking guarantees.
 */

export type PrimaryService = {
  id: "websites" | "automation" | "software";
  index: string;
  title: string;
  /** Homepage headline for the "What I Build" section */
  headline: string;
  summary: string;
  href: string;
  linkLabel: string;
  highlights: string[];
};

export const primaryServices: PrimaryService[] = [
  {
    id: "websites",
    index: "01",
    title: "Custom Website Design & Development",
    headline: "Websites That Make an Impression",
    summary:
      "Custom-built websites that look professional, perform beautifully, and give customers a reason to reach out.",
    href: "/website-development",
    linkLabel: "Website development",
    highlights: [
      "Custom design — no templates",
      "Built for phones first",
      "Quote & contact forms",
      "Booking integrations",
      "SEO-friendly foundations",
      "Redesigns of existing sites",
    ],
  },
  {
    id: "automation",
    index: "02",
    title: "Business Workflow Automation",
    headline: "Smarter Business Systems",
    summary:
      "Custom tools and automation that reduce repetitive work and help your business run more efficiently.",
    href: "/business-automation",
    linkLabel: "Business automation",
    highlights: [
      "Instant inquiry notifications",
      "Automated email follow-ups",
      "Scheduling integrations",
      "CRM connections",
    ],
  },
  {
    id: "software",
    index: "03",
    title: "Custom Software Development",
    headline: "Development Beyond the Basics",
    summary:
      "Tailored software, integrations, client portals, and digital solutions built around exactly how your business works.",
    href: "/custom-software",
    linkLabel: "Custom software",
    highlights: ["Client portals", "Custom dashboards", "Internal tools", "API integrations", "Web applications"],
  },
];

/** Complementary services — introduced naturally, never as the headline act. */
export const secondaryServices = [
  "Website maintenance & updates",
  "Website redesigns",
  "Speed & performance improvements",
  "Landing pages",
  "Contact form development",
  "Quote request systems",
  "Booking & scheduling integrations",
  "Email notification automation",
  "Enhancements to existing websites",
  "On-page SEO improvements",
  "Troubleshooting & support",
];

export const processSteps = [
  {
    index: "01",
    title: "Let’s Talk",
    body: "We talk through your business, your goals, and what you actually need — which isn’t always what you came in asking for.",
  },
  {
    index: "02",
    title: "The Plan",
    body: "I put together an approach tailored to your business and the project’s requirements, so you know what’s being built and why.",
  },
  {
    index: "03",
    title: "Design & Development",
    body: "Your website or custom solution is designed and built with careful attention to the details, the functionality, and the performance.",
  },
  {
    index: "04",
    title: "Launch & Support",
    body: "We test everything, launch, and talk about what ongoing support or next improvements would make sense for you.",
  },
];

/** "More than a website" — what a well-built site does for a business. */
export const websiteBenefits = [
  {
    title: "Look like the business you are",
    body: "First impressions happen online now. Your site should match the quality of your work before anyone picks up the phone.",
  },
  {
    title: "Make reaching you effortless",
    body: "Tap-to-call, clear contact options, and forms that work on every phone — no hunting for a way to get in touch.",
  },
  {
    title: "Capture quote requests",
    body: "Ask the right questions up front so every request lands with the details you need to respond.",
  },
  {
    title: "Simplify scheduling",
    body: "Connect the booking tools you already use, so customers can pick a time without three rounds of phone tag.",
  },
  {
    title: "Keep inquiries organized",
    body: "New leads go where you’ll actually see them — your inbox, your CRM, or a simple dashboard.",
  },
  {
    title: "Automate the repetitive parts",
    body: "Confirmations, reminders, and follow-ups go out on their own, so you’re not typing the same email again.",
  },
  {
    title: "Make the whole experience better",
    body: "Fast pages, clear writing, and thoughtful details add up to customers who feel taken care of.",
  },
];

export const seoFoundations = [
  { title: "Keyword-conscious copy", body: "Written for people first, with the words your customers actually search for worked in naturally." },
  { title: "Page titles & meta descriptions", body: "A unique, accurate title and description for every page — what shows up in search results." },
  { title: "Clear heading structure", body: "One main heading per page and a logical outline underneath it, for readers and search engines alike." },
  { title: "Clean URLs", body: "Readable addresses like /services/air-conditioning instead of /page?id=482." },
  { title: "Semantic HTML", body: "Proper landmarks and elements, which helps accessibility tools and search engines understand your content." },
  { title: "Descriptive image alt text", body: "Images described accurately, for screen reader users and image search." },
  { title: "Internal linking", body: "Pages that point to each other sensibly, so visitors and crawlers can find what matters." },
  { title: "Mobile-responsive & fast", body: "Built for phones and tuned for speed — both of which search engines pay attention to." },
  { title: "Technical basics", body: "XML sitemap, robots.txt, canonical URLs, social sharing tags, and structured data where it fits." },
];

export const techStack = [
  { group: "Front end", items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"] },
  { group: "Back end & data", items: ["Node.js", "Express", "REST APIs", "Prisma", "PostgreSQL", "Supabase", "SQLite"] },
  { group: "Accounts & access", items: ["Clerk", "Session management", "Role-based access control"] },
  { group: "AI & automation", items: ["OpenAI API", "AI workflow design", "Zapier"] },
  { group: "Quality", items: ["Vitest", "Playwright", "React Testing Library"] },
  { group: "Hosting & delivery", items: ["Vercel", "Serverless functions", "Git & GitHub", "CI/CD"] },
];
