// Experience entries, newest first. Dates use 'YYYY-MM' so they sort cleanly
// and so a future "compute duration" helper has structured input. Use 'present'
// for the current role's end date.

export type Experience = {
  role: string
  org: string
  start: string // 'YYYY-MM'
  end: string | 'present'
  // 2–4 short bullets, each one self-contained. Lead with the impact, not the
  // tooling. "Cut p95 from 800ms to 90ms" before "rewrote in Go".
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Senior Software Engineer',
    org: 'Acme Web Co.',
    start: '2023-06',
    end: 'present',
    bullets: [
      'Lead the platform team that owns ingest, auth, and the public API. Cut p95 ingest latency from 1.4s to 180ms by replacing a synchronous fan-out with a Redis-backed queue.',
      'Rolled out a homegrown WAF in front of the public API after a scraper incident, dropping abuse traffic by ~85% with zero false positives in the first quarter.',
      'Mentor two mid-level engineers; both promoted within a year.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Northwind Labs',
    start: '2021-03',
    end: '2023-05',
    bullets: [
      'Built the customer-facing dashboard from a Figma file to production, including the real-time charting pipeline.',
      'Owned the migration from a single Postgres instance to a primary + read-replica setup; no downtime, no data loss.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Globex',
    start: '2020-06',
    end: '2020-09',
    bullets: [
      'Shipped a small internal tool for finance to reconcile invoices against ledger entries — still in use four years later.',
    ],
  },
]
