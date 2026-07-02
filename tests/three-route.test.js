import assert from "node:assert/strict";
import test from "node:test";

import {
  createRouteScrollAnchors,
  getProductRoute,
  interpolateProductRoute,
  projectRouteToWorld,
} from "../src/js/three-route.js";

test("keeps the desktop route in the intended side-to-side sequence", () => {
  const route = getProductRoute("desktop");

  assert.deepEqual(route.map((node) => node.id), [
    "hero",
    "performance",
    "stability",
    "rugged",
  ]);
  assert.ok(route[0].anchorX > 0);
  assert.ok(route[1].anchorX > 0);
  assert.ok(route[2].anchorX < 0);
  assert.ok(route[3].anchorX > 0);
  route.forEach((node) => {
    assert.ok(node.anchorX >= -1 && node.anchorX <= 1);
    assert.ok(node.anchorY >= -1 && node.anchorY <= 1);
  });
});

test("preserves the side-to-side route with reduced mobile amplitude", () => {
  const desktopRoute = getProductRoute("desktop");
  const route = getProductRoute("mobile");

  assert.ok(route[0].anchorX > 0);
  assert.ok(route[1].anchorX > 0);
  assert.ok(route[2].anchorX < 0);
  assert.ok(route[3].anchorX > 0);
  assert.ok(Math.abs(route[0].anchorX - desktopRoute[0].anchorX * 0.7) < 0.000001);
  assert.deepEqual(route.map((node) => node.scale), [1, 1.06, 0.98, 1.03]);
});

test("keeps the compact-tablet route dead-centre with only subtle rotation", () => {
  const mobileRoute = getProductRoute("mobile");
  const route = getProductRoute("compactTablet");

  route.forEach((node) => {
    assert.equal(Math.abs(node.anchorX), 0);
    assert.equal(Math.abs(node.anchorY), 0);
  });
  assert.deepEqual(route.map((node) => node.scale), [1.6, 1.8, 1.7, 1.7]);

  const mobileYRange = mobileRoute.map((node) => node.rotation.y);
  const minMobileY = Math.min(...mobileYRange);
  const maxMobileY = Math.max(...mobileYRange);
  route.forEach((node) => {
    assert.ok(node.rotation.y >= minMobileY && node.rotation.y <= maxMobileY);
  });
});

test("keeps the compact-phone route centred with its tuned vertical path", () => {
  const route = getProductRoute("compactPhone");

  route.forEach((node) => {
    assert.equal(Math.abs(node.anchorX), 0);
    assert.ok(node.anchorY < 0);
  });
  assert.deepEqual(route.map((node) => node.anchorY), [-0.44, -0.38, -0.42, -0.36]);
  assert.deepEqual(route.map((node) => node.scale), [1.6, 1.7, 2, 1.8]);
});

test("creates scroll anchors from actual section geometry", () => {
  const route = getProductRoute("desktop");
  const anchors = createRouteScrollAnchors(
    route,
    [
      { id: "performance", top: 900, height: 900 },
      { id: "stability", top: 1800, height: 900 },
      { id: "rugged", top: 2700, height: 900 },
    ],
    900,
  );

  assert.deepEqual(anchors, [0, 1035, 1935, 2835]);
});

test("interpolates deterministically in both scroll directions", () => {
  const route = getProductRoute("desktop");
  const anchors = [0, 100, 200, 300];
  const forward = interpolateProductRoute(route, anchors, 150);
  const reverse = interpolateProductRoute(route, anchors, 150);

  assert.deepEqual(forward, reverse);
  assert.ok(Math.abs(forward.anchorX - (0.42 - 0.54) / 2) < 0.000001);
  assert.ok(Math.abs(forward.rotation.y - 0.2) < 0.000001);
});

test("clamps route interpolation before the first and after the last node", () => {
  const route = getProductRoute("tablet");
  const anchors = [0, 100, 200, 300];

  assert.deepEqual(interpolateProductRoute(route, anchors, -100), route[0]);
  assert.deepEqual(interpolateProductRoute(route, anchors, 500), route[3]);
});

test("projects normalized anchors consistently through the camera", () => {
  const route = getProductRoute("desktop")[0];
  const camera = {
    positionZ: 9,
    fovDegrees: 32,
    aspect: 1.6,
  };
  const world = projectRouteToWorld(route, camera);
  const distance = camera.positionZ - route.z;
  const halfHeight = Math.tan((camera.fovDegrees * Math.PI) / 360) * distance;
  const halfWidth = halfHeight * camera.aspect;

  assert.ok(Math.abs(world.x / halfWidth - route.anchorX) < 0.000001);
  assert.ok(Math.abs(world.y / halfHeight - route.anchorY) < 0.000001);
});
