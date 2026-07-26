/**
 * Motion design tokens — every timing, easing and displacement lives here so
 * the choreography stays consistent and tunable from one place (no magic
 * numbers scattered through components/hooks).
 */

/** GSAP easing names, curated for an organic, weighted feel. */
export const EASE = {
  /** Decelerate — default for reveals. */
  out: "power3.out",
  /** Long, cinematic decelerate for large elements. */
  expo: "expo.out",
  /** Symmetric — for cross-fades and toggles. */
  inOut: "power2.inOut",
  /** Gentle overshoot for playful micro-interactions. */
  back: "back.out(1.6)",
} as const;

/** Durations in seconds. */
export const DURATION = {
  micro: 0.4,
  fast: 0.7,
  base: 1.0,
  reveal: 1.2,
  slow: 1.6,
} as const;

/** Stagger steps in seconds. */
export const STAGGER = {
  chars: 0.028,
  words: 0.055,
  lines: 0.09,
  cards: 0.09,
} as const;

/** Parallax displacement, expressed in percent of the element's own height. */
export const PARALLAX = {
  subtle: 6,
  image: 12,
  deep: 20,
} as const;

/** Lenis smooth-scroll configuration. */
export const LENIS = {
  duration: 1.15,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
} as const;

/** Preloader timing. */
export const PRELOADER = {
  countDuration: 1.05,
  exitDuration: 0.9,
} as const;
