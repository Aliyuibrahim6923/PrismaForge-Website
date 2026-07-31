import type { FaqItem, NewsPost } from "@/types/content";

/** Answers drawn from the Company Catalog 2026 service descriptions. */
export const faqs: FaqItem[] = [
  {
    question: "What exactly does Prismaforge do?",
    answer:
      "We are a technology and consulting firm working across four practice areas: software development, large-scale 'mega solutions', consultancy and training, and business solutions with digital presence. Most clients engage us across more than one — that combination is the point.",
    category: "General",
  },
  {
    question: "Why work with one firm instead of specialist vendors?",
    answer:
      "Because the handoffs between vendors are where projects fail. Bringing technology, training and strategy under one roof means one accountable partner, one roadmap, and no gap between the system delivered and the people expected to run it.",
    category: "General",
  },
  {
    question: "Which sectors do you serve?",
    answer:
      "Educational institutions, government and the public sector, private enterprises, NGOs, and real estate and land authorities. Each has a dedicated set of platforms and consultancy offerings.",
    category: "General",
  },
  {
    question: "Can your platforms integrate with systems we already run?",
    answer:
      "Yes. Systems integration and API development are core development capabilities, alongside database design, data migration and business intelligence. We connect to the tools your teams already depend on rather than replacing everything at once.",
    category: "Technology",
  },
  {
    question: "How do you handle security?",
    answer:
      "Enterprise-grade security is built into every platform, with role-based access, audit logging and encryption applied according to the sensitivity of the data. Platforms are designed to scale with your organization rather than be retrofitted later.",
    category: "Technology",
  },
  {
    question: "Do you deploy to the cloud or on-premises?",
    answer:
      "Both. Cloud deployment, migration and infrastructure management are standard capabilities, and platforms handling sensitive institutional data can be deployed within infrastructure you control.",
    category: "Technology",
  },
  {
    question: "How is training delivered?",
    answer:
      "Through Prismaforge Academy — in person at our Kaduna campus, live online, or self-paced through the online learning centre. Custom corporate programs are delivered on-site, virtually, or blended around your team's schedule.",
    category: "Training",
  },
  {
    question: "Which courses do you offer?",
    answer:
      "Project Management (PMP, Agile, PRINCE2), Procurement & Supply Chain Management, GIS & Spatial Analysis, IT Governance & Digital Transformation, Leadership & Strategic Management, and Financial Management for Non-Financial Managers — plus custom programs built around specific skill gaps.",
    category: "Training",
  },
  {
    question: "How does an engagement start?",
    answer:
      "Every engagement follows the same five-step methodology: discovery and assessment, strategy and design, build and integrate, training and knowledge transfer, then support and optimization. It begins with a conversation and an institutional assessment.",
    category: "Engagement",
  },
  {
    question: "How is success measured?",
    answer:
      "Against clear KPIs agreed before work starts, reviewed on a set cadence through the engagement. We favour long-term relationships over one-off projects, so the measures need to hold up over time.",
    category: "Engagement",
  },
];

/* ------------------------------------------------------------------ *
 * ⚠️ PLACEHOLDER CONTENT — see note in `people.ts`.
 * These posts describe topics Prismaforge is positioned to write about.
 * Replace with real articles, or point this module at a CMS/MDX source.
 * ------------------------------------------------------------------ */
export const news: NewsPost[] = [
  {
    slug: "prismaforge-academy-opens-in-kaduna",
    title: "Prismaforge Academy opens its Kaduna campus and online centre",
    excerpt:
      "Our learning arm now runs hands-on labs and cohort programmes on campus, with the full course catalog mirrored online for learners anywhere.",
    date: "2026-06-18",
    readingTime: "3 min read",
    category: "Announcement",
  },
  {
    slug: "what-e-governance-transparency-actually-requires",
    title: "What e-governance transparency actually requires",
    excerpt:
      "Dashboards are the easy part. Real visibility means a budget line you can trace to a contract, to a project site, to the meeting that approved it.",
    date: "2026-05-30",
    readingTime: "6 min read",
    category: "Perspective",
  },
  {
    slug: "gis-enabled-project-tracking-for-public-works",
    title: "GIS-enabled project tracking for public works",
    excerpt:
      "Why geo-referencing every project changes the conversation about progress reporting — and what it takes to implement across an agency.",
    date: "2026-05-12",
    readingTime: "5 min read",
    category: "Technology",
  },
  {
    slug: "knowledge-transfer-is-the-deliverable",
    title: "Knowledge transfer is the deliverable",
    excerpt:
      "A platform your team cannot operate is a liability. How we structure certification and handover so capability stays in-house.",
    date: "2026-04-24",
    readingTime: "4 min read",
    category: "Consultancy",
  },
];
