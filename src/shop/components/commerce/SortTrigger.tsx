import { SORT_TRIGGER_LABEL } from "@/shop/data/copy";
import { CaretIcon } from "@/shop/components/icons";
import { cn } from "@/utils/classNames";

interface SortTriggerProps {
  open: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
}

/**
 * Figma `SORT 2` — `SORT BY ▾`. The design ships the open state as a separate
 * component whose only difference is the caret direction, so one component
 * with an `open` flag covers both.
 */
export function SortTrigger({
  open,
  onToggle,
  label = SORT_TRIGGER_LABEL,
  className,
}: SortTriggerProps) {
  return (
    <button
      type="button"
      className={cn("shop-sort__trigger", className)}
      onClick={onToggle}
      aria-expanded={open}
    >
      {label}
      <CaretIcon direction={open ? "up" : "down"} />
    </button>
  );
}
