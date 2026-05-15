import logging
from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.gemini import generate_reply

logger = logging.getLogger(__name__)
router = APIRouter()


# History turns mirror Gemini's "user" / "model" role vocabulary so we can pass
# them through to the model without remapping later. The frontend speaks the
# same vocabulary on the wire.
class ChatTurn(BaseModel):
    role: Literal["user", "model"]
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatTurn] = []


class ChatResponse(BaseModel):
    reply: str


@router.post("/api/chat", response_model=ChatResponse)
def chat(body: ChatRequest) -> ChatResponse:
    history_dicts = [turn.model_dump() for turn in body.history]
    try:
        reply = generate_reply(body.message, history_dicts)
    except Exception:
        # Don't leak provider error messages to the client — they sometimes
        # include the model name, request id, or other internals.
        logger.exception("gemini call failed")
        raise HTTPException(status_code=502, detail="upstream model error")
    return ChatResponse(reply=reply)
