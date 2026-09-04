/**
 * products.ts — the shop catalogue.
 *
 * Prices are plain numbers in KRW; formatting into "39,000원" happens in
 * `PriceLine`, never here. Images come from `data/assets.ts` (repo rule).
 */

import { PRODUCT_IMAGES } from "@/data/assets";
import type { Product } from "@/shop/types";

export const PRODUCTS: readonly Product[] = [
  {
    id: "tie-one-shoulder-grey",
    name: "Tie One Shoulder T-shirt - Grey",
    price: 39_000,
    image: PRODUCT_IMAGES[0],
    category: "top",
  },
  {
    id: "tie-one-shoulder-grey-sale",
    name: "Tie One Shoulder T-shirt - Grey",
    price: 35_100,
    originalPrice: 39_000,
    discountRate: 10,
    image: PRODUCT_IMAGES[1],
    category: "top",
  },
  {
    id: "tie-one-shoulder-grey-03",
    name: "Tie One Shoulder T-shirt - Grey",
    price: 39_000,
    image: PRODUCT_IMAGES[2],
    category: "top",
  },
  {
    id: "tie-one-shoulder-grey-04",
    name: "Tie One Shoulder T-shirt - Grey",
    price: 39_000,
    image: PRODUCT_IMAGES[3],
    category: "top",
  },
];

/** Look up one product by id. Returns the first product as a safe fallback. */
export function findProduct(id: string): Product {
  return PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0];
}
