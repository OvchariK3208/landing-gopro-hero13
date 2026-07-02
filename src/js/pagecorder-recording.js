const DEFAULT_DURATION_MS = 5000;
const DEFAULT_TARGET_ID = "rugged";
const MODEL_WAIT_TIMEOUT_MS = 20000;

function getPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function waitForAnimationFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

function waitForModelStage(stage) {
  if (!stage || stage.matches(".is-ready, .is-fallback")) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(finish, MODEL_WAIT_TIMEOUT_MS);
    const observer = new MutationObserver(() => {
      if (stage.matches(".is-ready, .is-fallback")) finish();
    });

    function finish() {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      resolve();
    }

    observer.observe(stage, { attributeFilter: ["class"] });
  });
}

function getScrollTarget(targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
  }

  const bounds = target.getBoundingClientRect();
  return Math.max(bounds.bottom + window.scrollY - window.innerHeight, 0);
}

function runLinearScroll(durationMs, targetY) {
  const openingHoldMs = Math.min(400, durationMs * 0.08);
  const closingHoldMs = Math.min(200, durationMs * 0.04);
  const scrollDurationMs = Math.max(durationMs - openingHoldMs - closingHoldMs, 1);
  const startedAt = performance.now();

  return new Promise((resolve) => {
    const update = (now) => {
      const elapsed = now - startedAt;
      const scrollElapsed = elapsed - openingHoldMs;
      const progress = Math.min(Math.max(scrollElapsed / scrollDurationMs, 0), 1);

      window.scrollTo({ top: targetY * progress, behavior: "auto" });

      if (elapsed < durationMs) {
        window.requestAnimationFrame(update);
      } else {
        window.scrollTo({ top: targetY, behavior: "auto" });
        resolve();
      }
    };

    window.requestAnimationFrame(update);
  });
}

export async function initPagecorderRecording() {
  const params = new URLSearchParams(window.location.search);
  const durationMs = getPositiveInteger(
    params.get("recordingDurationMs"),
    DEFAULT_DURATION_MS,
  );
  const targetId = params.get("recordingTarget") || DEFAULT_TARGET_ID;
  const stage = document.querySelector(".webgl-stage");

  document.documentElement.classList.add("is-pagecorder-recording");
  window.scrollTo({ top: 0, behavior: "auto" });

  await Promise.all([document.fonts?.ready, waitForModelStage(stage)]);
  await waitForAnimationFrame();
  await waitForAnimationFrame();

  const targetY = getScrollTarget(targetId);
  window.pagecorder?.("start");

  try {
    await runLinearScroll(durationMs, targetY);
  } finally {
    window.pagecorder?.("stop");
  }
}
