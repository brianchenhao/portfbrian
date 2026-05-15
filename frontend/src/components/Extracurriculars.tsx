import { Section } from './Section'
import { extracurriculars } from '../data/extracurriculars'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]
function fmt(date: string): string {
  if (date === 'present') return 'present'
  const [y, m] = date.split('-')
  return `${MONTHS[Number(m) - 1] ?? m} ${y}`
}

export function Extracurriculars() {
  return (
    <Section id="extracurriculars" eyebrow="06" title="Extracurriculars">
      <ul className="grid gap-5 md:grid-cols-2">
        {extracurriculars.map((x) => (
          <li
            key={`${x.org}-${x.start}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface/40 p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
              {fmt(x.start)} — {fmt(x.end)}
            </p>
            <h3 className="text-base font-semibold text-fg">
              {x.role} <span className="text-fg-muted">·</span>{' '}
              <span className="text-fg-muted">{x.org}</span>
            </h3>
            <p className="text-sm leading-relaxed text-fg-muted">{x.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
