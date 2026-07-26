import type { ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "@/types";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/utils/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Enable magnetic pointer attraction (auto-disabled on touch). */
  magnetic?: boolean;
}

/**
 * Reusable button. The label is duplicated so the two copies can slide past a
 * clipped edge on hover (see CSS). Magnetic attraction is opt-out.
 */
export function Button({
  variant = "primary",
  magnetic = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>();

  return (
    <button
      ref={magnetic ? ref : undefined}
      className={cn("btn", `btn--${variant}`, className)}
      {...rest}
    >
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label">
        <span className="btn__text">{children}</span>
        <span className="btn__text btn__text--ghost" aria-hidden="true">
          {children}
        </span>
      </span>
    </button>
  );
}
