from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, urljoin
import json

root = Path('dist/client')
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'): self.ids.append(attrs['id'])
        if tag == 'a' and attrs.get('href'): self.links.append(attrs['href'])

pages = {}
for file in root.rglob('*.html'):
    page = Page()
    page.feed(file.read_text())
    pages['/' + str(file.relative_to(root))] = page
broken, duplicate_ids, count = [], [], 0
for source, page in pages.items():
    duplicate_ids.extend({'source': source, 'id': i} for i in set(page.ids) if page.ids.count(i) > 1)
    for href in page.links:
        url = urlsplit(urljoin('https://cuidatuperroviejo.com' + source, href))
        if url.netloc != 'cuidatuperroviejo.com' or not url.fragment: continue
        if url.fragment.startswith(':~:text='): continue
        target = url.path
        if target.endswith('/'): target += 'index.html'
        elif not target.endswith('.html'): target += '.html'
        if target not in pages: continue
        count += 1
        if unquote(url.fragment) not in pages[target].ids:
            broken.append({'source': source, 'href': href, 'target': target})
result = {'checked_anchors': count, 'broken': broken, 'duplicate_ids': duplicate_ids}
print(json.dumps(result, ensure_ascii=False, indent=2))
Path(__file__).with_name('anclas-despues.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
assert not broken and not duplicate_ids, result
