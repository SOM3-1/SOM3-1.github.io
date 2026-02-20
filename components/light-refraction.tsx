"use client";

import { useEffect, useRef } from "react";

export function LightRefraction() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.documentElement;
    const enabled = () => root.classList.contains("light");

    const onMove = (event: MouseEvent) => {
      if (!enabled()) return;
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!ref.current || !enabled()) return;

      current.current.x += (target.current.x - current.current.x) * 0.09;
      current.current.y += (target.current.y - current.current.y) * 0.09;

      ref.current.style.transform = `translate3d(${current.current.x - 180}px, ${current.current.y - 180}px, 0)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="light-refraction" aria-hidden />;
}
