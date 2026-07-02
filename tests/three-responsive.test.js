import assert from "node:assert/strict";
import test from "node:test";

import {
  getResponsiveModelScale,
  getRouteProfile,
  getViewportProfile,
} from "../src/js/three-responsive.js";

test("uses the compact phone minimum in portrait orientation", () => {
  assert.equal(getResponsiveModelScale(390, 844), 0.64);
  assert.equal(getResponsiveModelScale(320, 568), 0.64);
});

test("scales continuously across common tablet widths", () => {
  assert.equal(getResponsiveModelScale(768, 1024), 0.64);
  assert.ok(Math.abs(getResponsiveModelScale(1024, 768) - 5 / 6) < 0.000001);
});

test("uses the actual WebGL stage aspect ratio on mobile", () => {
  assert.equal(getResponsiveModelScale(390, 844, 390, 490), 0.64);
});

test("limits short landscape screens by height", () => {
  assert.equal(getResponsiveModelScale(844, 390), 0.58);
});

test("keeps laptop and desktop layouts at full size", () => {
  assert.equal(getResponsiveModelScale(1200, 720), 1);
  assert.equal(getResponsiveModelScale(1440, 900), 1);
});

test("never returns values outside the configured range", () => {
  // Below the compact width threshold the phone floor is raised above the
  // landscape floor, so the landscape floor becomes the binding minimum here.
  assert.equal(getResponsiveModelScale(0, 0), 0.58);
  assert.equal(getResponsiveModelScale(10000, 5000), 1);
});

test("keeps a portrait viewport at or above the compact threshold unaffected", () => {
  assert.equal(getResponsiveModelScale(1024, 1366), 0.52);
});

test("selects mobile, tablet, and desktop profiles at exact boundaries", () => {
  assert.equal(getViewportProfile(767), "mobile");
  assert.equal(getViewportProfile(768), "tablet");
  assert.equal(getViewportProfile(1199), "tablet");
  assert.equal(getViewportProfile(1200), "desktop");
});

test("selects compact-phone, compact-tablet, tablet, and desktop route profiles at exact boundaries", () => {
  assert.equal(getRouteProfile(767), "compactPhone");
  assert.equal(getRouteProfile(768), "compactTablet");
  assert.equal(getRouteProfile(1023), "compactTablet");
  assert.equal(getRouteProfile(1024), "tablet");
  assert.equal(getRouteProfile(1199), "tablet");
  assert.equal(getRouteProfile(1200), "desktop");
});
