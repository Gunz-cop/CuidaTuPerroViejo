#!/usr/bin/env python3
"""Capture allowlisted local Workerd GET/HEAD evidence for the F2 projection."""
import hashlib
import json
import pathlib
import urllib.error
import urllib.request
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent
BUILD = pathlib.Path(__file__).resolve().parents[5] / "dist/client/agent-content/v1"
OUT = ROOT / "workerd-final-raw"
BASE = "http://127.0.0.1:8798"
OUT.mkdir(parents=True, exist_ok=True)
index_bytes = (BUILD / "index.json").read_bytes()
index = json.loads(index_bytes)
resources = [("index", "/agent-content/v1/index.json", "application/json; charset=utf-8", index_bytes)]
for item in index["documents"]:
    rel = item["markdownPath"].lstrip("/")
    body = (pathlib.Path(__file__).resolve().parents[5] / "dist/client" / rel).read_bytes()
    resources.append((item["documentId"], item["markdownPath"], "text/markdown; charset=utf-8", body))
records = []
for resource_id, path, mime, expected in resources:
    for method in ("GET", "HEAD"):
        slug = f"{len(records):02d}-{method.lower()}"
        req = urllib.request.Request(BASE + path, method=method, headers={"User-Agent": "ctpv-independent-f2a-implementer/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=20) as response:
                status, headers, body = response.status, response.headers, response.read()
        except urllib.error.HTTPError as error:
            status, headers, body = error.code, error.headers, error.read()
        header_map = {k.lower(): v for k, v in headers.items()}
        required = {
            "status": status == 200,
            "mime": header_map.get("content-type") == mime,
            "link": '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"' in header_map.get("link", ""),
            "security": header_map.get("x-content-type-options") == "nosniff" and header_map.get("referrer-policy") == "strict-origin-when-cross-origin" and "geolocation=()" in header_map.get("permissions-policy", "") and "strict-transport-security" in header_map,
            "body": len(body) == (len(expected) if method == "GET" else 0),
            "length": not header_map.get("content-length") or int(header_map["content-length"]) == (len(expected) if method == "GET" else len(expected)),
            "hash": method == "HEAD" or hashlib.sha256(body).hexdigest() == hashlib.sha256(expected).hexdigest(),
        }
        (OUT / f"{slug}.request.json").write_text(json.dumps({"method": method, "url": BASE + path, "resourceId": resource_id}, ensure_ascii=False, indent=2) + "\n")
        (OUT / f"{slug}.headers").write_bytes((str(headers) + "\n").encode())
        (OUT / f"{slug}.body").write_bytes(body)
        records.append({"method": method, "path": path, "resourceId": resource_id, "status": status, "contentType": header_map.get("content-type"), "contentLength": header_map.get("content-length"), "bodyBytes": len(body), "expectedBytes": len(expected), "sha256": hashlib.sha256(body).hexdigest() if method == "GET" else None, "checks": required, "passed": all(required.values())})

# Verify that Markdown negotiation at home still returns the HTML asset.
home_req = urllib.request.Request(BASE + "/", method="GET", headers={"Accept": "text/markdown", "User-Agent": "ctpv-independent-f2a-implementer/1.0"})
with urllib.request.urlopen(home_req, timeout=20) as response:
    home_body = response.read()
    home = {"method": "GET", "path": "/", "accept": "text/markdown", "status": response.status, "contentType": response.headers.get("Content-Type"), "htmlStillServed": response.headers.get("Content-Type", "").startswith("text/html") and b"<!DOCTYPE html" in home_body[:256], "bodyBytes": len(home_body), "sha256": hashlib.sha256(home_body).hexdigest()}
    (OUT / "home-accept-markdown-get.headers").write_bytes((str(response.headers) + "\n").encode())
    (OUT / "home-accept-markdown-get.body").write_bytes(home_body)
home_req = urllib.request.Request(BASE + "/", method="HEAD", headers={"Accept": "text/markdown", "User-Agent": "ctpv-independent-f2a-implementer/1.0"})
with urllib.request.urlopen(home_req, timeout=20) as response:
    home_head = {"method": "HEAD", "path": "/", "accept": "text/markdown", "status": response.status, "contentType": response.headers.get("Content-Type"), "bodyBytes": len(response.read())}
    (OUT / "home-accept-markdown-head.headers").write_bytes((str(response.headers) + "\n").encode())
    (OUT / "home-accept-markdown-head.body").write_bytes(b"")

summary = {"capturedAt": datetime.now(timezone.utc).isoformat(), "sourceCandidate": "54e51a2138d90e822e5a6e6c12a0e56345ec1173", "base": BASE, "workerBindings": ["ASSETS local", "SESSION local"], "excludedBindings": ["CONTACT_KV", "EMAIL", "CONTACT_DB", "AI", "ASK_LIMIT", "ADMIN_LIMIT", "remote preview bindings"], "projectionIndexSha256": hashlib.sha256(index_bytes).hexdigest(), "documents": len(index["documents"]), "documentRequests": len(records), "failed": sum(not r["passed"] for r in records), "records": records, "homeAcceptMarkdown": home, "homeAcceptMarkdownHead": home_head, "homeChecksPassed": home["status"] == 200 and home["htmlStillServed"] and home_head["status"] == 200 and home_head["bodyBytes"] == 0}
(ROOT / "workerd-http-final.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
all_ok = summary["documents"] == 28 and summary["documentRequests"] == 58 and summary["failed"] == 0 and summary["homeChecksPassed"]
print(f"documents={summary['documents']} GET_HEAD={summary['documentRequests']} failed={summary['failed']} homeAcceptMarkdownHtml={summary['homeChecksPassed']}")
raise SystemExit(0 if all_ok else 1)
