import { SHOP_BREADCRUMB } from "@/shop/data/copy";
import { CaretIcon } from "@/shop/components/icons";
import { cn } from "@/utils/classNames";

interface CategoryBreadcrumbProps {
  /** The leaf category, e.g. "TOP" or "BAG". */
  category: string;
  className?: string;
}

/** Figma `SORT` — `SHOP › TOP`, the breadcrumb above the product grid. */
export function CategoryBreadcrumb({
  category,
  className,
}: CategoryBreadcrumbProps) {
  return (
    <p className={cn("shop-breadcrumb", className)}>
      <span className="shop-breadcrumb__root">{SHOP_BREADCRUMB.root}</span>
      <CaretIcon direction="right" />
      <span className="shop-breadcrumb__category">{category}</span>
    </p>
  );
}
