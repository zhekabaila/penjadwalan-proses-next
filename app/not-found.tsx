"use client";

import { motion } from "motion/react";
import { Home, AlertCircle, Cpu } from "lucide-react";
import { GlassButton } from "../components/ui/glass-button";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [cpuCores, setCpuCores] = useState<number>(0);
  const [memory, setMemory] = useState<string>("0 MB");
  const [processes, setProcesses] = useState<number>(0);
  const [cpuUsage, setCpuUsage] = useState<number>(0);

  useEffect(() => {
    // Get CPU cores (real-time)
    if (navigator.hardwareConcurrency) {
      setCpuCores(navigator.hardwareConcurrency);
    }

    // Get memory info (real-time jika tersedia)
    const updateMemory = () => {
      if ('memory' in performance && (performance as any).memory) {
        const memoryInfo = (performance as any).memory;
        const usedMemoryMB = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024);
        setMemory(`${usedMemoryMB} MB`);
      } else {
        // Fallback: simulasi real-time
        const simulatedMemory = Math.floor(Math.random() * 100) + 150;
        setMemory(`${simulatedMemory} MB`);
      }
    };

    // Simulate process count (real-time simulation)
    const updateProcesses = () => {
      // Simulasi jumlah proses yang berubah-ubah
      const baseProcesses = 35;
      const variation = Math.floor(Math.random() * 15);
      setProcesses(baseProcesses + variation);
    };

    // Simulate CPU usage (real-time simulation)
    const updateCpuUsage = () => {
      // Simulasi CPU usage yang dinamis
      const usage = Math.floor(Math.random() * 40) + 30; // 30-70%
      setCpuUsage(usage);
    };

    // Initial update
    updateMemory();
    updateProcesses();
    updateCpuUsage();

    // Update setiap 2 detik untuk simulasi real-time
    const interval = setInterval(() => {
      updateMemory();
      updateProcesses();
      updateCpuUsage();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Glassmorphism Card - Adjusted max-w-lg to max-w-2xl */}
        <div className="relative overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-3xl p-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative">
            {/* Animated CPU Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block mb-2"
            >
              <div className="relative">
                <Cpu className="w-16 h-16 text-emerald-500 mx-auto" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-emerald-500/20 rounded-full filter blur-xl"
                />
              </div>
            </motion.div>

            {/* 404 Error Code */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-white mb-4 text-4xl font-bold">
                <span>404</span>
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-emerald-400" />
                <h2 className="text-white">Proses Tidak Ditemukan</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-300 mb-3 text-sm max-w-md mx-auto">
                Halaman yang Anda cari telah di-terminate atau tidak ada dalam antrian sistem. 
                Mungkin halaman tersebut sedang mengalami deadlock atau sudah selesai dieksekusi.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Error Code: <span className="text-emerald-400 font-mono">PAGE_NOT_IN_QUEUE</span>
              </p>
            </motion.div>

            {/* Status Indicators - REAL-TIME */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mb-8"
            > {/* Reduced gap from 6 to 4 */}
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">CPU Cores</div>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{
                      backgroundColor: ["#10b981", "#059669", "#10b981"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="w-2 h-2 rounded-full"
                  /> {/* Reduced size of circle */}
                  <span className="text-emerald-400 text-sm font-mono">
                    {cpuCores > 0 ? cpuCores : "N/A"}
                  </span>
                </div>
              </div>
              
              <div className="w-px h-8 bg-emerald-500/20"></div>

              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">CPU Usage</div>
                <motion.div 
                  key={cpuUsage}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-sm font-mono"
                >
                  {cpuUsage}%
                </motion.div>
              </div>

              <div className="w-px h-8 bg-emerald-500/20"></div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Memory</div>
                <motion.div 
                  key={memory}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-sm font-mono"
                >
                  {memory}
                </motion.div>
              </div>

              <div className="w-px h-8 bg-emerald-500/20"></div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Processes</div>
                <motion.div 
                  key={processes}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-400 text-sm font-mono"
                >
                  {processes}
                </motion.div>
              </div>
            </motion.div>

            {/* Real-time indicator badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
              <span className="text-emerald-400 text-xs">Live System Stats</span>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <GlassButton onClick={handleGoHome} size="default">
                <Home className="w-4 h-4" />
                Kembali ke Scheduler
              </GlassButton>
            </motion.div>

            {/* Process Queue Visual */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-6 border-t border-emerald-500/20"
            >
              <div className="text-xs text-gray-400 mb-3">Ready Queue:</div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="w-12 h-12 border border-emerald-500/30 bg-emerald-500/10 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-emerald-400 text-xs font-mono">P{index + 1}</span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ delay: 1.3 }}
                  className="w-12 h-12 border-2 border-dashed border-red-500/30 bg-red-500/5 rounded-lg flex items-center justify-center"
                >
                  <span className="text-red-400 text-xs font-mono">×</span>
                </motion.div>
              </div>
            </motion.div> */}
          </div>
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
  );
}
