# DM Digital Boutique

The website for **DM Digital Boutique**: custom website design and development, business workflow
automation, and custom software, by Destiny Mills. It serves Columbia, Lexington, Cayce, West Columbia,
and clients nationwide.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS 4**. Every page is
statically prerendered. The only server code is the project inquiry form's Server Action.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build (type-checks and prerenders every page) |
| `npm start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run textures` | Regenerate the smoky ink textures in `public/textures` |
| `npm run brand-assets` | Regenerate favicon, app icons, and social share images |
| `npm run process-screenshots -- <folder>` | Turn raw PNG captures into web-ready project screenshots |

## Deploying

The site is built for **Vercel**, though any Node host that runs `next start` works.

1. Push the project to a Git repository and import it in Vercel.
2. Add the environment variables below in **Project → Settings → Environment Variables**.
3. Point `dmdigitalboutique.com` at the project.

## Environment variables

All variables are documented in [`.env.example`](.env.example).

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, sitemap, and social tags. Defaults to `https://dmdigitalboutique.com`. |
| `RESEND_API_KEY` | **Yes, for the form** | API key from [resend.com](https://resend.com). |
| `CONTACT_FROM_EMAIL` | **Yes, for the form** | A sender on a domain verified in Resend, e.g. `DM Digital Boutique <hello@dmdigitalboutique.com>`. |
| `CONTACT_TO_EMAIL` | No | Where inquiries go. Defaults to `dhmills292@gmail.com`, the address shown on the site. |
| `CONTACT_SEND_CONFIRMATION` | No | `true` emails the visitor a short receipt. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | No | Adds Cloudflare Turnstile to the form. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4. Nothing loads until it's set. |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification code. |

> Your previous site already sent mail through Resend from `dmdigitalboutique.com`, so the same
> Resend account and verified domain will work here.

## The project inquiry form

- **Where it lives:** `src/components/contact/ProjectInquiryForm.tsx` (UI), `src/app/contact/actions.ts`
  (Server Action), and `src/lib/contact/` (validation, email, spam protection).
- **How it sends:** inquiries are emailed to you with **Reply-To** set to the visitor, so you can reply
  directly.
- **Validation:** runs in the browser for instant feedback, then again on the server.
- **Honest failure:** if email isn't configured or sending fails, the visitor sees a clear error with
  your email address. The form only shows success after the email has actually been accepted.
- **Spam protection:**
  - A hidden honeypot field.
  - A minimum fill-time check.
  - Per-IP rate limiting (5 per 10 minutes).
  - Optional Cloudflare Turnstile.
- **Works without JavaScript:** the form still submits through the same Server Action.
- **Changing the options:** edit the service and budget lists in `src/lib/contact/schema.ts`.

The rate limiter keeps its counts in memory. On serverless hosting that's best-effort, since each
instance counts separately. If spam ever becomes a problem, add the Turnstile keys.

## Where content lives

| To change… | Edit |
|---|---|
| Business name, email, social links, service area | `src/lib/site.ts` |
| Navigation | `primaryNav` in `src/lib/site.ts` |
| Portfolio case studies | `src/data/projects.ts` (each entry generates its page) |
| Services, process steps, secondary services, SEO list, tech stack | `src/data/services.ts` |
| Page copy | The page file in `src/app/<page>/page.tsx` |
| Colors, type scale, buttons, motion | `src/app/globals.css` (`@theme` tokens at the top) |
| Page titles and descriptions | `export const metadata` in each page |

### Adding or updating a portfolio project

1. Capture screenshots of the live site as PNGs named `<slug>-desktop.png`, `<slug>-mobile.png`,
   `<slug>-desktop-full.png`, and `<slug>-mobile-full.png`. Desktop captures are 1440×900 at 1.5×;
   mobile captures are 390×844 at 2×.
2. Run `npm run process-screenshots -- path/to/folder`. This writes the WebP files to `public/projects`
   and updates `src/data/generated/project-images.json`.
3. Add an entry to `src/data/projects.ts`.
4. Add the slug to the `shareImages` map in `scripts/generate-brand-assets.mjs`, then run
   `npm run brand-assets`.

## Brand assets

- `public/logos/dm-digital-boutique-logo.png` is the **original logo, copied byte-for-byte** from the
  previous site. `dm-digital-boutique-logo-glow.png` is the original glow variation. Neither has been
  edited.
- The logo's wordmark is charcoal on a transparent background, so on dark sections it's always shown on
  an ivory "business card" panel (`LogoCard`). It's never recolored.
- The favicon and app icons (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`) are an exact pixel crop
  of the "DM" monogram, because the full logo can't be read at 16px. They're generated by
  `scripts/generate-brand-assets.mjs`.
- `brand-source/` keeps the original full-size headshot. It isn't published.

## Smoky ink textures

The textures in `public/textures/` are generated by `scripts/generate-textures.mjs`:

- **Method:** domain-warped noise, colored in the brand palette.
- **Look:** soft smoke volumes, plus thin tendrils drawn from contour lines.
- **Deterministic:** re-running reproduces the same files.

To change a texture's composition or colors, edit its entry at the bottom of the script and run
`npm run textures`.

## SEO foundations

- **Page metadata:** a unique title, description, and canonical URL on every page, plus Open Graph and
  Twitter tags.
- **Social images:** a branded default, and one per case study.
- **Crawling:** `sitemap.xml` and `robots.txt` are generated from the app (`src/app/sitemap.ts` and
  `robots.ts`).
- **Structured data (JSON-LD):** `ProfessionalService`, `Person`, `WebSite`, `Service`, `BreadcrumbList`,
  `CreativeWork` (case studies), and `FAQPage` (Website Development). The builders are in `src/lib/seo.ts`.
- **Markup:** semantic landmarks, exactly one `h1` per page, and descriptive image alt text.

Google Analytics and Search Console are **ready but not configured**. Set the variables above when
you're ready.

## Quality checks run before handoff

- **Accessibility:** axe-core reports 0 violations on all 13 pages at 1440px and 390px.
- **Lighthouse, desktop:** Performance 99–100. Accessibility, Best Practices, and SEO are 100 on every
  page.
- **Lighthouse, simulated slow-4G mobile:** Performance about 77 (home) and 85–90 (other pages).
  Accessibility, Best Practices, and SEO are 100.
- **Links and layout:** every internal link and anchor resolves, and no page scrolls horizontally at 360px.
- **Inquiry form, tested end to end:**
  - Validation works.
  - An unconfigured send shows an honest error.
  - A successful send delivers the email (checked against a mock Resend endpoint).
  - The honeypot and instant-fill bot submissions are rejected.
- **Reduced motion:** with reduced motion turned on, the reveal animations, smoke drift, and in-frame
  scrolling are all disabled.

## Project structure

```
src/
  app/                 Routes: home, services, portfolio (+ [slug] case studies), about, contact,
                       privacy, 404, sitemap, robots, manifest, icons
  components/
    layout/            Header (hanging logo card + mobile menu), footer, reveal observer
    sections/home/     Homepage sections
    sections/shared/   Page hero, process, closing CTA, secondary services
    portfolio/         Project feature rows, cards, screen stacks
    contact/           Project inquiry form
    brand/             Logo, LogoCard, portrait
    ui/                Buttons, frames, ink backgrounds, kicker, FAQ, workflow diagram
  data/                Projects, services, generated image manifest
  lib/                 Site config, SEO helpers, contact (validation, email, spam)
public/
  logos/               Original DM Digital Boutique logos
  images/              Headshot, default social image
  projects/            Portfolio screenshots (+ og/ share images)
  textures/            Generated smoky ink textures
scripts/               Texture, brand-asset, and screenshot generators
```
