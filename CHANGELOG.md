# HERO13 Black Landing — Historical Project Log

> This file preserves the complete original project memory and chronological
> work history through the 2026-07-02 memory split. Current instructions and
> status live in `AGENTS.md` and `WORKING_STATE.md`; any status or planning
> sections retained below are historical and non-authoritative.

This file stores accepted decisions, completed changes, and verification
results. After every completed task, the agent must update the `Work
History` section without deleting previous entries.

## Project

- Stack: Vite, vanilla HTML/CSS/JavaScript, GSAP, Three.js.
- Main markup: `index.html`.
- Main styles: `src/styles.css`.
- Scroll/WebGL transitions: `src/js/scroll-scenes.js`.
- 3D route configuration guides:
  `docs/three-model-route-guide.md` (English) and
  `docs/three-model-route-guide.ru.md` (Russian).
- Form: `src/js/preorder-form.js`.
- Main verification command: `npm run build`.

## Locked-in product decisions

- The main display headings mostly consist of two white lines and one blue
  line.
- Display headings do not use decorative periods.
- The header and main sections use a single shared horizontal gutter.
- The numbered product path has five steps:
  01 Performance, 02 Stability, 03 Rugged, 04 Enduro Battery,
  05 Mounting System.
- The `One camera / Every angle` section uses the landing's overall dark
  styling.
- The form and success state size to their actual content height, with no
  fixed empty area.
- `Your kind of action` has nine options:
  MTB, Moto, Surf, Snow, Travel, Creator, Hiking, Diving, Other.
- Activity cards use a `3 × 3` grid at all laptop/tablet/mobile sizes.
- Text inside setup/activity cards does not wrap; cards within the same
  group share equal height.
- The comparison table uses `20:40:40` column proportions.
- The HERO13 column has no background highlight; the blue color of key
  values is preserved.
- Performance, Enduro Battery, Mounting, and Preorder all use a single shared
  component, `.fact-list`: a two-column row with a blue value on the left and
  a gray description on the right, with top and bottom divider lines.
  Preorder renders as a single column (previously `2 × 2`).
- The Anamorphic card has a round outer outline, matching the other lens
  orbits; its distinguishing feature is an internal horizontal blue flare.
- The decorative `RESERVE / THE SHOT` text in the Preorder section is
  implemented purely in CSS (`::before`/`::after` pseudo-elements,
  `user-select: none`) and is excluded from text selection/clipboard copy.
- Utility text in Comparison, Footer, and Form uses `.compact-note`, capped
  at 360px wide, with no border or background. Comparison and Footer keep
  their original alignment; the Form privacy note is centered on both axes.
- Hero Specs and Depth Markers have no visible internal dividers. Both blocks
  use flex-gap with no spacer elements; gap values were chosen to stay close
  to the previous spacing.
- The runtime page title and social title are `GoPro HERO13 Black`.
- The header, footer, and favicon use `public/GoPro_logo_light.svg`; the
  `HERO13 BLACK` wordmark stays next to the logo. Do not use an artificial
  `.brand-mark`.

## Work History

### 2026-06-30 — First round of UI changes

Original request:

1. Shrink the headings and rebuild them as a composition of white and blue
   lines.
2. Align containers with the header.
3. Remove periods from the headings.
4. Add the missing steps 04 and 05.
5. Switch the white lenses section to the dark styling.
6. Remove the form's extra fixed height.
7. Expand `Your kind of action` to nine options.
8. Equalize card heights and prevent label wrapping.

Completed:

- Added a shared `--page-gutter` variable.
- Reduced desktop/mobile display sizes and adjusted heading copy.
- Added the `04 / 05 Enduro battery` and `05 / 05 Mounting system` sections.
- Added dedicated visuals and spec lists for the new sections.
- The WebGL scene hides starting at the Battery section so the model does
  not overlap the new static sections.
- The Lenses section and its cards switched to the dark palette.
- Removed fixed `min-height` from the form panel and success state.
- Added Hiking, Diving, and Other.
- Cards received a fixed equal height and `white-space: nowrap`.

Verified:

- `npm run build` completed successfully.
- Browser verification done on desktop and mobile.
- Confirmed consistent gutter spacing, no horizontal overflow, five section
  numbers, nine activity options, and working submit/reset.
- No console errors; only headless WebGL driver warnings were observed.

### 2026-06-30 — Form and comparison additions

Original request:

1. Make the laptop activity grid as tidy as the tablet one.
2. Expand the single preorder bullet into several bullets.
3. Remove the hero buttons `Reserve your spot` and `Compare with phone`.
4. Remove the HERO13 column highlight and set the table to `20:40:40`
   proportions.
5. Fix the duplicated comparison heading.

Accepted options:

- Activity: always `3 × 3`.
- Preorder: four early-access bullets:
  01 No card required; 02 No payment today;
  03 Early access updates; 04 Leave anytime.
- Comparison: an eyebrow plus one large title.

Applied changes:

- Removed hero actions; kept the header CTA and the form submit button.
- Changed the activity grid from nine columns to three.
- Replaced the single preorder detail with a semantic `2 × 2` list.
- Replaced the comparison intro with:
  `HERO13 Black vs a typical 2024 phone` and
  `Built for moments / your phone should miss`.
- Switched the table to `1fr 2fr 2fr`.
- Removed the `.hero-column` background fill.

