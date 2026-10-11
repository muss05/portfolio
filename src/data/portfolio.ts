/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the site — components only render what is here.
 *
 * Facts come from the resume in /public/resume and public GitHub repos.
 * Anything not yet verifiable is left `undefined` or marked with `placeholder: true`
 * so the UI can show it as "coming soon" instead of inventing it.
 */

export type ProjectStatus = "completed" | "in-progress" | "planned";
export type ProjectCategory = "web" | "ai";

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  categories: ProjectCategory[];
  status: ProjectStatus;
  /** `position` is the CSS object-position used when the card crops the screenshot (default "left top"). */
  image?: { src: string; alt: string; position?: string };
  github?: string;
  live?: string;
  /** Shown when a project has no public repo yet. */
  note?: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
  /** Used or studied, but not yet hands-on in production. Rendered under a "Familiar with" label. */
  familiar?: string[];
}

export interface Experience {
  role: string;
  company: string;
  context: string;
  period: string;
  location?: string;
  responsibilities: string[];
  achievements: { value: string; label: string }[];
  tech: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  /** One-line note shown under the title. */
  summary?: string;
  /** Add a verification URL when available; omitted links are not rendered. */
  credentialUrl?: string;
  credentialId?: string;
  /** Certificate image in /public, opened by a "View" link. */
  certificateImage?: string;
}

export interface LearningItem {
  title: string;
  description: string;
  status: "done" | "learning" | "next";
}

export interface Experiment {
  title: string;
  description: string;
  tech: string[];
  outcome?: string;
}

export interface Article {
  title: string;
  summary: string;
  href?: string;
  placeholder?: boolean;
}

export const site = {
  name: "Muskan Gupta",
  role: "Frontend Developer → AI Engineer",
  title: "Muskan Gupta — Frontend Developer transitioning into AI Engineering",
  description:
    "Frontend developer with 2+ years building enterprise e-commerce storefronts in React, Next.js and TypeScript at Amla Commerce (Znode), now building LLM-powered agents and learning machine learning.",
  /** Set NEXT_PUBLIC_SITE_URL in Vercel so canonical/OG URLs are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "Nagpur, Maharashtra, India",
  email: "muskang5677@gmail.com",
  resume: {
    href: "/resume/Muskan_Gupta_Resume.pdf",
    fileName: "Muskan_Gupta_Resume.pdf",
  },
  socials: {
    github: "https://github.com/muss05",
    linkedin: "https://linkedin.com/in/muskan-gupta-002ab5247/",
  },
} as const;

export const navigation: Link[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Open to Frontend & AI Engineering roles",
  headline: ["I build fast, accessible interfaces", "and now, the AI agents behind them."],
  /** Rotating line under the headline. */
  rolesPrefix: "// working with",
  roles: ["React · Next.js · TypeScript", "Accessible, fast storefronts", "Python · NumPy · Pandas", "LLM agents with a human in the loop"],
  intro:
    "I'm Muskan, a frontend developer with 2+ years shipping enterprise e-commerce storefronts in React, Next.js and TypeScript at Amla Commerce (Znode). I'm moving into AI engineering: Python, machine learning fundamentals, and LLM-powered agents that keep a human in the loop.",
  stats: [
    { value: "2+", label: "years in production frontend" },
    { value: "30+", label: "reusable UI components shipped" },
    { value: "9.2", label: "CGPA · B.E. Gold Medalist" },
  ],
};

/** Short "what I'm doing now" strip under the hero. Keep it current. */
export const now = [
  { label: "Building", text: "AI Job Application Assistant" },
  { label: "Learning", text: "ML fundamentals with Python, NumPy & Pandas" },
  { label: "Recently", text: "Completed the Namaste AI course · shipped WorkPilot" },
];

