# Muskan Gupta — Portfolio

Personal portfolio for a frontend developer moving into AI engineering.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. No UI or animation libraries.

## Features

- Dark-first theme with a persisted light/dark toggle (no flash on load)
- Responsive layouts for mobile, tablet and desktop, with a mobile menu (Escape closes it)
- Project filters (AI / Web / Completed / In progress / Planned) with a live result count for screen readers
- Resume download served from a real PDF in `public/resume/`
- Contact form with client + server validation, a honeypot, loading/success/error states, and a mailto fallback
- SEO: metadata, Open Graph image (generated), JSON-LD `Person`, `sitemap.xml`, `robots.txt`
- Accessibility: semantic landmarks, skip link, visible focus rings, `aria-pressed` filters, labelled form errors
- Scroll-reveal animations that respect `prefers-reduced-motion` and stay visible without JavaScript
- Custom 404, error and loading screens

## Getting started

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local   # optional, see "Contact form"
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npx tsc --noEmit` | Type-check only |

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata, theme init script, JSON-LD
    page.tsx              section order
    api/contact/route.ts  contact form endpoint (Resend)
    opengraph-image.tsx   generated social preview image
    sitemap.ts, robots.ts, icon.svg, not-found.tsx, error.tsx, loading.tsx
  components/
    layout/               Header, Footer, ThemeToggle
    sections/             Hero, About, Skills, Projects, Experience, Learning, AiLab, Achievements, Contact
    ui/                   Section, Reveal, Button, Tag/StatusBadge, Icons, socialLinks
  data/portfolio.ts       ALL editable content
  lib/contact.ts          validation shared by the form and the API
public/
  resume/Muskan_Gupta_Resume.pdf
  projects/shopsphere.jpg
```

## Customising content

Everything you see on the page lives in **`src/data/portfolio.ts`**. Components only render it.

- **Profile & links**: `site` (name, email, resume path, GitHub, LinkedIn).
- **Projects**: `projects`. Set `status` to `completed`, `in-progress` or `planned`; the badge and filters follow.
  Add `github` / `live` only when the link exists; missing links are simply not rendered.
  Use `note` to explain why a repo is not public yet.
- **Screenshots**: drop an image into `public/projects/` and set `image: { src, alt }`. Projects with an image
  are shown as wide featured cards; projects without one get a styled "screenshot coming soon" panel.
- **Certifications**: add `credentialUrl` to show a "Verify" link.
- **Articles**: entries with `placeholder: true` render as "Draft · coming soon". Replace with
  `{ title, summary, href }` once published.
- **Colours & fonts**: theme tokens are at the top of `src/app/globals.css` (`:root` = light, `.dark` = dark).

> Content rule: only add facts you can back up (resume, repos, certificates). Placeholders are clearly labelled in the UI.

### Content that needs your input

| Item | Where | Status |
|---|---|---|
| AI Code Review Agent | `projects` | Marked **Planned**; add a repo link when it exists |
| AI Job Application Assistant | `projects` | Real local project (`job-hunter-agent`), no public repo yet |
| Articles | `articles` | Two placeholder ideas; replace with real posts |
| Certification verification links | `certifications` | Not set |
| "Open to … roles" banner | `hero.eyebrow` | Edit or remove to match your current status |

## Resume

The download buttons point to `public/resume/Muskan_Gupta_Resume.pdf`.
To update it, replace that file (keep the name) or change `site.resume` in `portfolio.ts`.

**Privacy:** anything in this PDF is public once deployed. The current file includes a phone number.
Remove it from the PDF first if you don't want it on the open web.

## Contact form

The form posts to `/api/contact`, which validates input again on the server and sends a **plain-text** email
through [Resend](https://resend.com) (no SDK, just a `fetch`).

1. Create a free Resend account and an API key.
2. Set these environment variables (`.env.local` locally, Project → Settings → Environment Variables on Vercel):

| Variable | Required | Example |
|---|---|---|
| `RESEND_API_KEY` | yes | `re_...` |
| `CONTACT_TO_EMAIL` | yes | the inbox that should receive messages |
| `CONTACT_FROM_EMAIL` | no | `Portfolio <hello@yourdomain.com>` (domain verified in Resend) |

Without a verified domain, Resend's default sender `onboarding@resend.dev` only delivers to the email address
of your Resend account, so set `CONTACT_TO_EMAIL` to that address.

If the variables are missing, the API answers `503 NOT_CONFIGURED` and the form shows an
"email me directly" link instead of failing silently.

API responses: `200` sent · `400` bad JSON · `413` too large · `422` validation errors (per field) · `502` provider failure · `503` not configured.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. The Next.js preset needs no changes.
3. Add environment variables: `NEXT_PUBLIC_SITE_URL` (your final URL, e.g. `https://muskan-gupta.vercel.app`)
   and, for the contact form, the Resend variables above.
4. Deploy. Redeploy after changing environment variables.

CLI alternative:

```bash
npm i -g vercel
vercel           # preview deployment
vercel --prod    # production
```

`NEXT_PUBLIC_SITE_URL` drives canonical URLs, Open Graph, `sitemap.xml` and `robots.txt`; it defaults to
`http://localhost:3000` when unset.
