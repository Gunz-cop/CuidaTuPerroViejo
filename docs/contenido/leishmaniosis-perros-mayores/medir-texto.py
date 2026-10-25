"""Cuenta texto editorial del MDX, sin bibliografía, frontmatter ni imports.

Incluye H2/H3, títulos de AlertBox, captions, celdas y preguntas/respuestas FAQ.
Cuenta por espacios; conserva palabras con guiones como una unidad.
Uso: python3 -I medir-texto.py [ruta-del-mdx]
No evalúa calidad clínica ni emite un veredicto de auditoría.
"""
import hashlib
import json
from pathlib import Path
import re
import statistics
import sys

path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name('articulo-borrador.mdx')
original = path.read_text()
body = original.split('---', 2)[2]
body = re.sub(r'^import .*$', '', body, flags=re.M)
body = re.sub(r'<div data-editorial-bibliography>.*?</div>', '', body, flags=re.S)


def visible(part):
    part = re.sub(r'<AlertBox\b[^>]*title="([^"]+)"[^>]*>', r'\n\1\n', part)
    if '<FAQ' in part:
        questions = re.findall(r"question: '([^']*)', answer: '([^']*)'", part)
        part = part.split('<FAQ')[0] + ' ' + ' '.join(' '.join(pair) for pair in questions)
    part = re.sub(r'<[^>]*>', '', part)
    return re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', part)


names = ['Introducción'] + re.findall(r'^## (.*)$', body, re.M)
parts = re.split(r'^## .*$', body, flags=re.M)
targets = [250, 650, 700, 800, 700, 900, 550]
sections = []
for name, part, target in zip(names, parts, targets):
    words = len(visible(part).split())
    sections.append({'section': name, 'words': words, 'target': target,
                     'deviation_percent': round((words / target - 1) * 100, 1)})

paragraphs = [len(line.split()) for line in body.splitlines()
              if line.strip() and not re.match(r'^(import |#|!\[|\*|<| |-|\]|[0-9]+\.)', line)]
h3_over200 = []
for part in re.split(r'^### ', body, flags=re.M)[1:]:
    part = part.split('\n## ')[0].split('<FAQ')[0]
    words = len(visible(part).split())
    if words > 200:
        h3_over200.append({'heading': part.splitlines()[0], 'words': words})

print(json.dumps({
    'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
    'total_words': sum(section['words'] for section in sections),
    'sections': sections,
    'paragraph_density': {
        'mean': round(statistics.mean(paragraphs), 1),
        'median': statistics.median(paragraphs),
        'over50_percent': round(100 * sum(words > 50 for words in paragraphs) / len(paragraphs), 1),
    },
    'h3_over200': h3_over200,
}, ensure_ascii=False, indent=2))
