# 02 — Product Landing PRD

## 1. Project Title

**Official-style GoPro HERO13 Black landing concept**

## 2. Project Type

Portfolio / production-style marketing landing page.

This is an unofficial concept page created for portfolio demonstration. It should look polished and production-ready, but it must not pretend to be the real GoPro website and must not process real payments or store real user data.

---

## 3. Main Role of the Website

The main role of the preorder landing page is to present the product before purchase, build interest, explain why the product is useful, simulate preorder demand, and redirect the most interested users to the main website/order flow.

The landing should collect only simulated frontend intent signals: typed email/contact, CTA clicks, selected product/bundle, traffic source idea, scroll depth, transitions to the main website, and interaction with important landing sections. These values are for portfolio/demo behavior only and must not be saved.

---

## 4. Core Business Goal

Create a cinematic product landing page that makes HERO13 Black feel like a premium action camera for extreme-sports users and creators.

The page must answer one simple user question:

> Why would I buy a dedicated action camera if my phone already records video?

The answer:

> Because HERO13 Black is built for the shots where your phone should stay in your pocket.

---

## 5. Target Audience

Primary audience:

- Extreme sports users.
- Bike / MTB / moto riders.
- Ski and snowboard users.
- Surf, water, travel and outdoor users.
- Content creators who need action footage.
- People comparing action cameras with smartphone video.

Audience mindset:

- Wants impressive footage.
- Wants reliable stabilization.
- Wants hands-free capture.
- Wants a device that can be mounted anywhere.
- Wants to avoid risking a daily phone during action shots.

---

## 6. Product Positioning

### Main positioning

**HERO13 Black is not just another camera. It is a dedicated action-capture system for movement, water, impact-risk, mounting, and creative POV footage.**

### Main product advantages to emphasize

- 5.3K60 and 4K120 action video.
- High-frame-rate slow motion.
- HyperSmooth 6.0 stabilization.
- Waterproof to 33ft / 10m.
- Rugged action-camera form factor.
- Magnetic mounting and GoPro mounting ecosystem.
- HB-Series lens mods with auto-detect.
- 10-bit color, HLG HDR and GP-Log workflow.
- GPS overlays: speed, altitude, path, g-force.
- Bluetooth audio and voice commands.
- Wi-Fi 6 faster transfer.

---

## 7. Comparison Requirement

The landing must include a clear comparison with a typical cheaper 2024 smartphone.

Selected comparison direction: **Option B** — compare HERO13 Black with a typical phone from that period that costs slightly less than the camera.

Recommended comparison model for research/storytelling:

**Samsung Galaxy A25 5G**

Reason:

- Recognizable 2024 budget/mid-range Android phone.
- Around $299 US price, below HERO13 Black’s $399.99 launch price.
- Has 50MP OIS camera and 4K30 video, so the comparison feels fair.
- Represents the real consumer objection: “My phone already shoots video.”

### Comparison message

Do not say the phone is useless. Say the phone is good for everyday moments, but HERO13 Black is better for action conditions.

Recommended copy:

> Your phone is great for everyday moments. HERO13 Black is built for the moments where your phone should stay in your pocket.

### Comparison content to show

| Topic | Phone | HERO13 Black | Message |
|---|---|---|---|
| Everyday use | Better for calls, apps, daily photos | Dedicated only to capture | HERO13 focuses on the shot. |
| Action video | Usually handheld or clamp-based | Built for mounts and movement | Safer, more stable, more flexible. |
| Video modes | 4K30 on typical cheaper phone | 5.3K60, 4K120, high-frame-rate modes | Better for fast motion and slow motion. |
| Stabilization | Good in normal use, limited in some modes | HyperSmooth 6.0 | Built around movement. |
| Waterproof/action risk | Not ideal to risk daily phone | Waterproof/rugged action body | Bring HERO13 into rough conditions. |
| Mounting | Needs adapters/clamps | Magnetic latch, mounting fingers, tripod thread | Faster, cleaner, action-ready. |
| Creative POV | Limited by phone shape/lenses | HB-Series lenses and POV ecosystem | More action-focused perspectives. |

---

## 8. User Flow

