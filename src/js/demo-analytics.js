const loggedDepths = new Set();

export function trackDemoEvent(name, payload = {}) {
  if (!import.meta.env.DEV) return;

  console.info(`[demo-event] ${name}`, {
    ...payload,
    timestamp: new Date().toISOString(),
  });
}

export function initDemoAnalytics() {
  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      trackDemoEvent("cta_click", {
        id: element.dataset.track,
        destination: element.getAttribute("href") ?? undefined,
      });
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        trackDemoEvent("section_view", {
          section: entry.target.dataset.trackSection,
        });
        sectionObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35 },
  );

  document.querySelectorAll("[data-track-section]").forEach((section) => {
    sectionObserver.observe(section);
  });

  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;

      window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const depth = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0;

        [25, 50, 75, 100].forEach((milestone) => {
          if (depth >= milestone && !loggedDepths.has(milestone)) {
            loggedDepths.add(milestone);
            trackDemoEvent("scroll_depth", { percent: milestone });
          }
        });

        scrollTicking = false;
      });
    },
    { passive: true },
  );
}
