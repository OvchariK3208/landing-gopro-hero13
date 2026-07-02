# HERO13 3D Model Route Configuration Guide

This guide explains where the HERO13 model position, route, rotation, and
responsive size are configured, how the values are combined, and which
settings are active at each viewport width.

## Quick file map

| Concern | File | Main setting |
| --- | --- | --- |
| Route points and per-profile transforms | `src/js/three-route.js` | `BASE_ROUTE`, `PROFILE_SETTINGS` |
| Width breakpoints and responsive size | `src/js/three-responsive.js` | `getRouteProfile()`, `getResponsiveModelScale()` |
| Applying position, rotation, and scale | `src/js/three-scene.js` | `applyRouteTransform()` |
| Scroll timing and route visibility | `src/js/scroll-scenes.js` | `refreshProductRoute()`, ScrollTrigger instances |
| Visible WebGL stage area | `src/styles.css` | `.webgl-stage` |

## Active profile by viewport width

`getRouteProfile(width)` selects the route profile:

| Viewport width | Active profile |
| --- | --- |
| Below `768px` | `compactPhone` |
| `768px`–`1023px` | `compactTablet` |
| `1024px`–`1199px` | `tablet` |
| `1200px` and above | `desktop` |

Important: the existing `mobile` profile is not currently selected.
`getRouteProfile()` returns `compactPhone` before `getViewportProfile()` can
return `mobile`. Editing `mobile` therefore has no visible effect under the
current routing logic.

To reactivate it, change:

```js
if (width < 768) return "compactPhone";
```

to:

```js
if (width < 768) return "mobile";
```

This restores its side-to-side movement, but can also reintroduce model/text
overlap on narrow screens.

## Route point order

`BASE_ROUTE` contains four scroll nodes:

```text
Index 0: Hero
Index 1: Performance
Index 2: Stability
Index 3: Rugged
```

Every `scales` and `rotations` array in `PROFILE_SETTINGS` uses that exact
order.

The WebGL route ends at Rugged. When Battery reaches `72%` of the viewport,
the WebGL stage fades out and rendering stops. Battery, Mounting, Lenses,
Comparison, and Preorder are not route nodes.

## Route node properties

Each `BASE_ROUTE` node has the following shape:

```js
{
  id: "hero",
  selector: "#top",
  anchorX: 0.62,
  anchorY: 0.06,
  z: 0,
  rotation: { x: -0.08, y: -0.42, z: -0.06 },
  scale: 1,
}
```

### `anchorX`: horizontal position

```text
Negative value → left
0              → center
Positive value → right
```

A practical starting range is approximately `-0.6` to `0.6`. Values closer
to `-1` or `1` approach the camera frustum edge and can clip the model.

### `anchorY`: vertical position

```text
Negative value → down
0              → center
Positive value → up
```

The same approximate `-0.6` to `0.6` tuning range is useful.

### `z`: depth

```text
Positive value → closer to the camera
Negative value → farther from the camera
```

Changing `z` also changes the apparent size through perspective. Use
`scale` for predictable size adjustments and reserve `z` for depth.

### `rotation`

Rotation values are radians:

| Value | Approximate angle |
| --- | --- |
| `0.1` | `5.7°` |
| `0.5` | `28.6°` |
| `1` | `57.3°` |

The axes are:

```text
x → pitch forward/backward
y → turn left/right
z → roll sideways
```

### `scale`

`1` is the route baseline, `1.1` is 10% larger, and `0.9` is 10% smaller.

In the current implementation, every profile supplies its own `scales`
array. `getProductRoute()` overwrites the node's `BASE_ROUTE.scale` with
`profile.scales[index]`. Editing only `BASE_ROUTE.scale` therefore has no
effect unless the profile override is also changed or removed.

## How profile settings transform the base route

For every node, `getProductRoute()` calculates:

```js
finalAnchorX = baseAnchorX * profile.xAmplitude;

finalAnchorY =
  baseAnchorY * (profile.yAmplitude ?? 1) +
  profile.yOffset;

finalRotation =
  profile.rotations?.[index] ?? baseRotation;

finalRouteScale = profile.scales[index];
```

### `xAmplitude`

Controls the width of the complete horizontal route:

| Value | Result |
| --- | --- |
| `0` | All nodes are horizontally centered |
| `0.3` | Small side-to-side movement |
| `0.7` | Noticeable movement |
| `1` | Full `BASE_ROUTE` movement |
| Above `1` | Wider than the base route |

