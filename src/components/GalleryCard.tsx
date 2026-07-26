import { useRef, type CSSProperties } from "react";
import type { GalleryItem, GalleryLayout } from "@/types";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, PARALLAX } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { cn } from "@/utils/classNames";

interface GalleryCardProps {
  item: GalleryItem;
  layout: GalleryLayout;
  /** Position in the archive, used for the numbered caption. */
  index: number;
}

/**
 * A single archive figure. Data (including the image `src` from `assets.ts`)
 * arrives via props — no URLs or arrays are declared here.
 *
 * Two independent motions, on two elements, so they never fight over one
 * transform: the frame reveals once via an animated clip-path mask, while the
 * image inside is continuously counter-scrolled (parallax) for depth.
 */
export function GalleryCard({ item, layout, index }: GalleryCardProps) {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const frame = root.querySelector<HTMLElement>(".card__frame");
    const image = root.querySelector<HTMLElement>(".card__image");
    const meta = root.querySelectorAll<HTMLElement>(".card__meta > *");
    if (!frame || !image) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // One-shot mask reveal of the frame.
      gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(meta, { autoAlpha: 0, y: 18 });

      gsap.to(frame, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: DURATION.slow,
        ease: EASE.expo,
        scrollTrigger: { trigger: root, start: "top 82%" },
      });
      gsap.to(meta, {
        autoAlpha: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });

      // Continuous parallax on the image (scrubbed, GPU transform only).
      gsap.fromTo(
        image,
        { yPercent: -PARALLAX.image / 2 },
        {
          yPercent: PARALLAX.image / 2,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const style = {
    "--card-w": `${layout.width}%`,
    "--card-ar": layout.ratio,
  } as CSSProperties;

  return (
    <article
      ref={rootRef}
      className={cn("card", `card--${layout.align}`)}
      style={style}
    >
      <figure className="card__frame">
        <img
          className="card__image"
          src={item.src}
          alt={item.alt}
          style={{ objectPosition: layout.focus }}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="card__meta">
        <span className="card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="card__title">{item.title}</span>
        <span className="card__price">{item.price}</span>
      </div>
    </article>
  );
}
