"""Mediciones descriptivas para R2; no detecta autoría ni aprueba el contenido."""
import hashlib
import json
import pathlib
import re
import subprocess

root = next(p for p in pathlib.Path(__file__).resolve().parents if (p / 'src/content/blog').is_dir())
destination = pathlib.Path(__file__).resolve().parent
article = (root / 'src/content/blog/miedo-polvora-perros-mayores.mdx').read_text()
body = article[:article.index('<div data-editorial-bibliography>')]
names = ['Luna', 'Dakota', 'Osa', 'Baltor']
rows = []
for match in re.finditer(r'^## (.*?)\n(.*?)(?=^## |\Z)', body, re.M | re.S):
    title, section = match.groups()
    rows.append({'h2': title, 'line': body[:match.start()].count('\n') + 1,
                 **{name: len(re.findall(r'\b' + name + r'\b', section)) for name in names}})
integration = {
    'version': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip(),
    'sha256': hashlib.sha256(article.encode()).hexdigest(),
    'name_mentions_body_including_headings': {
        name: [body[:m.start()].count('\n') + 1 for m in re.finditer(r'\b' + name + r'\b', body)]
        for name in names},
    'by_h2': rows,
    'count_scope': 'Entire MDX before bibliography, including headings and excluding FAQ; line numbers refer to actual file.'}
(destination / 'integracion-testimonios.json').write_text(json.dumps(integration, ensure_ascii=False, indent=2))
openings = []
for match in re.finditer(r'^### (.*?)\n(.*?)(?=^###? |\Z)', body, re.M | re.S):
    title, section = match.groups()
    section = re.sub(r'\{/\*.*?\*/\}', '', section, flags=re.S).strip()
    first = section.split('\n\n')[0]
    if re.match(r'(?:Según|La ESVCE|El COLVET|El Colegio|La Facultad|La UNAM|En (?:una|la) encuesta|\[?(?:Cornell|Gähwiler)|En los reportes)', first):
        openings.append({'line': body[:match.start()].count('\n') + 1, 'h3': title, 'opening': first})
result = {'method': 'Explicit diagnostic regex on first paragraph of each H3; excludes bibliography/FAQ. Not an authorship or quality score.',
          'h3_total': len(re.findall(r'^### ', body, re.M)), 'matched': len(openings), 'rows': openings}
(destination / 'aperturas-fuentes.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
print(json.dumps({'mentions': integration['name_mentions_body_including_headings'],
                  'source_openings': len(openings), 'h3': result['h3_total']}, ensure_ascii=False))
