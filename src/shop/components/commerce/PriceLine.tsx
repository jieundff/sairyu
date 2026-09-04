import { formatKrw, formatRate } from "@/shop/format";
import { cn } from "@/utils/classNames";

interface PriceLineProps {
  price: number;
  /** Pre-discount price. When present it renders struck through, above. */
  originalPrice?: number;
  /** Discount percentage, rendered beside the current price. */
  discountRate?: number;
  /** 13px / 15.5px / 19.3px, matching the three price sizes in the design. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * The atom every price surface shares — product card, cart line and detail
 * page. Owning the discount layout here is what lets `ProductCard` stay the
 * same component whether or not an item is on sale.
 */
export function PriceLine({
  price,
  originalPrice,
  discountRate,
  size = "sm",
  className,
}: PriceLineProps) {
  return (
    <p className={cn("shop-price", `shop-price--${size}`, className)}>
      {originalPrice !== undefined && (
        <span className="shop-price__original">{formatKrw(originalPrice)}</span>
      )}
      <span className="shop-price__current">{formatKrw(price)}</span>
      {discountRate !== undefined && (
        <span className="shop-price__rate">{formatRate(discountRate)}</span>
      )}
    </p>
  );
}
