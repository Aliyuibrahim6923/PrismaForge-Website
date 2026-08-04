import type {
  Advantage,
  ProcessStep,
  Stat,
  TimelineEntry,
} from "@/types/content";

/**
 * Company narrative — sourced verbatim from the Prismaforge Company
 * Catalog 2026 (Who We Are, The Prismaforge Advantage, Our Approach).
 */

export const about = {
  eyebrow: "Who we are",
  title: "A single, accountable partner for digital transformation.",
  lead: "Prismaforge is a technology and consulting firm driving digital transformation across Nigeria's public and private sectors.",
  body: [
    "We combine software engineering, organizational development, and capacity building to deliver end-to-end solutions that help institutions, government agencies, and enterprises operate with greater efficiency, transparency, and strategic clarity.",
    "Our integrated approach brings together modern technology platforms, expert consultancy, professional training, and strategic branding — making us a single, accountable partner for organizations seeking sustainable growth and digital excellence.",
  ],
  mission:
    "To empower organizations through innovative technology, expert knowledge transfer, and strategic solutions that enhance operational efficiency, transparency, and competitive advantage.",
  vision:
    "To become a leading technology and consulting partner recognized for transforming how institutions learn, govern, and grow in the digital age.",
} as const;

export const stats: Stat[] = [
  { value: 2026, label: "Year founded" },
  { value: 10, label: "Team members" },
  { value: 20, suffix: "+", label: "Clients served" },
  { value: 4, label: "Practice areas" },
];

export const advantages: Advantage[] = [
  {
    title: "End-to-End Capability",
    description:
      "From software development to training, branding to consultancy, in one accountable partner.",
    icon: "layers",
  },
  {
    title: "Scalability & Security",
    description:
      "Enterprise-grade security built into every platform, designed to grow with your organization.",
    icon: "shield",
  },
  {
    title: "Sector Expertise",
    description:
      "Deep understanding of education, government, and enterprise environments.",
    icon: "compass",
  },
  {
    title: "Knowledge Transfer",
    description:
      "We build your team's capacity to sustain and optimize every solution we deliver.",
    icon: "graduation",
  },
  {
    title: "Results-Driven",
    description:
      "Every engagement is measured against clear KPIs and tangible outcomes.",
    icon: "target",
  },
  {
    title: "True Partnership",
    description:
      "We treat your goals as our own, favoring long-term relationships over one-off projects.",
    icon: "handshake",
  },
];

/** "Every engagement follows the same disciplined, five-step methodology." */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Assessment",
    description:
      "We start inside your organization — mapping workflows, systems, stakeholders and constraints before a single line of code is written.",
    deliverables: [
      "Institutional assessment",
      "Stakeholder interviews",
      "Systems audit",
    ],
  },
  {
    step: "02",
    title: "Strategy & Design",
    description:
      "Findings become a costed roadmap: the architecture, the governance framework, and the measurable outcomes each phase is accountable to.",
    deliverables: ["Solution architecture", "Costed roadmap", "KPI framework"],
  },
  {
    step: "03",
    title: "Build & Integrate",
    description:
      "Agile delivery in short cycles, with systems integration and API work that connects the tools your teams already depend on.",
    deliverables: ["Sprint releases", "API & data migration", "Security review"],
  },
  {
    step: "04",
    title: "Training & Knowledge Transfer",
    description:
      "Prismaforge Academy trains the people who will run the platform — on campus, online, or blended — so capability stays in-house.",
    deliverables: ["Role-based training", "Admin certification", "Documentation"],
  },
  {
    step: "05",
    title: "Support & Optimization",
    description:
      "Ongoing maintenance, feature enhancement and quarterly performance reviews against the KPIs agreed at the outset.",
    deliverables: ["SLA support", "Feature roadmap", "Quarterly KPI review"],
  },
];

/** Milestones for the animated About timeline. */
export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: "Prismaforge is founded",
    description:
      "Established as a technology and consulting firm serving Nigeria's public and private sectors from Kaduna.",
  },
  {
    year: "2026",
    title: "Four practice areas defined",
    description:
      "Software Development, Mega Solutions, Consultancy & Training, and Business Solutions & Digital Presence.",
  },
  {
    year: "2026",
    title: "Product portfolio launched",
    description:
      "LMS, Student Management System, E-TRACK e-governance modules, virtual meetings and the ERP & project management suite.",
  },
  {
    year: "2026",
    title: "Prismaforge Academy opens",
    description:
      "A dedicated learning arm combining a physical campus in Kaduna with a full online learning centre.",
  },
];

export const whyUs = {
  eyebrow: "The Prismaforge advantage",
  title: "Why partner with us",
  lead: "We eliminate the need for multiple vendors by bringing technology, training, and strategy together under one roof — and we measure every engagement against clear, agreed outcomes.",
  closing: "One accountable partner — not a patchwork of disconnected vendors.",
} as const;

export const academy = {
  eyebrow: "Our subdivision",
  title: "Prismaforge Academy",
  lead: "Prismaforge Academy is our dedicated learning arm, delivering both physical and online training to professionals, institutions, and organizations. Where our core consultancy focuses on organizational transformation, the Academy focuses on people — building the skills and confidence needed to put new systems and strategies into practice.",
  modes: [
    {
      name: "Physical Campus",
      description:
        "In-person classroom training, workshops, and hands-on labs at our Kaduna facility — ideal for cohort-based programs and practical, instructor-led learning.",
      icon: "landmark" as const,
    },
    {
      name: "Online Learning Centre",
      description:
        "Live virtual sessions and self-paced e-learning, extending our full course catalog to learners anywhere.",
      icon: "globe" as const,
    },
  ],
  closing: "Learn on campus, online, or both — your pace, your place.",
} as const;
