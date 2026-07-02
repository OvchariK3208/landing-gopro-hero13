const BASE_ROUTE = [
  {
    id: "hero",
    selector: "#top",
    anchorX: 0.62,
    anchorY: 0.06,
    z: 0,
    rotation: { x: -0.08, y: -0.42, z: -0.06 },
    scale: 1,
  },
  {
    id: "performance",
    selector: "#performance",
    anchorX: 0.42,
    anchorY: 0,
    z: 0.2,
    rotation: { x: 0.05, y: -0.06, z: 0.03 },
    scale: 1.16,
  },
  {
    id: "stability",
    selector: "#stability",
    anchorX: -0.54,
    anchorY: 0.04,
    z: -0.1,
    rotation: { x: -0.18, y: 0.46, z: -0.14 },
    scale: 1.04,
  },
  {
    id: "rugged",
    selector: "#rugged",
    anchorX: 0.4,
    anchorY: -0.02,
    z: 0.1,
    rotation: { x: 0.2, y: -0.72, z: 0.08 },
    scale: 1.12,
  },
];

const PROFILE_SETTINGS = {
  desktop: {
    xAmplitude: 1,
    yOffset: 0,
    scales: [1, 1.16, 1.04, 1.12],
  },
  tablet: {
    xAmplitude: 0,
    yOffset: 0,
    scales: [1, 1.1, 1, 1.06],
  },
  mobile: {
    xAmplitude: 0.7,
    yOffset: -0.25,
    scales: [1, 1.06, 0.98, 1.03],
    rotations: [
      { x: -0.08, y: -0.42, z: -0.06 },
      { x: 0.04, y: -0.12, z: 0.02 },
      { x: -0.1, y: 0.4, z: -0.08 },
      { x: 0.13, y: -0.55, z: 0.05 },
    ],
  },
  // Sections stack in a single column below the compact breakpoint, so both
  // sub-profiles keep the model horizontally dead-centre (no x amplitude)
  // and free of node-to-node drift (no y amplitude), only rotating gently.
  // The fixed WebGL stage band uses the same vh-based top/height at every
  // width in this range, so its absolute vertical centre falls in a
  // different place relative to each section's (pixel-sized) body copy on
  // a short phone screen than on a taller tablet-portrait one — hence two
  // tuned offsets instead of one.
  compactPhone: {
    xAmplitude: 0,
    yAmplitude: -1,
    yOffset: -0.38,
    scales: [1.6, 1.7, 2, 1.8],
    rotations: [
      { x: -0.08, y: -0.42, z: -0.06 },
      { x: -0.02, y: -0.27, z: -0.02 },
      { x: -0.09, y: -0.01, z: -0.07 },
      { x: 0.025, y: -0.485, z: -0.005 },
    ],
  },
  compactTablet: {
    xAmplitude: 0,
    yAmplitude: 0,
    yOffset: 0,
    scales: [1.6, 1.8, 1.7, 1.7],
    rotations: [
      { x: -0.08, y: -0.42, z: -0.06 },
      { x: -0.02, y: -0.27, z: -0.02 },
      { x: -0.09, y: -0.01, z: -0.07 },
      { x: 0.025, y: -0.485, z: -0.005 },
    ],
  },
};

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function smoothstep(progress) {
  return progress * progress * (3 - 2 * progress);
}

function cloneRouteNode(node) {
  return {
    ...node,
    rotation: { ...node.rotation },
  };
}

export function getProductRoute(profileName = "desktop") {
  const profile = PROFILE_SETTINGS[profileName] ?? PROFILE_SETTINGS.desktop;

  return BASE_ROUTE.map((node, index) => ({
    ...cloneRouteNode(node),
    anchorX: node.anchorX * profile.xAmplitude,
    anchorY: node.anchorY * (profile.yAmplitude ?? 1) + profile.yOffset,
    rotation: {
      ...(profile.rotations?.[index] ?? node.rotation),
    },
    scale: profile.scales[index],
  }));
}

export function createRouteScrollAnchors(route, sectionMeasurements, viewportHeight) {
  const measurementsById = new Map(
    sectionMeasurements.map((measurement) => [measurement.id, measurement]),
  );

  return route.map((node, index) => {
    if (index === 0) return 0;

    const measurement = measurementsById.get(node.id);
    if (!measurement) {
      throw new Error(`Missing section measurement for route node "${node.id}".`);
    }

    return Math.max(
      0,
      measurement.top + measurement.height / 2 - viewportHeight * 0.35,
    );
  });
}

export function interpolateProductRoute(route, scrollAnchors, scrollPosition) {
  if (route.length === 0 || route.length !== scrollAnchors.length) {
    throw new Error("Route nodes and scroll anchors must have the same non-zero length.");
  }

  if (scrollPosition <= scrollAnchors[0]) {
    return cloneRouteNode(route[0]);
  }

  const lastIndex = route.length - 1;
  if (scrollPosition >= scrollAnchors[lastIndex]) {
    return cloneRouteNode(route[lastIndex]);
  }

  let segmentIndex = 0;
  while (scrollPosition > scrollAnchors[segmentIndex + 1]) {
    segmentIndex += 1;
  }

  const startAnchor = scrollAnchors[segmentIndex];
  const endAnchor = scrollAnchors[segmentIndex + 1];
  const rawProgress = clamp(
    (scrollPosition - startAnchor) / Math.max(endAnchor - startAnchor, 1),
    0,
    1,
  );
  const progress = smoothstep(rawProgress);
  const start = route[segmentIndex];
  const end = route[segmentIndex + 1];

  return {
    id: `${start.id}-${end.id}`,
    selector: end.selector,
    anchorX: lerp(start.anchorX, end.anchorX, progress),
    anchorY: lerp(start.anchorY, end.anchorY, progress),
    z: lerp(start.z, end.z, progress),
    rotation: {
      x: lerp(start.rotation.x, end.rotation.x, progress),
      y: lerp(start.rotation.y, end.rotation.y, progress),
      z: lerp(start.rotation.z, end.rotation.z, progress),
    },
    scale: lerp(start.scale, end.scale, progress),
  };
}

export function projectRouteToWorld(route, camera) {
  const distance = Math.max(camera.positionZ - route.z, 0.001);
  const halfHeight = Math.tan((camera.fovDegrees * Math.PI) / 360) * distance;
  const halfWidth = halfHeight * camera.aspect;

  return {
    x: route.anchorX * halfWidth,
    y: route.anchorY * halfHeight,
    z: route.z,
  };
}