export const about = {
  photo: {
    src: "/profile/muskan-gupta.jpg",
    alt: "Portrait of Muskan Gupta in a grey blazer and white blouse",
  },
  paragraphs: [
    "I started on the frontend because I like work you can see and feel. At Amla Commerce I build storefronts on Znode, an enterprise e-commerce platform. That means catalog, cart, checkout and account flows that real shoppers use every day, so performance, accessibility and correctness matter more than flashy demos.",
    "Working with AI-assisted development every day made me curious about what is underneath. I'm now learning Python, NumPy, Pandas and machine learning fundamentals, and building agents that turn LLMs into useful, reviewable tools. They draft and suggest; a person approves.",
  ],
  journey: [
    {
      year: "2023",
      title: "B.E. Computer Science",
      text: "Graduated from the Institute of Engineering, Jiwaji University with a 9.2 CGPA and a Gold Medal.",
    },
    {
      year: "Jul 2024",
      title: "Associate Web Developer, Amla Commerce",
      text: "Joined the Znode team building enterprise storefronts with React.js, Next.js and TypeScript.",
    },
    {
      year: "On the job",
      title: "Performance, accessibility & security",
      text: "Core Web Vitals, WCAG 2.1, GA4 tracking and XSS remediation work; recognised with Quarterly Performer Awards.",
    },
    {
      year: "Now",
      title: "Into AI engineering",
      text: "Claude Academy certified, completed NamasteDev's Namaste AI course, learning Python and ML, and building LLM agents with human-in-the-loop design.",
    },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Production UI for enterprise storefronts",
    skills: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3 / SCSS",
      "Tailwind CSS",
      "React Hooks & Context",
      "WCAG 2.1 / ARIA",
      "Core Web Vitals",
    ],
    familiar: ["Zustand"],
  },
  {
    title: "Backend / API",
    description: "Integrating and shaping data",
    skills: [
      "REST API integration",
      "Next.js Route Handlers",
      "GA4 ecommerce tracking",
      "DOMPurify / XSS remediation",
    ],
    familiar: ["Prisma", "PostgreSQL", "TanStack Query", "Zod validation"],
  },
  {
    title: "Tools",
    description: "How I ship and collaborate",
    skills: [
      "Git & GitHub",
      "Jira",
      "Postman",
      "Chrome DevTools",
      "VS Code",
      "npm",
      "Vercel",
    ],
    familiar: ["Jest", "React Testing Library", "Agile / Scrum"],
  },
  {
    title: "AI / ML",
    description: "What I'm learning and building with",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "ML fundamentals",
      "LLM integration",
      "Prompt engineering",
      "AI agents & tool use",
      "Claude",
      "Gemini API",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "shopsphere",
    title: "ShopSphere",
    tagline: "AI-powered full-stack e-commerce platform",
    description:
      "A full-stack store built with the Next.js App Router, React 19 and TypeScript, with recruiter-friendly demo accounts, an admin area and AI-assisted product discovery.",
    highlights: [
      "AI-assisted semantic product search and product recommendations",
      "Prisma data layer with 10 relational models (PostgreSQL in production)",
      "Cart & wishlist state in Zustand with localStorage persistence; server state via TanStack Query",
      "Unit tests with Jest and React Testing Library",
    ],
    tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Prisma", "PostgreSQL", "Jest"],
    categories: ["web", "ai"],
    status: "completed",
    image: { src: "/projects/shopsphere.jpg", alt: "ShopSphere storefront home page with a hero banner and a featured headphones product card" },
    github: "https://github.com/muss05/shopsphere",
    live: "https://shopsphere-nine-phi.vercel.app/",
  },
  {
    slug: "ai-developer-productivity-agent",
    title: "WorkPilot: AI Developer Productivity Agent",
    tagline: "One agent across GitHub, Jira, CI and calendar signals",
    description:
      "A single tool-using agent that reads scattered developer signals to produce a morning work brief, flag forgotten commitments and assess release readiness, with every suggestion backed by evidence and human approval.",
    highlights: [
      "Goal → plan → tool selection → execution loop over modular tools",
      "Morning brief with a \"Why?\" evidence drawer for each suggestion",
      "Release-readiness gate: READY, READY_WITH_REVIEW or BLOCKED",
      "Human-in-the-loop: no action runs without approval",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "LLM agents", "Tool calling"],
    categories: ["ai"],
    status: "completed",
    image: {
      src: "/projects/workpilot.jpg",
      alt: "WorkPilot landing page: \"Understand your work. Catch what you forgot. Know when you're ready to release.\"",
      position: "center top",
    },
    github: "https://github.com/muss05/Workpilot",
    live: "https://work-pilot-65l6.vercel.app/",
  },
  {
    slug: "ai-job-application-assistant",
    title: "AI Job Application Assistant",
    tagline: "Find, rank and prepare applications. You press Submit.",
    description:
      "A Python agent that parses a resume, pulls openings from public job-board APIs, scores fit with an LLM, drafts outreach emails and pre-fills application forms. Nothing is sent or submitted without explicit approval.",
    highlights: [
      "Resume → structured profile (skills, years, roles) with Gemini",
      "Greenhouse, Lever, Ashby and Remotive public APIs; respects site terms and robots.txt",
      "Weighted LLM match score: skills, experience, location, salary",
      "Local dashboard to review drafts and track status from new to offer",
    ],
    tech: ["Python", "Gemini API", "Playwright", "SQLite", "Gmail API"],
    categories: ["ai"],
    status: "in-progress",
    note: "Private for now — repository will be published once personal data handling is cleaned up.",
  },
  {
    slug: "ai-code-review-agent",
    title: "AI Code Review Agent",
    tagline: "Reviews pull requests against a team's own rules",
    description:
      "Planned: an agent that reads a pull request diff, traces affected callers and reports findings with file:line evidence, impact and a merge verdict, written as a draft for a human reviewer to approve.",
    highlights: [
      "Planned scope: diff + repository context in, structured findings out",
      "Planned scope: severity ranking and regression / breaking-change checks",
      "Planned scope: draft-only comments; nothing posted without approval",
    ],
    tech: ["TypeScript", "LLM agents", "GitHub API"],
    categories: ["ai"],
    status: "planned",
    note: "Design stage — repository coming soon.",
  },
];

