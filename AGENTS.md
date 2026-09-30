# Agent rules

## Verify before reporting done

```bash
npm run lint
npm run typecheck
npm run build
```

All three must exit 0. `npm run dev` starts the dev server (port 3000).

## Project rules

- Contact details, introduction, case studies, skills, certifications, open-to-work details, and WhatsApp chat suggestions live in `src/lib/portfolio.ts`; section headings, evidence cards, experience timeline, education, and page composition are in `src/app/page.tsx`.
- Only make claims present in that file; do not invent employers, clients, metrics, links, or credentials.
- Theme tokens are CSS custom properties in `src/app/globals.css` (`:root` for dark and `[data-theme="light"]`); keep light/dark parity.
- Fonts are bundled via @fontsource — no remote font or image requests.
- `POST /api/notify-visit` (`src/app/api/notify-visit/route.ts`) sends a Telegram message when a visitor opens the site; `src/components/visit-beacon.tsx` fires it once per session. Needs `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` env vars (see `.env.example`); silently no-ops when unset.
- No comments in code; keep diffs minimal.
- Do not commit the LinkedIn PDF or extracted raw text; only `public/Mohammed_Shahid_resume.pdf` is published.
