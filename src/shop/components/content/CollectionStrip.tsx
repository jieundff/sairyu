import type { Collection } from "@/shop/types";
import { cn } from "@/utils/classNames";

interface CollectionStripProps {
  collection: Collection;
  className?: string;
}

/**
 * One archive row: a caption chip over a scrollable line of lookbook frames.
 * Figma places each look as an individual layer; here they come from data so a
 * collection grows by adding entries, not by adding markup.
 */
export function CollectionStrip({
  collection,
  className,
}: CollectionStripProps) {
  return (
    <section className={cn("shop-collection", className)}>
      <div className="shop-collection__looks">
        {collection.looks.map((look, index) => (
          <img
            key={`${collection.id}-${index}`}
            className="shop-collection__look"
            src={look.src}
            alt={look.alt}
            loading="lazy"
          />
        ))}
      </div>
      <p className="shop-collection__label">{collection.label}</p>
    </section>
  );
}
