const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "..", "public");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };

async function start() {
  await fs.access(path.join(root, "index.html"));
  const rules = new Map();
  let rule;
  for (const line of (await fs.readFile(path.join(root, "_headers"), "utf8")).split(/\r?\n/)) {
    if (line.startsWith("/")) {
      rule = {};
      rules.set(line.trim(), rule);
    } else if (rule && line.includes(":")) {
      const separator = line.indexOf(":");
      rule[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    }
  }
  const headers = { "Cache-Control": "public, max-age=0, must-revalidate", ...rules.get("/*") };
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
      const assetHeaders = pathname.startsWith("/assets/") ? rules.get("/assets/*") : {};
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