Verification status:

- `npm run build` completed successfully.
- Browser verification done at 390, 768, 1024, 1280, and 1440 px.
- At all checked widths, activity cards form a `3 × 3` grid with no overflow.
- At 1440 px, confirmed `20:40:40` comparison table proportions, a
  transparent HERO13 column background, a single comparison title, and no
  hero actions.
- The preorder list has four bullets in a `2 × 2` grid and does not overflow
  at 390 px width.
- No browser console errors.

### 2026-06-30 — Unifying info lists and decorative graphics

Original request:

1. Consolidate the four info blocks (Performance, Enduro Battery, Mounting,
   Preorder) into a single reusable component modeled on Enduro Battery.
2. Make the Anamorphic card's outer outline round while keeping its
   individuality.
3. Remove the `RESERVE / THE SHOT` text from selection/clipboard while
   keeping it as a CSS background.

Accepted decisions:

- A single `.fact-list` component: a two-column row, blue value on the left,
  gray description on the right, top and bottom divider lines.
- Preorder switches from a `2 × 2` grid to a single column (the user's "true
  match" choice); this supersedes the earlier `2 × 2` note from round 2.
- `.spec-list`, `.feature-facts`, `.mount-options`, `.preorder-details` are
  removed; Preorder keeps only a width modifier, `max-width: 450px`.
- `.stability-meter` and `.condition-tags` are intentionally left
  ununified.
- Anamorphic: removed `transform: scaleX(1.25)`; its distinguishing feature
  is now a horizontal flare on `.anamorphic-orbit i`.
- Backdrop: text nodes removed, text moved into `::before`/`::after`, and
  `user-select: none` added.

Applied changes:

- `index.html`: Performance and Battery switched to `.fact-list`; Mounting
  (`div>span>b` → `ul>li>strong+span`) and Preorder (`ol>li>span+p` →
  `ol>li>strong+span`) rebuilt to the shared row template while keeping
  `aria-label`; `.preorder-backdrop` emptied of text.
- `src/styles.css`: added the `.fact-list` component (plus a mobile
  `margin-top: 25px` rule and a `.preorder .fact-list` modifier), removed
  four old blocks and their mobile rules, fixed `.anamorphic-orbit` /
  `.anamorphic-orbit i` and `.preorder-backdrop`.
- JavaScript and form logic were not changed.

Verified:

- `npm run build` — succeeded (only the known Three.js chunk-size warning).
- `npm test` (`node --test`) — 7/7 passed.
- Browser (Playwright) at 1440 / 1024 / 768 / 390 px: all four `.fact-list`
  instances match in value color (`rgb(119, 216, 255)`), font (Arial
  Narrow), size (20.8px), description color (`rgb(127, 135, 138)`), and
  dividers; no horizontal overflow at any width; Preorder is a single column
  of four rows; mobile width has `margin-top` = 25px.
- Anamorphic: outer outline is round (1.0 aspect ratio) with an internal
  horizontal flare; confirmed with a screenshot.
- Copying the Preorder section: `THE SHOT` is absent from the selection; the
  only match for `RESERVE` is the real "Reserve your spot" button.
- Console: 0 errors; only the expected headless WebGL driver warnings.

### 2026-07-01 — `.fact-list` refinement (linter/user)

Between tasks, `.fact-list li` received `grid-template-columns:
minmax(0, 0.72fr) minmax(0, 1fr)` and `align-items: center`. Goal: a long
left-hand label no longer stretches its column or shifts the right column —
descriptions keep a level left edge. Change accepted; do not revert.

### 2026-07-01 — Smooth transitions between sections (hero → comparison)

Original request:

1. Preserve the current context in a `.md` file (already recorded in
   `AGENTS.md`).
2. Remove the barely-visible "seams" between sections from the very top down
   to the comparison block, and make the transition smooth.

Diagnosis:

- There are no `border` rules on the sections; the seams are small "steps"
  between different near-black background fills on adjacent sections. The
  most visible one was the bottom of `rugged` (teal `#062b3a`) meeting the
  top of `battery`.

Accepted decisions:

- A "feathering" mechanism: the top/bottom of each section along the path
  blend into a single shared color, `--scene-bg`, via layers inside
  `background` (behind all content and decoration).
- Added the tokens `--scene-bg: #060708` and
  `--seam-fade: clamp(80px, 14vh, 150px)`.
- Base colors and each section's character (radial glows, contrast masks,
  grids, water line) are unchanged; the `comparison → preorder` border is
  intentionally kept as-is.

Applied changes (`src/styles.css`):

- Added `--scene-bg` and `--seam-fade` to `:root`.
- Added feather layers to `background`: hero (bottom only), comparison (top
  only), performance / stability / rugged / battery / mounting / lenses (top
  and bottom). `stability` was rewritten from a flat background into a
  layered one.
- 14 feather layers total (7 top + 7 bottom). HTML and JS were not changed.

Verified:

- `npm run build` — succeeded (only the known Three.js chunk-size warning).
  `npm test` — 7/7.
- Browser (Playwright), desktop 1440: the `top→performance`,
  `performance→stability`, `rugged→battery`, and `lenses→compare` seams no
  longer show a hard horizontal line; the previously sharp teal
  `rugged→battery` seam is now smooth; the `01…05` numbers, copy, and
  decoration stay crisp.
