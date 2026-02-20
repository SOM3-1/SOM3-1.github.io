import siteJson from "@/content/site.json";

export type ExperienceItem = {
  company: string;
  companyLogoPath: string;
  title: string;
  location: string;
  start: string;
  end: string;
  tags: string[];
  summary: string;
  highlights: string[];
  tech: string[];
};

export type Project = {
  id: string;
  title: string;
  category: string;
  oneLiner: string;
  tags: string[];
  repoLinks: { label: string; url: string }[];
  details?: string[];
};

export type ProjectCategory = {
  category: string;
  projects: {
    id: string;
    title: string;
    summary: string;
    links: { label: string; url: string }[];
    tags: string[];
  }[];
};

export type CareerTimelineItem = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  logoPath: string;
  summary: string;
};

export const siteData = siteJson;

export const aboutText =
  "I’m Dushyanth Nagesh Gowda, a software engineer with 5+ years of focused on building high-performance mobile and frontend experiences backed by reliable services. I’ve worked across healthcare, gaming, and automotive products at Tesla, Sony PlayStation, Cerner, and Version1. I care about performance, accessibility, system design, and shipping features that move real product metrics.";

export const curatedRecommendations = [
  {
    name: "Luis Miguel Murillo Lopez",
    title: "Solutions Architect",
    company: "Version1",
    quote:
      "Dushyanth consistently delivers high-quality results with minimal guidance. His adaptability and commitment to learning make him a valuable and reliable engineer.",
    sourceUrl: siteJson.contact.recommendationsUrl,
  },
  {
    name: "Karen Wilson",
    title: "Senior Delivery Manager",
    company: "Version1",
    quote:
      "Dushyanth is a highly skilled developer who goes above and beyond. He supports and guides others and is a great team player.",
    sourceUrl: siteJson.contact.recommendationsUrl,
  },
  {
    name: "Suchitra Unnikrishnan",
    title: "Scrum Master / Project Lead",
    company: "Version1",
    quote:
      "His dedication, problem-solving skills, and attention to detail were instrumental to the project’s success. He consistently goes above and beyond to meet deadlines.",
    sourceUrl: siteJson.contact.recommendationsUrl,
  },
];

export const caseStudies = [
  {
    slug: "tesla-service-roadside",
    title: "Scaling Tesla Service and Roadside Flows",
    summary:
      "Improved reliability and user experience in high-volume mobile service journeys with BFF and GraphQL changes.",
    points: [
      "Shipped selector flows and improved error handling for critical service experiences.",
      "Used observability data to reduce recurring production issues.",
      "Improved maintainability through typed contracts and cleaner API boundaries.",
    ],
  },
  {
    slug: "playstation-voice-chat",
    title: "Voice Chat UX for PlayStation at Scale",
    summary:
      "Built active speaker indicators and supported TypeScript migration in social features serving millions.",
    points: [
      "Delivered globally visible UI behavior for voice-chat sessions.",
      "Reduced regressions by migrating core modules from JavaScript to TypeScript.",
      "Validated behavior under real-time state changes and multiplayer constraints.",
    ],
  },
];

