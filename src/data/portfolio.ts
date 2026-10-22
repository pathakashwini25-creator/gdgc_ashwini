export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  year: string;
  stack: string[];
  href: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type Social = {
  label: string;
  href: string;
};

export const profile = {
  name: "Alex",
  role: "Frontend Engineer",
  location: "Lisbon, Portugal",
  email: "alex@alex.dev",
  availability: "Available for select projects — 2026",
  summary:
    "Frontend engineer crafting fast, calm interfaces for ambitious product teams. I care about typography, motion that means something, and shipping less JavaScript than the last person asked for.",
  bio: "Eight years spent between design and engineering, which means I can sit on both sides of the table and translate. My work lives in design systems, real-time interfaces and the unglamorous performance work that keeps both fast.",
  copyrightYear: 2026,
} as const;

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { label: "Years shipping", value: "08" },
  { label: "Projects delivered", value: "42" },
  { label: "Perf budget", value: "100ms" },
];

export const capabilities: string[] = [
  "Design systems",
  "React & Next.js",
  "WebGL & motion",
  "Accessibility",
  "Performance",
  "TypeScript",
];

export const projects: Project[] = [
  {
    id: "atlas-design-system",
    index: "01",
    title: "Atlas Design System",
    category: "Design systems",
    summary:
      "A 240-component library powering six products, shipped with design tokens, living documentation and complete keyboard support.",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind"],
    href: "#work",
  },
  {
    id: "meridian-analytics",
    index: "02",
    title: "Meridian Analytics",
    category: "Data visualisation",
    summary:
      "A real-time dashboard rendering two million points at 60fps through a streaming canvas renderer built on WebGL.",
    year: "2025",
    stack: ["Next.js", "WebGL", "D3"],
    href: "#work",
  },
  {
    id: "sable-commerce",
    index: "03",
    title: "Sable Commerce",
    category: "Headless commerce",
    summary:
      "Headless storefront with a 1.2s LCP, edge-rendered catalogue and a checkout that never blocks the main thread.",
    year: "2025",
    stack: ["Next.js", "Edge", "Stripe"],
    href: "#work",
  },
];

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
];
