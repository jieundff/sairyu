import {
  Fragment,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/utils/constants";
import { prefersReducedMotion } from "@/utils/env";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { cn } from "@/utils/classNames";

interface RevealTextProps {
  text: string;
  /** Element tag to render (h1, h2, p, span…). */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  start?: string;
}

/**
 * Word-by-word mask reveal: each word rises out from behind a clipped line, so
 * the copy assembles itself rather than fading in. Splitting happens per word
 * (not per line) so it stays correct across any wrapping / viewport width.
 */
export function RevealText({
  text,
  as: Tag = "p",
  className,
  style,
  stagger = STAGGER.words,
  delay = 0,
  start = "top 85%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>(".rt-i");
    if (inners.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 120 });
      gsap.to(inners, {
        yPercent: 0,
        duration: DURATION.reveal,
        ease: EASE.expo,
        stagger,
        delay,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [text, stagger, delay, start]);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  const content: ReactNode = words.map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="rt-w" aria-hidden="true">
        <span className="rt-i">{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));

  return (
    <Tag
      ref={setRef}
      className={cn("reveal-text", className)}
      style={style}
      aria-label={text}
    >
      {content}
    </Tag>
  );
}
