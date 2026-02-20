"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Burst = { id: number; x: number; y: number };

const angles = [0, 60, 120, 180, 240, 300];

export function InteractionBurst({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const spawn = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const burst = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setBursts((prev) => [...prev, burst]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((item) => item.id !== burst.id));
    }, 480);
  };

  return (
    <div className={cn("relative overflow-hidden", className)} onPointerDown={spawn}>
      {children}
      <div className="pointer-events-none absolute inset-0">
        {bursts.map((burst) => (
          <div key={burst.id} style={{ left: burst.x, top: burst.y }} className="absolute">
            {angles.map((angle) => (
              <span key={`${burst.id}-${angle}`} className="burst-ray" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}>
                <span className="burst-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
