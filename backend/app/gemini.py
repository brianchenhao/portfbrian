import logging
import os
from functools import lru_cache

import google.generativeai as genai

from app.prompt import BRIAN_BIO

logger = logging.getLogger(__name__)

# Default to Gemini 2.5 Flash but make it overridable from the env so the model
# can be bumped without a code change. Kept out of the public surface area —
# the frontend never sees this string.
_MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


@lru_cache(maxsize=1)
def _client() -> "genai.GenerativeModel":
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not set — copy .env.example to .env and fill it in"
        )
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(_MODEL_NAME, system_instruction=BRIAN_BIO)


def generate_reply(message: str, history: list[dict]) -> str:
    """Run the chat turn against Gemini and return the reply text.

    `history` is the prior turns in our wire format: a list of
    {"role": "user"|"model", "content": str}. We convert to Gemini's
    {"role", "parts": [text]} shape on the way in.
    """
    model = _client()
    gemini_history = [
        {"role": turn["role"], "parts": [turn["content"]]} for turn in history
    ]
    chat = model.start_chat(history=gemini_history)
    response = chat.send_message(message)
    # `response.text` raises if the model returned no candidates (blocked,
    # safety filter, etc.). Surface a clear error rather than a stack trace.
    if not getattr(response, "text", None):
        logger.warning("gemini returned empty response: %r", response)
        raise RuntimeError("model returned no text")
    return response.text
