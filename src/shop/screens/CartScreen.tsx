import type { CartItem } from "@/shop/types";
import { CART_COPY, SHIPPING_FEE } from "@/shop/data/copy";
import { CartLineItem } from "@/shop/components/commerce/CartLineItem";
import { OrderSummary } from "@/shop/components/commerce/OrderSummary";
import { ButtonPair } from "@/shop/components/form/ButtonPair";
import { EmptyState } from "@/shop/components/content/EmptyState";
import { PageTitle } from "@/shop/components/layout/PageTitle";

interface CartScreenProps {
  items: readonly CartItem[];
  onSelectChange: (productId: string, selected: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onOrderSelected: () => void;
  onOrderAll: () => void;
}

/**
 * 장바구니 — the ruled line list, the order summary, then the order bar.
 * With no lines it collapses to the empty state artboard.
 */
export function CartScreen({
  items,
  onSelectChange,
  onQuantityChange,
  onRemove,
  onOrderSelected,
  onOrderAll,
}: CartScreenProps) {
  if (items.length === 0) {
    return <EmptyState message={CART_COPY.emptyMessage} />;
  }

  const productTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="shop-cart">
      <PageTitle>{`Cart(${items.length})`}</PageTitle>

      <div className="shop-cart__lines">
        {items.map((item) => (
          <CartLineItem
            key={item.product.id}
            item={item}
            variant="list"
            onSelectChange={(selected) =>
              onSelectChange(item.product.id, selected)
            }
            onQuantityChange={(quantity) =>
              onQuantityChange(item.product.id, quantity)
            }
            onRemove={() => onRemove(item.product.id)}
          />
        ))}
      </div>

      <OrderSummary
        className="shop-cart__summary"
        productTotal={productTotal}
        shippingFee={SHIPPING_FEE}
      />

      <ButtonPair
        className="shop-cart__actions"
        leftLabel={CART_COPY.orderSelected}
        rightLabel={CART_COPY.orderAll}
        onLeftClick={onOrderSelected}
        onRightClick={onOrderAll}
      />

      <p className="shop-cart__note">{CART_COPY.freeShippingNote}</p>
    </div>
  );
}
