import { ShopButton } from "./ShopButton";
import { cn } from "@/utils/classNames";

interface ButtonPairProps {
  leftLabel: string;
  rightLabel: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  className?: string;
}

/**
 * Figma `Component 5` (`주문버튼`) — an outline action beside a solid one.
 * Reused three times in the design: product detail (Add to Cart / Buy Now),
 * the add-to-cart confirmation, and the cart's order bar.
 */
export function ButtonPair({
  leftLabel,
  rightLabel,
  onLeftClick,
  onRightClick,
  className,
}: ButtonPairProps) {
  return (
    <div className={cn("shop-btn-pair", className)}>
      <ShopButton variant="outline" onClick={onLeftClick}>
        {leftLabel}
      </ShopButton>
      <ShopButton variant="solid" onClick={onRightClick}>
        {rightLabel}
      </ShopButton>
    </div>
  );
}
