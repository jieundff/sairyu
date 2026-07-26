/**
 * content.ts — all configurable copy and pricing for the site.
 *
 * Text, prices, collection name and button labels live here (never inside a
 * component). Gallery items are assembled by pairing the image sources from
 * `assets.ts` with the metadata below, so the number of cards always tracks
 * the number of images in `GALLERY_IMAGES`.
 */

import { GALLERY_IMAGES } from "./assets";
import type { GalleryItem, HeroContent } from "@/types";

export const HERO: HeroContent = {
  collectionName: "Sairyu",
  tagline: "A living current of form and color.",
  description:
    "Ten hand-composed pieces flowing between two moving canvases. " +
    "Mint an original, or wander the drift.",
  primaryButtonLabel: "Mint now",
  secondaryButtonLabel: "View collection",
};

/** Per-card metadata, index-aligned with `GALLERY_IMAGES`. */
const GALLERY_META: ReadonlyArray<Pick<GalleryItem, "title" | "price">> = [
  { title: "Drift No. 01", price: "0.08 ETH" },
  { title: "Drift No. 02", price: "0.08 ETH" },
  { title: "Drift No. 03", price: "0.10 ETH" },
  { title: "Drift No. 04", price: "0.10 ETH" },
  { title: "Drift No. 05", price: "0.12 ETH" },
  { title: "Drift No. 06", price: "0.12 ETH" },
  { title: "Drift No. 07", price: "0.15 ETH" },
  { title: "Drift No. 08", price: "0.15 ETH" },
  { title: "Drift No. 09", price: "0.20 ETH" },
  { title: "Drift No. 10", price: "0.25 ETH" },
];

/**
 * Fully-assembled gallery data. Components map over this — they never build
 * arrays of their own. Add an image to `GALLERY_IMAGES` and a matching entry
 * to `GALLERY_META`, and the grid grows automatically.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = GALLERY_IMAGES.map(
  (src, index) => {
    const meta = GALLERY_META[index];
    const title = meta?.title ?? `Drift No. ${String(index + 1).padStart(2, "0")}`;
    const price = meta?.price ?? "—";
    return { src, title, price, alt: title };
  },
);

/** Section headings used across the page. */
export const SECTIONS = {
  galleryTitle: "The collection",
  gallerySubtitle: "Every piece, one edition.",
} as const;
