const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "..", "public");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };

async function start() {
  await fs.access(path.join(root, "index.html"));
  const config = JSON.parse(await fs.readFile(path.resolve(__dirname, "..", "..", "vercel.json"), "utf8"));
  const headers = Object.fromEntries(config.headers.find(rule => rule.source === "/(.*)").headers.map(header => [header.key, header.value]));
  const server = http.createServer(async (req, res) => {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { ...headers, Allow: "GET, HEAD" }); res.end(); return;
    }
    try {
      const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const relative = pathname === "/" ? "index.html" : pathname.slice(1);
      const target = path.resolve(root, relative);
      const inside = path.relative(root, target);
      if (inside.startsWith("..") || path.isAbsolute(inside) || relative.split(/[\\/]/).some(part => part.startsWith("_") || part.startsWith("."))) throw new Error("Not found");
      const content = await fs.readFile(target);
      const assetHeaders = pathname.startsWith("/assets/") ? Object.fromEntries(config.headers.find(rule => rule.source === "/assets/(.*)").headers.map(header => [header.key, header.value])) : {};
      res.writeHead(200, { ...headers, ...assetHeaders, "Content-Type": mime[path.extname(target)] || "application/octet-stream" });
      res.end(req.method === "HEAD" ? undefined : content);
    } catch {
      res.writeHead(404, { ...headers, "Content-Type": mime[".html"] });
      res.end(req.method === "HEAD" ? undefined : await fs.readFile(path.join(root, "404.html")));
    }
  });
  server.listen(Number(process.env.PORT || 4173), "127.0.0.1", () => console.log(`Static preview: http://localhost:${server.address().port}`));
}
start().catch(error => { console.error(error.message); process.exitCode = 1; });
