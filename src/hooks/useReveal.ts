import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

interface RevealOptions {
  /** Vertical travel (px) the element rises from. */
  y?: number;
  /** Optional child selector to stagger instead of animating the element. */
  childSelector?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Reveal-on-scroll for a block element (or its children). Initial state is set
 * in a layout effect so nothing flashes; under reduced-motion the element is
 * simply left in its natural, visible state.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const {
    y = 40,
    childSelector,
    duration = DURATION.reveal,
    stagger = STAGGER.cards,
    delay = 0,
    start = "top 82%",
  } = options;
  const ref = useRef<T>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element[] = childSelector
      ? Array.from(el.querySelectorAll(childSelector))
      : [el];
    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [y, childSelector, duration, stagger, delay, start]);

  return ref;
}
