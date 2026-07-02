const MIN_PHONE_SCALE = 0.52;
const MIN_PHONE_SCALE_COMPACT = 0.64;
const MIN_LANDSCAPE_SCALE = 0.58;
const FULL_SIZE_WIDTH = 1200;
const FULL_SIZE_HEIGHT = 720;
const FULL_SIZE_STAGE_ASPECT = 1.6;
const COMPACT_WIDTH_THRESHOLD = 1024;

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function getResponsiveModelScale(
  width,
  height,
  stageWidth = width,
  stageHeight = height,
) {
  const safeWidth = Math.max(Number(width) || 0, 1);
  const safeHeight = Math.max(Number(height) || 0, 1);
  const safeStageWidth = Math.max(Number(stageWidth) || 0, 1);
  const safeStageHeight = Math.max(Number(stageHeight) || 0, 1);
  // aspectScale is ratio-driven, not width-driven, so a portrait viewport at
  // or above COMPACT_WIDTH_THRESHOLD can still hit this floor — gating by
  // width keeps that case (e.g. 1024x1366) at the original, untouched floor.
  const phoneFloor = safeWidth < COMPACT_WIDTH_THRESHOLD
    ? MIN_PHONE_SCALE_COMPACT
    : MIN_PHONE_SCALE;
  const widthScale = clamp(safeWidth / FULL_SIZE_WIDTH, phoneFloor, 1);
  const heightScale = clamp(safeHeight / FULL_SIZE_HEIGHT, MIN_LANDSCAPE_SCALE, 1);
  const aspectScale = clamp(
    safeStageWidth / safeStageHeight / FULL_SIZE_STAGE_ASPECT,
    phoneFloor,
    1,
  );

  return Math.min(widthScale, heightScale, aspectScale);
}

export function getViewportProfile(width) {
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}

export function getRouteProfile(width) {
  // The fixed WebGL stage band keeps the same vh-based top/height across
  // this whole range, but phones and tablet-portrait viewports differ
  // enough in absolute height that one vertical offset can't clear both
  // tiers' body copy — hence two sub-profiles sharing the same (zero)
  // horizontal amplitude and subdued rotation.
  if (width < 768) return "compactPhone";
  if (width < COMPACT_WIDTH_THRESHOLD) return "compactTablet";
  return getViewportProfile(width);
}
