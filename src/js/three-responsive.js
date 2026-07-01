const MIN_PHONE_SCALE = 0.52;
const MIN_LANDSCAPE_SCALE = 0.58;
const FULL_SIZE_WIDTH = 1200;
const FULL_SIZE_HEIGHT = 720;
const FULL_SIZE_STAGE_ASPECT = 1.6;

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
  const widthScale = clamp(safeWidth / FULL_SIZE_WIDTH, MIN_PHONE_SCALE, 1);
  const heightScale = clamp(safeHeight / FULL_SIZE_HEIGHT, MIN_LANDSCAPE_SCALE, 1);
  const aspectScale = clamp(
    safeStageWidth / safeStageHeight / FULL_SIZE_STAGE_ASPECT,
    MIN_PHONE_SCALE,
    1,
  );

  return Math.min(widthScale, heightScale, aspectScale);
}

export function getViewportProfile(width) {
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}
