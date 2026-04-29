# 💍 Undangan Pernikahan Digital — Arjuna & Sinta

Template undangan pernikahan digital lengkap berbasis HTML/CSS/JS murni.  
Tidak memerlukan backend — semua berjalan di browser.

---

## 📁 Struktur File

```
wedding-invitation/
├── index.html          ← Halaman utama undangan
├── css/
│   └── style.css       ← Semua styling
├── js/
│   └── main.js         ← Logika interaktif
└── assets/             ← Foto & media (tambahkan manual)
    ├── groom.jpg       ← Foto mempelai pria
    ├── bride.jpg       ← Foto mempelai wanita
    ├── photo1.jpg      ← Foto galeri 1–6
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    ├── photo6.jpg
    ├── floral.png      ← Ornamen bunga (opsional)
    └── music.mp3       ← Musik latar (opsional)
```

---

## ✏️ Cara Edit Konten

### 1. Ubah Nama Mempelai
Buka `index.html`, cari dan ganti:
- `Arjuna Pratama, S.T.` → nama pria
- `Sinta Rahayu, S.Pd.` → nama wanita
- `Arjuna` & `Sinta` di bagian cover dan closing

### 2. Ubah Tanggal & Waktu
Di `index.html`:
- Ganti semua `14 Juni 2025` dengan tanggal pernikahan Anda

Di `js/main.js`:
```js
const WEDDING_DATE = new Date('2025-06-14T08:00:00');
// Ganti dengan: new Date('YYYY-MM-DDTHH:MM:SS')
```

### 3. Ubah Lokasi Acara
Di `index.html`, cari bagian "Akad Nikah" dan "Resepsi", ubah:
- Nama tempat
- Alamat
- Link Google Maps (ganti parameter `q=`)

### 4. Ubah Data Orang Tua
Di `index.html`, cari `Bapak Hendra Wijaya` dll, ganti dengan nama orang tua masing-masing.

### 5. Ubah Nomor Rekening
Di `index.html`, ganti `1234567890` dan `0987654321` dengan nomor rekening Anda.

### 6. Ganti Foto
Letakkan foto ke folder `assets/`:
- `groom.jpg` — foto mempelai pria (rasio 1:1 disarankan)
- `bride.jpg` — foto mempelai wanita (rasio 1:1 disarankan)
- `photo1.jpg` s/d `photo6.jpg` — foto galeri

### 7. Tambah Musik Latar
Letakkan file `music.mp3` ke folder `assets/`.
Musik gratis bisa diunduh dari: https://pixabay.com/music/

### 8. Personalisasi Nama Tamu (via URL)
Kirimkan link dengan parameter `?to=NamaTamu`:
```
https://namadomain.com?to=Bapak%20Budi%20Santoso
```
Nama tamu akan otomatis tampil di cover undangan.

---

## 🚀 PANDUAN DEPLOY — GitHub Pages (Gratis & Mudah)

### Prasyarat
- Akun GitHub (daftar gratis di https://github.com)

### Langkah 1: Buat Repository Baru
1. Login ke GitHub
2. Klik tombol **"New"** (hijau) di kiri atas
3. Isi nama repository, misal: `undangan-arjuna-sinta`
4. Centang **"Public"** (wajib untuk GitHub Pages gratis)
5. Klik **"Create repository"**

### Langkah 2: Upload File

**Cara A — Drag & Drop (Tanpa install apapun):**
1. Buka repository yang baru dibuat
2. Klik **"uploading an existing file"** atau tombol **"Add file → Upload files"**
3. Drag & drop SEMUA file dan folder (`index.html`, `css/`, `js/`, `assets/`)
4. Scroll ke bawah, klik **"Commit changes"**

**Cara B — Via Git (Untuk yang familiar):**
```bash
git init
git add .
git commit -m "Initial upload undangan pernikahan"
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### Langkah 3: Aktifkan GitHub Pages
1. Di repository, klik tab **"Settings"**
2. Di sidebar kiri, klik **"Pages"**
3. Di bagian **"Branch"**, pilih: `main` → folder: `/ (root)`
4. Klik **"Save"**
5. Tunggu 1–3 menit
6. URL undangan Anda akan muncul:  
   `https://USERNAME.github.io/NAMA-REPO/`

### Langkah 4: Custom Domain (Opsional)
Jika punya domain sendiri (misal dari Niagahoster/Rumahweb):
1. Di Settings → Pages → Custom domain, masukkan domain Anda
2. Di pengaturan DNS domain, tambahkan CNAME record:
   - Name: `www`
   - Value: `USERNAME.github.io`
3. Centang **"Enforce HTTPS"**

---

## 🚀 PANDUAN DEPLOY — Netlify (Alternatif, Lebih Mudah)

### Cara Drag & Drop (Paling Simpel!)
1. Buka https://netlify.com → **Sign up gratis**
2. Setelah login, buka https://app.netlify.com/drop
3. **Drag & drop seluruh folder** `wedding-invitation/` ke area upload
4. Tunggu 30 detik
5. Netlify langsung memberi URL seperti: `https://amazing-name-123.netlify.app`
6. Untuk ubah nama URL: Site settings → Change site name

### Custom Domain di Netlify
- Domain settings → Add custom domain → ikuti instruksi DNS

---

## 🚀 PANDUAN DEPLOY — Cloudflare Pages

1. Buka https://pages.cloudflare.com → login/daftar
2. Klik **"Create a project"** → **"Direct Upload"**
3. Upload folder proyek
4. Deploy otomatis, URL: `https://PROYEK.pages.dev`

---

## 🎁 Fitur Lengkap

| Fitur | Keterangan |
|---|---|
| Cover interaktif | Animasi kelopak bunga, nama tamu dari URL |
| Bismillah | Teks Arab di bagian cover |
| Profil mempelai | Foto + nama + nama orang tua + IG link |
| Countdown timer | Hitung mundur real-time ke hari pernikahan |
| Add to Calendar | Tombol tambah ke Google Calendar |
| Detail acara | Akad + Resepsi dengan link Google Maps |
| Galeri foto | 6 foto + lightbox klik untuk zoom |
| RSVP | Form konfirmasi kehadiran + ucapan |
| Ucapan tersimpan | Data RSVP tersimpan di localStorage browser |
| Hadiah digital | Info rekening bank + tombol salin |
| Alamat kirim hadiah | Alamat fisik mempelai |
| Musik latar | Toggle play/pause, auto-play saat buka |
| Bagikan via WA | Share otomatis via WhatsApp |
| Salin link | Copy URL undangan |
| Animasi scroll | Elemen muncul saat discroll |
| Nama tamu via URL | Personalisasi nama di link |
| Responsif mobile | Tampil baik di HP & desktop |
| Dark/light sections | Pergantian tema gelap-terang elegan |

---

## 💡 Tips & Catatan

- **Foto**: Gunakan foto dengan ukuran < 500KB agar loading cepat.  
  Kompres di https://squoosh.app
- **Musik**: Format MP3, ukuran < 3MB. Unduh gratis di https://pixabay.com/music/
- **RSVP**: Data tersimpan di browser tamu (localStorage). Untuk database terpusat, integrasikan dengan **Google Sheets via Google Apps Script** atau **Supabase**.
- **WhatsApp**: Kirim link berbeda untuk tiap tamu:  
  `?to=Bapak%20Ahmad` — nama akan muncul otomatis di cover