export const experience: Experience[] = [
  {
    role: "Associate Web Developer (Frontend: React.js / Next.js)",
    company: "Amla Commerce (Znode)",
    context: "Enterprise e-commerce storefronts built with React.js, Next.js and TypeScript",
    period: "Jul 2024 – Present",
    location: "India",
    responsibilities: [
      "Integrated REST APIs for authentication, catalog, cart, checkout, customer account and order workflows.",
      "Built configurable drag-and-drop Page Builder components for dynamic content management.",
      "Implemented Google Analytics 4 ecommerce tracking across product, cart, checkout and purchase journeys.",
      "Optimised Core Web Vitals (LCP, CLS, INP) with lazy loading, code splitting and image optimisation.",
      "Applied WCAG 2.1 practices: semantic HTML, ARIA and full keyboard navigation.",
      "Hardened frontend security through dependency upgrades and XSS remediation with DOMPurify.",
      "Resolved production issues in rendering, pagination, analytics, localisation, validation and responsive layouts.",
    ],
    achievements: [
      { value: "30+", label: "reusable UI components designed" },
      { value: "~20%", label: "less development effort from component reuse" },
      { value: "Multiple", label: "Quarterly Performer Awards" },
    ],
    tech: ["React.js", "Next.js", "TypeScript", "REST APIs", "GA4", "WCAG 2.1", "DOMPurify", "Jira", "Agile"],
  },
];

export const certifications: Certification[] = [
  { title: "Claude Academy Certification", issuer: "Anthropic" },
  {
    title: "Namaste AI",
    issuer: "NamasteDev · Akshay Saini",
    summary: "Certificate of completion for the Namaste AI course, part of my move from frontend into AI engineering.",
    credentialId: "DF95FFB217337C5A0D136AC36E0",
    certificateImage: "/certificates/namaste-ai-namastedev.webp",
  },
  { title: "Web Development Bootcamp", issuer: "Online course" },
  { title: "Python Programming", issuer: "Online course" },
];

export const learning: LearningItem[] = [
  { title: "Python for data", description: "Core Python, NumPy arrays and Pandas dataframes for cleaning and exploring data.", status: "done" },
  { title: "Visualisation", description: "Matplotlib charts to explain datasets and model results.", status: "learning" },
  { title: "Machine learning fundamentals", description: "Regression, classification, evaluation metrics and train/test discipline.", status: "learning" },
  { title: "LLMs & agents", description: "Prompting, tool calling, structured outputs and human-in-the-loop agent design.", status: "learning" },
];

export const experiments: Experiment[] = [
  {
    title: "AI-Powered Page Builder Prototype",
    description: "Generates drag-and-drop page widgets from natural-language prompts using a reusable widget architecture.",
    tech: ["React.js", "Next.js", "Generative AI"],
    outcome: "~30% faster page creation in the prototype",
  },
  {
    title: "AI Jira Time Logger Agent",
    description: "Suggests Jira worklog entries from completed development tasks for the developer to review and log.",
    tech: ["Next.js", "TypeScript", "Generative AI"],
    outcome: "~40% less manual logging effort",
  },
];

export const articles: Article[] = [
  {
    title: "Human-in-the-loop by default: designing agents that draft, not act",
    summary: "Why every agent I build stops before the irreversible step, and how that shapes the UX.",
    placeholder: true,
  },
  {
    title: "From Core Web Vitals to token budgets",
    summary: "What frontend performance work taught me about building responsive LLM features.",
    placeholder: true,
  },
];

export const achievements = [
  { title: "Quarterly Performer Award", detail: "Amla Commerce · received multiple times for consistent delivery" },
  { title: "Gold Medalist", detail: "Bachelor of Engineering, Computer Science" },
  { title: "AI certifications", detail: "Claude Academy (Anthropic) · Namaste AI (NamasteDev)" },
];

export const education = {
  degree: "Bachelor of Engineering, Computer Science",
  school: "Institute of Engineering, Jiwaji University",
  year: "2023",
  grade: "CGPA 9.2 / 10 · Gold Medalist",
};
