"use client";

import { useMemo, type CSSProperties } from "react";

type Bird = {
  id: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  startX: number;
  endX: number;
  driftY: number;
  angleStart: number;
  angleEnd: number;
  mirror: boolean;
};

type BirdStyle = CSSProperties & {
  "--bird-start-x": string;
  "--bird-end-x": string;
  "--bird-drift-y": string;
  "--bird-angle-start": string;
  "--bird-angle-end": string;
  "--bird-scale-x": string;
};

export function LightSkyBackground() {
  const birds = useMemo<Bird[]>(
    () =>
      Array.from({ length: 7 }).map((_, id) => {
        const rightToLeft = Math.random() > 0.5;
        return {
          id,
          top: Math.random() > 0.42 ? 12 + Math.random() * 34 : 52 + Math.random() * 26,
          size: 16 + Math.random() * 16,
          delay: -(Math.random() * 16),
          duration: 12 + Math.random() * 12,
          startX: rightToLeft ? 112 : -12,
          endX: rightToLeft ? -18 : 112,
          driftY: -26 + Math.random() * 52,
          angleStart: -20 + Math.random() * 8,
          angleEnd: -10 + Math.random() * 10,
          mirror: rightToLeft,
        };
      }),
    [],
  );

  return (
    <div className="light-sky" aria-hidden>
      <div className="light-sun" />
      <div className="light-haze haze-a" />
      <div className="light-haze haze-b" />
      <div className="light-cloud-wisp cloud-wisp-a" />
      <div className="light-cloud-wisp cloud-wisp-b" />

      {birds.map((bird) => {
          const style: BirdStyle = {
            top: `${bird.top}%`,
            width: `${bird.size}px`,
            height: `${bird.size * 0.52}px`,
            animationDelay: `${bird.delay}s`,
            animationDuration: `${bird.duration}s`,
            "--bird-start-x": `${bird.startX}vw`,
            "--bird-end-x": `${bird.endX}vw`,
            "--bird-drift-y": `${bird.driftY}px`,
            "--bird-angle-start": `${bird.angleStart}deg`,
            "--bird-angle-end": `${bird.angleEnd}deg`,
            "--bird-scale-x": bird.mirror ? "-1" : "1",
          };

          return (
        <span
          key={bird.id}
          className="light-bird"
          style={style}
        >
          <span className="bird-body" />
          <span className="bird-head" />
          <span className="bird-tail" />
          <span className="bird-wing wing-left" />
          <span className="bird-wing wing-right" />
        </span>
          );
        })}
    </div>
  );
}