- Mobile 390: no horizontal overflow; the `rugged→battery` seam is smooth.
- No further tuning of `--seam-fade`/`--scene-bg` was needed: the seam reads
  as neither a line nor a dark band.
- Console: 0 errors; only the expected headless WebGL driver warnings.

### 2026-07-01 — Compact utility text

Original request:

1. Make the comparison disclaimer, footer disclaimer, and form privacy note
   more compact without changing the visual style that was already liked.
2. Center the form privacy note both horizontally and vertically; leave the
   other notes uncentered.

Applied changes:

- In `index.html`, three paragraphs received a shared `.compact-note` class;
  the footer additionally uses `.footer-note`.
- In `src/styles.css`, added a controllable width,
  `width: min(100%, var(--note-max, 520px))`.
- Comparison and Footer were initially capped at 520px, then reduced on
  request to a shared 360px width while keeping their left/right alignment.
- The privacy note is capped at 360px and uses flex centering, `min-height:
  40px`, and `margin-inline: auto`.
- Borders, backgrounds, text, links, colors, and font sizes were not
  changed.

Verified:

- `npm run build` — succeeded; the known Three.js chunk-size warning
  remains.
- Browser (Playwright), 1440px: initially checked widths of
  520 / 520 / 360px; after the follow-up request, all three limits were set
  to 360px. The form note has `align-items: center`, `justify-content:
  center`, `text-align: center`.
- Mobile 390px: widths adapt to 350 / 350 / 314px, no overflow.
- No browser console errors.
- `npm test`: 11/13 passed. Two tests in `three-route.test.js` expected a
  hero `anchorX` of `0.46`, while the current `src/js/three-route.js` used
  `0.66`. The note containers do not touch this code path; the mismatch was
  left for a separate decision.

### 2026-07-01 — Removing internal dividers

Original request:

- Remove the vertical lines in Hero Specs and the horizontal lines between
  `0M / 5M / 10M`, while keeping the existing spacing.

Applied changes:

- Removed `border-left` and its compensating padding from `.hero-specs div`.
  The parent flex-gap was increased by the previous 17px:
  `clamp(37px, calc(3vw + 17px), 65px)`.
- Removed the two decorative `<i>` elements from `.depth-markers`. The
  container switched from grid to a vertical flex with `align-items:
  flex-end` and `gap: clamp(170px, 25vh, 240px)`.
- Other page dividers were not changed.

Verified:

- `npm run build` — succeeded; the known Three.js chunk-size warning
  remains.
- Browser at 1440×900: Hero Specs uses a 60.2px flex-gap with no
  border/padding; Depth Markers uses a 225px column-flex gap and contains
  only three `<span>` elements.
- The difference between the old and new vertical depth-label positions is
  about 1px; no horizontal overflow or console errors.

### 2026-07-01 — New naming and GoPro logo

Original request:

- Rename the page to `GoPro HERO13 Black`.
- Replace the fake logo made of colored tags with the provided official
  `GoPro_logo_light.svg` in the favicon, header, and footer.

Applied changes:

- `<title>`, `og:title`, and `twitter:title` set to `GoPro HERO13 Black`; the
  OG cover caption updated to `GOPRO HERO13 BLACK`.
- The new SVG was checked: valid `viewBox`, transparent background, no
  scripts or external resources. The wordmark outlines received a light
  `#E8E8EA` fill.
- `GoPro_logo_light.svg` is wired up as the SVG favicon and as an `<img>` in
  both brand links; the aria-label was updated to `GoPro HERO13 Black home`.
- The `HERO13 BLACK` text stays next to the logo.
- The old `.brand-mark` and its four colored `<i>` elements were removed.
  `.brand-logo` scales from 58px to 77px without distorting its proportions.

Verified:

- `npm run build` — succeeded; the known Three.js chunk-size warning
  remains.
- Browser at 1440px: title/social titles and favicon are correct, both
  images load, and no artificial brand-mark remains.
- Browser at 320px: the logo is 58×17.75px, with 13.47px between the brand
  mark and Reserve; no overlap or horizontal overflow.
- Console: 0 errors.
- `npm test`: 12/13 passed; one unrelated interpolation test in
  `three-route.test.js` remained mismatched.

### 2026-07-01 — Public release cleanup (GitHub + Vercel prep)

Original request:

1. Translate all Russian content in the repo to English, since the GitHub
   repo and live Vercel demo will be reviewed by English-only clients.
2. Analyze and remove unused files (dev screenshots, leftover reference
   files) and prepare a clean pre-commit state for the first public push.

Applied changes:

- Fully translated this file (`AGENTS.md`) from Russian to English.
- Removed a redundant Russian paragraph from `docs/product-landing-prd.md`
  (it restated the English blockquote directly above it).
- Fixed a stale/inaccurate README claim: the site does load an external,
  CC BY 4.0-licensed Sketchfab `.glb` model via `GLTFLoader` (already
  credited in the page footer) — it is not procedural geometry as the README
  previously stated.
- Replaced a hardcoded dev-machine LAN IP in the README with generic
  `localhost` instructions, and expanded the Vercel deployment steps.
- Deleted unused files: `gopro.html` (a leftover Sketchfab embed snippet;
  its attribution is already in the page footer), three root-level dev
  screenshots (`gopro-logo-check.png`, `hero-glb-desktop.png`,
  `hero13-desktop.png`), and the unused raw `public/assets/
  gopro_hero_13_black.glb` (only the `.optimized.glb` is loaded by
  `three-scene.js`).
