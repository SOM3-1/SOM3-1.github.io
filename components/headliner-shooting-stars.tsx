"use client";

import { useEffect, useState } from "react";

type Trail = {
  id: number;
  left: number;
  top: number;
  length: number;
  duration: number;
  angle: number;
};

function randomTrail(id: number): Trail {
  return {
    id,
    left: 6 + Math.random() * 60,
    top: 8 + Math.random() * 36,
    length: 52 + Math.random() * 44,
    duration: 650 + Math.random() * 520,
    angle: -10 - Math.random() * 22,
  };
}

export function HeadlinerShootingStars() {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    let active = true;
    let id = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const wait = 3500 + Math.random() * 9000;
      timeout = setTimeout(() => {
        if (!active) return;

        const trail = randomTrail(id++);
        setTrails((prev) => [...prev, trail]);

        setTimeout(() => {
          setTrails((prev) => prev.filter((item) => item.id !== trail.id));
        }, trail.duration + 120);

        schedule();
      }, wait);
    };

    schedule();

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {trails.map((trail) => (
        <span
          key={trail.id}
          className="rr-shooting-star"
          style={{
            left: `${trail.left}%`,
            top: `${trail.top}%`,
            width: `${trail.length}px`,
            animationDuration: `${trail.duration}ms`,
            transform: `rotate(${trail.angle}deg)`,
          }}
        />
      ))}
    </>
  );
}
