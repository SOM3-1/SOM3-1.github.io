import Image from "next/image";
import Link from "next/link";
import { HeroWebGLShell } from "@/components/hero-webgl-shell";
import { HeadlinerShootingStars } from "@/components/headliner-shooting-stars";
import { InteractionBurst } from "@/components/interaction-burst";
import { FeaturedProjectStrip } from "@/components/project-categories";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { Tag } from "@/components/tag";
import { Timeline3D } from "@/components/timeline-3d";
import { TiltShell } from "@/components/tilt-shell";
import { ContactForm } from "@/components/contact-form";
import { aboutText, curatedRecommendations, formatRange, siteData } from "@/lib/site";

const experience = siteData.experience;

export function HeroSection() {
  const { identity, contact } = siteData;
  const heroStats = [
    { label: "Core Focus", value: "Software Engineer | Mobile, Frontend, Full-stack" },
    { label: "Product Type", value: "Consumer Products" },
  ];

  return (
    <section id="home" className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-16 md:grid-cols-[1.4fr_1fr] md:px-6 md:pt-24">
      <HeroWebGLShell />
      <Reveal>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Software Engineer</p>
        <h1 className="mt-4 bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
          {identity.name}
        </h1>
        <div className="mt-5 max-w-2xl rounded-2xl border border-slate-200 bg-white/92 p-4 shadow-[0_14px_34px_rgba(2,132,199,0.12)] backdrop-blur dark:border-white/15 dark:bg-slate-950/45 dark:shadow-none">
          <p className="text-lg font-medium text-slate-950 dark:text-slate-50">
            Career focus: Mobile apps, frontend development, and full-stack product engineering.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-900 dark:text-slate-100">{aboutText}</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={identity.resume.downloadPath} className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-cyan-500/30">
            Resume
          </Link>
          <Link href={contact.github} className="rounded-full border border-slate-400/60 px-5 py-2 text-sm dark:border-white/25" target="_blank">
            GitHub
          </Link>
          <Link href={contact.linkedin} className="rounded-full border border-slate-400/60 px-5 py-2 text-sm dark:border-white/25" target="_blank">
            LinkedIn
          </Link>
          <Link href="#contact" className="rounded-full border border-slate-400/60 px-5 py-2 text-sm dark:border-white/25">
            Contact
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {heroStats.map((stat) => (
            <div key={stat.label} className="card">
              <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400">{stat.label}</p>
              <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">{stat.value}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <TiltShell maxTilt={7}>
          <InteractionBurst>
            <div className="card relative overflow-hidden p-0">
              <div className="star-headliner" />
              <HeadlinerShootingStars />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/35 via-sky-300/15 to-blue-600/35 dark:from-cyan-200/22 dark:via-transparent dark:to-blue-500/28" />
              <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-cyan-300/35 blur-2xl" />
              <div className="absolute -left-6 bottom-4 h-32 w-32 rounded-full bg-sky-300/20 blur-2xl" />
              <div className="relative flex h-full min-h-72 items-center justify-center p-8" style={{ perspective: "900px" }}>
                <div
                  className="h-56 w-56 animate-float rounded-full border-2 border-cyan-100/70 bg-[url('/dush.jpg')] bg-cover bg-center shadow-[0_0_0_8px_rgba(186,230,253,0.18),0_24px_48px_rgba(6,14,32,0.55)] transition-transform duration-300 hover:rotate-[8deg]"
                  aria-label="Profile photo"
                  style={{ transform: "rotateY(-8deg) rotateX(6deg)" }}
                />
              </div>
            </div>
          </InteractionBurst>
        </TiltShell>
      </Reveal>
    </section>
  );
}

export function ExperienceSnapshotSection() {
  return (
    <SectionShell id="experience-snapshot" title="Experience Snapshot" intro="Hands-on product engineering across healthcare, aviation, gaming, and automotive ecosystems.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {experience.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.04}>
            <article className="card h-full">
              <Image
                src={item.companyLogoPath}
                alt={`${item.company} logo`}
                width={120}
                height={40}
                className="rounded-md border border-slate-300 bg-white p-1 dark:border-white/10 dark:bg-slate-950/60"
              />
              <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">{item.company}</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.title}</p>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">{formatRange(item.start, item.end)}</p>
              <p className="mt-2 text-xs text-slate-700 dark:text-slate-300">{item.summary}</p>
              <p className="mt-2 text-xs text-slate-700 dark:text-slate-300">
                Core focus: Mobile frontend, full-stack, consumer-facing applications.
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Tech: {item.tech.slice(0, 4).join(", ")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function WorkDomainsSection() {
  return (
    <SectionShell id="work-domains" title="Work Domains" intro="Core areas where I design and ship production systems.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {siteData.sections.workDomains.domains.map((domain, index) => (
          <Reveal key={domain.label} delay={index * 0.03}>
            <article className="card h-full">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{domain.label}</h3>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{domain.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function TimelineSection() {
  return (
    <SectionShell id="timeline" title="Career Timeline" intro="Most recent role first: Tesla to Cerner, with clear progression across mobile, frontend, and full-stack systems.">
      <Timeline3D />
    </SectionShell>
  );
}

export function DetailedExperienceSection() {
  return (
    <SectionShell id="detailed-experience" title="Detailed Experience" intro="Delivery highlights, architecture work, and product impact by company.">
      <div className="space-y-4">
        {experience.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.03}>
            <article className="card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{item.company}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{formatRange(item.start, item.end)}</p>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{item.summary}</p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-800 dark:text-slate-200">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-slate-800/35">
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProjectsSection() {
  return (
    <SectionShell id="flagship-projects" title="Projects" intro="Simplified project cards. Hover or click any project to reveal summary and links.">
      <FeaturedProjectStrip />
      <div className="mt-6">
        <Link href="/projects" className="text-sm text-cyan-700 hover:underline dark:text-cyan-200">
          View all categorized projects
        </Link>
      </div>
    </SectionShell>
  );
}

export function SkillsSection() {
  return (
    <SectionShell id="skills" title="Skills" intro="Compact skill map grouped by frontend, backend, cloud, and testing capabilities.">
      <div className="grid gap-4 md:grid-cols-2">
        {siteData.skills.groups.map((group, index) => (
          <Reveal key={group.group} delay={index * 0.03}>
            <article className="card h-full">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{group.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <button key={item} className="rounded-full border border-slate-400/40 px-3 py-1 text-xs text-slate-700 hover:border-cyan-300/50 dark:border-white/15 dark:text-slate-200" type="button">
                    {item}
                  </button>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function RecommendationsSection() {
  return (
    <SectionShell id="recommendations" title="Recommendations" intro="Curated testimonials from LinkedIn. Full context available on profile recommendations.">
      <div className="grid gap-4 md:grid-cols-3">
        {curatedRecommendations.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.04}>
            <article className="card h-full">
              <p className="text-sm text-slate-900 dark:text-slate-100">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{item.title} · {item.company}</p>
              <Link href={item.sourceUrl} target="_blank" className="mt-4 inline-block text-sm text-cyan-700 hover:underline dark:text-cyan-200">
                View on LinkedIn
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function ContactSection() {
  const { contact } = siteData;
  return (
    <SectionShell id="contact" title="Contact" intro="Open to product engineering opportunities where performance, scale, and UX quality matter.">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="card">
          <p className="text-sm text-slate-700 dark:text-slate-300">Email</p>
          <Link href={`mailto:${contact.email}`} className="mt-2 block text-lg text-cyan-700 hover:underline dark:text-cyan-200">
            {contact.email}
          </Link>
          <p className="mt-5 text-sm text-slate-700 dark:text-slate-300">GitHub</p>
          <Link href={contact.github} target="_blank" className="mt-1 block text-sm text-slate-800 hover:underline dark:text-slate-100">
            {contact.github}
          </Link>
          <p className="mt-5 text-sm text-slate-700 dark:text-slate-300">LinkedIn</p>
          <Link href={contact.linkedin} target="_blank" className="mt-1 block text-sm text-slate-800 hover:underline dark:text-slate-100">
            {contact.linkedin}
          </Link>
        </article>

        <ContactForm email={contact.email} />
      </div>
    </SectionShell>
  );
}
