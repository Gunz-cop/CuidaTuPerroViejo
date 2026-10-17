from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
os.chdir(Path.cwd()/'dist/client')
class Preview(SimpleHTTPRequestHandler):
    def do_GET(self):
        candidate = self.path.split('?')[0].split('#')[0]
        if not Path('.' + candidate).is_file() and Path('.' + candidate + '.html').is_file():
            self.path = candidate + '.html'
        return super().do_GET()
ThreadingHTTPServer(('127.0.0.1',4321), Preview).serve_forever()
