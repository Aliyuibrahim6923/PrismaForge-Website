import type { EngagementModel, Industry } from "@/types/content";

/** "Who We Serve" — Industries We Serve, from the Company Catalog 2026. */
export const industries: Industry[] = [
  {
    name: "Educational Institutions",
    description:
      "Learning and student management platforms, distance learning, and capacity building for educators.",
    icon: "graduation",
    highlights: ["LMS", "Student Management", "Distance Learning", "Educator training"],
  },
  {
    name: "Government & Public Sector",
    description:
      "E-governance and transparency tools, land administration, procurement and project tracking.",
    icon: "landmark",
    highlights: ["E-TRACK", "E-Procurement", "GIS project tracking", "E-Meetings"],
  },
  {
    name: "Private Enterprises",
    description:
      "ERP and project management systems, custom software, corporate training, full-service branding.",
    icon: "building",
    highlights: ["ERP", "Custom software", "Corporate training", "Branding"],
  },
  {
    name: "NGOs",
    description:
      "Program management, M&E tools, capacity building, and cost-effective digital solutions.",
    icon: "heart",
    highlights: ["Program management", "M&E tooling", "Capacity building"],
  },
  {
    name: "Real Estate & Land Authorities",
    description:
      "Digital land registries, cadastral management, and property administration systems.",
    icon: "map",
    highlights: ["Land registry", "Cadastral management", "Property administration"],
  },
];

/**
 * "How We Work — four ways to work with us."
 * Presented as engagement models rather than fixed price tags: scope is
 * quoted per organization. Update `price` once a public rate card exists.
 */
export const engagementModels: EngagementModel[] = [
  {
    name: "Project Delivery",
    price: "Fixed scope",
    cadence: "per project",
    description:
      "A defined platform or deliverable, scoped and costed up front with milestone-based payments.",
    features: [
      "Discovery & solution architecture",
      "Agile build with sprint demos",
      "Systems integration & data migration",
      "Handover training and documentation",
      "90-day post-launch support",
    ],
    cta: "Scope a project",
  },
  {
    name: "Capacity Partnership",
    price: "Retainer",
    cadence: "per quarter",
    description:
      "An embedded, long-term partnership across technology, training and strategy — our most requested model.",
    features: [
      "Dedicated delivery pod",
      "Quarterly KPI reviews",
      "Prismaforge Academy seats included",
      "Priority SLA support",
      "Continuous roadmap & feature enhancement",
    ],
    featured: true,
    cta: "Talk partnership",
  },
  {
    name: "Consultancy",
    price: "Advisory",
    cadence: "per engagement",
    description:
      "Institutional assessment, process optimization, change management and governance-framework development.",
    features: [
      "Institutional assessment",
      "Process optimization",
      "Change management",
      "Governance frameworks",
      "Executive briefings",
    ],
    cta: "Request an assessment",
  },
  {
    name: "Training",
    price: "Per cohort",
    cadence: "on-site · virtual · blended",
    description:
      "Executive and management courses through Prismaforge Academy, on campus in Kaduna or online.",
    features: [
      "PMP, Agile & PRINCE2",
      "Procurement & supply chain",
      "GIS & spatial analysis",
      "IT governance & leadership",
      "Custom corporate programs",
    ],
    cta: "Book a cohort",
  },
];
