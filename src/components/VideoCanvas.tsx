import { VIDEOS } from "@/data/assets";
import { useParallax } from "@/hooks/useParallax";
import { PARALLAX } from "@/utils/constants";
import { cn } from "@/utils/classNames";

type VideoSide = keyof typeof VIDEOS;

interface VideoCanvasProps {
  /** Which framing video to render. Source comes from `assets.ts`. */
  side: VideoSide;
}

/**
 * A single looping, muted background video. The `src` is read from
 * `data/assets.ts` — never hardcoded here. Video behavior (autoplay, loop,
 * muted, inline) is preserved; scroll parallax is layered on the media element
 * and the reveal is orchestrated by the Hero via the `data-hero-video` hook.
 */
export function VideoCanvas({ side }: VideoCanvasProps) {
  const mediaRef = useParallax<HTMLVideoElement>({ amount: PARALLAX.subtle });

  return (
    <figure
      className={cn("video-figure", `video-figure--${side}`)}
      data-hero-video=""
      aria-hidden="true"
    >
      <video
        ref={mediaRef}
        className="video-figure__media"
        src={VIDEOS[side]}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </figure>
  );
}
