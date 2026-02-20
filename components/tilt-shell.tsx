"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TiltShell({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  return (
    <div
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ transform, transition: "transform 140ms ease-out" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - py) * maxTilt * 2;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      }}
      onMouseLeave={() => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)")}
    >
      {children}
    </div>
  );
}
