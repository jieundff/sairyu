/**
 * assets.ts — the single source of truth for every media asset in the app.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  RULES
 * ─────────────────────────────────────────────────────────────────────────
 *  1. NEVER hardcode an image or video URL inside a component.
 *  2. Every component (Hero, VideoCanvas, Gallery, GalleryCard, …) imports
 *     its media from THIS file only.
 *  3. To swap the whole site's media, edit ONLY this file — or drop new files
 *     into `public/images` and `public/videos` using the same names.
 *
 *  Paths point at the `public/` folder, so `/images/최종2.jpg` resolves to
 *  `public/images/최종2.jpg` at build/serve time. Replace the files in place
 *  and the site updates automatically — no component changes required.
 *
 *  PREVIEW STATE: every gallery slot below points to the same final preview
 *  image (`public/images/최종2.jpg`). The ten slots are kept as separate
 *  entries so each can be repointed to its own final asset later — just edit
 *  the matching line below (or drop a file in `public/images`), no component
 *  change needed.
 */

export const VIDEOS = {
  left: "/videos/left.mp4",
  right: "/videos/right.mp4",
} as const;

export const GALLERY_IMAGES = [
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
  "/images/최종2.jpg",
] as const;

/** Convenience type for a single gallery image source. */
export type GalleryImageSrc = (typeof GALLERY_IMAGES)[number];
