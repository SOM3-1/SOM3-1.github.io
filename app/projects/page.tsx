import { ProjectCategories } from "@/components/project-categories";
import { SectionShell } from "@/components/section-shell";

export default function ProjectsPage() {
  return (
    <SectionShell
      id="projects"
      title="Projects"
      intro="Grouped by product type with a compact, readable layout. Cards stay simple by default and reveal detail on hover or tap."
    >
      <ProjectCategories />
    </SectionShell>
  );
}
