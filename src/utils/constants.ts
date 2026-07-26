/**
 * Named constants — no magic numbers scattered through components/hooks.
 * Tune animation and layout behavior from this one place.
 */

/** IntersectionObserver settings for reveal-on-scroll animations. */
export const REVEAL_OBSERVER = {
  /** Fraction of the element that must be visible before it reveals. */
  threshold: 0.15,
  /** Margin around the root; negative bottom triggers slightly early. */
  rootMargin: "0px 0px -10% 0px",
  /** Reveal only once, then stop observing. */
  once: true,
} as const;

/** Stagger (ms) applied per gallery card so they cascade in. */
export const CARD_STAGGER_MS = 80;

/** Parallax strength for the framing videos, as a fraction of scroll. */
export const VIDEO_PARALLAX_FACTOR = 0.12;
