import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { trackDemoEvent } from "./demo-analytics.js";
import {
  getResponsiveModelScale,
  getViewportProfile,
} from "./three-responsive.js";
import {
  getProductRoute,
  projectRouteToWorld,
} from "./three-route.js";

const PRODUCT_MODEL_URL = "/assets/gopro_hero_13_black.optimized.glb";
const DESKTOP_PIXEL_RATIO = 1.5;
const MOBILE_PIXEL_RATIO = 1.2;

function fitModelToProductFrame(model) {
  model.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const longestSide = Math.max(size.x, size.y, size.z);
  const scale = 3.45 / longestSide;

  model.position.copy(center).multiplyScalar(-scale);
  model.scale.setScalar(scale);

  model.traverse((object) => {
    if (!object.isMesh) return;

    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      material.side = THREE.FrontSide;
      if (material.map) {
        material.map.colorSpace = THREE.SRGBColorSpace;
      }
    });
  });
}

function setStageStatus(stage, text) {
  const status = stage.querySelector("[data-stage-status]");
  if (!status) return;

  const dot = document.createElement("span");
  status.replaceChildren(dot, document.createTextNode(text));
}

function getPixelRatio(width) {
  const limit = width < 760 ? MOBILE_PIXEL_RATIO : DESKTOP_PIXEL_RATIO;
  return Math.min(window.devicePixelRatio, limit);
}

function getStageSize(stage) {
  return {
    width: Math.max(stage.clientWidth, 1),
    height: Math.max(stage.clientHeight, 1),
  };
}

function cloneRoute(route) {
  return {
    ...route,
    rotation: { ...route.rotation },
  };
}

function copyRoute(target, source) {
  target.anchorX = source.anchorX;
  target.anchorY = source.anchorY;
  target.z = source.z;
  target.rotation.x = source.rotation.x;
  target.rotation.y = source.rotation.y;
  target.rotation.z = source.rotation.z;
  target.scale = source.scale;
}

