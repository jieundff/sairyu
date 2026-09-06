import { CloseIcon } from "@/shop/components/icons";
import { cn } from "@/utils/classNames";

interface CloseButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

/** The X that dismisses the drawer and the archive overlay. */
export function CloseButton({
  onClick,
  label = "닫기",
  className,
}: CloseButtonProps) {
  return (
    <button type="button" className={cn(className)} onClick={onClick}>
      <CloseIcon />
      <span className="shop-sr-only">{label}</span>
    </button>
  );
}
