const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const siteConfig = require("../site.config.json");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
let preview;
let base;
const productionDomain = "legal-tech-production.example";

before(async () => {
  const build = spawn(process.execPath, [path.join(root, "scripts", "build.js")], { env: { ...process.env, SITE_URL: `https://${productionDomain}`, GOOGLE_SITE_VERIFICATION: "", VERCEL_PROJECT_PRODUCTION_URL: productionDomain }, stdio: "ignore", windowsHide: true });
  const [code] = await once(build, "exit");
  assert.equal(code, 0, "Static build failed");
  preview = spawn(process.execPath, [path.join(root, "scripts", "preview.js")], {
    env: { ...process.env, PORT: "0" }, stdio: ["ignore", "pipe", "pipe"], windowsHide: true
  });
  base = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Preview did not start")), 10000);
    preview.stdout.on("data", chunk => {
      const match = String(chunk).match(/http:\/\/localhost:\d+/);
      if (match) { clearTimeout(timer); resolve(match[0]); }
    });
    preview.once("error", error => { clearTimeout(timer); reject(error); });
    preview.once("exit", code => { clearTimeout(timer); reject(new Error(`Preview exited: ${code}`)); });
  });
});

after(async () => {
  if (preview && preview.exitCode === null) {
    const closed = once(preview, "exit");
    preview.kill();
    await closed;
  }
});

test("Publish directory contains only the static website", async () => {
  const files = await fs.readdir(publicDir);
  assert.deepEqual(files.sort(), ["404.html", "app.js", "assets", "consultation-terms.html", "contact.js", "cookies.html", "disclaimer.html", "favicon.svg", "index.html", "privacy.html", "robots.txt", "sitemap.xml", "styles.css", "terms.html"].sort());
  for (const file of files.filter(file => /\.(html|js)$/.test(file))) {
    const content = await fs.readFile(path.join(publicDir, file), "utf8");
    assert.doesNotMatch(content, /(?:localStorage|sessionStorage)\s*\.|\/api\/|supabase|LegalTech2026|data-admin|data-articles|id="insight"|article\.html|newsletter|<form\b/i, file);
    if (file.endsWith(".js")) new vm.Script(content, { filename: file });
  }
});

test("All page links, anchors, images, and scripts resolve", async () => {
  for (const file of (await fs.readdir(publicDir)).filter(file => file.endsWith(".html"))) {
    const html = await fs.readFile(path.join(publicDir, file), "utf8");
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `Duplicate ID in ${file}`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const link = match[1];
      if (link.startsWith("#")) { assert.ok(ids.includes(link.slice(1)), `${file}: ${link}`); continue; }
      if (/^https?:/.test(link)) continue;
      const url = new URL(link, `https://static.test/${file}`);
      const response = await fetch(base + url.pathname + url.search);
      assert.equal(response.status, 200, `${file}: ${link}`);
      assert.ok((await response.arrayBuffer()).byteLength > 0, link);
    }
  }
  const css = await fs.readFile(path.join(publicDir, "styles.css"), "utf8");
  for (const match of css.matchAll(/url\("([^"]+)"\)/g)) assert.equal((await fetch(`${base}/${match[1]}`)).status, 200);
});

test("Content and WhatsApp links work without JavaScript", async () => {
  const html = await fs.readFile(path.join(publicDir, "index.html"), "utf8");
  assert.match(html, /<h1>Legal Tech Agency<\/h1>/);
  assert.equal((html.match(/class="product-card"/g) || []).length, 8);
  assert.equal((html.match(/<details class="faq-item"/g) || []).length, 10);
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*data-whatsapp[^>]*>/g)];
  assert.ok(anchors.length >= 20);
  for (const [, href] of anchors) assert.equal(new URL(href).pathname, "/6285181760072");
  const css = await fs.readFile(path.join(publicDir, "styles.css"), "utf8");
  assert.doesNotMatch(css, /\.reveal\s*\{[^}]*opacity:\s*0/);
});

