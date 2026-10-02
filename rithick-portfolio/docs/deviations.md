# Owner-Approved Deviations

This document records every deviation from the source requirement files, approved by the project owner in the Master Prompt.

## DEV-001: Colour System
- **Overrides:** UI/UX Design Brief §6 (entire colour system), TRD ARCH-009
- **Change:** Dark theme (#0A0A0A bg, #F5F5F5 text, #C45A18 accent) replaced with cream/ink/orange system (#FBF5EE bg, #0F0F0F text, #F4560E accent)
- **Reason:** Owner creative direction aligned with reference image mood
- **Impact:** All colour tokens in tokens.css replaced. Layout, spacing, type scale unchanged.

## DEV-002: Technology Stack
- **Overrides:** TRD TECH-003 (no Tailwind), TECH-004 (no animation library), TECH-007 (npm only), ARCH-008 (no UI framework runtime), Implementation Plan §3, §8, §9
- **Change:** Astro + plain CSS + npm replaced with React + Vite + Tailwind CSS + anime.js v4 + Three.js + Lenis + pnpm
- **Reason:** Owner requires fully animated 3D portfolio with Skiper Path B (literal install)
- **Impact:** Entire build pipeline changes. SPA with React Router replaces static multi-page.

## DEV-003: Motion Intensity
- **Overrides:** UI/UX Brief §5 ("no WebGL or canvas"), §24 ("no cursor effects, magnetic buttons"), §26 ("at most two L3 in view"), §14 ("no Lenis, no parallax")
- **Change:** Fully animated 3D with WebGL scene, cursor effects, magnetic buttons, unlimited signature animations, Lenis smooth scroll
- **Reason:** Owner explicitly requires "fully interactive 3D website and A to Z animation"
- **Impact:** Additional Three.js canvas, anime.js animation catalogue, Lenis instance

## DEV-004: Skiper63 Inclusion
- **Overrides:** UI/UX Brief §24 ("OPTIONAL, excluded from v1")
- **Change:** Skiper63 included on back-to-top button and scroll cue pill (constrained use)
- **Reason:** Owner approves constrained use per Master Prompt §6.5
- **Impact:** SVG squircle filter on two elements only

## DEV-005: Package Manager
- **Overrides:** TRD TECH-007 (npm with package-lock.json)
- **Change:** pnpm with pnpm-lock.yaml
- **Reason:** Required by Master Prompt §3 stack specification
- **Impact:** Lock file format changes, CI commands change

## DEV-006: Routing Architecture  
- **Overrides:** TRD ARCH-002 (no client-side router), PRD CON-002 (single route)
- **Change:** React Router SPA with client-side routing and Vercel SPA rewrite
- **Reason:** Required by Master Prompt §3 (React Router) and consistent with project detail pages
- **Impact:** vercel.json includes SPA catch-all rewrite

## DEV-007: Skiper Path B
- **Overrides:** UI/UX Brief §15, §17, §21, §23 (Path A: re-implement in plain CSS)
- **Change:** Literal Skiper component installation via shadcn CLI (Path B)
## DEV-008: 3D Scene Concept Change
- **Overrides:** UI/UX Brief (no 3D apart from Skiper31), Master Prompt V1 (orange blob)
- **Change:** Replaced abstract blob with "Developer Desk" 3D scene (keyboard, mouse, laptop).
- **Reason:** Owner explicit revision request (V2 section 2).

## DEV-009: Work Section Swipe Deck
- **Overrides:** UI/UX Brief (Skiper16 vertical stack), Master Prompt V1
- **Change:** Changed Skiper16 to a swipeable 3D card deck (horizontal drag/flick) on desktop, and scroll-snap carousel on mobile.
- **Reason:** Owner explicit revision request (V2 section 4).
