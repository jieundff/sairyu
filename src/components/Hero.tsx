import { HERO } from "@/data/content";
import { VideoCanvas } from "./VideoCanvas";
import { Button } from "./Button";

/**
 * Hero section: two framing videos and the collection headline.
 * All copy comes from `data/content.ts`; all media from `data/assets.ts`
 * (via VideoCanvas). This component hardcodes neither.
 */
export function Hero() {
  return (
    <header className="hero">
      <VideoCanvas side="left" />
      <VideoCanvas side="right" />

      <div className="hero__content">
        <p className="hero__eyebrow">{HERO.tagline}</p>
        <h1 className="hero__title">{HERO.collectionName}</h1>
        <p className="hero__description">{HERO.description}</p>

        <div className="hero__actions">
          <Button variant="primary">{HERO.primaryButtonLabel}</Button>
          <a href="#gallery" className="hero__link">
            <Button variant="secondary">{HERO.secondaryButtonLabel}</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
