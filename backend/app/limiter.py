from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address


def _client_ip(request: Request) -> str:
    """Pick the real visitor IP.

    Production traffic enters through Cloudflare Tunnel, which puts the real
    client IP in `Cf-Connecting-Ip`. Without that header (local curl, direct
    calls) we fall back to `X-Forwarded-For`'s first hop, then the socket
    peer. The key here is the bucket the rate limiter uses, so getting it
    wrong means everyone shares a single counter.
    """
    cf_ip = request.headers.get("cf-connecting-ip")
    if cf_ip:
        return cf_ip.strip()
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return get_remote_address(request)


# In-memory store. Counters reset on container restart — acceptable for a
# personal portfolio where the worst case is a recruiter who gets to ask one
# extra question after a deploy.
limiter = Limiter(key_func=_client_ip)
