import type { Project, ProjectCategory } from "@/types/content";

/**
 * Platform portfolio.
 *
 * Each entry describes a product Prismaforge builds and deploys, taken from
 * the Company Catalog 2026. `client` is the audience the platform is built
 * for; replace with named client references (and add measured results to
 * `outcomes`) as engagements complete and approvals come through.
 */
export const projects: Project[] = [
  {
    slug: "learning-management-system",
    title: "Learning Management System",
    category: "Education",
    summary:
      "Course building, assessment integrity and live classrooms in one accredited-ready platform.",
    overview:
      "A complete LMS for institutions that need to run accredited programmes online without stitching together five different tools. Instructors build courses by drag-and-drop, assessments are marked automatically with plagiarism detection, and certificates are issued the moment a learner meets the criteria.",
    year: "2026",
    client: "Universities, polytechnics & training providers",
    gradient: ["#1b2a5c", "#f97316"],
    icon: "graduation",
    mark: "lms",
    tags: ["LMS", "EdTech", "Assessments", "Video"],
    challenge:
      "Institutions run admissions, teaching, assessment and certification across disconnected tools — so progress data is fragmented, assessment integrity is hard to prove, and certification is manual.",
    solution:
      "A single platform covering the full teaching lifecycle: a drag-and-drop course builder, an assessment engine with plagiarism detection, live virtual classrooms via Zoom and Google Meet, and automated certificate generation driven by completion rules.",
    outcomes: [
      "One system of record for course content, grades and certification",
      "Assessment integrity enforced automatically rather than by manual review",
      "Live and self-paced delivery from the same course structure",
      "Progress dashboards for learners, instructors and administrators",
    ],
    features: [
      {
        name: "Drag-and-drop course builder",
        description:
          "Assemble modules, media, quizzes and prerequisites visually — no technical staff required to publish a course.",
      },
      {
        name: "Automated assessments",
        description:
          "Question banks, timed tests, auto-marking and plagiarism detection across submitted work.",
      },
      {
        name: "Live virtual classrooms",
        description:
          "Zoom and Google Meet integration so scheduled sessions, attendance and recordings stay attached to the course.",
      },
      {
        name: "Certificate automation",
        description:
          "Rule-based certificate generation and verification, issued the moment completion criteria are met.",
      },
    ],
    stack: ["Web platform", "Video integration", "Cloud hosting", "Analytics"],
  },
  {
    slug: "student-management-system",
    title: "Student Management System",
    category: "Education",
    summary:
      "Admissions, biometric attendance, fees and parent portals across the full student lifecycle.",
    overview:
      "An administrative backbone for schools and institutions: from the first application form to graduation, with biometric and RFID attendance, payment-gateway-backed fee management, and portals that keep parents and guardians informed.",
    year: "2026",
    client: "Schools, colleges & higher institutions",
    gradient: ["#14224a", "#ea580c"],
    icon: "users",
    mark: "sms",
    tags: ["SMS", "Admissions", "Biometrics", "Payments"],
    challenge:
      "Enrollment, attendance, fee collection and reporting typically live in spreadsheets and paper registers, making reconciliation slow and reporting unreliable.",
    solution:
      "Streamlined digital admissions and enrollment, biometric or RFID attendance capture, financial management wired to payment gateways, parent and guardian portals, and an advanced reporting layer over the whole dataset.",
    outcomes: [
      "Applications, enrollment and records handled in one digital flow",
      "Attendance captured at source via biometric or RFID devices",
      "Fee collection reconciled automatically through payment gateways",
      "Parents and guardians self-serve instead of calling the office",
    ],
    features: [
      {
        name: "Digital admissions",
        description:
          "Online applications, document upload, screening workflows and offer management end to end.",
      },
      {
        name: "Biometric & RFID attendance",
        description:
          "Device-level capture that removes manual registers and produces auditable attendance records.",
      },
      {
        name: "Financial management",
        description:
          "Fee schedules, invoicing, payment-gateway support and automated reconciliation.",
      },
      {
        name: "Parent & guardian portal",
        description:
          "Secure access to attendance, results, fee status and school communications.",
      },
    ],
    stack: ["Web platform", "Biometric devices", "Payment gateways", "Reporting"],
  },
  {
    slug: "e-track-governance-suite",
    title: "E-TRACK E-Governance Suite",
    category: "Government",
    summary:
      "Real-time visibility into public funds, projects, procurement and decisions.",
    overview:
      "E-TRACK gives governing bodies a live view of where public money goes and what it produces. Four modules — Finance, Project, Procurement and Meetings — share one data model, so a budget line can be traced to a contract, to a site, to a decision.",
    year: "2026",
    client: "Government agencies & governing bodies",
    gradient: ["#1b2a5c", "#fba94c"],
    icon: "landmark",
    mark: "etrack",
    tags: ["E-Governance", "GIS", "Procurement", "Transparency"],
    challenge:
      "Public bodies struggle to answer basic questions in real time: what has been spent, which projects are actually progressing on site, and how a given contract was awarded.",
    solution:
      "Four integrated e-governance modules — E-Finance Track, GIS-enabled E-Project Track, E-Procurement Track and E-Meetings — giving governing bodies real-time visibility into public funds, projects, and decisions.",
    outcomes: [
      "Budget, contract and project data connected in a single trail",
      "Project progress verified against mapped, GIS-referenced locations",
      "Procurement steps recorded and auditable by design",
      "Decisions, minutes and resolutions tied to the items they govern",
    ],
    features: [
      {
        name: "E-Finance Track",
        description:
          "Real-time tracking of allocations, releases and expenditure against approved budget lines.",
      },
      {
        name: "E-Project Track (GIS-enabled)",
        description:
          "Every project geo-referenced, with milestone and progress reporting mapped to physical location.",
      },
      {
        name: "E-Procurement Track",
        description:
          "Tendering, evaluation and award workflows captured end to end for auditability.",
      },
      {
        name: "E-Meetings",
        description:
          "Agendas, papers, attendance, minutes and resolutions linked to the decisions they produce.",
      },
    ],
    stack: ["Web platform", "GIS", "Role-based access", "Audit logging"],
  },
  {
    slug: "land-administration-system",
    title: "Land Administration System",
    category: "Government",
    summary:
      "Digital land registry and cadastral management that reduces disputes.",
    overview:
      "A mega-solution for land authorities: digitising the registry, managing cadastral records, and administering property transactions so ownership is provable and transparent rather than contested.",
    year: "2026",
    client: "Land authorities & real estate bodies",
    gradient: ["#0c1836", "#f97316"],
    icon: "map",
    mark: "land",
    tags: ["Land Registry", "Cadastral", "GIS", "Mega Solution"],
    challenge:
      "Paper-based registries and fragmented cadastral records make land ownership difficult to verify, slowing transactions and fuelling disputes.",
    solution:
      "Digital solutions for land registry, cadastral management, and property administration — reducing disputes and ensuring transparent land governance across the authority's full jurisdiction.",
    outcomes: [
      "A single authoritative digital record of parcels and ownership",
      "Cadastral boundaries maintained spatially rather than on paper",
      "Property transactions processed through a traceable workflow",
      "Faster, verifiable searches for citizens and institutions",
    ],
    features: [
      {
        name: "Digital land registry",
        description:
          "Parcel records, titles and ownership history in one queryable, permissioned system.",
      },
      {
        name: "Cadastral management",
        description:
          "Spatial boundary management with survey data maintained against the registry.",
      },
      {
        name: "Property administration",
        description:
          "Transfers, charges and applications processed through auditable digital workflows.",
      },
    ],
    stack: ["GIS", "Spatial database", "Workflow engine", "Document management"],
  },
  {
    slug: "project-management-erp",
    title: "Project Management & ERP System",
    category: "Enterprise",
    summary:
      "Bridging strategic planning and daily operations with live performance dashboards.",
    overview:
      "An ERP and project management suite for enterprises that need their strategy and their day-to-day operations to reference the same numbers — resources, workflows, finance and performance in one system.",
    year: "2026",
    client: "Private enterprises & institutions",
    gradient: ["#3b62d9", "#ea580c"],
    icon: "workflow",
    mark: "erp",
    tags: ["ERP", "Project Management", "Automation", "Dashboards"],
    challenge:
      "Strategic plans and operational reality drift apart when resourcing, finance and delivery are tracked in separate systems.",
    solution:
      "A platform that bridges strategic planning and daily operations through resource allocation, workflow automation, financial reporting, and performance dashboards drawn from live operational data.",
    outcomes: [
      "Resource allocation visible against actual project demand",
      "Manual approval chains replaced with automated workflows",
      "Financial reporting generated from operational data, not re-keyed",
      "Leadership dashboards reflecting current performance",
    ],
    features: [
      {
        name: "Resource allocation",
        description:
          "Plan and track people, budget and assets across concurrent projects.",
      },
      {
        name: "Workflow automation",
        description:
          "Configurable approvals and handoffs that remove manual chasing.",
      },
      {
        name: "Financial reporting",
        description:
          "Cost, commitment and variance reporting drawn from live operational data.",
      },
      {
        name: "Performance dashboards",
        description:
          "Role-specific views for executives, project managers and finance.",
      },
    ],
    stack: ["ERP modules", "Workflow engine", "BI dashboards", "API integrations"],
  },
  {
    slug: "virtual-meeting-application",
    title: "Virtual Meeting Application",
    category: "Enterprise",
    summary:
      "Secure, high-fidelity remote collaboration with recording built in.",
    overview:
      "A remote collaboration platform for organizations that need meeting infrastructure they control — HD video, screen sharing, real-time chat and recording, deployed within the organization's own security posture.",
    year: "2026",
    client: "Institutions & distributed teams",
    gradient: ["#14224a", "#fba94c"],
    icon: "video",
    mark: "meet",
    tags: ["Video", "Collaboration", "Security", "Recording"],
    challenge:
      "Public conferencing tools put sensitive institutional discussions and recordings outside the organization's control.",
    solution:
      "A secure, high-fidelity remote collaboration platform with HD video conferencing, screen sharing, real-time chat, and meeting recording — integrated with the wider Prismaforge platform suite.",
    outcomes: [
      "Meetings and recordings retained under institutional control",
      "One tool for classes, board sessions and internal standups",
      "Sessions linked to the LMS and E-Meetings modules",
    ],
    features: [
      {
        name: "HD video conferencing",
        description:
          "Multi-participant sessions tuned for variable bandwidth conditions.",
      },
      {
        name: "Screen sharing & chat",
        description:
          "Presenter controls and real-time chat that persists with the session record.",
      },
      {
        name: "Meeting recording",
        description:
          "Recordings stored against the meeting, ready for minutes, review or course reuse.",
      },
    ],
    stack: ["WebRTC", "Media server", "Cloud storage", "SSO"],
  },
  {
    slug: "distance-learning-platform",
    title: "Distance Learning Platform",
    category: "Education",
    summary:
      "Digital-education infrastructure that reaches dispersed learners at scale.",
    overview:
      "A mega-solution built on our LMS foundation, engineered for content delivery at national scale — extending quality education to learners far from any campus.",
    year: "2026",
    client: "Education authorities & national programmes",
    gradient: ["#1b2a5c", "#f97316"],
    icon: "globe",
    mark: "distance",
    tags: ["Distance Learning", "Content Delivery", "Scale", "Mega Solution"],
    challenge:
      "Quality instruction concentrates where campuses are, leaving dispersed learners underserved and programmes unable to scale beyond their physical footprint.",
    solution:
      "Scalable digital-education infrastructure combining our LMS capabilities with robust content delivery, extending quality education to dispersed learners regardless of location.",
    outcomes: [
      "Programme reach decoupled from campus capacity",
      "Content delivered reliably across varying connectivity",
      "One curriculum served to on-campus and remote cohorts alike",
    ],
    features: [
      {
        name: "Scalable content delivery",
        description:
          "Media and course delivery engineered for large, geographically dispersed cohorts.",
      },
      {
        name: "Blended cohorts",
        description:
          "The same curriculum delivered live, self-paced, or blended across locations.",
      },
      {
        name: "LMS foundation",
        description:
          "Full course building, assessment and certification inherited from the Prismaforge LMS.",
      },
    ],
    stack: ["LMS core", "CDN delivery", "Cloud infrastructure", "Analytics"],
  },
  {
    slug: "security-intelligence-software",
    title: "Security Intelligence Software",
    category: "Government",
    summary:
      "Threat monitoring and analysis that turns raw data into actionable intelligence.",
    overview:
      "Advanced systems for threat monitoring, data protection and intelligence analysis — built for organizations whose decisions depend on seeing signal in high-volume data.",
    year: "2026",
    client: "Security & intelligence organizations",
    gradient: ["#0c1836", "#ea580c"],
    icon: "shield",
    mark: "security",
    tags: ["Security", "Monitoring", "Analysis", "Mega Solution"],
    challenge:
      "Raw monitoring data accumulates faster than analysts can review it, so genuine signals surface late or not at all.",
    solution:
      "Advanced systems for threat monitoring, data protection, and intelligence analysis — turning raw data into actionable intelligence for the teams responsible for acting on it.",
    outcomes: [
      "High-volume monitoring data reduced to reviewable signals",
      "Protection controls applied consistently across sensitive data",
      "Analysis workflows that preserve chain of evidence",
    ],
    features: [
      {
        name: "Threat monitoring",
        description:
          "Continuous ingestion and correlation of monitoring feeds with alerting thresholds.",
      },
      {
        name: "Data protection",
        description:
          "Classification, encryption and access controls over sensitive datasets.",
      },
      {
        name: "Intelligence analysis",
        description:
          "Analyst tooling that turns correlated data into structured, shareable intelligence products.",
      },
    ],
    stack: ["Data pipeline", "Correlation engine", "Encryption", "Analyst console"],
  },
  {
    slug: "corporate-brand-systems",
    title: "Corporate Brand & Digital Presence",
    category: "Branding",
    summary:
      "Identity systems and digital campaigns that convert attention into growth.",
    overview:
      "A full-service brand programme: corporate identity, visual communication systems, social platform strategy and performance-driven campaigns — so an organization's market presence matches the quality of what it delivers.",
    year: "2026",
    client: "Enterprises, institutions & NGOs",
    gradient: ["#f97316", "#1b2a5c"],
    icon: "palette",
    mark: "brand",
    tags: ["Branding", "Social", "SEO/SEM", "Content"],
    challenge:
      "Strong institutions frequently present inconsistently across channels, diluting credibility and leaving demand generation to chance.",
    solution:
      "Corporate identity development, logo design, brand strategy and visual communication systems, extended into platform strategy, content creation, community management, and SEO/SEM and email campaigns measured on performance.",
    outcomes: [
      "One consistent identity system applied across every channel",
      "Content and community managed to a deliberate calendar",
      "Campaign spend measured against acquisition performance",
    ],
    features: [
      {
        name: "Business branding",
        description:
          "Corporate identity development, logo design, brand strategy and visual communication systems.",
      },
      {
        name: "Social media presence",
        description:
          "Platform strategy, content creation, community management and engagement analytics.",
      },
      {
        name: "Digital marketing",
        description:
          "SEO/SEM campaigns, email marketing, content marketing and performance-driven advertising.",
      },
    ],
    stack: ["Brand system", "Content pipeline", "SEO/SEM", "Analytics"],
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Education",
  "Government",
  "Enterprise",
  "Branding",
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectSlugs = () => projects.map((project) => project.slug);
