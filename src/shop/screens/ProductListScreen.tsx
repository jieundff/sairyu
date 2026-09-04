import { useState } from "react";
import type { SortOptionId } from "@/shop/types";
import { PRODUCTS } from "@/shop/data/products";
import { SORT_OPTIONS } from "@/shop/data/navigation";
import { SHOP_BREADCRUMB } from "@/shop/data/copy";
import { CategoryBreadcrumb } from "@/shop/components/commerce/CategoryBreadcrumb";
import { ProductGrid } from "@/shop/components/commerce/ProductGrid";
import { SortMenu } from "@/shop/components/commerce/SortMenu";
import { SortTrigger } from "@/shop/components/commerce/SortTrigger";

interface ProductListScreenProps {
  onSelectProduct: (id: string) => void;
}

/**
 * 상품탭 — breadcrumb + sort control over the two-column grid.
 *
 * The three product-list artboards differ only in whether the sort menu is
 * open and which way the caret points, so one screen with `sortOpen` covers
 * all three.
 */
export function ProductListScreen({ onSelectProduct }: ProductListScreenProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<SortOptionId>("new-arrivals");

  const products =
    sort === "oldest-first" ? [...PRODUCTS].reverse() : [...PRODUCTS];

  return (
    <div className="shop-products">
      <div className="shop-toolbar">
        <CategoryBreadcrumb category={SHOP_BREADCRUMB.category} />
        <div className="shop-sort">
          <SortTrigger open={sortOpen} onToggle={() => setSortOpen(!sortOpen)} />
          {sortOpen && (
            <SortMenu
              options={SORT_OPTIONS}
              value={sort}
              onSelect={(id) => {
                setSort(id);
                setSortOpen(false);
              }}
            />
          )}
        </div>
      </div>

      <ProductGrid products={products} onSelect={onSelectProduct} />
    </div>
  );
}
