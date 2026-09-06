import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/classNames";

interface ShopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `solid` = filled ink, `outline` = 1px ink border. */
  variant?: "solid" | "outline";
  /** `sm` = 41px (product detail), `md` = 51px (login, order bar). */
  size?: "sm" | "md";
  fullWidth?: boolean;
}

/**
 * The shop's only button shape: a 5px-radius rectangle in either solid ink or
 * an ink outline. Distinct from `src/components/Button.tsx`, which belongs to
 * the editorial site and carries its own magnetic hover choreography.
 */
export function ShopButton({
  variant = "solid",
  size = "sm",
  fullWidth = false,
  className,
  type = "button",
  children,
  ...rest
}: ShopButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "shop-btn",
        `shop-btn--${variant}`,
        `shop-btn--${size}`,
        fullWidth && "shop-btn--full",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
