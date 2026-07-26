/**
 * Tiny, dependency-free className joiner.
 * Filters out falsy values so callers can write conditional classes inline.
 *
 *   cn("card", isActive && "card--active") // -> "card card--active"
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
