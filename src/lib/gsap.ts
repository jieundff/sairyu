/**
 * Central GSAP entrypoint. Registers plugins exactly once and re-exports the
 * shared instances so every hook/component animates through the same context.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Slightly softer default so nothing ever snaps.
gsap.defaults({ ease: "power3.out" });

export { gsap, ScrollTrigger };
