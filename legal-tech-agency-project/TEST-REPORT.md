# Static Website Test Report

Test date: 2026-10-07
Target: generated `public` directory, previewed at http://localhost:4174/
Hosting target: Vercel. Production origin is resolved at build time; no unconfirmed domain is hardcoded.

## Automated Checks

Command: `node --test tests/web.test.js`
Result: 9 tests passed, 0 failed.

- Deployment output contains only the explicitly allowed static files.
- HTML pages, local links, anchor targets, scripts, styles, and images resolve.
- Eight product cards, ten native FAQ entries, and consultation links exist in HTML without requiring JavaScript to generate them.
- Default, service-specific, and audit-specific WhatsApp links use the official PIC number 6285181760072.
- Canonical URLs, sitemap, and robots configuration follow the Vercel production domain. Explicit domain overrides, unknown local domains, and invalid origins are covered.
- Admin, article, API, database, and private source paths are not served; POST is rejected.
- Security headers and MIME types are present in the local static preview.
- Root Vercel configuration builds and publishes only generated static output without backend functions or catch-all rewrites.

## Browser Checks

- Tested configured viewport widths: 320, 390, 768, 1440, and 1920 pixels. No document-level horizontal overflow was detected.
- Desktop and phone first-screen layouts were visually inspected.
- Client tabs switch by click and arrow keys, updating the selected tab.
- Native FAQ entries expand and display their answers.
- Phone navigation opens, closes after choosing a link, and closes with Escape.
- Contact navigation reaches the official phone number and complete office address.
- The embedded Google Maps area loaded in the contact section.
- No application warning or error appeared in the inspected browser log.

## Publication Boundaries

- This is a static company website, not an authenticated application.
- There is no admin dashboard, Insight section, backend API, database, Supabase connection, login, submission form, or browser data-storage workflow.
- WhatsApp destinations and message text were validated; no message was sent and account ownership was not independently verified.
- Google Maps and WhatsApp require an internet connection and remain third-party services.
- Hosting deployment, domain availability/ownership, production HTTPS, and actual hosting response headers must be checked after publishing. Local results are not a claim that the website is already live.
- The prior Netlify domain and hosting configuration are removed. The Vercel project resolves its production domain during build.

Deploy only the contents of `public`, or the deployment ZIP. Do not publish the previous demo backup or the entire source directory.
