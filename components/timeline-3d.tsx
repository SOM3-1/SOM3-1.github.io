"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { careerTimeline, formatRange } from "@/lib/site";
import { InteractionBurst } from "@/components/interaction-burst";
import { TiltShell } from "@/components/tilt-shell";

export function Timeline3D() {
  const reduceMotion = useReducedMotion();
  const ordered = careerTimeline
    .slice()
    .sort((a, b) => new Date(`${b.start}-01`).getTime() - new Date(`${a.start}-01`).getTime());

  return (
    <div className="relative">
      <div className="absolute left-5 top-0 h-full w-1 rounded-full bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 md:left-1/2 md:-translate-x-1/2" />
      <ol className="space-y-6">
        {ordered.map((item, index) => {
          const right = index % 2 === 1;
          return (
            <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-8">
              <span className="absolute left-[14px] top-8 z-10 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-400 dark:border-slate-900 md:left-1/2 md:-translate-x-1/2" />

              <div className={right ? "md:col-start-2" : "md:col-start-1"}>
                <TiltShell maxTilt={6}>
                  <InteractionBurst>
                    <motion.article
                      initial={reduceMotion ? false : { opacity: 0, y: 30, rotateX: 6 }}
                      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      whileHover={reduceMotion ? {} : { scale: 1.02, y: -4 }}
                      className="ml-10 rounded-2xl border border-slate-300 bg-white/90 p-5 shadow-lg shadow-cyan-950/15 dark:border-white/15 dark:bg-slate-900/60 md:ml-0"
                    >
                    <Image
                      src={item.logoPath}
                      alt={`${item.company} logo`}
                      width={120}
                      height={40}
                      className="rounded-md border border-slate-300 bg-white p-1 dark:border-white/10 dark:bg-slate-950/60"
                    />
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.company}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-cyan-600 dark:text-cyan-300">
                      Phase {ordered.length - index}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{item.role}</p>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      {formatRange(item.start, item.end)} · {item.location}
                    </p>
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{item.summary}</p>
                    </motion.article>
                  </InteractionBurst>
                </TiltShell>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
