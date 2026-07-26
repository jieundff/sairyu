import { GALLERY_ITEMS, SECTIONS } from "@/data/content";
import { GalleryCard } from "./GalleryCard";

/**
 * The collection grid. Maps over `GALLERY_ITEMS` from `data/content.ts`
 * (which is built from `GALLERY_IMAGES` in `data/assets.ts`). No image
 * arrays are declared here.
 */
export function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="gallery__header">
        <h2 className="gallery__title">{SECTIONS.galleryTitle}</h2>
        <p className="gallery__subtitle">{SECTIONS.gallerySubtitle}</p>
      </div>

      <div className="gallery__grid">
        {GALLERY_ITEMS.map((item, index) => (
          <GalleryCard key={item.src} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
