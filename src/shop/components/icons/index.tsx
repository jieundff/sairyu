/**
 * icons/index.tsx — the seven line icons used across the shop screens.
 *
 * The Figma page exports these as SVG assets, but the exported URLs expire and
 * are not reachable from the build environment, so each glyph is authored here
 * instead. Every icon keeps the exact box it has in Figma (noted per icon) and
 * paints with `currentColor`, so `AppHeader`'s black/white variants only have
 * to switch `color`.
 */

import { cn } from "@/utils/classNames";

interface IconProps {
  className?: string;
}

/** Hamburger — `Group 306`, 19 × 15. */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("shop-icon", className)}
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 1h19M0 7.5h19M0 14h19"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Shopping bag — `Group 308`, 20 × 22. */
export function BagIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("shop-icon", className)}
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1.6 6.4h16.8l-1.1 14.4a.8.8 0 0 1-.8.7H3.5a.8.8 0 0 1-.8-.7L1.6 6.4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.6 9V5.2a3.4 3.4 0 0 1 6.8 0V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type CaretDirection = "up" | "down" | "right";

interface CaretIconProps extends IconProps {
  direction?: CaretDirection;
}

/** Small solid triangle — `Polygon 1/2/3`, 4 × 4. */
export function CaretIcon({ direction = "down", className }: CaretIconProps) {
  const points =
    direction === "up"
      ? "2,0 4,4 0,4"
      : direction === "right"
        ? "0,0 4,2 0,4"
        : "0,0 4,0 2,4";

  return (
    <svg
      className={cn("shop-icon", className)}
      width="4"
      height="4"
      viewBox="0 0 4 4"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points={points} fill="currentColor" />
    </svg>
  );
}

/** Close cross — `Vector 1` + `Vector 2`, 19.386 × 19.386. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("shop-icon", className)}
      width="19.386"
      height="19.386"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Magnifier — `Group 309` on the drawer, 22.632 × 21.68. */
export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("shop-icon", className)}
      width="22.632"
      height="21.68"
      viewBox="0 0 23 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9.4" cy="8.8" r="7.8" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M15.1 14.6l6.6 6.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Quantity increase — `Group 79`, 10 × 10. */
export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("shop-icon", className)}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Quantity decrease — `Vector 66`, a 10px rule. */
export function MinusIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("shop-icon", className)}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 5h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
