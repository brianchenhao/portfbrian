import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.chat import router as chat_router

# Load .env on import so `uvicorn app.main:app` picks up env vars during local
# dev. In docker the env_file directive supplies these instead — load_dotenv
# is a harmless no-op when .env is absent.
load_dotenv()

# ALLOWED_ORIGIN is set per-environment: localhost:5173 locally, the apex in
# prod. A comma-separated list is accepted so a single deploy can serve both
# the prod site and a staging origin without code changes.
_allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGIN", "").split(",")
    if origin.strip()
]

app = FastAPI(title="brianchenhao.com chat proxy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(chat_router)
