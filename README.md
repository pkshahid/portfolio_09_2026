# Mohammed Shahid — Portfolio

Suggested repository name: `mohammed-shahid-portfolio`

A single-page portfolio for Mohammed Shahid, Senior Backend Engineer. Editorial personal-profile layout with a persistent sidebar, white, red, and black theme (light by default, with a dark mode option), built as a static Next.js site.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- ESLint 9 (flat config, `eslint-config-next`)
- Fonts bundled locally via `@fontsource/poppins` — no remote font requests

## Getting started

Prerequisite: Node.js >= 20.9.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm start          # serve production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

No environment variables or API keys are required, except the optional Telegram notification vars described below.

## Telegram visitor notifications

The site can ping a Telegram bot when a visitor opens a page. Set two env vars in Vercel → Project Settings → Environment Variables (or in a local `.env`):

- `TELEGRAM_BOT_TOKEN` — bot token from @BotFather
- `TELEGRAM_CHAT_ID` — your chat ID (via @userinfobot)

Additionally, set `OPEN_TO_WORK=false` to hide the "open to work" popup on the home page. The popup shows by default when the variable is unset; it's evaluated at build/deploy time, so redeploy after changing it. The `/open-to-work` page, hero pill, and nav links stay reachable either way.

When unset (e.g. local dev) the `POST /api/notify-visit` route silently does nothing. Each new browser session sends one ping containing the visitor's IP, approximate location (Vercel geo headers), device/browser, referrer, screen/viewport size, and timezone. A public notice describing this collection lives at `/privacy` and is linked from both page footers — update it if the data collected changes.

## Project structure

```
├── package.json
├── package-lock.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── README.md
├── AGENTS.md
├── public/
│   └── Mohammed_Shahid_resume.pdf   # downloadable résumé
└── src/
    ├── app/
    │   ├── globals.css              # design tokens, light/dark themes, all styles
    │   ├── icon.svg                 # favicon / app icon
    │   ├── layout.tsx               # metadata, fonts, theme init script
    │   ├── page.tsx                 # home page composition
    │   ├── api/notify-visit/
    │   │   └── route.ts             # POST: Telegram visitor notification
    │   ├── privacy/
    │   │   └── page.tsx             # privacy notice (/privacy)
    │   └── open-to-work/
    │       └── page.tsx             # roles & availability page (/open-to-work)
    ├── components/
    │   ├── copy-email.tsx           # client: copy email button
    │   ├── header.tsx               # client: nav, mobile menu
    │   ├── icons.tsx                # inline SVG icons
    │   ├── open-to-work-popup.tsx   # client: dismissible open-to-work card (home only)
    │   ├── whatsapp-widget.tsx      # client: floating WhatsApp chat widget (all pages)
    │   ├── section-heading.tsx
    │   ├── system-diagram.tsx       # unused (kept from a previous layout)
    │   ├── theme-toggle.tsx         # client: dark/light switch
    │   ├── visit-beacon.tsx         # client: one-per-session visit ping (all pages)
    │   └── work-card.tsx            # case study cards
    └── lib/
        └── portfolio.ts             # profile, stats, case studies, skills, certifications
```

## Customizing content

Edit `src/lib/portfolio.ts` for contact details, introduction, case studies, skills, and certifications. Section headings, the evidence cards, experience timeline, education, and page composition are in `src/app/page.tsx`. Update `src/app/layout.tsx` for the title, description, and canonical domain. The résumé URL is in `profile.resume`. Open-to-work details (roles, availability, work mode, employment type) live in `openToWork` in `src/lib/portfolio.ts`; the popup is `src/components/open-to-work-popup.tsx`. WhatsApp number, greeting, and suggested messages live in `whatsapp` in `src/lib/portfolio.ts`.

## Customizing the theme

Colors, fonts, and theme values are CSS custom properties at the top of `src/app/globals.css` under `:root` (dark) and `[data-theme="light"]`. `--accent-text` is the accent colour for text on page backgrounds; `--accent-ink` is text on accent backgrounds. The site defaults to light; the toggle persists an explicit choice in `localStorage`.

## Résumé PDF

`public/Mohammed_Shahid_resume.pdf` is served at `/Mohammed_Shahid_resume.pdf` and linked with a `download` attribute. "Preview résumé" links open the same file in a new browser tab. Replace the file (same name) to update it.

## Content notes

- The three "Selected work" case studies are thematic groupings of backend work at Epixel Solutions — not named clients or side projects. Context/contribution/outcome wording is derived from the supplied résumé and LinkedIn records.
- Employment timeline uses the LinkedIn split (Junior Dec 2020–Jan 2024, Senior Jan 2024–Present); the résumé bundles the tenure as Dec 2020–Present, which is shown as overall company tenure.
