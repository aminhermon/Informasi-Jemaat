# 📱 App Jemaat — PWA

Aplikasi manajemen data jemaat gereja berbasis **Progressive Web App (PWA)** yang bisa diinstal di HP maupun komputer.

---

## 🚀 Cara Deploy ke GitHub Pages

### Langkah 1 — Buat Repository

1. Buka [github.com](https://github.com) → klik **"New repository"**
2. Nama repository: `app-jemaat` *(atau nama lain sesuai keinginan)*
3. Set **Public** *(wajib untuk GitHub Pages gratis)*
4. Jangan centang "Initialize with README" → klik **Create repository**

---

### Langkah 2 — Upload File

#### Cara A: Melalui Web (Tanpa Git)

1. Di halaman repository baru, klik **"uploading an existing file"**
2. Upload **semua file berikut** sekaligus (drag & drop):
   ```
   index.html
   manifest.json
   sw.js
   404.html
   .nojekyll
   favicon-16.png
   favicon-32.png
   icons/
     ├── icon-72.png
     ├── icon-96.png
     ├── icon-128.png
     ├── icon-144.png
     ├── icon-152.png
     ├── icon-180.png
     ├── icon-192.png
     ├── icon-384.png
     ├── icon-512.png
     └── apple-touch-icon.png
   ```
3. Scroll ke bawah → klik **"Commit changes"**

> ⚠️ **Penting:** Untuk folder `icons/`, GitHub Web tidak bisa upload folder langsung.  
> Gunakan cara ini: klik **"Add file" → "Upload files"**, lalu drag semua file isi folder `icons/` dan ubah pathnya menjadi `icons/icon-72.png` dst di commit message.  
> Atau gunakan Cara B (Git) yang lebih mudah untuk struktur folder.

#### Cara B: Melalui Git (Direkomendasikan)

```bash
# 1. Buka terminal/command prompt, masuk ke folder hasil extract
cd app-jemaat

# 2. Inisialisasi git
git init
git add .
git commit -m "Initial commit: App Jemaat PWA"

# 3. Hubungkan ke GitHub (ganti USERNAME dan REPONAME)
git remote add origin https://github.com/USERNAME/app-jemaat.git
git branch -M main
git push -u origin main
```

---

### Langkah 3 — Aktifkan GitHub Pages

1. Di repository GitHub, klik tab **Settings**
2. Scroll ke bagian **Pages** (menu kiri)
3. Di **Source**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
4. Klik **Save**
5. Tunggu ~1–2 menit, lalu URL app muncul:
   ```
   https://USERNAME.github.io/app-jemaat/
   ```

---

### Langkah 4 — Update Service Worker URL (Penting!)

Karena GitHub Pages memakai path `/app-jemaat/`, buka `sw.js` dan update baris ini:

```js
// Sebelum:
const APP_SHELL = ['/', '/index.html', '/manifest.json', ...];

// Sesudah (ganti app-jemaat dengan nama repo kamu):
const APP_SHELL = [
  '/app-jemaat/',
  '/app-jemaat/index.html',
  '/app-jemaat/manifest.json',
  '/app-jemaat/icons/icon-192.png',
  '/app-jemaat/icons/icon-512.png',
];
```

Dan update `manifest.json`:
```json
{
  "start_url": "/app-jemaat/",
  "scope": "/app-jemaat/"
}
```

---

## 📲 Cara Instal PWA di HP

### Android (Chrome):
1. Buka URL app di Chrome
2. Tunggu beberapa detik → muncul banner **"Tambahkan ke layar utama"**
3. Atau: ketuk menu ⋮ → **"Instal aplikasi"** / **"Tambahkan ke layar utama"**

### iOS (Safari):
1. Buka URL app di Safari *(wajib Safari, bukan Chrome)*
2. Ketuk tombol **Bagikan** (kotak dengan panah atas)
3. Pilih **"Tambahkan ke Layar Utama"**
4. Ketuk **Tambahkan**

### Desktop (Chrome/Edge):
1. Buka URL app
2. Di address bar, klik ikon **instal** (monitor/plus) di ujung kanan
3. Atau: menu ⋮ → **"Instal App Jemaat"**

---

## 🗂️ Struktur File

```
app-jemaat/
├── index.html          ← Aplikasi utama
├── manifest.json       ← Konfigurasi PWA
├── sw.js               ← Service Worker (offline & cache)
├── 404.html            ← Redirect untuk GitHub Pages
├── .nojekyll           ← Nonaktifkan Jekyll GitHub
├── favicon-16.png
├── favicon-32.png
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-180.png     ← Apple Touch Icon
    ├── icon-192.png     ← Android launcher
    ├── icon-384.png
    ├── icon-512.png     ← Splash screen
    └── apple-touch-icon.png
```

---

## ✅ Checklist PWA

- [x] Web App Manifest (`manifest.json`)
- [x] Service Worker dengan cache offline
- [x] Icons semua ukuran (72–512px)
- [x] Apple Touch Icon (iOS)
- [x] Theme color & background color
- [x] Standalone display mode
- [x] Install prompt (A2HS button)
- [x] Update notification banner
- [x] 404 redirect untuk SPA

---

## 🔧 Kustomisasi

### Ubah nama aplikasi
Edit `manifest.json`:
```json
"name": "Nama Gereja Anda",
"short_name": "Nama Singkat"
```

### Ubah warna tema
Edit `manifest.json` dan `<meta name="theme-color">` di `index.html`:
```json
"theme_color": "#1e3a5f",
"background_color": "#142843"
```

---

*Dibuat dengan ❤️ menggunakan Claude AI*
