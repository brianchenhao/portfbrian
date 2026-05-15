// About-section copy. Plain TS so it's easy to grep and easy to swap without
// touching JSX. If you want a richer structure later (paragraph blocks,
// pull-quote, etc.) extend the shape — the consumer just renders what's here.

export type About = {
  // Short hero-line bio, also reused on the hero column.
  tagline: string
  // Longer prose for the About section. Each entry becomes its own paragraph.
  paragraphs: string[]
  // Three or four high-level facts, e.g. "based in {city}", "{N} years writing
  // TypeScript". Keep them concrete but never PII — no street, no phone.
  facts: { label: string; value: string }[]
}

export const about: About = {
  tagline:
    'Full-stack engineer building small, opinionated tools — security middleware, AI proxies, and the occasional 3D web toy.',
  paragraphs: [
    "I'm Brian. I write production code for a living and ship side projects on weekends. Most of what I build sits between a browser and an LLM, or between a browser and something that wishes it weren't on the open internet.",
    'My favourite work is the kind where the right answer is to delete more code than I add. I like systems that explain themselves in a `README` and fail loudly when they break. I do not like microservices for the sake of it.',
    'Outside of code: long-distance running, mechanical keyboards, and a stubborn habit of writing my own blog engine instead of using one off the shelf.',
  ],
  facts: [
    { label: 'focus', value: 'web security, AI plumbing, fast static sites' },
    { label: 'stack', value: 'TypeScript / Python / a little Rust' },
    { label: 'shipping since', value: '2019' },
  ],
}
