import { useState } from 'react'

// Roles mirror Gemini's vocabulary so we can pass the history straight through
// to the backend without remapping. Keep this matched to backend/app/chat.py.
export type ChatTurn = {
  role: 'user' | 'model'
  content: string
}

// Vite inlines VITE_API_URL at build time. Fall back to the local dev backend
// so the dev experience works with no env file.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

// Backend enforces this at 6; we trim before sending so a long conversation
// keeps working instead of 422-ing once the seventh turn is in state.
const MAX_HISTORY_TURNS = 6

type ChatResponse = { reply: string }
type ErrorBody = { detail?: string; error?: string }

export function useChat() {
  const [messages, setMessages] = useState<ChatTurn[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const history = messages.slice(-MAX_HISTORY_TURNS)
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })

      if (res.status === 429) {
        throw new Error('rate limit reached — try again in an hour')
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as ErrorBody | null
        const reason = body?.detail ?? body?.error ?? `${res.status}`
        throw new Error(`request failed (${reason})`)
      }

      const data = (await res.json()) as ChatResponse
      setMessages((prev) => [...prev, { role: 'model', content: data.reply }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, error, send }
}
