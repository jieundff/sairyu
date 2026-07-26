import { GALLERY_ITEMS, GALLERY_LAYOUT, SECTIONS } from "@/data/content";
import { GalleryCard } from "./GalleryCard";

/**
 * The archive. Maps over `GALLERY_ITEMS` (assembled from `GALLERY_IMAGES` in
 * `assets.ts`) and pairs each with a cycled entry from `GALLERY_LAYOUT` to
 * build a deliberately asymmetric editorial flow — not a uniform grid. No image
 * arrays are declared here.
 */
export function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="gallery__head">
        <span className="section-overline">
          <span className="section-overline__dot" aria-hidden="true" />
          {SECTIONS.galleryOverline}
        </span>
        <h2 className="gallery__title">
          <span>{SECTIONS.galleryTitle}</span>
          <em>{SECTIONS.galleryTitleEm}</em>
        </h2>
      </div>

      <div className="gallery__flow">
        {GALLERY_ITEMS.map((item, index) => (
          <GalleryCard
            key={`${item.title}-${index}`}
            item={item}
            layout={GALLERY_LAYOUT[index % GALLERY_LAYOUT.length]}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
