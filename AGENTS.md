# Project Memory — HERO13 Black Landing

Read this file and `WORKING_STATE.md` before making changes. Record completed
work in `CHANGELOG.md` without deleting previous entries.

## Project

- Stack: Vite, vanilla HTML/CSS/JavaScript, GSAP, Three.js.
- Main markup: `index.html`.
- Main styles: `src/styles.css`.
- Scroll/WebGL transitions: `src/js/scroll-scenes.js`.
- Form: `src/js/preorder-form.js`.
- Route guides:
  `docs/three-model-route-guide.md` and
  `docs/three-model-route-guide.ru.md`.
- Verification: `npm run check`.
- Active state and backlog: `WORKING_STATE.md`.
- Historical changes: `CHANGELOG.md`.

## Locked-in product decisions

- Display headings mostly use two white lines and one blue line, without
  decorative periods.
- Header and main sections share one horizontal page gutter.
- The product path has five steps: Performance, Stability, Rugged, Enduro
  Battery, and Mounting System.
- Lenses uses the landing's dark visual system.
- Form and success state use their content height without fixed empty space.
- Activity has nine non-wrapping options in a `3 × 3` grid at laptop,
  tablet, and mobile widths.
- Desktop Comparison uses `20:40:40`; up to 768px it remains one continuous
  three-column table with compact mobile proportions.
- HERO13 comparison values remain blue without a highlighted column
  background.
- Performance, Battery, Mounting, and Preorder share `.fact-list`.
  Preorder is a single-column list.
- The Anamorphic orbit stays circular and uses an internal horizontal blue
  flare as its distinguishing detail.
- `RESERVE / THE SHOT` is CSS-only, non-selectable decorative content.
- Comparison, Footer, and Form utility copy uses `.compact-note`, capped at
  360px; only the Form note is centered.
- Hero Specs and Depth Markers have no internal divider lines.
- Runtime and social title: `GoPro HERO13 Black`.
- Header, footer, and favicon use `public/GoPro_logo_light.svg`; keep the
  `HERO13 BLACK` wordmark and do not recreate `.brand-mark`.
- Battery and Mounting graphics enter normal flow after their fact lists at
  widths up to 768px so they never overlap copy.
- The Russian route guide is an explicit user-approved exception to the
  repository's otherwise English-first public content.

## Repository rules

- Preserve user changes in the dirty worktree.
- Before implementation, record the confirmed task in `WORKING_STATE.md`.
- After implementation, run `npm run check` and relevant browser checks.
- Append actual results, commands, failures, and incomplete verification to
  `CHANGELOG.md`.
- Keep temporary screenshots, `.playwright-mcp`, `dist`, `node_modules`,
  local settings, secrets, and credentials out of Git.
- Do not record hypotheses as completed work.
- Do not stage, commit, push, deploy, or mutate external services unless the
  user explicitly requests that action.

## Known non-blocking notes

- Vite reports the Three.js bundle exceeding 500 kB before gzip.
- At the shortest tested phone viewport (`320×568`), the centered 3D model
  can lightly touch the last Performance/Rugged content row. Eliminating it
  would require shrinking or hiding the model and conflicts with the chosen
  presentation.