1. User opens landing page.
2. User sees cinematic 3D HERO13 Black reveal.
3. User scrolls through pinned feature sections.
4. 3D model changes position/rotation/scale based on scroll.
5. User reads short marketing copy beside the product.
6. User reaches the comparison block: HERO13 Black vs typical phone.
7. User clicks CTA: “Preorder Concept”, “Reserve Your Spot”, or “Get Early Access”.
8. User enters email/contact and optionally chooses a bundle.
9. On submit, the site validates email format.
10. The form clears the contact field.
11. The site shows a thank-you message.
12. The page may offer a button to “Continue to main site” / “View full specs”.

---

## 9. Preorder Form Behavior

### Important privacy/demo rule

No real data must be saved.

Do not use:

- Database.
- Backend API.
- LocalStorage.
- Cookies.
- Real analytics collection.
- Payment provider.
- Real checkout.

### Form fields

Required:

- Email address.

Optional:

- Bundle/version selector.
- Activity interest selector: MTB, Moto, Surf, Snow, Travel, Creator.

### Submit behavior

After submit:

1. Validate email format.
2. Show success state.
3. Clear email/contact field.
4. Keep selected bundle only if needed for visual feedback, or reset everything.
5. Do not persist anything.

### Success message

Use this message:

> Thanks for your preorder request. We’ll contact you soon by email with the next steps.

---

## 10. Data Points to Simulate

The landing can simulate the following data points in the UI or console for demo purposes only:

- Email/contact entered into form.
- CTA click.
- Selected product/bundle.
- Selected activity interest.
- Source/UTM idea.
- Scroll depth.
- Section visibility.
- Clicks on comparison block.
- Clicks on “main site” / “view specs” links.
- 3D model interactions.

Implementation note:

Use a mock function such as `trackDemoEvent(name, payload)` that only logs to console in development. It must not send requests anywhere.

---

## 11. Content Language

The landing copy should be in English.

Internal PRD/comments can be in Russian or English, but user-facing page copy should feel like a real international product landing page.

Selected direction: **general marketing copy**.

---

## 12. Suggested Marketing Copy

### Main headline options

1. **Built for the shot your phone cannot safely take.**
2. **Mount it. Send it. Capture everything.**
3. **The action camera for full-speed moments.**

Recommended main headline:

> Built for the shot your phone cannot safely take.

### Subheadline

> HERO13 Black is made for speed, water, impact, and impossible angles — with 5.3K video, HyperSmooth stabilization, and a mounting system built for action.

### CTA labels

- Reserve Your Spot
- Get Early Access
- Preorder Concept
- Compare With Phone
- Explore HERO13 Black

### Feature copy

**5.3K action clarity**  
Full-speed moments deserve more than ordinary video.

**Stable when the ground is not**  
HyperSmooth keeps the shot locked while everything else moves.

**Water, snow, mud — bring it on**  
A rugged waterproof body lets you capture where your phone should not go.

**One camera. Any angle.**  
Helmet, handlebar, chest, tripod, board — mount it and move.

**Keep your phone in your pocket**  
Use your phone for daily life. Use HERO13 Black for the action.

---

## 13. Page Structure

### Section 1 — Product Reveal

Purpose:

- Create a strong first impression.
- Show the 3D model immediately.
- Explain the product in one sentence.

Content:

- 3D HERO13 Black model.
- Short headline.
- Short subheadline.
- Main CTA.

Interaction:

- Product model slowly rotates or enters with subtle scroll-based movement.
- No heavy intro loader unless absolutely necessary.

---

### Section 2 — Action Video Performance

Purpose:

- Show why HERO13 Black is stronger than everyday phone video for action.

Content:

- 5.3K60.
- 4K120.
- Slow motion.
- Full-speed action scenes.

Interaction:

- Model moves closer.
- Text appears beside the model.
- Use GSAP ScrollTrigger pinned scene.

---

### Section 3 — HyperSmooth Stabilization

Purpose:

- Sell the “stable even during chaos” idea.

Content:

- HyperSmooth 6.0.
- Movement, vibration, jumps, turns.

Interaction:

- Camera model can tilt/rotate while text stays locked.
- Consider split visual: “shaky phone” vs “stable HERO13” as copy/visual metaphor.

---

### Section 4 — Rugged + Waterproof

Purpose:

- Make the phone comparison emotional and practical.

Content:

- Waterproof to 33ft / 10m.
- Snow, water, mud, rain, dust.
- “Do not risk your daily phone.”

Interaction:

