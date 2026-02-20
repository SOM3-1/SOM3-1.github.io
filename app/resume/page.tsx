import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { siteData } from "@/lib/site";

export default function ResumePage() {
  return (
    <SectionShell id="resume" title="Resume" intro="Download and preview the latest version of my resume.">
      <div className="card space-y-4">
        <Link href={siteData.identity.resume.downloadPath} className="inline-block rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900">
          Download Resume
        </Link>
        <iframe
          src={siteData.identity.resume.downloadPath}
          title="Resume preview"
          className="h-[70vh] w-full rounded-xl border border-slate-300 dark:border-white/15"
        />
      </div>
    </SectionShell>
  );
}
