import { CART_COPY } from "@/shop/data/copy";
import { formatKrw } from "@/shop/format";
import { cn } from "@/utils/classNames";

interface OrderSummaryProps {
  productTotal: number;
  shippingFee: number;
  /** Defaults to `productTotal + shippingFee`. */
  payableTotal?: number;
  className?: string;
}

/** Figma `Component 7` — 총 상품금액 / 총 배송비 / 결제예정금액. */
export function OrderSummary({
  productTotal,
  shippingFee,
  payableTotal,
  className,
}: OrderSummaryProps) {
  const rows = [
    { label: CART_COPY.productTotal, value: productTotal },
    { label: CART_COPY.shippingTotal, value: shippingFee },
    {
      label: CART_COPY.payableTotal,
      value: payableTotal ?? productTotal + shippingFee,
    },
  ];

  return (
    <div className={cn("shop-order-summary", className)}>
      {rows.map((row) => (
        <div key={row.label} className="shop-order-summary__row">
          <span className="shop-order-summary__label">{row.label}</span>
          <span className="shop-order-summary__value">
            {formatKrw(row.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
