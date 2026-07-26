import type { GalleryItem } from "@/types";
import { useInView } from "@/hooks/useInView";
import { CARD_STAGGER_MS } from "@/utils/constants";
import { cn } from "@/utils/classNames";

interface GalleryCardProps {
  item: GalleryItem;
  /** Position in the grid, used to stagger the reveal animation. */
  index: number;
}

/**
 * A single gallery card. Receives its data (including the image `src`, which
 * originates in `data/assets.ts`) via props — it never declares image URLs
 * or arrays of its own.
 */
export function GalleryCard({ item, index }: GalleryCardProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      className={cn("card", inView && "card--visible")}
      style={{ transitionDelay: `${index * CARD_STAGGER_MS}ms` }}
    >
      <div className="card__frame">
        <img
          className="card__image"
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="card__meta">
        <h3 className="card__title">{item.title}</h3>
        <span className="card__price">{item.price}</span>
      </div>
    </article>
  );
}
