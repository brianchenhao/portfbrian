from dotenv import load_dotenv
from fastapi import FastAPI

# Load .env on import so `uvicorn app.main:app` picks up env vars during local
# dev. In docker the env_file directive supplies these instead — load_dotenv
# is a harmless no-op when .env is absent.
load_dotenv()

app = FastAPI(title="brianchenhao.com chat proxy")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
