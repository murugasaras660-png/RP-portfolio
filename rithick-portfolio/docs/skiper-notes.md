# Skiper Integration Notes

This document records the installation, inspection and customisation of each Skiper component.

## Installation Commands
```bash
pnpm dlx shadcn add @skiper-ui/skiper19   # Global scroll line
pnpm dlx shadcn add @skiper-ui/skiper16   # Work sticky card stack  
pnpm dlx shadcn add @skiper-ui/skiper31   # Final statement character animation
pnpm dlx shadcn add @skiper-ui/skiper40   # Link animation system
pnpm dlx shadcn add @skiper-ui/skiper63   # SVG squircle filter
```

## Colour Overrides Applied
All Skiper components have their default colours replaced with project tokens:
- Background references → var(--color-bg) / var(--color-surface)
- Text colour → var(--color-ink)
- Accent colour → var(--color-accent)
- Muted colour → var(--color-muted)
- Border/line → var(--color-line)

## Component File Paths
- Skiper19: src/components/ui/skiper19/ [TO BE FILLED after install]
- Skiper16: src/components/ui/skiper16/ [TO BE FILLED after install]
- Skiper31: src/components/ui/skiper31/ [TO BE FILLED after install]
- Skiper40: src/components/ui/skiper40/ [TO BE FILLED after install]
- Skiper63: src/components/ui/skiper63/ [TO BE FILLED after install]

## Dependencies Brought In
- framer-motion (motion)
- lenis (shared with project instance)
- lucide-react icons (replaced with inline SVGs)

## Integration Rules
1. Skiper components use the shared Lenis instance, not their own
2. No element is animated by both Skiper (framer-motion) and anime.js
3. Colours are overridden via CSS custom properties
4. Attribution: skiper-ui.com credited in README
