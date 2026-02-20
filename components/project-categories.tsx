"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { groupedProjects, type ProjectCategory } from "@/lib/site";

function ProjectCard({
  project,
  selected,
  onSelect,
}: {
  project: ProjectCategory["projects"][number];
  selected: boolean;
  onSelect: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const active = selected || hovered;

  return (
    <motion.article
      whileHover={reduceMotion ? {} : { y: -5, scale: 1.008 }}
      whileTap={reduceMotion ? {} : { scale: 0.995 }}
      transition={{ type: "tween", duration: 0.18 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-300/60 bg-white/90 p-4 shadow-lg shadow-cyan-950/20 backdrop-blur transition hover:border-cyan-300/70 hover:shadow-cyan-500/25 focus-within:border-cyan-300/70 dark:border-white/15 dark:bg-slate-900/55 md:p-5"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      aria-expanded={selected}
    >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/15 via-transparent to-blue-500/20"
          animate={{ opacity: active ? 1 : 0.25 }}
          transition={{ duration: 0.22 }}
        />
        <p className="text-base font-semibold leading-tight text-slate-900 dark:text-slate-100 md:text-lg">{project.title}</p>
        <p className="mt-1.5 text-[11px] uppercase tracking-wide text-cyan-600 dark:text-cyan-300 md:mt-2">
          {active ? "Details revealed" : "Hover or click to reveal"}
        </p>

        <div className={`grid transition-all duration-300 ${active ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr] mt-1.5"}`}>
          <div className="overflow-hidden">
            <motion.div
              initial={false}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : -6 }}
              transition={{ duration: 0.22 }}
              className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:space-y-3"
            >
              <p>{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-700 dark:text-cyan-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    className="text-cyan-700 underline-offset-4 hover:underline dark:text-cyan-200"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
    </motion.article>
  );
}

export function ProjectCategories() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-10 md:space-y-12">
      {groupedProjects.map((bucket) => (
        <section key={bucket.category} className="border-t border-slate-200/80 pt-6 first:border-t-0 first:pt-0 dark:border-white/10">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:mb-5 md:text-2xl">
            {bucket.category}
          </h3>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {bucket.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                selected={selected === project.id}
                onSelect={() => setSelected((prev) => (prev === project.id ? null : project.id))}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function FeaturedProjectStrip() {
  const featured = groupedProjects[0]?.projects.slice(0, 3) ?? [];
  const [selected, setSelected] = useState<string | null>(featured[0]?.id ?? null);

  return (
    <div className="grid gap-3 md:grid-cols-3 md:gap-4">
      {featured.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          selected={selected === project.id}
          onSelect={() => setSelected((prev) => (prev === project.id ? null : project.id))}
        />
      ))}
    </div>
  );
}
