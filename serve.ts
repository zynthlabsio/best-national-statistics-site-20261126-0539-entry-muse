// serve.ts — a small static server for the site during development.
// Serves app/ at its root. Usage: node serve.ts [--port 8123]
// Node 22 standard library only.

import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function portFromArgv(argv) {
  const flagIndex = argv.indexOf('--port');
  if (flagIndex >= 0 && argv[flagIndex + 1]) {
    const port = Number(argv[flagIndex + 1]);
    if (Number.isInteger(port) && port > 0) return port;
  }
  const plain = argv.find((arg) => /^\d+$/.test(arg));
  if (plain) return Number(plain);
  return 8080;
}

const root = resolve(fileURLToPath(new URL('./app', import.meta.url)));
const port = portFromArgv(process.argv.slice(2));

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  let path = normalize(join(root, decodeURIComponent(url.pathname)));
  if (path !== root && !path.startsWith(root + sep)) {
    res.writeHead(403).end('forbidden');
    return;
  }
  try {
    if (statSync(path).isDirectory()) path = join(path, 'index.html');
    res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
    createReadStream(path).pipe(res);
  } catch {
    res.writeHead(404).end('not found');
  }
});

server.listen(port, () => {
  console.log(`Indonesia in Numbers served at http://localhost:${port}/`);
});
