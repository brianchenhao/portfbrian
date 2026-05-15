// Skill buckets. Seven groups per the plan — keep the count if you can, the
// Skills grid is sized for it. If you genuinely need more, the grid wraps fine.
// Each item is a short token, not a sentence — recruiters skim this.

export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL', 'Bash'],
  },
  {
    title: 'frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'three.js', 'react-three-fiber'],
  },
  {
    title: 'backend',
    items: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'SQLite'],
  },
  {
    title: 'cloud / infra',
    items: ['Docker', 'Cloudflare Tunnel', 'DigitalOcean', 'Hostinger', 'GitHub Actions'],
  },
  {
    title: 'ai / llm',
    items: ['Gemini API', 'OpenAI API', 'Anthropic API', 'prompt design', 'rate-limited proxies'],
  },
  {
    title: 'security',
    items: ['WAF rules', 'rate limiting', 'CORS hardening', 'RFC 9116 disclosure'],
  },
  {
    title: 'tooling',
    items: ['Git', 'pnpm', 'ESLint', 'Playwright', 'gltf-transform'],
  },
]
