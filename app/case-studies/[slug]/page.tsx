import { notFound } from "next/navigation";
import { SectionShell } from "@/components/section-shell";
import { caseStudies } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return notFound();

  return (
    <SectionShell id="case-study" title={study.title} intro={study.summary}>
      <article className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Impact Highlights</h2>
        <ul className="mt-4 grid gap-2 text-sm text-slate-800 dark:text-slate-200">
          {study.points.map((point) => (
            <li key={point} className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-slate-800/35">
              {point}
            </li>
          ))}
        </ul>
      </article>
    </SectionShell>
  );
}
