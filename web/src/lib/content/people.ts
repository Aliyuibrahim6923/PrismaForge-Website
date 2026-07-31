import type { TeamMember, Testimonial } from "@/types/content";

/* ------------------------------------------------------------------ *
 * ⚠️ PLACEHOLDER CONTENT
 *
 * The Company Catalog 2026 states a team of 10 but does not name
 * individuals, and contains no client quotes. The entries below are
 * structural placeholders describing the roles a firm of this shape
 * carries — they are NOT real people or real client statements.
 *
 * Replace every `name`, `bio` and `quote` with real, approved detail
 * before this site goes live. The shapes are CMS-ready, so swapping in
 * a `fetch()` here requires no changes anywhere else in the codebase.
 * ------------------------------------------------------------------ */

export const team: TeamMember[] = [
  {
    name: "Team Member",
    role: "Managing Partner",
    bio: "Sets firm strategy and owns the client relationships that span technology, training and consultancy.",
    initials: "MP",
    focus: ["Strategy", "Partnerships", "Governance"],
  },
  {
    name: "Team Member",
    role: "Head of Software Engineering",
    bio: "Leads platform architecture across the LMS, Student Management System and the E-TRACK suite.",
    initials: "SE",
    focus: ["Architecture", "Cloud", "Security"],
  },
  {
    name: "Team Member",
    role: "Head of Mega Solutions",
    bio: "Owns delivery of large-scale platforms — land administration, distance learning and security intelligence.",
    initials: "MS",
    focus: ["GIS", "Systems integration", "Delivery"],
  },
  {
    name: "Team Member",
    role: "Director, Prismaforge Academy",
    bio: "Runs the physical campus in Kaduna and the online learning centre, and shapes the course catalog.",
    initials: "PA",
    focus: ["Curriculum", "Instruction", "Certification"],
  },
  {
    name: "Team Member",
    role: "Principal Consultant",
    bio: "Leads institutional assessments, process optimization and governance-framework engagements.",
    initials: "PC",
    focus: ["Assessment", "Change management", "IT governance"],
  },
  {
    name: "Team Member",
    role: "Head of Brand & Digital",
    bio: "Directs corporate identity work, social strategy and performance-driven digital campaigns.",
    initials: "BD",
    focus: ["Brand strategy", "Content", "SEO/SEM"],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "One accountable partner instead of four vendors changed how fast we could actually move. The technology and the training arrived together, so our team owned the system from day one.",
    name: "Client Reference",
    role: "Registrar",
    organisation: "Higher Education Institution",
    initials: "HE",
  },
  {
    quote:
      "For the first time we can trace a budget line to a contract, to a project site, to the meeting where it was approved. That visibility is the whole point.",
    name: "Client Reference",
    role: "Director of Planning",
    organisation: "Government Agency",
    initials: "GA",
  },
  {
    quote:
      "The engagement was measured against KPIs we agreed at the start, and reviewed against them every quarter. That discipline is rare.",
    name: "Client Reference",
    role: "Chief Operating Officer",
    organisation: "Private Enterprise",
    initials: "PE",
  },
  {
    quote:
      "Knowledge transfer wasn't an afterthought — our administrators were certified on the platform before handover, so support tickets stayed internal.",
    name: "Client Reference",
    role: "Head of ICT",
    organisation: "Educational Institution",
    initials: "EI",
  },
];
