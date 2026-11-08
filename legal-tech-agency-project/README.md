# Legal Tech Agency: Website Statis

Laman profil dan layanan dengan konsultasi melalui WhatsApp PIC +62 851-8176-0072. Tidak ada akun, dashboard admin, Insight, formulir, database, Supabase, atau penyimpanan data browser. Konten utama, produk, dan FAQ sudah tersedia di HTML tanpa JavaScript.

## Build dan Preview

Dari folder ini:

```powershell
node scripts/build.js
node --test tests/web.test.js
node scripts/preview.js
```

Tidak diperlukan pemasangan dependency. Node.js 22 atau lebih baru hanya diperlukan untuk build, tes, dan preview lokal; hasil build berjalan sebagai HTML/CSS/JavaScript statis. Hanya folder `public` yang dipublikasikan.

## Netlify

Hubungkan proyek Netlify yang sudah ada ke branch `main` repositori GitHub. Gunakan root repositori (`./`) sebagai Base directory dan kosongkan Package directory agar Netlify memakai `../netlify.toml`.

Build command: `node legal-tech-agency-project/scripts/build.js`.
Publish directory: `legal-tech-agency-project/public`.

Build menyalin `_headers` ke `public` sehingga header keamanan dan cache ikut dalam deploy Git maupun ZIP. Preview lokal juga membaca file tersebut. Website tetap statis dan tidak membutuhkan backend.

## Domain dan SEO

Build menentukan origin dari `SITE_URL` atau `site.config.json`. URL preview sementara tidak dipakai sebagai canonical. Untuk domain khusus, gunakan URL HTTPS lengkap di `SITE_URL` lalu redeploy.

URL produksi ditetapkan ke `https://legaltechagency.netlify.app/`. Build menghasilkan canonical URL, Open Graph, sitemap, dan robots.txt untuk domain ini. Data terstruktur bisnis menggunakan microdata sehingga tetap bekerja dengan Content Security Policy tanpa mengizinkan inline JavaScript.

Properti Netlify sudah diverifikasi di Google Search Console melalui tag HTML pada 2026-11-08 dan sitemap berhasil dikirim. Pertahankan tag verifikasi yang baru. Panduan pemeliharaan tersedia di `SEO-GUIDE.md`.

## Mengubah Konten

Edit `index.html` untuk isi website, `styles.css` untuk tampilan, dan `contact.js` untuk pesan WhatsApp. Layanan, FAQ, alamat, serta nomor PIC ada di HTML. Setelah perubahan, jalankan build atau push ke branch yang terhubung dengan Netlify untuk redeploy.

Desain menggunakan aset lokal. Google Maps dan WhatsApp memerlukan internet. Publikasi hanya menggunakan output build; backup demo, ZIP, log, dokumentasi, dan alat pengujian bukan konten publik.

Deploy manual: unggah `legal-tech-agency-static-public.zip` di tab Deploys proyek Netlify yang sudah ada. Jangan unggah ZIP proyek atau backup demo sebagai konten publik.
