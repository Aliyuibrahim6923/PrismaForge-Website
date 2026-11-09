import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { RevealText } from "@/components/ui/RevealText";

interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb, eyebrow, title and lead shared by the free-tool pages. */
export function ToolHeader({
  crumbs,
  eyebrow,
  title,
  lead,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-muted">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label} className="flex items-center gap-2">
            {index > 0 && <Icon name="chevronDown" size={12} className="-rotate-90" />}
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-foreground">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
        <span className="size-1.5 rounded-full bg-brand-orange" />
        {eyebrow}
      </span>

      <RevealText
        as="h1"
        immediate
        delay={0.1}
        text={title}
        className="mt-5 max-w-4xl text-[length:var(--text-display-md)] font-semibold leading-[1.03]"
      />
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
    </header>
  );
}
