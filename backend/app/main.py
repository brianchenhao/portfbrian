import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.chat import router as chat_router
from app.limiter import limiter

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

# Order matters here. slowapi reads request.state.view_rate_limit, which is
# populated by SlowAPIMiddleware before the route handler runs.
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

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
