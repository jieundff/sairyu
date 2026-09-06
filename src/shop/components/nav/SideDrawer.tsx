import { useState } from "react";
import type { NavItemId } from "@/shop/types";
import { DRAWER_FOOTER_LINKS, NAV_ITEMS } from "@/shop/data/navigation";
import { CloseButton } from "./CloseButton";
import { NavMenuList } from "./NavMenuList";
import { SearchField } from "./SearchField";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: NavItemId) => void;
  onFooterLink: (id: (typeof DRAWER_FOOTER_LINKS)[number]["id"]) => void;
}

/**
 * The full-screen menu behind the hamburger.
 *
 * Figma ships two artboards for this (`174:683` and `174:701`) whose only
 * difference is whether the search input is showing, so that is local state
 * here rather than a second component. Tapping SEARCH reveals the field
 * instead of navigating.
 */
export function SideDrawer({
  open,
  onClose,
  onNavigate,
  onFooterLink,
}: SideDrawerProps) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  if (!open) return null;

  function handleSelect(id: NavItemId) {
    if (id === "search") {
      setSearchOpen(true);
      return;
    }
    onNavigate(id);
  }

  return (
    <div className="shop-drawer" role="dialog" aria-modal="true">
      <div className="shop-drawer__panel">
        <CloseButton className="shop-drawer__close" onClick={onClose} />

        <NavMenuList
          className="shop-drawer__menu"
          items={NAV_ITEMS}
          onSelect={handleSelect}
        />

        {searchOpen && (
          <SearchField
            className="shop-drawer__search"
            value={query}
            onChange={setQuery}
          />
        )}

        <div className="shop-drawer__footer">
          <div className="shop-drawer__links">
            {DRAWER_FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onFooterLink(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
          <span className="shop-drawer__mark" aria-hidden="true">
            S
          </span>
        </div>
      </div>
    </div>
  );
}
