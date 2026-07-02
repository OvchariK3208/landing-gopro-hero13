const DEFAULT_API_HOST = "pagecorder.p.rapidapi.com";
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const DEFAULT_LEAD_IN_SECONDS = 1;
const DEFAULT_SCROLL_DURATION_SECONDS = 20;
const DEFAULT_END_HOLD_SECONDS = 1;
const DEFAULT_TARGET_ID = "page-end";
const POLL_INTERVAL_MS = 5000;
const JOB_TIMEOUT_MS = 10 * 60 * 1000;

function parseArguments(argumentsList) {
  return Object.fromEntries(
    argumentsList
      .filter((argument) => argument.startsWith("--") && argument.includes("="))
      .map((argument) => {
        const separatorIndex = argument.indexOf("=");
        return [
          argument.slice(2, separatorIndex),
          argument.slice(separatorIndex + 1),
        ];
      }),
  );
}

function getPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function requireValue(value, name) {
  if (!value || value.includes("replace_with") || value.includes("replace-with")) {
    throw new Error(`${name} is missing or still contains its placeholder.`);
  }

  return value;
}

async function readJson(response) {
  const body = await response.text();
  let parsed;

  try {
    parsed = JSON.parse(body);
  } catch {
    throw new Error(`Pagecorder returned HTTP ${response.status} with a non-JSON body.`);
  }

  if (!response.ok) {
    const message = parsed.message || parsed.error || body;
    throw new Error(`Pagecorder returned HTTP ${response.status}: ${message}`);
  }

  return parsed;
}

function delay(durationMs) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

const args = parseArguments(process.argv.slice(2));
const apiKey = requireValue(process.env.PAGECORDER_API_KEY, "PAGECORDER_API_KEY");
const apiHost = process.env.PAGECORDER_API_HOST || DEFAULT_API_HOST;
const sourceUrl = new URL(
  requireValue(args["source-url"] || process.env.PAGECORDER_SOURCE_URL, "source URL"),
);
const width = getPositiveInteger(
  args.width || process.env.PAGECORDER_WIDTH,
  DEFAULT_WIDTH,
);
const height = getPositiveInteger(
  args.height || process.env.PAGECORDER_HEIGHT,
  DEFAULT_HEIGHT,
);
const leadInSeconds = getPositiveInteger(
  args["lead-in"] || process.env.PAGECORDER_LEAD_IN_SECONDS,
  DEFAULT_LEAD_IN_SECONDS,
);
const scrollDurationSeconds = getPositiveInteger(
  args["scroll-duration"] ||
    args.duration ||
    process.env.PAGECORDER_SCROLL_DURATION_SECONDS ||
    process.env.PAGECORDER_DURATION_SECONDS,
  DEFAULT_SCROLL_DURATION_SECONDS,
);
const endHoldSeconds = getPositiveInteger(
  args["end-hold"] || process.env.PAGECORDER_END_HOLD_SECONDS,
  DEFAULT_END_HOLD_SECONDS,
);
const targetId = args.target || DEFAULT_TARGET_ID;
const totalDurationSeconds =
  leadInSeconds + scrollDurationSeconds + endHoldSeconds;

sourceUrl.searchParams.set("recording", "1");
sourceUrl.searchParams.set("recordingLeadInMs", String(leadInSeconds * 1000));
sourceUrl.searchParams.set(
  "recordingScrollDurationMs",
  String(scrollDurationSeconds * 1000),
);
sourceUrl.searchParams.set("recordingEndHoldMs", String(endHoldSeconds * 1000));
sourceUrl.searchParams.set("recordingTarget", targetId);

const headers = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": apiHost,
};
const endpoint = `https://${apiHost}/rapid/render`;

console.log(
  `Submitting ${width}x${height}, ${totalDurationSeconds}s Pagecorder timeline ` +
    `(${leadInSeconds}s + ${scrollDurationSeconds}s + ${endHoldSeconds}s).`,
);
console.log(`Source: ${sourceUrl.origin}${sourceUrl.pathname} (query values redacted)`);

const submittedJob = await readJson(
  await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url: sourceUrl.toString(),
      width,
      height,
    }),
  }),
);
const jobId = requireValue(String(submittedJob.id || ""), "Pagecorder job ID");
const deadline = Date.now() + JOB_TIMEOUT_MS;

console.log(`Job ${jobId} submitted.`);

while (Date.now() < deadline) {
  await delay(POLL_INTERVAL_MS);

  const job = await readJson(
    await fetch(`${endpoint}/${encodeURIComponent(jobId)}`, { headers }),
  );

  if (job.failedReason) {
    throw new Error(`Pagecorder job failed: ${job.failedReason}`);
  }

  const stage = job.state?.stage || "unknown";
  console.log(`Job ${jobId}: ${stage}`);

  if (stage === "done") {
    console.log(`Recording: ${job.result?.url || "missing result URL"}`);
    console.log(`Duration: ${job.result?.durationSeconds ?? "unknown"}s`);
    console.log(`Dropped frames: ${job.result?.droppedFrames?.length ?? "unknown"}`);
    console.log(`HTTP errors: ${job.result?.httpErrors?.length ?? "unknown"}`);
    process.exit(0);
  }
}

throw new Error(`Pagecorder job ${jobId} did not finish within 10 minutes.`);