It is a multiplier, not a global horizontal offset.

### `yAmplitude`

Controls how much of each node's base vertical difference is retained:

| Value | Result |
| --- | --- |
| `0` | All base `anchorY` differences are removed |
| `0.5` | Vertical route differences are halved |
| `1` or omitted | Full base vertical differences |

### `yOffset`

Moves every route point vertically by the same amount:

```text
More negative → move the entire route down
Closer to 0   → move it toward the stage center
Positive      → move the entire route up
```

There is currently no matching `xOffset`. Exact horizontal positioning must
be done through `BASE_ROUTE.anchorX`, `xAmplitude`, or a code extension
described later in this guide.

## Current phone position

The active phone profile is:

```js
compactPhone: {
  xAmplitude: 0,
  yAmplitude: -1,
  yOffset: -0.38,
  scales: [1.6, 1.7, 2, 1.8],
  // ...
}
```

Its final coordinates are:

```js
finalAnchorX = anyBaseX * 0;
// Result: 0 for every node

finalAnchorY = baseAnchorY * -1 + -0.38;
// Results: Hero -0.44, Performance -0.38,
// Stability -0.42, Rugged -0.36
```

The model remains horizontally centered but follows a subtle vertical path.
Its per-node route scales are `1.6`, `1.7`, `2`, and `1.8`.

The page's initial/default route state is the first node of the active
profile, so the default position is always the active profile's Hero point.

The active compact-tablet profile remains centered at `x: 0`, `y: 0` and
uses route scales `[1.6, 1.8, 1.7, 1.7]`.

## Moving the complete phone route

Move the complete path upward while preserving its vertical variation:

```js
compactPhone: {
  xAmplitude: 0,
  yAmplitude: -1,
  yOffset: -0.2,
  scales: [1.6, 1.7, 2, 1.8],
  // ...
}
```

Relative to the current `-0.38`, `-0.2` is closer to the center and
therefore higher.

Useful comparison:

```text
-0.50 → move the complete path lower
-0.38 → current offset
-0.20 → move the complete path higher
 0     → center the path around the base inversion
```

To keep the model at one fixed vertical position instead, set
`yAmplitude: 0`; then every node uses only `yOffset`.

## Restoring phone movement

Example:

```js
compactPhone: {
  xAmplitude: 0.7,
  yAmplitude: 1,
  yOffset: -0.1,
  scales: [1, 1.06, 0.98, 1.03],
  // ...
}
```

The final horizontal coordinates become:

| Node | Calculation | Result |
| --- | --- | --- |
| Hero | `0.62 × 0.7` | `0.434` |
| Performance | `0.42 × 0.7` | `0.294` |
| Stability | `-0.54 × 0.7` | `-0.378` |
| Rugged | `0.40 × 0.7` | `0.280` |

The route is:

```text
Right → slightly right → left → right
```

## Changing an individual point

For example, change the base Stability node:

```js
{
  id: "stability",
  selector: "#stability",
  anchorX: -0.3,
  anchorY: 0.15,
  z: -0.1,
  rotation: { x: -0.18, y: 0.46, z: -0.14 },
  scale: 1.04,
}
```

This moves Stability closer to the horizontal center, moves it upward, and
keeps it slightly farther from the camera.

Changing `BASE_ROUTE` affects every profile that has non-zero amplitude.
It is not an independent phone-only point override.

## Changing model size per section

Edit the active profile's `scales` array:

```js
compactPhone: {
  scales: [
    1.2,  // Hero
    1.1,  // Performance
    1.05, // Stability
    1.15, // Rugged
  ],
}
```

This means:

```text
Hero        → 120% of route baseline
Performance → 110%
Stability   → 105%
Rugged      → 115%
```

## Responsive size

Route scale is only one part of the final size. The rendered size is:

```text
Final model size =
responsive viewport scale × route scale
```

The responsive scale comes from `getResponsiveModelScale()` in
`src/js/three-responsive.js`.

Main constants:

```js
const MIN_PHONE_SCALE = 0.52;
const MIN_PHONE_SCALE_COMPACT = 0.64;
const MIN_LANDSCAPE_SCALE = 0.58;
const FULL_SIZE_WIDTH = 1200;
const FULL_SIZE_HEIGHT = 720;
const FULL_SIZE_STAGE_ASPECT = 1.6;
```

The function calculates width, height, and WebGL-stage-aspect scales and
uses the smallest:

