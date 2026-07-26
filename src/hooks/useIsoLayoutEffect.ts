import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect that degrades to useEffect when there is no DOM (SSR/tests),
 * avoiding React's warning. Animations set their initial state here so it lands
 * before the browser paints — no flash of un-animated content.
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
