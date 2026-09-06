import type { NavItem, NavItemId } from "@/shop/types";
import { cn } from "@/utils/classNames";

interface NavMenuListProps {
  items: readonly NavItem[];
  onSelect: (id: NavItemId) => void;
  className?: string;
}

/**
 * The drawer's primary menu. Figma spaces the rows by absolute coordinates
 * (73.23px apart); expressed as a flex `gap` it stays correct once the real
 * font loads.
 */
export function NavMenuList({ items, onSelect, className }: NavMenuListProps) {
  return (
    <nav className={cn("shop-nav-menu", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="shop-nav-menu__item"
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
