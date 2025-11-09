import { Metadata } from 'next'

export const siteConfig = {
  name: 'TurboSched',
  url: 'https://turbosched.vercel.app',
  ogImage: '/images/logo.webp',
  logo: '/images/logo.webp',
  description: 'Platform visualisasi penjadwalan proses CPU interaktif dengan algoritma FCFS, SJF, dan Round Robin',
  keywords: [
    'penjadwalan proses',
    'cpu scheduling',
    'visualisasi algoritma',
    'manajemen proses',
    'sistem operasi',
    'FCFS',
    'SJF',
    'Round Robin',
    'process scheduling',
    'TurboSched',
    'simulasi cpu',
    'pembelajaran sistem operasi',
    'edukasi komputer'
  ]
}

type MetadataConfig = {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title: string
    description: string
    type: 'website' | 'article'
  }
}

export const routeMetadata: Record<string, MetadataConfig> = {
  '/': {
    title: 'TurboSched - Visualisasi Penjadwalan Proses CPU Interaktif',
    description: 'Platform interaktif untuk memahami dan memvisualisasikan algoritma penjadwalan proses CPU. Pelajari FCFS, SJF, Priority, dan Round Robin dengan simulasi real-time yang mudah dipahami.',
    keywords: ['dashboard penjadwalan', 'cpu scheduler', 'visualisasi proses', 'simulator sistem operasi'],
    openGraph: {
      title: 'TurboSched - Visualisasi Penjadwalan Proses CPU',
      description: 'Platform interaktif untuk memahami algoritma penjadwalan proses CPU dengan visualisasi real-time',
      type: 'website'
    }
  },
  '/landing-page': {
    title: 'TurboSched - Pelajari Penjadwalan CPU dengan Mudah | Simulator Interaktif',
    description: 'Tingkatkan pemahaman Anda tentang penjadwalan proses CPU dengan TurboSched. Platform visualisasi interaktif yang menyajikan algoritma FCFS, SJF, Priority, dan Round Robin secara intuitif untuk mahasiswa dan profesional.',
    keywords: ['pembelajaran cpu scheduling', 'tutorial penjadwalan proses', 'sistem operasi interaktif', 'edukasi komputer'],
    openGraph: {
      title: 'TurboSched - Platform Pembelajaran Penjadwalan CPU Interaktif',
      description: 'Pelajari algoritma penjadwalan proses CPU dengan visualisasi interaktif yang mudah dipahami',
      type: 'website'
    }
  },
  '/visualization': {
    title: 'Visualisasi Algoritma CPU Scheduling - TurboSched | FCFS, SJF, Priority, RR',
    description: 'Jelajahi dan visualisasikan berbagai algoritma penjadwalan CPU secara real-time. Simulasi FCFS, SJF, Priority Scheduling, dan Round Robin dengan grafik Gantt Chart interaktif dan analisis performa lengkap.',
    keywords: ['gantt chart cpu', 'simulasi penjadwalan', 'algoritma scheduling', 'visualisasi real-time', 'perbandingan algoritma'],
    openGraph: {
      title: 'Visualisasi Algoritma CPU Scheduling Real-Time - TurboSched',
      description: 'Simulasi dan analisis algoritma penjadwalan proses CPU dengan Gantt Chart interaktif',
      type: 'website'
    }
  },
  '/login': {
    title: 'Masuk ke TurboSched - Akses Dashboard Penjadwalan CPU Anda',
    description: 'Masuk ke akun TurboSched Anda untuk mengakses simulator penjadwalan proses CPU, menyimpan simulasi, dan melacak progress pembelajaran Anda.',
    keywords: ['login turbosched', 'masuk dashboard', 'akses simulator cpu'],
    openGraph: {
      title: 'Masuk - TurboSched',
      description: 'Akses dashboard penjadwalan CPU interaktif Anda',
      type: 'website'
    }
  },
  '/register': {
    title: 'Daftar Gratis di TurboSched - Mulai Belajar Penjadwalan CPU',
    description: 'Buat akun TurboSched gratis dan mulai mempelajari algoritma penjadwalan proses CPU. Akses penuh ke simulator interaktif, simpan progress, dan tingkatkan kemampuan sistem operasi Anda.',
    keywords: ['daftar turbosched', 'akun gratis', 'registrasi simulator cpu', 'belajar sistem operasi'],
    openGraph: {
      title: 'Daftar Gratis - TurboSched',
      description: 'Mulai perjalanan pembelajaran penjadwalan CPU Anda dengan akun gratis',
      type: 'website'
    }
  },
  '/not-found': {
    title: '404 - Halaman Tidak Ditemukan | TurboSched',
    description: 'Halaman yang Anda cari tidak ditemukan. Kembali ke TurboSched untuk melanjutkan pembelajaran penjadwalan proses CPU Anda.',
    keywords: ['404', 'halaman tidak ditemukan'],
    openGraph: {
      title: '404 - Halaman Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak tersedia',
      type: 'website'
    }
  }
}

export function generateSEOMetadata(route: string): Metadata {
  const config = routeMetadata[route] || routeMetadata['/']
  
  return {
    title: config.title,
    description: config.description,
    keywords: [...siteConfig.keywords, ...(config.keywords || [])],
    authors: [{ name: 'TurboSched Team' }],
    creator: 'TurboSched',
    publisher: 'TurboSched',
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: [
        { url: siteConfig.logo, type: 'image/webp' },
        { url: siteConfig.logo, sizes: '32x32', type: 'image/webp' },
        { url: siteConfig.logo, sizes: '16x16', type: 'image/webp' },
      ],
      apple: [
        { url: siteConfig.logo, sizes: '180x180', type: 'image/webp' },
      ],
      shortcut: siteConfig.logo,
    },
    alternates: {
      canonical: route,
    },
    openGraph: {
      type: config.openGraph?.type || 'website',
      locale: 'id_ID',
      url: route,
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: config.openGraph?.title || config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      images: [siteConfig.ogImage],
      creator: '@turbosched',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
