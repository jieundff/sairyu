import { useEffect, useRef, useState } from "react";
import { VIDEO_PARALLAX_FACTOR } from "@/utils/constants";

/**
 * Scroll-driven parallax logic, isolated from components.
 *
 * Returns the vertical offset (px) to translate an element by, derived from
 * the page scroll position and a strength factor. Respects the user's
 * "reduce motion" preference by returning a constant 0.
 */
export function useParallax(factor: number = VIDEO_PARALLAX_FACTOR): number {
  const [offset, setOffset] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const update = () => {
      frame.current = null;
      setOffset(window.scrollY * factor);
    };

    const onScroll = () => {
      // Coalesce scroll events into one update per animation frame.
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [factor]);

  return offset;
}
