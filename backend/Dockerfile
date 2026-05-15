FROM python:3.12-slim

# Stop python from writing .pyc files inside the container (they'd sit in the
# image layer forever) and force unbuffered stdout so `docker compose logs`
# shows uvicorn output in real time instead of in 4 KiB chunks.
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install deps in a separate layer so `docker build` only redoes the pip step
# when requirements.txt actually changes — application code edits below stay
# fast.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# .dockerignore keeps .env, .venv, __pycache__, .git out of the context — see
# that file for the full list. Without it `COPY . .` bakes credentials into
# the image.
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
