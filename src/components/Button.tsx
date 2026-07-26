import type { ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "@/types";
import { cn } from "@/utils/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/** Reusable button. Label is passed by the caller from a data file. */
export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn("btn", `btn--${variant}`, className)} {...rest}>
      {children}
    </button>
  );
}
