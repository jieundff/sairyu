import { useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { HERO, NAV_LINKS } from "@/data/content";
import { scrollToId } from "@/hooks/useSmoothScroll";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

/**
 * Minimal fixed header. A hairline progress bar tracks page scroll, and the bar
 * itself hides on scroll-down / reveals on scroll-up so the reading surface
 * stays clean. All driven by one ScrollTrigger — no scroll listeners in React.
 */
export function Header() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const progress = progressRef.current;
    if (!root || !progress) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        progress.style.transform = `scaleX(${self.progress})`;
        root.classList.toggle("site-header--scrolled", self.scroll() > 40);
        if (self.scroll() > 120) {
          root.classList.toggle(
            "site-header--hidden",
            self.direction === 1,
          );
        } else {
          root.classList.remove("site-header--hidden");
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <header className="site-header" ref={rootRef}>
      <div className="site-header__bar">
        <button
          type="button"
          className="site-header__brand"
          onClick={() => scrollToId("top")}
        >
          {HERO.collectionName}
          <span className="site-header__brand-mark" aria-hidden="true">
            ®
          </span>
        </button>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              className="site-header__link"
              onClick={() => scrollToId(link.target)}
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <span className="site-header__progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
