import type { ReactNode } from "react";
import { cn } from "@/utils/classNames";

interface MobileShellProps {
  children: ReactNode;
  /**
   * Float the header over the content instead of stacking above it — used by
   * the home screen, where the tab bar sits on top of the artwork.
   */
  overlayHeader?: boolean;
  className?: string;
}

/**
 * The frame every shop screen lives in. Figma draws each artboard at a fixed
 * 423px; here that becomes a max-width so narrower handsets are not clipped.
 */
export function MobileShell({
  children,
  overlayHeader = false,
  className,
}: MobileShellProps) {
  return (
    <div
      className={cn(
        "shop-shell",
        overlayHeader && "shop-shell--overlay",
        className,
      )}
    >
      {children}
    </div>
  );
}
