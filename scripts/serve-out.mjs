/** Tiny static server for the exported /out folder (used for screenshots and local checks). */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = path.resolve(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2",
  ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(root, p);
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
  } catch {
    file = path.join(root, "404.html");
    res.statusCode = 404;
  }
  try {
    let body = await readFile(file);
    const ext = path.extname(file);
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    // Mimic Vercel: long cache for hashed assets, gzip for text.
    if (p.startsWith("/_next/static/")) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    if ([".html", ".js", ".css", ".svg", ".json", ".txt", ".xml"].includes(ext) && /gzip/.test(req.headers["accept-encoding"] || "")) {
      body = gzipSync(body);
      res.setHeader("Content-Encoding", "gzip");
    }
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}`));
