from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

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
    # Stub reply for step 3 — the Gemini wiring lands in step 4. Echoing back
    # lets the frontend wire up against a real response shape before the model
    # call exists.
    return ChatResponse(reply=f"(stub) you said: {body.message}")
