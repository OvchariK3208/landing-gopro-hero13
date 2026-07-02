const DEFAULT_LEAD_IN_MS = 1000;
const DEFAULT_SCROLL_DURATION_MS = 20000;
const DEFAULT_END_HOLD_MS = 1000;
const DEFAULT_TARGET_ID = "page-end";
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
  const scroller = document.scrollingElement || document.documentElement;
  const target = document.getElementById(targetId);
  if (!target) {
    return Math.max(scroller.scrollHeight - window.innerHeight, 0);
  }

  const bounds = target.getBoundingClientRect();
  return Math.max(bounds.bottom + window.scrollY - window.innerHeight, 0);
}

export function getLinearScrollProgress(elapsedMs, leadInMs, scrollDurationMs) {
  const scrollElapsed = elapsedMs - leadInMs;
  return Math.min(Math.max(scrollElapsed / scrollDurationMs, 0), 1);
}

function runRecordingTimeline({
  leadInMs,
  scrollDurationMs,
  endHoldMs,
  targetY,
}) {
  const scroller = document.scrollingElement || document.documentElement;
  const totalDurationMs = leadInMs + scrollDurationMs + endHoldMs;
  const startedAt = performance.now();

  return new Promise((resolve) => {
    const update = (now) => {
      const elapsed = Math.min(now - startedAt, totalDurationMs);
      const progress = getLinearScrollProgress(
        elapsed,
        leadInMs,
        scrollDurationMs,
      );

      scroller.scrollTop = targetY * progress;

      if (elapsed < totalDurationMs) {
        window.requestAnimationFrame(update);
      } else {
        scroller.scrollTop = targetY;
        resolve();
      }
    };

    window.requestAnimationFrame(update);
  });
}

export async function initPagecorderRecording() {
  const params = new URLSearchParams(window.location.search);
  const leadInMs = getPositiveInteger(
    params.get("recordingLeadInMs"),
    DEFAULT_LEAD_IN_MS,
  );
  const scrollDurationMs = getPositiveInteger(
    params.get("recordingScrollDurationMs") || params.get("recordingDurationMs"),
    DEFAULT_SCROLL_DURATION_MS,
  );
  const endHoldMs = getPositiveInteger(
    params.get("recordingEndHoldMs"),
    DEFAULT_END_HOLD_MS,
  );
  const targetId = params.get("recordingTarget") || DEFAULT_TARGET_ID;
  const stage = document.querySelector(".webgl-stage");
  const scroller = document.scrollingElement || document.documentElement;

  document.documentElement.classList.add("is-pagecorder-recording");
  scroller.scrollTop = 0;

  await Promise.all([document.fonts?.ready, waitForModelStage(stage)]);
  await waitForAnimationFrame();
  await waitForAnimationFrame();

  const targetY = getScrollTarget(targetId);
  window.pagecorder?.("start");

  try {
    await runRecordingTimeline({
      leadInMs,
      scrollDurationMs,
      endHoldMs,
      targetY,
    });
  } finally {
    window.pagecorder?.("stop");
  }
}
