import type { CartItem } from "@/shop/types";
import { CloseIcon } from "@/shop/components/icons";
import { PriceLine } from "./PriceLine";
import { QuantityStepper } from "./QuantityStepper";
import { cn } from "@/utils/classNames";

interface CartLineItemProps {
  item: CartItem;
  /**
   * `confirm` = the add-to-cart screen (137px thumbnail, no chrome).
   * `list`    = the cart screen (103px thumbnail, select box + remove, ruled).
   */
  variant?: "confirm" | "list";
  onSelectChange?: (selected: boolean) => void;
  onQuantityChange?: (next: number) => void;
  onRemove?: () => void;
  className?: string;
}

/**
 * Figma `Component 4`. The two places it appears differ only in thumbnail size
 * and whether the select/remove chrome is present, so both are variants of one
 * component rather than two near-identical ones.
 */
export function CartLineItem({
  item,
  variant = "confirm",
  onSelectChange,
  onQuantityChange,
  onRemove,
  className,
}: CartLineItemProps) {
  const { product, quantity, selected } = item;

  return (
    <article
      className={cn("shop-cart-line", `shop-cart-line--${variant}`, className)}
    >
      {variant === "list" && (
        <div className="shop-cart-line__head">
          <button
            type="button"
            className="shop-cart-line__checkbox"
            role="checkbox"
            aria-checked={selected}
            onClick={() => onSelectChange?.(!selected)}
          >
            {selected ? "✓" : ""}
            <span className="shop-sr-only">상품 선택</span>
          </button>
          <button
            type="button"
            className="shop-cart-line__remove"
            onClick={() => onRemove?.()}
          >
            <CloseIcon />
            <span className="shop-sr-only">삭제</span>
          </button>
        </div>
      )}

      <div className="shop-cart-line__main">
        <div className="shop-cart-line__media">
          <img
            className="shop-cart-line__image"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className="shop-cart-line__body">
          <h3 className="shop-cart-line__name">{product.name}</h3>
          <PriceLine
            price={product.price}
            originalPrice={product.originalPrice}
            discountRate={product.discountRate}
          />
          <QuantityStepper
            value={quantity}
            onChange={(next) => onQuantityChange?.(next)}
          />
        </div>
      </div>
    </article>
  );
}
