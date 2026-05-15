// Projects shown on the home page. Order = priority — the first card is the
// one a recruiter sees first, so keep the most impressive piece at the top.

export type Project = {
  name: string
  // One-sentence pitch. Plain language, no buzzwords.
  tagline: string
  // 2–4 sentences that explain what the project does and what was technically
  // interesting about it. Avoid jargon a non-engineer can't parse.
  description: string
  stack: string[]
  // Optional outbound links. Omit a key to hide the link.
  links?: {
    live?: string
    repo?: string
  }
  // Optional tag used for visual grouping ("flagship", "hackathon", "ongoing").
  tag?: 'flagship' | 'hackathon' | 'ongoing'
}

export const projects: Project[] = [
  {
    name: 'Antsilk',
    tagline: 'A self-hosted WAF middleware for small web apps.',
    description:
      'Antsilk sits in front of FastAPI / Express / Cloudflare Workers and applies a tight ruleset — rate limits, bot heuristics, request-shape checks — without forcing you onto a managed WAF. Designed for indie projects that have started attracting scanners but cannot justify enterprise tooling. Dogfoodable: the chat proxy on this site routes through Antsilk.',
    stack: ['Go', 'Cloudflare Workers', 'Redis', 'TypeScript SDK'],
    links: { live: 'https://antsilk.com' },
    tag: 'flagship',
  },
  {
    name: 'Geyam',
    tagline: 'Reading-focused RSS reader with a quiet UI.',
    description:
      'A read-it-later / RSS hybrid that strips ads, normalises typography, and ranks unread items by how long it has been since you opened a source. No social features, no engagement loops — the only metric is whether you actually finished what you queued.',
    stack: ['TypeScript', 'React', 'PostgreSQL', 'Cloudflare Workers'],
    links: { live: 'https://geyam.com' },
    tag: 'flagship',
  },
  {
    name: 'Chenki',
    tagline: 'Spaced-repetition flashcards for shell commands and APIs.',
    description:
      'Daily drills for the things you keep googling: git incantations, `awk` one-liners, AWS CLI flags. Cards generate from your own shell history so what you study mirrors what you actually use.',
    stack: ['Python', 'FastAPI', 'SQLite', 'Alpine.js'],
    links: { live: 'https://chenki.com' },
    tag: 'flagship',
  },
  {
    name: 'brianchenhao.com',
    tagline: 'This site. 3D head-tracking character + Gemini-backed chat.',
    description:
      'Single-page React + Vite portfolio with a rigged GLB whose head bone follows the cursor, plus a chat box backed by a FastAPI proxy reachable only through a Cloudflare Tunnel. No public ports on the backend Droplet. Built deliberately small — under 2 MB of GLB, one container for the API, one for the tunnel.',
    stack: ['React 19', 'Vite', 'react-three-fiber', 'FastAPI', 'Gemini 2.5 Flash'],
    links: { repo: 'https://github.com/brianchenhao/brianchenhao.com' },
    tag: 'ongoing',
  },
  {
    name: 'HackXYZ 2025 — "tabula"',
    tagline: 'Hackathon: live transcription + topic-extraction for lectures.',
    description:
      "Weekend build. Captures audio from a laptop mic, streams it through Whisper, and updates an outline in real time as the speaker introduces new concepts. Won 'best use of a small model' — the whole pipeline runs on a M2 Air.",
    stack: ['Python', 'Whisper', 'React', 'WebSockets'],
    tag: 'hackathon',
  },
  {
    name: 'HackXYZ 2024 — "loomweave"',
    tagline: 'Hackathon: collaborative knitting-pattern editor.',
    description:
      "Real-time pattern editor with CRDT sync, exporting to standard knitting chart formats. Built because a teammate's mum is a knitter and the existing tools all assume a desktop running Windows XP.",
    stack: ['TypeScript', 'Yjs', 'Svelte', 'Canvas API'],
    tag: 'hackathon',
  },
]
