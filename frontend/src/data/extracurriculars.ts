// Extracurricular roles — community, open source, volunteering, sport. Same
// shape as Experience but the bullets lean less on KPI-style impact and more
// on what was done.

export type Extracurricular = {
  role: string
  org: string
  start: string // 'YYYY-MM'
  end: string | 'present'
  summary: string
}

export const extracurriculars: Extracurricular[] = [
  {
    role: 'Maintainer',
    org: 'antsilk (open source)',
    start: '2024-01',
    end: 'present',
    summary:
      'Triage issues and review external PRs for the Antsilk WAF middleware. Roughly 4–6 hours a week, plus a release every six weeks.',
  },
  {
    role: 'Volunteer Mentor',
    org: 'Local Code-for-Good Chapter',
    start: '2022-09',
    end: 'present',
    summary:
      'Pair-programming sessions with university students working on civic-tech projects. Two evenings a month.',
  },
  {
    role: 'Long-distance Runner',
    org: 'Independent',
    start: '2019-01',
    end: 'present',
    summary:
      'Marathon-distance training year-round; finished two road marathons and one trail ultramarathon to date. Helpful for thinking through hard bugs without a keyboard nearby.',
  },
]
