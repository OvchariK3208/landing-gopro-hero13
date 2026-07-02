(() => {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!isLocalhost) return;

  let resizeFrame;

  const showViewportSize = (reason = "manual") => {
    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    console.warn(
      `[viewport-size] ${reason}\n` +
      `window.innerWidth: ${dimensions.width}px\n` +
      `window.innerHeight: ${dimensions.height}px`,
    );

    return dimensions;
  };

  const handleResize = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      showViewportSize("resized");
    });
  };

  window.showViewportSize = showViewportSize;
  window.__viewportSizeDebugLoaded = true;

  showViewportSize("initial");
  window.addEventListener("resize", handleResize, { passive: true });
})();