- Dark/wet visual section.
- Subtle water/snow texture only if lightweight.
- Avoid heavy particle simulation.

---

### Section 5 — HB-Series Lenses

Purpose:

- Show modularity and premium creativity.

Content:

- Ultra Wide POV.
- Macro.
- Anamorphic 21:9.
- ND filters for motion blur.

Interaction:

- Lens cards or short horizontal feature list.
- Model can change front angle to emphasize lens area.

---

### Section 6 — HERO13 Black vs Phone

Purpose:

- Answer the objection: “Why not just use my phone?”

Content:

- Comparison against Samsung Galaxy A25 5G / typical cheaper 2024 phone.
- Clear advantages of HERO13 Black.
- Keep it respectful: phone is good for daily use, HERO13 is better for action.

Required message:

> Your phone is great for everyday moments. HERO13 Black is built for the moments where your phone should stay in your pocket.

---

### Section 7 — Preorder CTA

Purpose:

- Simulate conversion.
- Show portfolio-level form state and UX.

Content:

- Email field.
- Bundle selector.
- Submit button.
- Privacy/demo note.

Copy:

> Join the early access list. No payment. No checkout. Just a preorder concept demo.

---

### Section 8 — Thank You / Redirect

Purpose:

- Finish the user journey.

Content:

- Thank-you message.
- “We’ll contact you soon by email.”
- Button to continue to main site or explore specs.

Behavior:

- Contact field is cleared.
- No data is saved.

---

## 14. Technical Stack

Required stack:

- HTML.
- CSS.
- JavaScript.
- Three.js installed via npm.
- GSAP.
- ScrollTrigger.
- Vercel deployment.

Recommended implementation setup:

- Vite vanilla project.
- Static build output.
- Use npm for dependencies.
- Keep code modular.
- No Lenis smooth scroll.
- Use native browser scroll with GSAP ScrollTrigger.

Possible folders:

```txt
/src
  /assets
    /models
    /textures
    /images
  /styles
    base.css
    layout.css
    components.css
  /js
    main.js
    three-scene.js
    scroll-scenes.js
    preorder-form.js
    demo-analytics.js
/public
  /models
  /images
index.html
vite.config.js
```

---

## 15. 3D Model Requirements

The page should use a 3D GoPro-style model from Sketchfab or another legal source.

Requirements:

- Use only a model with a license that allows portfolio/demo usage.
- Credit the model author if required by the license.
- Optimize the model before production build.
- Prefer `.glb` format.
- Compress geometry/textures where possible.
- Do not load huge unoptimized textures.

Optimization checklist:

- Use glTF Transform.
- Remove unused nodes/materials/animations.
- Resize textures.
- Use KTX2/Basis texture compression if possible.
- Use Draco or Meshopt if it does not complicate the project too much.
- Lazy-load the model after critical HTML/CSS.
- Show a lightweight fallback if WebGL fails.

---

## 16. Scroll / Animation Requirements

Animation direction:

- Fullscreen one-page scroll-driven product storytelling.
- Pinned sections.
- 3D model moves/rotates/scales with scroll.
- Text appears beside the model.
- Product usually stays near the center but can shift depending on section.
- Test three depth variants for scene composition if needed.

Required library:

- GSAP ScrollTrigger.

Do not use:

- Lenis.
- Heavy particles.
- Heavy visual FX.
- Progress bar.
- Overloaded animation on mobile.

Mobile animation rule:

- Keep scroll scenes simpler on mobile.
- Reduce or disable expensive 3D movement if performance drops.
- Do not let animation break reading flow.

---

## 17. Responsive Requirements

Must work on:

- Mobile.
- Tablet.
- Desktop.

Desktop:

- 3D model can be centered or slightly offset.
- Text appears beside the model.
- Large cinematic sections.

Tablet:

- Reduce model scale.
- Keep text readable.
- Avoid overcrowded split layouts.

Mobile:

- Stack text and model vertically when needed.
- Reduce pinned-section complexity.
- CTA must remain easy to tap.
- Form must be simple and readable.

---

## 18. Performance Requirements

Main performance goal:

The site must feel visually premium but remain lightweight.

Targets:

- Minimal JavaScript beyond Three.js + GSAP.
- Avoid unnecessary UI libraries.
- Optimize 3D assets aggressively.
- Use compressed images.
- Lazy-load non-critical assets.
- Avoid long blocking animations.
- Avoid memory leaks in Three.js render loop.
- Pause/reduce rendering when model is not visible if possible.

