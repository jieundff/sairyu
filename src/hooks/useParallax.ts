import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PARALLAX } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

interface ParallaxOptions {
  /** Total travel as a percentage of the element's height. */
  amount?: number;
  /** Direction: -1 moves up as you scroll down, 1 moves down. */
  direction?: 1 | -1;
}

/**
 * Scroll-scrubbed parallax on a single element. The element should be slightly
 * over-sized (e.g. scaled) by its container so the travel never reveals edges.
 * Uses a scrubbed ScrollTrigger — GPU transform only, no React re-renders.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {},
) {
  const { amount = PARALLAX.image, direction = -1 } = options;
  const ref = useRef<T>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: (-amount / 2) * direction },
        {
          yPercent: (amount / 2) * direction,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount, direction]);

  return ref;
}
