/**
 * content.ts — all configurable copy, pricing and composition for the site.
 *
 * Text, prices, collection name, button labels and the gallery composition
 * live here (never inside a component). Gallery items are assembled by pairing
 * the image sources from `assets.ts` with the metadata below, so the number of
 * cards always tracks the number of images in `GALLERY_IMAGES`.
 */

import { GALLERY_IMAGES } from "./assets";
import type {
  GalleryItem,
  GalleryLayout,
  HeroContent,
  NavLink,
} from "@/types";

export const HERO: HeroContent = {
  collectionName: "Sairyu",
  tagline: "Archive 001 — Movement in Stillness",
  description:
    "A wearable archive drawn from the drift of light on water. Ten " +
    "editions, each cut once, photographed once, released once.",
  primaryButtonLabel: "Acquire",
  secondaryButtonLabel: "Enter the archive",
};

/** Fixed navigation. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Archive", target: "gallery" },
  { label: "Manifesto", target: "manifesto" },
  { label: "Acquire", target: "acquire" },
];

/** Large editorial statement, revealed line by line. */
export const MANIFESTO = {
  overline: "Manifesto",
  lines: [
    "We do not chase the season.",
    "We chase the current —",
    "the slow, deliberate movement",
    "beneath a still surface.",
  ],
  note:
    "Every Sairyu piece is a single edition: cut by hand, worn once for the " +
    "archive, and never reprinted. What you acquire is not a garment but a " +
    "moment held in place.",
} as const;

/** Words rotated through the horizontal marquee. */
export const MARQUEE_WORDS: readonly string[] = [
  "Sairyu",
  "Archive 001",
  "Single Editions",
  "Cut Once",
];

/** Closing call-to-action. */
export const ACQUIRE = {
  overline: "Acquire",
  headline: "Own a single edition",
  body:
    "Ten pieces. No restocks. When an edition is gone, it stays in the " +
    "archive only.",
  buttonLabel: "Request access",
} as const;

/** Footer meta. */
export const FOOTER = {
  wordmark: "Sairyu",
  tagline: "Archive 001",
  links: [
    { label: "Instagram", href: "#" },
    { label: "Journal", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: "All pieces are single editions.",
} as const;

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
 * to `GALLERY_META`, and the archive grows automatically.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = GALLERY_IMAGES.map(
  (src, index) => {
    const meta = GALLERY_META[index];
    const title =
      meta?.title ?? `Drift No. ${String(index + 1).padStart(2, "0")}`;
    const price = meta?.price ?? "—";
    return { src, title, price, alt: title };
  },
);

/**
 * Editorial composition pattern, cycled across the gallery items. Varying
 * width, edge alignment, aspect ratio and crop turns a repeated image into a
 * deliberately asymmetric magazine spread rather than a uniform grid.
 */
export const GALLERY_LAYOUT: readonly GalleryLayout[] = [
  { width: 54, align: "start", ratio: "4 / 5", focus: "50% 30%" },
  { width: 38, align: "end", ratio: "3 / 4", focus: "70% 40%" },
  { width: 46, align: "center", ratio: "3 / 2", focus: "50% 45%" },
  { width: 58, align: "start", ratio: "16 / 10", focus: "35% 40%" },
  { width: 38, align: "end", ratio: "4 / 5", focus: "80% 35%" },
  { width: 44, align: "center", ratio: "1 / 1", focus: "50% 50%" },
  { width: 50, align: "end", ratio: "3 / 4", focus: "40% 30%" },
  { width: 40, align: "start", ratio: "4 / 5", focus: "20% 40%" },
  { width: 56, align: "center", ratio: "16 / 10", focus: "60% 45%" },
  { width: 42, align: "end", ratio: "3 / 4", focus: "50% 25%" },
];

/** Section headings used across the page. */
export const SECTIONS = {
  galleryOverline: "The Archive",
  galleryTitle: "Ten drifts,",
  galleryTitleEm: "each cut once.",
} as const;
