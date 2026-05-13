import urllib.request, urllib.error, json, sys

KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzgwOTE3NzgsImV4cCI6OTk5OTk5OTk5OX0.kWJT5DdgZG4Aq0HumSY4ubekO8QHgQhjVLP1g5rRPpQ"
BASE = "https://api.praktor.com.br"

def pg(sql):
    req = urllib.request.Request(f"{BASE}/pg/query",
        data=json.dumps({"query": sql}).encode("utf-8"),
        headers={"Content-Type": "application/json", "apikey": KEY,
                 "Authorization": f"Bearer {KEY}", "User-Agent": "praktor-memory-client/1.0"},
        method="POST")
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, r.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")

def rest(method, path, body=None):
    req = urllib.request.Request(f"{BASE}{path}",
        data=json.dumps(body).encode("utf-8") if body else None,
        headers={"Content-Type": "application/json", "apikey": KEY,
                 "Authorization": f"Bearer {KEY}", "User-Agent": "praktor-memory-client/1.0",
                 "Prefer": "return=representation"},
        method=method)
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, r.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")

# Check seed data
code, body = pg("SELECT COUNT(*) as n FROM statuses;")
sys.stdout.buffer.write(f"statuses count: {body}\n".encode("utf-8"))
code, body = pg("SELECT COUNT(*) as n FROM loss_reasons;")
sys.stdout.buffer.write(f"loss_reasons count: {body}\n".encode("utf-8"))
code, body = pg("SELECT COUNT(*) as n FROM motorcycle_types;")
sys.stdout.buffer.write(f"motorcycle_types count: {body}\n".encode("utf-8"))

# Create storage bucket
code, body = rest("POST", "/storage/v1/bucket", {"id": "avelloz", "name": "avelloz", "public": True})
sys.stdout.buffer.write(f"create bucket: {code} {body[:200]}\n".encode("utf-8"))