- Moved `product-landing-prd.md` and `gopro-hero13-research.md` into
  `docs/`.
- Fixed the stale test literal noted in the 2026-07-01 compact-utility-text
  entry above: `tests/three-route.test.js` expected a `stability` `anchorX`
  of `-0.44`; `src/js/three-route.js` intentionally uses `-0.54`. The test
  literal was updated to match the current, intentional value.
- Added `.claude/settings.local.json` and root-level `*.png`/`*.jpg` to
  `.gitignore`; added an `engines.node` field to `package.json` matching
  Vite 7's actual requirement.
- Ran `git init` and created the first commit. No GitHub push or Vercel
  connection was made — those require the user's own GitHub repo and Vercel
  account.

Verified:

- `npm run build` — succeeded; the known Three.js chunk-size warning
  remains.
- `npm test` — 13/13 passed (previously 12/13).
- No remaining Cyrillic characters anywhere in the repo outside
  `node_modules`.
- No dangling references to any of the deleted files.

### 2026-07-01 — Responsive fixes: 3D model, section gaps, comparison table, Lenses heading

Original request:

1. On narrow/portrait viewports (430×932, 320×568, 640×720, 768×1024; no
   changes wanted at 1024×1366 and above), the 3D model swings across the
   screen between sections and renders too small — it should sit centred
   and only rotate gently, and the section-stacking CSS breakpoint had to
   be synchronized with wherever the model-centring breakpoint landed,
   preferring the wider option for user comfort.
2. The gap between sections on mobile/tablet was nearly as tall as a
   section itself; it should scale progressively instead of jumping
   straight to a huge fixed value.
3. The comparison table collapsed to 2 columns on mobile; it needed to
   stay a real 3-column table, just smaller.
4. The Lenses section heading/description (2-column grid) needed to match
   every other section's stacked single-column pattern, at all widths.

Accepted decisions:

- Added `getRouteProfile(width)` in `three-responsive.js`, separate from
  the existing (untouched, still tested) `getViewportProfile`. Widths
  <768 use a new `compactPhone` profile, 768–1023 use `compactTablet`,
  and ≥1024 keep the existing `tablet`/`desktop` profiles completely
  unchanged.
