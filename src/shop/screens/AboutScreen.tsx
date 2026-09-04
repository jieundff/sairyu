import { SHOP_ABOUT_IMAGE } from "@/data/assets";
import { ABOUT_COPY } from "@/shop/data/copy";

/** 어바웃 — heading, editorial image, brand statement. */
export function AboutScreen() {
  return (
    <div className="shop-about">
      <h1 className="shop-about__heading">{ABOUT_COPY.heading}</h1>
      <img className="shop-about__image" src={SHOP_ABOUT_IMAGE} alt="" />
      <p className="shop-about__body">{ABOUT_COPY.body}</p>
    </div>
  );
}