test("WhatsApp message encoding and service-specific messages", async () => {
  const links = [
    { dataset: {}, closest: () => null },
    { dataset: {}, closest: () => ({ querySelector: () => ({ textContent: "Dashboard Keuangan" }) }) },
    { dataset: { message: "Audit & dokumen + kebutuhan\nUji" }, closest: () => null }
  ];
  const scope = vm.createContext({ document: { querySelectorAll: () => links } });
  vm.runInContext(await fs.readFile(path.join(publicDir, "contact.js"), "utf8"), scope);
  for (const link of links) assert.equal(new URL(link.href).pathname, "/6285181760072");
  assert.match(new URL(links[1].href).searchParams.get("text"), /Dashboard Keuangan/);
  assert.equal(new URL(links[2].href).searchParams.get("text"), links[2].dataset.message);
});

test("SEO canonical, sitemap and robots agree and exclude removed pages", async () => {
  const site = `https://${productionDomain}`;
  const html = await fs.readFile(path.join(publicDir, "index.html"), "utf8");
  assert.ok(html.includes(`<link rel="canonical" href="${site}/">`));
  const sitemap = await fs.readFile(path.join(publicDir, "sitemap.xml"), "utf8");
  assert.ok(sitemap.includes(`<loc>${site}/</loc>`));
  assert.doesNotMatch(sitemap, /admin|article|insight|legaltechagency\.id/);
  assert.ok((await fs.readFile(path.join(publicDir, "robots.txt"), "utf8")).includes(`${site}/sitemap.xml`));
});

test("Old admin, API, database and source files are not publicly served", async () => {
  for (const url of ["/admin.html", "/admin.js", "/article.html", "/api/data", "/api/records", "/data/db.json", "/server.js", "/package.json", "/scripts/build.js", "/missing", "/deep/missing", "/%2e%2e%5cREADME.md"]) {
    const response = await fetch(base + url);
    assert.equal(response.status, 404, url);
    assert.match(await response.text(), /Halaman Tidak Ditemukan/);
  }
  assert.equal((await fetch(base + "/", { method: "POST", body: "test" })).status, 405);
});

test("Preview enforces static-site security headers and serves correct media types", async () => {
  const response = await fetch(base);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy"), /connect-src 'none'/);
  assert.match(response.headers.get("content-security-policy"), /frame-src https:\/\/maps.google.com/);
  assert.match((await fetch(base + "/contact.js")).headers.get("content-type"), /javascript/);
  assert.equal((await fetch(base + "/assets/legal-tech-mark.png")).headers.get("content-type"), "image/png");
  assert.equal((await fetch(base + "/assets/legal-tech-mark.png")).headers.get("cache-control"), "public, max-age=86400");
});

test("Vercel configuration publishes only generated static output", async () => {
  const config = JSON.parse(await fs.readFile(path.resolve(root, "..", "vercel.json"), "utf8"));
  assert.equal(config.framework, null);
  assert.equal(config.installCommand, "");
  assert.equal(config.buildCommand, "node legal-tech-agency-project/scripts/build.js");
  assert.equal(config.outputDirectory, "legal-tech-agency-project/public");
  assert.equal(config.cleanUrls, false);
  assert.ok(!config.rewrites && !config.functions, "No catch-all or backend needed");
  assert.ok(config.headers.find(rule => rule.source === "/(.*)").headers.some(header => header.key === "Content-Security-Policy"));
});

