import { useRef } from "react";
import { HERO } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { scrollToId } from "@/hooks/useSmoothScroll";
import { VideoCanvas } from "./VideoCanvas";
import { Button } from "./Button";

interface HeroProps {
  /** Flips true when the preloader finishes; releases the intro. */
  ready: boolean;
}

/**
 * Cinematic hero. Two framing videos (media from `assets.ts`) reveal behind a
 * character-masked wordmark. The whole intro is choreographed as one timeline
 * that waits for the preloader, so the first thing the visitor sees is a
 * deliberate assembly rather than a static frame.
 */
export function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const letters = HERO.collectionName.toUpperCase().split("");

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const chars = q(".hero__char-i");
    const videos = q("[data-hero-video]");
    const fadeUp = q("[data-hero-fade]");

    if (prefersReducedMotion()) {
      gsap.set([...chars, ...fadeUp], { yPercent: 0, autoAlpha: 1 });
      gsap.set(videos, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 120 });
      gsap.set(fadeUp, { autoAlpha: 0, y: 28 });
      gsap.set(videos, {
        clipPath: "inset(18% 6% 18% 6%)",
        autoAlpha: 0,
        scale: 1.12,
      });

      if (!ready) return;

      const tl = gsap.timeline({ defaults: { ease: EASE.expo } });
      tl.to(videos, {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        scale: 1,
        duration: DURATION.slow,
        stagger: 0.12,
      })
        .to(
          chars,
          { yPercent: 0, duration: DURATION.reveal, stagger: STAGGER.chars },
          "-=1.1",
        )
        .to(
          fadeUp,
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.base,
            stagger: 0.12,
            ease: EASE.out,
          },
          "-=0.7",
        );
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <header className="hero" ref={rootRef}>
      <div className="hero__videos">
        <VideoCanvas side="left" />
        <VideoCanvas side="right" />
      </div>

      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__inner">
        <span className="hero__overline" data-hero-fade>
          {HERO.tagline}
        </span>

        <h1 className="hero__title" aria-label={HERO.collectionName}>
          {letters.map((ch, i) => (
            <span className="hero__char" key={i} aria-hidden="true">
              <span className="hero__char-i">{ch}</span>
            </span>
          ))}
        </h1>

        <p className="hero__desc" data-hero-fade>
          {HERO.description}
        </p>

        <div className="hero__actions" data-hero-fade>
          <Button variant="primary">{HERO.primaryButtonLabel}</Button>
          <button
            type="button"
            className="hero__enter"
            onClick={() => scrollToId("gallery")}
          >
            <span>{HERO.secondaryButtonLabel}</span>
            <span className="hero__enter-line" aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="hero__cue"
        data-hero-fade
        onClick={() => scrollToId("manifesto")}
        aria-label="Scroll"
      >
        <span className="hero__cue-word">Scroll</span>
        <span className="hero__cue-track" aria-hidden="true">
          <span className="hero__cue-dot" />
        </span>
      </button>
    </header>
  );
}
