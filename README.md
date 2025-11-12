<div align="center">

<img src="public/images/logo.webp" alt="Logo" width="120" height="120" />

# 🖥️ Visualisasi Algoritma Penjadwalan Proses CPU

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

<p align="center">
  <strong>Platform interaktif untuk memvisualisasikan dan memahami algoritma penjadwalan proses CPU</strong>
</p>

<p align="center">
  Ubah teori kompleks menjadi pemahaman visual dengan simulasi FCFS, SJF, dan Round Robin secara real-time
</p>

</div>

---

## 📋 Deskripsi

**Penjadwalan Proses CPU** adalah aplikasi web interaktif yang dirancang untuk membantu mahasiswa dan profesional memahami konsep penjadwalan proses pada sistem operasi. Aplikasi ini menyediakan visualisasi real-time dari berbagai algoritma penjadwalan CPU dengan representasi Gantt Chart yang dinamis.

### 🎯 Tujuan Proyek

- **Pemahaman Visual**: Daripada menggambar Gantt Chart manual, lihat bagaimana chart terbentuk secara dinamis
- **Perbandingan Algoritma**: Bandingkan hasil waiting time rata-rata dari FCFS, SJF, dan RR secara berdampingan
- **Validasi Mandiri**: Gunakan sebagai alat validasi untuk tugas dan latihan perhitungan penjadwalan proses

---

## ✨ Fitur Utama

### 🎨 Visualisasi Interaktif
- **Gantt Chart Dinamis**: Visualisasi real-time dari eksekusi proses
- **Animasi Smooth**: Transisi yang halus dan mudah dipahami
- **Responsive Design**: Tampilan optimal di berbagai ukuran layar

### 🔧 Algoritma Penjadwalan
Mendukung tiga algoritma penjadwalan CPU utama:

1. **FCFS (First-Come, First-Served)**
   - Proses dijalankan berdasarkan urutan kedatangan
   - Sederhana namun dapat mengalami convoy effect

2. **SJF (Shortest Job First)**
   - Prioritas pada proses dengan burst time terpendek
   - Meminimalkan average waiting time

3. **Round Robin**
   - Time-sharing dengan quantum time yang dapat dikonfigurasi
   - Adil untuk semua proses dengan context switching

### 📊 Analisis Performa
- **Waiting Time**: Waktu tunggu setiap proses
- **Turnaround Time**: Total waktu dari arrival hingga completion
- **Average Metrics**: Rata-rata waktu tunggu dan turnaround untuk setiap algoritma
- **Perbandingan Side-by-Side**: Bandingkan metrik dari berbagai algoritma secara bersamaan

### 🎓 Materi Pembelajaran
- **Teori Algoritma**: Penjelasan lengkap tentang setiap algoritma
- **Kelebihan & Kekurangan**: Analisis pro dan kontra setiap metode
- **FAQ Section**: Jawaban atas pertanyaan umum tentang penjadwalan proses

---

## 🚀 Teknologi yang Digunakan

### Frontend Framework
- **Next.js 14.2** - React framework dengan App Router
- **React 18** - Library UI untuk membangun interface
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Recharts** - Chart library untuk visualisasi

### State Management & Forms
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Conventional commits
- **JSON Server** - Mock REST API

---

## 📦 Instalasi

