"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../../components/ui/spotlight";
import { GlassButton } from "../../components/ui/glass-button";
import { Play, Eye } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center md:pt-0 pt-12">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl p-4 pt-8 text-neutral-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl font-bold md:text-5xl mb-2">
            Visualisasikan Algoritma <br/> Manajemen Proses Secara Interaktif
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="mx-auto mt-4 max-w-xl text-center text-base font-normal text-neutral-300">
            Bingung bagaimana sistem operasi memutuskan proses mana yang harus dijalankan? <br/> Proyek ini mengubah teori manajemen proses yang kompleks menjadi visualisasi yang sederhana dan mudah dipahami. Lihat FCFS, SJF, dan Round Robin berjalan secara real-time.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <GlassButton href="/scheduler">
            <Play className="w-4 h-4" />
            <span>Mulai Eksplorasi</span>
          </GlassButton>
          <GlassButton variant="outline" href="/demo">
            <Eye className="w-4 h-4" />
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
  );
}
