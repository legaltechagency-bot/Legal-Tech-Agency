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

## Vercel

Import repositori GitHub menggunakan root repositori (`./`). Jangan memilih folder ini sebagai Root Directory karena `vercel.json` berada satu tingkat di atasnya. Framework Preset adalah Other. Build command dan output directory otomatis mengikuti konfigurasi.

Build command: `node legal-tech-agency-project/scripts/build.js`.
Output directory: `legal-tech-agency-project/public`.

Header keamanan dan cache dikonfigurasi di `../vercel.json` serta digunakan oleh preview lokal. Konfigurasi Netlify sebelumnya sudah dihapus. Kode ini tidak memerlukan backend atau environment variable Supabase.

## Domain dan SEO

Build menentukan origin dari `SITE_URL`, kemudian `site.config.json`, kemudian `VERCEL_PROJECT_PRODUCTION_URL` dari Vercel. URL preview sementara tidak dipakai sebagai canonical. Untuk domain khusus, gunakan URL HTTPS lengkap di `SITE_URL` lalu redeploy.

URL produksi telah ditetapkan ke `https://legaltechagency.vercel.app/`. Build lokal dan Vercel menghasilkan canonical URL, Open Graph, sitemap, dan robots.txt untuk domain ini. Data terstruktur bisnis menggunakan microdata sehingga tetap bekerja dengan Content Security Policy tanpa mengizinkan inline JavaScript.

Search Console telah diverifikasi dengan HTML tag pada 2026-10-07. Google berhasil memproses sitemap (6 halaman ditemukan), dan homepage berstatus diindeks. Permintaan pengindeksan ulang terbaru ditolak karena kuota harian; detail hasil dan panduan pemeliharaan tersedia di `SEO-GUIDE.md`. Pertahankan token asli di `googleSiteVerification` atau `GOOGLE_SITE_VERIFICATION` di Vercel.

## Mengubah Konten

Edit `index.html` untuk isi website, `styles.css` untuk tampilan, dan `contact.js` untuk pesan WhatsApp. Layanan, FAQ, alamat, serta nomor PIC ada di HTML. Setelah perubahan, jalankan build atau push ke branch yang terhubung dengan Vercel untuk redeploy.

Desain menggunakan aset lokal. Google Maps dan WhatsApp memerlukan internet. Publikasi hanya menggunakan output build; backup demo, ZIP, log, dokumentasi, dan alat pengujian bukan konten publik.

Konfigurasi mengikuti [dokumentasi Vercel](https://vercel.com/docs/project-configuration/vercel-json). Push GitHub bukan bukti website sudah live: import atau hubungkan repositori ke Vercel lalu periksa hasil deployment.
