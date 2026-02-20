import {
  ContactSection,
  DetailedExperienceSection,
  ExperienceSnapshotSection,
  HeroSection,
  ProjectsSection,
  RecommendationsSection,
  SkillsSection,
  TimelineSection,
  WorkDomainsSection,
} from "@/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSnapshotSection />
      <WorkDomainsSection />
      <TimelineSection />
      <DetailedExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <RecommendationsSection />
      <ContactSection />
    </>
  );
}
