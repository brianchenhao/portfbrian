import type { ReactNode } from 'react'

type Props = {
  id: string
  // Short, eyebrow-style label that appears above the heading. Kept tiny and
  // mono-spaced so a scanning recruiter can find sections quickly.
  eyebrow?: string
  title: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, children }: Props) {
  return (
    <section
      id={id}
      className="border-t border-border px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-2">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold text-fg md:text-3xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}
