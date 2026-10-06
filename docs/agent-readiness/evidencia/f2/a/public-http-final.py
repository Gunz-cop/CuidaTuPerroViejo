#!/usr/bin/env python3
"""Capture only the F2 allowlist from the official Commit Preview URL."""
import hashlib
import json
import pathlib
import urllib.error
import urllib.request
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent
REPO = pathlib.Path(__file__).resolve().parents[5]
BUILD = REPO / "dist/client/agent-content/v1"
OUT = ROOT / "public-preview-1651-raw"
BASE = "https://1ead4aad-cuidatuperroviejo.g1721m.workers.dev"
UA = "ctpv-independent-f2a-implementer/1.0"
OUT.mkdir(parents=True, exist_ok=True)

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirect)
index_bytes = (BUILD / "index.json").read_bytes()
index = json.loads(index_bytes)
resources = [("index", "/agent-content/v1/index.json", "application/json; charset=utf-8", index_bytes)]
for item in index["documents"]:
    rel = item["markdownPath"].lstrip("/")
    expected = (REPO / "dist/client" / rel).read_bytes()
    resources.append((item["documentId"], item["markdownPath"], "text/markdown; charset=utf-8", expected))

def safe_headers(headers):
    result = []
    for key, value in headers.items():
        if key.lower() in {"set-cookie", "authorization", "proxy-authorization"}:
            value = "[REDACTED]"
        result.append((key, value))
    return result

def write_capture(slug, headers, body):
    (OUT / f"{slug}.headers").write_text("".join(f"{k}: {v}\n" for k, v in safe_headers(headers)))
    (OUT / f"{slug}.body").write_bytes(body)

records = []
for resource_id, path, mime, expected in resources:
    for method in ("GET", "HEAD"):
        slug = f"{len(records):02d}-{method.lower()}"
        url = BASE + path
        request = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
        (OUT / f"{slug}.request.json").write_text(json.dumps({"method": method, "url": url, "resourceId": resource_id, "userAgent": UA}, ensure_ascii=False, indent=2) + "\n")
        try:
            with opener.open(request, timeout=30) as response:
                status, headers, body = response.status, response.headers, response.read()
        except urllib.error.HTTPError as error:
            status, headers, body = error.code, error.headers, error.read()
        write_capture(slug, headers, body)
        header_map = {k.lower(): v for k, v in headers.items()}
        checks = {
            "status": status == 200,
            "mime": header_map.get("content-type") == mime,
            "link": '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"' in header_map.get("link", ""),
            "security": header_map.get("x-content-type-options") == "nosniff" and header_map.get("referrer-policy") == "strict-origin-when-cross-origin" and "geolocation=()" in header_map.get("permissions-policy", "") and "strict-transport-security" in header_map,
            "body": len(body) == (len(expected) if method == "GET" else 0),
            "length": not header_map.get("content-length") or int(header_map["content-length"]) == len(expected),
            "hash": method == "HEAD" or hashlib.sha256(body).hexdigest() == hashlib.sha256(expected).hexdigest(),
        }
        records.append({"method": method, "path": path, "resourceId": resource_id, "status": status, "contentType": header_map.get("content-type"), "contentLength": header_map.get("content-length"), "bodyBytes": len(body), "expectedBytes": len(expected), "sha256": hashlib.sha256(body).hexdigest() if method == "GET" else None, "checks": checks, "passed": all(checks.values())})

def home_request(method):
    url = BASE + "/"
    request = urllib.request.Request(url, method=method, headers={"Accept": "text/markdown", "User-Agent": UA})
    slug = f"home-accept-markdown-{method.lower()}"
    (OUT / f"{slug}.request.json").write_text(json.dumps({"method": method, "url": url, "accept": "text/markdown", "userAgent": UA}, indent=2) + "\n")
    try:
        with opener.open(request, timeout=30) as response:
            status, headers, body = response.status, response.headers, response.read()
    except urllib.error.HTTPError as error:
        status, headers, body = error.code, error.headers, error.read()
    write_capture(slug, headers, body)
    is_html = headers.get("Content-Type", "").startswith("text/html")
    record = {"method": method, "path": "/", "accept": "text/markdown", "status": status, "contentType": headers.get("Content-Type"), "bodyBytes": len(body), "sha256": hashlib.sha256(body).hexdigest() if method == "GET" else None, "htmlStillServed": is_html if method == "GET" else None}
    return record

home_get = home_request("GET")
home_head = home_request("HEAD")
summary = {
    "capturedAt": datetime.now(timezone.utc).isoformat(),
    "publicCandidateSha": "1651d4246efbc991e436f20e9a417e64896a9c79",
    "publicTree": "30230ec14a28648acbf6a5ff9a176f1e39f3cb47",
    "sourceCodeShaMeasuredByBuilds": "54e51a2138d90e822e5a6e6c12a0e56345ec1173",
    "sourceCodeTreeMeasuredByBuilds": "47790c1d300e47ee38db464f7dcec2c6e693baad",
    "commitPreviewUrl": BASE,
    "officialBotComment": "https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357",
    "ciRun": "https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37460373304",
    "userAgent": UA,
    "allowedResourcesOnly": True,
    "requestedMethods": ["GET", "HEAD"],
    "indexAndDocuments": len(index["documents"]),
    "documentRequests": len(records),
    "failed": sum(not item["passed"] for item in records),
    "records": records,
    "homeAcceptMarkdownGet": home_get,
    "homeAcceptMarkdownHead": home_head,
    "homeChecksPassed": home_get["status"] == 200 and home_get["htmlStillServed"] and home_head["status"] == 200 and home_head["bodyBytes"] == 0,
    "redactions": "Set-Cookie and authorization header values are redacted in persisted raw header files if present. No request credentials were sent."
}
(ROOT / "public-preview-1651-http.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
passed = len(index["documents"]) == 28 and len(records) == 58 and summary["failed"] == 0 and summary["homeChecksPassed"]
print(f"preview={BASE} documents={len(index['documents'])} GET_HEAD={len(records)} failed={summary['failed']} homeAcceptMarkdownHtml={summary['homeChecksPassed']}")
raise SystemExit(0 if passed else 1)