### Prasyarat
Pastikan Anda telah menginstal:
- **Node.js** (versi 18 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**
- **Git**

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd penjadwalan-proses-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Setup environment variables**
   
   File `.env` sudah tersedia dengan konfigurasi default:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **(Opsional) Jalankan JSON Server** untuk mock API
   
   Di terminal terpisah:
   ```bash
   npm run dev:json
   ```

6. **Buka aplikasi**
   
   Akses [http://localhost:3000](http://localhost:3000) di browser Anda

---

## 🎮 Cara Penggunaan

### 1. Landing Page
- Jelajahi fitur-fitur aplikasi
- Baca teori tentang algoritma penjadwalan
- Lihat demo interaktif

### 2. Halaman Visualisasi
1. **Input Proses**
   - Klik tombol "Tambah Proses"
   - Masukkan nama proses (alphanumeric, max 10 karakter)
   - Masukkan burst time (waktu eksekusi)
   - Proses akan ditambahkan ke daftar

2. **Pilih Algoritma**
   - FCFS (First-Come, First-Served)
   - SJF (Shortest Job First)
   - Round Robin (dengan input time quantum)

3. **Jalankan Simulasi**
   - Klik tombol "Run" atau "Jalankan"
   - Lihat Gantt Chart terbentuk secara real-time
   - Perhatikan animasi eksekusi proses

4. **Analisis Hasil**
   - Review tabel hasil dengan waiting time dan turnaround time
   - Bandingkan metrik antar algoritma
   - Export atau screenshot hasil untuk dokumentasi

---

<!-- ## 📁 Struktur Proyek

```
penjadwalan-proses-next/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (login, register)
│   ├── (user)/                   # User routes
│   ├── landing-page/             # Landing page
│   ├── visualization/            # Visualisasi algoritma
│   ├── _components/              # Shared components
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── core/                     # Core components
│   ├── shared/                   # Shared components
│   └── ui/                       # UI components (shadcn/ui)
├── lib/                          # Utility functions
│   ├── utils.ts                  # Helper functions
│   └── metadata.ts               # SEO metadata
├── schemas/                      # Zod validation schemas
│   ├── auth.ts                   # Auth validation
│   ├── process.ts                # Process validation
│   └── cashflow.ts               # Other schemas
├── services/                     # API services
│   └── fetcher.ts                # API fetcher utility
├── hooks/                        # Custom React hooks
├── actions/                      # Server actions
├── public/                       # Static assets
│   ├── icons/                    # Icons
│   └── images/                   # Images
├── .husky/                       # Git hooks
├── json/                         # Mock data for JSON server
└── ...config files               # Configuration files
```

--- -->

## 🛠️ Scripts yang Tersedia

```bash
# Development
npm run dev              # Jalankan development server
npm run dev:json         # Jalankan JSON Server (port 3001)

# Production
npm run build            # Build untuk production
npm run start            # Jalankan production server

# Code Quality
npm run lint             # Lint kode dengan ESLint
npm run test:tsc         # Type check dengan TypeScript
npm run lint:staged      # Lint staged files (Git hooks)

# Git Hooks
npm run prepare          # Setup Husky hooks
```

---

## 🎨 Fitur Development

### Code Quality Tools
- **Pre-commit Hook**: Auto-format dan lint sebelum commit
- **Commit Message Linting**: Conventional commits format
- **TypeScript Strict Mode**: Type safety maksimal
- **ESLint + Prettier**: Konsistensi kode

### Git Workflow
```bash
# Commit format yang didukung
feat: menambahkan fitur baru
fix: memperbaiki bug
docs: update dokumentasi
style: perubahan styling
refactor: refactoring kode
test: menambahkan test
chore: maintenance task
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Buat branch** untuk fitur Anda (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan Anda (`git commit -m 'feat: menambahkan AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Buat Pull Request**

### Guidelines
- Ikuti conventional commits format
- Pastikan kode lulus linting dan type checking
- Tambahkan dokumentasi untuk fitur baru
- Update README jika diperlukan

---

<!-- ## 📝 Roadmap

- [ ] Tambahkan algoritma Priority Scheduling
- [ ] Implementasi SRTF (Shortest Remaining Time First)
- [ ] Export hasil ke PDF/Excel
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Tutorial interaktif
- [ ] Perbandingan performa dengan grafik
- [ ] History simulasi pengguna

--- -->
<!-- 
## 📄 License

Project ini dibuat untuk tujuan edukasi. Silakan gunakan dan modifikasi sesuai kebutuhan pembelajaran Anda.

--- -->

## 👥 Tim Pengembang

Dikembangkan dengan ❤️ untuk membantu mahasiswa memahami konsep penjadwalan proses CPU.

---

<!-- ## 📞 Dukungan

Jika Anda menemukan bug atau memiliki saran, silakan buat issue di repository ini.

--- -->

<div align="center">

**⭐ Jangan lupa beri star jika project ini membantu Anda! ⭐**

Made with ❤️ using Next.js and React

</div>
