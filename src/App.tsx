import { useCallback, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { Preloader } from "./components/Preloader";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Gallery } from "./components/Gallery";
import { Marquee } from "./components/Marquee";
import { Acquire } from "./components/Acquire";
import { Footer } from "./components/Footer";

export function App() {
  useSmoothScroll();
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  // Recompute ScrollTrigger positions once fonts + layout settle and after the
  // intro releases, so every trigger fires against the final composition.
  useIsoLayoutEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refresh).catch(() => undefined);
    }
    const id = window.setTimeout(refresh, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [ready]);

  return (
    <>
      {!ready && <Preloader onComplete={handleComplete} />}
      <Header />
      <main className="app" id="top">
        <Hero ready={ready} />
        <Manifesto />
        <Gallery />
        <Marquee />
        <Acquire />
      </main>
      <Footer />
    </>
  );
}

export default App;
