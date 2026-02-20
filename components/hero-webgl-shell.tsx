"use client";

import dynamic from "next/dynamic";

const HeroWebGLDynamic = dynamic(
  () => import("@/components/hero-webgl").then((mod) => mod.HeroWebGL),
  { ssr: false },
);

export function HeroWebGLShell() {
  return <HeroWebGLDynamic />;
}
