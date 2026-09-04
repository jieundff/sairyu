import type { Product } from "@/shop/types";
import { PriceLine } from "./PriceLine";
import { cn } from "@/utils/classNames";

interface ProductCardProps {
  product: Product;
  onClick?: (id: string) => void;
  className?: string;
}

/**
 * Figma `Component 6` — a 3:4 image, the product name, then the price block.
 * Sale items add a struck-through original price and a discount rate; the
 * card handles both states through `PriceLine`.
 */
export function ProductCard({ product, onClick, className }: ProductCardProps) {
  return (
    <button
      type="button"
      className={cn("shop-product-card", className)}
      onClick={() => onClick?.(product.id)}
    >
      <span className="shop-product-card__media">
        <img
          className="shop-product-card__image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </span>
      <span className="shop-product-card__name">{product.name}</span>
      <PriceLine
        className="shop-product-card__price"
        price={product.price}
        originalPrice={product.originalPrice}
        discountRate={product.discountRate}
      />
    </button>
  );
}
