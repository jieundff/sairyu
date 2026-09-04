import { MinusIcon, PlusIcon } from "@/shop/components/icons";
import { cn } from "@/utils/classNames";

interface QuantityStepperProps {
  value: number;
  /** Lower bound; the decrease button disables at this value. Defaults to 1. */
  min?: number;
  onChange: (next: number) => void;
  className?: string;
}

/** `−  n  +` — the quantity control on the detail page and every cart line. */
export function QuantityStepper({
  value,
  min = 1,
  onChange,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn("shop-stepper", className)}>
      <button
        type="button"
        className="shop-stepper__button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        <MinusIcon />
        <span className="shop-sr-only">수량 줄이기</span>
      </button>
      <span className="shop-stepper__value">{value}</span>
      <button
        type="button"
        className="shop-stepper__button"
        onClick={() => onChange(value + 1)}
      >
        <PlusIcon />
        <span className="shop-sr-only">수량 늘리기</span>
      </button>
    </div>
  );
}
