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

Domain resmi ditetapkan ke `https://legaltechagency.my.id/` di `legal-tech-agency-project/site.config.json`. Hosting tetap proyek Netlify `legaltechagency`. Jika `SITE_URL` pernah diatur di Netlify, kosongkan atau set ke URL HTTPS produksi yang benar. URL preview tidak menggantikan canonical produksi. Panduan Google Search Console tersedia di `legal-tech-agency-project/SEO-GUIDE.md`.

## Domain Resmi

Registrar: Domainesia, dengan DNS eksternal tetap pada `nsx1.domainesia.com` dan `nsx2.domainesia.com`.

- Record A `@`: `75.2.60.5`, sesuai petunjuk Netlify untuk apex domain.
- Record CNAME `www`: `legaltechagency.netlify.app`.
- Primary domain Netlify: `legaltechagency.my.id`. Sertifikat TLS dikelola otomatis oleh Netlify; pastikan sertifikat valid sebelum mempublikasikan pengalihan alamat lama.
- `_redirects` pada output build mengarahkan subdomain Netlify lama dan `www` ke domain resmi dengan HTTP 301, tanpa mengubah jalur halaman.
- Pemilik melaporkan email aktivasi registrar sudah diverifikasi pada 2026-11-26. Jangan hapus atau ubah record email untuk migrasi website.
- Properti Domain Google Search Console sudah diverifikasi melalui TXT DNS untuk `legaltechagency@gmail.com` pada 2026-11-26. Pertahankan TXT verifikasi. Sitemap telah dikirim, tetapi pemrosesan laporan belum berhasil; detail ada di panduan SEO.

## Pengujian Lokal

```powershell
node legal-tech-agency-project/scripts/build.js
node --test legal-tech-agency-project/tests/web.test.js
node legal-tech-agency-project/scripts/preview.js
```

Panduan konten dan hasil pengujian tersedia di `legal-tech-agency-project/README.md` dan `legal-tech-agency-project/TEST-REPORT.md`. ZIP, backup demo, output build, dan log lokal tidak masuk Git.

Konfigurasi mengikuti [dokumentasi Netlify](https://docs.netlify.com/build/configure-builds/file-based-configuration/). Push GitHub hanya memicu deploy Netlify jika repositori sudah terhubung.

## Redirect Vercel Lama

`vercel.json` mengarahkan semua jalur deployment Vercel ke `https://legaltechagency.my.id/` melalui redirect permanen HTTP 308. Jalur halaman dan query string dipertahankan. Konfigurasi ini hanya dipakai Vercel; Netlify melayani domain resmi tanpa redirect balik. Vercel harus aktif agar redirect dari alamat Vercel lama berjalan; website utama di Netlify tidak bergantung padanya.
