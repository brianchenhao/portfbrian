import { Section } from './Section'
import { projects } from '../data/projects'

const TAG_LABEL: Record<NonNullable<(typeof projects)[number]['tag']>, string> = {
  flagship: 'flagship',
  hackathon: 'hackathon',
  ongoing: 'ongoing',
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="03" title="Projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.name}
            className="flex flex-col gap-4 rounded-lg border border-border bg-surface/40 p-6 transition-colors hover:border-accent/60"
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-fg">{p.name}</h3>
                <p className="mt-1 text-sm text-fg-muted">{p.tagline}</p>
              </div>
              {p.tag && (
                <span className="shrink-0 rounded border border-border px-2 py-1 text-[10px] uppercase tracking-widest text-fg-muted">
                  {TAG_LABEL[p.tag]}
                </span>
              )}
            </header>
            <p className="text-sm leading-relaxed text-fg-muted">
              {p.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-border bg-bg/60 px-2 py-1 text-[11px] text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
            {(p.links?.live || p.links?.repo) && (
              <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm">
                {p.links?.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent hover:underline"
                  >
                    live ↗
                  </a>
                )}
                {p.links?.repo && (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent hover:underline"
                  >
                    repo ↗
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
