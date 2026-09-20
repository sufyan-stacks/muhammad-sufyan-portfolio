# Muhammad Sufyan — Portfolio

Personal portfolio and case-study site — full-stack SaaS and AI engineering
work, built with Next.js.

**Live site:** _add your deployed URL here once live_

## Overview

This is the source for my portfolio: selected project write-ups, experience,
engagement types, and a contact form that emails me directly. Built to be
fast, accessible, and easy to extend — no CMS, no third-party form service.

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Email:** Nodemailer via Gmail SMTP (server-side API route)
- **Validation:** Zod
- **Icons:** lucide-react

## Features

- Fully responsive, dark editorial design with scroll-triggered reveal
  animations (respects `prefers-reduced-motion`)
- Accessible navigation: skip-to-content link, keyboard-navigable mobile
  menu, active-section highlighting, scroll progress indicator
- Working contact form with server-side validation and a lightweight
  rate limiter, emailing submissions directly to my inbox
- Content fully data-driven from a single `lib/site.ts` module
- SEO metadata + JSON-LD structured data (`Person` schema)

## Getting started

\`\`\`bash
git clone https://github.com/sufyan-stacks/muhammad-sufyan-portfolio.git
cd muhammad-sufyan-portfolio
npm install
cp .env.local.example .env.local
\`\`\`

Fill in `.env.local` (see [Environment variables](#environment-variables)),
then:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable              | Required | Description                                                        |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `GMAIL_USER`           | Yes      | Gmail address the contact form sends from                          |
| `GMAIL_APP_PASSWORD`   | Yes      | A Gmail [App Password](https://myaccount.google.com/apppasswords) (not your login password) — requires 2-Step Verification |
| `CONTACT_TO_EMAIL`     | No       | Inbox that receives submissions (defaults to `GMAIL_USER`)          |

Never commit `.env.local` — it's already git-ignored. On deploy, set the
same variables in your hosting provider's environment settings.

## Project structure

\`\`\`
app/
  page.tsx              — assembles all sections
  layout.tsx            — fonts, metadata, structured data
  globals.css            — design tokens and animation keyframes
  api/contact/route.ts   — email-sending API route
components/              — one file per section (hero, work, experience, ...)
lib/site.ts               — all site content — edit here to update text/data
public/work/               — project images
\`\`\`

## Deployment

Deploys to any Next.js-compatible host. On [Vercel](https://vercel.com):

\`\`\`bash
vercel deploy
\`\`\`

Then add the environment variables above in the project dashboard. This
project uses a server-side API route, so it needs a Node runtime rather than
a static export.

## License

Content and copy are © Muhammad Sufyan. Code is available under the
[MIT License](LICENSE) — feel free to use the structure for your own
portfolio.

## Contact

- Email: [sufyan.devs@gmail.com](mailto:sufyan.devs@gmail.com)
- LinkedIn: [linkedin.com/in/muhammad-sufyan-devs](https://linkedin.com/in/muhammad-sufyan-devs)
- GitHub: [github.com/sufyan-stacks](https://github.com/sufyan-stacks)