Recommended budget direction:

- Keep initial page HTML/CSS small.
- Load 3D model separately.
- Keep total model/texture size as low as realistically possible.
- Prefer CSS effects over heavy JS effects.

---

## 19. SEO / Metadata

Even though this is a portfolio concept, it should look production-ready.

Include:

- Proper `<title>`.
- Meta description.
- Open Graph title/description/image.
- Clean semantic HTML.
- Headings in logical order.
- Image alt text.
- No misleading claim that this is official GoPro.

Suggested title:

> GoPro HERO13 Black Landing Concept — Action Camera Preorder Experience

Suggested meta description:

> A cinematic product landing concept for GoPro HERO13 Black, focused on action footage, rugged capture, stabilization, and a simulated preorder flow.

---

## 20. Accessibility Requirements

- Text contrast must be readable.
- Buttons must have visible focus states.
- Form errors must be understandable.
- Do not rely only on animation to communicate important content.
- Respect `prefers-reduced-motion`.
- Provide fallback static product image or simplified layout if WebGL is unavailable.
- Make CTAs keyboard accessible.

---

## 21. Legal / Portfolio Safety

Because this is an official-style concept:

- Add a small footer note: “Unofficial portfolio concept. GoPro and HERO are trademarks of GoPro, Inc.”
- Do not use real GoPro checkout.
- Do not take payment.
- Do not claim partnership.
- Do not pretend to be the real GoPro website.
- Use only legally allowed assets/models.

---

## 22. Acceptance Criteria

The project is complete when:

1. The landing is a one-page cinematic product experience.
2. The HERO13 Black 3D model is visible and scroll-driven.
3. GSAP ScrollTrigger controls the main scroll scenes.
4. There is no Lenis implementation.
5. The page includes a clear comparison with a cheaper typical 2024 smartphone.
6. The comparison clearly emphasizes HERO13 Black advantages.
7. The preorder form works as a simulation only.
8. The form clears contact data after submit.
9. No user data is saved anywhere.
10. A thank-you message appears after submit.
11. The page is responsive on mobile, tablet, and desktop.
12. 3D assets are optimized.
13. The site can be deployed to Vercel.
14. The page contains SEO metadata and portfolio-safe disclaimer.
15. The design feels premium, official-style, and production-ready.

---

## 23. Locked User Answers / Decisions

These decisions are taken as fixed requirements:

1. Project title: **Official-style GoPro HERO 13 Black landing concept**.
2. Main role: present product before sales, check interest, gather potential buyers, redirect interested users to the main website/order flow.
3. Contact/preorder behavior: clear contact data after submit, show thank-you message, do not save data anywhere.
4. Comparison: **Option B** — compare against a typical phone from the same period that costs slightly less than the camera; clearly emphasize HERO13 advantages.
5. Copy direction: **general marketing copy**.
6. User selected: **A**.
7. User selected: **B**.
8. Requirement confirmed: **yes, mandatory**.
9. Requirement confirmed: **yes, mandatory**.
10. User selected: **C**.
11. Deliver as two files:
    - `01-gopro-hero13-research.md`
    - `02-product-landing-prd.md`
12. Execute according to this structure.

Note: items 6, 7, 8, 9, and 10 preserve the user’s selected answer labels. If these labels came from a previous questionnaire, they should remain aligned with that original option list during implementation.

---

## 24. Suggested Implementation Prompt for Coding Agent

Build a static, production-style, unofficial GoPro HERO13 Black preorder landing concept using HTML, CSS, JavaScript, Three.js, GSAP, and ScrollTrigger. Use a cinematic one-page scroll-driven structure with a 3D camera model, pinned feature sections, responsive layouts, and short English marketing copy. Do not use Lenis. Do not implement real backend, database, payment, localStorage, cookies, or analytics. The preorder form must only simulate submission: validate email, clear contact data, and show a thank-you message saying the user will be contacted by email. Include a comparison section against a typical cheaper 2024 smartphone, using Samsung Galaxy A25 5G as the research reference, and clearly emphasize why HERO13 Black is better for action footage, waterproof/rugged use, mounting, stabilization, high-frame-rate video, and creative POV capture. Optimize all 3D assets and prepare the project for Vercel deployment.
