import type { CartItem } from "@/shop/types";
import { CART_COPY } from "@/shop/data/copy";
import { CartLineItem } from "@/shop/components/commerce/CartLineItem";
import { ButtonPair } from "@/shop/components/form/ButtonPair";
import { PageTitle } from "@/shop/components/layout/PageTitle";

interface CartConfirmScreenProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onGoToCart: () => void;
  onPlaceOrder: () => void;
}

/** 장바구니 담았을 때 — the confirmation shown right after Add to Cart. */
export function CartConfirmScreen({
  item,
  onQuantityChange,
  onGoToCart,
  onPlaceOrder,
}: CartConfirmScreenProps) {
  return (
    <div className="shop-cart">
      <PageTitle>Cart(1)</PageTitle>

      <div className="shop-cart__lines">
        <CartLineItem
          item={item}
          variant="confirm"
          onQuantityChange={onQuantityChange}
        />
      </div>

      <ButtonPair
        className="shop-cart__actions"
        leftLabel={CART_COPY.goToCart}
        rightLabel={CART_COPY.placeOrder}
        onLeftClick={onGoToCart}
        onRightClick={onPlaceOrder}
      />
    </div>
  );
}
