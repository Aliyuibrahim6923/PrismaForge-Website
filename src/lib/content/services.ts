import type { Service } from "@/types/content";

/**
 * The four core competencies from the Company Catalog 2026.
 * `accent` feeds the card's glow colour and the 3D scene's material tint.
 */
export const services: Service[] = [
  {
    slug: "software-development",
    index: "01",
    title: "Software Development",
    tagline: "Modern, secure platforms built for real institutional workflows.",
    description:
      "We design and build scalable, secure, user-centric software solutions tailored to educational institutions, government bodies, and private enterprises.",
    icon: "code",
    accent: "#f97316",
    capabilities: [
      "Web & mobile",
      "Systems integration",
      "Cloud & DevOps",
      "Business intelligence",
    ],
    items: [
      {
        name: "Learning Management System (LMS)",
        description:
          "Drag-and-drop course builders, automated assessments with plagiarism detection, progress-tracking dashboards, live virtual classrooms (Zoom/Google Meet integration), and automated certificate generation.",
      },
      {
        name: "Student Management System (SMS)",
        description:
          "Streamlined admissions and enrollment, digital attendance (biometric/RFID), financial management with payment-gateway support, parent/guardian portals, and advanced reporting.",
      },
      {
        name: "E-TRACK (E-Governance Modules)",
        description:
          "E-Finance Track, E-Project Track (GIS-enabled), E-Procurement Track, and E-Meetings — giving governing bodies real-time visibility into public funds, projects, and decisions.",
      },
      {
        name: "Virtual Meeting Application",
        description:
          "A secure, high-fidelity remote collaboration platform with HD video conferencing, screen sharing, real-time chat, and meeting recording.",
      },
      {
        name: "Project Management & ERP System",
        description:
          "Bridges strategic planning and daily operations through resource allocation, workflow automation, financial reporting, and performance dashboards.",
      },
      {
        name: "Development Capabilities",
        description:
          "Custom web and mobile applications, systems integration and API development, cloud deployment and migration, database design and business intelligence, plus ongoing maintenance and feature enhancement.",
      },
    ],
  },
  {
    slug: "mega-solutions",
    index: "02",
    title: "Mega Solutions",
    tagline: "Infrastructure and public assets — mapped, tracked, and secured.",
    description:
      "Large-scale, sector-defining platforms for organizations with complex, mission-critical needs.",
    icon: "layers",
    accent: "#3b62d9",
    capabilities: ["GIS & cadastral", "Distance learning", "Threat intelligence"],
    items: [
      {
        name: "Land Administration System",
        description:
          "Digital solutions for land registry, cadastral management, and property administration — reducing disputes and ensuring transparent land governance.",
      },
      {
        name: "Distance Learning Platform",
        description:
          "Scalable digital-education infrastructure combining our LMS capabilities with robust content delivery, extending quality education to dispersed learners.",
      },
      {
        name: "Security Intelligence Software",
        description:
          "Advanced systems for threat monitoring, data protection, and intelligence analysis — turning raw data into actionable intelligence.",
      },
    ],
  },
  {
    slug: "consultancy-training",
    index: "03",
    title: "Consultancy & Training",
    tagline: "Five ways to learn, all built around your team's schedule.",
    description:
      "We strengthen organizational capacity through expert-led training and strategic consultancy, delivered by practitioners who have implemented these disciplines in real institutions.",
    icon: "graduation",
    accent: "#fba94c",
    capabilities: ["PMP · Agile · PRINCE2", "GIS", "IT governance", "Leadership"],
    items: [
      {
        name: "Organizational Strengthening",
        description:
          "Institutional assessments, process optimization, change management, and governance-framework development.",
      },
      {
        name: "Executive & Management Courses",
        description:
          "Project Management (PMP, Agile, PRINCE2), Procurement & Supply Chain Management, Geographic Information Systems (GIS) & Spatial Analysis, IT Governance & Digital Transformation, Leadership & Strategic Management, and Financial Management for Non-Financial Managers.",
      },
      {
        name: "Custom Corporate Training",
        description:
          "Tailored programs designed to address specific organizational skill gaps and performance objectives — delivered on-site, virtually, or blended.",
      },
    ],
  },
  {
    slug: "business-digital-presence",
    index: "04",
    title: "Business Solutions & Digital Presence",
    tagline: "Building brands that are seen, heard, and remembered.",
    description:
      "We help organizations build powerful market identities and digital footprints that convert attention into growth.",
    icon: "palette",
    accent: "#ea580c",
    capabilities: ["Brand strategy", "Social media", "SEO/SEM", "Content"],
    items: [
      {
        name: "Business Branding",
        description:
          "Corporate identity development, logo design, brand strategy, and visual communication systems.",
      },
      {
        name: "Social Media Presence",
        description:
          "Platform strategy, content creation, community management, and engagement analytics.",
      },
      {
        name: "Digital Marketing",
        description:
          "SEO/SEM campaigns, email marketing, content marketing, and performance-driven advertising strategies.",
      },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);
