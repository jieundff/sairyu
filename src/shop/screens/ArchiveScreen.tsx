import { ARCHIVE_COPY } from "@/shop/data/copy";
import { COLLECTIONS } from "@/shop/data/collections";
import { CollectionStrip } from "@/shop/components/content/CollectionStrip";
import { CloseButton } from "@/shop/components/nav/CloseButton";

interface ArchiveScreenProps {
  onClose: () => void;
}

/** 아카이브 — the three collection strips over a soft gradient. */
export function ArchiveScreen({ onClose }: ArchiveScreenProps) {
  return (
    <div className="shop-archive">
      <div className="shop-archive__head">
        <div>
          <p className="shop-archive__wordmark">{ARCHIVE_COPY.wordmark}</p>
          <p className="shop-archive__tagline">{ARCHIVE_COPY.tagline}</p>
        </div>
        <CloseButton className="shop-archive__close" onClick={onClose} />
      </div>

      {COLLECTIONS.map((collection) => (
        <CollectionStrip key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