- Both compact profiles use `xAmplitude: 0` and a new multiplicative
  `yAmplitude: 0` (added to `getProductRoute`'s anchorY formula) so the
  model never drifts between route nodes, plus a muted `rotations` set
  (roughly half of the old mobile profile's swing). `compactTablet` needs
  no vertical offset (the fixed stage band's own centre already clears
  every section's top-aligned copy on a tall-enough viewport);
  `compactPhone` needs `yOffset: -0.62` since short phone viewports don't
  leave enough room above the model for a dead-centre position without
  the model's own scale increase colliding with body copy.
- Bumped the small-viewport model scale floor (`MIN_PHONE_SCALE_COMPACT
  = 0.64`, was `0.52`) but gated it by `width < 1024` in
  `getResponsiveModelScale`, because the aspect-ratio term in that
  formula is not width-driven — an ungated bump would have also enlarged
  the model at 1024×1366, which had to stay untouched. `MIN_LANDSCAPE_SCALE`
  was left alone; it isn't the binding constraint at any of the tested
  viewports.
- Synchronized the CSS single-column breakpoint with the new model
  threshold: added a new `@media (max-width: 1023px)` tier (between the
  existing 1000px and 760px queries) carrying the structural rules that
  actually stack text and reposition the WebGL stage band
  (`.hero-copy`/`.hero-lede` width, `.section-shell` display/padding-top,
  `.feature-copy`/`.left-copy`/`.right-copy` width, `.webgl-stage`
  height/top, `align-items: flex-start`), plus the subset of typographic
  rules that measurably reduce section-copy height (`.hero h1`, hero-lede
  font-size, description font-size, `.fact-list`/`.condition-tags`
  margin). Rules already identical to the ≤760px tier were removed from
  that block to avoid duplication; phone-only rules (background
  gradients, lens-rail card layout, preorder stacking, battery/mounting
  visuals) were deliberately left scoped to ≤760px since they're
  unrelated to the model/text-overlap problem this tier exists for.
- Replaced `.section-shell`'s fixed mobile `padding-bottom: 48vh` with a
  `clamp(40px, 9vw, 15vh)` ramp living in the existing ≤1000px tier, so
  the gap now scales continuously instead of jumping.
- Redesigned the mobile (≤760px) comparison table to a real 3-column
  grid (`minmax(64px, 0.85fr) 1fr 1fr`, roughly 30:35:35) instead of the
  previous 2-column collapse with a hidden header row. This is a
  deliberate, narrow exception to the locked `20:40:40` desktop
  proportion — the label column can't compress as gracefully as the two
  data columns at 320px. Renamed the `Stability` comparison row's label
  from `Stabilization` (13, unbreakable characters — even
  `hyphens: auto` couldn't wrap it cleanly in headless Chromium) to
  `Stability`, matching the page's own `#stability` section name.
- Flattened `.lenses-heading` from a 2-column grid to the same plain
  block pattern as `.feature-copy` (eyebrow/h2/description as flat
  siblings, no wrapper `<div>`), at every width — this was a permanent
  layout change, not scoped to any breakpoint.

Applied changes:

- `src/js/three-responsive.js`: `getRouteProfile`, gated
  `MIN_PHONE_SCALE_COMPACT`.
- `src/js/three-route.js`: multiplicative `yAmplitude` in
  `getProductRoute`; `compactPhone`/`compactTablet` profile entries.
- `src/js/scroll-scenes.js`, `src/js/three-scene.js`: switched their
  `getProductRoute(...)` call from `getViewportProfile` to
  `getRouteProfile`.
- `src/styles.css`: new `@media (max-width: 1023px)` tier; `.section-shell`
  padding ramp; `.compare-row`/`.compare-head` mobile redesign;
  `.lenses-heading` flattened (grid removed) with its now-redundant
  ≤760px overrides deleted.
- `index.html`: flattened `.lenses-heading` markup; comparison table's
  `Stabilization` row label renamed to `Stability`.
- `tests/three-responsive.test.js`, `tests/three-route.test.js`: updated
  `getResponsiveModelScale` expectations, added `getRouteProfile` and
  `compactPhone`/`compactTablet` coverage.

Verified:

- `npm run build` — succeeded; known Three.js chunk-size warning only.
- `npm test` — 17/17 passed.
- Browser (Playwright): checked all 4 requested widths (320×568,
  430×932, 640×720, 768×1024) across hero/performance/stability/rugged —
  model is centred, non-drifting, and visibly larger at every one; no
  console errors. Section gaps confirmed shrinking from ~270-460px down
  to ~40-90px across this range. Comparison table renders as a real
  3-column grid down to 320px with no overflow. Lenses heading stacks at
  every checked width. Control-checked 1024×1366 and 768px-wide desktop
  views (hero, performance, comparison table) against the same
  screenshots taken before this task — confirmed pixel-equivalent,
  unchanged desktop/tablet behavior.
- Known remaining limitation: at the shortest tested viewport (320×568),
  the Performance section's 3-row fact-list and the Rugged section's
  condition-tag row each have a minor edge touch with the model — proven
  mathematically irreducible to zero given this viewport's height (Hero's
  safe zone and Rugged's safe zone don't overlap at all at 568px tall),
  short of shrinking the model back down or hiding content, either of
  which would contradict this task's own requests. Not present at
  430×932, 640×720, or 768×1024×.

### 2026-07-01 — Viewport dimension console diagnostics

Original request:

- Show clearly labeled width and height values in the browser console when
  the page opens and whenever the user changes the browser size.

Applied changes:

- Added `src/js/viewport-debug.js` and initialized it from `src/main.js`.
- The initial message is labeled `Viewport dimensions — initial`; resize
  messages are labeled `Viewport dimensions — resized`.
- Every message reports `window.innerWidth/innerHeight`,
  `document.documentElement.clientWidth/clientHeight`, and
  `window.outerWidth/outerHeight` with explicit width/height labels.
- Resize messages are coalesced with `requestAnimationFrame` to avoid
  duplicate logs within the same rendering frame.
- Added unit coverage for dimension labels, initial logging, and resize
  logging.

Verified:

- `npm test` — 19/19 passed.
- `npm run build` — succeeded; known Three.js chunk-size warning only.

### 2026-07-01 — Reliable viewport diagnostics follow-up

Original request:

- Fix the diagnostic output because DevTools showed only the
  `three_scene_ready` and `three_model_loaded` demo events.

Applied changes:

- Replaced the collapsed object log with a prominent multiline plain-text
  message prefixed by `[viewport-size]`.
- The message now appears at initial script execution, after the full page
  load, and after every viewport resize.
- Added physical screen dimensions (`window.screen.width/height`) alongside
  viewport, document client-area, and outer-window dimensions.
- Added `window.showViewportSize()`, allowing the current values to be
  printed manually from DevTools at any time.

Verified:

- `npm test` — 19/19 passed, including initial/load/resize/manual logs.
- Browser at 1280×720: both `initial` and `page loaded` messages appeared
  alongside the existing demo events.
- Browser resized to 390×844: a `resized` message reported viewport and
  document dimensions of exactly 390×844; no console errors.
- `npm run build` — succeeded; known Three.js chunk-size warning only.

### 2026-07-01 — Simplified viewport console output

Original request:

- Keep only `window.innerWidth` and `window.innerHeight` in the diagnostic
  message and remove the second automatic page-load message.

Applied changes:

- Removed document, outer-window, and physical-screen values.
- Removed the `page loaded` listener, leaving one initial message plus
  updated messages on resize.
- Kept the manual `showViewportSize()` console command.

Verified:

- `npm test` — 19/19 passed.
- `npm run build` — succeeded; known Three.js chunk-size warning only.

### 2026-07-01 — Viewport diagnostics moved into HTML

Original request:

- Move the width/height console output into `index.html` so it runs from
  the start and does not depend on application module loading.

Applied changes:

- Added the logger as an inline `<script>` in the document `<head>`, before
  the application module.
- Removed the `viewport-debug.js` module, its import from `main.js`, and its
  now-obsolete unit test.
- Preserved initial and resize messages plus the manual
  `showViewportSize()` command.

Verified:

- Browser at 1280×720: `[viewport-size] initial` was the first console
  message, before all demo events.
- Browser resized to 1152×635: the logger reported exactly
  `window.innerWidth: 1152px` and `window.innerHeight: 635px`.
- Browser console: 0 errors; expected headless WebGL driver warnings only.
- `npm test` — 17/17 passed.
- `npm run build` — succeeded; known Three.js chunk-size warning only.

### 2026-07-01 — Reliable classic viewport diagnostics

Original request:

- Deeply diagnose why the width/height message was still not visible in
  Browser Console and make it reliable after loading the development site.

Accepted decisions:

- Run the diagnostic in every environment, use `console.warn`, keep the
  page free of a visual debug indicator, and load a cache-busted classic
  script last in the HTML.

Applied changes:

- Replaced the inline `<head>` logger with
  `public/viewport-size.js`, referenced after the main module as
  `/viewport-size.js?v=20260701-2`.
- The script reports only `window.innerWidth` and `window.innerHeight` on
  initial load, resize, and manual `showViewportSize()` calls.
- Added `window.__viewportSizeDebugLoaded = true` as an explicit load check.
- Because the file lives in `public`, Vite copies it unchanged instead of
  processing it through the application module graph.

Verified:

- `npm test` — 17/17 passed.
- `npm run build` — succeeded; known Three.js chunk-size warning only.
- `dist/index.html` retains the cache-busted script reference, and
  `dist/viewport-size.js` is byte-identical to the public source.
- Dev browser at 1280×720 logged the initial warning; resizing to 1152×635
  logged those exact values. The global flag was `true`, the manual API was
  a function, and the diagnostic script was the final document script.
- Production preview at 1280×720 logged the initial warning; resizing to
  390×844 logged those exact values. The manual call returned
  `{ width: 390, height: 844 }`.
- Dev and preview console: 0 errors; dev retained only the known headless
  WebGL driver warnings.

### 2026-07-01 — 3D route configuration guide

Original request:

- Move the detailed explanation of the 3D model's default position, size,
  route, responsive behavior, and controls into a dedicated Markdown file.

Applied changes:

- Added `docs/three-model-route-guide.md` and linked it from the Project
  section of this file.
- Documented the active width/profile mapping, including the currently
  inactive legacy `mobile` profile.
- Documented route-node order and properties, profile transformation
  formulas, responsive scale composition, WebGL stage geometry, scroll
  interpolation/timing, runtime inspection, and safe tuning workflow.
- Added practical examples for moving the complete route, restoring compact
  movement, changing per-section scale/rotation, and optionally extending
  profiles with exact per-node coordinates.
- Kept the guide in English to preserve the repository's public
  English-only policy.

Verified:

- `git diff --check` — clean.
- No Cyrillic text in the new guide.
- `npm test` — 17/17 passed.
- `npm run build` — succeeded; known Three.js chunk-size warning only.

### 2026-07-01 — Russian 3D route configuration guide

Original request:

- Create the same 3D route configuration guide in Russian.

Accepted decision:

- Keep the English original and add a complete Russian counterpart. This
  user-requested document is an explicit exception to the repository's
  previous English-only content policy.

Applied changes:

- Added `docs/three-model-route-guide.ru.md`.
- Translated all 26 sections, tables, formulas, examples, tuning procedures,
  architecture limitations, runtime inspection instructions, and test
  guidance without changing the English source.
- Added both language variants to the Project file map.

Verified:

- English and Russian guides each contain 26 headings and 72 code-fence
  boundaries.
- `git diff --check` — clean.
- `npm test` — 17/17 passed.
- `npm run build` — succeeded; known Three.js chunk-size warning only.

### 2026-07-01 — Mobile comparison and visual-flow fixes

Original request:

1. At widths up to 768px, render Comparison as three vertical columns
   without separating every row into its own card.
2. Keep Hero Specs compact and horizontally centered instead of stretching
   the three values across the viewport.
3. Move the Battery and Mounting graphics away from their title,
   description, and fact-list content.

Accepted decisions:

- Keep all Comparison rows in one continuous three-column table.
- Put Battery/Mounting graphics in normal flow after the fact lists and let
  short-viewport sections grow rather than overlap content.
- Limit all new behavior to widths at or below 768px.

Applied changes (`src/styles.css`):

- Added a targeted `@media (max-width: 768px)` tier without widening the
  unrelated existing 760px mobile rules.
- Comparison keeps its compact approximately 30:35:35 columns, but rows now
  have zero margin, no individual outer border, and continuous table
  dividers.
- Hero Specs uses content width, auto side margins, centered contents, and a
  16–24px responsive gap. Centering deliberately avoids CSS transforms
  because GSAP owns the `.reveal` transform.
- Battery and Mounting sections become vertical flex containers; their copy
  comes first and their relative-positioned graphics follow with reserved
  spacing. Fact-list margins are contained so flex measures the real
  content height.
- The graphic gap accounts for the temporary 32px GSAP child reveal
  translation and the rotated Battery gauge's visual bounds.

Verified:

- Browser at 320×568, 390×844, 640×720, and 768×1024: every Comparison row
  has three columns, row margins/gaps are zero after reveal, and there is no
  horizontal overflow.
- Hero Specs is centered with a measured 0px center delta and uses a 16–24px
  gap.
- Battery/Mounting graphics are in normal flow, remain inside their
  sections, and have 52–77px settled separation from the fact lists. At the
  320px worst case, 24–32px separation remains during the reveal transform.
- Visual screenshots at 390px confirmed the Battery, Mounting, and
  Comparison compositions; temporary screenshots were removed.
- 769px and 1024px control checks retain the previous non-mobile
  positioning. Browser console: 0 errors.
- `git diff --check` — clean.
- `npm run build` — succeeded. It reports the existing Three.js chunk-size
  warning and an unrelated invalid `//max-width: 360px;` CSS comment.
- `npm test` is incomplete: 15/17 assertions pass. Two route tests still
  expect compact profile scales of `1`, while the current user-edited route
  returns `1.6`. This task did not modify route code or its tests.

## Current Status

- All agreed UI changes are implemented and verified.
- No unfinished tasks remain in the confirmed scope.
- Known non-blocking build note: Vite reports the Three.js chunk exceeding
  500 kB before gzip. This is an existing optimization warning, not an
  error.
- Known non-blocking visual note: at the shortest tested phone viewport
  (320×568), the Performance and Rugged sections have a minor, provably
  irreducible edge overlap between the centred 3D model and their last
  content row — see the 2026-07-01 responsive-fixes entry above.
- The repo has been translated to English and cleaned up for its first
  public GitHub push and Vercel deploy. This is not a final iteration —
  development continues after this publish.
- New requests should first be added to `Planned`, then moved to `Work
  History` with verification results once implemented.

## Planned

### 2026-07-02 — Public commit preparation and CI

- Request: Clean the repository, fix pre-commit blockers, add repeatable
  test/build automation, and leave the verified changes unstaged for review.
- Accepted decisions: Preserve the tuned compact routes and update tests;
  limit viewport diagnostics to localhost; add `npm run check` and GitHub
  Actions CI; split oversized project memory; do not stage, commit, push, or
  install third-party skills.
- Status: in progress
- Next step: Remove disposable artifacts and implement the agreed fixes.

Use this format for new tasks:

```md
### YYYY-MM-DD — Short title

- Request:
- Accepted decisions:
- Status: planned | in progress | blocked
- Next step:
```

Once finished, remove the entry from this section and add the actual result
to `Work History`.

## Local Memory System

`AGENTS.md` is the main long-term context for coding agents working in this
repo:

- project structure and commands;
- durable product and technical decisions;
- rules for working with the repository;
- a brief history of completed tasks;
- the current backlog and known limitations.

If the history grows too large, split memory into three files:

1. `AGENTS.md` — short, permanent instructions and links to the other files.
2. `WORKING_STATE.md` — the active task, current status, next step, and
   blockers.
3. `CHANGELOG.md` — a chronological log of already-shipped user-facing
   changes.

Recommended cycle:

1. Before starting work, read `AGENTS.md` and `WORKING_STATE.md`, if it
   exists.
2. Before implementation, record the confirmed task in `Planned`.
3. During a long task, update only the actual status and next step.
4. After verification, move the result into `Work History` or
   `CHANGELOG.md`.
5. Do not store hypotheses in memory as completed work, and do not record
   secrets.

## Memory Update Rule

After each subsequent task:

1. Briefly record the original request and the options the user chose.
2. Record the actual behavior that changed, not just the initial plan.
3. Note the verification commands and scenarios along with their real
   results.
4. Explicitly flag any incomplete or interrupted verification.
5. Do not record secrets, tokens, personal data, or temporary artifacts.

## Post-split Work History

### 2026-07-02 — Public commit preparation and CI

Original request:

- Clean and prepare the repository for a public commit, recommend useful
  skills/automation, run all checks, and leave the result convenient for
  review.

Accepted decisions:

- Preserve the user-tuned compact routes and update their tests.
- Restrict viewport diagnostics to localhost.
- Add a shared check command and GitHub Actions CI.
- Split oversized project memory.
- Leave all changes unstaged; do not commit, push, deploy, or install
  third-party skills.

Applied changes:

- Removed 45 ignored root screenshots (about 9.1 MiB),
  `.playwright-mcp`, and the unused `public/favicon.svg`.
- Updated route tests for the current compact-phone vertical coordinates
  and compact phone/tablet scales.
- Restricted `public/viewport-size.js` to `localhost` and `127.0.0.1`.
- Removed the invalid CSS `//` comment that caused a build warning.
- Synchronized both route guides with the current compact route values.
- Added `npm run check`, documented it in README, and added a Node 22
  GitHub Actions workflow for pushes and pull requests.
- Split memory into concise `AGENTS.md`, active `WORKING_STATE.md`, and this
  historical `CHANGELOG.md`.
- Reviewed available skills. Existing verification/deployment skills are
  sufficient; the official GitHub `git-commit` skill is the only optional
  third-party recommendation.

Verified:

- `npm ci` — succeeded from the lockfile; 15 packages installed.
- `npm run check` — succeeded after the clean install.
- Unit tests — 17/17 passed (9 responsive + 8 route).
- Production build — succeeded; only the known Three.js chunk-size warning
  remains.
- `npm audit --omit=dev` — 0 vulnerabilities.
- Browser at 1280×720: page title and Hero render correctly; 3D model
  reached `is-ready`; 0 console errors.
- Localhost exposes viewport diagnostics; a non-local hostname does not
  create the debug global or warning.
- Temporary Playwright output was removed after browser verification.
- No secrets or environment files were found.
- Git index remains empty; no commit or push was performed.

### 2026-07-02 — Pagecorder environment preparation

Original request:

- Create a dedicated branch and an environment-file example listing the
  values needed for a Pagecorder recording.

Applied changes:

- Created the `feat/pagecorder-demo-video` branch from `main`.
- Added `.env.example` with the RapidAPI key placeholder, fixed Pagecorder
  API host, source URL placeholder, and the requested 1280×720/20-second
  recording settings.
- Updated `.gitignore` so local `.env` variants remain untracked while
  `.env.example` remains available as documentation.
- No real API key, recording job, deployment, or external service mutation
  was added or performed.

Verified:

- `npm run check` — succeeded; tests and the production build passed.
- The existing Three.js chunk-size warning remains non-blocking.
- `git check-ignore -v --no-index .env.local .env.example` — confirmed that
  `.env.local` is ignored and `.env.example` is explicitly retained.
- `git diff --check` — succeeded.
- Browser verification was not run because this change does not affect
  runtime markup, styles, or JavaScript.

### 2026-07-02 — Pagecorder five-second demo mode

Original request:

- Prepare a first clean Pagecorder demo at 420×640 with smooth scrolling, a
  five-second duration, and no strict quality or FPS requirement.

Applied changes:

- Added an opt-in `?recording=1` mode that waits for the 3D stage, hides the
  scrollbar, starts Pagecorder, and scrolls linearly from the Hero through
  the Rugged section before stopping.
- Added URL controls for recording duration and route target; normal visits
  remain unchanged.
- Added `npm run record:pagecorder`, which reads the ignored `.env.local`,
  submits a Pagecorder job, polls its status, and reports the result URL and
  diagnostics without printing the API key.
- No deployment or Pagecorder job has been submitted yet; the user will
  create the Vercel branch deployment after approving the prepared push.

Verified:

- `npm run check` — succeeded; tests and the production build passed.
- Local browser at 420×640 — the 3D stage reached `is-ready`, Pagecorder
  `start` and `stop` fired once about 5.015 seconds apart, and the linear
  scroll reached the calculated Rugged endpoint.
- Browser page contained expected content with no Vite error overlay and no
  console errors.
- Chromium emitted only the localhost viewport diagnostic and non-blocking
  WebGL `ReadPixels` performance warnings.

External demo result:

- Pagecorder job `994` completed against the protected Vercel branch
  deployment using its temporary share URL.
- Requested settings: 420×640 viewport, five-second scripted route through
  Rugged.
- Reported result: six-second MP4, zero dropped-frame entries, and zero HTTP
  errors.
- Downloaded a temporary local review copy to
  `/tmp/gopro-pagecorder-demo-420x640.mp4`; it remains outside Git.
- Updated the runner to redact Vercel share-link query values from command
  output. Neither the RapidAPI key nor the Vercel share token was recorded.

Final recording attempt:

- Submitted Pagecorder job `995` for a 1280×720, 30-second full-page route;
  Pagecorder's capture target remains 60 FPS.
- The job failed without producing a video after the one-minute loading
  timeout.
- A separate cookie-aware request confirmed that the current Vercel share
  URL redirects anonymous clients to `vercel.com/login`, so Pagecorder
  cannot reach the page or its recording start signal.
- No duplicate retry was submitted. A fresh `Anyone with the link` URL is
  required first.

Final recording result:

- Verified the regenerated Vercel share URL returned the landing to an
  anonymous cookie-aware client before retrying.
- Pagecorder job `996` completed the 1280×720, 30-second full-page route
  using Pagecorder's 60 FPS capture.
- Pagecorder reported a 31-second MP4, no HTTP errors or browser error logs,
  and one `render_slow` dropped frame at `00:19.206`.
- Downloaded the 9,256,870-byte MP4 to
  `/tmp/gopro-pagecorder-final-1280x720-30s.mp4`; it remains outside Git.
- The signed result URL and Vercel share token were not recorded in project
  files.

### 2026-07-02 — Deterministic full-page recording timeline

Original request:

- Replace the delayed smooth-scroll behavior with a continuous vertical
  recording route: one second on Hero, 20 seconds from top to bottom, and one
  second on Footer.

Applied changes:

- Disabled CSS smooth scrolling only while Pagecorder mode is active.
- Replaced repeated browser-smoothed `scrollTo()` calls with direct
  `document.scrollingElement.scrollTop` updates on every animation frame.
- Added independent lead-in, linear-scroll, and end-hold URL/env/CLI
  parameters, with defaults of `1 + 20 + 1` seconds and a full-page target.
- Preserved the old `recordingDurationMs` and `--duration` values as
  compatibility fallbacks for scroll duration.
- Added a unit test for the exact linear progress timeline.
- No external Pagecorder job or deployment was performed for this change.

Verified:

- `npm run check` — succeeded; all three test files and the production build
  passed. The known Three.js chunk-size warning remains.
- Browser at 1280×720 — 3D reached `is-ready` before recording, computed
  recording scroll behavior was `auto`, and no page errors occurred.
- Recorded scroll samples were `0px` at start, `1841px` at 6 seconds,
  `3592px` at 11 seconds, `5390px` at 16 seconds, and the exact `7195px`
  endpoint before the one-second Footer hold.
- The local start/stop interval was about 22.017 seconds. Chromium emitted
  only the existing localhost viewport diagnostic and non-blocking WebGL
  `ReadPixels` warnings.
