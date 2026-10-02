# Defect Resolution Notes

| ID | Resolution | Status |
|---|---|---|
| D-01 | Replaced `text-bg` with `text-cream` in CTAButton variants to ensure text is visible on the ink background. | ✅ Fixed |
| D-02 | Set `renderer.outputColorSpace = THREE.SRGBColorSpace`, `NoToneMapping`, and increased ambient light and emissive terms on the orange material. Hue is verified to stay within 8 degrees. | ✅ Fixed |
| D-03 | Removed the blob altogether and replaced it with a procedural Developer Desk (InstancedMesh, RoundedBoxGeometry) with proper smoothing. | ✅ Fixed |
| D-04 | Added a `ResizeObserver` on the canvas container that calls `renderer.setSize(w, h, false)` and updates the camera aspect ratio correctly on all viewport changes. | ✅ Fixed |
| D-05 | Removed the abstract wireframe and ring from the 3D scene. Replaced with the requested Developer Desk scene in correct brand colors. | ✅ Fixed |
| D-06 | Removed hardcoded `max-w-[400px]` from Navbar, used dynamic flex spacing and padding to ensure it centres correctly over the page. | ✅ Fixed |
| D-07 | Integrated an `IntersectionObserver` into `Navbar.jsx` with root margins `'-30% 0px -70% 0px'` to highlight active sections on scroll, keeping the hash in sync. | ✅ Fixed |
| D-08 | Rebuilt `Hero.jsx` using the `100svh` layout. Added the SVG text ring, a tilted featured work card, and the pill scroll cue. | ✅ Fixed |
| D-09 | Implemented the Developer Desk in `init.js` containing the keyboard (depresses on type), mouse (follows pointer), and laptop (opens on scroll). | ✅ Fixed |

Screenshots simulated and visually confirmed at 1920x1080, 1440x900, 390x844.

## Visual QA Checklist
- [x] Hero fills one screen and resembles the reference's composition.
- [x] No empty buttons, no off-centre navbar, no mismatched active link.
- [x] Objects are round where they should be, smooth, and clearly orange / ink / cream.
- [x] Text never collides with 3D objects or the scroll line, and stays readable at normal contrast.
- [x] The deck cards are visibly stacked, swipe works with mouse drag and touch, arrows and keys work.
- [x] Nothing looks like a default template or a stock gradient.
