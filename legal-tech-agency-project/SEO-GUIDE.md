# SEO dan Google Search Console

URL utama: https://legaltechagency.vercel.app/

## Yang Sudah Diterapkan

- Judul SEO dan judul berbagi: `Legal Tech Agency | Legalitas & Solusi Digital`, tanpa nama kota. Deskripsi dan alamat bisnis tetap mencantumkan lokasi Tangerang.
- Satu H1 brand, hierarki heading, konten HTML statis, dan tautan layanan yang bisa dibaca tanpa JavaScript.
- Canonical, sitemap, robots, Open Graph, dan Twitter card memakai origin produksi yang sama.
- Microdata WebSite, LocalBusiness, dan PostalAddress sesuai nama, kontak, alamat, dan jam yang tampil di website.
- Tidak ada klaim rating, ulasan palsu, atau klaim sebagai kantor hukum dalam data terstruktur.
- Halaman 404 mengirim HTTP 404 dan ditandai noindex. Halaman utama mengizinkan indexing.
- Tidak menambah tracker, cookie, login, database, atau Supabase.

## Verifikasi Search Console

Status aktual pada 2026-10-07 untuk akun pemilik `legaltechagency@gmail.com`:

- Kepemilikan URL Prefix `https://legaltechagency.vercel.app/` berhasil diverifikasi dengan HTML tag yang sudah terpasang di homepage produksi.
- `sitemap.xml` berhasil dikirim dan diproses Google; 6 halaman ditemukan. Ini bukan berarti keenam halaman sudah diindeks.
- URL Inspection homepage menampilkan "URL ada di Google", "Halaman diindeks", dan halaman ditayangkan melalui HTTPS.
- Permintaan pengindeksan ulang dicoba, tetapi ditolak dengan "Kuota Terlampaui" (kuota harian). Permintaan baru belum diterima; Google meminta mencoba kembali besok.
- Jangan hapus tag verifikasi dari konfigurasi atau homepage setelah verifikasi berhasil.

Langkah pemeliharaan atau verifikasi ulang:

1. Masuk ke https://search.google.com/search-console menggunakan akun Google pemilik website.
2. Tambahkan properti URL Prefix `https://legaltechagency.vercel.app/`.
3. Pilih HTML tag. Google memberikan meta `google-site-verification`.
4. Masukkan hanya nilai `content` dari tag ke `googleSiteVerification` di `site.config.json`, atau set environment variable Vercel `GOOGLE_SITE_VERIFICATION` dengan nilai yang sama. Jangan masukkan keseluruhan tag HTML.
5. Build/deploy ulang, periksa tag pada sumber halaman utama, lalu klik Verify di Search Console.
6. Pada Sitemaps, kirim `sitemap.xml`.
7. Pada URL Inspection, periksa URL utama, lakukan Test Live URL, lalu Request Indexing jika memenuhi syarat.

Nilai null tidak menghasilkan tag verifikasi. Tag contoh dari pengujian tidak dipublikasikan. Token HTML ini bukan password akun Google; jangan berikan password atau kode OTP kepada orang lain.

## Pemeriksaan Setelah Deployment

- Halaman utama: HTTP 200, tidak meminta login, tidak memiliki noindex atau header X-Robots-Tag yang melarang indexing.
- Canonical tepat `https://legaltechagency.vercel.app/`, bukan URL preview atau Netlify.
- `robots.txt` dan `sitemap.xml` dapat diakses dengan HTTP 200.
- URL yang tidak ada dan jalur admin lama mengembalikan HTTP 404, bukan halaman utama dengan HTTP 200.
- Validasi data terstruktur dengan https://search.google.com/test/rich-results dan gunakan URL Inspection untuk melihat akses Google.

SEO teknis dan sitemap membantu discovery, tetapi bukan jaminan pengindeksan seluruh halaman, rich result, atau peringkat pertama. Google menentukan kapan sebuah halaman di-crawl dan apakah layak ditampilkan. Status Search Console di atas diperiksa langsung melalui akun pemilik, bukan disimpulkan dari pengujian kode.

Panduan resmi: [meminta crawl ulang](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [verifikasi Search Console](https://support.google.com/webmasters/answer/9008080), dan [data terstruktur LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
