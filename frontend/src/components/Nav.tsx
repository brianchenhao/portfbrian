import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'extracurriculars', label: 'Extracurriculars' },
  { id: 'references', label: 'References' },
] as const

export function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // rootMargin draws an active-band roughly between 30% and 35% from the
    // top of the viewport. A section is "active" while its top edge sits in
    // that band — so the highlight updates well before you reach the end of
    // a long section, which matches how visitors actually scan.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            return
          }
        }
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 },
    )

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-6 backdrop-blur">
      <a
        href="#hero"
        className="text-sm font-semibold text-fg transition-colors hover:text-accent"
      >
        brian chen
      </a>
      <ul className="flex items-center gap-5">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={
                'text-xs uppercase tracking-wider transition-colors ' +
                (activeId === id
                  ? 'text-accent'
                  : 'text-fg-muted hover:text-fg')
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
