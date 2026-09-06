/**
 * collections.ts — the three archive collection strips.
 *
 * Look counts match the Figma artboard (8 / 8 / 5). Sources cycle through
 * `LOOK_IMAGES` so the strips render before the real lookbook lands.
 */

import { LOOK_IMAGES } from "@/data/assets";
import type { Collection, LookImage } from "@/shop/types";

function looks(label: string, count: number): readonly LookImage[] {
  return Array.from({ length: count }, (_unused, index) => ({
    src: LOOK_IMAGES[index % LOOK_IMAGES.length],
    alt: `${label} look ${index + 1}`,
  }));
}

export const COLLECTIONS: readonly Collection[] = [
  {
    id: "no-1",
    label: "Collection No. 1 : Black & White",
    looks: looks("Collection No. 1", 8),
  },
  {
    id: "no-1-2",
    label: "Collection No. 1-2 : Grey & Pink",
    looks: looks("Collection No. 1-2", 8),
  },
  {
    id: "no-2",
    label: "Collection No. 2 : Where To? Anywhere But Here.",
    looks: looks("Collection No. 2", 5),
  },
];
