import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createRouteScrollAnchors,
  getProductRoute,
  interpolateProductRoute,
} from "./three-route.js";
import { getRouteProfile } from "./three-responsive.js";

gsap.registerPlugin(ScrollTrigger);

export function initScrollScenes(threeContext) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");

  ScrollTrigger.create({
    start: 50,
    onUpdate: (self) => header?.classList.toggle("is-scrolled", self.scroll() > 50),
  });

  if (!reducedMotion) {
    gsap.from(".hero .reveal", {
      y: 34,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.15,
    });
  }

  document.querySelectorAll(".feature-copy").forEach((copy) => {
    gsap.from(copy.children, {
      scrollTrigger: {
        trigger: copy,
        start: "top 78%",
        once: true,
      },
      y: reducedMotion ? 0 : 32,
      opacity: 0,
      duration: reducedMotion ? 0.01 : 0.75,
      stagger: reducedMotion ? 0 : 0.08,
      ease: "power2.out",
    });
  });

  gsap.from(".lens-card", {
    scrollTrigger: {
      trigger: ".lens-rail",
      start: "top 82%",
      once: true,
    },
    y: reducedMotion ? 0 : 60,
    opacity: 0,
    duration: reducedMotion ? 0.01 : 0.8,
    stagger: reducedMotion ? 0 : 0.08,
    ease: "power3.out",
  });

  gsap.from(".compare-row:not(.compare-head)", {
    scrollTrigger: {
      trigger: ".compare-table",
      start: "top 80%",
      once: true,
    },
    y: reducedMotion ? 0 : 25,
    opacity: 0,
    duration: reducedMotion ? 0.01 : 0.55,
    stagger: reducedMotion ? 0 : 0.07,
  });

  if (!threeContext) return;

  const { stage, setRendering, setProductRoute } = threeContext;
  let route = [];
  let scrollAnchors = [];

  const refreshProductRoute = () => {
    route = getProductRoute(getRouteProfile(window.innerWidth));
    const sectionMeasurements = route.slice(1).map((node) => {
      const section = document.querySelector(node.selector);
      const bounds = section.getBoundingClientRect();

      return {
        id: node.id,
        top: bounds.top + window.scrollY,
        height: bounds.height,
      };
    });
    scrollAnchors = createRouteScrollAnchors(
      route,
      sectionMeasurements,
      window.innerHeight,
    );
    setProductRoute(
      interpolateProductRoute(route, scrollAnchors, window.scrollY),
      true,
    );
  };

  const updateProductRoute = () => {
    if (!route.length) return;
    setProductRoute(
      interpolateProductRoute(route, scrollAnchors, window.scrollY),
      reducedMotion,
    );
  };

  refreshProductRoute();
  ScrollTrigger.create({
    trigger: "#top",
    start: "top top",
    endTrigger: "#rugged",
    end: "bottom bottom",
    invalidateOnRefresh: true,
    onRefresh: refreshProductRoute,
    onUpdate: updateProductRoute,
  });

  ScrollTrigger.create({
    trigger: "#battery",
    start: "top 72%",
    onEnter: () => {
      gsap.to(stage, {
        autoAlpha: 0,
        duration: reducedMotion ? 0 : 0.35,
        onComplete: () => setRendering(false),
      });
    },
    onLeaveBack: () => {
      setRendering(true);
      gsap.to(stage, { autoAlpha: 1, duration: reducedMotion ? 0 : 0.35 });
    },
  });

  document.querySelectorAll(".lens-card").forEach((card) => {
    const activate = () => {
      document.querySelectorAll(".lens-card").forEach((item) => item.classList.remove("is-active"));
      card.classList.add("is-active");
    };
    card.addEventListener("mouseenter", activate);
    card.addEventListener("focus", activate);
  });

  ScrollTrigger.refresh();
}
