/**
 * Content barrel — the CMS seam.
 *
 * Every section imports from here, never from an individual data file.
 * To move to a headless CMS, replace these re-exports with async loaders
 * (e.g. `export const getServices = () => sanity.fetch(...)`) and update
 * the section components to await them — no other file needs to change.
 */

export { about, academy, advantages, processSteps, stats, timeline, whyUs } from "./company";
export { services, getService } from "./services";
export { industries, engagementModels } from "./industries";
export { projects, projectCategories, getProject, getProjectSlugs } from "./projects";
export { team, testimonials } from "./people";
export { faqs, news } from "./faq";
export { spotlight, spotlightItems } from "./spotlight";
