import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "@fontsource/prompt/300.css";
import "@fontsource/prompt/400.css";
import "@fontsource-variable/fraunces";
import { ShopApp } from "./ShopApp";
import "./shop.css";

const container = document.getElementById("shop-root");
if (!container) throw new Error('Root element "#shop-root" not found');

createRoot(container).render(
  <StrictMode>
    <ShopApp />
  </StrictMode>,
);
