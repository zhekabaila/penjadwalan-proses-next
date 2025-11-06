'use client'
import { cn } from '@/lib/utils'
import { Spotlight } from '../../components/ui/spotlight'
import { GlassButton } from '../../components/ui/glass-button'
import { Play, Eye } from 'lucide-react'
import { motion } from 'motion/react'

export function HeroSection() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-md antialiased">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none',
          '[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]'
        )}
      />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-5xl p-4 text-neutral-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold md:text-5xl">
            Visualisasikan Algoritma Manajemen Proses Secara Interaktif
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-neutral-200">
            Jelajahi dunia penjadwalan proses CPU. Ubah teori kompleks menjadi pemahaman visual dengan simulasi FCFS, SJF,
            dan Round Robin secara real-time.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GlassButton href="/visualization">
            <Play className="h-4 w-4" />
            <span>Mulai Eksplorasi</span>
          </GlassButton>
          <GlassButton variant="outline" href="/">
            <Eye className="h-4 w-4" />
            <span>Lihat Demo</span>
          </GlassButton>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
