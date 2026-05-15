import { Section } from './Section'
import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <Section id="skills" eyebrow="02" title="Technical skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ title, items }) => (
          <div
            key={title}
            className="rounded-lg border border-border bg-surface/40 p-5"
          >
            <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-fg-muted">
              {title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-border bg-bg/60 px-2 py-1 text-xs text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
