import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function SectionShell({
  id,
  title,
  intro,
  className,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20", className)}>
      <div className="mb-8">
        <h2 className="section-title text-slate-900 dark:text-slate-100">{title}</h2>
        {intro ? (
          <p className="section-copy mt-3 max-w-3xl text-slate-700 dark:text-slate-200">
            {intro}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