test("Domain overrides, pinned production origin, and invalid origins are handled safely", async () => {
  const runBuild = async (site, production) => {
    const child = spawn(process.execPath, [path.join(root, "scripts", "build.js")], {
      env: { ...process.env, SITE_URL: site, VERCEL_PROJECT_PRODUCTION_URL: production }, stdio: "ignore", windowsHide: true
    });
    return (await once(child, "exit"))[0];
  };
  assert.equal(await runBuild("https://custom-domain.example", productionDomain), 0);
  assert.match(await fs.readFile(path.join(publicDir, "index.html"), "utf8"), /canonical" href="https:\/\/custom-domain\.example\//);
  assert.equal(await runBuild("", ""), 0);
  assert.match(await fs.readFile(path.join(publicDir, "index.html"), "utf8"), /canonical" href="https:\/\/legaltechagency\.vercel\.app\//);
  assert.equal(await runBuild("", "temporary-preview.vercel.app"), 0);
  assert.doesNotMatch(await fs.readFile(path.join(publicDir, "index.html"), "utf8"), /temporary-preview|netlify\.app|\{\{SITE_ORIGIN\}\}/);
  for (const invalid of ["http://insecure.example", "https://user:secret@invalid.example", "https://invalid.example/subpath", "https://invalid.example/?q=test"]) {
    assert.notEqual(await runBuild(invalid, productionDomain), 0);
  }
  assert.equal(await runBuild(`https://${productionDomain}`, productionDomain), 0);
});

test("Search metadata and business microdata match visible business details", async () => {
  const html = await fs.readFile(path.join(publicDir, "index.html"), "utf8");
  assert.match(html, /<title>Legal Tech Agency \| Legalitas &amp; Solusi Digital Tangerang<\/title>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.match(html, /name="robots" content="index, follow, max-image-preview:large"/);
  assert.match(html, /name="twitter:image"/);
  assert.match(html, /itemtype="https:\/\/schema.org\/WebSite"/);
  assert.match(html, /itemtype="https:\/\/schema.org\/LocalBusiness"/);
  assert.match(html, /itemtype="https:\/\/schema.org\/PostalAddress"/);
  assert.match(html, /itemprop="telephone" content="\+6285181760072"/);
  assert.match(html, /itemprop="addressLocality">Kota Tangerang/);
  assert.match(html, /itemprop="postalCode">15141/);
  assert.match(html, /itemprop="addressCountry" content="ID"/);
  assert.match(html, /itemprop="openingHours" content="Mo-Fr 09:00-17:00"/);
  assert.match(html, new RegExp(`itemprop="url" content="https://${productionDomain.replaceAll(".", "\\.")}/"`));
  assert.doesNotMatch(html, /aggregateRating|reviewRating|\{\{SITE_ORIGIN\}\}/);
  if (siteConfig.googleSiteVerification) assert.ok(html.includes(`<meta name="google-site-verification" content="${siteConfig.googleSiteVerification}">`));
  const titles = [];
  for (const file of (await fs.readdir(publicDir)).filter(file => file.endsWith(".html"))) {
    const page = await fs.readFile(path.join(publicDir, file), "utf8");
    titles.push(page.match(/<title>([^<]+)<\/title>/)[1]);
    assert.match(page, file === "404.html" ? /name="robots" content="noindex, follow"/ : /name="robots" content="index, follow/);
  }
  assert.equal(titles.length, new Set(titles).size);
});

test("Search Console verification uses configuration, supports overrides, and rejects malformed tokens", async () => {
  const runBuild = async token => {
    const child = spawn(process.execPath, [path.join(root, "scripts", "build.js")], {
      env: { ...process.env, SITE_URL: `https://${productionDomain}`, GOOGLE_SITE_VERIFICATION: token }, stdio: "ignore", windowsHide: true
    });
    return (await once(child, "exit"))[0];
  };
  assert.equal(await runBuild("Test_SearchConsole-Token_123"), 0);
  assert.match(await fs.readFile(path.join(publicDir, "index.html"), "utf8"), /name="google-site-verification" content="Test_SearchConsole-Token_123"/);
  assert.doesNotMatch(await fs.readFile(path.join(publicDir, "privacy.html"), "utf8"), /google-site-verification/);
  assert.notEqual(await runBuild('bad"><script>'), 0);
  assert.equal(await runBuild(""), 0);
  const html = await fs.readFile(path.join(publicDir, "index.html"), "utf8");
  if (siteConfig.googleSiteVerification) {
    assert.ok(html.includes(`<meta name="google-site-verification" content="${siteConfig.googleSiteVerification}">`));
  } else {
    assert.doesNotMatch(html, /google-site-verification/);
  }
  assert.doesNotMatch(html, /Test_SearchConsole-Token_123/);
});
