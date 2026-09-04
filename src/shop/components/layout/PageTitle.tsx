import type { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

/** Centred 18px light title — `Log-in`, `Cart(1)`. */
export function PageTitle({ children }: PageTitleProps) {
  return <h1 className="shop-page-title">{children}</h1>;
}
