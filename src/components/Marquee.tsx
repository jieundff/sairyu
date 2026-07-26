import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MARQUEE_WORDS } from "@/data/content";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

/**
 * Endless horizontal wordmark band. The track loops seamlessly; scroll velocity
 * nudges its speed and skews it a touch, so the type feels physically tied to
 * the page's momentum rather than running on an isolated timer.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const loop = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 24,
      });

      const skewSetter = gsap.quickTo(track, "skewX", {
        duration: 0.5,
        ease: "power3.out",
      });

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const clamped = gsap.utils.clamp(-6, 6, v / 260);
          loop.timeScale(1 + Math.abs(v) / 1400);
          skewSetter(clamped);
        },
      });

      return () => {
        loop.kill();
        st.kill();
      };
    }, track);

    return () => ctx.revert();
  }, []);

  // Two identical sequences so the -50% loop is seamless.
  const sequence = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {sequence.map((word, i) => (
          <span className="marquee__item" key={i}>
            {word}
            <span className="marquee__sep">✳</span>
          </span>
        ))}
      </div>
    </section>
  );
}
