import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, PRELOADER } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { HERO } from "@/data/content";

interface PreloaderProps {
  onComplete: () => void;
}

const LOADING_CLASS = "is-loading";

/**
 * Full-screen intro. Counts to 100 while the page holds at the top, then lifts
 * away as a mask to hand off to the hero. Scroll is locked via a class on
 * <html> for the duration. Under reduced-motion it completes on the next frame.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const countEl = countRef.current;

    document.documentElement.classList.add(LOADING_CLASS);
    window.scrollTo(0, 0);

    const finish = () => {
      document.documentElement.classList.remove(LOADING_CLASS);
      onComplete();
    };

    if (!root || prefersReducedMotion()) {
      const id = window.requestAnimationFrame(finish);
      return () => {
        window.cancelAnimationFrame(id);
        document.documentElement.classList.remove(LOADING_CLASS);
      };
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      tl.to(counter, {
        value: 100,
        duration: PRELOADER.countDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countEl) countEl.textContent = String(Math.round(counter.value));
        },
      })
        .to(".preloader__row", {
          yPercent: -120,
          duration: DURATION.base,
          ease: EASE.expo,
          stagger: 0.08,
        })
        .to(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: PRELOADER.exitDuration,
            ease: EASE.expo,
          },
          "-=0.5",
        );
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove(LOADING_CLASS);
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={rootRef} role="presentation">
      <div className="preloader__inner">
        <div className="preloader__line">
          <span className="preloader__row">{HERO.collectionName}</span>
        </div>
        <div className="preloader__line preloader__line--meta">
          <span className="preloader__row">{HERO.tagline}</span>
        </div>
      </div>
      <div className="preloader__count">
        <span ref={countRef}>0</span>
        <span className="preloader__count-mark">%</span>
      </div>
    </div>
  );
}
