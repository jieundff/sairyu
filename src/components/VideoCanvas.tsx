import { VIDEOS } from "@/data/assets";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/utils/classNames";

type VideoSide = keyof typeof VIDEOS;

interface VideoCanvasProps {
  /** Which framing video to render. Source comes from `assets.ts`. */
  side: VideoSide;
}

/**
 * A single looping, muted background video. The `src` is read from
 * `data/assets.ts` — never hardcoded here. Motion logic lives in useParallax.
 */
export function VideoCanvas({ side }: VideoCanvasProps) {
  const offset = useParallax();

  return (
    <div className={cn("video-canvas", `video-canvas--${side}`)} aria-hidden="true">
      <video
        className="video-canvas__media"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        src={VIDEOS[side]}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}
