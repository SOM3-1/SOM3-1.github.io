"use client";

import { useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500"
        style={{ transform: `scaleX(${scrollYProgress.get()})` }}
        ref={(el) => {
          if (!el) return;
          return scrollYProgress.on("change", (value) => {
            el.style.transform = `scaleX(${value})`;
          });
        }}
      />
    </div>
  );
}
