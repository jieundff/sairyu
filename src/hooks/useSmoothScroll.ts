import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LENIS } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

let lenisInstance: Lenis | null = null;

/** Access the live Lenis instance (null when reduced-motion disables it). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Smoothly scroll to an element by id, with a native fallback. */
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Installs Lenis smooth scrolling and drives it from GSAP's ticker so Lenis,
 * ScrollTrigger and every scrubbed animation share a single rAF loop (one
 * reflow per frame → stable 60fps). No-ops under reduced-motion.
 */
export function useSmoothScroll(): void {
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: LENIS.duration,
      // easeOutExpo — long, luxurious glide.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: LENIS.wheelMultiplier,
      touchMultiplier: LENIS.touchMultiplier,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