```js
return Math.min(widthScale, heightScale, aspectScale);
```

For example:

```text
Responsive scale: 0.64
Hero route scale: 1.20
Final scale:       0.64 × 1.20 = 0.768
```

To make the minimum compact model larger at all widths below `1024px`:

```js
const MIN_PHONE_SCALE_COMPACT = 0.75;
```

This is a minimum, not a fixed size. Width, height, and stage aspect can
still determine the final value.

## WebGL stage and coordinate center

On desktop, `.webgl-stage` covers the entire viewport:

```css
.webgl-stage {
  position: fixed;
  inset: 0;
}
```

Below `1024px`, CSS changes it to:

```css
.webgl-stage {
  top: 29vh;
  height: 58vh;
}
```

Consequently, `anchorY: 0` means the center of this `58vh` stage band, not
the center of the full page. If route values appear mathematically correct
but visually too high or low, inspect the stage CSS before increasing the
route offsets.

## Route interpolation and scroll timing

The model does not jump directly between route nodes. Position, depth,
rotation, and scale are interpolated with `smoothstep`:

```js
progress = progress * progress * (3 - 2 * progress);
```

Scroll anchors are calculated from each section's measured geometry:

```js
sectionTop +
sectionHeight / 2 -
viewportHeight * 0.35
```

Changing `anchorX`, `anchorY`, `z`, rotation, or scale changes the model
transform, but not when the model reaches the node. Scroll timing is
controlled separately by this anchor formula and the ScrollTrigger range.

## Recommended compact-phone starting route

```js
compactPhone: {
  xAmplitude: 0.45,
  yAmplitude: 1,
  yOffset: -0.15,

  scales: [
    1.15, // Hero
    1.1,  // Performance
    1.05, // Stability
    1.12, // Rugged
  ],

  rotations: [
    { x: -0.05, y: -0.3, z: -0.03 },
    { x: 0, y: -0.15, z: 0 },
    { x: -0.05, y: 0.15, z: -0.03 },
    { x: 0.05, y: -0.3, z: 0.02 },
  ],
}
```

This restores visible movement while keeping it narrower and calmer than
the desktop route.

## Independent positions for each profile

The current profile format supports:

- one horizontal amplitude for the complete route;
- one vertical amplitude for the complete route;
- one vertical offset for the complete route;
- independent per-node rotation and scale.

It does not support exact per-node `anchorX`/`anchorY` overrides for one
profile only.

If exact phone-only coordinates are required, extend the profile:

```js
compactPhone: {
  positions: [
    { x: 0, y: -0.2 },    // Hero
    { x: 0.2, y: -0.1 },  // Performance
    { x: -0.2, y: 0 },    // Stability
    { x: 0.1, y: -0.15 }, // Rugged
  ],
  // ...
}
```

Then change `getProductRoute()`:

```js
const position = profile.positions?.[index];

return {
  // ...
  anchorX: position?.x ?? node.anchorX * profile.xAmplitude,
  anchorY:
    position?.y ??
    node.anchorY * (profile.yAmplitude ?? 1) +
      profile.yOffset,
  // ...
};
```

That change provides direct, profile-specific coordinates without changing
desktop or tablet routes.

## Runtime inspection

Inspect the current stage values in Browser Console:

```js
document.querySelector(".webgl-stage").dataset
```

Relevant fields:

```text
modelScale → responsive viewport scale
routeX     → current target horizontal anchor
routeY     → current target vertical anchor
```

Print only those values:

```js
const stage = document.querySelector(".webgl-stage");

console.table({
  responsiveScale: stage.dataset.modelScale,
  routeX: stage.dataset.routeX,
  routeY: stage.dataset.routeY,
});
```

`modelScale` does not include the current route-node scale. To calculate the
complete scale, multiply it by the corresponding value from the active
profile's `scales` array.

## Safe tuning workflow

1. Confirm the viewport width in Browser Console.
2. Use the width table to identify the active profile.
3. Adjust only one category at a time:
   - position;
   - route amplitude;
   - route scale;
   - rotation.
4. Test all four route sections in both scroll directions.
5. Check for clipping and text overlap at the target viewport.
6. Verify the exact breakpoint boundaries: `767`, `768`, `1023`, `1024`,
   `1199`, and `1200` pixels.
7. Run:

```bash
npm test
npm run build
```

Route/profile changes normally require updating expectations in:

```text
tests/three-route.test.js
tests/three-responsive.test.js
```
