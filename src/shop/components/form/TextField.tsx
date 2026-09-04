import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/classNames";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The design draws the field's name inside the box, so the label doubles as
   * the placeholder and is kept off-screen for assistive tech.
   */
  label: string;
}

/** 51px-tall outlined input with a 5px radius — `ID`, `Password`. */
export function TextField({ label, className, id, ...rest }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("shop-field", className)}>
      <label className="shop-sr-only" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="shop-field__input"
        placeholder={label}
        {...rest}
      />
    </div>
  );
}
