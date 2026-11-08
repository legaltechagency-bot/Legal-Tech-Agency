# SEO dan Google Search Console

URL utama: https://legaltechagency.netlify.app/

## Yang Sudah Diterapkan

- Judul SEO dan judul berbagi: `Legal Tech Agency | Legalitas & Solusi Digital`, tanpa nama kota. Deskripsi dan alamat bisnis tetap mencantumkan lokasi Tangerang.
- Satu H1 brand, hierarki heading, konten HTML statis, dan tautan layanan yang bisa dibaca tanpa JavaScript.
- Canonical, sitemap, robots, Open Graph, dan Twitter card memakai origin produksi yang sama.
- Microdata WebSite, LocalBusiness, dan PostalAddress sesuai nama, kontak, alamat, dan jam yang tampil di website.
- Tidak ada klaim rating, ulasan palsu, atau klaim sebagai kantor hukum dalam data terstruktur.
- Halaman 404 mengirim HTTP 404 dan ditandai noindex. Halaman utama mengizinkan indexing.
- Tidak menambah tracker, cookie, login, database, atau Supabase.

## Verifikasi Search Console

Properti lama `https://legaltechagency.vercel.app/` sudah diverifikasi pada 2026-10-07, dan Google saat itu melaporkan homepage diindeks serta 6 halaman ditemukan dari sitemap. Status tersebut tidak berlaku untuk domain Netlify.

Pada 2026-11-08, Google mengonfirmasi kepemilikan properti URL Prefix `https://legaltechagency.netlify.app/` untuk `legaltechagency@gmail.com` melalui tag HTML. `sitemap.xml` berhasil dikirim. Status pemrosesan sitemap dan pengindeksan URL baru belum diperiksa. Pertahankan tag yang sudah terpasang pada homepage.

Langkah untuk menyiapkan ulang atau memelihara properti:

1. Masuk ke https://search.google.com/search-console menggunakan akun Google pemilik website.
2. Tambahkan properti URL Prefix `https://legaltechagency.netlify.app/`.
3. Pilih HTML tag. Google memberikan meta `google-site-verification`.
4. Masukkan hanya nilai `content` yang ditampilkan untuk properti baru ke `googleSiteVerification` di `site.config.json`, atau set environment variable Netlify `GOOGLE_SITE_VERIFICATION` dengan scope Builds. Jangan masukkan keseluruhan tag HTML.
5. Build/deploy ulang, periksa tag pada sumber halaman utama, lalu klik Verify di Search Console.
6. Pada Sitemaps di properti baru, kirim `sitemap.xml`.
7. Pada URL Inspection, periksa URL utama, lakukan Test Live URL, lalu Request Indexing jika memenuhi syarat.

Nilai null tidak menghasilkan tag verifikasi. Setelah verifikasi berhasil, pertahankan tag untuk properti baru. Tag contoh dari pengujian tidak dipublikasikan. Token HTML ini bukan password akun Google; jangan berikan password atau kode OTP kepada orang lain.

## Pemeriksaan Setelah Deployment

- Halaman utama: HTTP 200, tidak meminta login, tidak memiliki noindex atau header X-Robots-Tag yang melarang indexing.
- Canonical tepat `https://legaltechagency.netlify.app/`, bukan URL preview atau Vercel.
- `robots.txt` dan `sitemap.xml` dapat diakses dengan HTTP 200.
- URL yang tidak ada dan jalur admin lama mengembalikan HTTP 404, bukan halaman utama dengan HTTP 200.
- Validasi data terstruktur dengan https://search.google.com/test/rich-results dan gunakan URL Inspection untuk melihat akses Google.

Jika deployment Vercel lama dapat diaktifkan lagi, arahkan URL lama dengan redirect permanen ke URL Netlify yang sepadan setelah Netlify aktif. Redirect lintas domain harus disajikan oleh host lama. Jangan hapus properti lama dari Search Console jika masih diperlukan untuk memantau migrasi.

SEO teknis dan sitemap membantu discovery, tetapi bukan jaminan pengindeksan seluruh halaman, rich result, atau peringkat pertama. Google menentukan kapan sebuah halaman di-crawl dan apakah layak ditampilkan.

Panduan resmi: [pindah domain](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [meminta crawl ulang](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [verifikasi Search Console](https://support.google.com/webmasters/answer/9008080), dan [data terstruktur LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
