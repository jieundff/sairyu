import { useReveal } from "@/hooks/useReveal";
import { ACQUIRE } from "@/data/content";
import { RevealText } from "./RevealText";
import { Button } from "./Button";
import { STAGGER } from "@/utils/constants";

/**
 * Closing call-to-action. A large masked headline resolves as it enters, the
 * supporting copy and button rise beneath it. Scarcity is the message, so the
 * layout stays spare and centered.
 */
export function Acquire() {
  const bodyRef = useReveal<HTMLDivElement>({
    childSelector: "[data-fade]",
    y: 26,
    start: "top 85%",
  });

  return (
    <section className="acquire" id="acquire">
      <div className="acquire__inner">
        <span className="section-overline section-overline--center">
          <span className="section-overline__dot" aria-hidden="true" />
          {ACQUIRE.overline}
        </span>

        <RevealText
          as="h2"
          className="acquire__headline"
          text={ACQUIRE.headline}
          stagger={STAGGER.words}
        />

        <div className="acquire__foot" ref={bodyRef}>
          <p className="acquire__body" data-fade>
            {ACQUIRE.body}
          </p>
          <div data-fade>
            <Button variant="primary">{ACQUIRE.buttonLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
