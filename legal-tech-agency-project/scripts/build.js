const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const output = path.join(root, "public");
const pages = ["index.html", "404.html", "privacy.html", "terms.html", "disclaimer.html", "cookies.html", "consultation-terms.html"];
const files = [...pages, "styles.css", "app.js", "contact.js", "favicon.svg"];
const assets = ["legal-tech-mark.png", "legal-tech-hero-command-center.png", "legal-tech-operations-illustration.png"];

async function build() {
  const config = JSON.parse(await fs.readFile(path.join(root, "site.config.json"), "utf8"));
  const origin = process.env.SITE_URL || config.url || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null);
  const site = origin ? new URL(origin) : null;
  if (site && (site.protocol !== "https:" || site.username || site.password || site.pathname !== "/" || site.search || site.hash)) {
    throw new Error("SITE_URL must be an HTTPS site origin");
  }
  const verification = process.env.GOOGLE_SITE_VERIFICATION || config.googleSiteVerification;
  if (verification && (typeof verification !== "string" || !/^[A-Za-z0-9_-]+$/.test(verification))) {
    throw new Error("GOOGLE_SITE_VERIFICATION must contain only the token from Google's HTML tag");
  }
  // Only this generated directory is refreshed; source files stay outside it.
  if (path.dirname(output) !== root || path.basename(output) !== "public") throw new Error("Unsafe output directory");
  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(path.join(output, "assets"), { recursive: true });
  for (const file of files) {
    let content = await fs.readFile(path.join(root, file));
    if (file.endsWith(".html")) {
      let html = content.toString("utf8");
      html = site ? html.replaceAll("{{SITE_ORIGIN}}", site.origin) : html.replace(/^.*<meta[^>]*\{\{SITE_ORIGIN\}\}[^>]*>.*\n/gm, "");
      const robots = file === "404.html" ? "noindex, follow" : "index, follow, max-image-preview:large";
      html = html.replace("</head>", `    <meta name="robots" content="${robots}">\n${file === "index.html" && verification ? `    <meta name="google-site-verification" content="${verification}">\n` : ""}  </head>`);
      content = Buffer.from(html);
    }
    if (site && file.endsWith(".html") && file !== "404.html") {
      const url = `${site.origin}/${file === "index.html" ? "" : file}`;
      const meta = `    <link rel="canonical" href="${url}">\n    <meta property="og:url" content="${url}">\n    <meta property="og:image" content="${site.origin}/assets/legal-tech-hero-command-center.png">\n    <meta property="og:image:alt" content="Legal Tech Agency - legalitas dan transformasi digital">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:image" content="${site.origin}/assets/legal-tech-hero-command-center.png">\n`;
      content = Buffer.from(content.toString("utf8").replace("</head>", meta + "  </head>"));
    }
    await fs.writeFile(path.join(output, file), content);
  }
  for (const asset of assets) await fs.copyFile(path.join(root, "assets", asset), path.join(output, "assets", asset));
  if (site) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => p !== "404.html").map(p => `  <url><loc>${site.origin}/${p === "index.html" ? "" : p}</loc></url>`).join("\n")}\n</urlset>\n`;
    await fs.writeFile(path.join(output, "sitemap.xml"), sitemap);
  }
  await fs.writeFile(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site.origin}/sitemap.xml\n` : ""}`);
  console.log(`Static website ready in ${output}${site ? ` for ${site.origin}` : " (no public domain configured)"}`);
}
build().catch(error => { console.error(error.message); process.exitCode = 1; });
