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
 *  Paths point at the `public/` folder, so `/images/01.webp` resolves to
 *  `public/images/01.webp` at build/serve time. Replace the files in place
 *  and the site updates automatically — no component changes required.
 */

export const VIDEOS = {
  left: "/videos/left.mp4",
  right: "/videos/right.mp4",
} as const;

export const GALLERY_IMAGES = [
  "/images/01.webp",
  "/images/02.webp",
  "/images/03.webp",
  "/images/04.webp",
  "/images/05.webp",
  "/images/06.webp",
  "/images/07.webp",
  "/images/08.webp",
  "/images/09.webp",
  "/images/10.webp",
] as const;

/** Convenience type for a single gallery image source. */
export type GalleryImageSrc = (typeof GALLERY_IMAGES)[number];
