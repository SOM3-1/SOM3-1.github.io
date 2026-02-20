"use client";

import dynamic from "next/dynamic";

const GlobalStarfieldDynamic = dynamic(
  () => import("@/components/global-starfield").then((mod) => mod.GlobalStarfield),
  { ssr: false },
);

export function GlobalStarfieldShell() {
  return <GlobalStarfieldDynamic />;
}
