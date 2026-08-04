import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { news } from "@/lib/content";
import { formatDate } from "@/lib/utils";

/**
 * Latest insights.
 *
 * Rows rather than cards: headlines are the content here, and a list lets
 * the eye scan four of them in the space two cards would occupy.
 */
export function News() {
  return (
    <Section id="news" spacing="loose">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Latest"
          title="Insights from the work."
          className="sm:max-w-xl"
        />
        <p className="reveal text-sm text-muted">
          Written by the people doing the delivery.
        </p>
      </div>

      <ul className="mt-14 border-t border-border-subtle">
        {news.map((post, index) => (
          <li
            key={post.slug}
            className="reveal border-b border-border-subtle"
            data-reveal-delay={index * 80}
          >
            <article className="group relative grid gap-4 py-8 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8">
              {/* Hover wash */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-[-1.25rem] inset-y-0 -z-10 rounded-2xl bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/4"
              />

              <div className="flex items-center gap-3 text-xs text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <div>
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-brand-orange">
                  {post.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-brand-orange sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </div>

              {/* No detail route yet — these become links once the
                  insights collection is wired to the CMS. */}
              <div className="flex items-center gap-2 text-xs text-muted">
                <Icon name="clock" size={13} />
                {post.readingTime}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
