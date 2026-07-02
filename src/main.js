import "./styles.css";
import { initPreorderForm } from "./js/preorder-form.js";

initPreorderForm();

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
