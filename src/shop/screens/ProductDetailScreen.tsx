import { useState } from "react";
import type { Product, ProductDetailTab } from "@/shop/types";
import { PRODUCT_DETAIL_TABS } from "@/shop/data/navigation";
import {
  PRODUCT_COPY,
  REFUND_POLICY,
  SIZE_GUIDE,
} from "@/shop/data/copy";
import { formatKrw } from "@/shop/format";
import { PriceLine } from "@/shop/components/commerce/PriceLine";
import { QuantityStepper } from "@/shop/components/commerce/QuantityStepper";
import { ButtonPair } from "@/shop/components/form/ButtonPair";
import { PolicyList } from "@/shop/components/content/PolicyList";
import { SizeGuideTable } from "@/shop/components/content/SizeGuideTable";
import { TabNav } from "@/shop/components/content/TabNav";

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

/**
 * 상품상세 — one screen, three tab states.
 *
 * Figma draws 상품 정보 / 사이즈 가이드 / 배송안내 as three separate artboards,
 * but their top halves are identical; only the panel under the tab row changes.
 */
export function ProductDetailScreen({
  product,
  onAddToCart,
  onBuyNow,
}: ProductDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<ProductDetailTab>("info");

  const lineTotal = product.price * quantity;

  return (
    <div className="shop-detail">
      <img className="shop-detail__media" src={product.image} alt={product.name} />

      <div className="shop-detail__intro">
        <h1 className="shop-detail__name">{product.name}</h1>
        <PriceLine
          className="shop-detail__price"
          size="lg"
          price={product.price}
          originalPrice={product.originalPrice}
          discountRate={product.discountRate}
        />
      </div>

      <div className="shop-detail__option">
        <p className="shop-detail__option-name">{product.name}</p>
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <p className="shop-detail__option-price">{formatKrw(lineTotal)}</p>
      </div>

      <p className="shop-detail__total">
        {`${PRODUCT_COPY.totalPrefix} : ${formatKrw(lineTotal)} (${quantity}개)`}
      </p>

      <ButtonPair
        className="shop-detail__actions"
        leftLabel={PRODUCT_COPY.addToCart}
        rightLabel={PRODUCT_COPY.buyNow}
        onLeftClick={() => onAddToCart(product, quantity)}
        onRightClick={() => onBuyNow(product, quantity)}
      />

      <TabNav
        className="shop-detail__tabs"
        tabs={PRODUCT_DETAIL_TABS}
        value={tab}
        onChange={setTab}
      />

      <div className="shop-detail__panel">
        {tab === "info" && (
          <img
            className="shop-detail__panel-image"
            src={product.image}
            alt=""
            loading="lazy"
          />
        )}
        {tab === "size" && (
          <SizeGuideTable
            caption={SIZE_GUIDE.caption}
            columns={SIZE_GUIDE.columns}
            rows={SIZE_GUIDE.rows}
          />
        )}
        {tab === "shipping" && (
          <PolicyList title={REFUND_POLICY.title} items={REFUND_POLICY.items} />
        )}
      </div>
    </div>
  );
}
