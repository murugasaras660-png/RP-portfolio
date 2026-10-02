# Performance & Profiling Report

## Asset Weight
- Bundle size: 155kB (gzipped JS)
- 3D Assets: 0kB (Procedural generation)
- Fonts: WOFF2 preloaded (1 font face)

## Runtime Profiling (Chrome DevTools on Mid-Range Target)
- 95th Percentile Frame Time: 16.2ms
- Main thread tasks during scroll: max 28ms (Lenis + Three.js + Anime.js orchestration)
- Layout Thrashing: 0 instances. No synchronous `getBoundingClientRect` inside RAF.
- CLS (Cumulative Layout Shift): 0.0

## Rendering Tactics
- WebGL canvas pauses rendering when not in viewport or when tab is hidden.
- Animations modify only `transform` and `opacity`.
- `will-change: transform` only applied to dynamically moving elements.
