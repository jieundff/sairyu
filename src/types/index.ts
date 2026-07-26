/** Shared, reusable type definitions for the whole application. */

/** A single entry in the gallery grid. */
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

/** Visual/behavioral variants for the shared Button component. */
export type ButtonVariant = "primary" | "secondary";
