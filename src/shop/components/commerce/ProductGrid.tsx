import type { Product } from "@/shop/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/utils/classNames";

interface ProductGridProps {
  products: readonly Product[];
  onSelect?: (id: string) => void;
  className?: string;
}

/** Two-column catalogue grid — 19px between columns, 50px between rows. */
export function ProductGrid({
  products,
  onSelect,
  className,
}: ProductGridProps) {
  return (
    <div className={cn("shop-product-grid", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onSelect} />
      ))}
    </div>
  );
}
