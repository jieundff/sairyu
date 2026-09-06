import { SHOP_LOGO } from "@/data/assets";
import { SHOP_WORDMARK } from "@/shop/data/copy";
import { BagIcon, MenuIcon } from "@/shop/components/icons";
import { cn } from "@/utils/classNames";

interface AppHeaderProps {
  /**
   * Matches the two variants on the Figma component sheet: `black` paints the
   * icons in ink (default, on white), `white` paints them light so the bar can
   * sit over artwork.
   */
  variant?: "black" | "white";
  onMenuClick: () => void;
  onCartClick: () => void;
  className?: string;
}

/**
 * TAB BAR — menu on the left, wordmark centred, cart on the right.
 *
 * The logo image is optional: until a file is configured in `data/assets.ts`
 * the header falls back to the SAIRYU wordmark so nothing renders broken.
 */
export function AppHeader({
  variant = "black",
  onMenuClick,
  onCartClick,
  className,
}: AppHeaderProps) {
  return (
    <header className={cn("shop-header", `shop-header--${variant}`, className)}>
      <button type="button" className="shop-header__button" onClick={onMenuClick}>
        <MenuIcon />
        <span className="shop-sr-only">메뉴 열기</span>
      </button>

      {SHOP_LOGO ? (
        <img className="shop-header__logo" src={SHOP_LOGO} alt={SHOP_WORDMARK} />
      ) : (
        <span className="shop-header__wordmark">{SHOP_WORDMARK}</span>
      )}

      <button type="button" className="shop-header__button" onClick={onCartClick}>
        <BagIcon />
        <span className="shop-sr-only">장바구니</span>
      </button>
    </header>
  );
}
