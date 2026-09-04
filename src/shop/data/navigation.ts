/**
 * navigation.ts — menu, sort and tab definitions.
 *
 * Every label the shop chrome renders lives here so no component owns copy.
 */

import type { NavItem, ProductDetailTab, SortOption } from "@/shop/types";

/** Side drawer menu, in the order the design lists them. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: "all", label: "ALL" },
  { id: "new", label: "NEW" },
  { id: "top", label: "TOP" },
  { id: "bag", label: "BAG" },
  { id: "archive", label: "ARCHIVE" },
  { id: "search", label: "SEARCH" },
];

/** Links pinned to the bottom of the side drawer. */
export const DRAWER_FOOTER_LINKS = [
  { id: "login", label: "SIGN/LOG IN" },
  { id: "instagram", label: "INSTAGRAM" },
] as const;

/** Options inside the SORT BY dropdown. */
export const SORT_OPTIONS: readonly SortOption[] = [
  { id: "new-arrivals", label: "NEW ARRIVALS" },
  { id: "oldest-first", label: "OLDEST FIRST" },
];

/** Tabs under the product detail page. */
export const PRODUCT_DETAIL_TABS: readonly {
  id: ProductDetailTab;
  label: string;
}[] = [
  { id: "info", label: "상품 정보" },
  { id: "size", label: "사이즈 가이드" },
  { id: "shipping", label: "배송안내" },
];
