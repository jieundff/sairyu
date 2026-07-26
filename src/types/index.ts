/** Shared, reusable type definitions for the whole application. */

/** A single entry in the gallery. */
export interface GalleryItem {
  /** Image source — always sourced from `data/assets.ts`. */
  readonly src: string;
  /** Human-readable title shown on the card. */
  readonly title: string;
  /** Price label shown on the card (pre-formatted, e.g. "0.08 ETH"). */
  readonly price: string;
  /** Alt text for accessibility. */
  readonly alt: string;
}

/** Horizontal placement of a gallery figure within the editorial flow. */
export type GalleryAlign = "start" | "center" | "end";

/**
 * Presentation layout for one gallery figure. Kept in data so the composition
 * is tunable without touching components. Cycled across all items.
 */
export interface GalleryLayout {
  /** Figure width as a percentage of the content column. */
  readonly width: number;
  /** Which edge the figure aligns to. */
  readonly align: GalleryAlign;
  /** CSS aspect-ratio string, e.g. "4 / 5". */
  readonly ratio: string;
  /** object-position for the image, giving repeated art varied crops. */
  readonly focus: string;
}

/** The two looping videos framing the hero section. */
export interface VideoSources {
  readonly left: string;
  readonly right: string;
}

/** Copy and configuration for the hero section. */
export interface HeroContent {
  readonly collectionName: string;
  readonly tagline: string;
  readonly description: string;
  readonly primaryButtonLabel: string;
  readonly secondaryButtonLabel: string;
}

/** A navigation link. */
export interface NavLink {
  readonly label: string;
  /** Element id to smooth-scroll to. */
  readonly target: string;
}

/** Visual/behavioral variants for the shared Button component. */
export type ButtonVariant = "primary" | "secondary" | "ghost";
