# Legal Tech Agency

Website statis Legal Tech Agency. Seluruh konsultasi diarahkan ke WhatsApp PIC resmi +62 851-8176-0072. Tidak menggunakan Supabase, autentikasi, database, atau dashboard admin.

## Deploy ke Vercel

1. Import repositori ini melalui Vercel.
2. Root Directory: biarkan root repositori (`./`), bukan folder `legal-tech-agency-project`.
3. Framework Preset: Other. Build dan Output Directory sudah ditentukan di `vercel.json`.
4. Pilih Node.js 22 atau lebih baru dan deploy branch `main`.

Build Command: `node legal-tech-agency-project/scripts/build.js`.
Output Directory: `legal-tech-agency-project/public`.
Tidak diperlukan install dependency atau environment variable Supabase.

SEO mengikuti `VERCEL_PROJECT_PRODUCTION_URL`. Untuk domain khusus, set `SITE_URL` dengan URL HTTPS lengkap lalu redeploy. Pastikan system environment variables tersedia saat build. Build lokal tanpa domain tidak menghasilkan canonical atau sitemap dengan alamat yang belum dikonfirmasi.

## Pengujian Lokal

```powershell
node legal-tech-agency-project/scripts/build.js
node --test legal-tech-agency-project/tests/web.test.js
node legal-tech-agency-project/scripts/preview.js
```

Panduan konten dan hasil pengujian tersedia di `legal-tech-agency-project/README.md` dan `legal-tech-agency-project/TEST-REPORT.md`. ZIP, backup demo, output build, dan log lokal tidak masuk Git.

Konfigurasi mengacu pada [dokumentasi Vercel](https://vercel.com/docs/project-configuration/vercel-json). Mengunggah kode ke GitHub tidak dengan sendirinya membuat deployment Vercel jika repositori belum dihubungkan ke sebuah proyek Vercel.
