import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useChat } from '../../hooks/useChat'

// Must match backend/app/chat.py MAX_MESSAGE_LENGTH. The browser-side cap is a
// UX nicety (the textarea won't accept more), the backend enforces it
// authoritatively.
const MAX_MESSAGE_LENGTH = 500

export function ChatBox() {
  const { messages, loading, error, send } = useChat()
  const [input, setInput] = useState('')
  const transcriptRef = useRef<HTMLDivElement | null>(null)

  // Pin the transcript to the latest turn so the user never has to scroll
  // after sending a question.
  useEffect(() => {
    const el = transcriptRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    send(input)
    setInput('')
  }

  return (
    <section
      aria-label="Ask the portfolio bot"
      className="rounded-lg border border-border bg-surface p-4"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
        ask the bot
      </p>
      <p className="mt-1 text-xs text-fg-muted">
        Questions about Brian's work, stack, or experience. The bot has no
        personal contact details — DM via LinkedIn for that.
      </p>

      <div
        ref={transcriptRef}
        role="log"
        aria-live="polite"
        className="mt-3 max-h-64 space-y-3 overflow-y-auto pr-1 text-sm"
      >
        {messages.length === 0 && !loading && (
          <p className="text-fg-muted">
            try: "what does brian work on?"
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-fg-muted">
              {m.role === 'user' ? 'you' : 'brian (bot)'}
            </div>
            <div className="whitespace-pre-wrap text-fg">{m.content}</div>
          </div>
        ))}
        {loading && <div className="text-fg-muted">…thinking</div>}
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="ask about a project, role, anything"
          aria-label="ask the bot a question"
          className="flex-1 rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-accent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          send
        </button>
      </form>
    </section>
  )
}