export const groupedProjects: ProjectCategory[] = [
  {
    category: "Flagship Products",
    projects: [
      {
        id: "moneymind-suite",
        title: "MoneyMind Suite",
        summary:
          "AI-powered personal finance product split into mobile, API, and inference services for modular scaling.",
        links: [
          { label: "Mobile App", url: "https://github.com/SOM3-1/MoneyMind" },
          { label: "API", url: "https://github.com/SOM3-1/money-mind-api" },
          { label: "AI Service", url: "https://github.com/SOM3-1/ai-finance" },
          { label: "Supporting Backend", url: "https://github.com/SOM3-1/money-mind-backend" },
        ],
        tags: ["React Native", "Node.js", "FastAPI", "XGBoost"],
      },
      {
        id: "confernet-suite",
        title: "ConferNet Platform",
        summary:
          "Conference management platform with role-based web UX and an API layer for event workflows.",
        links: [
          { label: "Frontend UI", url: "https://github.com/SOM3-1/Confernet-UI" },
          { label: "Backend API", url: "https://github.com/SOM3-1/ConferNet-api" },
        ],
        tags: ["React", "Node.js", "Express", "Firebase"],
      },
      {
        id: "studynest",
        title: "StudyNest",
        summary:
          "Mobile app for discovering and organizing study groups with real-time collaboration workflows.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/StudyNest" }],
        tags: ["React Native", "Firebase"],
      },
      {
        id: "local-discover",
        title: "LocalDiscoverPlatform",
        summary:
          "Location-based discovery product concept for local exploration, curated as an additional project.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/LocalDiscoverPlatform" }],
        tags: ["Web", "Product"],
      },
    ],
  },
  {
    category: "Real-time Systems",
    projects: [
      {
        id: "global-cursors",
        title: "Global Cursors",
        summary:
          "Real-time shared cursor experience with low-latency presence updates and live session state.",
        links: [
          { label: "Frontend", url: "https://github.com/SOM3-1/global-cursors" },
          { label: "Backend", url: "https://github.com/SOM3-1/cursors-backend" },
        ],
        tags: ["WebSockets", "Node.js", "Realtime UI"],
      },
    ],
  },
  {
    category: "NPM Packages",
    projects: [
      {
        id: "rn-format-kit",
        title: "react-native-format-kit",
        summary:
          "Published utility package for formatting and normalizing React Native input/display data.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/react-native-format-kit" }],
        tags: ["NPM", "React Native", "TypeScript"],
      },
      {
        id: "hex-color-generator",
        title: "random-hex-color-generator",
        summary:
          "Published utility package to generate random hex colors for prototyping and design tooling.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/random-hex-color-generator" }],
        tags: ["NPM", "TypeScript", "Utilities"],
      },
    ],
  },
  {
    category: "Browser Extensions and Utilities",
    projects: [
      {
        id: "linkedin-promo-remover",
        title: "LinkedIn Promotion Remover",
        summary:
          "Browser extension to filter promotional clutter and improve signal during LinkedIn browsing.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/LinkedIn_Promotion_Remover" }],
        tags: ["Extension", "Automation"],
      },
      {
        id: "delete-all-your-tweets",
        title: "Delete All Your Tweets",
        summary: "Automation utility for bulk cleanup operations on X/Twitter timelines.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/delete-all-your-tweets" }],
        tags: ["Extension", "Automation"],
      },
      {
        id: "tkinter-football-db",
        title: "TkinterFootballDB",
        summary: "Desktop project demonstrating CRUD and UI workflows in a Python Tkinter stack.",
        links: [{ label: "Repository", url: "https://github.com/SOM3-1/TkinterFootballDB" }],
        tags: ["Python", "Desktop"],
      },
    ],
  },
];

export const careerTimeline: CareerTimelineItem[] = [
  {
    id: "cerner-intern",
    company: "Cerner",
    role: "Software Engineering Intern",
    start: "2019-02",
    end: "2019-07",
    location: "Bengaluru, India",
    logoPath: "/logos/cerner.svg",
    summary: "Started in healthcare, working on the Orders server and helping restructure the Maven build into a modular setup.",
  },
  {
    id: "cerner-se1",
    company: "Cerner",
    role: "Software Engineer I",
    start: "2019-08",
    end: "2021-08",
    location: "Bengaluru, India",
    logoPath: "/logos/cerner.svg",
    summary: "Built desktop and web modules across PowerOrders and MPages with performance-focused changes.",
  },
  {
    id: "cerner-se2",
    company: "Cerner",
    role: "Software Engineer II",
    start: "2021-08",
    end: "2022-08",
    location: "Bengaluru, India",
    logoPath: "/logos/cerner.svg",
    summary: "Owned deeper workflow and automation improvements with broader cross-team delivery scope.",
  },
  {
    id: "version1-react-dev",
    company: "Version1",
    role: "React Developer",
    start: "2022-08",
    end: "2024-08",
    location: "Remote / On-site",
    logoPath: "/logos/version1.svg",
    summary: "Delivered cloud assessment tools and shipped a high-speed React Native migration as sole developer.",
  },
  {
    id: "playstation-intern",
    company: "Sony PlayStation",
    role: "Software Engineering Intern",
    start: "2025-05",
    end: "2025-08",
    location: "San Mateo, CA",
    logoPath: "/logos/playstation.svg",
    summary: "Shipped voice-chat UX features and helped TypeScript migration for modules used at massive scale.",
  },
  {
    id: "tesla-intern",
    company: "Tesla",
    role: "Software Engineering Intern",
    start: "2025-08",
    end: "2025-12",
    location: "Palo Alto, CA",
    logoPath: "/logos/tesla.svg",
    summary: "Built Service and Roadside Assistance experiences in the mobile app by integrating existing BFF and GraphQL workflows, improving reliability and user experience.",
  },
];

export const routeNav = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

export function formatRange(start: string, end: string) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [startYear, startMonth] = start.split("-").map(Number);
  const startLabel = `${monthNames[startMonth - 1]} ${startYear}`;

  if (end === "Present") return `${startLabel} - Present`;

  const [endYear, endMonth] = end.split("-").map(Number);
  const endLabel = `${monthNames[endMonth - 1]} ${endYear}`;
  return `${startLabel} - ${endLabel}`;
}
