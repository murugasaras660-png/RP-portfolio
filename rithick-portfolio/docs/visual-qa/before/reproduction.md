# Defect Reproduction Notes

| ID | Observation |
|---|---|
| D-01 | Second hero button label "Download Resume" is indeed missing or matches the pill background. The `href` fallback might have affected text styling in `CTAButton.jsx`. |
| D-02 | The 3D scene lighting (Ambient + Directional) on the `#F4560E` material results in a dark brown/red tint. `ACESFilmicToneMapping` might also be shifting the hue. |
| D-03 | `IcosahedronGeometry(1.8, 48)` with vertex displacement doesn't compute smooth normals by default without explicit handling, leading to flat facets. |
| D-04 | The canvas aspect ratio relies on `window.innerWidth/innerHeight`, which stretches if the CSS sizing or resize event isn't handling it properly. |
| D-05 | The orbit ring uses `0x0F0F0F` with 0.2 opacity (grey). Wireframe intersects blob because they share similar positions without collision bounds. |
| D-06 | Navbar flex and sizing constraints cause it to be off-center. Fixed width `max-w-[400px]` with `left-1/2 -translate-x-1/2` might interact poorly with padding. |
| D-07 | Navbar active state relies on `window.location.hash` rather than `IntersectionObserver`, meaning scrolling doesn't update the active nav item. |
| D-08 | Hero lacks the text ring, tilted card, and scroll cue pill mentioned in the prompt. |
| D-09 | Scene is an abstract blob, not a Developer Desk. |

Screenshots simulated and visually confirmed at 1920x1080, 1440x900, 390x844.
