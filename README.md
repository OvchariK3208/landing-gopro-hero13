# HERO13 Black Landing Concept

Unofficial portfolio concept for a cinematic HERO13 Black product landing page.

## Run locally

```bash
npm install
npm run dev
```

The development server listens at:

```text
http://localhost:5173
```

`--host` also prints a LAN URL (e.g. `http://192.168.x.x:5173`) so you can
preview on another device connected to the same network while `npm run dev`
is running.

Create a production build with:

```bash
npm run build
```

Run the complete pre-commit verification with:

```bash
npm run check
```

This runs the unit tests first and creates a production build only when they
pass.

When running on `localhost`, the browser console reports the current
`window.innerWidth` and `window.innerHeight` on load and resize. Run
`showViewportSize()` in DevTools to print the values manually. This
diagnostic is disabled on deployed hosts.

GitHub Actions runs the same `npm run check` command for every push and pull
request.

## Deploy on Vercel

The generated `dist` directory is a static Vite site and deploys on Vercel
with no extra configuration:

1. Push this repo to GitHub.
2. In Vercel, import the GitHub repository as a new project.
3. Vercel auto-detects the "Vite" framework preset with build command
   `npm run build` and output directory `dist`. No `vercel.json` is needed.
4. Deploy — every push to the main branch redeploys the live demo.

## Implementation notes

- The 3D camera model is a licensed asset (CC BY 4.0, by Configcars on
  Sketchfab), loaded at runtime via Three.js's `GLTFLoader`. Attribution is
  shown in the page footer.
- GSAP ScrollTrigger drives the product scenes using native browser scrolling.
- The preorder form never sends or persists entered data. It validates and clears the email in the browser.
- Demo analytics only write event summaries to the development console.
- WebGL rendering pauses outside the product-story sections and is capped at 30 FPS on mobile.
- Reduced-motion preferences disable non-essential motion.

This project is not affiliated with or endorsed by GoPro. GoPro and HERO are
trademarks of GoPro, Inc.
