/**
 * types.ts — shared type definitions for the SAIRYU shop component layer.
 *
 * Mirrors the entities the Figma page ("코딩용 최종") describes: products with
 * an optional discount, cart lines, navigation targets and the size/policy
 * content shown under the product detail tabs.
 */

/** Top-level catalogue categories, taken from the side drawer menu. */
export type CategoryId = "all" | "new" | "top" | "bag";

/** Everything the side drawer can navigate to. */
export type NavItemId = CategoryId | "archive" | "search";

/** Sort options offered by the SORT BY dropdown. */
export type SortOptionId = "new-arrivals" | "oldest-first";

/** The three tabs under a product detail page. */
export type ProductDetailTab = "info" | "size" | "shipping";

/** A single sellable item. */
export interface Product {
  readonly id: string;
  readonly name: string;
  /** Current selling price, in KRW. */
  readonly price: number;
  /** Pre-discount price. Present only when the item is on sale. */
  readonly originalPrice?: number;
  /** Discount percentage, e.g. 10 renders as "10%". */
  readonly discountRate?: number;
  /** Image source — always sourced from `data/assets.ts`. */
  readonly image: string;
  readonly category: CategoryId;
}

/** One line in the cart: a product plus how many of it. */
export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
  /** Whether the line is ticked for "선택상품 주문". */
  readonly selected: boolean;
}

/** An entry in the side drawer menu. */
export interface NavItem {
  readonly id: NavItemId;
  readonly label: string;
}

/** An entry in the SORT BY dropdown. */
export interface SortOption {
  readonly id: SortOptionId;
  readonly label: string;
}

/** One measurement row of the size guide table. */
export interface SizeRow {
  /** Row header, e.g. "1". */
  readonly size: string;
  /** Measurements, index-aligned with the table's value columns. */
  readonly values: readonly number[];
}

/** A single lookbook photo inside an archive collection. */
export interface LookImage {
  readonly src: string;
  readonly alt: string;
}

/** One archive collection strip. */
export interface Collection {
  readonly id: string;
  readonly label: string;
  readonly looks: readonly LookImage[];
}

/** Screens reachable from `ShopApp`. */
export type ScreenId =
  | "home"
  | "about"
  | "archive"
  | "products"
  | "product-detail"
  | "login"
  | "cart"
  | "cart-confirm";
