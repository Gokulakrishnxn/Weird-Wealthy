"use client";

import Lenis from "lenis";
import { useEffect } from "react";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frameId = 0;

    function onFrame(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(onFrame);
    }

    frameId = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
