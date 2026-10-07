# Static Website Test Report

Test date: 2026-10-07
Target: generated `public` directory, previewed at http://localhost:4174/
Hosting target: Vercel. Confirmed production origin: https://legaltechagency.vercel.app/

## Automated Checks

Command: `node --test tests/web.test.js`
Result: 11 tests passed, 0 failed.

- Deployment output contains only the explicitly allowed static files.
- HTML pages, local links, anchor targets, scripts, styles, and images resolve.
- Eight product cards, ten native FAQ entries, and consultation links exist in HTML without requiring JavaScript to generate them.
- Default, service-specific, and audit-specific WhatsApp links use the official PIC number 6285181760072.
- Canonical URLs, sitemap, and robots configuration follow the Vercel production domain. Explicit domain overrides, unknown local domains, and invalid origins are covered.
- Admin, article, API, database, and private source paths are not served; POST is rejected.
- Security headers and MIME types are present in the local static preview.
- Root Vercel configuration builds and publishes only generated static output without backend functions or catch-all rewrites.
- Search metadata, business microdata, indexing directives, production origin precedence, and opt-in Search Console verification are covered.

## Browser Checks

- Tested configured viewport widths: 320, 390, 768, 1440, and 1920 pixels. No document-level horizontal overflow was detected.
- Desktop and phone first-screen layouts were visually inspected.
- Client tabs switch by click and arrow keys, updating the selected tab.
- Native FAQ entries expand and display their answers.
- Phone navigation opens, closes after choosing a link, and closes with Escape.
- Contact navigation reaches the official phone number and complete office address.
- The embedded Google Maps area loaded in the contact section.
- No application warning or error appeared in the inspected browser log.

## Public Deployment Checks

Verified on 2026-10-07 after the SEO code was pushed and deployed:

- https://legaltechagency.vercel.app/ responds with HTTP 200, with the new search title and canonical pointing to that exact production origin.
- The public homepage contains WebSite, LocalBusiness, and PostalAddress microdata and an index/follow directive. No X-Robots-Tag header preventing indexing was found.
- Public robots.txt allows crawling and points to the production sitemap. The sitemap responds successfully and lists the six published content pages, with no admin or preview URLs.
- The old /admin.html URL returns HTTP 404.
- The deployed homepage was inspected in the browser; no horizontal overflow or application console warning/error was detected.
- The approved Google HTML verification tag is present on the production homepage. Search Console confirmed successful ownership verification for `legaltechagency@gmail.com`.
- Search Console successfully processed `sitemap.xml` and reported 6 discovered pages (not a claim that all 6 are indexed).
- Homepage URL Inspection reported "URL ada di Google", "Halaman diindeks", and HTTPS serving.
- A fresh Request Indexing attempt was rejected with "Kuota Terlampaui" because the daily quota was exceeded. No new indexing request was accepted; the UI advised retrying tomorrow.

## Publication Boundaries

- This is a static company website, not an authenticated application.
- There is no admin dashboard, Insight section, backend API, database, Supabase connection, login, submission form, or browser data-storage workflow.
- WhatsApp destinations and message text were validated; no message was sent and account ownership was not independently verified.
- Google Maps and WhatsApp require an internet connection and remain third-party services.
- The production checks above confirm the current live deployment. Future deployments still require production HTTP, HTTPS, and response-header checks; local tests alone do not prove a site is live.
- The prior Netlify domain and hosting configuration are removed. The supplied Vercel domain is pinned as the production origin.
- Search Console ownership and indexing status were checked in the owner's account with explicit approval. Code tests alone cannot verify Google ownership, indexing status, or ranking.

Deploy only the contents of `public`, or the deployment ZIP. Do not publish the previous demo backup or the entire source directory.
