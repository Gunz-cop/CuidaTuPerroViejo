"""Captura reproducible de respuestas; HTTP 200 no equivale a validación editorial."""
import concurrent.futures, datetime, hashlib, html, json, pathlib, re, urllib.request

BASE = pathlib.Path(__file__).resolve().parent
CAPTURES = BASE / 'fuentes'
CAPTURES.mkdir(exist_ok=True)
inventory = json.loads((BASE / 'inventario-inicial.json').read_text())
urls = [u for u in inventory if not any(x in u for x in ['cuidatuperroviejo.com', 'google.com/search', 'w3.org', 'schema.org'])]
extra = [
    'https://cuidatuperroviejo.com/descargas/calendario-medicacion-perros.pdf',
    'https://drive.google.com/file/d/1WwCP4ortGvG6FtfO4TGPFtBpr3jH3bby/view?usp=drive_link',
    'https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/',
    'https://www.fda.gov/animal-veterinary/animal-health-literacy/treating-cushings-disease-dogs',
    'https://support.google.com/adsense/answer/10015918?hl=es',
    'https://support.google.com/publisherpolicies/answer/11035931?hl=es',
]
urls.extend(extra)

def fetch(url):
    key = hashlib.sha256(url.encode()).hexdigest()[:16]
    record = {'url': url, 'date': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'key': key}
    pm = re.search(r'pubmed.ncbi.nlm.nih.gov/(\d+)', url)
    actual = ('https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:' + pm[1] + '%20AND%20SRC:MED&format=json&resultType=core') if pm else url
    record['requested'] = actual
    try:
        req = urllib.request.Request(actual, headers={'User-Agent': 'EditorialSourceCheck/1.0'})
        with urllib.request.urlopen(req, timeout=35) as r:
            data = r.read()
            record.update(status=r.status, final_url=r.url, content_type=r.headers.get('Content-Type'), bytes=len(data))
        if pm:
            parsed = json.loads(data)
            record['metadata'] = parsed.get('resultList', {}).get('result', [])
            (CAPTURES / (key + '.json')).write_bytes(data)
        elif 'pdf' in record['content_type'].lower():
            (CAPTURES / (key + '.pdf')).write_bytes(data)
        else:
            content = data.decode('utf-8', errors='replace')
            content = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', '', content, flags=re.S|re.I)
            content = html.unescape(re.sub(r'<[^>]+>', '\n', content))
            content = re.sub(r'\n\s*\n+', '\n', content)
            (CAPTURES / (key + '.txt')).write_text(content)
    except Exception as e:
        record.update(status=getattr(e, 'code', None), error=str(e))
    return record

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        records = list(pool.map(fetch, dict.fromkeys(urls)))
    (BASE / 'respuestas-fuentes.json').write_text(json.dumps(records, ensure_ascii=False, indent=2))
    for r in records:
        meta = r.get('metadata', [])
        print(r.get('status'), r['url'], '|', meta[0].get('title') if meta else r.get('error', r.get('content_type')))
