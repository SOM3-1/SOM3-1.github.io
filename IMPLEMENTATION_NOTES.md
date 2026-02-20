# Portfolio Implementation Notes

## 1. Overview
This repository contains a Next.js App Router portfolio built with TypeScript and Tailwind CSS. It is structured as a data-driven site where most profile content is centralized in `content/site.json` and transformed by `lib/site.ts` into typed objects used by the UI.

The site delivers:
- Story-driven personal portfolio sections on `/`
- Dedicated pages for experience, projects, resume, and case studies
- Dark-mode-first visual language with a WebGL starfield
- Light-mode sky scene with sun/cloud/bird motion
- Scroll and hover interactions using Framer Motion and custom effects
- Static export for GitHub Pages deployment

## 2. Tech Stack and Packages

### Core dependencies
- `next` and `react`/`react-dom`: app framework and rendering
- `typescript`: type-safe codebase
- `tailwindcss`, `postcss`, `autoprefixer`: styling and build pipeline
- `framer-motion`: reveal, hover, and timeline card motion
- `three`: custom WebGL scenes
- `@react-three/fiber`, `@react-three/drei`: installed for 3D ecosystem support (current implementation uses direct `three` in custom components)
- `clsx`: utility class composition

### Tooling
- `eslint`, `eslint-config-next`: linting
- Static export enabled via `next.config.ts` (`output: "export"`)

## 3. Repository Structure
Primary application code:
- `app/`: route entrypoints and global layout
- `components/`: reusable UI, animations, WebGL, interactions
- `sections/`: home page section composition
- `lib/`: typed site data transforms and helpers
- `content/`: JSON content source
- `public/`: logos, photo, resume PDF, static assets

Legacy/unused code:
- `src/` contains older React files and is not used by current Next.js routing.

## 4. Content and Data Model

### Source of truth
- `content/site.json` stores metadata, identity, contact links, education, navigation labels, section copy, experience entries, projects, skills, and recommendations link.

### Typed adapters and enriched data
- `lib/site.ts`:
  - Defines types (`ExperienceItem`, `Project`, `ProjectCategory`, `CareerTimelineItem`)
  - Exposes `siteData` from JSON
  - Adds curated recommendation cards
  - Adds grouped project categories and project link mapping
  - Adds case-study content and static slugs
  - Defines timeline phases and `formatRange()` month formatting utility
  - Exposes navbar route list (`routeNav`)

## 5. Routing and Pages

### Root and global shell
- `app/layout.tsx`
  - Global metadata + OpenGraph/Twitter metadata
  - JSON-LD person schema
  - Injects:
    - `GlobalStarfieldShell`
    - `LightSkyBackground`
    - `ScrollProgress`
    - `Navbar`
  - Uses `suppressHydrationWarning` on `<body>` to avoid noisy extension-related attribute mismatches

### Routes
- `/` from `app/page.tsx`: composed sections in narrative order
- `/experience` from `app/experience/page.tsx`: expanded role details and technologies
- `/projects` from `app/projects/page.tsx`: categorized interactive project cards
- `/resume` from `app/resume/page.tsx`: download CTA + embedded PDF preview
- `/case-studies/[slug]` from `app/case-studies/[slug]/page.tsx`: static SSG pages generated from `caseStudies`

## 6. Home Page Sections and How They Work
Defined in `sections/home-sections.tsx`:

1. `HeroSection`
- Name, positioning, about summary, CTAs
- Core focus cards
- Right-side visual card with profile image and star overlay
- Uses:
  - `HeroWebGLShell` for subtle animated mesh in dark mode on capable devices
  - `TiltShell` for pointer tilt
  - `InteractionBurst` for click burst feedback
  - `HeadlinerShootingStars` for local star streaks in hero card

2. `ExperienceSnapshotSection`
- Company logo cards (Tesla, PlayStation, Version1, Cerner)
- Role, period, summary, focus area, top technologies, tags

3. `WorkDomainsSection`
- Domain cards driven by JSON content

4. `TimelineSection`
- Uses `Timeline3D` for alternating cards around center line
- Sorted most-recent-first (`Tesla` to earlier roles)
- Includes logos, phase labels, location, date range, summary

5. `DetailedExperienceSection`
- Long-form highlights by company

6. `ProjectsSection`
- `FeaturedProjectStrip` compact preview
- Link to full `/projects`

7. `SkillsSection`
- Grouped skill chips

8. `RecommendationsSection`
- Curated recommendation cards with LinkedIn source link

9. `ContactSection`
- Contact links
- UI-ready contact form scaffold

## 7. Visual System and Theming

### Base styling
- `app/globals.css` + Tailwind utilities
- Google fonts (`Manrope`, `Sora`) for body and headings
- Shared card class with dark/light variants and hover lift

### Theme switching
- `components/theme-toggle.tsx`
  - Toggles `dark`/`light` class on `<html>`
  - Persists mode in `localStorage` key `theme-mode`

### Dark mode effects
- Fixed cosmic background gradients
- WebGL starfield (`components/global-starfield.tsx`)
  - Thousands of stars in a `THREE.Points` cloud
  - Twinkle/rotation/parallax drift
  - Shooting stars with randomized direction, timing, duration, and smooth fade while moving

