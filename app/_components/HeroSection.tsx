import { cn } from '@/lib/utils'
import { Spotlight } from '../../components/ui/spotlight'
import { GlassButton } from '../../components/ui/glass-button'

export function HeroSection() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none',
          '[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]'
        )}
      />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-5xl p-4 pt-8 text-neutral-300">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl font-bold md:text-5xl mb-2">
          Visualisasikan Algoritma <br /> Manajemen Proses Secara Interaktif
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-base font-normal text-neutral-300">
          Bingung bagaimana sistem operasi memutuskan proses mana yang harus dijalankan? <br /> Proyek ini mengubah teori
          manajemen proses yang kompleks menjadi visualisasi yang sederhana dan mudah dipahami. Lihat FCFS, SJF, dan Round
          Robin berjalan secara real-time.
        </p>
        <div className="mt-4 flex justify-center">
          <GlassButton href="/scheduler">Mulai Eksplorasi</GlassButton>
        </div>
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
