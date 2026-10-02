# Accessibility Report

## Contrast Verification
Target: WCAG 2.2 AA (4.5:1 for normal text, 3.0:1 for large text).
- Ink (#0F0F0F) on Cream (#FBF5EE) -> **17.9:1** (Pass)
- Muted (#5E574F) on Cream (#FBF5EE) -> **6.7:1** (Pass)
- Cream (#FBF5EE) on Ink (#0F0F0F) -> **17.9:1** (Pass)
- Cream (#FBF5EE) on Orange (#F4560E) -> **3.1:1** (Pass - large text only)
- Ink (#0F0F0F) on Orange (#F4560E) -> **5.6:1** (Pass)
- Orange (#F4560E) on Cream (#FBF5EE) -> **3.1:1** (Fails standard, restricted to large text/graphics only per rules)

## Keyboard & Focus
- Focus outlines use high contrast Ink with Orange outline offset (`--focus-ring`).
- Navigation order matches visual DOM order (Skip link → Nav → Hero → Content).
- `aria-live="polite"` handles SPA route transitions.
- Interactive elements > 44px for touch targets.

## Motion & JavaScript
- `prefers-reduced-motion: reduce` completely disables: Lenis, anime.js durations, 3D WebGL render loop.
- Core content is readable without JavaScript. CSS handles baseline visibility; JS handles opacity animations progressively.

## Lighthouse Scores
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- Performance: 96
