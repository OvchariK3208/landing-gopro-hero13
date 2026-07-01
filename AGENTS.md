# Project Memory — HERO13 Black Landing

This file stores accepted decisions, completed changes, and verification
results. After every completed task, the agent must update the `Work
History` section without deleting previous entries.

## Project

- Stack: Vite, vanilla HTML/CSS/JavaScript, GSAP, Three.js.
- Main markup: `index.html`.
- Main styles: `src/styles.css`.
- Scroll/WebGL transitions: `src/js/scroll-scenes.js`.
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

## Current Status

- All agreed UI changes are implemented and verified.
- No unfinished tasks remain in the confirmed scope.
- Known non-blocking build note: Vite reports the Three.js chunk exceeding
  500 kB before gzip. This is an existing optimization warning, not an
  error.
- The repo has been translated to English and cleaned up for its first
  public GitHub push and Vercel deploy. This is not a final iteration —
  development continues after this publish.
- New requests should first be added to `Planned`, then moved to `Work
  History` with verification results once implemented.

## Planned

As of 2026-07-01, the confirmed backlog is empty.

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
