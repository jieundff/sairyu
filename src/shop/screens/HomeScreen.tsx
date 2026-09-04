import { SHOP_HOME_IMAGE } from "@/data/assets";
import { HOME_LINKS } from "@/shop/data/copy";

interface HomeScreenProps {
  onLink: (id: (typeof HOME_LINKS)[number]["id"]) => void;
}

/** 메인 탭 — full-bleed artwork with the header floating over it. */
export function HomeScreen({ onLink }: HomeScreenProps) {
  return (
    <div className="shop-home">
      <img className="shop-home__hero" src={SHOP_HOME_IMAGE} alt="" />
      <div className="shop-home__links">
        {HOME_LINKS.map((link) => (
          <button key={link.id} type="button" onClick={() => onLink(link.id)}>
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
