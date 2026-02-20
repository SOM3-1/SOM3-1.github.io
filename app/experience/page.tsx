import { SectionShell } from "@/components/section-shell";
import { Tag } from "@/components/tag";
import { formatRange, siteData } from "@/lib/site";

export default function ExperiencePage() {
  return (
    <SectionShell
      id="experience"
      title="Experience"
      intro="Detailed view of roles, impact, and technical depth across Cerner, Version1, PlayStation, and Tesla."
    >
      <div className="space-y-4">
        {siteData.experience.map((item) => (
          <article key={item.company} className="card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{item.company}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">{formatRange(item.start, item.end)}</p>
            </div>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.title} · {item.location}</p>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{item.summary}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-800 dark:text-slate-200">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-slate-800/35">
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
