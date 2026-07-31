import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { team } from "@/lib/content";
import { academy } from "@/lib/content";

/**
 * Team + the Academy subdivision.
 *
 * Members render as monogram cards — no photography dependency, and the
 * grid stays consistent whether or not headshots exist yet.
 */
export function Team() {
  return (
    <Section id="team" spacing="loose">
      <SectionHeading
        eyebrow="The people"
        title="A small team, deep in the work."
        lead="Practitioners who have implemented these disciplines inside real institutions — not a bench of generalists."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <li
            key={`${member.role}-${index}`}
            className="reveal group"
            data-reveal-delay={index * 90}
          >
            <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-brand-orange/30">
              {/* Hover wash */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-orange/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span
                aria-hidden
                className="bg-brand relative grid size-14 place-items-center rounded-2xl font-display text-base font-semibold text-white transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:scale-110"
              >
                {member.initials}
              </span>

              <h3 className="relative mt-6 font-display text-lg font-semibold">
                {member.name}
              </h3>
              <p className="relative mt-1 text-sm text-brand-orange">{member.role}</p>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
                {member.bio}
              </p>

              <ul className="relative mt-5 flex flex-wrap gap-1.5 border-t border-border-subtle pt-4">
                {member.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border-subtle px-2.5 py-0.5 text-[0.68rem] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>

      {/* Academy subdivision */}
      <div className="reveal glass border-gradient mt-16 overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
              {academy.eyebrow}
            </span>
            <h3 className="mt-4 font-display text-[length:var(--text-display-sm)] font-semibold leading-tight">
              <span className="text-gradient">{academy.title}</span>
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {academy.lead}
            </p>
            <p className="mt-6 font-display text-lg font-medium tracking-tight">
              {academy.closing}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {academy.modes.map((mode) => (
              <article
                key={mode.name}
                className="group rounded-2xl border border-border-subtle p-6 transition-colors duration-500 hover:border-brand-orange/40"
              >
                <span className="grid size-11 place-items-center rounded-xl border border-border-subtle text-brand-orange transition-transform duration-500 group-hover:scale-110">
                  <Icon name={mode.icon} size={19} />
                </span>
                <h4 className="mt-4 font-display text-base font-semibold">
                  {mode.name}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {mode.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
