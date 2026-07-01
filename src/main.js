import "./styles.css";
import { initDemoAnalytics, trackDemoEvent } from "./js/demo-analytics.js";
import { initPreorderForm } from "./js/preorder-form.js";

initDemoAnalytics();
initPreorderForm();

trackDemoEvent("page_view", {
  concept: "hero13_black",
  source: new URLSearchParams(window.location.search).get("utm_source") ?? "direct",
});

async function loadProductExperience() {
  try {
    const [{ initThreeScene }, { initScrollScenes }] = await Promise.all([
      import("./js/three-scene.js"),
      import("./js/scroll-scenes.js"),
    ]);
    const threeContext = initThreeScene();
    initScrollScenes(threeContext);
  } catch (error) {
    document.querySelector(".webgl-stage")?.classList.add("is-fallback");
    console.warn("The enhanced product experience could not load.", error);
  }
}

loadProductExperience();
