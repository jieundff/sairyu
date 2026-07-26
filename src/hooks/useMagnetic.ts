import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * Magnetic pointer attraction for a small interactive element (e.g. a button).
 * The element eases toward the cursor within its bounds and springs back on
 * leave. Disabled on touch/reduced-motion. Uses a quickTo setter — no layout
 * thrash, one transform update per pointer move.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.35,
) {
  const ref = useRef<T>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isTouchDevice()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}
