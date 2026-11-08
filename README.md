# Legal Tech Agency

Website statis Legal Tech Agency. Seluruh konsultasi diarahkan ke WhatsApp PIC resmi +62 851-8176-0072. Tidak menggunakan Supabase, autentikasi, database, atau dashboard admin.

## Deploy ke Netlify

1. Di proyek Netlify yang memakai `legaltechagency.netlify.app`, hubungkan repositori GitHub ini dan pilih branch produksi `main`.
2. Gunakan root repositori sebagai Base directory. Biarkan Package directory kosong.
3. `netlify.toml` menetapkan Node.js 22, build command, dan publish directory. Jalankan deploy produksi dari proyek tersebut.

Build Command: `node legal-tech-agency-project/scripts/build.js`.
Publish Directory: `legal-tech-agency-project/public`.
Tidak diperlukan install dependency atau environment variable Supabase.

Untuk deploy manual di proyek yang sama, unggah `legal-tech-agency-static-public.zip` melalui tab Deploys, bukan ZIP kode sumber. Paket ini sudah berisi `index.html`, `_headers`, `robots.txt`, dan `sitemap.xml` di tingkat teratas.

SEO utama ditetapkan ke `https://legaltechagency.netlify.app/` di `legal-tech-agency-project/site.config.json`. Jika `SITE_URL` pernah diatur di Netlify, kosongkan atau set ke URL HTTPS produksi yang benar. URL preview tidak menggantikan canonical produksi. Panduan properti Google Search Console baru dan pengiriman sitemap tersedia di `legal-tech-agency-project/SEO-GUIDE.md`.

## Pengujian Lokal

```powershell
node legal-tech-agency-project/scripts/build.js
node --test legal-tech-agency-project/tests/web.test.js
node legal-tech-agency-project/scripts/preview.js
```

Panduan konten dan hasil pengujian tersedia di `legal-tech-agency-project/README.md` dan `legal-tech-agency-project/TEST-REPORT.md`. ZIP, backup demo, output build, dan log lokal tidak masuk Git.

Konfigurasi mengikuti [dokumentasi Netlify](https://docs.netlify.com/build/configure-builds/file-based-configuration/). Push GitHub hanya memicu deploy Netlify jika repositori sudah terhubung. `vercel.json` adalah konfigurasi lama dan tidak dipakai oleh Netlify.
