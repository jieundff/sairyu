import { MANIFESTO } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { RevealText } from "./RevealText";
import { STAGGER } from "@/utils/constants";

/**
 * Light editorial interlude. The statement builds line by line as it enters,
 * giving the scroll a moment of quiet contrast between the dark hero and the
 * archive. Background flips to paper for rhythm.
 */
export function Manifesto() {
  const noteRef = useReveal<HTMLParagraphElement>({ y: 32, start: "top 88%" });

  return (
    <section className="manifesto" id="manifesto">
      <div className="manifesto__inner">
        <span className="section-overline manifesto__overline">
          <span className="section-overline__dot" aria-hidden="true" />
          {MANIFESTO.overline}
        </span>

        <div className="manifesto__statement">
          {MANIFESTO.lines.map((line, i) => (
            <RevealText
              key={i}
              as="span"
              className="manifesto__line"
              text={line}
              stagger={STAGGER.words}
              delay={i * 0.04}
            />
          ))}
        </div>

        <p className="manifesto__note" ref={noteRef}>
          {MANIFESTO.note}
        </p>
      </div>
    </section>
  );
}
