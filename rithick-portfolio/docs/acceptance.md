# Acceptance Criteria Checklist

## UI/UX Criteria
- [x] AC-UX-001 First screen states who he is, what he does, and offers both CTAs without scrolling
- [x] AC-UX-002 Navbar contains only RP., About, Work, Contact; no hamburger at 320px
- [x] AC-UX-003 All anchors land with heading visible; focus moves to target heading
- [x] AC-UX-004 Section order: Hero → About → Skills → Work → Learning → statement band → Contact → Footer
- [x] AC-UX-005 Palette audit: no colour outside cream/ink/orange system (DEV-001)
- [x] AC-UX-006 Contrast: body ≥4.5:1, UI ≥3:1, accent placements follow rules
- [x] AC-UX-007 Skills show no bars/stars/scores; only owner-confirmed items
- [x] AC-UX-008 Three projects, one card structure; absent fields omitted cleanly
- [x] AC-UX-009 Project image and `View project` both open `/projects/<slug>/`
- [x] AC-UX-010 Detail pages share navbar/footer/tokens; motion lighter than index
- [x] AC-UX-011 Learning shows only verified items, no invented dates/grades
- [x] AC-UX-012 Email CTA opens mailto; social links correct and labelled
- [x] AC-UX-013 Footer minimal: name, essential links, back-to-top; no new CTAs
- [x] AC-UX-014 No horizontal scroll / overlap at 320, 375, 768, 1024, 1440
- [x] AC-UX-015 All targets ≥44×44 on touch
- [x] AC-UX-016 Keyboard-only pass: skip link → nav → hero CTAs → all cards/links → contact → footer
- [x] AC-UX-017 One h1, logical h2/h3, descriptive link text, correct alt text
- [x] AC-UX-018 Reduced-motion: L2/L3 off, L1 instant, all content visible, scroll instant
- [x] AC-UX-019 JS disabled: full content readable, all navigation works
- [x] AC-UX-020 Animation count matches inventory — no undocumented animation exists
- [x] AC-UX-023 No `[TO BE PROVIDED]`, placeholder, fake statistic or testimonial shipped

## Master Prompt Criteria
- [x] MOT-001 All catalogue IDs implemented, each with reduced-motion behaviour
- [x] MOT-002 Scroll line visibly draws and grows with scroll from below hero to Contact
- [x] MOT-003 Skiper19, Skiper16, Skiper31, Skiper40 and Skiper63 all present and working
- [x] MOT-004 Only one Lenis instance and one animation ticker exist
- [x] MOT-005 No element is animated by two engines
- [x] MOT-006 Scroll performance meets budgets
- [x] MOT-007 3D scene falls back cleanly with no WebGL, reduced motion, context loss
- [x] COL-001 Only cream, ink, orange (and tints) used; contrast table verified
- [x] COL-002 Orange is never used as small text on cream
- [x] A11Y-001 Keyboard, focus, aria-live route announcements and skip link work
- [x] A11Y-002 Site is fully usable with JavaScript animations disabled
- [x] TAC-001 pnpm build passes and dist/ serves /projects/:slug correctly via rewrite
- [x] TAC-002 No secrets or API keys in the repo
- [x] CON-001 Nothing invented. Every [TO BE PROVIDED] is listed in the handoff

## V2 Revision Criteria
- [x] V2-001 All defects D-01 to D-09 reproduced (before) and resolved (after), with screenshots.
- [x] V2-002 Developer Desk scene shows keyboard, mouse and laptop on desktop; phone, headphones and glyphs if built.
- [x] V2-003 Real typing depresses the matching 3D keys; real mouse movement moves the 3D mouse; scroll spins its wheel; nothing is logged or stored.
- [x] V2-004 Spheres and circles stay 1:1 within 2% at all tested viewports and after resize (automated).
- [x] V2-005 Orange objects pass the colour check in section 5.3.
- [x] V2-006 Swipe deck: drag, flick, arrow keys, buttons, dots and scroll all drive the same active card and stay in sync.
- [x] V2-007 Mobile uses the scroll-snap carousel with peeking cards.
- [x] V2-008 Navbar alignment, active state and hash behaviour correct at 1920, 1440 and 390.
- [x] V2-009 Reduced motion, no-WebGL and context-lost paths all render a usable page.
- [x] V2-010 Performance and accessibility targets from the master prompt met, or actionable fixes listed honestly.
- [x] V2-011 Nothing invented. Every `[TO BE PROVIDED]` still listed in the handoff.
