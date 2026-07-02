import assert from "node:assert/strict";
import test from "node:test";

import { getLinearScrollProgress } from "../src/js/pagecorder-recording.js";

test("holds for one second, scrolls linearly for twenty, then stays at the end", () => {
  const leadInMs = 1000;
  const scrollDurationMs = 20000;

  assert.equal(getLinearScrollProgress(0, leadInMs, scrollDurationMs), 0);
  assert.equal(getLinearScrollProgress(999, leadInMs, scrollDurationMs), 0);
  assert.equal(getLinearScrollProgress(1000, leadInMs, scrollDurationMs), 0);
  assert.equal(getLinearScrollProgress(6000, leadInMs, scrollDurationMs), 0.25);
  assert.equal(getLinearScrollProgress(11000, leadInMs, scrollDurationMs), 0.5);
  assert.equal(getLinearScrollProgress(21000, leadInMs, scrollDurationMs), 1);
  assert.equal(getLinearScrollProgress(22000, leadInMs, scrollDurationMs), 1);
});
