import logging
from typing import Literal

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from app.gemini import generate_reply
from app.limiter import limiter

logger = logging.getLogger(__name__)
router = APIRouter()

# Caps live next to the schema so they're visible in OpenAPI and easy to bump
# without hunting through middleware. 500 chars is long enough for a recruiter
# paragraph, short enough to keep model spend predictable. Six prior turns is
# enough for context without letting a single client balloon the prompt.
MAX_MESSAGE_LENGTH = 500
MAX_HISTORY_TURNS = 6


# History turns mirror Gemini's "user" / "model" role vocabulary so we can pass
# them through to the model without remapping later. The frontend speaks the
# same vocabulary on the wire.
class ChatTurn(BaseModel):
    role: Literal["user", "model"]
    content: str = Field(min_length=1, max_length=MAX_MESSAGE_LENGTH)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=MAX_MESSAGE_LENGTH)
    history: list[ChatTurn] = Field(default_factory=list, max_length=MAX_HISTORY_TURNS)


class ChatResponse(BaseModel):
    reply: str


@router.post("/api/chat", response_model=ChatResponse)
@limiter.limit("10/hour")
def chat(request: Request, body: ChatRequest) -> ChatResponse:
    # The unused `request` arg is required by slowapi to read the rate-limit
    # key off the incoming request. Removing it silently disables limiting.
    del request
    history_dicts = [turn.model_dump() for turn in body.history]
    try:
        reply = generate_reply(body.message, history_dicts)
    except Exception:
        # Don't leak provider error messages to the client — they sometimes
        # include the model name, request id, or other internals.
        logger.exception("gemini call failed")
        raise HTTPException(status_code=502, detail="upstream model error")
    return ChatResponse(reply=reply)
