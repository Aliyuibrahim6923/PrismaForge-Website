import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs, projects } from "@/lib/content";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { buildMetadata, jsonLdScript } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every project at build time — these pages are fully static. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return buildMetadata({ title: "Project not found", description: "" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    keywords: project.tags,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  // Next two projects in the list, wrapping around.
  const index = projects.findIndex((item) => item.slug === project.slug);
  const related = [
    projects[(index + 1) % projects.length]!,
    projects[(index + 2) % projects.length]!,
  ];

  return (
    <article className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.summary,
          applicationCategory: "BusinessApplication",
          url: `${siteConfig.url}/work/${project.slug}`,
          publisher: { "@id": `${siteConfig.url}/#organization` },
        })}
      />

      <div className="container-x">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Icon name="chevronDown" size={12} className="-rotate-90" />
          <Link href="/#work" className="transition-colors hover:text-foreground">
            Work
          </Link>
          <Icon name="chevronDown" size={12} className="-rotate-90" />
          <span className="text-foreground">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="rounded-full border border-border-subtle px-3 py-1 text-muted">
                {project.category}
              </span>
              <span className="text-muted">{project.year}</span>
            </div>

            <RevealText
              as="h1"
              immediate
              delay={0.15}
              text={project.title}
              className="mt-5 text-[length:var(--text-display-md)] font-semibold leading-[1.02]"
            />

            <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {project.overview}
            </p>
          </div>

          <dl className="glass grid grid-cols-2 gap-6 rounded-3xl p-7">
            <div className="col-span-2">
              <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                Built for
              </dt>
              <dd className="mt-1.5 text-sm font-medium">{project.client}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                Capabilities
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-subtle px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </header>

        {/* Cover */}
        <ProjectCover
          size="hero"
          gradient={project.gradient}
          icon={project.icon}
          mark={project.mark}
          title={project.title}
          className="img-reveal mt-14 rounded-3xl"
        />

        {/* Challenge / Solution */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {[
            { label: "The challenge", body: project.challenge, icon: "target" as const },
            { label: "Our solution", body: project.solution, icon: "spark" as const },
          ].map((block, blockIndex) => (
            <section
              key={block.label}
              className="reveal"
              data-reveal-delay={blockIndex * 120}
            >
              <span className="grid size-11 place-items-center rounded-2xl border border-border-subtle text-brand-orange">
                <Icon name={block.icon} size={19} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">
                {block.label}
              </h2>
              <p className="mt-3.5 leading-relaxed text-muted">{block.body}</p>
            </section>
          ))}
        </div>

        {/* Features */}
        <section className="mt-24">
          <h2 className="reveal font-display text-[length:var(--text-display-sm)] font-semibold">
            What it does
          </h2>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border-subtle bg-border-subtle sm:grid-cols-2">
            {project.features.map((feature, featureIndex) => (
              <li
                key={feature.name}
                className="reveal group bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised/60"
                data-reveal-delay={featureIndex * 80}
              >
                <span className="font-mono text-xs text-muted">
                  0{featureIndex + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold transition-colors group-hover:text-brand-orange">
                  {feature.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcomes */}
        <section className="glass border-gradient mt-16 rounded-3xl p-8 sm:p-12">
          <h2 className="reveal font-display text-2xl font-semibold">
            What it changes
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.outcomes.map((outcome, outcomeIndex) => (
              <li
                key={outcome}
                className="reveal flex gap-3 text-sm leading-relaxed text-muted"
                data-reveal-delay={outcomeIndex * 70}
              >
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand-orange" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="reveal font-display text-[length:var(--text-display-sm)] font-semibold">
            Want this <span className="text-gradient">running in your organization?</span>
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-muted">
            Every deployment starts with an assessment of how your teams work
            today. Tell us where the friction is.
          </p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/#contact" size="lg" icon="arrowRight">
              Book an assessment
            </Button>
            <Button href="/#work" size="lg" variant="secondary">
              Back to all work
            </Button>
          </div>
        </section>

        {/* Related */}
        <section className="mt-24 border-t border-border-subtle pt-14">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Next projects
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/work/${item.slug}`}
                  data-cursor="view"
                  className="glass group flex items-center gap-5 overflow-hidden rounded-3xl p-4 transition-colors duration-500 hover:border-brand-orange/30"
                >
                  <ProjectCover
                    gradient={item.gradient}
                    icon={item.icon}
                    mark={item.mark}
                    title={item.title}
                    className="w-28 shrink-0 rounded-2xl"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                      {item.category}
                    </span>
                    <span className="mt-1.5 block font-display text-base font-semibold transition-colors group-hover:text-brand-orange">
                      {item.title}
                    </span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    size={17}
                    className="mr-2 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-brand-orange"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
