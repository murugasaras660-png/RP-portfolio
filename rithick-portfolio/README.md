# Rithick Prasath — Developer Portfolio

A fully animated 3D developer portfolio built with React, Vite, Tailwind CSS, Three.js, anime.js v4, and Lenis smooth scroll.

## Quick Start

```bash
pnpm install
pnpm dev        # Dev server at localhost:5173
pnpm build      # Production build → dist/
pnpm preview    # Serve dist/ locally
```

## Stack

- **Framework:** React 19 + Vite + React Router
- **Styling:** Tailwind CSS with CSS custom property tokens
- **3D:** Three.js (vanilla, one canvas)
- **Animation:** anime.js v4 + framer-motion (via Skiper)
- **Smooth Scroll:** Lenis (single shared instance)
- **Skiper UI:** 19, 16, 31, 40, 63 — [skiper-ui.com](https://skiper-ui.com)
- **Hosting:** Vercel (static SPA)

## Update Content

All content lives in `src/data/`:
- `projects.js` — add/edit/remove projects
- `skills.js` — skill groups and items
- `learning.js` — certificates and learning items
- `site.js` — name, email, social links, hero text

Fields set to `[TO BE PROVIDED]` render nothing in the UI.

## Add a Project

1. Add a project object to `src/data/projects.js`
2. Place the cover image at `public/assets/projects/{slug}/cover.webp`
3. Run `pnpm dev` — the card and detail page appear automatically

## Fonts

Inter is self-hosted from `public/fonts/` (SIL Open Font License).

## Attribution

- Skiper UI components: [skiper-ui.com](https://skiper-ui.com)
- Inter typeface: [rsms.me/inter](https://rsms.me/inter)
