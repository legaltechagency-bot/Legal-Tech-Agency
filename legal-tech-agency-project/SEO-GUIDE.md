# SEO dan Google Search Console

URL utama: https://legaltechagency.my.id/

Hosting tetap Netlify. Domainesia mengelola registrasi dan DNS; tidak diperlukan hosting atau database Domainesia untuk website statis ini.

## Yang Sudah Diterapkan

- Judul SEO dan judul berbagi: `Legal Tech Agency | Legalitas & Solusi Digital`, tanpa nama kota. Deskripsi dan alamat bisnis tetap mencantumkan lokasi Tangerang.
- Satu H1 brand, hierarki heading, konten HTML statis, dan tautan layanan yang bisa dibaca tanpa JavaScript.
- Canonical, sitemap, robots, Open Graph, dan Twitter card memakai origin produksi yang sama.
- Microdata WebSite, LocalBusiness, dan PostalAddress sesuai nama, kontak, alamat, dan jam yang tampil di website.
- Tidak ada klaim rating, ulasan palsu, atau klaim sebagai kantor hukum dalam data terstruktur.
- Halaman 404 mengirim HTTP 404 dan ditandai noindex. Halaman utama mengizinkan indexing.
- Sejak 2026-11-21, hanya homepage dimasukkan ke sitemap. Disclaimer dan empat halaman kebijakan lainnya memakai `noindex, follow`, tetap HTTP 200, dan tetap dapat dibuka dari footer. Halaman tersebut tidak diblokir di robots.txt agar Google dapat membaca noindex.
- Tidak menambah tracker, cookie, login, database, atau Supabase.

## Verifikasi Search Console

Properti lama `https://legaltechagency.vercel.app/` sudah diverifikasi pada 2026-10-07, dan Google saat itu melaporkan homepage diindeks serta 6 halaman ditemukan dari sitemap. Status tersebut tidak berlaku untuk domain Netlify.

Pada 2026-11-08, Google mengonfirmasi kepemilikan properti URL Prefix `https://legaltechagency.netlify.app/` untuk `legaltechagency@gmail.com` melalui tag HTML. Homepage lama kemudian dikonfirmasi diindeks pada pemeriksaan 2026-11-24 dan 2026-11-26. Status tersebut bukan verifikasi atau indeks otomatis untuk `legaltechagency.my.id`. Token lama dipertahankan, tetapi token properti baru harus mengikuti nilai yang diberikan Google.

Pada 2026-11-26, Google mengonfirmasi kepemilikan properti Domain `sc-domain:legaltechagency.my.id` untuk `legaltechagency@gmail.com` melalui TXT DNS di Domainesia. Properti ini mencakup seluruh protokol dan subdomain. Pertahankan TXT `google-site-verification=O8fjCo865Rwn6ChWmVJPa1aI-U3WOEiAyq-CdNnfVMY`; record A dan CNAME tetap dipertahankan. Tidak perlu mengganti token HTML lama untuk verifikasi DNS ini.

Sitemap `https://legaltechagency.my.id/sitemap.xml` sudah dikirim dan dikirim ulang setelah uji langsung. Google menerima pengiriman, tetapi laporan masih menampilkan `Tidak dapat mengambil peta situs` dengan 0 halaman ditemukan. Uji URL aktif Google terhadap sitemap melaporkan crawl diizinkan dan pengambilan halaman berhasil. Pemeriksaan publik juga mengonfirmasi HTTP 200, Content-Type application/xml, XML valid, dan robots.txt yang mengizinkan crawl. Penyebab kegagalan pemrosesan laporan belum dipastikan; keberhasilan akses tidak sama dengan keberhasilan pemrosesan sitemap atau indeks homepage. Periksa lagi laporan ini sebelum menyatakan sitemap berhasil. Tidak ada permintaan pengindeksan baru yang dilakukan pada sesi ini.

Langkah alternatif untuk menyiapkan properti URL Prefix (tidak diperlukan untuk properti Domain yang sudah diverifikasi):

1. Masuk ke https://search.google.com/search-console menggunakan akun Google pemilik website.
2. Setelah HTTPS aktif, tambahkan properti URL Prefix `https://legaltechagency.my.id/` (atau properti Domain melalui TXT DNS).
3. Pilih HTML tag. Google memberikan meta `google-site-verification`.
4. Masukkan hanya nilai `content` yang ditampilkan untuk properti baru ke `googleSiteVerification` di `site.config.json`, atau set environment variable Netlify `GOOGLE_SITE_VERIFICATION` dengan scope Builds. Jangan masukkan keseluruhan tag HTML.
5. Build/deploy ulang, periksa tag pada sumber halaman utama, lalu klik Verify di Search Console.
6. Pada Sitemaps di properti baru, kirim `sitemap.xml`.
7. Pada URL Inspection, periksa URL utama, lakukan Test Live URL, lalu Request Indexing jika memenuhi syarat.

Nilai null tidak menghasilkan tag verifikasi. Setelah verifikasi berhasil, pertahankan tag untuk properti baru. Tag contoh dari pengujian tidak dipublikasikan. Token HTML ini bukan password akun Google; jangan berikan password atau kode OTP kepada orang lain.

## Pemeriksaan Setelah Deployment

- Halaman utama: HTTP 200, tidak meminta login, tidak memiliki noindex atau header X-Robots-Tag yang melarang indexing.
- Canonical tepat `https://legaltechagency.my.id/`, bukan subdomain Netlify, URL preview, atau Vercel.
- `robots.txt` dan `sitemap.xml` dapat diakses dengan HTTP 200.
- URL yang tidak ada dan jalur admin lama mengembalikan HTTP 404, bukan halaman utama dengan HTTP 200.
- Validasi data terstruktur dengan https://search.google.com/test/rich-results dan gunakan URL Inspection untuk melihat akses Google.

`_redirects` memakai HTTP 301 dari subdomain Netlify lama dan `www` ke jalur domain resmi yang sepadan. Konfigurasi `../vercel.json` memakai HTTP 308 ke domain resmi untuk deployment Vercel yang masih aktif. Publikasikan pengalihan hanya setelah HTTPS domain resmi valid. Periksa status, Location, query string, dan hasil akhir tanpa loop. Jangan hapus properti lama dari Search Console jika masih diperlukan untuk memantau migrasi. Redirect tidak menjamin homepage domain baru langsung diindeks.

SEO teknis dan sitemap membantu discovery, tetapi bukan jaminan pengindeksan seluruh halaman, rich result, atau peringkat pertama. Google menentukan kapan sebuah halaman di-crawl dan apakah layak ditampilkan.

Hasil Disclaimer lama di Google tidak langsung hilang setelah deployment. Google perlu mengikuti redirect yang masih tersedia dan membaca noindex pada halaman domain resmi. Jangan mengarahkan semua halaman kebijakan ke homepage atau mengganti canonical kebijakan menjadi homepage; halaman tersebut memiliki isi berbeda. Aturan ini tidak menjamin homepage langsung muncul sebagai hasil pertama.

Panduan resmi: [pindah domain](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [meminta crawl ulang](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [verifikasi Search Console](https://support.google.com/webmasters/answer/9008080), dan [data terstruktur LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
