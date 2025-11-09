import type { Metadata } from 'next'
import { NotFoundContent } from './_components/NotFoundContent'

export const metadata: Metadata = {
  title: '404 - Halaman Tidak Ditemukan | TurboSched',
  description: 'Halaman yang Anda cari tidak ditemukan. Kembali ke TurboSched untuk melanjutkan pembelajaran penjadwalan proses CPU Anda.',
  keywords: ['404', 'halaman tidak ditemukan', 'page not found', 'error 404'],
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  openGraph: {
    title: '404 - Halaman Tidak Ditemukan | TurboSched',
    description: 'Halaman yang Anda cari tidak tersedia di TurboSched',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '404 - Halaman Tidak Ditemukan',
    description: 'Halaman yang Anda cari tidak tersedia',
  },
}

export default function NotFound() {
  return <NotFoundContent />
}