export function initThreeScene() {
  const canvas = document.querySelector("#product-canvas");
  const stage = document.querySelector(".webgl-stage");
  if (!canvas || !stage) return null;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      premultipliedAlpha: false,
      stencil: false,
      powerPreference: "high-performance",
    });
  } catch (error) {
    stage.classList.add("is-fallback");
    stage.querySelector("[data-stage-status]")?.remove();
    console.warn("WebGL unavailable. Showing the static camera fallback.", error);
    return null;
  }

  const initialStageSize = getStageSize(stage);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    32,
    initialStageSize.width / initialStageSize.height,
    0.1,
    100,
  );
  camera.position.set(0, 0, 9);

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(getPixelRatio(window.innerWidth));
  renderer.setSize(initialStageSize.width, initialStageSize.height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  // Screen-space route position and rotation are never affected by model scaling.
  const routeRoot = new THREE.Group();
  routeRoot.name = "Screen-space product route";
  scene.add(routeRoot);

  // Scroll-driven cinematic scale is isolated from the responsive model scale.
  const sceneScaleRoot = new THREE.Group();
  sceneScaleRoot.name = "Scroll scene scale";
  routeRoot.add(sceneScaleRoot);

  // Viewport changes own this group exclusively.
  const responsiveRoot = new THREE.Group();
  responsiveRoot.name = "Responsive viewport scale";
  sceneScaleRoot.add(responsiveRoot);

  let responsiveScaleTarget = getResponsiveModelScale(
    window.innerWidth,
    window.innerHeight,
    initialStageSize.width,
    initialStageSize.height,
  );
  responsiveRoot.scale.setScalar(responsiveScaleTarget);
  stage.dataset.modelScale = responsiveScaleTarget.toFixed(3);

  // Pointer movement owns this inner group exclusively, preventing transform conflicts.
  const interactionPivot = new THREE.Group();
  interactionPivot.name = "Pointer interaction pivot";
  responsiveRoot.add(interactionPivot);

  const initialRoute = getProductRoute(getViewportProfile(window.innerWidth))[0];
  const routeCurrent = cloneRoute(initialRoute);
  const routeTarget = cloneRoute(initialRoute);

  const applyRouteTransform = () => {
    const worldPosition = projectRouteToWorld(routeCurrent, {
      positionZ: camera.position.z,
      fovDegrees: camera.fov,
      aspect: camera.aspect,
    });

    routeRoot.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
    routeRoot.rotation.set(
      routeCurrent.rotation.x,
      routeCurrent.rotation.y,
      routeCurrent.rotation.z,
    );
    sceneScaleRoot.scale.setScalar(routeCurrent.scale);
  };

  const setProductRoute = (route, immediate = false) => {
    copyRoute(routeTarget, route);
    stage.dataset.routeX = route.anchorX.toFixed(3);
    stage.dataset.routeY = route.anchorY.toFixed(3);

    if (immediate) {
      copyRoute(routeCurrent, routeTarget);
      applyRouteTransform();
    }
  };

  applyRouteTransform();

  const keyLight = new THREE.DirectionalLight(0xe5f7ff, 5.4);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x5ed8ff, 4.5);
  rimLight.position.set(-4, 1, -4);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xffffff, 22, 12);
  fillLight.position.set(-1, -3, 4);
  scene.add(fillLight);
  scene.add(new THREE.HemisphereLight(0x8adfff, 0x050505, 1.3));

  let isPageVisible = !document.hidden;
  let isRenderingEnabled = true;
  let pointerX = 0;
  let pointerY = 0;
  let frameId;
  let lastRenderTime = 0;

  const render = (time = 0) => {
    frameId = null;
    if (!isPageVisible || !isRenderingEnabled) return;

    const delta = lastRenderTime ? Math.min((time - lastRenderTime) / 1000, 0.05) : 1 / 60;
    lastRenderTime = time;

    interactionPivot.rotation.y = THREE.MathUtils.damp(
      interactionPivot.rotation.y,
      pointerX * 0.11,
      7,
      delta,
    );
    interactionPivot.rotation.x = THREE.MathUtils.damp(
      interactionPivot.rotation.x,
      pointerY * 0.05,
      7,
      delta,
    );
    const responsiveScale = THREE.MathUtils.damp(
      responsiveRoot.scale.x,
      responsiveScaleTarget,
      8,
      delta,
    );
    responsiveRoot.scale.setScalar(responsiveScale);
    routeCurrent.anchorX = THREE.MathUtils.damp(
      routeCurrent.anchorX,
      routeTarget.anchorX,
      9,
      delta,
    );
    routeCurrent.anchorY = THREE.MathUtils.damp(
      routeCurrent.anchorY,
      routeTarget.anchorY,
      9,
      delta,
    );
    routeCurrent.z = THREE.MathUtils.damp(routeCurrent.z, routeTarget.z, 9, delta);
    routeCurrent.rotation.x = THREE.MathUtils.damp(
      routeCurrent.rotation.x,
      routeTarget.rotation.x,
      9,
      delta,
    );
    routeCurrent.rotation.y = THREE.MathUtils.damp(
      routeCurrent.rotation.y,
      routeTarget.rotation.y,
      9,
      delta,
    );
    routeCurrent.rotation.z = THREE.MathUtils.damp(
      routeCurrent.rotation.z,
      routeTarget.rotation.z,
      9,
      delta,
    );
    routeCurrent.scale = THREE.MathUtils.damp(
      routeCurrent.scale,
      routeTarget.scale,
      9,
      delta,
    );
    applyRouteTransform();

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(render);
  };

  const setRendering = (enabled) => {
    isRenderingEnabled = enabled;
    if (enabled && isPageVisible && !frameId) {
      lastRenderTime = 0;
      frameId = window.requestAnimationFrame(render);
    }
    if (!enabled && frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const handlePointer = (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const handleResize = () => {
    const stageSize = getStageSize(stage);
    responsiveScaleTarget = getResponsiveModelScale(
      window.innerWidth,
      window.innerHeight,
      stageSize.width,
      stageSize.height,
    );
    stage.dataset.modelScale = responsiveScaleTarget.toFixed(3);
    camera.aspect = stageSize.width / stageSize.height;
    camera.fov = window.innerWidth < 760 ? 38 : 32;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(getPixelRatio(window.innerWidth));
    renderer.setSize(stageSize.width, stageSize.height, false);
  };

  window.addEventListener("pointermove", handlePointer, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  const stageResizeObserver = new ResizeObserver(handleResize);
  stageResizeObserver.observe(stage);
  document.addEventListener("visibilitychange", () => {
    isPageVisible = !document.hidden;
    if (isPageVisible && isRenderingEnabled && !frameId) {
      lastRenderTime = 0;
      frameId = window.requestAnimationFrame(render);
    }
    if (!isPageVisible && frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  });

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    stage.classList.add("is-fallback");
    trackDemoEvent("webgl_context_lost");
  });

  setStageStatus(stage, "Loading 3D product view");
  new GLTFLoader()
    .loadAsync(PRODUCT_MODEL_URL)
    .then(async (gltf) => {
      fitModelToProductFrame(gltf.scene);
      interactionPivot.add(gltf.scene);

      // Compile before revealing the canvas so the first visible frame cannot stall.
      if (renderer.extensions.has("KHR_parallel_shader_compile")) {
        await renderer.compileAsync(routeRoot, camera, scene);
      } else {
        renderer.compile(routeRoot, camera, scene);
      }
      renderer.render(scene, camera);

      stage.classList.add("is-ready");
      setStageStatus(stage, "Interactive product view");
      trackDemoEvent("three_model_loaded", { source: "optimized_webp_glb" });
    })
    .catch((error) => {
      stage.classList.add("is-fallback");
      stage.querySelector("[data-stage-status]")?.remove();
      console.warn("The GLB product model could not load. Showing the CSS fallback.", error);
      trackDemoEvent("three_model_load_failed");
    });

  frameId = window.requestAnimationFrame(render);
  trackDemoEvent("three_scene_ready", { source: "gopro_hero_13_black_glb" });

  return {
    stage,
    renderer,
    scene,
    camera,
    setRendering,
    setProductRoute,
  };
}
