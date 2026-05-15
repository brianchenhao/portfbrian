// Certifications, newest first. Keep year-only granularity — month adds noise
// without adding signal.

export type Certification = {
  name: string
  issuer: string
  year: number
  // Optional verification link (Credly, issuer page, etc.). External only —
  // do not link to anything that exposes contact details.
  href?: string
}

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect — Associate',
    issuer: 'Amazon Web Services',
    year: 2024,
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    year: 2023,
  },
  {
    name: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    year: 2022,
  },
]
