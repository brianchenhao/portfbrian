import { Section } from './Section'
import { certifications } from '../data/certifications'

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="05" title="Certifications">
      <ul className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c) => (
          <li
            key={`${c.name}-${c.year}`}
            className="flex items-start justify-between gap-4 rounded-lg border border-border bg-surface/40 p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-fg">
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-accent hover:underline"
                  >
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </p>
              <p className="text-xs text-fg-muted">{c.issuer}</p>
            </div>
            <span className="shrink-0 rounded border border-border px-2 py-1 text-[11px] text-fg-muted">
              {c.year}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
