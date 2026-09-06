import type { SortOption, SortOptionId } from "@/shop/types";
import { cn } from "@/utils/classNames";

interface SortMenuProps {
  options: readonly SortOption[];
  value: SortOptionId;
  onSelect: (id: SortOptionId) => void;
  className?: string;
}

/**
 * The dropdown panel from artboard `174:335`. Anchored to the trigger rather
 * than to the artboard coordinates, so it follows if the toolbar moves.
 */
export function SortMenu({
  options,
  value,
  onSelect,
  className,
}: SortMenuProps) {
  return (
    <div className={cn("shop-sort__menu", className)} role="listbox">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="option"
          aria-selected={option.id === value}
          className={cn(
            "shop-sort__option",
            option.id === value && "shop-sort__option--active",
          )}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