### Stars and meteors implementation (dark mode)
- Implemented in `components/global-starfield.tsx` using raw `three`:
  - `THREE.BufferGeometry` + `THREE.PointsMaterial` for dense star field
  - Animated twinkle by modulating opacity over time
  - Per-star subtle vertical shimmer via sinusoidal offsets
- Meteors are implemented as a pool of narrow `THREE.PlaneGeometry` meshes:
  - Randomized start points, direction (left-to-right and right-to-left), slope, duration
  - Full-pass travel (off-screen entry and exit) instead of short local streaks
  - Fade-out happens while still translating to avoid endpoint freeze
  - Spawn cadence is throttled for a premium feel (not constant meteor shower)

### Light mode effects
- `components/light-sky-background.tsx` + CSS keyframes
  - Sun glow, atmospheric haze, cloud wisps
  - Procedural bird flights with randomized path, timing, direction, and mirrored silhouette orientation
  - Bird shape assembled from body/head/tail + two flapping wings in CSS

### Light mode implementation details
- Light mode is activated by toggling `html.light` in `components/theme-toggle.tsx`.
- `components/light-sky-background.tsx` renders:
  - Sun layer (`.light-sun`)
  - Atmospheric haze (`.light-haze`)
  - Moving cloud wisps (`.light-cloud-wisp`)
  - Procedural birds (7 instances) with randomized:
    - vertical position,
    - speed and delay,
    - start/end direction,
    - drift path and flight angle.
- Bird visuals are CSS-built in `app/globals.css`:
  - silhouette parts: `.bird-body`, `.bird-head`, `.bird-tail`
  - wing motion: `.bird-wing`, `.wing-left`, `.wing-right` with keyframed flapping
  - mirrored flight support through `--bird-scale-x` custom property

## 8. Motion and Interaction Layer

### Scroll and reveal
- `components/reveal.tsx` uses Framer Motion viewport-based entrance animations
- `components/scroll-progress.tsx` renders top progress bar based on scroll position

### Micro-interactions
- `components/tilt-shell.tsx`: 3D tilt transform based on pointer position
- `components/interaction-burst.tsx`: radial burst rays on pointer down

### Projects interaction model
- `components/project-categories.tsx`
  - Cards remain compact by default
  - Hover/focus/click reveals summary, tags, and links
  - Keyboard support (`Enter`/`Space`)
  - Active state can be toggled off by reselecting

## 9. Navigation and Accessibility

### Navbar behavior
- `components/navbar.tsx`
  - Sticky header
  - Desktop and mobile menu
  - IntersectionObserver section tracking on home route for active state
  - Theme toggle accessible in desktop/mobile navigation

### Accessibility considerations implemented
- Keyboard interactions on interactive cards
- Semantic sectioning and headings
- Reduced-motion checks (`useReducedMotion`) in animation-heavy components
- `aria-label` and `aria-hidden` usage across non-semantic visuals

## 10. SEO and Metadata
Implemented in `app/layout.tsx`:
- `metadataBase`, title, description
- OpenGraph and Twitter cards
- JSON-LD person schema with identity and social links

## 11. Assets and Content Editing Guide

### Update content text/data
- Edit: `content/site.json`
- For derived/curated items (grouped projects, timeline phases, case studies), edit: `lib/site.ts`

### Update logos
- Replace SVGs in `public/logos/`

### Update profile photo
- Replace `public/dush.jpg` or update the path used in `sections/home-sections.tsx`

### Update resume
- Replace `public/resume/Dushyanth_Gowda_Resume.pdf`
- Resume links consume `siteData.identity.resume.downloadPath`

## 12. Performance Strategy
- Static export (`next export` through `next build` with `output: "export"`)
- Dynamic imports for WebGL shells (`ssr: false`) to avoid server/client mismatch and reduce SSR overhead
- GPU/perf guards in hero WebGL:
  - disables on light mode, small screens, reduced motion, lower-end hardware
- Tailwind utility-first CSS with limited runtime styling overhead

## 13. GitHub Pages Deployment Setup

### Config
- `next.config.ts`
  - `output: "export"`
  - `images.unoptimized: true`
  - `trailingSlash: true`

### Workflow
- `.github/workflows/deploy-pages.yml`
  - Triggers on pushes to `master` and `main`
  - Builds static output (`out/`)
  - Uploads artifact and deploys via `actions/deploy-pages`

### Required repository settings
- `Settings -> Pages`: Source must be `GitHub Actions`
- `Settings -> Actions`: allow actions and keep workflow permissions compatible with Pages deploy

## 14. Key Additions Implemented
- Interactive, section-based portfolio architecture in Next.js App Router
- Stronger content curation for experiences, project groupings, and recommendations
- Company logo integration across snapshot and timeline
- Enhanced timeline ordering and timeline phase model
- Dark-mode WebGL starfield and controlled meteor behavior
- Light-mode sky environment (sun/cloud/bird animations)
- Interactive project reveal cards and click feedback bursts
- Theme persistence and improved contrast handling
- SEO metadata and structured data
- Static export + GitHub Actions deployment pipeline

## 15. How to Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

Production build:
```bash
npm run build
npm run start
```