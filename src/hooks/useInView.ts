import { useEffect, useRef, useState } from "react";
import { REVEAL_OBSERVER } from "@/utils/constants";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** When true, stop observing after the first reveal. */
  once?: boolean;
}

/**
 * Reveal-on-scroll animation logic, isolated from components.
 *
 * Returns a ref to attach to the target element and a boolean that flips to
 * `true` once the element enters the viewport. Components stay declarative:
 *
 *   const { ref, inView } = useInView();
 *   <div ref={ref} className={inView ? "is-visible" : ""} />
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const {
    threshold = REVEAL_OBSERVER.threshold,
    rootMargin = REVEAL_OBSERVER.rootMargin,
    once = REVEAL_OBSERVER.once,
  } = options;

  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Graceful fallback for environments without IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
