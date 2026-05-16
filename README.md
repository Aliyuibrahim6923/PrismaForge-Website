# PrismaForge — Marketing Website

A modern, enterprise-grade marketing website for **PrismaForge**, an enterprise group offering:

- **PrismaForge Academy** — ICT Training, Certificate Programs, Graduate Employability Readiness
- **Academy Digital Solutions** — Online Learning Platform, School Management System
- **PrismaForge IT Solutions** — ERP & Project Management, Recruitment & Appraisal

Built as a fast, accessible, fully responsive single-page site using plain HTML, CSS and JavaScript — no build step required.

## Design system

Follows the requested **60-30-10 rule** for the color palette:

| Role           | Color                          | Usage                                    |
| -------------- | ------------------------------ | ---------------------------------------- |
| 60% White      | `#FFFFFF` / `#F2F8FF`          | Backgrounds, negative space              |
| 30% Light blue | `#E4F0FF` / `#60A5FA`          | Surfaces, icons, secondary accents       |
| 10% Navy/Blue  | `#0A66FF` / `#0B1B33`          | CTAs, headings, primary text             |

- **Typography:** Inter (body) + Space Grotesk (display) from Google Fonts.
- **Glassmorphism dashboard mockup** in the hero, animated with subtle floating effects.
- **Soft, blue-tinted shadows** instead of harsh grays to keep the airy feel.
- Accessible contrast for body text and CTAs.
- Smooth scroll-reveal animations and animated counters.
- Fully responsive — works great on phone, tablet and desktop.
- Prefers-reduced-motion friendly.

## Sections

1. Sticky navigation with mobile menu
2. Hero with glassmorphism dashboard mockup + animated stats
3. Trust strip
4. Services overview (Academy / Digital Solutions / IT Solutions)
5. PrismaForge Academy detail
6. Digital Solutions detail (LMS + School Management)
7. IT Solutions detail (ERP + Recruitment)
8. Why PrismaForge
9. CTA banner
10. Contact (info + working form)
11. Footer with social links

## Getting started

This is a static site — just open the file in a browser:

```bash
open index.html
```

Or serve locally with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## File structure

```
PrismaForge/
├── index.html      Home page (hero, services overview, divisions, contact)
├── academy.html    Dedicated PrismaForge Academy page
├── styles.css      Shared design system and layout
├── script.js       Shared: nav, scroll reveal, counters, form handling
├── academy.js      Academy-specific: course catalog filters
└── README.md
```

## Pages

### `index.html` — Corporate home
The main marketing landing page covering all three divisions at a glance.

### `academy.html` — PrismaForge Academy
A full-depth dedicated page for the Academy division, including:

- Academy-focused hero with a course-catalog glassmorphism mockup
- Hero stats strip (learners, courses, employability, partners)
- **Three program pillars** — ICT Training, Certificate Programs, Graduate Employability Readiness
- **Filterable course catalog** with chip filters (All, Software, Cloud, Data & AI, Cybersecurity, Design, Networking, Business)
- **Learning journey** — 4-step path from Apply → Learn → Certify → Hired
- **Instructors** grid
- **Tuition plans** — Self-paced / Cohort (featured) / Corporate
- **Success stories** testimonials
- **FAQ** with native accordion
- **Application form** with program / format / background fields

## Contact

- **Email:** info@prismaforge.ng
- **Phone:** 0813 281 5411
- **Facebook:** Prismaforge NG
- **Twitter / X:** Prismaforge Ltd
