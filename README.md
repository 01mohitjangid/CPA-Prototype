# CPA Canada Redesign — Prototype (Next.js)

Working prototype of an improved CPA Canada homepage. Part of the assignment in the
parent folder — see `../README.md` for the full write-up.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
# production build:
npm run build && npm run start
```

No backend, no API keys.

## Stack

- **Next.js 15** (App Router) + **React 19**, TypeScript.
- Plain CSS design system in `app/globals.css` (CSS custom properties, light/dark themes).
- No UI framework, no third-party runtime scripts (Inter font is preconnected from Google Fonts).

## Key files

| Path | What it is |
|---|---|
| `app/page.tsx` | Composes the homepage sections |
| `app/layout.tsx` | Metadata, font, providers, skip link |
| `app/globals.css` | The full design system + component styles |
| `lib/data.ts` | Content model: nav, **personas**, search index, **AI knowledge base** |
| `components/Providers.tsx` | Persona + theme context (persisted to `localStorage`) + toast |
| `components/Header.tsx` | Sticky nav, mega-menus, live search, dark-mode toggle, mobile drawer |
| `components/PersonaBar.tsx` | The "I am a…" audience switcher |
| `components/Hero.tsx` / `QuickActions.tsx` | Persona-driven hero + shortcut tiles |
| `components/AiAssistant.tsx` | "Ask CPA" assistant (intent match + simulated streaming) |
| `components/FocusAreas.tsx` / `News.tsx` / `CtaBand.tsx` / `Footer.tsx` | Content sections |

## Interactions to try

1. **Persona bar** (top): switch audience → hero/spotlight/shortcuts change; persists on reload.
2. **Ask CPA** (bottom-right): ask a question or tap a quick reply; answers stream and are
   aware of the selected audience.
3. **Search** (header): live results over a content index.
4. **Dark mode** toggle; **responsive** down to mobile (hamburger drawer).

## Notes

The assistant is a front-end demo (keyword-matched knowledge base + simulated token
streaming) so it runs with zero backend. See `../docs/03-AI-TOOLS-AND-IDEAS.md` for how
the production version (Claude + retrieval over CPA Canada content) would be wired.
