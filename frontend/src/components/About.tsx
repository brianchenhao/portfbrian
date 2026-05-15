import { Section } from './Section'
import { about } from '../data/about'

export function About() {
  return (
    <Section id="about" eyebrow="01" title="About">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </div>
        <dl className="space-y-4 self-start border-l border-border pl-6">
          {about.facts.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.2em] text-fg-muted">
                {label}
              </dt>
              <dd className="text-sm text-fg">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
